<?php

require_once '../../lib/dbapdo.class.php';
require_once '../../lib/tcpdf/tcpdf.php';
class MYPDF extends TCPDF {
    public function Header() {
        $this->SetFont('courier', 'B', 8, '', true);
        $this->Cell(0, 0, 'Fecha emision: '. date("d/m/Y", time()), 0, false, 'R');
        $this->ln();
        $this->Cell(0, 0, 'Pagina '.$this->getAliasNumPage(), 0, false, 'R');
    }

    public function Footer() { }
}

$pdf = new MYPDF("L", "mm", "LEGAL", true, 'UTF-8', false);
$conn = new dbapdo();

$mes_ini = $_GET['mes_ini'];
$anio_ini = $_GET['anio_ini'];
$mes_fin = $_GET['mes_fin'];
$anio_fin = $_GET['anio_fin'];

if($mes_ini && $anio_ini && $mes_fin && $anio_fin){
    $query = "SELECT CONCAT(v.opventa, RIGHT(CONCAT('0000', @ROW_NUMBER:=@ROW_NUMBER + 1), 4)) AS opventa, v.co_cliente, v.no_cliente, 
            v.fe_venta, v.fe_vencimiento,
            v.tipo_comprobante, v.nu_comprobante, v.docidentidad,
            v.va_neto, v.va_igv, v.va_venta FROM
            (SELECT CONCAT(DATE_FORMAT(cv.fe_venta, '%Y'), DATE_FORMAT(cv.fe_venta, '%m')) AS opventa, 
            IF(cv.co_cliente = '', '99999999999', cv.co_cliente) AS co_cliente,
            IF(cv.fl_anulada = 'S', 'ANULADA', IFNULL(mc.no_cliente, 'VARIOS')) AS no_cliente, 
            DATE_FORMAT(cv.fe_venta, '%d/%m/%Y') AS fe_venta, 
            DATE_FORMAT(cv.fe_vencimiento, '%d/%m/%Y') AS fe_vencimiento, 
            IF(cv.tipo_comprobante='FV', '01', '03') AS tipo_comprobante, 
            cv.nu_comprobante, '6' AS docidentidad,
            cv.va_neto, cv.va_igv, cv.va_venta
            FROM c_ventas AS cv LEFT JOIN m_clientes AS mc ON cv.co_cliente = mc.co_cliente
            WHERE (MONTH(cv.fe_venta) >= $mes_ini AND YEAR(cv.fe_venta) >= $anio_ini) AND 
            (MONTH(cv.fe_venta) <= $mes_fin AND YEAR(cv.fe_venta) <= $anio_fin)
            ORDER BY cv.fe_venta) AS v, (SELECT @ROW_NUMBER:=0) AS r";
} else {
    $query = "SELECT CONCAT(DATE_FORMAT(cv.fe_venta, '%Y'), DATE_FORMAT(cv.fe_venta, '%m'), 'XXXX') AS opventa, 
            IF(cv.co_cliente = '', '99999999999', cv.co_cliente) AS co_cliente,
            IF(cv.fl_anulada = 'S', 'ANULADA', IFNULL(mc.no_cliente, 'VARIOS')) AS no_cliente, 
            DATE_FORMAT(cv.fe_venta, '%d/%m/%Y') AS fe_venta, 
            DATE_FORMAT(cv.fe_vencimiento, '%d/%m/%Y') AS fe_vencimiento, 
            IF(cv.tipo_comprobante='FV', '01', '03') AS tipo_comprobante,
            cv.nu_comprobante, '6' AS docidentidad,
            cv.va_neto, cv.va_igv, cv.va_venta
            FROM c_ventas AS cv LEFT JOIN m_clientes AS mc ON cv.co_cliente = mc.co_cliente
            ORDER BY cv.fe_venta LIMIT 50";
}

$stm = $conn->prepare($query);
$stm->execute();
$result = $stm->fetchAll();

$queryPeriodo = "SELECT CURDATE() FROM dual";
$stmPeriodo = $conn->prepare($queryPeriodo);
$stmPeriodo->execute();
$periodo = $stmPeriodo->fetch(PDO::FETCH_OBJ);

$pdf->AddPage();

$pdf->SetFont('courier', 'B', 7, '', true);
$w = array(17, 20, 20, 10, 10, 15, 10, 20, 38, 20, 15, 16, 16, 13, 10, 15, 10, 15, 20, 10);

$pdf->Cell(0, 0, 'REGISTRO DE VENTAS MN');
$pdf->Ln();
$pdf->Cell(0, 0, 'PERIODO:');
$pdf->Ln();
$pdf->Cell(0, 0, 'RUC: 20507848517');
$pdf->Ln();
$pdf->Cell(0, 0, 'CIA: DROGUERIA E & IMPORTADORA MELY GIN S.R.L');
$pdf->Ln();
$pdf->Ln();

$pdf->Cell($w[0], 0, 'CODIGO');
$pdf->Cell($w[1], 0, ' ');
$pdf->Cell($w[2], 0, ' ');
$pdf->Cell($w[3], 0, 'COMPROBANTE DE');
$pdf->Cell($w[4], 0, ' ');
$pdf->Cell($w[5], 0, ' ');
$pdf->Cell($w[6], 0, 'DOCUMENTO DE');
$pdf->Cell($w[7], 0, ' ');
$pdf->Cell($w[8], 0, 'APELLIDOS Y NOMBRES');
$pdf->Cell($w[9], 0, 'VALOR');
$pdf->Cell($w[10], 0, 'BASE');
$pdf->Cell($w[11], 0, 'IMPORTE TOTAL');
$pdf->Cell($w[12], 0, ' ');
$pdf->Cell($w[13], 0, ' ');
$pdf->Cell($w[14], 0, ' ');
$pdf->Cell($w[15], 0, ' ');
$pdf->Cell($w[16], 0, ' ');
$pdf->Cell($w[17], 0, ' ');
$pdf->Cell($w[18], 0, 'REFERENCIA DEL COMPROBANTE ');
$pdf->Cell($w[19], 0, ' ');

$pdf->Ln();
$pdf->Cell($w[0], 0, 'UNICO DE');
$pdf->Cell($w[1], 0, 'FECHA');
$pdf->Cell($w[2], 0, 'FECHA');
$pdf->Cell($w[3], 0, 'PAGO');
$pdf->Cell($w[4], 0, ' ');
$pdf->Cell($w[5], 0, ' ');
$pdf->Cell($w[6], 0, 'IDENTIDAD');
$pdf->Cell($w[7], 0, ' ');
$pdf->Cell($w[8], 0, 'O');
$pdf->Cell($w[9], 0, 'FACTURADO');
$pdf->Cell($w[10], 0, 'IMPONIBLE');
$pdf->Cell($w[11], 0, '-------------------');
$pdf->Cell($w[12], 0, ' ');
$pdf->Cell($w[13], 0, ' ');
$pdf->Cell($w[14], 0, ' ');
$pdf->Cell($w[15], 0, 'OTROS');
$pdf->Cell($w[16], 0, ' ');
$pdf->Cell($w[17], 0, ' ');
$pdf->Cell($w[18], 0, '--------------------------');
$pdf->Cell($w[19], 0, ' ');

$pdf->Ln();
$pdf->Cell($w[0], 0, 'OPERACION');
$pdf->Cell($w[1], 0, 'EMISION');
$pdf->Cell($w[2], 0, 'VENCE');
$pdf->Cell($w[3], 0, 'TIPO');
$pdf->Cell($w[4], 0, 'SERIE');
$pdf->Cell($w[5], 0, 'NUMERO');
$pdf->Cell($w[6], 0, 'TIPO');
$pdf->Cell($w[7], 0, 'NUMERO');
$pdf->Cell($w[8], 0, 'RAZON SOCIAL');
$pdf->Cell($w[9], 0, 'DE EXPORT');
$pdf->Cell($w[10], 0, 'GRAVADA');
$pdf->Cell($w[11], 0, 'EXONERADA');
$pdf->Cell($w[12], 0, 'INAFECTA');
$pdf->Cell($w[13], 0, 'ISC');
$pdf->Cell($w[14], 0, 'IGV', 0, 0, 'R');
$pdf->Cell($w[15], 0, 'TRIB.');
$pdf->Cell($w[16], 0, 'TOTAL', 0, 0, 'R');
$pdf->Cell($w[17], 0, 'T.C.');
$pdf->Cell($w[18], 0, 'FECHA');
$pdf->Cell($w[19], 0, 'TIPO NUMERO');

$pdf->Ln();
$pdf->SetFont('courier', '', 7, '', true);

foreach ($result as $row) {
    $pdf->Cell($w[0], 0, $row['opventa']);
    $pdf->Cell($w[1], 0, $row['fe_venta']);
    $pdf->Cell($w[2], 0, $row['fe_vencimiento']);
    $pdf->Cell($w[3], 0, $row['tipo_comprobante']);
    $pdf->Cell($w[4], 0, str_replace('-', '   ', $row['nu_comprobante']));
    $pdf->Cell($w[5], 0, '');
    $pdf->Cell($w[6], 0, $row['docidentidad']);
    $pdf->Cell($w[7], 0, $row['co_cliente']);
    $pdf->Cell($w[8], 0, $row['no_cliente']);
    $pdf->Cell($w[9], 0, '0.00   ', 0, 0, 'R');
    $pdf->Cell($w[10], 0, number_format($row['va_neto'], 2), 0, 0, 'R');
    $pdf->Cell($w[11], 0, '0.00', 0, 0, 'R');
    $pdf->Cell($w[12], 0, '0.00  ', 0, 0, 'R');
    $pdf->Cell($w[13], 0, '0.00    ', 0, 0, 'R');
    $pdf->Cell($w[14], 0, number_format($row['va_igv'], 2), 0, 0, 'R');
    $pdf->Cell($w[15], 0, '0.00    ', 0, 0, 'R');
    $pdf->Cell($w[16], 0, number_format($row['va_venta'], 2), 0, 0, 'R');
    $pdf->Cell($w[17], 0, '0.00    ', 0, 0, 'R');

    #$pdf->Cell($w[4], 0,  number_format($row['va_venta'], 2), 0, 0, 'R');
    $pdf->Ln();
    
}

$pdf->Output('reporteLibroVentas.pdf', 'I');
?>
