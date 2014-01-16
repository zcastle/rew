<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    try{
        $nu_documento = $_REQUEST['nu_documento'];
        $fe_documento = $_REQUEST['fe_documento'];
        $fe_documento = substr($fe_documento, 6, 4) . '-' . substr($fe_documento, 3, 2) . '-' . substr($fe_documento, 0, 2);
        
        $query = "UPDATE c_cotizacion SET fe_cotizacion = ? WHERE nu_cotizacion = ?";

        $conn->beginTransaction();
        $stmt = $conn->prepare($query);
        $stmt->bindParam(1, $fe_documento);
        $stmt->bindParam(2, $nu_documento);
        $stmt->execute();
        $conn->commit();
        echo "{success: true}";
    } catch (PDOException $e) {
        $conn->rollBack();
        echo json_encode(
            array(
                "success" => false,
                "msg" => $e->getMessage()
        ));
    }
    
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>
