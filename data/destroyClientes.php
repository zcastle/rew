<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    try{
        $conn = new dbapdo();
        $data = json_decode($_REQUEST['clientes']);
        $query = "DELETE FROM m_clientes WHERE co_cliente = ?";
        $conn->beginTransaction();
        $stmt = $conn->prepare($query);
        $stmt->bindParam(1, $data->codigo);
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