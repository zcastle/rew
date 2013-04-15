<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $no_sub_categoria = $_REQUEST['no_sub_categoria'];
    $start = $_POST['start'];
    $limit = $_POST['limit'];

    $query = "SELECT co_sub_categoria, no_sub_categoria FROM m_sub_categorias";
    if ($no_sub_categoria <> '') {
        $query .= " WHERE no_sub_categoria LIKE '$no_sub_categoria%'";
    }
    $query .= " ORDER BY no_sub_categoria LIMIT $start, $limit;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    $queryCount = "SELECT * FROM m_sub_categorias";

    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->execute();
    $rows = $stmtCount->rowCount();

    echo json_encode(
            array(
                "totalCount" => $rows,
                "subcategorias" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>