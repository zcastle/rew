<?php
require_once '../lib/tcpdf/tcpdf.php';

class mypdf extends TCPDF {

    private $noCia;
    private $diaIni;
    private $diaFin;
    private $fechaSistema;
    private $horaSistema;
    private $anchos;
    private $titulo;
    
    public function setNoCia($noCia) {
        $this->noCia = $noCia;
    }
    
    public function setDiaIni($diaIni) {
        $this->diaIni = $diaIni;
    }
    
    public function setDiaFin($diaFin) {
        $this->diaFin = $diaFin;
    }

    public function setFechaSistema($fechaSistema) {
        $this->fechaSistema = $fechaSistema;
    }

    public function setHoraSistema($horaSistema) {
        $this->horaSistema = $horaSistema;
    }

    public function setAnchos($anchos) {
        $this->anchos = $anchos;
    }

    public function setTitulo($titulo) {
        $this->titulo = $titulo;
    }
            
    public function Header() {
        $this->SetLeftMargin(5);
        $this->SetRightMargin(5);
        $this->SetY(5);
        $this->SetFont('courier', '', 10, '', true);
        $this->Cell(0, 0, $this->noCia, 0, true, 'L');
        //$this->SetFont('courier', '', 8, '', true);
        
        $this->SetFont('courier', 'B', 20, '', true);
        $this->Cell(0, 0, $this->titulo, 0, true, 'C');
        $this->SetFont('courier', '', 11, '', true);
        $this->Cell(0, 0, "DEL: $this->diaIni AL: $this->diaFin", 0, 1, 'C');
        $this->ln();
        //$w = array(23, 25, 25, 70, 20, 15, 20, 0);
        $this->SetFont('courier', 'B', 10);
        $this->Cell($this->anchos[0], 0, 'FECHA');
        $this->Cell($this->anchos[1], 0, 'DOCUMENTO');
        $this->Cell($this->anchos[2], 0, 'RUC');
        $this->Cell($this->anchos[3], 0, 'CLIENTE');
        $this->Cell($this->anchos[4], 0, 'NETO', 0, 0, 'R');
        $this->Cell($this->anchos[5], 0, 'IGV', 0, 0, 'R');
        $this->Cell($this->anchos[6], 0, 'TOTAL', 0, false, 'R');
        $this->Cell($this->anchos[7], 0, ' A');
    }

    public function Footer() {
        $paginas = 'Página '.$this->getAliasNumPage().'/'.$this->getAliasNbPages();
        $this->SetLeftMargin(4);
        $this->SetRightMargin(4);
        $this->SetY(-15);
        $this->SetFont('courier', 'I', 8);
        $this->Cell(0, 0, $paginas, 'T', true);
        $this->Cell(0, 0, "Fecha Impresión: $this->fechaSistema", 0, true);
        $this->Cell(0, 0, "Hora Impresión: $this->horaSistema", 0, false);
    }
}
?>