<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $nu_documento = $_REQUEST['nu_documento'];

    $query = "SELECT dod.co_producto, mp.no_producto, dod.ca_producto, '' AS no_lote, 
              '' AS fe_vencimiento, dod.va_producto
              FROM (d_cotizacion dod INNER JOIN m_productos mp ON dod.co_producto = mp.co_producto)
              WHERE dod.nu_cotizacion = '$nu_documento';";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "ordenesdetalle" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>