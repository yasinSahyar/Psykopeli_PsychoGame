<?php
// Käynnistetään sessio
session_start();

// tyhjennetään muuttujat
$_SESSION = array();

// Tuhotaan evästeet
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time()-42000, '/');
}
// Nollataan muuttujat
session_unset();
// Puretaan sessio
session_destroy();
?>