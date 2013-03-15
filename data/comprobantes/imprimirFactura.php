<?php
require_once '../../lib/dbapdo.class.php';
require_once '../../lib/numerosaletras.class.php';

$conn = new dbapdo();

$cia = $_REQUEST['cia'];
$tipo_comprobante = $_REQUEST['tipo_comprobante'];
$numero_comprobante = $_REQUEST['numero_comprobante'];

if($tipo_comprobante && $numero_comprobante){
    $queryCabecera = "SELECT DATE_FORMAT(cv.fe_venta, '%d/%m/%Y') AS fe_venta, REPLACE(cv.nu_comprobante, '-', '') AS nu_comprobante, cv.co_cliente, mc.no_cliente, mc.de_direccion, 
                        cv.nu_guia_remision, mfp.no_forma_pago, cv.co_vendedor, cv.va_neto, cv.va_igv, cv.va_venta
                        FROM (c_ventas AS cv LEFT JOIN m_clientes AS mc ON cv.co_cliente = mc.co_cliente)
                        LEFT JOIN m_forma_pago AS mfp ON mc.co_forma_pago = mfp.co_forma_pago
                        WHERE cv.co_empresa = '01' AND cv.tipo_comprobante = '$tipo_comprobante' 
                        AND cv.nu_comprobante = '$numero_comprobante';";

    $queryDetalle = "SELECT dv.ca_producto, mum.no_unidad, mp.no_producto, dv.no_lote, DATE_FORMAT(dv.fe_vencimiento, '%d/%m/%Y') AS fe_vencimiento, 
                        dv.va_producto, (dv.ca_producto * dv.va_producto) AS va_total
                        FROM (d_ventas AS dv INNER JOIN m_productos AS mp ON dv.co_producto = mp.co_producto)
                        INNER JOIN m_unidades_medida AS mum ON mp.co_unidad = mum.id
                        WHERE dv.tipo_comprobante = '$tipo_comprobante' AND dv.nu_comprobante = '$numero_comprobante'
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
//echo "<div id='nu_comprobante'>$resultCabecera->nu_comprobante</div>";
//$resultCabecera->de_direccion
//
echo "<html>";
echo "<head>";
echo "<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>";
echo "<link rel='stylesheet' type='text/css' href='comprobantes.css' />";
echo "</head>";
echo "<body>";
echo "<div id='cabecera'>";
echo "<div id='nu_comprobante' class='line'>$resultCabecera->nu_comprobante</div>";
echo "<div id='fechahora' class='line'>$resultFechaSistema->fechahora</div>";
echo "<div id='no_cliente' class='line'>$resultCabecera->no_cliente</div>";
echo "<div id='fe_venta' class='line'>$resultCabecera->fe_venta</div>";
echo "<div id='de_direccion' class='line'>$resultCabecera->de_direccion</div>";
echo "<div id='nu_guia_remision' class='line'>$resultCabecera->nu_guia_remision</div>";
echo "<div id='co_cliente' class='line'>$resultCabecera->co_cliente</div>";
echo "<div id='no_forma_pago' class='line'>$resultCabecera->no_forma_pago</div>";
echo "<div id='co_vendedor' class='line'>$resultCabecera->co_vendedor</div>";
echo "</div>";
echo "<div id='detalle'>";
foreach ($resultDetalle as $row) {
    $ca_producto = number_format($row['ca_producto'], 2);
    $no_unidad = $row['no_unidad'];
    $no_producto = $row['no_producto'];
    $no_lote = $row['no_lote'];
    $fe_vencimiento = $row['fe_vencimiento'];
    $va_producto = number_format($row['va_producto'], 2);
    $va_total = number_format($row['va_total'], 2);
    echo "<div id='ca_producto' class='line'>$ca_producto</div>";
    echo "<div id='no_unidad' class='line'>$no_unidad</div>";
    echo "<div id='no_producto' class='line'>$no_producto</div>";
    echo "<div id='no_lote' class='line'>$no_lote</div>";
    echo "<div id='fe_vencimiento' class='line'>$fe_vencimiento</div>";
    echo "<div id='va_producto' class='line format_number'>$va_producto</div>";
    echo "<div id='va_total' class='line format_number'>$va_total</div>";
}
$numeroLetras = numtoletras($resultCabecera->va_venta);
$vaNeto = number_format($resultCabecera->va_neto, 2);
$vaIgv = number_format($resultCabecera->va_igv, 2);
$vaVenta = number_format($resultCabecera->va_venta, 2);
echo "</div>";
echo "<div id='totales'>";
echo "<div id='son'>SON: $numeroLetras</div>";
echo "<div id='stotal' class='format_number'>$vaNeto</div>";
echo "<div id='igv' class='format_number'>$vaIgv</div>";
echo "<div id='total' class='format_number'>$vaVenta</div>";
echo "</div>";
?>