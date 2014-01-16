<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $tipoComprobante = $_REQUEST['tipoComprobante'];
    $nuComprobante = $_REQUEST['nuComprobante'];
    if($tipoComprobante == 'GR'){
        $query = "SELECT dgr.co_producto, mp.no_producto, dgr.ca_producto, dgr.va_producto, dgr.no_lote, DATE_FORMAT(dgr.fe_vencimiento, '%d/%m/%Y') AS fe_vencimiento
                  FROM d_guia_remision dgr INNER JOIN m_productos mp ON dgr.co_producto = mp.co_producto
                  WHERE dgr.nu_comprobante = '$nuComprobante' 
                  ORDER BY dgr.nu_linea;";
    }

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode(
            array(
                "success" => true,
                "productos" => $result
    ));
} else {
    echo ':P';
}
?>