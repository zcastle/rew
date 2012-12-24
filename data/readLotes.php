<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    
    $conn = new dbapdo();
    $co_empresa = $_REQUEST['co_empresa'];
    $co_producto = $_REQUEST['co_producto'];
    $co_almacen = $_REQUEST['co_almacen'];
    $fl_stock = $_REQUEST['fl_stock'];

    $query = "SELECT rs.no_lote, DATE_FORMAT(rs.fe_vencimiento, '%d/%m/%Y') AS fe_vencimiento, 
              rs.ca_stock, ma.co_almacen, ma.no_almacen
              FROM r_stock_producto rs INNER JOIN m_almacenes ma ON rs.co_almacen = ma.co_almacen AND rs.co_empresa = ma.co_empresa
              WHERE rs.co_empresa = $co_empresa AND rs.co_producto = '$co_producto'";
    if($fl_stock == 'S'){
        $query .= " AND rs.ca_stock > 0";
    }
    if($co_almacen <> ''){
        $query .= " AND ma.co_almacen = '$co_almacen'";
    }
    $query .= " ORDER BY rs.fe_vencimiento DESC;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "lotes" => $result
    ));
} else {
    echo ":P";
}
?>