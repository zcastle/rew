<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $no_unidad = $_REQUEST['no_unidad'];
    $co_empresa = $_REQUEST['co_empresa'];
    $start = $_REQUEST['start'];
    $limit = $_REQUEST['limit'];
    
    $query = "SELECT id, no_unidad, no_sub_unidad, ca_sub_unidad, 
        IF(no_unidad = 'UNI', no_unidad, CONCAT(no_unidad, 'x', ca_sub_unidad, no_sub_unidad)) AS nombre 
        FROM m_unidades_medida WHERE co_empresa LIKE '%$co_empresa%'";
    if($no_unidad <> ''){
        $query .= " AND no_unidad LIKE '$no_unidad%'";
    }
    $query .= " ORDER BY no_unidad LIMIT $start, $limit;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    $queryCount = "SELECT COUNT(*) AS count FROM m_unidades_medida";

    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->execute();
    $rows = $stmtCount->fetch(PDO::FETCH_OBJ);

    echo json_encode(
            array(
                "totalCount" => $rows->count,
                "unidades" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>