<?php

require_once '../lib/dbapdo.class.php';

if($_POST){
	$conn = new dbapdo();
	$cia = $_REQUEST['cia'];
	$nu_documento = $_REQUEST['numeroDocumento'];
	$co_usuario = $_REQUEST['co_usuario'];
	$observacion = $_REQUEST['observacion'];
	$detalle = json_decode($_REQUEST['detalle']);

    $sqlCabecera = "INSERT INTO c_orden_abastecimiento (co_empresa, fe_orden, nu_documento, co_usuario, de_observacion) 
                VALUES (:co_empresa, now(), :nu_documento, :co_usuario, :observacion)";

    $sqlDetalle = "INSERT INTO d_orden_abastecimiento (co_empresa, nu_documento, co_producto, ca_producto) 
                   VALUES(?, ?, ?, ?)";

    try {
        $conn->beginTransaction();

        $stmtC = $conn->prepare($sqlCabecera);
        $stmtC->execute(array(
            ':co_empresa' => $cia,
            ':nu_documento' => $nu_documento,
            ':co_usuario' => $co_usuario,
            ':observacion' => $observacion
        ));

        $coProducto = null; $caProducto = null;
        
        $stmtD = $conn->prepare($sqlDetalle);
        $stmtD->bindParam(1, $cia);
        $stmtD->bindParam(2, $nu_documento);
        $stmtD->bindParam(3, $coProducto);
        $stmtD->bindParam(4, $caProducto);

        foreach ($detalle as $linea) {
            $coProducto = $linea->co_producto;
            $caProducto = $linea->ca_producto;
            $stmtD->execute();
        }
        $conn->commit();
        echo "{success: true}";
    } catch (PDOException $e) {
        $conn->rollBack();
        $errorMessage = $e->getMessage();
        echo "{success: false, msg: '$errorMessage'}";
    }

}

?>