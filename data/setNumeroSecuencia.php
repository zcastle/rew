<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $cia = $_REQUEST['cia'];
    $tipoDocumento = $_REQUEST['tipoDocumento'];
    $nu_serie = $_REQUEST['nu_serie'];
    $nu_secuencia = $_REQUEST['nu_secuencia'];
    $nu_comprobante = $nu_serie . '-' . $nu_secuencia;

    if ($nu_secuencia == '') {
        $query = "UPDATE m_secuenciales 
            SET nu_secuencia = nu_secuencia + 1 
            WHERE co_empresa = '$cia' AND co_documento = '$tipoDocumento' and nu_serie = '$nu_serie';";
        $stmt01 = $conn->prepare($query);
        $stmt01->execute();
        echo json_encode(
                array(
                    "success" => true
        ));
    } else {
        $queryCount = "SELECT COUNT(*) AS count 
            FROM c_ventas 
            WHERE tipo_comprobante = '$tipoDocumento' AND nu_comprobante = '$nu_comprobante'";
        $stmtCount = $conn->prepare($queryCount);
        $stmtCount->execute();
        $rows = $stmtCount->fetch(PDO::FETCH_OBJ);

        if ($rows->count > 0) {
            echo json_encode(
                    array(
                        "success" => false,
                        "error" => 'El numero de secuencia esta siendo usado, digite otro.'
            ));
        } else {
            $query = "UPDATE m_secuenciales 
            SET nu_secuencia = $nu_secuencia 
            WHERE co_empresa = '$cia' AND co_documento = '$tipoDocumento' and nu_serie = '$nu_serie';";
            $stmt02 = $conn->prepare($query);
            $stmt02->execute();
            echo json_encode(
                    array(
                        "success" => true
            ));
        }
    }
} else {
    echo ':P';
}
?>