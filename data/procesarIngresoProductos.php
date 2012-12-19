<?php

require_once '../lib/dbapdo.class.php';

$conn = new dbapdo();

if ($_POST) {
    $cia = $_REQUEST['cia'];
    $tipoComprobante = $_REQUEST['tipoComprobante'];
    $numeroDocumento = $_REQUEST['numeroDocumento'];
    $otroDocumento = $_REQUEST['otroDocumento'];
    $coProveedor = $_REQUEST['coProveedor'];
    $coUsuario = $_REQUEST['coUsuario'];
    $coAlmacen = $_REQUEST['coAlmacen'];
    $va_neto = $_REQUEST['neto'];
    $va_igv = $_REQUEST['igv'];
    $va_no_gravado = $_REQUEST['va_no_gravado'];
    $co_forma_pago = $_REQUEST['co_forma_pago'];
    $co_moneda = $_REQUEST['co_moneda'];
    $va_tc = $_REQUEST['va_tc'];
    $va_impuesto = $_REQUEST['va_impuesto'];
    $fe_compra = $_REQUEST['fe_compra'];
    $va_compra = $_REQUEST['total'];

    $detalle = json_decode(stripcslashes($_REQUEST['detalle']));

    $sqlCabecera = "INSERT INTO c_ingreso_almacen (co_empresa, fe_compra, tipo_comprobante, nu_comprobante, co_proveedor, va_neto, va_igv, va_no_gravado, va_compra, nu_guia_remision, co_usuario, fe_crea_registro, co_almacen, co_forma_pago, co_moneda, va_tc, va_impuesto) 
                VALUES (:co_empresa, :fe_compra, :tipo_comprobante, :nu_comprobante, :co_proveedor, :va_neto, :va_igv, :va_no_gravado, :va_compra, :otro_documento, :co_usuario, NOW(), :coAlmacen, :co_forma_pago, :co_moneda, :va_tc, :va_impuesto)";

    $sqlDetalle = "INSERT INTO d_ingreso_almacen (tipo_comprobante, nu_comprobante, co_proveedor, co_producto, ca_producto, va_producto, nu_linea, no_lote, fe_vencimiento) 
                   VALUES(?,?,?,?,?,?,?,?,?)";

    $queryCount = "SELECT * FROM c_ingreso_almacen WHERE co_empresa = ? AND tipo_comprobante = ? AND nu_comprobante = ? AND co_proveedor = ?";

    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->bindParam(1, $cia);
    $stmtCount->bindParam(2, $tipoComprobante);
    $stmtCount->bindParam(3, $numeroDocumento);
    $stmtCount->bindParam(4, $coProveedor);
    $stmtCount->execute();
    $rows = $stmtCount->rowCount();

    if ($rows > 0) {
        echo "{success: false, msg: 'Numero de Documento Duplicado'}";
    } else {
        try {
            $conn->beginTransaction();

            $stmtC = $conn->prepare($sqlCabecera);
            $stmtC->execute(array(
                ':co_empresa' => $cia,
                ':fe_compra' => substr($fe_compra, 6, 4) . '-' . substr($fe_compra, 3, 2) . '-' . substr($fe_compra, 0, 2),
                ':tipo_comprobante' => $tipoComprobante,
                ':nu_comprobante' => $numeroDocumento,
                ':co_proveedor' => $coProveedor,
                ':va_neto' => $va_neto,
                ':va_igv' => $va_igv,
                ':va_no_gravado' => $va_no_gravado,
                ':va_compra' => $va_compra,
                ':otro_documento' => $otroDocumento,
                ':co_usuario' => $coUsuario,
                ':coAlmacen' => $coAlmacen,
                ':co_forma_pago' => $co_forma_pago,
                ':co_moneda' => $co_moneda,
                ':va_tc' => $va_tc,
                ':va_impuesto' => $va_impuesto

            ));

            $coProducto = null; $caProducto = null; $vaProducto = null; $noLote = null; $feVencimiento = null;
            $ln = 1;
            
            $stmtD = $conn->prepare($sqlDetalle);
            $stmtD->bindParam(1, $tipoComprobante);
            $stmtD->bindParam(2, $numeroDocumento);
            $stmtD->bindParam(3, $coProveedor);
            $stmtD->bindParam(4, $coProducto);
            $stmtD->bindParam(5, $caProducto);
            $stmtD->bindParam(6, $vaProducto);
            $stmtD->bindParam(7, $ln);
            $stmtD->bindParam(8, $noLote);
            $stmtD->bindParam(9, $feVencimiento);            

            foreach ($detalle as $linea) {
                $coProducto = $linea->co_producto;
                $caProducto = $linea->ca_producto;
                $vaProducto = $linea->va_compra;
                $noLote = $linea->no_lote == '' ? 'S/L' : $linea->no_lote;
                $feVencimiento = $linea->fe_vencimiento;
                $feVencimiento = substr($feVencimiento, 6, 4) . '-' . substr($feVencimiento, 3, 2) . '-' . substr($feVencimiento, 0, 2);
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
    }
} else {
    echo ":P";
}
?>
