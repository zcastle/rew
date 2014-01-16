<?php
/* get the sample text */

$lipsum = file_get_contents('lipsum.txt');

/* open a connection to the printer */

$printer = printer_open("smb://BLACKRED2/ADMIN-PC/EPSON%20LX-300");

/* write the text to the print job */
printer_write($printer, $lipsum);

/* close the connection */
printer_close($printer);
?>