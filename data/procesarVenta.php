<?php

require_once '../lib/dbapdo.class.php';

$conn = new dbapdo();

if ($_POST) {
    $cia = $_REQUEST['cia'];
    $coCliente = $_REQUEST['coCliente'];
    $tipoComprobante = $_REQUEST['tipoComprobante'];
    $numeroDocumento = $_REQUEST['numeroDocumento'];
    $va_neto = $_REQUEST['neto'];
    $va_igv = $_REQUEST['igv'];
    $va_venta = $_REQUEST['total'];
    $co_forma_pago = $_REQUEST['co_forma_pago'];
    $co_vendedor = $_REQUEST['co_vendedor'];
    $nu_guia_remision = $_REQUEST['nuGuiaRemision'];
    $fe_vencimiento = $_REQUEST['fe_vencimiento'];
    $fe_vencimiento = substr($fe_vencimiento, 6, 4) . '-' . substr($fe_vencimiento, 3, 2) . '-' . substr($fe_vencimiento, 0, 2);


    $detalle = json_decode(stripcslashes($_REQUEST['detalle']));

    $sqlCabecera = "INSERT INTO c_ventas (co_empresa, fe_venta, tipo_comprobante, nu_comprobante, co_cliente, va_neto, va_igv, va_venta, co_forma_pago, co_vendedor, fe_vencimiento)
                    VALUES (:co_empresa, NOW(), :tipo_comprobante, :nu_comprobante, :co_cliente, :va_neto, :va_igv, :va_venta, :co_forma_pago, :co_vendedor, :fe_vencimiento)";

    $sqlDetalle = "INSERT INTO d_ventas (tipo_comprobante, nu_comprobante, co_producto, ca_producto, va_producto, nu_linea, no_lote, fe_vencimiento, co_almacen) 
                   VALUES(?,?,?,?,?,?,?,?,?)";
    
    try {
        $conn->beginTransaction();
        $stmtC = $conn->prepare($sqlCabecera);
        //$stmt->bindParam(':id', $id);
        $stmtC->execute(array(
            ':co_empresa' => $cia,
            ':tipo_comprobante' => $tipoComprobante,
            ':nu_comprobante' => $numeroDocumento,
            ':co_cliente' => $coCliente,
            ':va_neto' => $va_neto,
            ':va_igv' => $va_igv,
            ':va_venta' => $va_venta,
            ':co_forma_pago' => $co_forma_pago,
            ':co_vendedor' => $co_vendedor,
            ':fe_vencimiento' => $fe_vencimiento
        ));

        $coProducto = null; $caProducto = null; $vaProducto = null; $noLote = null; $feVencimiento = null; $coAlmacen = null;
        $ln = 1;
        
        $stmtD = $conn->prepare($sqlDetalle);
        $stmtD->bindParam(1, $tipoComprobante);
        $stmtD->bindParam(2, $numeroDocumento);
        $stmtD->bindParam(3, $coProducto);
        $stmtD->bindParam(4, $caProducto);
        $stmtD->bindParam(5, $vaProducto);
        $stmtD->bindParam(6, $ln);
        $stmtD->bindParam(7, $noLote);
        $stmtD->bindParam(8, $feVencimiento);
        $stmtD->bindParam(9, $coAlmacen);
        
        foreach ($detalle as $linea) {
            $coProducto = $linea[0]->co_producto;
            $caProducto = $linea[0]->cantidad;
            $vaProducto = $linea[0]->precio0;
            $noLote = $linea[0]->lote;
            $coAlmacen = $linea[0]->co_almacen;
            $feVencimiento = $linea[0]->vencimiento;
            $feVencimiento = substr($feVencimiento, 6, 4) . '-' . substr($feVencimiento, 3, 2) . '-' . substr($feVencimiento, 0, 2);

            $stmtD->execute();

            $ln += 1;
        }

        $tipoOtroDocumento = substr($nu_guia_remision, 0, 2);
        $nu_cotizacion = substr($nu_guia_remision, 3);
        $nu_comprobante = $tipoComprobante+'-'+$numeroDocumento;
        $queryOtroDocumento = "";
        if($tipoOtroDocumento == 'GR'){
            $queryOtroDocumento = "UPDATE c_guia_remision SET fl_facturado = 'S' WHERE nu_comprobante = ?";
            $stmtGR = $conn->prepare($queryOtroDocumento);
            $stmtGR->bindParam(1, $nu_guia_remision);
            $stmtGR->execute();
            $queryUpdateNuGuiaRemision= "UPDATE c_ventas SET nu_guia_remision = ? WHERE tipo_comprobante = ? AND nu_comprobante = ?";
            $stmtGR = $conn->prepare($queryUpdateNuGuiaRemision);
            $stmtGR->bindParam(1, $nu_cotizacion);
            $stmtGR->bindParam(2, $tipoComprobante);
            $stmtGR->bindParam(3, $numeroDocumento);
            $stmtGR->execute();
        }else if($tipoOtroDocumento == 'CC'){
            $queryOtroDocumento = "UPDATE c_cotizacion SET nu_comprobante = ? WHERE nu_cotizacion = ?";
            $stmtCC = $conn->prepare($queryOtroDocumento);
            $stmtCC->bindParam(1, $nu_comprobante);
            $stmtCC->bindParam(2, $nu_cotizacion);
            $stmtCC->execute();
            $queryUpdateNuCotizacion = "UPDATE c_ventas SET nu_cotizacion = ? WHERE tipo_comprobante = ? AND nu_comprobante = ?";
            $stmtCC = $conn->prepare($queryUpdateNuCotizacion);
            $stmtCC->bindParam(1, $nu_cotizacion);
            $stmtCC->bindParam(2, $tipoComprobante);
            $stmtCC->bindParam(3, $numeroDocumento);
            $stmtCC->execute();
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