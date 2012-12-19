<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $ruc = $_REQUEST['txtRuc'];
    $razonSocial = $_REQUEST['txtRazonSocial'];
    $direccion = $_REQUEST['txtDireccion'];
    $telefono = $_REQUEST['txtTelefono'];
    $edit = $_REQUEST['edit'];

    $stmtCount = $conn->prepare('SELECT co_forma_pago FROM m_clientes WHERE co_cliente = ?');
    $stmtCount->bindParam(1, $ruc);
    $stmtCount->execute();
    $rows = $stmtCount->rowCount();
    $row = $stmtCount->fetch(PDO::FETCH_OBJ);
    $co_forma_pago = $row->co_forma_pago;

    if ($rows >= 1) {
        if ($edit == 'true') {
            $stmtU = $conn->prepare('UPDATE m_clientes SET no_cliente = ?, de_direccion = ? WHERE co_cliente = ?');
            $stmtU->bindParam(1, strtoupper($razonSocial));
            $stmtU->bindParam(2, strtoupper($direccion));
            $stmtU->bindParam(3, $ruc);
            $stmtU->execute();
            echo "{success: true, edit: true, co_forma_pago: $co_forma_pago}";
        } else {
            echo "{failure: true, error: 'El numero de Ruc Existe'}";
        }
    } else {
        $stmtC = $conn->prepare('INSERT INTO m_clientes (co_cliente, no_cliente, de_direccion, nu_telefono) VALUES (?,?,?,?)');
        $stmtC->bindParam(1, $ruc);
        $stmtC->bindParam(2, strtoupper($razonSocial));
        $stmtC->bindParam(3, strtoupper($direccion));
        $stmtC->bindParam(4, $telefono);
        $stmtC->execute();
        $razonSocial = strtoupper($razonSocial);
        $direccion = strtoupper($direccion);
        echo "{success: true, data: {nu_ruc: $ruc, no_cliente: '$razonSocial', direccion: '$direccion'}}";
    }
} else {
    echo ":P";
}
?>