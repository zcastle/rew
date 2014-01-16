<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $data = json_decode($_POST["productos"]);

    $query = "UPDATE m_productos SET fl_eliminado = 'S' WHERE co_producto = ?";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(1, $data->co_producto);
    $stmt->execute();
}
?>
