import artists from './ArtistProvider';
const games = {
  programming: {
    name: 'Programmation',
    theme: 'accent-color',
    desc: 'La programmation, c’est quoi ?<br>' +
    'C’est simplement ce qui permet l’écriture de sites internets, de logiciels, comme le jeu auquel tu joues actuellement par exemple !<br>' +
    'Ici, on va se pencher sur le fonctionnement basique des algorithmes, rien de bien compliqué tu verras !<br>' +
    'C’est parti !',
    levels: {
      'tutorial': {
        name: 'Tutoriel',
        artwork: 'Sol-mur (sol)',
        artist: artists.cane,
        goal: '1',
        start: '17',
        tutorialSteps: [
          {
            element: 'playgroundStage',
            text: 'Ce jeu te permet de naviguer à l\'intérieur des oeuvres'
          },
          {
            element: 'up-arrow',
            text: 'Pour avancer, utilise le bouton directionnel'
          },
          {
            element: [document.getElementById('footer')],
            text: 'Cette barre te montrera l\'historique de tes actions.'
          },
          {
            element: null,
            text: 'Essaie d\'atteindre l\'objectif en bleu.<br>À toi de jouer !'
          }
        ],
        outro: 'Ce que tu as exécuté correspond à une procédure.',
        next: '1',
        expectedMoves: 4
      },
      '1': {
        name: 'Niveau 1',
        artwork: 'Sol-mur (mur)',
        artist: artists.cane,
        goal: '3',
        start: '18',
        tutorialSteps: [
          {
            element: 'rotate-clockwise',
            text: 'Ce bouton permet de faire une rotation dans le sens des aiguilles d\'une montre'
          },
          {
            element: 'rotate-counter-clockwise',
            text: 'Ce bouton permet de faire une rotation dans le sens inverse'
          }
        ],
        walls: {
          '1': {
            position: {
              down: true
            }
          },
          '2': {
            position: {
              down: true
            }
          },
          '5': {
            position: {
              left: true
            }
          },
          '6': {
            position: {
              right: true
            }
          },
          '9': {
            position: {
              left: true
            }
          },
          '10': {
            position: {
              right: true
            }
          },
          '13': {
            position: {
              left: true
            }
          },
          '14': {
            position: {
              right: true
            }
          },
          '17': {
            position: {
              up: true
            }
          },
          '18': {
            position: {
              up: true
            }
          }
        },
        next: '2',
        expectedMoves: 7
      },
      '2': {
        name: 'Niveau 2',
        artwork: 'Thira (partie 1)',
        artist: artists.marden,
        goal: '19',
        start: '16',
        walls: {
          '1': {
            position: {
              down: true
            }
          },
          '2': {
            position: {
              down: true
            }
          },
          '5': {
            position: {
              left: true
            }
          },
          '6': {
            position: {
              right: true
            }
          },
          '9': {
            position: {
              left: true
            }
          },
          '10': {
            position: {
              right: true
            }
          },
          '14': {
            position: {
              right: true
            }
          },
          '13': {
            position: {
              left: true
            }
          },
          '17': {
            position: {
              left: true
            }
          },
          '18': {
            position: {
              right: true
            }
          }
        },
        outro: 'Tu viens de voir les boucles qui t\'ont permis de répéter une instruction plusieurs fois.',
        tutorialSteps: [
          {
            element: 'loop',
            text: 'Utilise ce bouton pour répéter une instruction'
          },
          {
            element: 'loop',
            text: 'Il crée une boucle.<br>Cela permet de faire plusieurs actions en une seule fois !'
          }
        ],
        usesLoop: true,
        loopCount: 3,
        expectedMoves: 7,
        next: '3'
      },
      '3': {
        name: 'Niveau 3',
        artwork: 'Thira (partie 2)',
        artist: artists.marden,
        goal: '3',
        start: '7',
        walls: {
          '2': {
            position: {
              left: true
            }
          },
          '3': {
            position: {
              down: true
            }
          },
          '6': {
            position: {
              left: true,
              right: true
            }
          },
          '10': {
            position: {
              left: true,
              right: true
            }
          },
          '14': {
            position: {
              left: true,
              right: true
            }
          },
          '18': {
            position: {
              left: true
            }
          }
        },
        usesLoop: true,
        loopCount: 4,
        expectedMoves: 9
      }
    },
    congratulationText: 'Bien joué ! Tu as terminé tous les niveaux du mini-jeu programmation. <br>'+
    'A travers ces niveaux, tu as pu voir de façon simplifié la manière dont on exécute des instructions, '+
    'représentés ici par les boutons des niveaux. <br>'+
    'En plus de cela, tu as pu voir la technique de boucle permettant notamment de simplifier le code et de gagner du temps en répétant les mêmes instructions plusieurs fois.'
  },
  cryptography: {
    name: 'Cryptographie',
    theme: 'color-inverse',
    desc: 'La cryptographie, c’est quoi ?<br>' +
    'Rien de très compliqué ! Cela consiste simplement au remplacement de caractères, de formes, par d’autres.<br>' +
    'Grâce à notre jeu, tu vas pouvoir apprendre rapidement le fonctionnement basique du chiffrement ! <br>' +
    '<em>Amuse toi !</em>',
    levels: {
      'tutorial': {
        name: 'Tutoriel',
        permutations: {
          direction: 'right',
          count: 2
        },
        artwork: '- Tutoriel',
        artist: artists.lemonnier,
        tutorialSteps: [
          {
            element: 'playground-stage',
            text: 'Voici un exemple d\'une oeuvre.<br>' +
            'Souviens toi de sa disposition car elle sera chiffrée à la prochaine étape !'
          },
          {
            element: 'playground-stage',
            text: 'L\'exemple d’œuvre a été chiffrée. Voyons voir comment on peut la restaurer !'
          },
          {
            element: 'toolbar',
            text: 'Tu peux décaler chacun des blocs en appuyant sur l\'un des deux boutons directionnels ici !'
          },
          {
            element: 'left-arrow',
            text: 'Ce bouton déplace les blocs à gauche.<br>' +
            'Cela <u>descend</u> le premier élément'
          },
          {
            element: 'right-arrow',
            text: 'Ce bouton déplace les blocs à droite.<br>' +
            'Cela <u>monte</u> le dernier élément'
          },
          {
            element: null,
            text: 'À toi de jouer !'
          }
        ],
        next: '1'
      },
      '1': {
        name: 'Niveau 1',
        permutations: {
          direction: 'left',
          count: 3
        },
        artwork: 'Construction du volume des couleurs',
        artist: artists.lemonnier,
        outro:'Tu as maintenant une clé de chiffrement, représentée par le QR code, qui va te permettre de déchiffrer l\'oeuvre',
        next: '2'
      },
      '2': {
        name: 'Niveau 2',
        permutations: {
          direction: 'left',
          count: 6
        },
        artwork: 'Jeu chromatique 1',
        artist: artists.lemonnier,
        usesQrcode: true,
        next: '3'
      },
      '3': {
        name: 'Niveau 3',
        permutations: {
          direction: 'left',
          count: 9
        },
        artwork: 'l\'Harmonisateur n°3',
        artist: artists.lemonnier,
        usesQrcode: true
      }
    },
    congratulationText: 'Bien joué ! Tu as terminé tous les niveaux du mini-jeu cryptographie. <br>'+
    'Ainsi, tu as vu les bases du chiffrement et notamment que les messages chiffrées (ici les oeuvres) '+
    'peuvent être déchiffrées gràce à une clé de chiffrement (représentée ici par le QR code) qui indique '+
    'de manière plus ou moins simple le décalage des caractères ou des formes. <br>'+
    'Ces niveaux se rapprochent particulièrement du chiffrement de César que nous avons voulu vous introduire '+
    'de part sa simplicité et son histoire.'
  }
};

export default games;
