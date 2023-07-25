<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $br_ucenika = $_POST["br_ucenika"];
    $ime_ucenika = $_POST["ime_ucenika"];
    $ocj_programiranje = $_POST["ocj_programiranje"];
    $ocj_matematika = $_POST["ocj_matematika"];
    $prosjek = ($ocj_programiranje + $ocj_matematika) / 2;
    
    $datoteka = fopen("ocj.txt", "a");
    fwrite($datoteka, "Broj ucenika u dnevniku: $br_ucenika\n");
    fwrite($datoteka, "Ime i prezime ucenika: $ime_ucenika\n");
    fwrite($datoteka, "Ocjena iz programiranja: $ocj_programiranje\n");
    fwrite($datoteka, "Ocjena iz matematike: $ocj_matematika\n");
    fwrite($datoteka, "Prosjek ocjena: $prosjek\n");
    fwrite($datoteka, "---------------------------------\n");
    fclose($datoteka);
}
header("Location: index.html");
