<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();

    $query = "SELECT count(*) AS count FROM m_tipo_cambio WHERE fe_creacion = NOW()";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_OBJ);

    echo json_encode(
            array(
                "tipocambio" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>