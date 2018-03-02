<template>
  <el-row class="h-100 w-100 flex-column" type="flex" justify="center" align="middle">
      <el-row>
        <router-link to="/"><img src="../../static/assets/logo.png"/></router-link>
        <h2 class="teaser">Le code tout simplement</h2>
      </el-row>
      <hr/>
      <div style="margin-bottom:30px;" v-html="message"></div>
      <hr/>
      <div>
        <router-link tag="a" v-ripple :to="{ name: 'aboutapp' }">
          <el-button type="primary" class="credits-button" icon="el-icon-star-on">Crédits</el-button>
        </router-link>
        <router-link tag="a" v-ripple to="/">
          <el-button type="primary" class="credits-button" icon="el-icon-d-arrow-left">Accueil</el-button>
        </router-link>
      </div>
  </el-row>
</template>

<script>
import Ripple from 'fi-ripple';
import games from '../service/GameProvider';
export default {
  name: 'Thankyou',
  directives: { Ripple },
  props: {
    context: {
      type: String
    }
  },
  computed: {
    message: function() {
      let message = '';

      switch(this.context) {
        case 'cryptography':
          message = games.cryptography.congratulationsText;
          break;
        case 'programming':
          message = games.programming.congratulationsText;
          break;
        default:
          message = 'Toute l’équipe d’Apostroph te remercie d’avoir joué à notre application.<br>' +
                    'Nous espérons que tu aies apprécié, tout en ayant pu apprendre quelques notions de code.<br>' +
                    'À bientôt !<br>' +
                    '~<i>Apostroph</i>';
          break;
      }

      return message;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.credits-button {
  font-size: 20px;
}

</style>
