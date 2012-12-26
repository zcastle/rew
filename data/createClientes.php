<?php
require_once '../lib/dbapdo.class.php';

if ($_POST) {
    try{
        $conn = new dbapdo();
        $data = json_decode($_REQUEST['clientes']);
        $edit = $_REQUEST['edit'];
        $c_f_p = $_REQUEST['c_f_p'];

        $stmtCount = $conn->prepare('SELECT co_forma_pago FROM m_clientes WHERE co_cliente = ?');
        $stmtCount->bindParam(1, $data->codigo);
        $stmtCount->execute();
        $rows = $stmtCount->rowCount();
        $row = $stmtCount->fetch(PDO::FETCH_OBJ);
        $co_forma_pago = $row->co_forma_pago;

        if ($rows >= 1) {
            if ($edit == 'true') {
                $stmtU = $conn->prepare('UPDATE m_clientes SET no_cliente = ?, de_direccion = ? WHERE co_cliente = ?');
                $stmtU->bindParam(1, strtoupper($data->cliente));
                $stmtU->bindParam(2, strtoupper($data->direccion));
                $stmtU->bindParam(3, $data->codigo);
                $stmtU->execute();
                echo "{success: true, edit: true, co_forma_pago: $co_forma_pago}";
            } else {
                echo "{success: false, msg: 'El numero de RUC Existe'}";
            }
        } else {
            $query = "INSERT INTO m_clientes (co_cliente, no_cliente, de_direccion, nu_telefono, co_forma_pago) 
                    VALUES (?, ?, ?, ?, ?)";
            $conn->beginTransaction();
            $stmt = $conn->prepare($query);
            $stmt->bindParam(1, $data->codigo);
            $stmt->bindParam(2, strtoupper($data->cliente));
            $stmt->bindParam(3, strtoupper($data->direccion));
            $stmt->bindParam(4, $data->nu_telefono);
            $stmt->bindParam(5, $data->co_forma_pago == '' ? $c_f_p : $data->co_forma_pago);
            $stmt->execute();
            $conn->commit();

            $razonSocial = strtoupper($data->cliente);
            $direccion = strtoupper($data->direccion);
            echo "{success: true, data: {nu_ruc: $data->codigo, no_cliente: '$razonSocial', direccion: '$direccion'}}";
        }
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