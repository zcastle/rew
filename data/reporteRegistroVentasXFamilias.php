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
        $this->Cell(0, 0, 'REGISTRO DE VENTAS X FAMILIA', 0, true, 'C');
        $this->SetFont('courier', '', 11, '', true);
        $this->Cell(0, 0, "DEL: $this->diaIni AL: $this->diaFin", 0, 1, 'C');
        $this->ln();
        $w = array(35, 20, 80, 20, 20, 20);
        $this->SetFont('courier', 'B', 10);
        $this->Cell($w[0], 0, 'CATEGORIA');
        $this->Cell($w[1], 0, 'CODIGO');
        $this->Cell($w[2], 0, 'PRODUCTO');
        $this->Cell($w[3], 0, 'UNITARIO', 0, 0, 'R');
        $this->Cell($w[4], 0, 'CANTIDAD', 0, 0, 'R');
        $this->Cell($w[5], 0, 'TOTAL', 0, false, 'R');
    }

    public function Footer() {
        $paginas = 'Pagina '.$this->getAliasNumPage().'/'.$this->getAliasNbPages();
        $this->SetY(-15);
        $this->SetFont('courier', 'I', 8);
        $this->Cell(0, 0, $paginas, 'T', true);
        $this->Cell(0, 0, "Fecha Impresion: $this->fechaSistema", 0, true);
        $this->Cell(0, 0, "Hora Impresion: $this->horaSistema", 0, false);
    }
}

$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('JC');
$pdf->SetTitle('Registro de Ventas X Familia');

$conn = new dbapdo();

$query = "SELECT DATE_FORMAT(cv.fe_venta, '%d/%m/%Y') AS fe_venta, cv.nu_comprobante, cv.co_cliente, 
                (SELECT no_cliente FROM m_clientes WHERE co_cliente = cv.co_cliente) AS no_cliente,
                cv.va_neto, cv.va_igv, cv.va_venta, cv.fl_anulada 
                FROM c_ventas AS cv LIMIT 20";

$cia = $_GET['cia'];
$fe_ini_month =  isset($_GET['fe_ini_month'])?$_GET['fe_ini_month']:null;
$fe_ini_year = isset($_GET['fe_ini_year'])?$_GET['fe_ini_year']:null;
$fe_fin_month = isset($_GET['fe_fin_month'])?$_GET['fe_fin_month']:null;
$fe_fin_year = isset($_GET['fe_fin_year'])?$_GET['fe_fin_year']:null;

$fe_ini = isset($_GET['fe_ini'])?$_GET['fe_ini']:null;
$fe_fin = isset($_GET['fe_fin'])?$_GET['fe_fin']:null;

$dia_ini = isset($_GET['dia_ini'])?$_GET['dia_ini']:null;
$dia_fin = isset($_GET['dia_fin'])?$_GET['dia_fin']:null;

$del = "";
$al = "";

if($fe_ini_month && $fe_fin_month && $fe_ini_year && $fe_ini_year){
    $del = $fe_ini_month.'/'.$fe_ini_year;
    $al = $fe_fin_month.'/'.$fe_fin_year;
    $query = "SELECT mc.no_categoria, dv.co_producto, mp.no_producto, dv.va_producto, 
                SUM(dv.ca_producto) AS ca_producto, (dv.va_producto*SUM(dv.ca_producto)) AS va_total
                FROM (((d_ventas AS dv INNER JOIN m_productos AS mp ON dv.co_producto=mp.co_producto)
                INNER JOIN m_categorias AS mc on mp.co_categoria=mc.co_categoria)
                INNER JOIN c_ventas AS cv ON dv.tipo_comprobante=cv.tipo_comprobante AND dv.nu_comprobante=cv.nu_comprobante) 
                WHERE 
                (MONTH(cv.fe_venta) >= $fe_ini_month AND YEAR(cv.fe_venta) >= $fe_ini_year) AND 
                (MONTH(cv.fe_venta) <= $fe_fin_month AND YEAR(cv.fe_venta) <= $fe_fin_year)
                GROUP BY mc.no_categoria, dv.co_producto, mp.no_producto, dv.va_producto ORDER BY 1, 3;";
}

if($fe_ini && $fe_fin){
    $del = $fe_ini;
    $al = $fe_fin;
    $fe_ini = substr($fe_ini, 6, 4) . '-' . substr($fe_ini, 3, 2) . '-' . substr($fe_ini, 0, 2);
    $fe_fin = substr($fe_fin, 6, 4) . '-' . substr($fe_fin, 3, 2) . '-' . substr($fe_fin, 0, 2);
    $query = "SELECT mc.no_categoria, dv.co_producto, mp.no_producto, dv.va_producto, 
                SUM(dv.ca_producto) AS ca_producto, (dv.va_producto*SUM(dv.ca_producto)) AS va_total
                FROM (((d_ventas AS dv INNER JOIN m_productos AS mp ON dv.co_producto=mp.co_producto)
                INNER JOIN m_categorias AS mc on mp.co_categoria=mc.co_categoria)
                INNER JOIN c_ventas AS cv ON dv.tipo_comprobante=cv.tipo_comprobante AND dv.nu_comprobante=cv.nu_comprobante) 
                WHERE DATE(cv.fe_venta) BETWEEN DATE('$fe_ini') AND DATE('$fe_fin')
                GROUP BY mc.no_categoria, dv.co_producto, mp.no_producto, dv.va_producto ORDER BY 1, 3;";
}

if($dia_ini && $dia_fin){
    $del = $dia_ini;
    $al = $dia_fin;
    $fe_ini = substr($fe_ini, 6, 4) . '-' . substr($fe_ini, 3, 2) . '-' . substr($fe_ini, 0, 2);
    $fe_fin = substr($fe_fin, 6, 4) . '-' . substr($fe_fin, 3, 2) . '-' . substr($fe_fin, 0, 2);
    $query = "SELECT mc.no_categoria, dv.co_producto, mp.no_producto, dv.va_producto, 
                SUM(dv.ca_producto) AS ca_producto, (dv.va_producto*SUM(dv.ca_producto)) AS va_total
                FROM (((d_ventas AS dv INNER JOIN m_productos AS mp ON dv.co_producto=mp.co_producto)
                INNER JOIN m_categorias AS mc on mp.co_categoria=mc.co_categoria)
                INNER JOIN c_ventas AS cv ON dv.tipo_comprobante=cv.tipo_comprobante AND dv.nu_comprobante=cv.nu_comprobante) 
                WHERE cv.nu_diadw >= $dia_ini AND cv.nu_diadw <= $dia_fin
                GROUP BY mc.no_categoria, dv.co_producto, mp.no_producto, dv.va_producto ORDER BY 1, 3;";
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

$w = array(35, 20, 80, 20, 20, 20);

$pdf->Ln();
$pdf->SetFont('courier', '', 9);
$cate=null;
foreach ($result as $row) {
    if($cate){
        if($cate==$row['no_categoria']){
            $pdf->Cell($w[0], 0, '');
        }else{
            $pdf->Cell($w[0], 0, $row['no_categoria']);
            $cate=$row['no_categoria'];
        }
    }else{
        $pdf->Cell($w[0], 0, $row['no_categoria']);
        $cate=$row['no_categoria'];
    }
    $pdf->Cell($w[1], 0, $row['co_producto']);
    $pdf->Cell($w[2], 0, $row['no_producto']);
    $pdf->Cell($w[3], 0, number_format($row['va_producto'], 2), 0, 0, 'R');
    $pdf->Cell($w[4], 0, number_format($row['ca_producto'], 2), 0, 0, 'R');
    $pdf->Cell($w[5], 0, number_format($row['va_total'], 2), 0, 0, 'R');
    $pdf->Ln();
}

$pdf->Output('reporteRegistroVentas.pdf', 'I');
?>