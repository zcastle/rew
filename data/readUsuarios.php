<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $co_empresa = $_REQUEST['co_empresa'];
    
    $query = "SELECT mu.id, mu.co_usuario, mu.no_usuario, mu.id_rol, mr.no_rol
                FROM (m_usuarios AS mu INNER JOIN m_roles AS mr ON mu.id_rol = mr.id)
                WHERE co_empresa = '$co_empresa' ORDER BY 2;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "success" => true,
                "usuarios" => $result
    ));
} else {
    echo ":P";
}
?>