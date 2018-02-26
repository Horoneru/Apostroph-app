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
            text: 'Voici une oeuvre.<br>' +
            'Ce jeu te permet de naviguer à l\'intérieur de celle-ci !'
          },
          {
            element: 'up-arrow',
            text: 'Tu peux avancer dans l\'oeuvre en utilisant le bouton directionnel ici !'
          },
          {
            element: null,
            text: 'Essaie d\'avancer 4 fois, puis appuies sur le bouton bleu "exécuter"'
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
        artwork: 'Sol-mur (mur)',
        artist: artists.cane,
        goal: '3',
        start: '18',
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
        next: '2'
      },
      '2': {
        name: 'Niveau 2',
        artwork: 'Thira',
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
        next: '3'
      },
      '3': {
        name: 'niveau 3',
        artwork: 'Thira',
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
        next: '4'
      }
    }
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
        artist: { name: '' },
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
        usesQrcode: true,
        next: '4'
      }
    }
  }
};

export default games;
