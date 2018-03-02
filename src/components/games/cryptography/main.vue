<template>
  <div>
    <game-view :tools="tools" :artwork="artwork" :artist="artist" :tutorialSteps="tutorialSteps">
      <div slot="playground">
        <transition-group class="m-auto" id="pieces-container" tag="div" name="pieces-list">
          <span v-for="el in tab" class="original-piece" :key="el.image"><img :src="el.image"></span>
        </transition-group>
      </div>
      <div slot="footer-left" v-if="levelData.usesQrcode && setupInit">
        <el-col :span="5">Clé de chiffrement : {{ cipherKey }}</el-col>
        <p v-html="helpText"></p>
      </div>
      <el-row type="flex" justify="space-around" slot="footer-right">
        <el-button v-ripple type="primary" @click="checkSuccess" :disabled="!setupInit" id="check-button">Vérifier</el-button>
      </el-row>
    </game-view>
    <el-dialog title="Scanneur de QR code" :visible.sync="qrCodeDialog">
      <qrcode-reader v-loading="qrcodeReaderLoading"  @init="onInitQrCodeReader" @decode="onDecodeQrCode">
      </qrcode-reader>
    </el-dialog>
  </div>
</template>

<script>
import GameView from '../GameView';
import games from '../../../service/GameProvider';
import VueIntro from 'vue-introjs';
import utils from '../../../utils/cryptography';
import validators from '../../../service/ValidatorProvider';
import { introJs } from 'intro.js';
import 'intro.js/introjs.css';
import { QrcodeReader } from 'vue-qrcode-reader';
export default {
  name: 'Cryptography',
  props: {
    levelid: {
      type: String,
      required: true,
      validator: function(value) {
        return validators.level('cryptography', value);
      }
    }
  },
  components: { GameView, VueIntro, QrcodeReader },
  data () {
    return {
      setupInit: false,
      tutorialSteps: [],
      tools: [
        {
          icon: '../../../../static/assets/left-arrow.png',
          action: this.popBack,
          disabled: true
        },
        {
          icon: '../../../../static/assets/right-arrow.png',
          action: this.pushBack,
          disabled: true
        }
      ],
      levelData: games.cryptography.levels[this.levelid],
      artist: games.cryptography.levels[this.levelid].artist,
      artwork: games.cryptography.levels[this.levelid].artwork,
      tab: [],
      qrCodeDialog: false,
      qrcodeReaderLoading: true,
      cipherKey: '?',
      distanceFromGoal: games.cryptography.levels[this.levelid].permutations.count,
      tries: 0,
      moves: 0
    };
  },
  computed: {
    success: function() {
      return this.tab.every((value, index) => value.id === index);
    },
    helpText: function() {
      if(this.cipherKey === '?') {
        return 'Utilise le bouton photo pour scanner le QR code et connaître la clé de chiffrement';
      }
      else {
        let directionToGo = this.levelData.permutations.direction;
        let distanceToGo = this.distanceFromGoal;

        if(distanceToGo < 0) {
          directionToGo = 'right';
          distanceToGo = -distanceToGo;
        }
        if(distanceToGo >= 20) {
          distanceToGo -= 20;
          this.distanceFromGoal = Math.abs(this.distanceFromGoal);
          this.distanceFromGoal -= 20;
        }
        if((distanceToGo > 10)) {
          // We go the opposite direction, because it's more efficient
          directionToGo = directionToGo === 'right' ? 'left' : 'right';
          console.log(distanceToGo);
          // The distance is lessened from the switch of direction
          // i.e. : distanceFromGoal = 14 with directionToGo left. Then the distanceToGo is 6 when going right.
          distanceToGo = Math.abs((distanceToGo - 20));
        }

        // Localized string before displaying it
        directionToGo = directionToGo === 'right' ? 'droite' : 'gauche';
        return distanceToGo === 0
        ? '<strong>Tu as résolu ce niveau !</strong> Appuie sur le bouton Vérifier pour continuer.'
        : `Avec cette clé, va <strong>${distanceToGo} fois à ${directionToGo}</strong> et tu pourras déchiffrer l'œuvre.`;
      }
    }
  },
  watch: {
    success: function(val) {
      if(this.levelid === 'tutorial' && val) {
        let introjs = introJs();
        let options =
          {
            doneLabel: 'OK'
          };
        options.steps = [
          {
            element: document.getElementById('check-button'),
            intro: 'Bravo ! Tu as réussi à reconstituer l\'oeuvre !<br>Appuie sur ce bouton pour vérifier et terminer le niveau'
          }
        ];
        introjs.setOptions(options);
        introjs.start();
      }
    }
  },
  created: function() {
    for(let i = 0; i < 20; i++) {
      this.tab.push(
        {
          id: i,
          image: '../../../../static/assets/cryptography/' + this.levelid + '/img-' + i + '.jpg'
        });
    }

    const tutorialSteps = this.levelData.tutorialSteps;

    if(tutorialSteps) {
      this.tutorialSteps = this.tutorialSteps.concat(tutorialSteps);
    }
    else {
      // Delay the init so the user can see the original piece beforehand
      setTimeout(() => {
        this.arrayInit();
      }, 4000);
    }

    if(this.levelData.usesQrcode) {
      this.tools.push({
        action: () => {
          this.qrCodeDialog = true;
        },
        icon: '../../../../static/assets/apn-tool.png'
      });
    }

    if(this.levelData.mixins) {
      if(this.levelData.mixins.created) {
        this.levelData.mixins.created(this);
      }
    }
  },
  mounted: function() {
    this.$on('tutorialStepChange', this.tutorialStepChange);
    this.$on('tutorialFinished', this.tutorialFinished);
  },
  methods: {
    pushBack: function() {
      if(this.setupInit) {
        let newArray = utils.pushBack(this.tab);
        this.distanceFromGoal += this.levelData.permutations.direction === 'right' ? -1 : 1;
        this.arrangeArray(newArray);
      }
    },
    popBack: function() {
      if(this.setupInit) {
        let newArray = utils.popBack(this.tab);
        this.distanceFromGoal += this.levelData.permutations.direction === 'left' ? -1 : 1;
        this.arrangeArray(newArray);
      }
    },
    arrayInit: function() {
      if(!this.setupInit) {
        const callback = this.levelData.permutations.direction === 'right'
          ? utils.popBack
          : utils.pushBack;
        let newArray = this.tab;
        for(let i = 0; i < this.levelData.permutations.count; i++) {
          newArray = callback(newArray);
        }
        this.arrangeArray(newArray);
        this.setupInit = true;

        // WORKAROUND. I can't for the life of me get a computed toolStyle property
        // Based on the value of setupInit
        this.tools[0].disabled = false;
        this.tools[1].disabled = false;
      }
    },
    arrangeArray: function(newArray) {
      this.tab = newArray;
      if(this.setupInit) {
        this.moves++;
      }
    },
    checkSuccess: function() {
      if(this.success) {
        this.levelComplete();
      }
      else {
        this.$message({
          type: 'error',
          message: 'Il semble que tu n\'as pas reconstitué correctement l\'oeuvre'
        });
        this.tries++;
      }
    },
    levelComplete: function() {
      this.$store.commit({
        type: 'updateLevelScore',
        gameid: 'cryptography',
        levelid: this.levelid,
        score: this.levelData.permutations.count - (this.moves + this.tries)
      });
      setTimeout(() => {
        this.$router.push({ name: 'levelcomplete', params: { gameid: 'cryptography', level: this.levelid } });
      }, 250);
    },
    tutorialStepChange: function(newStep) {
      if(newStep === 1 && this.levelid === 'tutorial') {
        this.arrayInit();
      }
    },
    tutorialFinished: function() {
      this.arrayInit();
    },
    onDecodeQrCode: function(content) {
      // Keep it
      console.log(content);
      content = JSON.parse(content);
      if(content.levelid === this.levelid) {
        // Welllll... We had it all along but now the user knows, too
        this.cipherKey = this.levelData.permutations.count;
        this.qrCodeDialog = false;
        this.$message({
          type: 'success',
          message: 'Le QR code a bien été scanné !'
        });
      }
      else {
        this.$message({
          type: 'warning',
          message: 'Ce QR code n\'appartient pas à ce niveau'
        });
      }
    },

    async onInitQrCodeReader(promise) {
      try {
        await promise;
        // successfully initialized
      }
      catch (error) {
        if (error.name === 'NotAllowedError') {
          // user denied camera access permisson
        }
        else if (error.name === 'NotFoundError') {
          // no suitable camera device installed
        }
        else if (error.name === 'NotSupportedError') {
          // page is not served over HTTPS (or localhost)
        }
        else if (error.name === 'NotReadableError') {
          // maybe camera is already in use
        }
        else if (error.name === 'OverconstrainedError') {
          // passed constraints don't match any camera. Did you requested the front camera although there is none?
        }
        else {
          // browser is probably lacking features (WebRTC, Canvas)
        }

        this.$message({
          type: 'error',
          message: 'Erreur : ' + error.name
        });
      }
      finally {
        this.qrcodeReaderLoading = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#pieces-container {
  height: 500px;
  width: 400px;
}
.original-piece {
  display: block;
  float: left;
  width: 100px;
  height: 100px;
}

.el-button--primary {
  background-color: var(--primary-color-inverse);
  border-color: var(--primary-color-inverse);
}

.el-button--primary.is-disabled {
  background-color: rgba(191, 127, 235, 0.2);
  border-color: rgba(191, 127, 235, 0.2);
}

.el-button--primary:hover {
  background-color: rgba(191, 127, 235, 0.5);
}

.pieces-list-move {
  transition: transform .25s ease-out;
}
</style>
