<?php

require_once '../lib/dbapdo.class.php';

if ($_POST) {
    $conn = new dbapdo();
    $co_producto = $_REQUEST['co_producto'];
    $no_producto = $_REQUEST['no_producto'];
    $co_grupo = $_REQUEST['co_grupo'];
    $co_empresa = $_REQUEST['co_empresa'];
    $start = $_REQUEST['start'];
    $limit = $_REQUEST['limit'];

    $query = "SELECT 
        mp.co_producto,
        mp.co_grupo,
        (SELECT no_grupo FROM m_grupos WHERE co_grupo = mp.co_grupo AND co_empresa = mp.co_empresa) AS no_grupo,
        mp.co_categoria,
        (SELECT no_categoria FROM m_categorias WHERE co_categoria = mp.co_categoria) AS no_categoria,
        mp.co_sub_categoria,
        (SELECT no_sub_categoria FROM m_sub_categorias WHERE co_sub_categoria = mp.co_sub_categoria) AS no_sub_categoria,
        mp.no_producto,
        mp.co_pais_procedencia,
        (SELECT no_pais FROM m_paises WHERE co_pais = mp.co_pais_procedencia) AS no_pais_procedencia,
        mp.co_unidad,
        mp.no_presentacion,
        mp.v_presenta,
        mp.va_compra_sin_igv,
        mp.va_compra,
        mp.precio0,
        mp.precio1,
        ifnull(mp.STK_MIN, 0) AS stk_min,
        ifnull(mp.STK_MAX, 0) AS stk_max,
        mp.cuenta_vta,
        mp.cuenta_vt2,
        mp.fl_igv,
        mp.fl_serv,
        mp.fl_eliminado,
        (SELECT IFNULL(SUM(ca_stock), 0) FROM r_stock_producto WHERE co_producto = mp.co_producto) AS ca_stock,
        IFNULL(mp.nu_orden, 0) AS nu_orden,
        mp.co_destino,
        (SELECT no_destino FROM m_destinos WHERE co_destino = mp.co_destino) AS no_destino,
        va_peso
        FROM m_productos AS mp
        WHERE mp.fl_eliminado = 'N' AND mp.co_empresa LIKE '%$co_empresa%'";
    if ($no_producto <> "") {
        $query .= " AND ((";
        $claves=explode(" ", $no_producto);
        foreach ($claves as $v) {
            $condicion[] = "mp.no_producto LIKE '%$v%'";
        }
        $query .= implode(" AND ", $condicion);
        $query .= ")";
        $query .= " OR CONVERT(mp.co_producto, UNSIGNED INTEGER) = '$no_producto')";
    }
    if($co_producto <> ""){
        $query .= " AND CONVERT(mp.co_producto, UNSIGNED INTEGER) = '$co_producto'";
    }
    if ($co_grupo <> "") {
        $query .= " AND mp.co_grupo = '$co_grupo'";
    }
    $query .= " ORDER BY mp.no_producto LIMIT $start, $limit;";

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();
    $rowsC = $stmt->rowCount();

    $queryCount = "SELECT COUNT(*) AS count FROM m_productos AS mp WHERE mp.fl_eliminado = 'N' AND mp.co_empresa LIKE '%$co_empresa%'";
    if ($no_producto <> "") {
        $queryCount .= " AND ((";
        $claves=explode(" ", $no_producto);
        foreach ($claves as $v) {
            $condicion[] = "mp.no_producto LIKE '%$v%'";
        }
        $queryCount .= implode(" AND ", $condicion);
        $queryCount .= ")";
        $queryCount .= " OR CONVERT(mp.co_producto, UNSIGNED INTEGER) = '$no_producto')";
    }
    if($co_producto <> ""){
        $query .= " AND CONVERT(mp.co_producto, UNSIGNED INTEGER) = '$co_producto'";
    }
    if ($co_grupo <> "") {
        $queryCount .= " AND mp.co_grupo = '$co_grupo'";
    }

    $stmtCount = $conn->prepare($queryCount);
    $stmtCount->execute();
    //$rows = $stmtCount->rowCount();
    $rows = $stmtCount->fetch(PDO::FETCH_OBJ);

    echo json_encode(
            array(
                /*"no_producto" => $no_producto,
                "co_grupo" => $co_grupo,*/
                "success" => $rowsC == 0 ? false : true,
                "totalCount" => $rows->count,
                "productos" => $result
    ));
} else {
    echo "{success: false, msg: 'Ha ocurrido algun Error'}";
}
?>
