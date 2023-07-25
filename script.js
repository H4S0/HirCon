
function prikaziSveInformacije() {
    const pregledDiv = document.getElementById('pregled');
    fetch('ocj.txt')
        .then(response => response.text())
        .then(data => {
            const podaci = data.split('\n');
            const podaciHTML = podaci.map(podatak => `<p>${podatak}</p>`).join('');
            pregledDiv.innerHTML = podaciHTML;
        });
}