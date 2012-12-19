<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    
    $conn = new dbapdo();
    $co_producto = $_REQUEST['co_producto'];

    $query = "SELECT id, co_producto, va_per, va_precio
              FROM r_productos_precios
              WHERE co_producto = '$co_producto'
              ORDER BY va_per";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "precios" => $result
    ));
} else {
    echo ":P";
}
?>