<?php
require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    try{
        $data = json_decode($_REQUEST['unidades']);
        $co_empresa = $_REQUEST['co_empresa'];

        $no_unidad = strtoupper($data->no_unidad);
        $no_sub_unidad = strtoupper($data->no_sub_unidad);
        
        $query = "INSERT INTO m_unidades_medida (no_unidad, no_sub_unidad, 
                    ca_sub_unidad, co_empresa)
                    VALUES (?, ?, ?, ?)";
        $conn->beginTransaction();
        $stmt = $conn->prepare($query);
        $stmt->bindParam(1, $no_unidad);
        $stmt->bindParam(2, $no_sub_unidad);
        $stmt->bindParam(3, $data->ca_sub_unidad);
        $stmt->bindParam(4, $co_empresa);
        $stmt->execute();
        $conn->commit();
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