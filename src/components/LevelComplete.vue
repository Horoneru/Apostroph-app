<template>
  <el-row class="h-100 w-100" type="flex" justify="center" align="middle">
    <router-link style :to="{ name: gameid, params: { levelid } }" class="el-icon-back back-button top-left-element">
    </router-link>
    <div>
      <div class="animated bounce">
      <h1 v-if="levelid !== 'tutorial'">Niveau {{ levelid }} terminé</h1>
      <h1 v-else>Tutoriel terminé ! </h1>
      <p v-html="scoreText"></p>
      <p style="margin-top:30px;" v-if="game.levels[levelid].outro" v-html="game.levels[levelid].outro"></p>
      </div>
      <hr class="animated flip">
      <div class="btn-lvl-complete animated fadeInUpBig">
        <router-link v-ripple tag="a" :to="{ name: 'aboutartist', params: { artistid: game.levels[levelid].artist.id } }"><el-button type="text"><img src="../../static/assets/artiste.png"></el-button></router-link>
        <router-link v-ripple tag="a" :to="{ name: 'levelselect', params: { gameid } }"><el-button type="text"><img src="../../static/assets/home.png"></el-button></router-link>
        <router-link v-ripple tag="a" :to="nextLink"><el-button type="text"><img src="../../static/assets/suite.png"></el-button></router-link>
      </div>
    </div>
  </el-row>
</template>

<script>
  import games from '../service/GameProvider';
  import Ripple from 'fi-ripple';
  import validators from '../service/ValidatorProvider';
  export default {
    name: 'LevelComplete',
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
    directives: { Ripple },
    data() {
      return {
        game: games[this.gameid],
        artistId: null,
        gameUserData: this.$store.state[this.gameid]
      };
    },
    computed: {
      scoreText: function() {
        let text = '';
        const score = this.gameUserData.scores[this.levelid];

        // Naughty guy didn't finish the level
        if(score === null) {
          this.$message({
            type: 'info',
            message: 'Je détecte une petite anomalie... <br>Es-tu sûr d\'être arrivé ici par hasard ?',
            dangerouslyUseHTMLString: true,
            duration: 5000
          });
          this.$router.replace('/');
        }
        if(score === 0) {
          text = '<strong>Super !</strong> Tu as trouvé la meilleure solution.';
        }
        else if(score >= -3) {
          text = 'Bien joué ! Mais tu peux mieux faire.';
        }
        else if(score < -3) {
          text = 'Tu es parvenu à la fin malgrè certaines erreurs.<br>' +
                 'Réessaye pour trouver une meilleure solution !';
          if(this.game.levels[this.levelid].usesQrcode) {
            text += '<br>Besoin d\'aide ? Scanne le Qr code !';
          }
          else if(this.game.levels[this.levelid].usesLoop) {
            text += '<br><strong>Conseil:</strong> Utilise les boucles pour réduire au maximum le nombre d\'instructions.';
          }
        }
        return text;
      },
      nextLink: function() {
        let link = {};
        if(this.game.levels[this.levelid].next) {
          link = {
            name: 'levelintro',
            params: {
              gameid: this.gameid,
              'levelid': this.game.levels[this.levelid].next
            }
          };
        }
        // Finished all the levels
        else {
          link = {
            name: 'thankyou',
            params: {
              context: this.gameid
            }
          };
        }

        return link;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

hr {
  width: 40%;
  margin: auto;
  margin-top: 20px;
}

.btn-lvl-complete {
  margin-top: 30px;
}

.btn-lvl-complete img{
  width: 75px;
  height:  auto;
}
</style>
