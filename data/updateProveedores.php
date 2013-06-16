<?php
require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    try{
        $data = json_decode($_REQUEST['proveedores']);
        $c_f_p = $_REQUEST['c_f_p'];
        
        $no_razon_social = strtoupper($data->no_razon_social);
        $de_direccion = strtoupper($data->de_direccion);
        $co_forma_pago = $data->co_forma_pago == '' ? $c_f_p : $data->co_forma_pago;

        $query = "UPDATE m_proveedores SET no_razon_social = ?, de_direccion = ?, 
                    nu_telefono = ?, co_forma_pago = ?, no_contacto = ?
                    WHERE nu_ruc = ?";
        $conn->beginTransaction();
        $stmt = $conn->prepare($query);
        $stmt->bindParam(1, $no_razon_social);
        $stmt->bindParam(2, $de_direccion);
        $stmt->bindParam(3, $data->nu_telefono);
        $stmt->bindParam(4, $co_forma_pago);
        $stmt->bindParam(5, $data->no_contacto);
        $stmt->bindParam(6, $data->nu_ruc);
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
    echo "{success: false, msg: 'Ha ocurrido un Error'}";
}
?>