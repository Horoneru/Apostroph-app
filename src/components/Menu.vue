<template>
  <el-row class="h-100 w-100 flex-column" type="flex" justify="center" align="middle">
    <el-button type="text" class="info-button">i</el-button>
    <el-button icon="el-icon-back" class="back-button" type="text"></el-button>
    <el-row>
      <img src="../../static/assets/logo.png" />
    </el-row>
    <h2 class="subtitle">Choisissez un mini jeu</h2>
    <hr>
    <el-row class="menu-container" type="flex" justify="space-around" >
      <nav-button text="Cryptographie" :to="getRoute('cryptography')"
      classes="gradient-color-inverse-nav" icon="/../static/assets/icon-chiffr.png">
      </nav-button>
      <nav-button
      text="Programmation" :to="getRoute('programming')"
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
  name: 'Menu',
  computed: {
    cryptographyRoute: function() {
      return this.getRoute(this.gameid);
    },

    programmingRoute: function() {
      return this.getRoute(this.gameid);
    }
  },
  methods: {
    getRoute: function(gameid) {
      let route = {
        params: {
          gameid
        }
      };
      if(this.$store.state[gameid].introDone) {
        route.name = 'levelselect';
      }
      else {
        route.name = 'gameintro';
      }

      return route;
    }
  }
};
</script>
