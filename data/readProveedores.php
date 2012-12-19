<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $start = $_REQUEST['start'];
    $limit = $_REQUEST['limit'];
    $nu_ruc = $_REQUEST['nu_ruc'];

    $query = "SELECT * FROM m_proveedores";
    if($nu_ruc <> '') {
        $query .= " WHERE nu_ruc = :nu_ruc";
    }
    $query .= " ORDER BY 2 LIMIT $start, $limit;";

    $stmt = $conn->prepare($query);
    if($nu_ruc <> '') {
        $stmt->bindParam(':nu_ruc', $nu_ruc);
    }
    $stmt->execute();
    $result = $stmt->fetchAll();

    $queryCount = "SELECT * FROM m_proveedores";

    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->execute();
    $rows = $stmtCount->rowCount();

    echo json_encode(
            array(
                "totalCount" => $rows,
                "proveedores" => $result
    ));
} else {
    echo ":P";
}
?>