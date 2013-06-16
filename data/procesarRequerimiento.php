<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $cia = $_REQUEST['cia'];
    $tipoComprobante = $_REQUEST['tipoComprobante'];
    $numeroDocumento = $_REQUEST['numeroDocumento'];
    $observacion = $_REQUEST['observacion'];
    $coUsuario = $_REQUEST['coUsuario'];

    $detalle = json_decode(stripcslashes($_REQUEST['detalle']));

    $sqlCabecera = "INSERT INTO c_requerimiento (co_empresa, fe_requerimiento, nu_requerimiento, co_usuario, observacion) 
                VALUES (:co_empresa, NOW(), :nu_requerimiento, :co_usuario, :observacion)";

    $sqlDetalle = "INSERT INTO d_requerimiento (nu_requerimiento, co_producto, ca_producto, nu_linea) 
                   VALUES(?,?,?,?)";

    try {
        $conn->beginTransaction();

        $stmtC = $conn->prepare($sqlCabecera);
        $stmtC->execute(array(
            ':co_empresa' => $cia,
            ':nu_requerimiento' => $numeroDocumento,
            ':co_usuario' => $coUsuario,
            ':observacion' => $observacion
        ));

        $coProducto = null; $caProducto = null; $noLote = null; $feVencimiento = null; $coAlmacen = null;
        $ln = 1;
        
        $stmtD = $conn->prepare($sqlDetalle);
        $stmtD->bindParam(1, $numeroDocumento);
        $stmtD->bindParam(2, $coProducto);
        $stmtD->bindParam(3, $caProducto);
        $stmtD->bindParam(4, $ln);

        foreach ($detalle as $linea) {
            $coProducto = $linea->co_producto;
            $caProducto = $linea->ca_producto;
            $stmtD->execute();

            $ln = $ln + 1;
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
