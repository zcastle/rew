<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();

    $query = "SELECT co_destino, no_destino FROM m_destinos ORDER BY no_destino";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "destino" => $result
    ));
} else {
    echo ":P";
}
?>