<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $today = $_REQUEST['today'];

    $query = "SELECT id, FORMAT(nu_tipo_cambio_compra, 2) AS nu_tipo_cambio_compra, 
                FORMAT(nu_tipo_cambio_venta, 2) AS nu_tipo_cambio_venta,
                FORMAT(nu_tipo_cambio_compra, 2) AS tcCompraNuevo, 
                FORMAT(nu_tipo_cambio_venta, 2) AS tcVentaNuevo, DATE_FORMAT(fe_creacion, '%d/%m/%y %h:%i %p') AS fe_creacion, co_usuario
                FROM m_tipo_cambio";
    if($today == 'N'){
        $query .= " ORDER BY id DESC LIMIT 1;";
    }else if($today == 'S'){
        $query .= " WHERE date(fe_creacion) = date(NOW());";
    }else if($today == 'T'){
        $query .= " ORDER BY id;";
    }

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();
    $count = $stmt->rowCount();

    echo json_encode(
            array(
                "totalCount" => $count,
                "tipocambio" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>