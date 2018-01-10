<template>
  <double-pane-layout :leftImage="'../../static/assets/logo-' + theme + '.png'" :title="title" imageAlign="middle" :contentClasses="this.themeClasses">
    <div slot="rightContent">
        <h2 class="half-gutter"> Niveau {{ this.levelid }}</h2>
        <img id="picto" :src="'../../static/assets/picto-' + gameid + '.png'">
    </div>
  </double-pane-layout>
</template>

<script>
import games from '../service/GameProvider.js';
import DoublePaneLayout from './DoublePaneLayout';
export default {
  name: 'LevelIntro',
  components: { DoublePaneLayout },
  props: ['gameid', 'levelid'],
  created: function() {
    if(this.gameid in games) {
      this.title = games[this.gameid].name;
      this.theme = games[this.gameid].theme;
    }
    else {
      console.log('whoopsie there. Nope !');
      this.$router.push({ name: 'menu' });
    }

    setTimeout(() => {
      this.$router.push({ name: this.gameid, params: { levelid: this.levelid } });
    }, 1500);
  },
  data () {
    return {
      title: null,
      theme: null
    };
  },
  computed: {
    themeClasses: function() {
      return 'h-100 gradient-' + this.theme;
    }
  }
};
</script>

<style scoped>
#picto {
  margin-top: 1%;
}
</style>
