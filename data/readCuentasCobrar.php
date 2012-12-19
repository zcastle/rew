<?php

require_once '../lib/dbapdo.class.php';

$conn = new dbapdo();

if ($_POST) {
    $coEmpresa = $_REQUEST['coEmpresa'];
    $coEstado = $_REQUEST['coEstado'];
    $start = $_REQUEST['start'];
    $limit = $_REQUEST['limit'];

    $query = "SELECT DATE_FORMAT(cv.fe_venta, '%d/%m/%Y') AS fecha, IF(cv.tipo_comprobante='FV', 'Factura', 'Boleta') AS documento,
              cv.nu_comprobante AS numero, cv.co_cliente AS ruc, 
              IFNULL((SELECT mc.no_cliente FROM m_clientes mc WHERE cv.co_cliente = mc.co_cliente), '') AS cliente, 
              va_neto AS neto, va_igv AS igv, va_venta AS total,
              IFNULL((SELECT mf.no_forma_pago FROM m_forma_pago mf WHERE cv.co_forma_pago = mf.co_forma_pago), '') AS no_forma_pago, 
              IFNULL((SELECT me.no_estado FROM m_estados_cc me WHERE cv.co_estado = me.co_estado), '') AS no_estado
              FROM c_cuenta_cobrar cv
              WHERE cv.co_empresa = $coEmpresa AND cv.co_estado = $coEstado
              ORDER BY cv.fe_venta LIMIT $start, $limit;";
    
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    $queryCount = "SELECT * FROM c_cuenta_cobrar WHERE co_empresa = $coEmpresa AND co_estado = $coEstado";

    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->execute();
    $rows = $stmtCount->rowCount();

    echo json_encode(
            array(
                "totalCount" => $rows,
                "cuentascobrar" => $result
    ));
} else {
    echo ":P";
}
?>