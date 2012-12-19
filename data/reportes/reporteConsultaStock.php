<?php

require_once '../../lib/dbapdo.class.php';
require_once '../../lib/tcpdf/tcpdf.php';

class MYPDF extends TCPDF {

    private $noCia;
    private $diaIni;
    private $diaFin;
    private $fechaSistema;
    private $horaSistema;
    //protected $w = array(23, 23, 24, 70, 20, 15, 20, 0);
    
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

    public function getW(){
        return $this->w;
    }
            
    public function Header() {
        $this->SetLeftMargin(5);
        $this->SetY(5);
        $this->SetFont('courier', '', 10, '', true);
        $this->Cell(0, 0, $this->noCia, 0, true, 'L');
        //$this->SetFont('courier', '', 8, '', true);
        
        $this->SetFont('courier', 'B', 20, '', true);
        $this->Cell(0, 0, 'REGISTRO DE SALDOS', 0, true, 'C');
        $this->SetFont('courier', '', 11, '', true);
        //$this->Cell(0, 0, "DEL: $this->diaIni AL: $this->diaFin", 0, 1, 'C');
        $this->Cell(0, 0, "", 0, 1, 'C');
        $this->ln();
        $this->SetFont('courier', 'B', 10);
        $w = array(17, 40, 25, 25, 50, 25, 20);
        $this->Cell($w[0], 0, 'CODIGO');
        $this->Cell($w[1], 0, 'PRODUCTO');
        $this->Cell($w[2], 0, 'LOTE');
        $this->Cell($w[3], 0, 'VENCIMIENTO');
        $this->Cell($w[4], 0, 'ALMACEN');
        $this->Cell($w[5], 0, '', 0, 0, 'R');
        $this->Cell($w[6], 0, 'STOCK', 0, 0, 'R');
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
$pdf->SetTitle('Registro de Saldos');

$conn = new dbapdo();

$cia = $_GET['cia'];
$mostrarLotes = $_GET['lotes'];

$del = "";
$al = "";

$query = "SELECT rsp.co_producto, mp.no_producto, SUM(rsp.ca_stock) AS ca_stock
            FROM (r_stock_producto AS rsp INNER JOIN m_productos AS mp ON mp.co_producto = rsp.co_producto)
            WHERE rsp.ca_stock > 0
            GROUP BY rsp.co_producto ORDER BY mp.no_producto LIMIT 200;";

$stm = $conn->prepare($query);
$stm->execute();
$result = $stm->fetchAll();

$queryLotes = "SELECT rsp.no_lote, DATE_FORMAT(rsp.fe_vencimiento, '%d/%m/%Y') AS fe_vencimiento, 
                CONCAT(rsp.co_almacen,'-',ma.no_almacen) AS no_almacen, rsp.ca_stock 
                FROM (r_stock_producto AS rsp INNER JOIN m_almacenes AS ma 
                ON ma.co_almacen = rsp.co_almacen AND ma.co_empresa = rsp.co_empresa)
                WHERE rsp.co_producto = ?";

$stmLotes = $conn->prepare($queryLotes);

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
$pdf->SetTopMargin(33);
$pdf->SetLeftMargin(5);
$pdf->SetRightMargin(5);
//FIN

$w = array(17, 40, 25, 25, 50, 25, 20);

$pdf->Ln();
$pdf->SetFont('courier', '', 9);

foreach ($result as $row) {
    $pdf->Cell($w[0], 0, $row[co_producto]);
    $pdf->Cell($w[1], 0, $row[no_producto]);
    $pdf->Cell($w[2], 0, '');
    $pdf->Cell($w[3], 0, '');
    $pdf->Cell($w[4], 0, '');
    $pdf->Cell($w[5], 0, '');
    $pdf->SetFont('courier', 'B', 9);
    $pdf->Cell($w[6], 0, $row[ca_stock], 0, 0, 'R');
    $pdf->SetFont('courier', '', 9);
    $pdf->Ln();

    if($mostrarLotes=='true'){
        $stmLotes->bindParam(1, $row[co_producto]);
        $stmLotes->execute();
        $resultLotes = $stmLotes->fetchAll();
        foreach ($resultLotes as $row2) {
            if($row2[no_lote]<>''){
                $pdf->Cell($w[0], 0, '');
                $pdf->Cell($w[1], 0, '');
                $pdf->Cell($w[2], 0, $row2[no_lote]);
                if($row2[fe_vencimiento] != '00/00/0000'){
                    $pdf->Cell($w[3], 0, $row2[fe_vencimiento]);
                } else {
                    $pdf->Cell($w[3], 0, '');
                }
                $pdf->Cell($w[4], 0, $row2[no_almacen]);
                if($row2[ca_stock] < 0){
                    $pdf->SetTextColor(255, 0, 0);
                    $pdf->Cell($w[5], 0, $row2[ca_stock], 0, 0, 'R');
                } else {
                    $pdf->Cell($w[5], 0, $row2[ca_stock], 0, 0, 'R');
                }
                $pdf->SetTextColor(0, 0, 0);
                $pdf->Cell($w[6], 0, '');
                $pdf->Ln();
            }
        }
    }

    $pdf->Cell(0, 0, '', 'B');
    $pdf->Ln();
}

$pdf->Output('reporteRegistroSaldos.pdf', 'I');
?>