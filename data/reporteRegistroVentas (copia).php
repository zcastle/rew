<?php

require_once '../lib/dbapdo.class.php';
require_once '../lib/phpexcel/Classes/PHPExcel.php';
require_once 'bootstrap.php';
require_once 'mypdf.php';

date_default_timezone_set('America/Lima');

$out = isset($_GET['out']) ? $_GET['out'] : 'pdf';

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

$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->setCreator(PDF_CREATOR);
$pdf->setAuthor('JC');
$pdf->setTitle('Registro de Ventas');
$anchos = array(23, 25, 25, 70, 20, 15, 20, 0);
$pdf->setAnchos($anchos);

$conn = new dbapdo();

/*$query = "SELECT DATE_FORMAT(cv.fe_venta, '%d/%m/%Y') AS fe_venta, cv.nu_comprobante, cv.co_cliente, 
                (SELECT no_cliente FROM m_clientes WHERE co_cliente = cv.co_cliente) AS no_cliente,
                cv.va_neto, cv.va_igv, cv.va_venta, cv.fl_anulada 
                FROM c_ventas AS cv LIMIT 20";*/

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

if($dia_ini && $dia_fin){
    $del = $dia_ini;
    $al = $dia_fin;
    $fe_ini = substr($fe_ini, 6, 4) . '-' . substr($fe_ini, 3, 2) . '-' . substr($fe_ini, 0, 2);
    $fe_fin = substr($fe_fin, 6, 4) . '-' . substr($fe_fin, 3, 2) . '-' . substr($fe_fin, 0, 2);
    $query = "SELECT DATE_FORMAT(cv.fe_venta, '%d/%m/%Y') AS fe_venta, cv.nu_comprobante, cv.co_cliente,
                (SELECT no_cliente FROM m_clientes WHERE co_cliente = cv.co_cliente) AS no_cliente, 
                cv.va_neto, cv.va_igv, cv.va_venta, cv.fl_anulada 
                FROM c_ventas AS cv WHERE cv.nu_diadw >= $dia_ini AND cv.nu_diadw <= $dia_fin";
    $vc = VentasC::find('all', array('conditions' => array('nu_diadw>=? AND nu_diadw<=?', $dia_ini, $dia_fin)));
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

$pdf->Ln();
$pdf->SetFont('courier', '', 9);

/*foreach ($result as $row) {
    $pdf->Cell($anchos[0], 0, $row['fe_venta']);
    $pdf->Cell($anchos[1], 0, $row['nu_comprobante']);
    $pdf->Cell($anchos[2], 0, $row['co_cliente']);
    $pdf->Cell($anchos[3], 0, $row['no_cliente']);
    $pdf->Cell($anchos[4], 0, number_format($row['va_neto'], 2), 0, 0, 'R');
    $pdf->Cell($anchos[5], 0, number_format($row['va_igv'], 2), 0, 0, 'R');
    $pdf->Cell($anchos[6], 0, number_format($row['va_venta'], 2), 0, 0, 'R');
    if($row['fl_anulada']=='S'){
        $pdf->Cell($w[7], 0, ' S');
    }else{
        $pdf->Cell($w[7], 0, ' ');
    }
    $pdf->Ln();
}*/

foreach ($vc as $row) {
    $date = new DateTime($row->fe_venta);
    $pdf->Cell($anchos[0], 0, $date->format('d/m/Y'));
    $pdf->Cell($anchos[1], 0, $row->nu_comprobante);
    $pdf->Cell($anchos[2], 0, $row->co_cliente);
    $pdf->Cell($anchos[3], 0, $row->no_cliente);
    $pdf->Cell($anchos[4], 0, number_format($row->va_neto, 2), 0, 0, 'R');
    $pdf->Cell($anchos[5], 0, number_format($row->va_igv, 2), 0, 0, 'R');
    $pdf->Cell($anchos[6], 0, number_format($row->va_venta, 2), 0, 0, 'R');
    if($row->fl_anulada=='S'){
        $pdf->Cell($w[7], 0, ' S');
    }else{
        $pdf->Cell($w[7], 0, ' ');
    }
    $pdf->Ln();
}

if ($out=='pdf') {   
    $pdf->Output('reporteRegistroVentas.pdf', 'I');
}
?>