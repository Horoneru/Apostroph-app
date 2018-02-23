<template>
  <div>
    <router-link style :to="{ name: 'levelselect', params: { gameid: 'cryptography' }}" class="el-icon-back back-button top-left-element">
    </router-link>
    <game-view :tools="tools" :artwork="artwork" :artist="artist" :tutorialSteps="tutorialSteps">
      <div slot="playground">
        <transition-group class="m-auto" id="pieces-container" tag="div" name="pieces-list">
          <span v-for="el in tab" class="original-piece" :key="el.image"><img :src="el.image"></span>
        </transition-group>
      </div>
      <div slot="footer-left" v-if="levelData.usesQrcode">
      </div>
      <el-row type="flex" justify="space-around" slot="footer-right">
        <el-button v-ripple type="primary" @click="checkSuccess" :disabled="!setupInit" id="check-button">Vérifier</el-button>
      </el-row>
    </game-view>
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
  components: { GameView, VueIntro },
  data () {
    return {
      setupInit: false,
      tutorialSteps: [],
      tools: [
        {
          icon: '../../../../static/assets/left-arrow.png',
          action: this.popBack
        },
        {
          icon: '../../../../static/assets/right-arrow.png',
          action: this.pushBack
        }
        // {
        //   action: debounce(this.pushBack, 500, { maxWait: 700, leading: true }),
        //   icon: '../../../../static/assets/apn-tool.png'
        // }
      ],
      levelData: games.cryptography.levels[this.levelid],
      artist: games.cryptography.levels[this.levelid].artist,
      artwork: games.cryptography.levels[this.levelid].artwork,
      tab: []
    };
  },
  computed: {
    success: function() {
      return this.tab.every((value, index) => value.id === index);
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
            intro: 'Bravo ! Tu as réussi à reconstituer l\'oeuvre !<br>Appuie sur ce bouton pour vérifier et terminer le niveau '
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
      }, 2000);
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
        this.arrangeArray(newArray);
      }
    },
    popBack: function() {
      if(this.setupInit) {
        let newArray = utils.popBack(this.tab);
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
      }
    },
    arrangeArray: function(newArray) {
      this.tab = newArray;
    },
    checkSuccess: function() {
      if(this.success) {
        this.levelComplete();
      }
      else {
        this.$message({
          type: 'error',
          message: 'Vous n\'avez pas reconstitué correctement l\'oeuvre'
        })
      }
    },
    levelComplete: function() {
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
.pieces-list-move {
  transition: transform .25s ease-out;
}
</style>
