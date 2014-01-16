<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $data = json_decode($_POST["categorias"]);

    $query = "DELETE FROM m_categorias WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(1, $data->id);
    $stmt->execute();
}
?>
