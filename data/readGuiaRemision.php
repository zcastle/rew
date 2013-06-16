<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $cia = $_REQUEST['cia'];
    $query = "SELECT DATE_FORMAT(cg.fe_guia, '%d/%m/%Y') AS fe_guia, 'GR' AS co_tipo_documento, 
              'Guia Remision' AS tipo_documento, cg.nu_comprobante, cg.co_cliente,
              IFNULL((SELECT mc.no_cliente FROM m_clientes mc WHERE mc.co_cliente = cg.co_cliente), '') AS no_cliente 
              FROM c_guia_remision cg
              WHERE cg.fl_facturado = 'N' AND cg.co_empresa = '$cia'
              UNION ALL
              SELECT DATE_FORMAT(co.fe_orden_despacho, '%d/%m/%Y') AS fe_guia, 'OD' AS co_tipo_documento, 
              'Orden Despacho' AS tipo_documento, co.nu_comprobante, co.co_cliente,
              IFNULL((SELECT mc.no_cliente FROM m_clientes mc WHERE mc.co_cliente = co.co_cliente), '') AS no_cliente 
              FROM c_orden_despacho co
              WHERE co.fl_despachado = 'S' AND co.co_empresa = '$cia'
              UNION ALL
              SELECT DATE_FORMAT(co.fe_cotizacion, '%d/%m/%Y') AS fe_guia, 'CC' AS co_tipo_documento, 
              'Cotizacion' AS tipo_documento, co.nu_cotizacion AS nu_comprobante, co.co_cliente,
              IFNULL((SELECT mc.no_cliente FROM m_clientes mc WHERE mc.co_cliente = co.co_cliente), '') AS no_cliente 
              FROM c_cotizacion co
              WHERE co.nu_comprobante = '' AND co.co_empresa = '$cia';";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "success" => true,
                "guiaremision" => $result
    ));
} else {
    echo ':P';
}
?>