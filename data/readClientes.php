<?php
require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $co_cliente = $_REQUEST['co_cliente'];
    $no_cliente = $_REQUEST['no_cliente'];
    $start = $_REQUEST['start'];
    $limit = $_REQUEST['limit'];

    $query = "SELECT mc.co_cliente AS codigo, mc.no_cliente AS cliente, mc.co_cliente AS ruc, 
            mc.de_direccion AS direccion, mc.co_forma_pago, mc.nu_telefono,
            (SELECT no_forma_pago FROM m_forma_pago WHERE co_forma_pago = mc.co_forma_pago) AS no_forma_pago
            FROM m_clientes AS mc";
    if($co_cliente <> ''){
        $query .= " WHERE mc.co_cliente LIK% %$co_cliente%";
    }
    if($no_cliente <> ''){
        $query .= " WHERE ((";
        $claves=explode(" ", $no_cliente);
        foreach ($claves as $v) {
            $condicion[] = "mc.no_cliente LIKE '%$v%'";
        }
        $query .= implode(" AND ", $condicion);
        $query .= ")";
        $query .= " OR CONVERT(mc.co_cliente, UNSIGNED INTEGER) LIKE '%$no_cliente%')";
    }
    $query .= " ORDER BY 2 LIMIT $start, $limit;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();
    
    $queryCount = "SELECT COUNT(*) AS count FROM m_clientes";
    if($co_cliente <> ''){
        $queryCount .= " WHERE co_cliente LIKE %$co_cliente%";
    }
    if($no_cliente <> ''){
        $queryCount .= " WHERE ((";
        $claves=explode(" ", $no_cliente);
        foreach ($claves as $v) {
            $condicion2[] = "no_cliente LIKE '%$v%'";
        }
        $queryCount .= implode(" AND ", $condicion2);
        $queryCount .= ")";
        $queryCount .= " OR CONVERT(co_cliente, UNSIGNED INTEGER) LIKE '%$no_cliente%')";
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
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>