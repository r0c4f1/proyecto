<?php

require_once __DIR__ . '/vendor/tecnickcom/tcpdf/tcpdf.php';

class Pdf extends TCPDF {
    public function __construct() {
        parent::__construct();
    }
}