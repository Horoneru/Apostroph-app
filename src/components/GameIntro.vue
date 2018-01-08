<template>
  <double-pane-layout :leftImage="'../../static/assets/logo-' + theme + '.png'" :title="title" imageAlign="middle" :contentClasses="themeClasses">
    <div slot="rightContent">
      <p v-html="desc"></p>
      <h2 :class="[{ 'o-1': visibility.touchToContinue, 'o-0': !visibility.touchToContinue}, 'fade-enter-active', 'animated pulse']"
      @click="goToLevel"
              style="animation-iteration-count: infinite;">
                Touchez pour continuer
          </h2>
        <img id="picto" :src="'../../static/assets/picto-' + gameid + '.png'">
      <el-dialog title="Un instant !" :visible.sync="visibility.tutorialDialog" width="40%" center>
        <p>Il semble que vous n'ayez pas encore fait le tutoriel de ce jeu !</p>
        <p>Souhaitez-vous faire le tutoriel d'abord ?</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="rejectTutorial">Non, c'est bon !</el-button>
          <router-link tag="a" :to="{ name: gameid, params: { levelid: 'tutorial' } }">
            <el-button type="primary">Oui, c'est parti !</el-button>
          </router-link>
        </span>
      </el-dialog>
    </div>
  </double-pane-layout>
</template>

<script>
import games from '../service/GameProvider.js';
import DoublePaneLayout from './DoublePaneLayout';
export default {
  name: 'GameIntro',
  components: { DoublePaneLayout },
  props: ['gameid'],
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
        touchToContinue: false,
        tutorialDialog: false
      }
    };
  },
  computed: {
    themeClasses: function() {
      return 'gradient-' + this.theme;
    }
  },
  methods: {
    goToLevel: function () {
      if (!this.$store.state[this.gameid].doneTutorial) {
        this.visibility.tutorialDialog = true;
      }
      else {
        this.$router.push({
          name: this.gameid,
          params: {
            levelid: '1'
          }
        });
      }
    },
    rejectTutorial: function () {
      // Won't bother the user again
      this.$store.commit('tutorialDone', this.gameid);
      console.log(this.gameid);
      this.$router.push({
        name: 'levelintro',
        params: {
          gameid: this.gameid,
          levelid: '1'
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
