<?php
if (isset($_FILES)) {
    $temp_im_foto = $_FILES['im_foto']['tmp_name'];
    $original_file_name = $_FILES["im_foto"]['name'];

    //$origen = "C:\\fakepath\\".$_REQUEST["im_foto"];
    //$destino = "tmp/".$im_foto;

    $ext = explode ('.', $original_file_name);
    $ext = $ext [count ($ext) - 1];

    $file_name = str_replace ($ext, '', $original_file_name);

    $new_name = '_'.$file_name . $ext;

    if (move_uploaded_file($temp_im_foto, $new_name)) {
        echo "{success: true}";
    } else {
        echo "{success: false}";
    }
}
?>