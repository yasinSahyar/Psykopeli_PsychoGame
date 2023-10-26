<?php  //Kirjautuminen peliin
include_once("test_input.php");
require_once("connect.php");
require_once("pdo_trycatch.php"); // <- virheiden varalta
if(isset($_POST['login'])) {
    $user = test_input($_POST['user']);
    $passw = test_input($_POST['passw']);


    if(empty($user)||empty($passw)) {        //tarkistetaan onko kentät täytetty
        echo '<script type="text/javascript"> alert("Täytä kaikki kentät!");</script>';
    } else {
        // käytetään PDO:n prepared statementteja
        $stmt = $pdo->prepare("SELECT username, pass FROM players WHERE username = ?");
        $stmt->execute([$user]);
        $row = $stmt->fetch();

        if ($row) {
            if(password_verify($passw, $row['pass'])) { //salasanan tarkistus
                $_SESSION['psyko'] = $user; //tallennetaan käyttäjänimi sessioon
                echo '<script type="text/javascript"> alert("'.$user.' Löytyi!");</script>';
            } else {
                //reaktio väärään salasanaan
                echo '<script type="text/javascript"> alert("Käyttäjätunnus tai salasana väärä");</script>';
            }
        } else {
            //reaktio väärään 
            echo '<script type="text/javascript"> alert("Käyttäjätunnus tai salasana väärä");</script>';
        }
    }
}
    


?>