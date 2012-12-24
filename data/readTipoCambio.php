<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();

    $query = "SELECT id, FORMAT(nu_tipo_cambio_compra, 2) AS nu_tipo_cambio_compra, 
                FORMAT(nu_tipo_cambio_venta, 2) AS nu_tipo_cambio_venta,
                FORMAT(nu_tipo_cambio_compra, 2) AS tcCompraNuevo, 
                FORMAT(nu_tipo_cambio_venta, 2) AS tcVentaNuevo 
                FROM m_configuracion;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "tipocambio" => $result
    ));
} else {
    echo ":P";
}
?>