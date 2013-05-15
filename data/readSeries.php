<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $cia = $_REQUEST['cia'];
    $tipoDocumento = $_REQUEST['tipoDocumento'];

    $query = "SELECT co_documento, nu_serie, RIGHT(CONCAT('0000000', nu_secuencia), 7) AS nu_secuencia 
          FROM m_secuenciales WHERE co_empresa = '$cia' AND co_documento = '$tipoDocumento';";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "success" => true,
                "series" => $result
    ));
} else {
    echo ':P';
}
?>