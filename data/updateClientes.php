<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    try{
        $data = json_decode($_REQUEST['clientes']);
        $c_f_p = $_REQUEST['c_f_p'];

        $no_cliente = strtoupper($data->cliente);
        $de_direccion = strtoupper($data->direccion);
        $co_forma_pago = $data->co_forma_pago == '' ? $c_f_p : $data->co_forma_pago;

        $query = "UPDATE m_clientes SET no_cliente = ?, de_direccion = ?, 
                    nu_telefono = ?, co_forma_pago = ?
                    WHERE co_cliente = ?";

        $conn->beginTransaction();
        $stmt = $conn->prepare($query);
        $stmt->bindParam(1, $no_cliente);
        $stmt->bindParam(2, $de_direccion);
        $stmt->bindParam(3, $data->nu_telefono);
        $stmt->bindParam(4, $co_forma_pago);
        $stmt->bindParam(5, $data->codigo);
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