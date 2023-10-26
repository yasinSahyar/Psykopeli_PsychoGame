<?php
if (session_status() == PHP_SESSION_NONE) { // varmistetaan session jatkuminen
    session_start();
}
require_once('connect.php');
require_once("pdo_trycatch.php"); // varmistetaan PDO:n toiminta
if(isset($_POST['endscore'])) {
    $username = $_SESSION['psyko'];
    echo '<script type="text/javascript"> alert("'.$username.' Löytyi!");</script>';
    $endscore = $_POST['endscore'];

    // Valmistellaan statement,
    // GREATEST() varmistaa, että tietokantaan ei kirjoiteta edellistä pienempiä arvoja
    $stmt = $pdo->prepare("UPDATE players SET score = GREATEST(IFNULL(score, 0), :endscore) WHERE username = :username");

    // Sidotaan muuttujat placeholdereihin
    $stmt->bindParam(':endscore', $endscore, PDO::PARAM_INT);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);

    // suoritetaan statement
    $stmt->execute();

    // Tarvitseeko mitään viestiä?
    //echo script alert?
}
?>
