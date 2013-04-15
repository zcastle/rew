<?php

//require_once '../lib/config.php';
//require_once('../lib/tcpdf/config/lang/eng.php');
//require_once('../lib/tcpdf/tcpdf.php');
//if ($_POST) {
$detalle = $_REQUEST['detalle'];
$detalle = stripcslashes($detalle);
$detalle = json_decode($detalle);

foreach ($detalle as $linea) {
    $coProducto = $linea[0]->codigo;
    $noProducto = $linea[0]->producto;
    $caProducto = $linea[0]->cantidad;
    $vaProducto = $linea[0]->unitario;
    $noLote = $linea[0]->lote;
    $feVencimiento = $linea[0]->vencimiento;
    //die($detalle);
}

if (($handle = @fopen("PRN", "w")) === FALSE) {
    die('No se puedo Imprimir, Verifique su conexion con el Terminal');
}

$dato = $_REQUEST['detalle'];

fwrite($handle, chr(27) . chr(64)); //reinicio
//fwrite($handle, chr(27). chr(112). chr(48));//ABRIR EL CAJON
fwrite($handle, chr(27) . chr(100) . chr(0)); //salto de linea VACIO
fwrite($handle, chr(27) . chr(33) . chr(8)); //negrita
fwrite($handle, chr(27) . chr(97) . chr(1)); //centrado
fwrite($handle, "=================================");
fwrite($handle, chr(27) . chr(100) . chr(1)); //salto de linea
fwrite($handle, chr(27) . chr(32) . chr(3)); //ESTACIO ENTRE LETRAS
fwrite($handle, "I. C. M. EL APOSENTO ALTO ");
fwrite($handle, chr(27) . chr(32) . chr(0)); //ESTACIO ENTRE LETRAS
fwrite($handle, chr(27) . chr(100) . chr(0)); //salto de linea VACIO
fwrite($handle, chr(27) . chr(33) . chr(8)); //negrita
fwrite($handle, chr(27) . chr(100) . chr(0)); //salto de linea VACIO
fwrite($handle, chr(27) . chr(100) . chr(1)); //salto de linea
fwrite($handle, "Nacimos de Nuevo para ser grandes");
fwrite($handle, chr(27) . chr(100) . chr(1)); //salto de linea
fwrite($handle, "=================================");
fwrite($handle, chr(27) . chr(100) . chr(1)); //salto de linea
fwrite($handle, chr(27) . chr(100) . chr(1)); //salto de linea
fwrite($handle, "PALABRA A IMPRIMIT: " . $dato);


fclose($handle); // cierra el fichero PRN
$salida = shell_exec('lpr PRN'); //lpr->puerto impresora, imprimir archivo PRN
//echo "{success: true}";
/* } else {
  echo "{success: false, msg: 'Ha ocurrido algun Error'}";
  } */
?>
