<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();

    $info = $_POST["productos"];
    $data = json_decode(stripslashes($info));

    $co_grupo = htmlentities($data->co_grupo, ENT_QUOTES);
    $co_categoria = htmlentities($data->co_categoria, ENT_QUOTES);
    $co_sub_categoria = htmlentities($data->co_sub_categoria, ENT_QUOTES);
    $no_producto = htmlentities($data->no_producto, ENT_QUOTES);
    $co_pais_procedencia = htmlentities($data->co_pais_procedencia, ENT_QUOTES);
    $unidad = htmlentities($data->unidad, ENT_QUOTES);
    $v_presenta = htmlentities($data->v_presenta, ENT_QUOTES);
    $no_presentacion = htmlentities($data->no_presentacion, ENT_QUOTES);
    $costo_s = htmlentities($data->costo_s, ENT_QUOTES);
    $precio0 = htmlentities($data->precio0, ENT_QUOTES);
    $stk_min = htmlentities($data->stk_min, ENT_QUOTES);
    $stk_max = htmlentities($data->stk_max, ENT_QUOTES);
    $cuenta_vta = htmlentities($data->cuenta_vta, ENT_QUOTES);
    $cuenta_vt2 = htmlentities($data->cuenta_vt2, ENT_QUOTES);

    $queryCodigo = "SELECT RIGHT(CONCAT('0000000',MAX(co_producto) + 1), 7) FROM m_productos";
    $stmtCodigo = $conn->prepare($queryCodigo);
    $stmtCodigo->execute();
    $result = $stmtCodigo->fetchAll();
    $co_producto = $result[0][0];

    $query = "INSERT INTO m_productos 
            (co_producto,
            co_grupo,
            co_categoria, 
            co_sub_categoria,
            no_producto,
            co_pais_procedencia,
            unidad,
            v_presenta,
            no_presentacion,
            costo_s,
            precio0,
            stk_min,
            stk_max,
            cuenta_vta,
            cuenta_vt2,
            fe_creacion)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

    $stmt = $conn->prepare($query);
    $stmt->bindParam(1, $co_producto);
    $stmt->bindParam(2, $co_grupo);
    $stmt->bindParam(3, $co_categoria);
    $stmt->bindParam(4, $co_sub_categoria);
    $stmt->bindParam(5, $no_producto);
    $stmt->bindParam(6, $co_pais_procedencia);
    $stmt->bindParam(7, $unidad);
    $stmt->bindParam(8, $v_presenta);
    $stmt->bindParam(9, $no_presentacion);
    $stmt->bindParam(10, $costo_s);
    $stmt->bindParam(11, $precio0);
    $stmt->bindParam(12, $stk_min);
    $stmt->bindParam(13, $stk_max);
    $stmt->bindParam(14, $cuenta_vta);
    $stmt->bindParam(15, $cuenta_vt2);
    $stmt->execute();

    echo json_encode(array(
        "success" => mysql_errno() == 0,
        "msg" => mysql_errno() == 0 ? "Producto insertado successfully" : mysql_error()
    ));
} else {
    echo ':P';
}
?>
