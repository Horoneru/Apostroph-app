<template>
  <div>
    <router-link style :to="{ name: 'levelselect', params: { gameid: 'cryptography' }}" class="el-icon-back back-button top-left-element">
    </router-link>
    <game-view :tools="tools" :artwork="artwork" :artist="artist" :tutorialSteps="tutorialSteps">
      <div slot="playground">
        <isotope :list="tab" :options="options" ref="isotope" class="p-5" style="width: 400px; height: 500px;" v-images-loaded:on.progress="redrawLayout">
          <span v-for="el in tab" class="original-piece" :key="el.image"><img :src="el.image"></span>
        </isotope>
      </div>
    </game-view>
  </div>
</template>

<script>
import GameView from '../GameView';
import games from '../../../service/GameProvider';
import VueIntro from 'vue-introjs';
import imagesLoaded from 'vue-images-loaded';
import Isotope from 'vueisotope';
import debounce from 'lodash-es/debounce';
import utils from '../../../utils/cryptography';
import validators from '../../../service/ValidatorProvider';
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
  directives: { imagesLoaded },
  components: { GameView, Isotope, VueIntro },
  data () {
    return {
      setupInit: false,
      tutorialSteps: [],
      tools: [
        {
          icon: '../../../../static/assets/left-arrow.png',
          action: debounce(this.popBack, 500, { maxWait: 700, leading: true })
        },
        {
          action: debounce(this.pushBack, 500, { maxWait: 700, leading: true }),
          icon: '../../../../static/assets/right-arrow.png'
        }
        // {
        //   action: debounce(this.pushBack, 500, { maxWait: 700, leading: true }),
        //   icon: '../../../../static/assets/apn-tool.png'
        // }
      ],
      levelData: games.cryptography.levels[this.levelid],
      artist: games.cryptography.levels[this.levelid].artist,
      artwork: games.cryptography.levels[this.levelid].artwork,
      tab: [],
      options: {
        getSortData: {
          id: 'el'
        },
        sortBy: 'el'
      }
    };
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
      // Isotope (le module pour les anims) ne voit pas la modif sinon.
      this.tab.splice(0, 20);
      setTimeout(() => {
        this.tab = newArray;
        this.checkArray();
      }, 0);
    },
    checkArray: function() {
      if(this.tab.every((value, index) => value.id === index)) {
        if(this.tutorialMode) {
          this.$store.commit('tutorialDone', 'cryptography');
        }
        setTimeout(() => {
          this.$router.push({ name: 'levelcomplete', params: { gameid: 'cryptography', level: this.levelid } });
        }, 500);
      }
    },
    redrawLayout: function() {
      this.$refs.isotope.layout('masonry');
    },
    tutorialStepChange: function(newStep) {
      if(newStep === 1 && this.levelid === 'tutorial') {
        this.arrayInit();
      }
    },
    tutorialFinished: function() {
      if(!this.setupInit) {
        this.arrayInit();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.original-piece {
  display: block;
  float: left;
  width: 100px;
  height: 100px;
}
</style>
