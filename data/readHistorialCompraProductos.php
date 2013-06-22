<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $co_empresa = $_REQUEST['co_empresa'];
    $co_cliente = $_REQUEST['co_cliente'];
    $co_producto = $_REQUEST['co_producto'];
    $start = $_REQUEST['start'];
    $limit = $_REQUEST['limit'];
    $query = "SELECT DATE_FORMAT(cv.fe_venta, '%d/%m/%Y') AS fecha, 
                CONCAT(cv.tipo_comprobante, '-', cv.nu_comprobante) AS nudocumento,
                dv.ca_producto AS cantidad, dv.va_producto AS precio
                FROM (c_ventas AS cv INNER JOIN d_ventas AS dv 
                ON cv.tipo_comprobante = dv.tipo_comprobante AND cv.nu_comprobante = dv.nu_comprobante
                AND dv.co_producto = '$co_producto' 
                AND cv.co_cliente = '$co_cliente' 
                AND cv.co_empresa = '$co_empresa')
                ORDER BY cv.fe_venta DESC LIMIT $start, $limit;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    $queryCount = "SELECT COUNT(*) AS count
                FROM (c_ventas AS cv INNER JOIN d_ventas AS dv 
                ON cv.tipo_comprobante = dv.tipo_comprobante AND cv.nu_comprobante = dv.nu_comprobante
                AND dv.co_producto = '$co_producto' 
                AND cv.co_cliente = '$co_cliente' 
                AND cv.co_empresa = '$co_empresa')";

    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->execute();
    $rows = $stmtCount->fetch(PDO::FETCH_OBJ);

    echo json_encode(
            array(
                "success" => true,
                "totalCount" => $rows->count,
                "historial" => $result
    ));
} else {
    echo ':P';
}
?>