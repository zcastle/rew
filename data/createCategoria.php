<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $data = json_decode($_REQUEST["categorias"]);
    $co_empresa = $_REQUEST["co_empresa"];

    $queryCodigo = "SELECT RIGHT(CONCAT('00000',MAX(co_categoria) + 1), 5) AS co_categoria FROM m_categorias";
    $stmtCodigo = $conn->prepare($queryCodigo);
    $stmtCodigo->execute();
    $row = $stmtCodigo->fetch(PDO::FETCH_OBJ);
    $co_categoria = $row->co_categoria;

    $query = "INSERT INTO m_categorias (co_empresa, co_categoria, no_categoria, co_grupo)
              VALUES(?, ?, ?, ?)";

    $stmt = $conn->prepare($query);
    $stmt->bindParam(1, $co_empresa);
    $stmt->bindParam(2, $co_categoria);
    $stmt->bindParam(3, strtoupper($data->no_categoria));
    $stmt->bindParam(4, $data->co_grupo);
    $stmt->execute();
} else {
    echo ':P';
}
?>
