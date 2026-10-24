// FICHIER 3 : L'AFFICHAGE
// Reçoit le résultat de trouverReunion() et met à jour la carte.

const el = {
  vide: document.getElementById("zone-vide"),
  reunion: document.getElementById("zone-reunion"),
  suite: document.getElementById("zone-suite"),
  listeSuite: document.getElementById("liste-suite"),
  badge: document.getElementById("badge"),
  titre: document.getElementById("titre"),
  heure: document.getElementById("heure"),
  compte: document.getElementById("compte"),
  bouton: document.getElementById("bouton"),
  aide: document.getElementById("aide")
};

let reunionAffichee = null; // mémorisée pour le bouton "Rejoindre"

function afficher(resultat) {
  // Cas 1 : aucune réunion
  if (resultat === null) {
    reunionAffichee = null;
    el.vide.hidden = false;
    el.reunion.hidden = true;
    el.suite.hidden = true;
    return;
  }

  // Cas 2 : une réunion à afficher
  const r = resultat.reunion;
  reunionAffichee = r;
  el.vide.hidden = true;
  el.reunion.hidden = false;
  el.titre.textContent = r.titre;
  el.heure.textContent = formaterHeure(r.debut) + " à " + formaterHeure(finDe(r));

  const msAvantDebut = r.debut - Date.now();
  let classe = ""; // "", "bientot" ou "encours" : choisit la couleur

  if (resultat.etat === "encours") {
    classe = "encours";
    el.badge.textContent = "En cours";
    el.compte.textContent = "Commencée depuis " + formaterDuree(-msAvantDebut);
    el.bouton.disabled = false;
    el.aide.textContent = "";
  } else {
    if (msAvantDebut <= MINUTES_BIENTOT * 60 * 1000) {
      classe = "bientot";
      el.badge.textContent = "Bientôt";
    } else {
      el.badge.textContent = "À venir";
    }
    el.compte.textContent = "Dans " + formaterDuree(msAvantDebut);
    const peutRejoindre = msAvantDebut <= MINUTES_AVANT_REJOINDRE * 60 * 1000;
    el.bouton.disabled = !peutRejoindre;
    el.aide.textContent = peutRejoindre ? "" : "Le bouton s'active " + MINUTES_AVANT_REJOINDRE + " minutes avant le début.";
  }
  el.badge.className = "badge " + classe;
  el.compte.className = "compte " + classe;

  // Les deux réunions suivantes
  el.listeSuite.innerHTML = "";
  resultat.suite.slice(0, 2).forEach(function (s) {
    const li = document.createElement("li");
    const nom = document.createElement("span");
    const h = document.createElement("span");
    nom.textContent = s.titre;
    h.textContent = formaterHeure(s.debut);
    li.appendChild(nom);
    li.appendChild(h);
    el.listeSuite.appendChild(li);
  });
  el.suite.hidden = resultat.suite.length === 0;
}
