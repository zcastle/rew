<?php

require_once '../lib/php-activerecord/ActiveRecord.php';
require_once '../lib/config.class.php';

$config = new config();
$server = $config->getServer();
$username = $config->getUserName();
$password = $config->getPassword();
$database_name = $config->getDataBaseName();

$cfg = ActiveRecord\Config::instance();
$cfg->set_model_directory('models');
$cfg->set_connections(array('development' => "mysql://".$username.":".$password."@".$server."/".$database_name."?charset=utf8"));

?>