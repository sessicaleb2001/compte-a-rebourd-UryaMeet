// Ouvre tests.html dans Chrome : chaque ligne doit être verte.
function verifier(nom, obtenu, attendu) {
  const li = document.createElement("li");
  const bon = obtenu === attendu;
  li.className = bon ? "ok" : "ko";
  li.textContent = (bon ? "✓ " : "✗ ") + nom + (bon ? "" : " (obtenu : " + obtenu + ", attendu : " + attendu + ")");
  document.getElementById("resultats").appendChild(li);
}

const T0 = new Date("2026-10-23T09:00:00Z").getTime(); // heure de référence fixe
function reunion(minutesDebut, duree) {
  return { titre: "x", debut: new Date(T0 + minutesDebut * 60000), dureeMinutes: duree };
}

verifier("14 min 32 s", formaterDuree(872000), "14 min 32 s");
verifier("1 h 05 min", formaterDuree(3900000), "1 h 05 min");
verifier("45 s", formaterDuree(45000), "45 s");
verifier("durée négative = 0 s", formaterDuree(-5000), "0 s");
verifier("aucune réunion", trouverReunion([], T0), null);
verifier("réunion future : à venir", trouverReunion([reunion(30, 30)], T0).etat, "avenir");
verifier("réunion commencée : en cours", trouverReunion([reunion(-10, 30)], T0).etat, "encours");
verifier("réunion terminée : rien", trouverReunion([reunion(-60, 30)], T0), null);
verifier("choisit la plus proche", trouverReunion([reunion(90, 30), reunion(20, 30)], T0).reunion.debut.getTime(), T0 + 20 * 60000);
