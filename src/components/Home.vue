<template>
  <el-row class="h-100 w-100 flex-column" type="flex" justify="center" align="middle">
  <router-link :to="{ name: 'aboutapp' }" class="info-button top-right-element" v-ripple>i</router-link>
      <el-row>
        <router-link to="/"><img src="../../static/assets/logo.png"/></router-link>
        <h2 class="teaser">Le code tout simplement</h2>
      </el-row>
      <div>
        <router-link tag="a" v-ripple to="/menu"><el-button type="primary" id="play-button" plain round icon="el-icon-caret-right">Jouer</el-button></router-link>
      </div>
  </el-row>
</template>

<script>
import Ripple from 'fi-ripple';
import Utils from '../utils/utils';
export default {
  name: 'Home',
  directives: { Ripple },
  data () {
    return {
    };
  },
  created: function() {
    const cryptographyLevelsScores = this.$store.state.cryptography.scores;
    const programmingLevelsScores = this.$store.state.programming.scores;
    const cryptoAllDone = Utils.gameAllDone(cryptographyLevelsScores);
    const progAllDone = Utils.gameAllDone(programmingLevelsScores);

    if(cryptoAllDone && progAllDone && !this.$store.state.seenFinalCredits) {
      this.$store.commit('seenFinalCredits');
      this.$router.replace({ name: 'thankyou', params: { context: 'app' } });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#play-button {
  font-size: 20px;
}

</style>
