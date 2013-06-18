<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $nu_requerimiento = $_REQUEST['nu_requerimiento'];
    $query = "SELECT dr.co_producto, mp.no_producto, dr.ca_producto, mp.co_unidad AS co_unidad_medida, mum.no_unidad AS no_unidad_medida, mp.va_compra, (mp.va_compra * dr.ca_producto) AS va_compra_total
              FROM (d_requerimiento AS dr INNER JOIN m_productos AS mp ON dr.co_producto = mp.co_producto)
              INNER JOIN m_unidades_medida AS mum ON mp.co_unidad = mum.id
              WHERE dr.nu_requerimiento = '$nu_requerimiento' AND dr.fl_atendido = 'N' ORDER BY dr.nu_linea";

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