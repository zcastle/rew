<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $data = json_decode($_REQUEST["categorias"]);

    $no_categoria = strtoupper($data->no_categoria);
    $nu_orden = $data->nu_orden == '' ? 0 : $data->nu_orden;

    $query = "UPDATE m_categorias SET
              no_categoria = ?, co_grupo = ?,
              nu_orden = ?, co_destino = ?
              WHERE id = ?";

    $stmt = $conn->prepare($query);
    $stmt->bindParam(1, $no_categoria);
    $stmt->bindParam(2, $data->co_grupo);
    $stmt->bindParam(3, $nu_orden);
    $stmt->bindParam(4, $data->co_destino);
    $stmt->bindParam(5, $data->id);
    $stmt->execute();

    if($data->co_destino <> ''){
        $queryDestino = "UPDATE m_productos SET
              co_destino = ?
              WHERE co_categoria = ?";
        $stmtDestino = $conn->prepare($queryDestino);
        $stmtDestino->bindParam(1, $data->co_destino);
        $stmtDestino->bindParam(2, $data->co_categoria);
        $stmtDestino->execute();
    }
} else {
    echo ':P';
}
?>
