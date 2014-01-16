<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $data = json_decode($_REQUEST["poolprinter"]);

    $queryCount = "SELECT COUNT(*) AS count FROM m_pool_printer 
                    WHERE co_empresa = ? AND 
                    tipo_comprobante = ? AND 
                    nu_comprobante = ? AND 
                    fl_impreso = 'N';";

    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->bindParam(1, $data->co_empresa);
    $stmtCount->bindParam(2, $data->tipo_comprobante);
    $stmtCount->bindParam(3, $data->nu_comprobante);
    $stmtCount->execute();
    $rows = $stmtCount->fetch(PDO::FETCH_OBJ);
    //echo $rows->count;
    if($rows->count == 0){
        $query = "INSERT INTO m_pool_printer 
                    (co_empresa, tipo_comprobante, nu_comprobante, nu_serie, fl_impreso, fl_ticket) 
                    VALUES(?,?,?,?,?,?)";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(1, $data->co_empresa);
        $stmt->bindParam(2, $data->tipo_comprobante);
        $stmt->bindParam(3, $data->nu_comprobante);
        $stmt->bindParam(4, $data->nu_serie);
        $stmt->bindParam(5, $data->fl_impreso);
        $stmt->bindParam(6, $data->fl_ticket);
        $stmt->execute();
    }
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>
