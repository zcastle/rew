<?php
//header('Content-type: application/pdf');
require_once('../../lib/fpdf17/fpdf.php');
require_once('bootstrap.php');

$tipo = $_GET['tipo'];
$nu = $_GET['nu'];

$ventaC = VentasC::find('first', array('conditions' => array("tipo_comprobante = ? AND nu_comprobante = ?", $tipo, $nu)));
$ventaD = VentasD::find('all', array('conditions' => array("tipo_comprobante = ? AND nu_comprobante = ?", $tipo, $nu)));
$cliente = Clientes::find('first', array('conditions' => array('co_cliente=?',$ventaC->co_cliente)));

//print_r($obj);

/*foreach ($obj as $o) {
    echo $o->tipo_comprobante.'<br/>';
    echo $o->nu_comprobante.'<br/>';
}

die();*/

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
        //$this->SetFont('courier','b',12);
        $this->_print(170,190,number_format($this->monto,2,'.',','),15,'R');
        $this->_print(170,195,number_format($this->igv,2,'.',','),15,'R');
        $this->_print(170,200,number_format($this->total,2,'.',','),15,'R');
    }
    public function _print($posx,$posy,$text,$ancho=5,$align='L',$ln=0){
        $this->setXY($posx,$posy);
        $this->SetFont('Courier','',9);
        $this->Cell($ancho,0,$text,0,$ln,$align);
        //ancho alto texto border(0-1|L-T-R-B) ln(0-1-2) align(L-C-R)
    }
}

$pdf = new MYFPDF('L','mm',array(220, 217)); //'A4'

$pdf->AddPage();
$pdf->SetMargins(0,0,0);
//$pdf->SetFont('courier','',9);

/*
echo $obj[0]->tipo_comprobante.'<br/>';
echo $obj[0]->nu_comprobante.'<br/>';
*/

$fe_venta = new DateTime($ventaC->fe_venta);

//$nu_cotizacion = $ventaC->nu_cotizacion;
//$nu_orden_compra = $ventaC->nu_orden_compra;

//Cabecera
//posx posy text ln(0-1-2) align(L-C-R) ancho(5)
$pdf->_print(160,45,$ventaC->nu_comprobante);
$pdf->_print(30,47,$fe_venta->format('d/m/Y H:i:s'));
$pdf->_print(30,54,$ventaC->co_cliente);
$pdf->_print(160,55,$fe_venta->format('d/m/Y'));
$pdf->_print(30,61,$cliente->no_cliente);
$pdf->_print(30,67,$cliente->de_direccion);

//Detalle

$ini = 82;
$total = 0;
foreach ($ventaD as $vd) {
    $pro = Productos::find('first', array('conditions' => array('co_producto=?', $vd->co_producto)));

    $to_producto = $vd->ca_producto * $vd->va_producto;
    $total += $to_producto;

    $un_producto = 'UND';
    $fe_vencimiento = new DateTime($vd->fe_vencimiento);

    $pdf->_print(20,$ini,$vd->ca_producto,10,'R');
    $pdf->_print(35,$ini,$un_producto);
    $pdf->_print(42,$ini,$pro->no_producto);
    $pdf->_print(120,$ini,$vd->no_lote);
    $pdf->_print(135,$ini,$fe_vencimiento->format('d/m/Y'));
    $pdf->_print(155,$ini,number_format($vd->va_producto, 2,'.',','),20,'R');
    $pdf->_print(185,$ini,number_format($to_producto, 2,'.',','),20,'R');
    $ini += 5;
}

$monto = $total / 1.18;
$igv = $monto * 0.18;

$pdf->setMonto($monto);
$pdf->setIgv($igv);
$pdf->setTotal($total);

$pdf->Output();
?>