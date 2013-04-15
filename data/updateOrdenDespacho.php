<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $nu_documento = $_REQUEST['nu_documento'];
    $data = json_decode($_REQUEST["detalle"]);

    $query = "UPDATE d_orden_despacho SET
              no_lote = ?, fe_vencimiento = ?
              WHERE co_producto = ? AND nu_comprobante = '$nu_documento'";

    $stmt = $conn->prepare($query);

    foreach ($data as $row) {
        $feVencimiento = $row->fe_vencimiento;
        $feVencimiento = substr($feVencimiento, 6, 4) . '-' . substr($feVencimiento, 3, 2) . '-' . substr($feVencimiento, 0, 2);
        $stmt->bindParam(1, $row->no_lote);
        $stmt->bindParam(2, $feVencimiento);
        $stmt->bindParam(3, $row->co_producto);
        $stmt->execute();
    }

    $queryC = "UPDATE c_orden_despacho SET
              fl_despachado = 'S'
              WHERE nu_comprobante = '$nu_documento'";
    $stmtC = $conn->prepare($queryC);
    $stmtC->execute();

} else {
    echo ':P';
}
?>
