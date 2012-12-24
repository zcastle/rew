<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    try{
        $conn = new dbapdo();
        $data = json_decode($_REQUEST['usuario']);
        $query = "DELETE FROM m_usuarios WHERE id = ?";
        $conn->beginTransaction();
        $stmt = $conn->prepare($query);
        $stmt->bindParam(1, $data->id);
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