# Scénario utilisateur

## Accueil
L'utilisateur arrive sur l'accueil.

- Si il clique sur le bouton primaire, il passe à [la scène d'introduction](#Introduction). 
- Si il clique sur le bouton `Informations`, il voit un [modal d'informations](#Informations)
- (proposition) Si il clique sur un bouton `Choisir nom`, il sera capable de retrouver son progrès s'il a déjà joué (et skip les tutoriels déjà vus), basé sur son nom. Cet élément est décrit dans [Choix nom](Choix-nom).

## Informations

Après une transition d'arrivée, un modal est affiché (responsive) avec les noms des auteurs et des détails ainsi que des remerciements, notamment dirigé vers l'utilisateur, Beaubourg, etc. On pourra aussi mettre ici les licences et crédits d'oeuvres ou éléments extérieurs.

## Choix nom

Une popup survient, ou alors un changement de scène. Exemple : [Exemple d'effet](http://puu.sh/yoycQ/3d90828fec.gif)
De là, on peut donner son nom.

- Si le nom est déjà pris _localement_, l'utilisateur peut le voir au fur et à mesure qu'il tape. Si le nom n'a pas de mot de passe, alors il peut se login sur celui-ci et récupérer sa progression
- Si le nom n'est pas pris, il peut confirmer, et on lui propose de s'enregistrer en bloquant le nom par mot de passe. Cela ne doit pas être bloquant.

Une fois cela fait, selon là où il était, il revient à l'écran précédent.

## Introduction

Après une transition (je pense notamment à un fond assombri), du texte apparaît en fade-in, pour expliquer rapidement le but de l'application (sa valeur pédagogique) et ce qui sera demandé de l'utilisateur.

Un truc du genre : 
> Bienvenue sur {NOM_APP} ! <br/> Cette application propose des jeux vous permettant de découvrir la _cryptographie_, _la programmation informatique_ et le _design Web_ ! Ces jeux sont accessibles à tous, mais certains vous donneront du fil à retordre ! 

Après un cours laps de temps (le temps que l'utilisateur réalise que le texte est apparu et qu'il a eu le temps de le lire, soit 2 secondes par exemple), un bouton primaire apparaît : 
> C'est parti !

Deux scénarios ensuite : 
- Si l'utilisateur clique sur ce bouton _sans avoir donné de nom précédemment_, on lui propose de donner son nom. On lui explique que cela permet de garder sa progression. Il va donc au [choix nom](#Choix-nom).
- Si l'utilisateur clique sur ce bouton _en ayant donné son nom précédemment_, le bouton [menu](#Menu) apparaît (hamburger, sur le haut droit/gauche) et s'ouvre vers la droite/gauche afin de dévoiler les différents modules de jeu. 

## Menu

L'idée de design que j'avais était d'utiliser une row flexible à 3 éléments max, avec comme structure : 
- Conteneur de genre 300 px  
    1. Icône centrée rappelant le thème du module
    2. Titre du module en toute lettre (full uppercase ou normal case)
    3. Incitation/description **succinte** à jouer à ce module (moins de 72 caractères)
Chaque conteneur de module aurait une identité de couleur différente, ou de petites nuances, de manières à les repérer facilement à l'oeil.

- Pour le module chiffrement, si l'utilisateur clique sur le conteneur, il va au [module cryptographie](#Module-cryptographie)
- Pour le module programmation/algorithmie, il va au [module programmation](#Module-programmation)
- Pour le module design, il va au [module design](#Module-design)

Dans tous les cas, si l'utilisateur n'a pas encore essayé le module, on lui propose le tutoriel (non bloquant).