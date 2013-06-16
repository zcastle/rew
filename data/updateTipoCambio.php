<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $data = json_decode($_REQUEST["tipocambio"]);

    $query = "UPDATE m_configuracion SET nu_tipo_cambio_compra = ?, nu_tipo_cambio_venta = ?;";

    $stmt = $conn->prepare($query);
    $stmt->bindParam(1, $data->tcCompraNuevo);
    $stmt->bindParam(2, $data->tcVentaNuevo);
    $stmt->execute();
} else {
    echo ':P';
}
?>
