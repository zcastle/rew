<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $co_empresa = $_REQUEST['co_empresa'];
    $co_producto = $_REQUEST['co_producto'];

    $query = "";

    if($co_producto == ""){
        $query = "SELECT co_almacen, no_almacen FROM m_almacenes";

        if ($co_empresa <> "null") {
            $query .= " WHERE co_empresa = '$co_empresa'";
        }

        $query .= " ORDER BY co_almacen";
    }else{
        $query = "SELECT rsp.co_almacen, ma.no_almacen
                    FROM (r_stock_producto AS rsp INNER JOIN m_almacenes AS ma ON rsp.co_almacen = ma.co_almacen)
                    WHERE rsp.co_producto = '$co_producto' AND ma.co_empresa = '$co_empresa';";
    }

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "almacen" => $result
    ));
} else {
    echo ":P";
}
?>