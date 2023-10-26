<?php
if (session_status() == PHP_SESSION_NONE) { // varmistetaan session jatkuminen
    session_start();
}
require_once('connect.php');
require_once("pdo_trycatch.php"); // varmistetaan PDO:n toiminta
// Haetaan pisteet ajax-kutsun POST-datasta
$score = $_POST['score'];

// Haetaan tietokannasta tiedot pistejärjestyksessä
$sql = 'SELECT * FROM players ORDER BY score DESC';
$stmt = $pdo->prepare($sql);
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

// muuttuja kertomaan käyttäjän löytymisestä top5:ssä
$isTop5 = false;
// Luodaan pistetaulukko
$table = '<tr><th>#</th><th>Name</th><th>Score</th></tr>';
foreach (array_slice($data, 0, 5) as $i => $row) {
    $table .= '<tr><td>' . ($i+1) . '</td><td>' . $row['username'] . '</td><td>' . $row['score'] . '</td></tr>';
    if($row['username'] === $_SESSION['psyko']) {
        $isTop5 = true;
    }
}

// Haetaan käyttäjän pistesijainti
$currentRank = null;
foreach ($data as $i => $row) {
  if ($row['score'] < $score) {
    $currentRank = $i + 1;
    break;
  }
}
if ($currentRank === null) {
  $currentRank = count($data) + 1;
}

// Lisätään nykyisen käyttäjän rivi taulukkoon, jos ei ole jo top5:ssä
if(!$isTop5) {
    $table .= '<tr><td>...</td><td></td><td></td></tr><tr><td>' . ($currentRank === count($data) + 1 ? '...' : $currentRank) . '</td><td>' . $_SESSION['psyko'] . '</td><td>' . $score . '</td></tr>';
}
// Echo taulukko
echo $table;
?>
