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
    $fe_documento = $_REQUEST['fe_documento'];
    $fe_documento = substr($fe_documento, 6, 4) . '-' . substr($fe_documento, 3, 2) . '-' . substr($fe_documento, 0, 2);
    $fl_igv_incluido = $_REQUEST['fl_igv_incluido'];

    $detalle = json_decode(stripcslashes($_REQUEST['detalle']));

    $sqlCabecera = "INSERT INTO c_cotizacion (co_empresa, fe_cotizacion, nu_cotizacion, co_cliente, va_neto, va_igv, va_venta, co_forma_pago, co_vendedor, fe_crea_registro, fl_igv_incluido)
                VALUES (:co_empresa, :fe_documento, :nu_cotizacion, :co_cliente, :va_neto, :va_igv, :va_venta, :co_forma_pago, :co_vendedor, NOW(), :fl_igv_incluido)";

    $sqlDetalle = "INSERT INTO d_cotizacion (nu_cotizacion, co_producto, ca_producto, va_producto, nu_linea) 
                   VALUES(?,?,?,?,?)";

    $stmtC = $conn->prepare($sqlCabecera);
    $stmtC->execute(array(
        ':co_empresa' => $cia,
        ':fe_documento' => $fe_documento,
        ':nu_cotizacion' => $numeroDocumento,
        ':co_cliente' => $coCliente,
        ':va_neto' => $va_neto,
        ':va_igv' => $va_igv,
        ':va_venta' => $va_venta,
        ':co_forma_pago' => $co_forma_pago,
        ':co_vendedor' => $co_vendedor,
        ':fl_igv_incluido' => $fl_igv_incluido
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
