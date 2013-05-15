<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $start = $_POST['start'];
    $limit = $_POST['limit'];
    $doc = $_POST['doc'];

    $query = "SELECT DATE_FORMAT(cv.fe_venta, '%d/%m/%Y') AS fecha, cv.tipo_comprobante, IF(cv.tipo_comprobante='FV', 'Factura', 'Boleta') AS documento,
              cv.nu_comprobante AS numero, cv.co_cliente AS ruc, 
              IFNULL((SELECT mc.no_cliente FROM m_clientes mc WHERE mc.co_cliente = cv.co_cliente), '') AS cliente, 
              va_neto AS neto, va_igv AS igv, va_venta AS total
              FROM c_ventas cv";

    if($doc<>''){
      $query .= " WHERE cv.nu_comprobante LIKE '%$doc%'";
    }

    $query .= " ORDER BY cv.fe_venta DESC LIMIT $start, $limit;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    $queryCount = "SELECT * FROM c_ventas";
    if($doc<>''){
      $queryCount .= " WHERE nu_comprobante LIKE '%$doc%'";
    }

    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->execute();
    $rows = $stmtCount->rowCount();

    echo json_encode(
            array(
                "totalCount" => $rows,
                "ventas" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>