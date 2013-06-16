<?php

$data = json_decode(stripcslashes($_REQUEST['data']));
//$data2 = $_REQUEST['data'];

foreach ($data as $d) {
    $data2 = $d;
}

echo "{success: true, data: $data2}";
?>