<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $start = $_REQUEST['start'];
    $limit = $_REQUEST['limit'];

    $query = "SELECT DATE_FORMAT(cod.fe_orden_despacho, '%d/%m/%Y %h:%i %p') AS fecha, cod.nu_comprobante, 
              cod.co_cliente, mc.no_cliente, cod.co_vendedor 
              FROM (c_orden_despacho cod LEFT JOIN m_clientes mc ON cod.co_cliente = mc.co_cliente)
              WHERE cod.fl_despachado = 'N'
              ORDER BY cod.fe_orden_despacho LIMIT $start, $limit;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    $queryCount = "SELECT * FROM c_orden_despacho WHERE fl_despachado = 'N'";

    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->execute();
    $rows = $stmtCount->rowCount();

    echo json_encode(
            array(
                "totalCount" => $rows,
                "ordenes" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>