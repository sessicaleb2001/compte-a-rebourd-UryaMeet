// FICHIER 1 : LES DONNÉES
// Ici on simule le serveur. Dans URYA, les réunions viendront de l'agenda.

let reunions = [];

// Une réunion = un titre, une date de début, une durée en minutes et un lien.
function ajouterReunion(titre, minutesAvantDebut, dureeMinutes, lien) {
  const debut = new Date(Date.now() + minutesAvantDebut * 60 * 1000);
  reunions.push({ titre: titre, debut: debut, dureeMinutes: dureeMinutes, lien: lien || "#" });
}

// Réunions d'exemple
ajouterReunion("Réunion d'équipe URYA", 12, 30);
ajouterReunion("Point sprint UryMeet", 90, 45);
ajouterReunion("Démo client", 240, 60);

// Cette fonction imite un appel au serveur (elle renvoie une "promesse").
// PLUS TARD : remplace son contenu par un vrai appel, par exemple :
//   const reponse = await fetch("/api/reunions/prochaines");
//   return await reponse.json();   (puis transformer les dates en objets Date)
async function chargerReunions() {
  return reunions;
}
