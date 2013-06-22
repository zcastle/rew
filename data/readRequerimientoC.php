<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $co_empresa = $_REQUEST['co_empresa'];
    $query = "SELECT DATE_FORMAT(fe_requerimiento, '%d/%m/%Y') AS fe_requerimiento,
              nu_requerimiento, co_usuario, observacion
              FROM c_requerimiento
              WHERE fl_atendido = 'N' AND co_empresa = '$co_empresa'";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "success" => true,
                "requerimiento" => $result
    ));
} else {
    echo ':P';
}
?>