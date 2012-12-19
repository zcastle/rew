<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $data = json_decode($_REQUEST["categorias"]);

    $query = "UPDATE m_categorias SET
              no_categoria = ?, co_grupo = ?
              WHERE id = ?";

    $stmt = $conn->prepare($query);
    $stmt->bindParam(1, strtoupper($data->no_categoria));
    $stmt->bindParam(2, $data->co_grupo);
    $stmt->bindParam(3, $data->id);
    $stmt->execute();
} else {
    echo ':P';
}
?>
