<template>
  <el-row class="h-100 w-100" type="flex" justify="center" align="middle">
    <router-link style :to="{ name: 'menu' }" class="el-icon-back back-button">
    </router-link>
    <div>
      <div class="animated bounce">
      <h1 v-if="levelid !== 'tutorial'">Niveau {{ levelid }} terminé</h1>
      <h1 v-else>Tutoriel terminé ! </h1>
      </div>
      <hr class="animated flip">
      <small v-if="levelid === '1'">Preview terminée aussi</small>
      <div class="btn-lvl-complete animated fadeInUpBig">
        <router-link v-ripple tag="a" :to="{ name: 'aboutartist', params: { artistid: game.levels[levelid].artist.id } }"><el-button type="text"><img src="../../static/assets/artiste.png"></el-button></router-link>
        <router-link v-ripple tag="a" :to="{ name: 'levelselect', params: { gameid } }"><el-button type="text"><img src="../../static/assets/home.png"></el-button></router-link>
        <router-link v-ripple tag="a" :to="{ name: 'levelintro', params: { gameid, 'levelid': game.levels[levelid].next } }"><el-button type="text"><img src="../../static/assets/suite.png"></el-button></router-link>
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
        game: null,
        artistId: null
      };
    },
    created: function() {
      this.game = games[this.gameid];
      this.artistId = this.game.levelid[this.levelid];
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
