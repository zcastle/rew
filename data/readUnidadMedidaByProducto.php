<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $co_producto = $_REQUEST['co_producto'];

    $queryProducto = "SELECT co_unidad FROM m_productos WHERE co_producto = ?";
    $stmtProducto = $conn->prepare($queryProducto);
    $stmtProducto->bindParam(1, $co_producto);
    $stmtProducto->execute();
    $rows = $stmtProducto->fetch(PDO::FETCH_OBJ);
    
    $queryUnidad = "SELECT CONCAT(id, 0) AS id, no_sub_unidad AS no_unidad, no_unidad AS no_sub_unidad, ca_sub_unidad
                    FROM m_unidades_medida 
                    WHERE id = :id
                    UNION ALL
                    SELECT id, no_unidad, no_sub_unidad, 0 AS ca_sub_unidad
                    FROM m_unidades_medida
                    WHERE id = :id;";
    $stmtUnidad = $conn->prepare($queryUnidad);
    $stmtUnidad->bindParam(':id', $rows->co_unidad);
    $stmtUnidad->execute();
    $result = $stmtUnidad->fetchAll();

    echo json_encode(
            array(
                "unidades" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>