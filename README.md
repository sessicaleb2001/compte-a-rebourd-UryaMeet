# Compte à rebours de la prochaine réunion (UryMeet)

Proposition de fonctionnalité pour la carte « Prochaines Réunions » du tableau de bord d'URYA.
Ce projet est autonome : il n'utilise pas le code source d'URYA.

## Lancer le projet
Double-clique sur `index.html` (il s'ouvre dans le navigateur). Utilise le panneau de test à droite.
Pour les tests des calculs, ouvre `tests/tests.html` : toutes les lignes doivent être vertes.

## Structure
- `index.html` : la page et la carte
- `css/style.css` : le style (couleurs en haut du fichier)
- `js/donnees.js` : les réunions (données d'exemple)
- `js/calcul.js` : les calculs (temps restant, réunion à afficher)
- `js/affichage.js` : mise à jour de la carte
- `js/main.js` : démarrage, minuteur, boutons
- `tests/` : vérification des calculs

## Étapes du projet (coche au fur et à mesure)
- [ ] 1. Ouvrir le projet, tester les 5 boutons du panneau de test
- [ ] 2. Ouvrir `tests/tests.html` : tout est vert
- [ ] 3. Modifier un seuil dans `js/calcul.js` (par exemple 15 → 10 minutes) et constater le changement
- [ ] 4. Ajouter un état « Terminée récemment » (affiché 5 minutes après la fin)
- [ ] 5. Ajouter l'heure dans le titre de l'onglet (« Réunion dans 5 min »)
- [ ] 6. Remplacer `chargerReunions()` par un vrai appel `fetch` vers un fichier JSON
- [ ] 7. Écrire de nouveaux tests dans `tests/tests.js`
- [ ] 8. Présenter à l'équipe

## Git (première fois)
```
git init
git add .
git commit -m "Premier commit : carte compte à rebours"
```
Puis crée un dépôt vide sur GitHub, copie son lien et lance :
```
git remote add origin LIEN_DU_DEPOT
git branch -M main
git push -u origin main
```
(Remplace LIEN_DU_DEPOT par le vrai lien copié depuis GitHub.)
