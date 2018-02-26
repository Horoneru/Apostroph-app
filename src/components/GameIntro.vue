<template>
  <double-pane-layout :leftImage="'../../static/assets/logo-' + theme + '.png'" :title="title" imageAlign="middle" :contentClasses="themeClasses" @click.native="goToLevelSelect" v-ripple>
    <div slot="rightContent">
      <p v-html="desc"></p>
      <h2 :class="[{ 'o-1': visibility.touchToContinue, 'o-0': !visibility.touchToContinue}, 'fade-enter-active', 'animated pulse infinite']">
        Touche pour continuer
      </h2>
        <img id="picto" :src="'../../static/assets/picto-' + gameid + '.png'">
    </div>
  </double-pane-layout>
</template>

<script>
import games from '../service/GameProvider.js';
import DoublePaneLayout from './DoublePaneLayout';
import Ripple from 'fi-ripple';
export default {
  name: 'GameIntro',
  components: { DoublePaneLayout },
  directives: { Ripple },
  props: {
    gameid: {
      type: String,
      required: true,
      validator: function(value) {
        return value in games;
      }
    }
  },
  created: function() {
    if(this.gameid in games) {
      this.title = games[this.gameid].name;
      this.desc = games[this.gameid].desc;
      this.theme = games[this.gameid].theme;
    }
    else {
      console.log('whoopsie there. Nope !');
      this.$router.push({ name: 'menu' });
    }

    setTimeout(() => {
      this.visibility.touchToContinue = true;
    }, 3000);
  },
  data () {
    return {
      title: null,
      desc: null,
      theme: null,
      visibility: {
        touchToContinue: false
      }
    };
  },
  computed: {
    themeClasses: function() {
      return 'gradient-' + this.theme;
    }
  },
  methods: {
    goToLevelSelect: function () {
      this.$store.commit('introDone', this.gameid);
      this.$router.replace({
        name: 'levelselect',
        params: {
          gameid: this.gameid
        }
      });
    }
  }
};
</script>

<style scoped>
#picto {
  margin-top: 1%;
}
</style>
