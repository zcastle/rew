<?php

require_once '../lib/dbapdo.class.php';

function getCodigo($conn, $conteo){
    $queryCodigo = "SELECT RIGHT(CONCAT('00000',MAX(co_categoria) + $conteo), 5) AS co_categoria FROM m_categorias";
    $stmtCodigo = $conn->prepare($queryCodigo);
    $stmtCodigo->execute();
    $row = $stmtCodigo->fetch(PDO::FETCH_OBJ);
    return $row->co_categoria;
}

if ($_POST) {
    $conn = new dbapdo();
    $data = json_decode($_REQUEST["categorias"]);
    $co_empresa = $_REQUEST["co_empresa"];

    $no_categoria = strtoupper($data->no_categoria);
    $nu_orden = $data->nu_orden == '' ? 0 : $data->nu_orden;

    $c=1;
    $co_categoria = '';
    $conteo = 1;

    while($c>=1){
        $co_categoria = getCodigo($conn, $conteo);
        $queryExiste = "SELECT COUNT(*) AS count FROM m_categorias WHERE co_categoria = '$co_categoria'";
        $stmtExiste = $conn->prepare($queryExiste);
        $stmtExiste->execute();
        $resultExiste = $stmtExiste->fetch(PDO::FETCH_OBJ);
        $c = $resultExiste->count;
        $conteo = $conteo + 1;
    }

    $query = "INSERT INTO m_categorias (co_empresa, co_categoria, no_categoria, co_grupo, nu_orden, co_destino)
              VALUES(?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($query);
    $stmt->bindParam(1, $co_empresa);
    $stmt->bindParam(2, $co_categoria);
    $stmt->bindParam(3, $no_categoria);
    $stmt->bindParam(4, $data->co_grupo);
    $stmt->bindParam(5, $nu_orden);
    $stmt->bindParam(6, $data->co_destino);
    $stmt->execute();
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>
