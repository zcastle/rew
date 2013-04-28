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
	    $this->SetFont('Arial', 'B', 12);
	    $this->Image('melygin-logo-2.png', 10, 5, 25);
	    $this->sety(5);
	    $this->setX(40);
	    $this->Cell(0, 5, 'DROGUERIA E IMPORTADORA MELYGIN S.R.L.', 0, 1);
	    $this->SetFont('Arial', '', 8);
	    $this->setX(40);
	    $this->Cell(0, 5, 'JR.CHANCAY No.634', 0, 0);
	    $this->setX(152);
	    $this->Cell(50, 5, 'RUC: 20507848517', 0, 1, 'R');
	    $this->setX(40);
	    $this->Cell(0, 5, 'CERCADO LIMA', 0, 0);
	    $this->setX(152);
	    $this->Cell(50, 5, 'COTIZACION No.: '.$this->nu_cotizacion, 0, 1, 'R');
	    $this->setX(40);
	    $this->Cell(0, 5, 'Telf.:330-1255 / 827*1418 Fax: 592-0282', 0, 1);
	    $this->setX(40);
	    $this->Cell(0, 5, 'EMail:ventasmelygin@hotmail.com', 0, 1);
	}
	function Footer(){
	    #$this->SetFont('Arial','I',8);
	    $this->SetFont('Arial', 'B', 9);
	    $this->SetY(-37);
	    #$this->Cell(0, 10, toTitulo('Página '.$this->PageNo().'/{nb}'), 0, 0, 'R');
	    $w = array(35, 98, 57);
	    $this->Cell($w[0], 5, 'Forma de Pago: ', 'LTR', 0, 'R');
	    $this->SetFont('Arial', '', 9);
	    $this->Cell($w[1], 5, $this->forma_pago, 'RT');
	    $this->SetFont('Arial', 'B', 9);
	    $this->Cell(30, 5, 'Total          S/.', 'T');
	    $this->Cell(27, 5, number_format($this->va_total, 2), 'TR', 0, 'R');
	    $this->ln();
	    $this->SetFont('Arial', 'B', 9);
	    $this->Cell($w[0], 5, 'Validez de Oferta: ', 'LR', 0, 'R');
	    $this->SetFont('Arial', '', 9);
	    $this->Cell($w[1], 5, '15 DIAS', 'R');
	    $this->Cell($w[2], 5, '', 'R');
	    $this->ln();
	    $this->SetFont('Arial', 'B', 9);
	    $this->Cell($w[0], 5, 'Garantia: ', 'LR', 0, 'R');
	    $this->SetFont('Arial', '', 9);
	    $this->Cell($w[1], 5, '', 'R');
	    $this->Cell($w[2], 5, '', 'R');
	    $this->ln();
	    $this->SetFont('Arial', 'B', 9);
	    $this->Cell($w[0], 5, 'Atencion: ', 'LR', 0, 'R');
	    $this->SetFont('Arial', '', 9);
	    $this->Cell($w[1], 5, $this->no_atencion, 'R');
	    $this->Cell($w[2], 5, '', 'R');
	    $this->ln();
	    $this->SetFont('Arial', 'B', 9);
	    $this->Cell($w[0], 5, 'Dias de Entrega: ', 'LR', 0, 'R');
	    $this->SetFont('Arial', '', 9);
	    $this->Cell($w[1], 5, '1 DIA', 'R');
	    $this->Cell($w[2], 5, '', 'R');
	    $this->ln();
	    $this->Cell($w[0], 5, '', 'LRB');
	    $this->SetFont('Arial', 'B', 9);
	    $this->Cell($w[1], 5, 'PRECIOS INCLUYEN IGV', 'RB');
	    $this->Cell($w[2], 5, '', 'RB');

	    $this->Image('sello.png', 113, 261, 29);
	}
}

//QUERY
$conn = new dbapdo();
$nu_documento = $_REQUEST["nu_documento"]; //'001-0000002'; //

$query = "SELECT DATE_FORMAT(cc.fe_cotizacion, '%d/%m/%Y') AS fe_cotizacion, cc.nu_cotizacion, 
			mc.no_cliente, mc.de_direccion, cc.va_venta, cc.co_vendedor, mfp.no_forma_pago
			FROM (c_cotizacion AS cc
			LEFT JOIN m_clientes AS mc ON cc.co_cliente=mc.co_cliente)
			LEFT JOIN m_forma_pago AS mfp ON cc.co_forma_pago=mfp.co_forma_pago
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

$meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

$pdf->ln();
$pdf->SetFont('Arial', 'B', 9);
$pdf->Cell(18, 5, toTitulo('Señores:'), 0, 0);
$pdf->SetFont('Arial', '', 9);
$pdf->Cell(130, 5, $result->no_cliente, 0, 0);
$pdf->SetFont('Arial', 'B', 9);
$pdf->Cell(15, 5, toTitulo('Fecha:'), 0, 0);
$pdf->SetFont('Arial', '', 9);
$pdf->Cell(35, 5, $result->fe_cotizacion, 0, 1);

$pdf->SetFont('Arial', 'B', 9);
$pdf->Cell(18, 5, toTitulo('Direccion:'), 0, 0);
$pdf->SetFont('Arial', '', 9);
$pdf->Cell(130, 5, substr($result->de_direccion, 0, 70) , 0, 0);
$pdf->SetFont('Arial', 'B', 9);
$pdf->Cell(15, 5, toTitulo('Moneda:'), 0, 0);
$pdf->SetFont('Arial', '', 9);
$pdf->Cell(35, 5, 'NUEVOS SOLES', 0, 1);

$w = array(8, 72, 8, 35, 10, 17, 20, 20);

$pdf->SetFont('Arial', 'B', 9);
$pdf->Cell($w[0], 5, toTitulo('Item'), 1, 0);
$pdf->Cell($w[1], 5, toTitulo('Descripción'), 1, 0);
$pdf->Cell($w[2], 5, toTitulo('Vc'), 1, 0);
$pdf->Cell($w[3], 5, toTitulo('Marca y Procedencia'), 1, 0);
$pdf->Cell($w[4], 5, 'UM', 1, 0);
$pdf->Cell($w[5], 5, toTitulo('Cantidad'), 1, 0, 'R');
$pdf->Cell($w[6], 5, toTitulo('Precio'), 1, 0, 'R');
$pdf->Cell($w[7], 5, toTitulo('Total'), 1, 1, 'R');

for ($i=0; $i < 42; $i++) { 
	$pdf->Cell($w[0], 5, '', 'LR', 0);
	$pdf->Cell($w[1], 5, '', 'R', 0);
	$pdf->Cell($w[2], 5, '', 'R', 0);
	$pdf->Cell($w[3], 5, '', 'R', 0);
	$pdf->Cell($w[4], 5, '', 'R', 0);
	$pdf->Cell($w[5], 5, '', 'R', 0);
	$pdf->Cell($w[6], 5, '', 'R', 0);
	$pdf->Cell($w[7], 5, '', 'R', 0);
	$pdf->ln();
}

$pdf->setY(50);
$ln = 1;
foreach ($resultD as $row) {
	$pdf->Cell($w[0], 5, $ln, 0, 0, 'C');
	$pdf->Cell($w[1], 5, $row->no_producto, 0, 0);
	$pdf->Cell($w[2], 5, '', 0, 0);
	$pdf->Cell($w[3], 5, $row->no_sub_categoria, 0, 0);
	$pdf->Cell($w[4], 5, $row->no_unidad, 0, 0);
	$pdf->Cell($w[5], 5, number_format($row->ca_producto, 2), 0, 0, 'R');
	$pdf->Cell($w[6], 5, number_format($row->va_producto, 2), 0, 0, 'R');
	$pdf->Cell($w[7], 5, number_format($row->va_total, 2), 0, 0, 'R');
	$pdf->ln();
	$ln += 1;
}

$pdf->Output('Cotizacion No.pdf', 'I'); //I Mostrar - D Descargar

?>