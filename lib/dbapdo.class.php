<?php

require_once 'config.class.php';

class dbapdo extends PDO {

    function __construct() {
        try {
            $config = new config();
            $server = $config->getServer();
            $username = $config->getUserName();
            $password = $config->getPassword();
            $database_name = $config->getDataBaseName();

            parent::__construct("mysql:host=$server;dbname=$database_name", $username, $password, array(
                PDO::ATTR_PERSISTENT => true,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
            ));
            parent::setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

}

?>
