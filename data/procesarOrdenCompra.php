<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $cia = $_REQUEST['cia'];
    $tipoComprobante = $_REQUEST['tipoComprobante'];
    $numeroDocumento = $_REQUEST['numeroDocumento'];
    $numeroRequerimiento = $_REQUEST['numeroRequerimiento'];
    $coUsuario = $_REQUEST['coUsuario'];
    $co_proveedor = null;

    $detalle = json_decode(stripcslashes($_REQUEST['detalle']));

    $sqlCabecera = "INSERT INTO c_orden_compra (co_empresa, fe_orden_compra, nu_orden_compra, co_usuario, nu_requerimiento, co_proveedor) 
                VALUES (:co_empresa, NOW(), :nu_orden_compra, :co_usuario, :nu_requerimiento, :co_proveedor)";

    $sqlDetalle = "INSERT INTO d_orden_compra (nu_orden_compra, co_producto, ca_producto, va_producto, nu_linea) 
                   VALUES(?,?,?,?,?)";

    try {
        $conn->beginTransaction();

        $stmtC = $conn->prepare($sqlCabecera);
        $stmtC->execute(array(
            ':co_empresa' => $cia,
            ':nu_orden_compra' => $numeroDocumento,
            ':co_usuario' => $coUsuario,
            ':nu_requerimiento' => $numeroRequerimiento,
            ':co_proveedor' => $co_proveedor
        ));

        $coProducto = null; $caProducto = null; $noLote = null; $feVencimiento = null; $coAlmacen = null;
        $vaProducto = null;
        $ln = 1;
        
        $stmtD = $conn->prepare($sqlDetalle);
        $stmtD->bindParam(1, $numeroDocumento);
        $stmtD->bindParam(2, $coProducto);
        $stmtD->bindParam(3, $caProducto);
        $stmtD->bindParam(4, $vaProducto);
        $stmtD->bindParam(5, $ln);

        foreach ($detalle as $linea) {
            if($linea->co_proveedor){
                $co_proveedor = $linea->co_proveedor;
                $coProducto = $linea->co_producto;
                $caProducto = $linea->ca_producto;
                $vaProducto = $linea->va_producto;
                $stmtD->execute();
                $ln = $ln + 1;
            }
        }
        $conn->commit();
        echo "{success: true}";
    } catch (PDOException $e) {
        $conn->rollBack();
        $errorMessage = $e->getMessage();
        echo "{success: false, msg: '$errorMessage'}";
    }
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>
