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
    $co_vendedor = $_REQUEST['co_vendedor'];

    $detalle = json_decode(stripcslashes($_REQUEST['detalle']));

    $sqlCabecera = "INSERT INTO c_orden_despacho (co_empresa, fe_orden_despacho, nu_comprobante, co_cliente, va_neto, va_igv, va_venta, co_vendedor)
                VALUES (:co_empresa, NOW(), :nu_comprobante, :co_cliente, :va_neto, :va_igv, :va_venta, :co_vendedor)";

    $sqlDetalle = "INSERT INTO d_orden_despacho (nu_comprobante, co_producto, ca_producto, va_producto, nu_linea, no_lote, fe_vencimiento) 
                VALUES(?,?,?,?,?,?,?)";
        
    $stmtC = $conn->prepare($sqlCabecera);
    $stmtC->execute(array(
        ':co_empresa' => $cia,
        ':nu_comprobante' => $numeroDocumento,
        ':co_cliente' => $coCliente,
        ':va_neto' => $va_neto,
        ':va_igv' => $va_igv,
        ':va_venta' => $va_venta,
        ':co_vendedor' => $co_vendedor
    ));

    $coProducto = null; $caProducto = null; $vaProducto = null; $noLote = null; $feVencimiento = null;
    $ln = 1;
    
    $stmtD = $conn->prepare($sqlDetalle);
    $stmtD->bindParam(1, $numeroDocumento);
    $stmtD->bindParam(2, $coProducto);
    $stmtD->bindParam(3, $caProducto);
    $stmtD->bindParam(4, $vaProducto);
    $stmtD->bindParam(5, $ln);
    $stmtD->bindParam(6, $noLote);
    $stmtD->bindParam(7, $feVencimiento);

    foreach ($detalle as $linea) {
        $coProducto = $linea[0]->co_producto;
        $caProducto = $linea[0]->cantidad;
        $vaProducto = $linea[0]->precio0;
        $noLote = $linea[0]->lote;
        $feVencimiento = $linea[0]->vencimiento;
        $feVencimiento = substr($feVencimiento, 6, 4) . '-' . substr($feVencimiento, 3, 2) . '-' . substr($feVencimiento, 0, 2);

        $stmtD->execute();

        $ln += 1;
    }

    echo "{success: true}";
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>
