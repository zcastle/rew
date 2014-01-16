<?php

require_once '../lib/dbapdo.class.php';

$conn = new dbapdo();

if ($_POST) {
    $query = "SELECT co_forma_pago, no_forma_pago, nu_dias
              FROM m_forma_pago
              ORDER BY co_forma_pago";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "formapago" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>