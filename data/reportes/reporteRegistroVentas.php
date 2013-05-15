<?php

require_once '../../lib/dbapdo.class.php';
require_once '../../lib/tcpdf/tcpdf.php';

class MYPDF extends TCPDF {

    private $noCia;
    private $diaIni;
    private $diaFin;
    private $fechaSistema;
    private $horaSistema;
    
    public function setNoCia($noCia) {
        $this->noCia = $noCia;
    }
    
    public function setDiaIni($diaIni) {
        $this->diaIni = $diaIni;
    }
    
    public function setDiaFin($diaFin) {
        $this->diaFin = $diaFin;
    }

    public function setFechaSistema($fechaSistema){
        $this->fechaSistema = $fechaSistema;
    }

    public function setHoraSistema($horaSistema){
        $this->horaSistema = $horaSistema;
    }
            
    public function Header() {
        $this->SetLeftMargin(5);
        $this->SetY(5);
        $this->SetFont('courier', '', 10, '', true);
        $this->Cell(0, 0, $this->noCia, 0, true, 'L');
        //$this->SetFont('courier', '', 8, '', true);
        
        $this->SetFont('courier', 'B', 20, '', true);
        $this->Cell(0, 0, 'REGISTRO DE VENTAS', 0, true, 'C');
        $this->SetFont('courier', '', 11, '', true);
        $this->Cell(0, 0, "DEL: $this->diaIni AL: $this->diaFin", 0, 1, 'C');
        $this->ln();
        $w = array(23, 23, 24, 70, 20, 15, 20, 0);
        $this->SetFont('courier', 'B', 10);
        $this->Cell($w[0], 0, 'FECHA');
        $this->Cell($w[1], 0, 'DOCUMENTO');
        $this->Cell($w[2], 0, 'RUC');
        $this->Cell($w[3], 0, 'CLIENTE');
        $this->Cell($w[4], 0, 'NETO', 0, 0, 'R');
        $this->Cell($w[5], 0, 'IGV', 0, 0, 'R');
        $this->Cell($w[6], 0, 'TOTAL', 0, false, 'R');
        $this->Cell($w[7], 0, ' A');
    }

    public function Footer() {
        $paginas = 'Pagina '.$this->getAliasNumPage().'/'.$this->getAliasNbPages();
        $this->SetY(-15);
        $this->SetFont('courier', 'I', 8);
        $this->Cell(0, 0, $paginas, T, true);
        $this->Cell(0, 0, "Fecha Impresion: $this->fechaSistema", 0, true);
        $this->Cell(0, 0, "Hora Impresion: $this->horaSistema", 0, false);
    }
}

$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('JC');
$pdf->SetTitle('Registro de Ventas');

$conn = new dbapdo();

$query = "SELECT DATE_FORMAT(cv.fe_venta, '%d/%m/%Y') AS fe_venta, cv.nu_comprobante, cv.co_cliente, 
                (SELECT no_cliente FROM m_clientes WHERE co_cliente = cv.co_cliente) AS no_cliente,
                cv.va_neto, cv.va_igv, cv.va_venta, cv.fl_anulada 
                FROM c_ventas AS cv LIMIT 20";

$cia = $_GET['cia'];
$fe_ini_month = $_GET['fe_ini_month'];
$fe_ini_year = $_GET['fe_ini_year'];
$fe_fin_month = $_GET['fe_fin_month'];
$fe_fin_year = $_GET['fe_fin_year'];

$fe_ini = $_GET['fe_ini'];
$fe_fin = $_GET['fe_fin'];

$del = "";
$al = "";

if($fe_ini_month && $fe_fin_month && $fe_ini_year && $fe_ini_year){
    $del = $fe_ini_month.'/'.$fe_ini_year;
    $al = $fe_fin_month.'/'.$fe_fin_year;
    $query = "SELECT DATE_FORMAT(cv.fe_venta, '%d/%m/%Y') AS fe_venta, cv.nu_comprobante, cv.co_cliente, 
                (SELECT no_cliente FROM m_clientes WHERE co_cliente = cv.co_cliente) AS no_cliente,
                cv.va_neto, cv.va_igv, cv.va_venta, cv.fl_anulada 
                FROM c_ventas AS cv WHERE 
                (MONTH(cv.fe_venta) >= $fe_ini_month AND YEAR(cv.fe_venta) >= $fe_ini_year) AND 
                (MONTH(cv.fe_venta) <= $fe_fin_month AND YEAR(cv.fe_venta) <= $fe_fin_year)";
}

if($fe_ini && $fe_fin){
    $del = $fe_ini;
    $al = $fe_fin;
    $fe_ini = substr($fe_ini, 6, 4) . '-' . substr($fe_ini, 3, 2) . '-' . substr($fe_ini, 0, 2);
    $fe_fin = substr($fe_fin, 6, 4) . '-' . substr($fe_fin, 3, 2) . '-' . substr($fe_fin, 0, 2);
    $query = "SELECT DATE_FORMAT(cv.fe_venta, '%d/%m/%Y') AS fe_venta, cv.nu_comprobante, cv.co_cliente,
                (SELECT no_cliente FROM m_clientes WHERE co_cliente = cv.co_cliente) AS no_cliente, 
                cv.va_neto, cv.va_igv, cv.va_venta, cv.fl_anulada 
                FROM c_ventas AS cv WHERE 
                DATE(cv.fe_venta) BETWEEN DATE('$fe_ini') AND DATE('$fe_fin')";
}

$stm = $conn->prepare($query);
$stm->execute();
$result = $stm->fetchAll();

$queryCia = "SELECT no_razon_social FROM m_empresas WHERE co_empresa = $cia";
$stmCia = $conn->prepare($queryCia);
$stmCia->execute();
$resultCia = $stmCia->fetch(PDO::FETCH_OBJ);


//QUERY FECHA DE SISTEMA
$queryFechaSistema = "SELECT DATE_FORMAT(NOW(), '%d/%m/%Y') AS fecha, DATE_FORMAT(NOW(), '%h:%i %p') AS hora FROM dual";
$stmFechaSistema = $conn->prepare($queryFechaSistema);
$stmFechaSistema->execute();
$resultFechaSistema = $stmFechaSistema->fetch(PDO::FETCH_OBJ);
//FIN

//DATOS DE CABECERA
$pdf->setNoCia($resultCia->no_razon_social);
$pdf->setDiaIni($del);
$pdf->setDiaFin($al);
$pdf->setFechaSistema($resultFechaSistema->fecha);
$pdf->setHoraSistema($resultFechaSistema->hora);
//FIN

//CONFIGURACION PAGINA
$pdf->AddPage();
//$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);  
$pdf->SetTopMargin(33);
$pdf->SetLeftMargin(5);
$pdf->SetRightMargin(5);
//FIN

$w = array(23, 23, 24, 70, 20, 15, 20, 0);

$pdf->Ln();
$pdf->SetFont('courier', '', 9);

foreach ($result as $row) {
    $pdf->Cell($w[0], 0, $row[fe_venta]);
    $pdf->Cell($w[1], 0, $row[nu_comprobante]);
    $pdf->Cell($w[2], 0, $row[co_cliente]);
    $pdf->Cell($w[3], 0, $row[no_cliente]);
    $pdf->Cell($w[4], 0, number_format($row[va_neto], 2), 0, 0, 'R');
    $pdf->Cell($w[5], 0, number_format($row[va_igv], 2), 0, 0, 'R');
    $pdf->Cell($w[6], 0, number_format($row[va_venta], 2), 0, 0, 'R');
    if($row[fl_anulada]=='S'){
        $pdf->Cell($w[7], 0, ' S');
    }else{
        $pdf->Cell($w[7], 0, ' ');
    }
    $pdf->Ln();
}

$pdf->Output('reporteRegistroVentas.pdf', 'I');
?>