<template>
  <double-pane-layout :leftImage="'../../static/assets/logo-' + theme + '.png'" :title="title" imageAlign="middle" :contentClasses="this.themeClasses">
    <div slot="rightContent">
        <h2 class="half-gutter"> {{ this.level.name }}</h2>
        <img id="picto" :src="'../../static/assets/picto-' + gameid + '.png'">
    </div>
  </double-pane-layout>
</template>

<script>
import games from '../service/GameProvider';
import DoublePaneLayout from './DoublePaneLayout';
import validators from '../service/ValidatorProvider';
export default {
  name: 'LevelIntro',
  components: { DoublePaneLayout },
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
      this.$router.push({ name: 'menu' });
    }

    setTimeout(() => {
      this.$router.push({ name: this.gameid, params: { levelid: this.levelid } });
    }, 1500);
  },
  data () {
    return {
      title: null,
      theme: null,
      level: null
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
