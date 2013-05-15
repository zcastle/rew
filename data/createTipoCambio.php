<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $data = json_decode($_REQUEST["tipocambio"]);

    $query = "INSERT INTO m_tipo_cambio (nu_tipo_cambio_compra, nu_tipo_cambio_venta, fe_creacion, co_usuario)
    		VALUES(?, ?, NOW(), ?)";

    $stmt = $conn->prepare($query);
    $stmt->bindParam(1, $data->tcCompraNuevo);
    $stmt->bindParam(2, $data->tcVentaNuevo);
    $stmt->bindParam(3, $data->co_usuario);
    $stmt->execute();
} else {
    echo ':P';
}
?>
