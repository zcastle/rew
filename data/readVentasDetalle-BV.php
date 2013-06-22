<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $nu_comprobante = $_REQUEST['nu_documento'];

    $query = "SELECT dv.co_producto, mp.no_producto, dv.ca_producto, dv.va_producto, 
              dv.no_lote, DATE_FORMAT(dv.fe_vencimiento, '%d/%m/%Y') AS fe_vencimiento,
              dv.no_unidad, (dv.ca_producto * dv.va_producto) AS va_total
              FROM d_ventas dv INNER JOIN m_productos mp 
              ON dv.co_producto = mp.co_producto
              WHERE dv.tipo_comprobante = 'BV' AND 
              dv.nu_comprobante = '$nu_comprobante'
              ORDER BY dv.nu_linea;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(array("ordenesdetalle" => $result));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>