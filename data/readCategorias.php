<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $no_categoria = $_REQUEST['no_categoria'];
    $co_empresa = $_REQUEST['co_empresa'];
    $co_grupo = $_REQUEST['co_grupo'];
    $start = $_REQUEST['start'];
    $limit = $_REQUEST['limit'];

    $query = "SELECT mc.id, mc.co_categoria, mc.no_categoria, mc.co_grupo, mg.no_grupo
              FROM m_categorias mc INNER JOIN m_grupos mg ON mc.co_grupo = mg.co_grupo
              AND mc.co_empresa = mg.co_empresa
              WHERE mc.co_empresa LIKE '%$co_empresa%'";
    if($no_categoria <> ''){
        $query .= " AND mc.no_categoria LIKE '$no_categoria%'";
    }
    if($co_grupo <> ''){
        $query .= " AND mc.co_grupo = '$co_grupo'";
    }
    $query .= " ORDER BY mc.no_categoria LIMIT $start, $limit;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    $queryCount = "SELECT * FROM m_categorias mc INNER JOIN m_grupos mg ON mc.co_grupo = mg.co_grupo";

    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->execute();
    $rows = $stmtCount->rowCount();

    echo json_encode(
            array(
                "totalCount" => $rows,
                "categorias" => $result
    ));
} else {
    echo ":P";
}
?>