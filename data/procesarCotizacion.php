<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    
    $conn = new dbapdo();
    $cia = $_REQUEST['cia'];
    $coCliente = $_REQUEST['coCliente'];
    $numeroDocumento = $_REQUEST['numeroDocumento'];
    $va_neto = $_REQUEST['neto'];
    $va_igv = $_REQUEST['igv'];
    $va_venta = $_REQUEST['total'];
    $co_forma_pago = $_REQUEST['co_forma_pago'];
    $co_vendedor = $_REQUEST['co_vendedor'];

    $detalle = json_decode(stripcslashes($_REQUEST['detalle']));

    $sqlCabecera = "INSERT INTO c_cotizacion (co_empresa, fe_cotizacion, nu_cotizacion, co_cliente, va_neto, va_igv, va_venta, co_forma_pago, co_vendedor)
                VALUES (:co_empresa, NOW(), :nu_cotizacion, :co_cliente, :va_neto, :va_igv, :va_venta, :co_forma_pago, :co_vendedor)";

    $sqlDetalle = "INSERT INTO d_cotizacion (nu_cotizacion, co_producto, ca_producto, va_producto, nu_linea) 
                   VALUES(?,?,?,?,?)";

    $stmtC = $conn->prepare($sqlCabecera);
    $stmtC->execute(array(
        ':co_empresa' => $cia,
        ':nu_cotizacion' => $numeroDocumento,
        ':co_cliente' => $coCliente,
        ':va_neto' => $va_neto,
        ':va_igv' => $va_igv,
        ':va_venta' => $va_venta,
        ':co_forma_pago' => $co_forma_pago,
        ':co_vendedor' => $co_vendedor
    ));

    $coProducto = null; $caProducto = null; $vaProducto = null;
    $ln = 1;
    
    $stmtD = $conn->prepare($sqlDetalle);
    $stmtD->bindParam(1, $numeroDocumento);
    $stmtD->bindParam(2, $coProducto);
    $stmtD->bindParam(3, $caProducto);
    $stmtD->bindParam(4, $vaProducto);
    $stmtD->bindParam(5, $ln);
    
    foreach ($detalle as $linea) {
        $coProducto = $linea[0]->co_producto;
        $caProducto = $linea[0]->cantidad;
        $vaProducto = $linea[0]->precio0;
        $stmtD->execute();

        $ln += 1;
    }

    echo "{success: true}";
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>
