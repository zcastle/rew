<?php
header('Content-type: application/pdf');
require_once '../../lib/dbapdo.class.php';
require_once '../../lib/tcpdf/tcpdf.php';
require_once '../../lib/numerosaletras.class.php';

class MYPDF extends TCPDF {
    public function Header() { }

    public function Footer() { }
}

$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('JC');
$pdf->SetTitle('Imprimir Factura');

$conn = new dbapdo();

$cia = $_REQUEST['cia'];
$tipo_comprobante = $_REQUEST['tipo_comprobante'];
$numero_comprobante = $_REQUEST['numero_comprobante'];

if($tipo_comprobante && $numero_comprobante){
    $queryCabecera = "SELECT DATE_FORMAT(cv.fe_venta, '%d/%m/%Y') AS fe_venta, REPLACE(cv.nu_comprobante, '-', '') AS nu_comprobante, cv.co_cliente, mc.no_cliente, mc.de_direccion, 
                        cv.nu_guia_remision, mfp.no_forma_pago, cv.co_vendedor, cv.va_neto, cv.va_igv, cv.va_venta
                        FROM (c_ventas AS cv LEFT JOIN m_clientes AS mc ON cv.co_cliente = mc.co_cliente)
                        LEFT JOIN m_forma_pago AS mfp ON mc.co_forma_pago = mfp.co_forma_pago
                        WHERE cv.co_empresa = '01' AND cv.tipo_comprobante = 'FV' 
                        AND cv.nu_comprobante = '001-0062624';";

    $queryDetalle = "SELECT dv.ca_producto, mum.no_unidad, mp.no_producto, dv.no_lote, DATE_FORMAT(dv.fe_vencimiento, '%d/%m/%Y') AS fe_vencimiento, 
                        dv.va_producto, (dv.ca_producto * dv.va_producto) AS va_total
                        FROM (d_ventas AS dv INNER JOIN m_productos AS mp ON dv.co_producto = mp.co_producto)
                        INNER JOIN m_unidades_medida AS mum ON mp.co_unidad = mum.id
                        WHERE dv.tipo_comprobante = 'FV' AND dv.nu_comprobante = '001-0062624'
                        ORDER BY dv.nu_linea;";
}

$stmCabecera = $conn->prepare($queryCabecera);
$stmCabecera->execute();
$resultCabecera = $stmCabecera->fetch(PDO::FETCH_OBJ);

$stmDetalle = $conn->prepare($queryDetalle);
$stmDetalle->execute();
$resultDetalle = $stmDetalle->fetchAll();

//QUERY FECHA DE SISTEMA
$queryFechaSistema = "SELECT DATE_FORMAT(NOW(), '%d/%m/%Y %h:%i %p') AS fechahora FROM dual";
$stmFechaSistema = $conn->prepare($queryFechaSistema);
$stmFechaSistema->execute();
$resultFechaSistema = $stmFechaSistema->fetch(PDO::FETCH_OBJ);
//FIN

//CONFIGURACION PAGINA
$pdf->AddPage();

//$fontname = $pdf->addTTFfont('/home/jcastillo/Descargas/navicat101_mysql_en/wine/share/wine/fonts/tahoma.ttf', 'TrueTypeUnicode', '', 32);

//codigo 2032

$ini_top = 50;
$pdf->SetFont('helvetica', '', 8, '', false);
$pdf->SetY($ini_top);
$pdf->SetX(160);
$pdf->Cell(0, 0, $resultCabecera->nu_comprobante);
$pdf->SetY($ini_top + 5);
$pdf->SetX(40);
$pdf->Cell(0, 0, $resultFechaSistema->fechahora);
$pdf->SetY($ini_top + 12);
$pdf->SetX(40);
$pdf->Cell(0, 0, $resultCabecera->no_cliente);
$pdf->SetX(165);
$pdf->Cell(0, 0, $resultCabecera->fe_venta);
$pdf->SetY($ini_top + 19);
$pdf->SetX(40);
$pdf->Cell(0, 0, $resultCabecera->de_direccion);
$pdf->SetX(165);
$pdf->Cell(0, 0, $resultCabecera->nu_guia_remision);
$pdf->SetY($ini_top + 26);
$pdf->SetX(40);
$pdf->Cell(0, 0, $resultCabecera->co_cliente);
$pdf->SetX(120);
$pdf->Cell(0, 0, ''); //Nro. Orden
$pdf->SetX(160);
$pdf->Cell(0, 0, $resultCabecera->no_forma_pago);
$pdf->SetX(190);
$pdf->Cell(0, 0, $resultCabecera->co_vendedor);
$pdf->Ln();
//
$pdf->SetTopMargin(90);
//$pdf->SetLeftMargin(5);
//$pdf->SetRightMargin(5);
//FIN

$w = array(15, 7, 90, 20, 20, 15, 20);

foreach ($resultDetalle as $row) {
    $pdf->Cell($w[0], 0, number_format($row['ca_producto'], 2), 0, 0, 'R');
    $pdf->Cell($w[1], 0, $row['no_unidad']);
    $pdf->Cell($w[2], 0, $row['no_producto']);
    $pdf->Cell($w[3], 0, $row['no_lote']);
    $pdf->Cell($w[4], 0, $row['fe_vencimiento']);
    $pdf->Cell($w[5], 0, number_format($row['va_producto'], 2), 0, 0, 'R');
    $pdf->Cell($w[6], 0, number_format($row['va_total'], 2), 0, 0, 'R');
    $pdf->Ln();
}

//$n = new numerosALetras();
$ini_pie = 250;
$pdf->SetY($ini_pie);
$pdf->SetX(20);
$pdf->Cell(0, 0, 'SON: ' . numtoletras($resultCabecera->va_venta));
$pdf->SetY($ini_pie + 10);
$pdf->SetX(200);
$pdf->Cell(0, 0, number_format($resultCabecera->va_neto, 2), 0, 0, 'R');
$pdf->SetY($ini_pie + 15);
$pdf->SetX(200);
$pdf->Cell(0, 0, number_format($resultCabecera->va_igv, 2), 0, 0, 'R');
$pdf->SetY($ini_pie + 20);
$pdf->SetX(200);
$pdf->Cell(0, 0, number_format($resultCabecera->va_venta, 2), 0, 0, 'R');

$pdf->Output('imprimirFactura.pdf', 'I');
?>