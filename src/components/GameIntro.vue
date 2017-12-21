<template>
  <el-row class="h-100 w-100" type="flex" justify="center" align="middle" style="background-color: white;">
    <el-col :span="16">
      <img :src="'../../static/assets/logo-' + theme + '.png'" />
    </el-col>
      <el-col :class="this.themeClasses">
        <h1>{{ title }}</h1>
        <hr class="mx-auto">
        <p class="half-gutter" v-html="desc"></p>
          <h2 :class="[{ 'o-1': visibility.touchToContinue, 'o-0': !visibility.touchToContinue}, 'fade-enter-active']" @click="goToLevel" class="animated pulse"
              style="animation-iteration-count: infinite;">
                Touchez pour continuer
          </h2>
        <img id="picto" :src="'../../static/assets/picto-' + game + '.png'">
      </el-col>
      <el-dialog
      title="Un instant !"
      :visible.sync="visibility.tutorialDialog"
      width="40%"
      center>
        <p>Il semble que vous n'ayez pas encore fait le tutoriel de ce jeu !</p>
        <p>Souhaitez-vous faire le tutoriel d'abord ?</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="rejectTutorial">Non, c'est bon !</el-button>
          <router-link tag="a" :to="{ name: game, params: { levelid: 'tutorial' } }"><el-button type="primary">Oui, c'est parti !</el-button></router-link>
        </span>
      </el-dialog>
  </el-row>
</template>

<script>
import games from '../service/GameProvider.js';
export default {
  name: 'GameIntro',
  props: ['game'],
  created: function() {
    if(this.game in games) {
      this.title = games[this.game].name;
      this.desc = games[this.game].desc;
      this.theme = games[this.game].theme;
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
      return 'h-100 gradient-' + this.theme;
    }
  },
  methods: {
    goToLevel: function() {
      if(!this.$store.state[this.game].doneTutorial) {
        this.visibility.tutorialDialog = true;
      }
      else {
        this.$router.push({ name: this.game, params: { levelid: '1' } });
      }
    },
    rejectTutorial: function() {
      // Won't bother the user again
      this.$store.state[this.game].doneTutorial = true;
      console.log(this.game);
      this.$router.push({ name: 'levelintro', params: { game: this.game, levelid: '1' } });
    }
  }
};
</script>

<style scoped>
h1 {
  margin-top: 10%;
}

#picto {
  margin-top: 1%;
}

.o-0 {
  opacity: 0;
}

.o-1 {
  opacity: 1;
}

.half-gutter {
  margin: 10% auto auto auto;
  max-width: 66%;
}
</style>
