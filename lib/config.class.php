<?php

class config {
    private $server = 'localhost'; //mb12012.dyndns.org
    private $username = 'root';
    private $password = '123456';
    private $database_name = 'dbrewsoft';
    
    public function getServer() {
        return $this->server;
    }
    
    public function getUserName() {
        return $this->username;
    }
    
    public function getPassword() {
        return $this->password;
    }
    
    public function getDataBaseName() {
        return $this->database_name;
    }
}

?>
