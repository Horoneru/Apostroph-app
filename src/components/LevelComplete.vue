<template>
  <el-row class="h-100 w-100" type="flex" justify="center" align="middle">
    <div>
      <h1 v-if="levelid !== 'tutorial'">Niveau {{ levelid }} terminé.</h1>
      <h1 v-else>Tutoriel terminé ! </h1>
      <hr>
      <small v-if="levelid === '1'">Preview terminée aussi</small>
      <div class="btnLvlComplete">
         <el-button type="text"><img src="../../static/assets/artiste.png"></el-button>
         <el-button type="text"><img src="../../static/assets/home.png"></el-button>
         <el-button type="text"><img src="../../static/assets/suite.png"></el-button>
      </div>
    </div>
  </el-row>
</template>

<script>
  export default {
    name: 'LevelComplete',
    props: ['game', 'levelid'],
    data() {
      return {
      };
    },
    created: function() {
      if(this.levelid === 'tutorial') {
        this.$store.commit('tutorialDone', this.game);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

hr {
  width : 40% ; 
  margin : auto ;
  margin-top : 20px ;
}

.btnLvlComplete {
  margin-top : 30px ; 
}

.btnLvlComplete img{
  width : 75px ; 
  height :  auto ; 
}

</style>
