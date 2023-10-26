<?php
    session_start();
    include "connect.php";
    include "create_acc.php";
    include "login.php";
    include "score_update.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="index.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
    
    <script src="jquery.rotator.js"></script>
    <script defer src="index.js"></script>
    <title>PsykoPeli</title>
</head>
<body>
    
    <!--Alkuruutu-->
    <div id="alkuruutu">
        <div id="alkuruutu-otsikko">
            <img src="lgo.png" width="400px" height="150px">
        </div>
        <!--otsikot-->
        <div id="otsikko" class="menu-otsikko">
            <a>Tervetuloa Psykopeliin</a>
        </div>
        <div id="otsikko" class="login-otsikko">
            <a>Kirjaudu tai luo uusi tunnus</a>
        </div>
        <div id="otsikko" class="yksinpeli-otsikko">
            <a>Valitse pelimuoto</a>
        </div>
        <div id="otsikko" class="reg-otsikko">
            <a>Luo tunnus</a>
        </div>
        <!--menu-->
        <div id="menu">
            <?php if(isset($_SESSION['psyko'])) { ?>
            <div class="Kirjautunut">
                <button id=logout>Kirjaudu ulos</button>
            </div>
            <?php } else { ?>
            <div class="Kirjaudu">
                <a>Kirjaudu tai luo tunnus <span class="Info">Kirjautuneena pelituloksesi tallentuu pistetilastoon</span></a>
            </div>
            <?php } ?>
            <div class="Yksinpeli">
                <a>Yksinpeli<span class="Info">Elämäpeli tai harjoituspeli</span></a>
            </div>  
            <div class="moninpeli">
                <a>Moninpeli<span class="Info">Kilpaile tietämyksessäsi toista pelaajaa vastaan</span></a>
            </div>
            <div class="tiedot">
                <a>Tiedot</a>
            </div>
        </div>
        <!--Kirjautuminen ja tunnuksien luonti-->
        <div id="login">
            <!--Kirjautumistaulu-->
            <div id="loginform">
                <form id="logform" method="post">
                    <table>
                        <tr>
                            <td>Käyttäjätunnus</td>
                            <td> <input type="text" name="user" > </td>
                        </tr>
                        <tr>
                            <td>Salasana</td>
                            <td><input type="password" name="passw"></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><input class="button" type="submit" name="login" value="KIRJAUDU"></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td>Ensimmäinen kerta?</td>
                        </tr>
                        <tr>
                            <td>▼</td>
                        </tr>
                        <tr>
                            <td> <a class="luonti">Luo tunnus</a></td>
                        </tr>
                        <tr>
                            <td> <a class="Takaisin">Takaisin</a></td>
                        </tr>
                    </table>
                </form>
            </div>
            
        </div>
        <div id="register">
            <!--rekisteröintitaulu-->
            <div id="regform">
                <form id="rform" method="post">
                    <table>
                        <tr>
                            <td>Käyttäjätunnus</td>
                            <td><input type="text" name="username"></td>
                        </tr>
                        <tr>
                            <td>Salasana</td>
                            <td><input type="password" name="pass"></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><input class="button" type="submit" name="reg" value="Luo tunnus"></td>
                        </tr>
                        <tr>
                            <td><a class="Takaisin">Takaisin</a></td>
                        </tr>
                    </table>
                </form>
            </div>
            
        </div>
        <!--Yksinpelivalikko-->
        <div id="yksinpeli">
            
            <?php if(isset($_SESSION['psyko'])) { // Kirjautumatta ei voi pelata elämäpeliä
                ?> 
            <div class="Kestopeli">
                <a>Elämäpeli<span class="Info">Elämäpelissä yrität saavuttaa mahdollisimman paljon pisteitä kolmella elämällä</span></a>
            <?php } else { ?>
            <div class="KestoDENIED">
                <p>Elämäpeli<span class="Info">Kirjaudu sisään pelataksesi elämäpeliä</span></p>
            <?php } ?>
                
            </div>
            <div class="Harjoituspeli">
                <a>Harjoituspeli<span class="Info">Harjoituspelissä voit käydä läpi kysymyksiä</span></a>
            </div>
            <div class="Takaisin">
                <a>Takaisin<span class="Info">Paluu alkuvalikkoon</span></a>
            </div>
        </div>
    </div>
    
    <!--Pelinäkymä-->
    <div id="peli">
        <div id="ylapalkki">
            <div class="nav">
                <a class="pisteet">Pisteet: </a>
                <p class="Pistemaara"> 0 </p>
                <p class="Virhemaara"> 0 </p>
                <p class="volume"><input type="range" min="0" max="100" value="100" oninput="sample.changeVolume(this);"> Volume</p>
                <a class="Aloita">Aloita</a>
                <a class="Lopeta">Lopeta</a>
            </div>
        </div>
        <div id="Lauta">
            <img class="lauta_kuva" src="Pelilauta.png" alt="pohja" >
            <div id="hbar"> <!--healthbar-->
                <table>
                    <tr>
                        <td>
                            <div id="hide_red">
                                <img src="icons8-psi-67_red.png" alt="not_visible">
                            </div>
                            <div id="life">
                                <img id="life1" src="icons8-psi-67_gold.png" alt="symboli">
                            </div>
                        </td>
                        <td>
                            <div id="life">
                                <img id="life2" src="icons8-psi-67_gold.png" alt="symboli">
                            </div>
                        </td>
                        <td>
                            <div id="life">
                                <img id="life3" src="icons8-psi-67_gold.png" alt="symboli">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div> 
        <div id="Pelaaja">
            <span class="nappula"><img class="nappula_img" src="icons8-psi-67.png" alt="nappula"></span>
        </div>
        <span class="overlay"></span>
        <div id="kysymysLaatikko">
            <div class="kysymys">
                <div class="front ">
                    <img class="kortti_img" src="psykopeli-kortti.PNG" alt="kortti">
                </div>
                <div class="back kortti">
                    <div class="yla">
                        <h1>Oikein vai Väärin?</h1>
                    </div>
                    <p></p>
                    <div class="napit"> 
                        <button class="oikein">Oikein</button>
                        <button class="vaarin">Väärin</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="jatkoKysymys">
                <h1>Puoliväli saavutettu!</h1>
                <h2>Tahdotko jatkaa loppuun asti?</h2>
                <div id="jatkaHarjoitusta">
                    <h2>Jatka</h2>
                </div>
                <div class="valikko">
                    <h2>Paluu valikkoon</h2>
                </div>
        </div>
    </div>

    <!--Loppuruutu-->
    <div id="loppuruutu">
        <div id="loppuruutu-otsikko">
            <h1>Kiitos kun pelasit</h1>
        </div>
        <div id="pisteluettelo">
            <a>Pisteet:</a>
            <a class="loppu-pisteet">0</a>
            <a> / 25</a>
        </div>
        
        <div id="alkuun">
            <h2>Aloita alusta</h2>
        </div>
        <div class="valikko">
            <h2>Takaisin alkuruutuun</h2>
        </div>
    </div>
    <!--Pistetaulu-->
    <div id="Pistetaulu">
        <div id="Pistetaulu-otsikko">
            <h1>Parhaat tulokset</h1>
        </div>
        <table>
            
            <tbody id="pistetaulukko">
            </tbody>
        </table>
    </div>
    
</body>
</html>

