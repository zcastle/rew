<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $cia = $_REQUEST['cia'];
    $tipoComprobante = $_REQUEST['tipoComprobante'];
    $numeroDocumento = $_REQUEST['numeroDocumento'];
    $co_almacen_origen = $_REQUEST['co_almacen_origen'];
    $coUsuario = $_REQUEST['coUsuario'];

    $detalle = json_decode(stripcslashes($_REQUEST['detalle']));

    $sqlCabecera = "INSERT INTO c_guia_transferencia (co_empresa, tipo_comprobante, nu_comprobante, co_usuario, fe_crea_registro, co_almacen_origen) 
                VALUES (:co_empresa, :tipo_comprobante, :nu_comprobante, :co_usuario, NOW(), :co_almacen_origen)";

    $sqlDetalle = "INSERT INTO d_guia_transferencia (tipo_comprobante, nu_comprobante, co_producto, ca_producto, nu_linea, no_lote, fe_vencimiento, co_almacen_destino) 
                   VALUES(?,?,?,?,?,?,?,?)";

    try {
        $conn->beginTransaction();

        $stmtC = $conn->prepare($sqlCabecera);
        $stmtC->execute(array(
            ':co_empresa' => $cia,
            ':tipo_comprobante' => $tipoComprobante,
            ':nu_comprobante' => $numeroDocumento,
            ':co_usuario' => $coUsuario,
            ':co_almacen_origen' => $co_almacen_origen
        ));

        $coProducto = null; $caProducto = null; $noLote = null; $feVencimiento = null; $co_almacen_destino = null;
        $ln = 1;
        
        $stmtD = $conn->prepare($sqlDetalle);
        $stmtD->bindParam(1, $tipoComprobante);
        $stmtD->bindParam(2, $numeroDocumento);
        $stmtD->bindParam(3, $coProducto);
        $stmtD->bindParam(4, $caProducto);
        $stmtD->bindParam(5, $ln);
        $stmtD->bindParam(6, $noLote);
        $stmtD->bindParam(7, $feVencimiento);
        $stmtD->bindParam(8, $co_almacen_destino);

        foreach ($detalle as $linea) {
            $coProducto = $linea->co_producto;
            $caProducto = $linea->ca_producto;
            $noLote = $linea->no_lote;
            $feVencimiento = $linea->fe_vencimiento;
            $feVencimiento = substr($feVencimiento, 6, 4) . '-' . substr($feVencimiento, 3, 2) . '-' . substr($feVencimiento, 0, 2);
            $co_almacen_destino = $linea->co_almacen_destino;
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
    echo ":P";
}
?>
