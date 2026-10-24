// FICHIER 4 : LE DÉMARRAGE
// Relie les trois autres fichiers et lance le minuteur.

let liste = []; // les réunions actuellement connues

function mettreAJour() {                      // chaque seconde : recalcul et affichage
  afficher(trouverReunion(liste, Date.now()));
}

async function rafraichir() {                 // chaque minute : relire les réunions
  liste = await chargerReunions();
  mettreAJour();
}

el.bouton.addEventListener("click", function () {
  if (reunionAffichee) {
    // Dans URYA : window.location.href = reunionAffichee.lien;
    alert("Ici, URYA ouvrirait la salle de : " + reunionAffichee.titre);
  }
});

// Panneau de test
function testAjout(id, titre, minutes) {
  document.getElementById(id).addEventListener("click", function () {
    ajouterReunion(titre, minutes, 30);
    rafraichir();
  });
}
testAjout("t-1", "Test : dans 1 min", 1);
testAjout("t-10", "Test : dans 10 min", 10);
testAjout("t-120", "Test : dans 2 h", 120);
testAjout("t-0", "Test : en cours", 0);
document.getElementById("t-reset").addEventListener("click", function () { reunions = []; rafraichir(); });

rafraichir();
setInterval(mettreAJour, 1000);
setInterval(rafraichir, MINUTES_ENTRE_RELECTURES * 60 * 1000);
