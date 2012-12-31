<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    
    $conn = new dbapdo();
    $co_producto = $_REQUEST['co_producto'];

    $query = "SELECT 'UNIDAD' AS no_medida, precio0 AS va_precio 
              FROM m_productos WHERE co_producto = '$co_producto'
              UNION ALL
              SELECT 'CAJA' AS no_medida, precio1 AS va_precio 
              FROM m_productos WHERE co_producto = '$co_producto';";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "precios" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>