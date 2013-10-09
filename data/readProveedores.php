<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $nu_ruc = $_REQUEST['nu_ruc'];
    $no_proveedor = $_REQUEST['no_proveedor'];
    $start = $_REQUEST['start'];
    $limit = $_REQUEST['limit'];

    $query = "SELECT mp.id, mp.nu_ruc, mp.no_razon_social, mp.de_direccion, mp.no_contacto, 
                    mp.nu_telefono, mp.co_forma_pago, (SELECT no_forma_pago FROM m_forma_pago 
                    WHERE co_forma_pago = mp.co_forma_pago) AS no_forma_pago 
                    FROM m_proveedores mp";
    if($nu_ruc <> '') {
        $query .= " WHERE mp.nu_ruc LIKE %:nu_ruc%";
    }
    if($no_proveedor <> ''){
        $query .= " WHERE ((";
        $claves=explode(" ", $no_proveedor);
        foreach ($claves as $v) {
            $condicion[] = "mp.no_razon_social LIKE '%$v%'";
        }
        $query .= implode(" AND ", $condicion);
        $query .= ")";
        $query .= " OR CONVERT(mp.nu_ruc, UNSIGNED INTEGER) LIKE '%$no_proveedor%')";
    }
    $query .= " ORDER BY 3 LIMIT $start, $limit;";

    $stmt = $conn->prepare($query);
    if($nu_ruc <> '') {
        $stmt->bindParam(':nu_ruc', $nu_ruc);
    }
    $stmt->execute();
    $result = $stmt->fetchAll();

    $queryCount = "SELECT * FROM m_proveedores AS mp";
    if($nu_ruc <> '') {
        $queryCount .= " WHERE mp.nu_ruc LIKE %:nu_ruc%";
    }
    if($no_proveedor <> ''){
        $queryCount .= " WHERE ((";
        $claves=explode(" ", $no_proveedor);
        foreach ($claves as $v) {
            $condicion[] = "mp.no_razon_social LIKE '%$v%'";
        }
        $queryCount .= implode(" AND ", $condicion);
        $queryCount .= ")";
        $queryCount .= " OR CONVERT(mp.nu_ruc, UNSIGNED INTEGER) LIKE '%$no_proveedor%')";
    }
    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->execute();
    $rows = $stmtCount->rowCount();

    echo json_encode(
            array(
                "totalCount" => $rows,
                "proveedores" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>