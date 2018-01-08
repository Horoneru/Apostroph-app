<template>
  <el-row class="h-100 w-100 flex-column" type="flex" justify="center" align="middle">
    <el-row>
      <img src="../../static/assets/logo.png" />
    </el-row>
    <h2 class="subtitle">Choisissez un mini jeu</h2>
    <hr>
    <el-row class="menu-container" type="flex" justify="space-around" >
      <nav-button text="Cryptographie" :to="{ name: 'gameintro', params: { gameid: 'cryptography' } }"
      classes="gradient-color-inverse-nav" icon="/../static/assets/icon-chiffr.png">
      </nav-button>
      <nav-button
      text="Programmation" :to="{ name: 'gameintro', params: { gameid: 'programming' } }"
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
