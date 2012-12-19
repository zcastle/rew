<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();

    $query = "SELECT co_empresa, no_razon_social, no_comercial FROM m_empresas ORDER BY co_empresa";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "cia" => $result
    ));
} else {
    echo ":P";
}
?>