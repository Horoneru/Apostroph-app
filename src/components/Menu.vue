<template>
  <el-row class="h-100 w-100 flex-column" type="flex" justify="center" align="middle">
    <el-row>
      <img src="../../static/assets/logo.png" />
    </el-row>
    <h2 class="subtitle">Choisissez un mini jeu</h2>
    <hr>
    <el-row class="menu-container" type="flex" justify="space-around" >
      <nav-button text="Cryptographie" :to="{ name: 'gameintro', params: { game: 'cryptography' } }"
      classes="gradient-color-inverse-nav" icon="/../static/assets/icon-chiffr.png">
      </nav-button>
      <nav-button
      text="Programmation" :to="{ name: 'gameintro', params: { game: 'programming' } }"
      classes="gradient-accent-color-nav" icon="/../static/assets/icon-prog.png">
      </nav-button>
    </el-row>
  </el-row>
</template>

<script>
import NavButton from './NavButton';
export default {
  components: {
    NavButton
  },
  name: 'Menu'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .menu-container {
    width: 40%;
  }
</style>
