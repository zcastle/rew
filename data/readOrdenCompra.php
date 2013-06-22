<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $nu_orden_compra = $_REQUEST['nu_orden_compra'];
    $query = "SELECT dr.co_producto, mp.no_producto, dr.ca_producto, dr.va_producto, mp.co_unidad AS co_unidad_medida, mum.no_unidad AS no_unidad_medida
                FROM (d_orden_compra AS dr INNER JOIN m_productos AS mp ON dr.co_producto = mp.co_producto)
                INNER JOIN m_unidades_medida AS mum ON mp.co_unidad = mum.id
                WHERE nu_orden_compra = '$nu_orden_compra'
                ORDER BY dr.nu_linea";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "success" => true,
                "productos" => $result
    ));
} else {
    echo ':P';
}
?>