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
            element: 'playground-stage',
            text: 'Ce jeu te permet de naviguer à l\'intérieur des oeuvres'
          },
          {
            element: 'up-arrow',
            text: 'Pour avancer, utilise le bouton directionnel'
          },
          {
            element: 'footer',
            text: 'Cette barre te montrera l\'historique de tes actions.'
          },
          {
            element: null,
            text: 'Essaie d\'atteindre l\'objectif en bleu.<br>À toi de jouer !'
          }
        ],
        outro: 'Ce que tu as exécuté correspond à une série de procédures en programmation.<br>' +
               'Par exemple: `move` correspond à une instruction de procédure `move`, permettant de bouger.<br>' +
               'Essaie toujours d\'atteindre l\'objectif avec le moins de procédures !',
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
        outro: 'Tu viens de voir les boucles qui t\'ont permis de répéter une instruction plusieurs fois.<br>' +
        'Utilisées à bon escient, elles te permettront de donner une solution plus optimale.<br>' +
        'N\'hésite pas à les utiliser !',
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
    congratulationsText: 'Bien joué ! Tu as terminé tous les niveaux du mini-jeu <strong>programmation</strong>.<br>' +
    'À travers ces niveaux, tu as pu voir de façon simplifiée la manière dont on exécute des <br>' +
    '<strong>instructions</strong>, représentés ici par les boutons des niveaux.<br>' +
    'En plus de cela, tu as pu voir la <strong>technique de boucle</strong> permettant notamment de <strong>simplifier</strong> le code <br>' +
    'et de <strong>gagner du temps</strong> en répétant les mêmes instructions plusieurs fois.'
  },
  cryptography: {
    name: 'Cryptographie',
    theme: 'color-inverse',
    desc: 'La cryptographie, c’est quoi ?<br>' +
    'Rien de très compliqué ! Cela consiste simplement au remplacement de caractères, de formes, par d’autres.<br>' +
    'Grâce à notre jeu, tu vas pouvoir apprendre rapidement le fonctionnement basique du chiffrement ! <br>' +
    'C’est parti !',
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
        tutorialSteps: [
          {
            element: 'apn-tool',
            text: 'Ce bouton te permettra de connaître la clé de chiffrement en scannant le QR code associé à l\'oeuvre'
          },
          {
            element: null,
            text: 'Si tu es bloqué, Utilise le QR code pour obtenir de l\'aide !'
          }
        ],
        usesQrcode: true,
        intro: 'À travers ce niveau, tu vas pouvoir voir précisemment le fonctionnement du chiffrement. <br> ' +
        'En effet, tu vas devoir déchiffrer l\'oeuvre grâce au QR code que nous fournissons qui représente la clé de chiffrement. <br> ' +
        'Celle-ci permet de voir le décalage qui a été effectué lors du chiffrement de l\'oeuvre ',
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
    congratulationsText: 'Bien joué ! Tu as terminé tous les niveaux du mini-jeu <strong>cryptographie</strong>. <br>' +
    'Ainsi, tu as vu les bases du <strong>chiffrement</strong> et notamment que les messages chiffrés (ici les oeuvres) <br>' +
    'peuvent être déchiffrés gràce à une <strong>clé de chiffrement</strong> (représentée ici par le QR code) <br> ' +
    'qui indique le <strong>décalage</strong> des caractères ou des formes.<br>' +
    'Ces niveaux se rapprochent particulièrement du <strong>chiffrement de César</strong> que nous <br>' +
    'avons voulu vous introduire de par sa simplicité et son histoire.'
  }
};

export default games;
