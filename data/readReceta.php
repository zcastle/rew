<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $co_producto = $_REQUEST['co_producto'];

    $query = "SELECT rr.co_insumo AS co_producto, mp.no_producto, rr.ca_insumo AS cantidad, 
                     rr.co_unidad, rr.no_unidad, rr.ca_unidad, rr.va_insumo AS costo_s, 
                     rr.va_insumo * rr.ca_insumo AS total,
                     rr.co_almacen, ma.no_almacen
              FROM (r_receta rr INNER JOIN m_productos mp ON rr.co_insumo = mp.co_producto)
                    INNER JOIN m_almacenes ma ON rr.co_almacen = ma.co_almacen AND mp.co_empresa = ma.co_empresa
              WHERE rr.co_producto = '$co_producto'
              ORDER BY rr.nu_ln";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "receta" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>