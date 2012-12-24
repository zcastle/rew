<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();

    $query = "SELECT mr.id AS id_rol, mr.no_rol FROM m_roles AS mr ORDER BY 2;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "rol" => $result
    ));
} else {
    echo ":P";
}
?>