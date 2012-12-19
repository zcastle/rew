<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $co_empresa = $_REQUEST["co_empresa"];

    $query = "SELECT co_grupo, no_grupo 
              FROM m_grupos 
              WHERE fl_activo = 'S' AND co_empresa LIKE '%$co_empresa%' 
              ORDER BY no_grupo";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "grupos" => $result
    ));
} else {
    echo ":P";
}
?>