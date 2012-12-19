<?php
require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $co_cliente = $_REQUEST['co_cliente'];
    $no_cliente = $_REQUEST['no_cliente'];
    $start = $_REQUEST['start'];
    $limit = $_REQUEST['limit'];

    $query = "SELECT co_cliente AS codigo, no_cliente AS cliente, co_cliente AS ruc, 
            de_direccion AS direccion, co_forma_pago
              FROM m_clientes";
    if($co_cliente <> ''){
        $query .= " WHERE co_cliente = $co_cliente";
    }
    if($no_cliente <> ''){
        $query .= " WHERE no_cliente LIKE '%$no_cliente%' OR co_cliente LIKE '$no_cliente%'";
    }
    $query .= " ORDER BY 2 LIMIT $start, $limit;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();
    
    $queryCount = "SELECT COUNT(*) AS count FROM m_clientes";
    if($co_cliente <> ''){
        $query .= " WHERE co_cliente = $co_cliente";
    }
    if($no_cliente <> ''){
        $query .= " WHERE no_cliente LIKE '$no_cliente%'";
    }
    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->execute();
    $rows = $stmtCount->fetch(PDO::FETCH_OBJ);

    echo json_encode(
            array(
                "success" => true,
                "totalCount" => $rows->count,
                "clientes" => $result
    ));
} else {
    echo ":P";
}
?>