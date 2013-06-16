<?php

 require_once '../../lib/tcpdf/tcpdf.php';
 require_once '../../lib/dbapdo.class.php';
 require_once '../../lib/config.class.php';
 
 $pdf=new TCPDF();

 $pdf->AddPage();
 $pdf->SetTopMargin(5);
 //$pdf->SetLeftMargin(5);
 $pdf->SetRightMargin(5);
 //$pdf->SetBottomMargin(5);
 //$pdf->SetFont('helvetica','IBU',20);

 $pdf->cell(30,0,'codigo',1,0);

 $pdf->cell(80,0,'Producto',1,0);

 $pdf->cell(30,0,'Precio',1,1);

 $cnDB = new dbapdo();
 $sql="select * from m_categorias";
 $stm=$cnDB->prepare($sql);
 $stm->execute();

 $RsCat=$stm->FetchAll(PDO::FETCH_OBJ); //

 forEach($RsCat as $Row ){
     /*echo '<pre>';
    print_r($Row->id);
    echo '</pre>';*/
  $pdf->cell(30,0,$Row->id,1,0);
  $pdf->cell(80,0,$Row->no_categoria,1,0);
  $pdf->cell(30,0,$Row->co_categoria,1,1);

 }

  /*Cell (ancho, alto=0, texto, 
    true para poner borde,
    true para salto de linea, 
    alineacion L o R o C, 
    $fill=false, 
    $link='', 
    true y el contenido se ajusta al ancho, 
    $ignore_min_height=false, 
    alineacion top, 
    alineacion middle)*/

 $pdf->output('rep.pdf')
?>