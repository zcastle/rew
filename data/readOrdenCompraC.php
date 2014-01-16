<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $co_empresa = $_REQUEST['co_empresa'];
    $query = "SELECT DATE_FORMAT(coc.fe_orden_compra, '%d/%m/%Y') AS fe_orden_compra, coc.nu_orden_compra,
                coc.co_proveedor, mp.no_razon_social AS no_proveedor
                FROM (c_orden_compra AS coc LEFT JOIN m_proveedores AS mp ON coc.co_proveedor = mp.nu_ruc)
                WHERE coc.fl_anulada = 'N' AND coc.fl_atendido = 'N' ORDER BY coc.fe_orden_compra DESC;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "success" => true,
                "ordencompra" => $result
    ));
} else {
    echo ':P';
}
?>