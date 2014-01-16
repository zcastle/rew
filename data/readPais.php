<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $no_pais = $_REQUEST['no_pais'];
    $start = $_POST['start'];
    $limit = $_POST['limit'];

    $query = "SELECT co_pais, no_pais FROM m_paises";
    if ($no_pais <> '') {
        $query .= " WHERE no_pais LIKE '$no_pais%'";
    }
    $query .= " ORDER BY no_pais LIMIT $start, $limit;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    $queryCount = "SELECT * FROM m_paises";

    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->execute();
    $rows = $stmtCount->rowCount();

    echo json_encode(
            array(
                "totalCount" => $rows,
                "pais" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>