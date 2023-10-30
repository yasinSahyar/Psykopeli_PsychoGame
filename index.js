$(document).ready(function(){
});

$(document).ready(function(event){

// Muuttuja ja funktiot elämä-/harjoituspelin vaihtoa varten
    let harjoitus = false;
    function setHarjoitus() {
        harjoitus = true;
    };
    function unsetHarjoitus() {
        harjoitus = false;
    };
// Aloitus, lopetus, kysymykset ja äänet

    //Kutsuu funktiota Aloita (Kestopeli)
    $(".Aloita").click(function() {
        Aloita(); 
    });
    //Kutsuu funktiota Lopeta
    $(".Lopeta").click(function() {
        Lopeta();
        stopMusic(bgaudio);
        stopMusic(bgcalm);
    });

    //Aloittaa napin liikkumisen ja näyttää pisteluettelon
    function Aloita() {
        $(".Pistemaara").css("display", "block");
        $(".Aloita").css("display", "none");
        $(".Lopeta").css("display", "block");
        $(".seuraavaRuutu").css("display", "block");
        $("#kysymysLaatikko").css("display", "block")
        $("#kysymysLaatikko").rotator();
        if(harjoitus==false) {
            $("#hbar").css("display", "block");
        } else {
            $(".pisteet").css("color", "gray");
            $(".Pistemaara").css("color", "gray");
        }
    };
    //Lopettaa napin liikkumisen ja palautaa sen aloituspisteeseen
    function Lopeta() {
        $("#loppuruutu").css("display", "none");
        $("#Pistetaulu").css("display", "none");
        $("#alkuruutu").css("display", "block");
        $(".Pistemaara").text("0");

        $("#kysymysLaatikko").hide(100);
        $(".Lopeta").css("display", "none");
        $(".Aloita").css("display", "block");
        $(".Pistemaara").css("display", "none");
        $(".seuraavaRuutu").css("display", "none");
        $("#peli").css("display", "none");
        $(".nappula").stop(true, false);
        $(".nappula").animate({left: '400px', top: '650px' });
        $('.overlay').css("display", "none");
        indeksi = 0;
        $("#kysymysLaatikko").loppu();
        $("#hbar").css("display", "none");
        document.getElementById("life1").src="icons8-psi-67_gold.png";
        document.getElementById("life2").src="icons8-psi-67_gold.png";
        document.getElementById("life3").src="icons8-psi-67_gold.png";
        stopMusic(bgaudio);
        stopMusic(bgcalm);
        $(".Virhemaara").text("0");
        $(".pisteet").css("color", "#E85024");
        $(".Pistemaara").css("color", "#E85024");
    };

    // Haetaan kysymykset tiedostosta ja tallenetaan se globaaliin muuttujaan
    $.get("kysymykset.txt", function(jsonData) {
        window.jsonData = JSON.parse(jsonData);
    });
    //audio
        //tausta beatilla
        var bgaudio  = new Audio();
        var srcbg  = document.createElement("source");
        srcbg.type = "audio/mpeg";
        srcbg.src  = "psykopeli_master320.mp3";
        bgaudio.appendChild(srcbg);

        //tausta ilman beattia
        var bgcalm = new Audio();
        var srcbgcalm = document.createElement("source");
        srcbgcalm.type = "audio/mpeg";
        srcbgcalm.src = "psykopeli_noDRM_master320.mp3"
        bgcalm.appendChild(srcbgcalm);

        //oikein-ääni (F5)
        var R5  = new Audio();
        var srcR5  = document.createElement("source");
        srcR5.type = "audio/mpeg";
        srcR5.src  = "R5.mp3";
        R5.appendChild(srcR5);

        //ensimmäinen väärin (F5+)
        var Waug1  = new Audio();
        var srcWaug1  = document.createElement("source");
        srcWaug1.type = "audio/mpeg";
        srcWaug1.src  = "Waug1.mp3";
        Waug1.appendChild(srcWaug1);

        //toinen väärin (E5+)
        var Waug2  = new Audio();
        var srcWaug2  = document.createElement("source");
        srcWaug2.type = "audio/mpeg";
        srcWaug2.src  = "Waug2.mp3";
        Waug2.appendChild(srcWaug2);

        //kolmas väärin (Fdim)
        var Wdim  = new Audio();
        var srcWdim  = document.createElement("source");
        srcWdim.type = "audio/mpeg";
        srcWdim.src  = "Wdim.mp3";
        Wdim.appendChild(srcWdim);

    //toistaa audion
    //oikein-äänen pituuden takia audio asetettava alkuun, jotta ääni toistuisi joka kerta
    function playMusic(audio) {
        audio.currentTime = 0; 
        audio.play();
    }
    //lopettaa audion, palauttaa alkuun
    function stopMusic(audio) {
        audio.pause();
        audio.currentTime = 0;
    }

// Liikkuminen, virheet ja lopetus

    // Tallennetaan koordinaatit taulukkoon
    const koordinaatit = [
        ["318px", "685px"],
        ["232px", "683px"],
        ["150px", "640px"],
        ["109px", "560px"],
        ["109px", "465px"],
        ["147px", "383px"],
        ["228px", "335px"],
        ["313px", "338px"],
        ["392px", "368px"],
        ["463px", "430px"],
        ["540px", "505px"],
        ["618px", "586px"],
        ["683px", "651px"],
        ["765px", "688px"],
        ["850px", "679px"],
        ["923px", "628px"],
        ["960px", "547px"],
        ["960px", "457px"],
        ["920px", "385px"],
        ["845px", "340px"],
        ["765px", "335px"],
        ["680px", "368px"],
        ["616px", "434px"],
        ["537px", "510px"],
        ["463px", "580px"],
        ["400px", "650px"]
    ];
    // muuttuja liikkumisen seuraamista varten
    indeksi = 0;
    toinenHarjoitus = false;

    // Liikutetaan pelinappulaa laudalla x ja y arvojen mukaan
    function Liikkuminen() {
        
        $(".nappula").animate({left: koordinaatit[indeksi][0], top: koordinaatit[indeksi][1]});
        //  Lisätään indeksiin 1, jolloin siirrytään taulukossa seuraavaan koordinaattiin
        indeksi++;

        if (indeksi < koordinaatit.length) {
            setTimeout(() => {
                kysymysPaalle();
            }, 2000);
        }
        //  Nollataan laskuri ja lopetetaan peli, kun lauta on menty ympäri
        if(indeksi == koordinaatit.length) {
            if(harjoitus==false) {
                indeksi = 0;    
                lopetaKierros();
            } else if(toinenHarjoitus==false){
                indeksi = 0;
                toinenHarjoitus = true;
                jatkoKysymys();
            } else if(toinenHarjoitus==true){
                indeksi = 0;
                lopetaKierros();
            }
        }
    }
    function jatkoKysymys() {
        $("#jatkoKysymys").css("display", "block");
    }
    // Tarkistaa virhepisteiden määrän ja ehdon loppumiselle
    function virhe() {
        virhetilanne = parseInt($(".Virhemaara").text());
        
        if(virhetilanne===1){
            document.getElementById("life1").src="icons8-psi-67_red.png";
            playMusic(Waug1);
        } else if(virhetilanne===2){
            document.getElementById("life2").src="icons8-psi-67_red.png";
            playMusic(Waug2);
        } else if(virhetilanne===3){
            document.getElementById("life3").src="icons8-psi-67_red.png";
            playMusic(Wdim);
            // viive kierroksen päättymiselle, selkeyttää kokemusta
            if(harjoitus==false){
                setTimeout(function() {
                    lopetaKierros();
                }, 2000);
            } else {
                $(".Virhemaara").text("0");
            }
        } else {
            return;
        }
    }
    //  Lopettaa kyseisen kierroksen
    function lopetaKierros() {
        $("#kysymysLaatikko").hide(100);
        $(".Lopeta").css("display", "none");
        $(".Aloita").css("display", "block");
        $(".Pistemaara").css("display", "none");
        $(".seuraavaRuutu").css("display", "none");
        $("#loppuruutu").css("display", "block");
        $("#Pistetaulu").css("display", "block");
        $("#peli").css("display", "none");
        $(".loppu-pisteet").text(loppupisteet);
        $(".nappula").stop(true, false);
        $(".nappula").animate({left: '400px', top: '650px' });
        $('.overlay').css("display", "none");
        $("#kysymysLaatikko").loppu();
        $("#hbar").css("display", "none");
        indeksi = 0;
        stopMusic(bgaudio);
        stopMusic(bgcalm);
        document.getElementById("life1").src="icons8-psi-67_gold.png";
        document.getElementById("life2").src="icons8-psi-67_gold.png";
        document.getElementById("life3").src="icons8-psi-67_gold.png";
        if(harjoitus==false){
            updateScore(loppupisteet);
        }
        $(".pisteet").css("color", "#E85024");
        $(".Pistemaara").css("color", "#E85024");
    }         haePisteet();
   

// Kortin funktiot
    
    //  Piilottaa kysymyslaatikon
    function kysymysPois() {
        $("#kysymysLaatikko").flip();
    }
    
    //  Tuo kysymyslaatikon ruudulle
    function kysymysPaalle() {
        randomized = jsonData.kysymykset[Math.floor(Math.random() * jsonData.kysymykset.length)];
        let kysymysIndeksi = jsonData.kysymykset.indexOf(randomized);
        jsonData.kysymykset.splice(kysymysIndeksi, 1);
        if(jsonData.kysymykset.length === 0) {
            $.get("kysymykset.txt", function(jsonData) {
                window.jsonData = JSON.parse(jsonData);
            });
        }
        $("#kysymysLaatikko .kysymys p").text(randomized.kysymys);
        $("#kysymysLaatikko").flip();
    }

    // kortin reuna-animaatio
    // muuttujat eri värien animaatioille
    var vih = 'flashg';
    var pun = 'flashr';
    // funktio liittää korttiin pyydetyn värin välähdyksen
    function vilkku(reunavari) {
        const kortti = document.querySelector('.kortti');
        kortti.classList.add(reunavari);
        kortti.addEventListener('animationend', () => {
            kortti.classList.remove(reunavari);
        });
    }
    

//  click-funktiot ->

// Pelilaudan click-funktiot
    // kääntönopeutus

    /*function changeFlipDurations() {
        Flip.run({
            rotateduration: 0.0001,
            scaleduration: 0.0001
        });
      }
    /*function changeTimeoutValues() {
        $.fn.rotator.defaults.timeout1 = 0;
        $.fn.rotator.defaults.timeout2 = 0;
        setTimeout(() => {
            $.fn.rotator.defaults.timeout1 = 500;
            $.fn.rotator.defaults.timeout2 = 500;
        }, 1000);
    }
    /*function changeRotatorDuration() {
        $.getScript('jquery.rotator.js', function() {
            rotateduration = 0;
            scaleduration = 0;
            setTimeout(() => {
                rotateduration = 0.3;
                scaleduration = 0.35
            }, 1000);
        });
    }*/
    /*$("#Lauta").click(function() {
        //changeFlipDurations();
        $("#kysymysLaatikko").stop(true, true);
        //console.log(rotateduration, scaleduration);
    });
    $("#kysymysLaatikko").click(function() {
        $("#kysymysLaatikko").stop(true, true);
    });*/
    // nappi jolla testata kortin kääntöä
            // ei käytössä
            $(".btn_toggle").click(function() {
                Liikkuminen();
            });

    // Pisteet ja virheet vastausvalinnoissa ->

    //  "Oikein" napin klikkaus
    $(".oikein").click(function(){
        $(".napit").children().prop('disabled', true);
        
        // Lisätään 1 piste, jos vastaus menee oikein
        // Lisätään 1 virhe, jos vastaus menee väärin
        // Reuna vilkkuu vastauksen mukaan
        pisteet = parseInt($(".Pistemaara").text());
        virheet = parseInt($(".Virhemaara").text());
        if(randomized.vastaus == "o") {
            $(".Pistemaara").text(pisteet+1);
            playMusic(R5);
            vilkku(vih);
        } else if(randomized.vastaus == "v") {
            $(".Virhemaara").text(virheet+1);
            virhe();
            vilkku(pun);
        }
        loppupisteet = $(".Pistemaara").text();
        kysymysPois();
        Liikkuminen();

        setTimeout(() => {
            $(".napit").children().prop('disabled', false);
        }, 3600);
    });
    // "Väärin" napin klikkaus
    $(".vaarin").click(function(){
        $(".napit").children().prop('disabled', true);

        // Lisätään 1 piste, jos vastaus menee oikein
        // Lisätään 1 virhe, jos vastaus menee väärin
        // Reuna vilkkuu vastauksen mukaan
        pisteet = parseInt($(".Pistemaara").text());
        virheet = parseInt($(".Virhemaara").text());
        if(randomized.vastaus == "v") {
            $(".Pistemaara").text(pisteet+1);
            playMusic(R5);
            vilkku(vih);
        } else if(randomized.vastaus == "o") {
            $(".Virhemaara").text(virheet+1);
            virhe();
            vilkku(pun);
        }
        loppupisteet = $(".Pistemaara").text();
        kysymysPois();
        Liikkuminen();

        setTimeout(() => {
            $(".napit").children().prop('disabled', false);
        }, 3600);
    });

// Pelilaudan ulkopuoliset  click-funktiot ->
    // Elämäpelin aloitus, toista musiikki
    $(".Aloita").click(function(){
        Liikkuminen();
        $('.overlay').css("display", "block");
        if(harjoitus==false){
            playMusic(bgaudio);
        } else {
            playMusic(bgcalm);
        }
    });
    // Paluu loppuruudusta peliin, pisteiden nollaus
    $("#alkuun").click(function(){
        $("#loppuruutu").css("display", "none");
        $("#Pistetaulu").css("display", "none");
        $("#peli").css("display", "block");
        $(".Pistemaara").text("0");
        $(".Virhemaara").text("0");

    });
    // Valikossa liikkumiset
    $(".Yksinpeli").click(function(){
        $("#menu").css("display", "none");
        $("#yksinpeli").css("display", "block");
        $(".menu-otsikko").css("display", "none");
        $(".yksinpeli-otsikko").css("display", "block");
    });
    $(".Kestopeli").click(function(){
        $("#alkuruutu").css("display", "none");
        $("#peli").css("display", "block");
        unsetHarjoitus(); // varmistus, ettei ala harjoitus
    });
    $(".Harjoituspeli").click(function(){
        $("#alkuruutu").css("display", "none");
        $("#peli").css("display", "block");
        setHarjoitus();
    })
    $(".Takaisin").click(function(){
        $("#menu").css("display", "block");
        $("#login").css("display", "none");
        $("#yksinpeli").css("display", "none");
        $("#register").css("display", "none");
        $(".menu-otsikko").css("display", "block");
        $(".login-otsikko").css("display", "none");
        $(".yksinpeli-otsikko").css("display", "none");
        $(".reg-otsikko").css("display", "none");
    })
    $(".Kirjaudu").click(function(){
        $("#menu").css("display", "none");
        $("#login").css("display", "block");
        $(".menu-otsikko").css("display", "none");
        $(".login-otsikko").css("display", "block");
    });
    $(".luonti").click(function(){
        $("#login").css("display", "none");
        $("#register").css("display", "block");
        $(".login-otsikko").css("display", "none");
        $(".reg-otsikko").css("display", "block");
    });
    //Harjoituspelin puolivälin jatko click
    $("#jatkaHarjoitusta").click(function(){
        $("#jatkoKysymys").css("display", "none");
        $(".Aloita").click();
    })
    // Loppuruudun click -> paluu valikkoon
    $(".valikko").click(function(){
        $(".Pistemaara").text("0");
        $(".Virhemaara").text("0");
        $("#loppuruutu").css("display", "none");
        $("#Pistetaulu").css("display", "none");
        $("#alkuruutu").css("display", "block");
        $(".Takaisin").click();
        if(harjoitus==true) {
            $("#jatkoKysymys").css("display", "none");
            $("#peli").css("display", "none");
            unsetHarjoitus();
            stopMusic(bgcalm);
        }
    });
    $('#logout').click(function() {
        //AJAX-kutsu uloskirjautumiseen
        $.ajax({
            url: 'logout.php',
            method: 'POST',
            success: function() {
                // pidetään url samassa muodossa
                window.history.pushState({}, '', window.location.origin + '/psykopeli');

                // poistetaan urlista queryn muuttujat
                window.history.replaceState({}, '', window.location.pathname);

                // pakotetaan refresh käyttäjätietojen puhdistamiseksi
                window.location.reload(true);
                alert("Käyttäjä kirjattu ulos");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });
    // Pisteiden päivittäminen tietokantaan
    function updateScore(endscore) {
        $.ajax({
            type: "POST",
            url: "score_update.php",
            data: {endscore: endscore},
            success: function(response) {
                console.log(response);
            },
            error: function(xhr, status, error) {
                console.log("Virhe pisteiden päivittämisessä: " + status + error);
            }
        });
    }
    // Pistetaulukon luonti
    function haePisteet() {
        $.ajax({
            url: 'pistetaulu.php',
            method: 'POST',
            data: { score: loppupisteet },
            success: function(data) {
              $('#pistetaulukko').html(data);
            },
            error: function(xhr, status, error) {
              console.log('Error: ' + error);
            }
          });
    }

/*
    // Luodaan taulu
    function teeTaulu(data, currentUser) {
        var table = $("#Pistetaulukko table");
        table.append("<tr><td>#</td><td>Nimi<(td><td>Pisteet</td></tr>");

        // Luodaan top5 rivit
        var top5 = data.slice(0,5);
        for (var i= 0; i < top5.length; i++) {
            teeRivi(table, top5[i], i+1);
        }
        // jos käyttäjä ei top5:ssä, tehdään lisärivit
        if(currentUser && !isInTop5(currentUser, top5)) {
            table.append("<tr><td>...</td><td></td><td></td></tr>");
            var currentUserRank = getRankOfUser(currentUser, data);
            teeRivi(table, currentUser, currentUserRank);
        }
    }
    // Rivin luominen
    function teeRivi(table, rowData, rank) {
        var row = $("<tr />");
        table.append(row);
        row.append($("<td>" + rank + "</td>"));
        row.append($("<td>" + rowData.name + " " + "</td>"));
        row.append($("<td>" + rowData.score + "</td>"));
    }

    // Käyttäjän Top5:ssä olemisen tarkistus
    function isInTop5(currentUser, top5) {
        for (var i = 0; i < top5.length; i++) {
            if (top5[i].id == currentUser.name)  {
                return true;
            }
        }
        return false;
    }
    // Luetaan käyttäjän sija
    function getRankOfUser(currentUser, data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == currentUser.name) {
                return i+1;
            }
        }
    }*/
    // AJAX-kutsu
    /*function haePisteet() {
        $.ajax({
            url: 'score_fetch.php',
            dataType: 'json',
            success: function(data) {
                $("#Pistetaulukko table").empty();
                teeTaulu(data, currentUser);
                $("#Pistetaulu").css("display", "block");
            },
            error: function() {
                console.log("Failed to fetch scores from server");
            }
        });*/
        
       /* $.ajax({
            type: "POST",
            url: "score_fetch.php",
            success: function(data) {
                console.log("Data received from score_fetch.php:");
                console.log(data);
                var jsonData = JSON.parse(data);
                var parsedData = JSON.parse(data);
                var currentUser = parsedData.currentUser;
                var currentUserName = currentUser.name;
                console.log("Parsed JSON data:");
                console.log(jsonData);
                teeTaulu(jsonData, currentUser);
                $("#Pistetaulu").css("display", "block");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Error fetching data from score_fetch.php:");
                console.log(errorThrown);
            }
        });*/
    /*}*/
    // $(document).ready(function() {
    //     // ...
    
    //     // Function to handle the form submission when the user clicks the "Upload" button
    //     $("#upload-form").submit(function(e) {
    //         e.preventDefault();
    
    //         // Get the selected file from the file input field
    //         var file = $("#file-input")[0].files[0];
    
    //         // Create a FormData object and append the selected file to it
    //         var formData = new FormData();
    //         formData.append('file', file);
    
    //         // Make an AJAX request to the server to upload the file
    //         $.ajax({
    //             url: 'upload.php', // Replace 'upload.php' with the URL of your server-side script
    //             type: 'POST',
    //             data: formData,
    //             processData: false,
    //             contentType: false,
    //             success: function(response) {
    //                 // Handle the server response (e.g., display a success message)
    //                 console.log("File uploaded successfully:", response);
    //             },
    //             error: function(xhr, status, error) {
    //                 // Handle errors
    //                 console.error("File upload error:", error);
    //             }
    //         });
    //     });
    // });
    
    
});