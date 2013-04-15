<?php

require('../../lib/fpdf17/fpdf.php');
require_once('../../lib/dbapdo.class.php');

function toTitulo($val){
	return ucwords(strtolower(utf8_decode($val)));
}

class PDF extends FPDF{
	private $nu_cotizacion;
	private $forma_pago;
	private $no_atencion;
	private $va_total;

	public function setNuCotizacion($nu_cotizacion){
		$this->nu_cotizacion = $nu_cotizacion;
	}

	public function setFormaPago($forma_pago){
		$this->forma_pago = $forma_pago;
	}

	public function setNoAtencion($no_atencion){
		$this->no_atencion = $no_atencion;
	}

	public function setVaTotal($va_total){
		$this->va_total = $va_total;
	}

	function Header(){
		$meses = array("","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
	    $this->Image('logo-gob.png', 10, 5, 60);
	    $this->SetFont('Arial', '', 10);
	    $this->Cell(0, 5, 'Lima, '. date('d'). ' de '.$meses[date("n", time())].' del '.date('Y'), 0, 0, 'R');
	    $this->sety(17);
	    $this->SetFont('Arial', 'B', 18);
	    $this->Cell(0, 5, 'C O T I Z A C I O N', 0, 1, 'C');
	    $this->SetFont('Arial', '', 11);
	    $this->Cell(0, 5, 'No.: '.$this->nu_cotizacion, 0, 1, 'C');
	    $this->sety(30);
	}

	function Footer(){
	    #$this->SetFont('Arial','I',8);
	    $this->SetFont('Arial', 'B', 9);
	    $this->SetY(-80);
	    #$this->Cell(0, 10, toTitulo('Página '.$this->PageNo().'/{nb}'), 0, 0, 'R');
	    $w = array(35, 98, 57);
	    $this->Cell($w[0], 5, 'Forma de Pago: ', 'T', 0, 'R');
	    $this->SetFont('Arial', '', 9);
	    $this->Cell($w[1], 5, '50% aceptada la '.toTitulo('cotización').' y resto a contra entrega', 'T'); //$this->forma_pago
	    $this->SetFont('Arial', 'B', 11);
	    $this->Cell(30, 5, 'Total          U$D', 'T');
	    $this->Cell(27, 5, number_format($this->va_total, 2), 'T', 0, 'R');
	    $this->ln();
	    $this->SetFont('Arial', 'B', 9);
	    $this->Cell($w[0], 5, 'Validez de Oferta: ', 0, 0, 'R');
	    $this->SetFont('Arial', '', 9);
	    $this->Cell($w[1], 5, '15 DIAS', 0);
	    $this->Cell($w[2], 5, '', 0);
	    $this->ln();
	    $this->SetFont('Arial', 'B', 9);
	    $this->Cell($w[0], 5, 'Garantia: ', 0, 0, 'R');
	    $this->SetFont('Arial', '', 9);
	    $this->Cell($w[1], 5, 'Todos los equipos cuentan con 12 meses de garantia');
	    $this->SetFont('Arial', 'B', 9);
	    $this->Cell($w[2], 5, 'PRECIOS INCLUYEN IGV');
	    $this->ln();
	    $this->SetFont('Arial', 'B', 9);
	    $this->Cell($w[0], 5, 'Tiempo de Entrega: ', 0, 0, 'R');
	    $this->SetFont('Arial', '', 9);
	    $this->Cell($w[1], 5, '24 Horas');
	    $this->Cell($w[2], 5, '');
	    $this->ln(10);
	    $this->Cell(0, 5, 'Esperando que esta '.toTitulo('cotización').' haya sido de su agrado, esperamos atentamente su respuesta.');
	    $this->ln(15);
	    $this->SetFont('Arial', '', 10);
	    $this->Cell(0, 5, 'Atentamente:');
	    $this->ln(10);
	    $this->SetFont('Arial', 'B', 10);
	    $this->Cell(0, 5, 'Jimbert Castillo M.', 0, 1);
	    $this->SetFont('Arial', '', 10);
	    $this->Cell(0, 5, 'Gerencia Comercial', 0, 1);
	    $this->Cell(0, 5, 'RPC: 992 276 844', 0, 1);
		$this->Cell(0, 5, 'Open Business', 0, 1);
	    //$this->Image('sello.png', 113, 261, 29);
	}
}

//QUERY
$conn = new dbapdo();
$nu_documento = $_REQUEST["nu_documento"]; //'001-0000002'; //

$query = "SELECT DATE_FORMAT(cc.fe_cotizacion, '%d/%m/%Y') AS fe_cotizacion, cc.nu_cotizacion, 
			mc.no_cliente, mc.de_direccion, cc.va_venta, cc.co_vendedor, mfp.no_forma_pago
			FROM (c_cotizacion AS cc
			INNER JOIN m_clientes AS mc ON cc.co_cliente=mc.co_cliente)
			INNER JOIN m_forma_pago AS mfp ON cc.co_forma_pago=mfp.co_forma_pago
			WHERE cc.nu_cotizacion = ?;";

$queryD = "SELECT mp.no_producto, msc.no_sub_categoria, mum.no_unidad, dc.ca_producto, dc.va_producto,
			(dc.ca_producto * dc.va_producto) AS va_total
			FROM ((dbrewsoft.d_cotizacion AS dc
			INNER JOIN dbrewsoft.m_productos AS mp ON dc.co_producto=mp.co_producto)
			INNER JOIN dbrewsoft.m_sub_categorias AS msc ON mp.co_sub_categoria=msc.co_sub_categoria)
			INNER JOIN dbrewsoft.m_unidades_medida AS mum ON mp.co_unidad=mum.id
			WHERE dc.nu_cotizacion = ?
			ORDER BY dc.nu_linea;";

$stmt = $conn->prepare($query);
$stmt->bindParam(1, $nu_documento);
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_OBJ);

$stmtD = $conn->prepare($queryD);
$stmtD->bindParam(1, $nu_documento);
$stmtD->execute();
$resultD = $stmtD->fetchAll(PDO::FETCH_OBJ);

//FINQUERY
$pdf = new PDF('P','mm','A4');

$pdf->setNuCotizacion($result->nu_cotizacion);
$pdf->setFormaPago($result->no_forma_pago);
$pdf->setNoAtencion($result->co_vendedor);
$pdf->setVaTotal($result->va_venta);

$pdf->AliasNbPages();
$pdf->AddPage();

$pdf->ln();
$pdf->SetFont('Arial', 'B', 9);
$pdf->Cell(18, 5, toTitulo('Señores:'), 0, 0);
$pdf->SetFont('Arial', '', 9);
$pdf->Cell(130, 5, $result->no_cliente, 0, 1);

$pdf->SetFont('Arial', 'B', 9);
$pdf->Cell(18, 5, toTitulo('Dirección:'), 0, 0);
$pdf->SetFont('Arial', '', 9);
$pdf->Cell(130, 5, substr($result->de_direccion, 0, 70) , 0);
$pdf->ln(6);
$pdf->SetFont('Arial', '', 9);
$pdf->Cell(18, 5, toTitulo('Buen día, por medio de la presente le enviamos la siguiente cotización:'), 0);
$pdf->ln(6);

$w = array(15, 15, 120, 20, 20);

$pdf->SetFont('Arial', 'B', 9);
$pdf->Cell($w[0], 5, 'Cant.', 1, 0, 'C');
$pdf->Cell($w[1], 5, 'U. M.', 1, 0, 'C');
$pdf->Cell($w[2], 5, toTitulo('Descripción'), 1, 0);
$pdf->Cell($w[3], 5, 'Unitario', 1, 0, 'R');
$pdf->Cell($w[4], 5, 'Valor (U$D)', 1, 1, 'R');

for ($i=0; $i < 32; $i++) { 
	$pdf->Cell($w[0], 5, '', 'LR', 0);
	$pdf->Cell($w[1], 5, '', 'R', 0);
	$pdf->Cell($w[2], 5, '', 'R', 0);
	$pdf->Cell($w[3], 5, '', 'R', 0);
	$pdf->Cell($w[4], 5, '', 'R', 0);
	$pdf->ln();
}

$pdf->setY(57);
$pdf->SetFont('Arial', '', 9);
foreach ($resultD as $row) {
	$pdf->Cell($w[0], 5, number_format($row->ca_producto), 0, 0, 'C');
	$pdf->Cell($w[1], 5, $row->no_unidad, 0, 0, 'C');
	$pdf->Cell($w[2], 5, $row->no_producto);
	$pdf->Cell($w[3], 5, number_format($row->va_producto, 2), 0, 0, 'R');
	$pdf->Cell($w[4], 5, number_format($row->va_total, 2), 0, 0, 'R');
	$pdf->ln();
}

$pdf->Output('Cotizacion No.pdf', 'I'); //I Mostrar - D Descargar

?>