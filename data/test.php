<?php
require_once '../lib/dbapdo.class.php';

$conn = new dbapdo();

$queryCodigo = "SELECT RIGHT(CONCAT('0000000',MAX(co_producto) + 1), 7) FROM m_productos";
$stmtCodigo = $conn->prepare($queryCodigo);
$stmtCodigo->execute();
$result = $stmtCodigo->fetchAll();

echo '<pre>';
print_r ($result);
echo '</pre>';
echo '<p>';
echo $result[0][0];
?>
