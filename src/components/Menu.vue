<template>
  <el-row class="h-100 w-100 flex-column" type="flex" justify="center" align="middle">
    <router-link style :to="{ name: 'home' }" v-ripple class="el-icon-back back-button top-left-element">
    </router-link>
    <el-row>
      <router-link to="/"><img src="../../static/assets/logo.png"/></router-link>
    </el-row>
    <h2 class="subtitle">Choisis un mini jeu</h2>
    <hr>
    <el-row class="menu-container" type="flex" justify="space-around" >
      <template v-if="gameAllDone('cryptography')">
        <el-badge value="✓" :class="getBadgeClasses('cryptography')">
          <nav-button text="Cryptographie" :to="getRoute('cryptography')"
          classes="gradient-color-inverse-nav" icon="/../static/assets/icon-chiffr.png">
          </nav-button>
        </el-badge>
      </template>
      <template v-else>
        <nav-button text="Cryptographie" :to="getRoute('cryptography')"
        classes="gradient-color-inverse-nav" icon="/../static/assets/icon-chiffr.png">
        </nav-button>
      </template>
      <template v-if="gameAllDone('programming')">
        <el-badge value="✓" :class="getBadgeClasses('programming')">
          <nav-button
          text="Programmation" :to="getRoute('programming')"
          classes="gradient-accent-color-nav" icon="/../static/assets/icon-prog.png">
          </nav-button>
        </el-badge>
      </template>
      <template v-else>
        <nav-button
        text="Programmation" :to="getRoute('programming')"
        classes="gradient-accent-color-nav" icon="/../static/assets/icon-prog.png">
        </nav-button>
      </template>
    </el-row>
  </el-row>
</template>

<script>
import NavButton from './NavButton';
import Ripple from 'fi-ripple';
import Utils from '../utils/utils';
export default {
  components: {
    NavButton
  },
  directives: { Ripple },
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
    },
    gameAllDone: function(gameid) {
      return Utils.gameAllDone(this.$store.state[gameid].scores);
    },
    getBadgeClasses: function(gameid) {
      let classes = ['el-badge__checkmark'];

      if(gameid === 'cryptography') {
        classes.push('el-badge__checkmark--color-inverse');
      }
      else if(gameid === 'programming') {
        classes.push('el-badge__checkmark--accent-color');
      }

      return classes;
    }
  }
};
</script>
