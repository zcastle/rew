<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $ruc = $_REQUEST['ruc'];
    $razonSocial = $_REQUEST['razon_social'];
    $direccion = $_REQUEST['direccion'];

    $stmtCount = $conn->prepare('SELECT * FROM m_proveedores WHERE nu_ruc = ?');
    $stmtCount->bindParam(1, $ruc);
    $stmtCount->execute();
    $rows = $stmtCount->rowCount();

    if ($rows >= 1) {
        echo "{failure: true, error: 'El numero de Ruc Existe'}";
    } else {
        $stmtC = $conn->prepare("INSERT INTO m_proveedores (nu_ruc, no_razon_social, de_direccion, co_forma_pago) 
                                 VALUES (?, ?, ?, '01')");
        $stmtC->bindParam(1, $ruc);
        $stmtC->bindParam(2, $razonSocial);
        $stmtC->bindParam(3, $direccion);
        $stmtC->execute();

        echo "{success: true}";
    }
} else {
    echo ":P";
}
?>
