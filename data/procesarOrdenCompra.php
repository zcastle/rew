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

    $sqlCabecera = "INSERT INTO c_orden_compra (co_empresa, fe_orden_compra, nu_orden_compra, co_usuario, nu_requerimiento, co_proveedor, va_orden) 
                VALUES (:co_empresa, NOW(), :nu_orden_compra, :co_usuario, :nu_requerimiento, :co_proveedor, :va_orden)";

    $sqlDetalle = "INSERT INTO d_orden_compra (nu_orden_compra, co_producto, ca_producto, va_producto, nu_linea) 
                   VALUES(?,?,?,?,?)";

    $queryTmpDrop = "DROP TABLE IF EXISTS tmp_oc";
    $queryTmp = "CREATE TABLE tmp_oc SELECT * FROM d_orden_compra WHERE 1=2;";
    $sqlDetalleTmp = "INSERT INTO tmp_oc (nu_orden_compra, co_producto, ca_producto, va_producto, nu_linea, co_proveedor) 
                   VALUES(?,?,?,?,?,?)";
    $queryDetalleTmp = "SELECT nu_orden_compra, co_producto, ca_producto, va_producto, nu_linea FROM tmp_oc
                        WHERE co_proveedor = ?";

    try {
        $conn->beginTransaction();

        $coProducto = null; $caProducto = null; $noLote = null; $feVencimiento = null; $coAlmacen = null;
        $vaProducto = null;
        $ln = 1;
        $va_orden = 0;
        

        $stmtTmpDrop = $conn->prepare($queryTmpDrop);
        $stmtTmpDrop->execute();
        $stmtTmp = $conn->prepare($queryTmp);
        $stmtTmp->execute();

        $stmtDTmp = $conn->prepare($sqlDetalleTmp);
        $stmtDTmp->bindParam(1, $numeroDocumento);
        $stmtDTmp->bindParam(2, $coProducto);
        $stmtDTmp->bindParam(3, $caProducto);
        $stmtDTmp->bindParam(4, $vaProducto);
        $stmtDTmp->bindParam(5, $ln);
        $stmtDTmp->bindParam(6, $co_proveedor);

        $proveedores = array();

        foreach ($detalle as $linea) {
            if($linea->co_proveedor){
                $proveedores[] = $linea->co_proveedor;
                $co_proveedor = $linea->co_proveedor;
                $coProducto = $linea->co_producto;
                $caProducto = $linea->ca_producto;
                $vaProducto = $linea->va_producto;
                $stmtDTmp->execute();
                $ln = $ln + 1;
            }
        }

        $stmtD = $conn->prepare($sqlDetalle);
        $stmtD->bindParam(1, $numeroDocumento);
        $stmtD->bindParam(2, $coProducto);
        $stmtD->bindParam(3, $caProducto);
        $stmtD->bindParam(4, $vaProducto);
        $stmtD->bindParam(5, $ln);

        $proveedores = array_unique($proveedores);
        $series = array();
        foreach ($proveedores as $proveedor) {
            //echo $proveedor.'<br>';
            ///nuevo numero de orden de compra
                $querySecuencia = "SELECT CONCAT(RIGHT(CONCAT('000', nu_serie), 3), '-', RIGHT(CONCAT('0000000', nu_secuencia), 7)) AS secuencia, 
                      nu_serie, nu_secuencia
                      FROM m_secuenciales 
                      WHERE co_empresa = ? AND co_documento = ? AND nu_serie = ? LIMIT 1;";
                $tipoDocumento = 'OC';
                $nuSerie = '1';
                $stmtSecuencia = $conn->prepare($querySecuencia);
                $stmtSecuencia->bindParam(1, $cia);
                $stmtSecuencia->bindParam(2, $tipoDocumento);
                $stmtSecuencia->bindParam(3, $nuSerie);
                $stmtSecuencia->execute();
                $resultSecuencia = $stmtSecuencia->fetch(PDO::FETCH_OBJ);
                $numeroDocumento = $resultSecuencia->secuencia;
                $series[] = $numeroDocumento;
            //fin
            $stmtDetalleTmp = $conn->prepare($queryDetalleTmp);
            $stmtDetalleTmp->bindParam(1, $proveedor);
            $stmtDetalleTmp->execute();
            $result = $stmtDetalleTmp->fetchAll();

            foreach ($result as $row) {
                //$co_proveedor = $linea->co_proveedor;
                $coProducto = $row['co_producto'];
                $caProducto = $row['ca_producto'];
                $vaProducto = $row['va_producto'];
                $stmtD->execute();
                $va_orden += ($caProducto*$vaProducto);
                $ln = $ln + 1;
                $sqlUpdateDetalleRequerimiento = "UPDATE d_requerimiento SET fl_atendido = 'S' WHERE co_producto = :co_producto AND nu_requerimiento = :nu_requerimiento";
                $stmtUD = $conn->prepare($sqlUpdateDetalleRequerimiento);
                $stmtUD->execute(array(
                    ':co_producto' => $row['co_producto'],
                    ':nu_requerimiento' => $numeroRequerimiento
                ));
            }
            $stmtC = $conn->prepare($sqlCabecera);
            $stmtC->execute(array(
                ':co_empresa' => $cia,
                ':nu_orden_compra' => $numeroDocumento,
                ':co_usuario' => $coUsuario,
                ':nu_requerimiento' => $numeroRequerimiento,
                ':co_proveedor' => $co_proveedor,
                ':va_orden' => $va_orden
            ));

            //////
            $querySecuenciaDelete = "UPDATE m_secuenciales 
                SET nu_secuencia = nu_secuencia + 1 
                WHERE co_empresa = ? AND co_documento = ? and nu_serie = ?;";
            $stmtSecuenciaD = $conn->prepare($querySecuenciaDelete);
            $stmtSecuenciaD->bindParam(1, $cia);
            $stmtSecuenciaD->bindParam(2, $tipoDocumento);
            $stmtSecuenciaD->bindParam(3, $nuSerie);
            $stmtSecuenciaD->execute();
            //////
        }

        $sqlDetalleCount = "SELECT * FROM d_requerimiento WHERE nu_requerimiento = :nu_requerimiento";
        $stmtC = $conn->prepare($sqlDetalleCount);
        $stmtC->execute(array(
            ':nu_requerimiento' => $numeroRequerimiento
        ));
        $rowsC = $stmtC->rowCount();
        $ln = $ln - 1;
        if($rowsC == $ln){
            $sqlUpdate = "UPDATE c_requerimiento SET fl_atendido = 'S' WHERE nu_requerimiento = :nu_requerimiento";
            $stmtU = $conn->prepare($sqlUpdate);
            $stmtU->execute(array(
                ':nu_requerimiento' => $numeroRequerimiento
            ));
        }

        $conn->commit();
        //$series
        //echo "{success: true}";
        echo json_encode(
            array(
                'success' => true,
                'series' => $series
            ));
    } catch (PDOException $e) {
        $conn->rollBack();
        $errorMessage = $e->getMessage();
        echo "{success: false, msg: '$errorMessage'}";
    }
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>
