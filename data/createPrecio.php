<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $data = json_decode($_POST["precios"]);

    $queryPrecios = "INSERT INTO r_productos_precios (co_producto, va_per, va_precio) VALUES (?, ?, ?)";
    $stmtPrecios = $conn->prepare($queryPrecios);
    $stmtPrecios->bindParam(1, $data->co_producto);
    $stmtPrecios->bindParam(2, $data->va_per);
    $stmtPrecios->bindParam(3, $data->va_precio);
    $stmtPrecios->execute();

    echo "{success: true}";
} else {
    echo ':P';
}
?>
