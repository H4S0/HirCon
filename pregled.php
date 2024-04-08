
<!DOCTYPE html>
<html>
<head>
    <title>Pregled unesenih ocjena</title>
</head>
<body>
    <h1>Pregled unesenih ocjena</h1>
    <?php
    $datoteka = file("ocj.txt"); // Čitanje svih redova iz datoteke
    foreach ($datoteka as $red) {
        echo $red . "<br>";
    }dsada
sdadasda
    ?>
</body>
</html>
