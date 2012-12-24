<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();

    $query = "SELECT CONCAT(co_departamento, co_provincia, co_distrito) AS co_ubigeo, no_ubigeo 
                FROM m_ubigeo 
                WHERE co_departamento = '15' AND co_provincia = '01' AND co_distrito <> '00'
                ORDER BY 2";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "ubigeo" => $result
    ));
} else {
    echo ":P";
}
?>