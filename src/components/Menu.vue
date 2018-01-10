<template>
  <el-row class="h-100 w-100 flex-column" type="flex" justify="center" align="middle">
<<<<<<< HEAD
    <el-button type="text" class="apropos-btn"><img src="../../static/assets/a-propos.png"></el-button>
    <div class="burgerMenu">
=======
    <div class="burger-menu">
>>>>>>> Corrige le burger menu
      <hr>
      <hr>
      <hr>
    </div>
    <el-row>
      <img src="../../static/assets/logo.png" />
    </el-row>
    <h2 class="subtitle">Choisissez un mini jeu</h2>
    <hr>
    <el-row class="menu-container" type="flex" justify="space-around" >
      <router-link tag="a" :to="{ name: 'gameintro', params: { game: 'cryptography' } }">
        <el-row class="flex-column p-4 m-x-3 bordered-menu gradient-color-inverse-nav" type="flex" justify="center" align="middle">
          <img class="game-icon" src="/../static/assets/icon-chiffr.png">
          <el-button type="text">Cryptographie</el-button>
        </el-row>
      </router-link>
      <router-link tag="a" :to="{ name: 'gameintro', params: { game: 'programming' } }">
        <el-row class="flex-column p-4 m-x-3 bordered-menu gradient-accent-color-nav" type="flex" justify="center" align="middle">
          <img class="game-icon" src="/../static/assets/icon-prog.png">
          <el-button type="text">Programmation</el-button>
        </el-row>
      </router-link>
    </el-row>
  </el-row>
</template>

<script>
  export default {
    name: 'Menu'
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bordered-menu {
    border: 1px white solid;
    border-radius: 5px;
  }

  .game-icon {
    width: 72px;
    height: 72px;
  }

  .el-button--text {
    font-size: 18px;
    color: white;
    text-shadow: 0px 1px 20px rgba(0, 0, 0, 0.25);
  }

  a {
    text-decoration: none;
  }

  .menu-container {
    width: 40%;
  }
<<<<<<< HEAD

  /*Burger Menu */

  .burgerMenu {
    position: absolute ; 
    top : 15px ;
    left : 25px ; 
    width : 125px ; 
    height : auto ; 
  }

  .burgerMenu hr{
    width : 50px ; 
    height : 6px ; 
    margin-bottom: 10px;
  }
  
/* Btn a propos */
  .apropos-btn {
    position: absolute; 
    right: 15px;
    top: 10px;
    width: 50px;
    height: auto; 
  }

=======
>>>>>>> Corrige le burger menu
</style>
