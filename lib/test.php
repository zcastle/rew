<?php

try {
    $conn = new PDO('mysql:host=192.168.1.20;dbname=dbrewsoft', 'root', '123456', array(
                PDO::ATTR_PERSISTENT => true,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
            ));
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = $conn->query('SELECT * FROM c_ventas');

    foreach ($data as $row) {
        echo '<pre>';
        print_r($row['id']);
        echo '</pre>';
    }
} catch (PDOException $e) {
    echo json_encode(
            array(
                "error" => $e->getMessage(),
                "code" => $e->getCode(),
                "Line" => $e->getLine()
    ));
}
?>
