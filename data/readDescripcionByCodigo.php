<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $id = $_REQUEST['id'];
    $codigo = $_REQUEST['codigo'];
    $query = "";

    if ($id == 1) {
        $query = "SELECT no_grupo AS descripcion FROM m_grupos WHERE co_grupo = ?;";
    } elseif ($id == 2) {
        $query = "SELECT no_categoria AS descripcion FROM m_categorias WHERE co_categoria = ?;";
    } elseif ($id == 3) {
        $query = "SELECT no_sub_categoria AS descripcion FROM m_sub_categorias WHERE co_sub_categoria = ?;";
    } elseif ($id == 4) {
        $query = "SELECT no_pais AS descripcion FROM m_paises WHERE co_pais = ?;";
    }

    $stmt = $conn->prepare($query);
    $stmt->bindParam(1, $codigo);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_OBJ);

    if ($result->descripcion == null) {
        echo json_encode(
                array(
                    "success" => false
        ));
    } else {
        echo json_encode(
                array(
                    "success" => true,
                    "data" => $result->descripcion
        ));
    }
} else {
    echo ':P';
}
?>