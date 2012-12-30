<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $cia = $_REQUEST['cia'];
    $tipoDocumento = $_REQUEST['tipoDocumento'];
    $nuSerie = $_REQUEST['nuSerie'];

    $query = "SELECT CONCAT(RIGHT(CONCAT('000', nu_serie), 3), '-', RIGHT(CONCAT('0000000', nu_secuencia), 7)) AS secuencia, 
              nu_serie, nu_secuencia
              FROM m_secuenciales 
              WHERE co_empresa = '$cia' AND co_documento = '$tipoDocumento' AND nu_serie = '$nuSerie' 
              LIMIT 1;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_OBJ);

    echo json_encode(
            array(
                "success" => true,
                "secuencia" => $result->secuencia,
                "nu_serie" => $result->nu_serie,
                "nu_secuencia" => $result->nu_secuencia
    ));
} else {
    echo ':P';
}
?>