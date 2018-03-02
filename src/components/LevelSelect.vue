<template>
  <el-row class="h-100 w-100 flex-column" type="flex" justify="center" align="middle">
    <router-link style :to="{ name: 'menu' }" class="el-icon-back back-button top-left-element" v-ripple>
    </router-link>
    <el-dropdown v-ripple class="top-right-element" trigger="click" @command="handleMenuCommand" :show-timeout="0" :hide-timeout="0">
    <a class="el-icon-more more-button"></a>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-ripple command="intro"><i class="el-icon-info"></i><span>Introduction du jeu</span></el-dropdown-item>
      <el-dropdown-item v-ripple command="reset"><i class="el-icon-refresh"></i><span>Réinitialiser les données de jeu</span></el-dropdown-item>
    </el-dropdown-menu>
    </el-dropdown>
    <el-row>
      <router-link to="/"><img src="../../static/assets/logo.png"/></router-link>
    </el-row>
    <h2 class="subtitle">Choisis un niveau</h2>
    <hr>
    <el-row class="menu-container" type="flex" justify="space-around">
      <!-- Use template to avoid rendering a real tag. -->
      <!-- Because there's only a difference in wrapper -->
      <!-- Assume there is always a tutorial and make it al ways the first entry -->
      <template v-if="gameUserData.scores.tutorial === null">
        <el-badge is-dot>
          <nav-button text="Tutoriel" :to="{ name: 'levelintro', params: { gameid, levelid: 'tutorial' } }"
          :classes="[gameNavTheme, 'level-nav']" :icon="game.levels.tutorial.icon">
          </nav-button>
        </el-badge>
      </template>
      <template v-else>
        <el-badge value="✓" :class="getBadgeClasses(gameUserData.scores.tutorial)">
          <nav-button text="Tutoriel" :to="{ name: 'levelintro', params: { gameid, levelid: 'tutorial' } }"
          :classes="[gameNavTheme, 'level-nav']" :icon="game.levels.tutorial.icon">
          </nav-button>
        </el-badge>
      </template>
      <template v-for="(level, levelId) in game.levels" v-if="levelId !== 'tutorial'">
        <template v-if="gameUserData.scores[levelId] !== null">
          <el-badge value="✓" :key="levelId" :class="getBadgeClasses(gameUserData.scores[levelId])">
            <nav-button
            :text="level.name" :to="{ name: 'levelintro', params: { gameid, levelid: levelId } }"
            :classes="gameNavTheme" :icon="level.icon">
            </nav-button>
          </el-badge>
        </template>
        <template v-else>
          <nav-button
          :text="level.name" :key="levelId" :to="{ name: 'levelintro', params: { gameid, levelid: levelId } }"
          :classes="gameNavTheme" :icon="level.icon">
          </nav-button>
        </template>
      </template>
    </el-row>
  </el-row>
</template>

<script>
import NavButton from './NavButton';
import games from '../service/GameProvider';
import Ripple from 'fi-ripple';
import validators from '../service/ValidatorProvider';
export default {
  components: {
    NavButton
  },
  name: 'LevelSelect',
  directives: { Ripple },
  props: {
    gameid: {
      type: String,
      validator: validators.game
    }
  },
  data: function() {
    return {
      game: games[this.gameid],
      gameUserData: this.$store.state[this.gameid]
    };
  },
  computed: {
    gameNavTheme: function() {
      // TODO maybe use the same gradient throughout every iteration of the theme
      // instead of a somehow smoother one for nav
      return 'gradient-' + this.game.theme + '-nav';
    }
  },
  methods: {
    handleMenuCommand: function(command) {
      if(command === 'intro') {
        this.$router.push({ name: 'gameintro', params: { gameid: this.gameid } });
      }
      else if(command === 'reset') {
        this.$store.commit('reset', this.gameid);
      }
    },
    getBadgeClasses: function(score) {
      let classes = ['el-badge__checkmark'];

      if(score === 0) {
        classes.push('el-badge__checkmark--perfect');
      }

      return classes;
    }
  }
};
</script>
