<?php
//header('Content-type: application/pdf');
require_once('../../lib/fpdf17/fpdf.php');
require_once('bootstrap.php');

$tipo_comprobante = $_REQUEST['tipo_comprobante'];

$obj = VentasC::find('all', array('conditions'=>"tipo_comprobante = '$tipo_comprobante' AND nu_comprobante = '001-0062624'"));

/*foreach ($obj as $o) {
    echo $o->tipo_comprobante.'<br/>';
    echo $o->nu_comprobante.'<br/>';
}*/


//die();

class MYFPDF extends FPDF {

    private $monto = 0;
    private $igv = 0;
    private $total = 0;

    public function setMonto($monto) {
        $this->monto = $monto;
    }

    public function setIgv($igv) {
        $this->igv = $igv;
    }

    public function setTotal($total) {
        $this->total = $total;
    }

    public function Header() { }
    public function Footer() {
        $this->SetY(-77);
        $this->SetFont('courier','b',15);
        $this->_print(170,190,number_format($this->monto,2,'.',','),15,'R');
        $this->_print(170,195,number_format($this->igv,2,'.',','),15,'R');
        $this->_print(170,200,number_format($this->total,2,'.',','),15,'R');
    }
    public function _print($posx,$posy,$text,$ancho=5,$align='L',$ln=0){
        $this->setXY($posx,$posy);
        $this->Cell($ancho,0,$text,0,$ln,$align);
        //ancho alto texto border(0-1|L-T-R-B) ln(0-1-2) align(L-C-R)
    }
}

$pdf = new MYFPDF('P','mm',array(190,210)); //'A4'

$pdf->AddPage();
$pdf->SetMargins(0,0,0);
$pdf->SetFont('courier','',9);

/*
echo $obj[0]->tipo_comprobante.'<br/>';
echo $obj[0]->nu_comprobante.'<br/>';
*/

$nu_documento = $obj[0]->nu_comprobante;
$fe_documento = '15/05/2013';
$nu_ruc = $obj[0]->co_cliente;
$no_razon_socual = 'Razon Social';
$de_direccion = 'Direccion';
$nu_cotizacion = null;
$nu_orden_compra = null;

//Cabecera
//posx posy text ln(0-1-2) align(L-C-R) ancho(5)
$pdf->_print(100,10,$nu_documento);
$pdf->_print(10,15,$fe_documento);
$pdf->_print(10,20,$nu_ruc);
$pdf->_print(10,25,$no_razon_socual);
$pdf->_print(10,30,$de_direccion);

//Detalle
$co_producto = 'C001002';
$no_producto = 'Nuevo Nombre Producto';
$ca_producto = 1;
$un_producto = 'UND';
$va_producto = 100;
$to_producto = $ca_producto * $va_producto;

$ini = 40;
$total = 0;
for ($i=1;$i<=10;$i++) { 
    $ca_producto += $i;
    $va_producto += $i;
    $to_producto = $ca_producto * $va_producto;
    $total += $to_producto;
    $pdf->_print(2,$ini,$co_producto);
    $pdf->_print(17,$ini,$no_producto);
    $pdf->_print(125,$ini,$ca_producto,10,'R');
    $pdf->_print(140,$ini,$un_producto);
    $pdf->_print(150,$ini,number_format($va_producto, 2,'.',','),15,'R');
    $pdf->_print(173,$ini,number_format($to_producto, 2,'.',','),15,'R');
    $ini += 5;
}

$monto = $total / 1.18;
$igv = $monto * 0.18;

$pdf->setMonto($monto);
$pdf->setIgv($igv);
$pdf->setTotal($total);

$pdf->Output();
?>