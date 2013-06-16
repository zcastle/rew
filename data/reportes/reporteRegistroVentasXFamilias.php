<?php
//header('Content-type: application/pdf');
require_once('../../lib/fpdf17/fpdf.php');

class MYFPDF extends FPDF {
    private $noCia;
    private $diaIni;
    private $diaFin;
    private $fechaSistema;
    private $horaSistema;
    
    public function setNoCia($noCia) {
        $this->noCia = $noCia;
    }
    
    public function setDiaIni($diaIni) {
        $this->diaIni = $diaIni;
    }
    
    public function setDiaFin($diaFin) {
        $this->diaFin = $diaFin;
    }

    public function setFechaSistema($fechaSistema){
        $this->fechaSistema = $fechaSistema;
    }

    public function setHoraSistema($horaSistema){
        $this->horaSistema = $horaSistema;
    }
    public function Header() {
        $h = 5;
        $this->SetY(5);
        $this->SetFont('arial', '', 10);
        $this->Cell(0, $h, $this->noCia, 0, 1, 'L');
        $this->SetFont('arial', 'B', 20);
        $this->Cell(0, $h, 'REGISTRO DE VENTAS X FAMILIAS', 0, 1, 'C');
        $this->SetFont('arial', '', 11);
        $this->Cell(0, $h, "DEL: $this->diaIni AL: $this->diaFin", 0, 1, 'C');
        $this->ln();
        $w = array(35, 20, 90, 15, 15, 15);
        $this->SetFont('arial', 'B', 10);
        $this->Cell($w[0], $h, 'FAMILIA');
        $this->Cell($w[1], $h, 'CODIGO');
        $this->Cell($w[2], $h, 'PRODUCTO');
        $this->Cell($w[3], $h, 'CANTIDAD', 0, 0, 'R');
        $this->Cell($w[4], $h, 'VALOR', 0, 0, 'R');
        $this->Cell($w[5], $h, 'TOTAL', 0, 0, 'R');
    }
    public function Footer() {
        $this->SetY(-15);
        $this->SetFont('arial', 'I', 8);
        $this->Cell(0, 5, 'Pagina '.$this->PageNo().'/{nb}', 0, 1);
        $this->Cell(0, 5, "Fecha Impresion: $this->fechaSistema", 0, 1);
        $this->Cell(0, 5, "Hora Impresion: $this->horaSistema", 0, 0);
    }
}

$pdf = new MYFPDF('P','mm','A4'); //array(190,210)
$pdf->AliasNbPages();
$pdf->AddPage();
//$pdf->SetMargins(0,0,0);
$pdf->setNoCia('Empresa');
$pdf->setDiaIni('1');
$pdf->setDiaFin('2');
$pdf->setFechaSistema('01/01/2013');
$pdf->setHoraSistema('15:00');
//$pdf->SetFont('Arial','',9);

$pdf->Output();
?>