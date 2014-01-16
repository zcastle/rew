<?php

require_once '../lib/phpexcel/Classes/PHPExcel.php';
require_once 'bootstrap.php';
require_once 'mypdf.php';

date_default_timezone_set('America/Lima');

$out = isset($_GET['out']) ? $_GET['out'] : 'pdf';

$cia = $_GET['cia'];
$titulo = "REGISTRO DE VENTAS";

$fe_ini_month =  isset($_GET['fe_ini_month'])?$_GET['fe_ini_month'] : null;
$fe_ini_year = isset($_GET['fe_ini_year'])?$_GET['fe_ini_year'] : null;
$fe_fin_month = isset($_GET['fe_fin_month'])?$_GET['fe_fin_month'] : null;
$fe_fin_year = isset($_GET['fe_fin_year'])?$_GET['fe_fin_year'] : null;

$fe_ini = isset($_GET['fe_ini'])?$_GET['fe_ini'] : null;
$fe_fin = isset($_GET['fe_fin'])?$_GET['fe_fin'] : null;

$dia_ini = isset($_GET['dia_ini'])?$_GET['dia_ini'] : null;
$dia_fin = isset($_GET['dia_fin'])?$_GET['dia_fin'] : null;

$del = ""; $al = ""; $conditions = array();

if($fe_ini_month && $fe_fin_month && $fe_ini_year && $fe_ini_year){
    $del = $fe_ini_month.'/'.$fe_ini_year;
    $al = $fe_fin_month.'/'.$fe_fin_year;
    $conditions = array('conditions' => array('(MONTH(fe_venta)>=? AND YEAR(fe_venta)>=?) AND (MONTH(fe_venta)<=? AND YEAR(fe_venta)<=?)', $fe_ini_month, $fe_ini_year, $fe_fin_month, $fe_fin_year));
}

if($fe_ini && $fe_fin){
    $del = $fe_ini; $al = $fe_fin;
    $fe_ini = substr($fe_ini, 6, 4) . '-' . substr($fe_ini, 3, 2) . '-' . substr($fe_ini, 0, 2);
    $fe_fin = substr($fe_fin, 6, 4) . '-' . substr($fe_fin, 3, 2) . '-' . substr($fe_fin, 0, 2);
    $conditions = array('conditions' => array('DATE(fe_venta) BETWEEN DATE(?) AND DATE(?)', $fe_ini, $fe_fin));
}

if($dia_ini && $dia_fin){
    $del = $dia_ini; $al = $dia_fin;
    $fe_ini = substr($fe_ini, 6, 4) . '-' . substr($fe_ini, 3, 2) . '-' . substr($fe_ini, 0, 2);
    $fe_fin = substr($fe_fin, 6, 4) . '-' . substr($fe_fin, 3, 2) . '-' . substr($fe_fin, 0, 2);
    $conditions = array('conditions' => array('nu_diadw>=? AND nu_diadw<=?', $dia_ini, $dia_fin));
}

$vc = VentasC::find('all', $conditions);
$empresa = Empresas::first(array('conditions' => array('co_empresa>=?', $cia)));

if ($out=='pdf') { 
    $pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
    $pdf->setCreator("JC");
    $pdf->setAuthor('JC');
    //$pdf->setTitle('Registro de Ventas');
    $anchos = array(23, 25, 25, 70, 20, 15, 20, 0);
    $pdf->setAnchos($anchos);
    //DATOS DE CABECERA
    $pdf->setNoCia($empresa->no_razon_social);
    $pdf->setTitulo($titulo);
    $pdf->setDiaIni($del);
    $pdf->setDiaFin($al);
    $pdf->setFechaSistema(date('d/m/Y'));
    $pdf->setHoraSistema(date('h:i A'));
    //FIN

    //CONFIGURACION PAGINA
    $pdf->AddPage();
    //$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);  
    $pdf->SetTopMargin(33);
    $pdf->SetLeftMargin(4);
    $pdf->SetRightMargin(4);
    //FIN

    $pdf->Ln();
    $pdf->SetFont('courier', '', 9);

    foreach ($vc as $row) {
        $date = new DateTime($row->fe_venta);
        $pdf->Cell($anchos[0], 0, $date->format('d/m/Y'));
        $pdf->Cell($anchos[1], 0, $row->nu_comprobante);
        $pdf->Cell($anchos[2], 0, $row->co_cliente);
        $pdf->Cell($anchos[3], 0, $row->no_cliente);
        $pdf->Cell($anchos[4], 0, number_format($row->va_neto, 2), 0, 0, 'R');
        $pdf->Cell($anchos[5], 0, number_format($row->va_igv, 2), 0, 0, 'R');
        $pdf->Cell($anchos[6], 0, number_format($row->va_venta, 2), 0, 0, 'R');
        if($row->fl_anulada=='S'){
            $pdf->Cell($w[7], 0, ' S');
        }else{
            $pdf->Cell($w[7], 0, ' ');
        }
        $pdf->Ln();
    }
  
    $pdf->Output("RegistroVentas Del: $del-Al: $al.pdf", 'I');
} else {
    $objPHPExcel = new PHPExcel();
    $objPHPExcel->getProperties()->setCreator("JC")
                             ->setLastModifiedBy("JC")
                             ->setTitle($titulo)
                             ->setSubject($titulo)
                             ->setDescription($titulo)
                             ->setKeywords($titulo)
                             ->setCategory($titulo);
    $ActiveSheet = $objPHPExcel->setActiveSheetIndex(0);
    $ActiveSheet->mergeCells('C2:F2');

    $styleArrayTitulo = array(
        'font' => array(
            'bold' => true,
        ),
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle("C2")->applyFromArray($styleArrayTitulo);
    
    $ActiveSheet->setCellValue('A1', $empresa->no_razon_social);
    $ActiveSheet->setCellValue('C2', $titulo);
    $ActiveSheet->setCellValue('C3', "DEL:");
    $ActiveSheet->setCellValue('D3', $del);
    $ActiveSheet->setCellValue('E3', "AL:");
    $ActiveSheet->setCellValue('F3', $al);

    $ini=5;
    $styleArrayTituloColumna = array(
        'font' => array(
            'bold' => true,
        )
    );
    $objPHPExcel->getActiveSheet()->getStyle("A$ini:H$ini")->applyFromArray($styleArrayTituloColumna);
    $ActiveSheet->setCellValue("A$ini", 'FECHA');
    $ActiveSheet->setCellValue("B$ini", 'DOCUMENTO');
    $ActiveSheet->setCellValue("C$ini", 'RUC');
    $ActiveSheet->setCellValue("D$ini", 'CLIENTE');
    $ActiveSheet->setCellValue("E$ini", 'NETO');
    $ActiveSheet->setCellValue("F$ini", 'IGV');
    $ActiveSheet->setCellValue("G$ini", 'TOTAL');
    $ActiveSheet->setCellValue("H$ini", 'ANULADO');

    $ini=6;
    foreach ($vc as $row) {
        $date = new DateTime($row->fe_venta);
        $ActiveSheet->setCellValue("A$ini", $date->format('d/m/Y'));
        $ActiveSheet->setCellValue("B$ini", $row->nu_comprobante);
        $ActiveSheet->setCellValue("C$ini", $row->co_cliente);
        $ActiveSheet->setCellValue("D$ini", $row->no_cliente);
        $ActiveSheet->setCellValue("E$ini", number_format($row->va_neto, 2));
        $ActiveSheet->setCellValue("F$ini", number_format($row->va_igv, 2));
        $ActiveSheet->setCellValue("G$ini", number_format($row->va_venta, 2));
        if($row->fl_anulada=='S'){
            $ActiveSheet->setCellValue("H$ini", 'S');
        }else{
            $ActiveSheet->setCellValue("H$ini", '');
        }
        $ini+=1;
    }

    $objPHPExcel->getActiveSheet()->setTitle("RegistroVentas");
    $objPHPExcel->setActiveSheetIndex(0);

    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment;filename="RegistroVentas Del: $del-Al: $al.xls"');
    header('Cache-Control: max-age=0');
    // If you're serving to IE 9, then the following may be needed
    header('Cache-Control: max-age=1');

    // If you're serving to IE over SSL, then the following may be needed
    header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
    header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
    header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
    header ('Pragma: public');
    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
    $objWriter->save('php://output');
}
?>