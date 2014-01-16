<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    try{
        $data = json_decode($_REQUEST['usuario']);

        $no_usuario = strtoupper($data->no_usuario);
        $ap_usuario = strtoupper($data->ap_usuario);
        $de_direccion = strtoupper($data->de_direccion);
        $co_usuario = strtoupper($data->co_usuario);
        $id_rol = $data->id_rol == '' ? 7: $data->id_rol;
        
        $query = "INSERT INTO m_usuarios (co_empresa, no_usuario, ap_usuario, nu_dni, nu_telefono, 
                                de_direccion, co_ubigeo, co_usuario, pw_usuario, id_rol) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, MD5(?), ?)";
        $conn->beginTransaction();
        $stmt = $conn->prepare($query);
        $stmt->bindParam(1, $data->co_empresa);
        $stmt->bindParam(2, $no_usuario);
        $stmt->bindParam(3, $ap_usuario);
        $stmt->bindParam(4, $data->nu_dni);
        $stmt->bindParam(5, $data->nu_telefono);
        $stmt->bindParam(6, $de_direccion);
        $stmt->bindParam(7, $data->co_ubigeo);
        $stmt->bindParam(8, $co_usuario);
        $stmt->bindParam(9, $data->pw_usuario);
        $stmt->bindParam(10, $id_rol);
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
