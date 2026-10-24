// FICHIER 2 : LES CALCULS
// Aucune manipulation de la page ici : ces fonctions sont faciles à tester (voir tests/).

const MINUTES_BIENTOT = 15;          // moins de 15 min avant le début : état "Bientôt"
const MINUTES_AVANT_REJOINDRE = 5;   // le bouton s'active 5 min avant le début
const MINUTES_ENTRE_RELECTURES = 1;  // on relit les réunions chaque minute

// Transforme des millisecondes en texte : "14 min 32 s", "1 h 05 min"...
function formaterDuree(millisecondes) {
  const total = Math.max(0, Math.floor(millisecondes / 1000));
  const heures = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secondes = total % 60;
  if (heures > 0) return heures + " h " + String(minutes).padStart(2, "0") + " min";
  if (minutes > 0) return minutes + " min " + String(secondes).padStart(2, "0") + " s";
  return secondes + " s";
}

function formaterHeure(date) {
  return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function finDe(reunion) {
  return new Date(reunion.debut.getTime() + reunion.dureeMinutes * 60 * 1000);
}

// Cherche la réunion à afficher : en cours, sinon la prochaine, sinon null.
// "maintenant" est un paramètre (et pas Date.now() ici) pour pouvoir tester avec n'importe quelle heure.
function trouverReunion(liste, maintenant) {
  const triees = [...liste].sort((a, b) => a.debut - b.debut);

  const enCours = triees.find(r => maintenant >= r.debut && maintenant < finDe(r));
  if (enCours) {
    return { reunion: enCours, etat: "encours", suite: triees.filter(r => r !== enCours && r.debut > maintenant) };
  }
  const avenir = triees.filter(r => r.debut > maintenant);
  if (avenir.length > 0) {
    return { reunion: avenir[0], etat: "avenir", suite: avenir.slice(1) };
  }
  return null;
}
