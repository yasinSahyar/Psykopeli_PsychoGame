<?php //tunnuksen luominen
include_once("test_input.php");
require_once("connect.php");
require_once("pdo_trycatch.php"); // varmistetaan PDO:n toiminta

$fill_all = ""; //käsky täyttää kaikki kentät, muutetaan myöhemmin tarvittaessa
    if(isset($_POST['reg'])) {
        echo $fill_all;
        $uname = test_input($_POST["username"]);
        $pass = test_input($_POST["pass"]);
        $hash_pass = password_hash($pass, PASSWORD_BCRYPT);
    }
    

    if(empty($uname) || empty($pass)) {         //tarkistetaan onko kentät täytetty
        $fill_all = "Täytä molemmat kentät";    //luodaan käsky
    } else {
        $sql = "SELECT * FROM players WHERE username = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$uname]);
        if($stmt->rowCount() > 0) {      //huomautus, jos tunnus jo olemassa
            echo '<script>alert("Tunnus on jo olemassa!");</script>';
        } else {
            //valmistellaan tunnuksen vienti tietokantaan
            $sql = "INSERT INTO players (username, pass) VALUES (?, ?)";
            $stmt = $pdo->prepare($sql);
            //suoritetaan
            $stmt->execute([$uname, $hash_pass]);
            
            echo '<script type="text/javascript"> window.open("   ","_self");</script>'; // KESKEN onnistunut luonti siirtää kirjautumaan?
        }
    }
    

?>
