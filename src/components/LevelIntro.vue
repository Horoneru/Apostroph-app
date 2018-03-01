<template>
  <double-pane-layout :leftImage="'../../static/assets/logo-' + theme + '.png'" :title="title" imageAlign="middle" :contentClasses="this.themeClasses" @click.native="goToLevel" v-ripple>
    <div slot="rightContent">
        <h2 class="half-gutter"> {{ this.level.name }}</h2>
        <p v-html="intro"></p>
        <h2 :class="[{ 'o-1': touchToContinue, 'o-0': !touchToContinue}, 'fade-enter-active', 'animated pulse infinite']">
          Touche pour continuer
        </h2>
        <img id="picto" :src="'../../static/assets/picto-' + gameid + '.png'">
    </div>
  </double-pane-layout>
</template>

<script>
import games from '../service/GameProvider';
import DoublePaneLayout from './DoublePaneLayout';
import validators from '../service/ValidatorProvider';
import Ripple from 'fi-ripple';
import ressources from '../data/Ressources';
export default {
  name: 'LevelIntro',
  components: { DoublePaneLayout },
  directives: { Ripple },
  props: {
    gameid: {
      type: String,
      required: true,
      validator: validators.game
    },
    levelid: {
      type: String,
      required: true
    }
  },
  created: function() {
    if(this.gameid in games) {
      this.title = games[this.gameid].name;
      this.theme = games[this.gameid].theme;
      this.level = games[this.gameid].levels[this.levelid];
    }
    else {
      console.log('whoopsie there. Nope !');
      this.$router.replace({ name: 'menu' });
    }

    this.preloadPictures();

    if(this.level.intro) {
      this.intro = this.level.intro;
      setTimeout(() => {
        this.touchToContinue = true;
      }, 3000);
    }
    else {
      setTimeout(() => {
        this.goToLevel();
      }, 1500);
    }
  },
  data () {
    return {
      title: null,
      theme: null,
      level: null,
      intro: '',
      touchToContinue: false
    };
  },
  computed: {
    themeClasses: function() {
      return 'h-100 gradient-' + this.theme;
    }
  },
  methods: {
    goToLevel: function() {
      this.$router.replace({ name: this.gameid, params: { levelid: this.levelid } });
    },
    preloadPictures: function() {
      ressources[this.gameid].forEach(element => {
        let res = new Image();
        res.src = element;
      });

      for(let i = 0; i < 20; i++) {
        let res = new Image();
        res.src = '/../static/assets/' + this.gameid + '/' + this.levelid + '/img-' + i + '.jpg';
      }
    }
  }
};
</script>

<style scoped>
#picto {
  margin-top: 1%;
}
</style>
