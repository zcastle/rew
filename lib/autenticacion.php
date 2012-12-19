<?php

function is_session() {
    if (isset($_SESSION["usuario"]) && isset($_SESSION["perfil"])) {
        return true;
    }
    return false;
}

function is_standard() {
    if (is_session() && $_SESSION["perfil"] == "Standard") {
        return true;
    }
    return false;
}

function is_corporativo() {
    if (is_session() && $_SESSION["perfil"] == "Corporativo") {
        return true;
    }
    return false;
}

function is_sucursal() {
    if (is_session() && $_SESSION["perfil"] == "Sucursal") {
        return true;
    }
    return false;
}

function is_supervisor() {
    if (is_session() && $_SESSION["perfil"] == "Supervisor") {
        return true;
    }
    return false;
}

function is_administrador() {
    if (is_session() && $_SESSION["perfil"] == "Administrador") {
        return true;
    }
    return false;
}

function is_Admin_Reportes() {
    if (is_session() && $_SESSION["perfil"] == "Admin Reportes") {
        return true;
    }
    return false;
}

?>