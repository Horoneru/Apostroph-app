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
        artwork: 'Sol-mur',
        artist: artists.cane,
        goal: '1',
        start: '17',
        mixins: {
          created: function(vm) {
            vm.tutorialMode = true;
          }
        }
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
        mixins: {
          created: (vm) => {
            vm.tutorialMode = true;
          }
        },
        next: '1'
      },
      '1': {
        name: 'Niveau 1',
        permutations: {
          direction: 'left',
          count: 1
        },
        artwork: 'Construction du volume des couleurs',
        artist: artists.lemonnier,
        mixins: {
          created: function() {
          }
        }
      }
    }
  }
};

export default games;
