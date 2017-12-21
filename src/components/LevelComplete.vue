<template>
  <el-row class="h-100 w-100" type="flex" justify="center" align="middle">
    <div>
      <h1>Amazing ! </h1>
      <p v-if="levelid !== 'tutorial'">Niveau {{ levelid }} terminé.</p>
      <div v-else>
      <p>Tutoriel terminé ! </p>
      <router-link tag="a" :to="{ name: 'levelintro', params: { game, levelid: '1' } }">
        <el-button type="primary">Continuer au niveau 1</el-button>
      </router-link>
      </div>
      <small v-if="levelid === '1'">Preview terminée aussi</small>
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


</style>
