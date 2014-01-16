<?php
error_reporting(E_ALL ^ E_NOTICE);

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $usuario = $_REQUEST['txtUsuario'];
    $clave = $_REQUEST['txtClave'];

    $stmt = $conn->prepare("SELECT mu.co_usuario, mu.pw_usuario, 
                            IFNULL(rus.serie_fv, 1) AS serie_fv, 
                            IFNULL(rus.serie_bv, 1) AS serie_bv, mu.id_rol
                            FROM (m_usuarios AS mu LEFT JOIN r_usuario_serie AS rus ON mu.co_usuario = rus.co_usuario)
                            WHERE mu.co_usuario = ? AND mu.pw_usuario = MD5(?)");
    $stmt->bindParam(1, $usuario);
    $stmt->bindParam(2, $clave);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_OBJ);

    $rpta = false;
    
    if ($result->co_usuario == $usuario && $result->pw_usuario == md5($clave)) {
        $rpta = true;
    }

    if ($rpta == true) {
        echo "{success: true, data: {id_rol: $result->id_rol, serie_fv: $result->serie_fv, serie_bv: $result->serie_bv}}";
    } else {
        echo "{success: false, errors: {reason: 'Usuario o Clave incorrecta.'}}";
    }
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>