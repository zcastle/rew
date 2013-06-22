<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $co_producto = $_REQUEST['co_producto'];
    $no_lote = $_REQUEST['no_lote'];
    $co_almacen = $_REQUEST['co_almacen'];

    $query = "SELECT DATE_FORMAT(rk.fe_creacion, '%d/%m/%Y') AS fe_creacion, mma.no_movimiento, mma.tipo_movimiento, CONCAT(rk.tipo_comprobante, '-', rk.nu_comprobante) AS nu_comprobante,
                rk.ca_movimiento, rk.ca_stock_actual,
                if(rk.co_movimiento = '02', (SELECT no_razon_social FROM m_proveedores WHERE nu_ruc = rk.co_cliente), if(rk.co_movimiento = '05', (SELECT no_cliente FROM m_clientes WHERE co_cliente = rk.co_cliente), null)) AS no_cliente
                FROM (r_kardex AS rk INNER JOIN m_movimientos_almacen AS mma ON rk.co_movimiento = mma.co_movimiento)
                WHERE rk.co_producto = '$co_producto' AND rk.no_lote = '$no_lote'";
    if($co_almacen <> ''){
        $query .= " AND rk.co_almacen = '$co_almacen'";
    }
    $query .= " ORDER BY rk.id;";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "kardex" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>