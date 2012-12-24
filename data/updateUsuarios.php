<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    try{
        $conn = new dbapdo();
        $data = json_decode($_REQUEST['usuario']);
        $query = "UPDATE m_usuarios SET 
                        no_usuario = ?, ap_usuario = ?, nu_dni = ?, nu_telefono = ?, 
                        de_direccion = ?, co_ubigeo = ?, co_usuario = ?, pw_usuario = ?, 
                        id_rol = ? WHERE id = ?";
        $conn->beginTransaction();
        $stmt = $conn->prepare($query);
        $stmt->bindParam(1, strtoupper($data->no_usuario));
        $stmt->bindParam(2, strtoupper($data->ap_usuario));
        $stmt->bindParam(3, $data->nu_dni);
        $stmt->bindParam(4, $data->nu_telefono);
        $stmt->bindParam(5, strtoupper($data->de_direccion));
        $stmt->bindParam(6, $data->co_ubigeo);
        $stmt->bindParam(7, strtoupper($data->co_usuario));
        $stmt->bindParam(8, md5($data->pw_usuario));
        $stmt->bindParam(9, $data->id_rol == '' ? 7: $data->id_rol);
        $stmt->bindParam(10, $data->id);
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
    echo ":P";
}
?>