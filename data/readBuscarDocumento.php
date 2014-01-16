<?php
require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $tipo_documento = $_REQUEST['tipo_documento'];
    $start = $_REQUEST['start'];
    $limit = $_REQUEST['limit'];

    if($tipo_documento == 'CC'){
        $query = "SELECT DATE_FORMAT(cv.fe_cotizacion, '%d/%m/%Y') AS fe_documento,
            'CC' AS tipo_documento, cv.nu_cotizacion AS nu_documento, 
            cv.co_cliente, mc.no_cliente, cv.va_venta
            FROM c_cotizacion AS cv INNER JOIN m_clientes AS mc ON cv.co_cliente = mc.co_cliente
            ORDER BY 1 DESC";
    } else {
        $query = "SELECT DATE_FORMAT(cv.fe_venta, '%d/%m/%Y') AS fe_documento,
            cv.tipo_comprobante AS tipo_documento, cv.nu_comprobante AS nu_documento, 
            cv.co_cliente, mc.no_cliente, cv.va_venta
            FROM c_ventas AS cv INNER JOIN m_clientes AS mc ON cv.co_cliente = mc.co_cliente
            WHERE cv.tipo_comprobante = '$tipo_documento'
            ORDER BY 2 DESC, 1 DESC LIMIT $start, $limit;";
    }

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    if($tipo_documento == 'CC'){
        $queryCount = "SELECT * FROM c_cotizacion AS cv INNER JOIN m_clientes AS mc ON cv.co_cliente = mc.co_cliente
            ORDER BY 1 DESC";
    } else {
        $queryCount = "SELECT * FROM c_ventas AS cv INNER JOIN m_clientes AS mc ON cv.co_cliente = mc.co_cliente
            WHERE cv.tipo_comprobante = '$tipo_documento'
            ORDER BY 2 DESC, 1 DESC;";
    }

    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->execute();
    $rows = $stmtCount->rowCount();

    echo json_encode(
            array(
            	"totalCount" => $rows,
                "documentos" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>