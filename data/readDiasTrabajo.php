<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $start = $_REQUEST['start'];
    $limit = $_REQUEST['limit'];

    $query = "SELECT nu_diadw, DATE_FORMAT(MIN(fe_venta), '%d/%m/%Y') AS fe_ini, DATE_FORMAT(MAX(fe_venta), '%d/%m/%Y') AS fe_fin FROM c_ventas GROUP BY nu_diadw LIMIT $start, $limit;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    $queryCount = "SELECT nu_diadw, MIN(fe_venta) AS fe_ini, MAX(fe_venta) AS fe_fin FROM c_ventas GROUP BY nu_diadw;";

    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->execute();
    $rows = $stmtCount->rowCount();

    echo json_encode(
            array(
            	"totalCount" => $rows,
                "dias" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>