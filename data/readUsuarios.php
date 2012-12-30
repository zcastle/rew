<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $co_empresa = $_REQUEST['co_empresa'];
    $co_usuario = $_REQUEST['co_usuario'];
    $is_login = $_REQUEST['is_login'];
    
    $query = "SELECT mu.id, mu.co_empresa, mu.no_usuario, mu.ap_usuario,
                mu.co_usuario, mu.nu_dni, mu.de_direccion,
                mu.co_ubigeo, mub.no_ubigeo, mu.fl_eliminado, mu.id_rol,
                IFNULL(mr.no_rol, 'NO DEFINIDO') AS no_rol, mu.nu_telefono
                FROM (m_usuarios AS mu LEFT JOIN m_roles AS mr ON mu.id_rol = mr.id)
                INNER JOIN (
                SELECT CONCAT(co_departamento, co_provincia, co_distrito) AS co_ubigeo, no_ubigeo FROM m_ubigeo
                ) AS mub ON mu.co_ubigeo = mub.co_ubigeo
                WHERE mu.co_empresa = '$co_empresa'";
    if($is_login == 'true'){
        $query .= " AND mr.fl_adm IN ('111', '101')";
    }
    if($co_usuario <> ''){
        $query .= " AND mu.co_usuario = '$co_usuario'";
    }
    $query .= " ORDER BY 3;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "success" => true,
                "usuarios" => $result,
                "query" => $query,
                "is_login" => $is_login
    ));
} else {
    echo ":P";
}
?>