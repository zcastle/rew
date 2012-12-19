<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();

    $query = "SELECT co_grupo, no_grupo FROM m_grupos ORDER BY no_grupo";

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