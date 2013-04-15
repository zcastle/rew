<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $data = json_decode($_POST["productos"]);

    $no_producto = strtoupper($data->no_producto);
    $nu_orden = $data->nu_orden == '' ? 0 : $data->nu_orden;

    $query = "UPDATE m_productos SET
              co_grupo = ?, co_categoria = ?, co_sub_categoria = ?, no_producto = ?,
              co_pais_procedencia = ?, co_unidad = ?, v_presenta = ?, no_presentacion = ?,
              va_compra = ?, precio0 = ?, precio1 = ?, stk_min = ?, stk_max = ?,
              cuenta_vta = ?, cuenta_vt2 = ?, fl_igv= ?, fl_serv= ?, fe_modificacion = NOW(),
              nu_orden = ?, co_destino = ?
              WHERE co_producto = ?";

/*
    $va_compra = number_format($data->va_compra, 4, '.', ',');
    $precio0 = number_format($data->precio0, 4, '.', ',');
    $precio1 = number_format($data->precio1, 4, '.', ',');
*/

    $stmt = $conn->prepare($query);
    $stmt->bindParam(1, $data->co_grupo);
    $stmt->bindParam(2, $data->co_categoria);
    $stmt->bindParam(3, $data->co_sub_categoria);
    $stmt->bindParam(4, $no_producto);
    $stmt->bindParam(5, $data->co_pais_procedencia);
    $stmt->bindParam(6, $data->co_unidad);
    $stmt->bindParam(7, $data->v_presenta);
    $stmt->bindParam(8, $data->no_presentacion);
    $stmt->bindParam(9, $data->va_compra);
    $stmt->bindParam(10, $data->precio0);
    $stmt->bindParam(11, $data->precio1);
    $stmt->bindParam(12, $data->stk_min);
    $stmt->bindParam(13, $data->stk_max);
    $stmt->bindParam(14, $data->cuenta_vta);
    $stmt->bindParam(15, $data->cuenta_vt2);
    $stmt->bindParam(16, $data->fl_igv);
    $stmt->bindParam(17, $data->fl_serv);
    $stmt->bindParam(18, $nu_orden);
    $stmt->bindParam(19, $data->co_destino);
    $stmt->bindParam(20, $data->co_producto);
    $stmt->execute();

    //echo "{success: true}";
    //$p = $data->precios;
    //print_r($data);
    $queryDelete = "DELETE FROM r_productos_precios WHERE co_producto = ?";
    $stmtDelete = $conn->prepare($queryDelete);
    $stmtDelete->bindParam(1, $data->co_producto);
    $stmtDelete->execute();
    
    $queryPrecios = "INSERT INTO r_productos_precios (co_producto, va_per, va_precio) VALUES (?, ?, ?)";
    $stmtPrecios = $conn->prepare($queryPrecios);
    $stmtPrecios->bindParam(1, $data->co_producto);
    foreach($data->precios AS $precio) {
        $stmtPrecios->bindParam(2, $precio->va_per);
        $stmtPrecios->bindParam(3, $precio->va_precio);
        $stmtPrecios->execute();
    }

    $queryDeleteReceta = "DELETE FROM r_receta WHERE co_producto = ?";
    $stmtDeleteReceta = $conn->prepare($queryDeleteReceta);
    $stmtDeleteReceta->bindParam(1, $data->co_producto);
    $stmtDeleteReceta->execute();

    $queryReceta = "INSERT INTO r_receta (co_producto, co_insumo, ca_insumo, co_unidad, no_unidad, ca_unidad, va_insumo, co_almacen, nu_ln) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmtReceta = $conn->prepare($queryReceta);
    $stmtReceta->bindParam(1, $data->co_producto);
    $ln = 1;
    foreach ($data->receta AS $receta) {
        $stmtReceta->bindParam(2, $receta->co_producto);
        $stmtReceta->bindParam(3, $receta->ca_producto);
        $stmtReceta->bindParam(4, $receta->co_unidad);
        $stmtReceta->bindParam(5, $receta->no_unidad);
        $stmtReceta->bindParam(6, $receta->ca_unidad);
        $stmtReceta->bindParam(7, $receta->va_compra);
        $stmtReceta->bindParam(8, $receta->co_almacen);
        $stmtReceta->bindParam(9, $ln);
        $stmtReceta->execute();
        $ln += 1;
    }

} else {
    echo ':P';
}
?>