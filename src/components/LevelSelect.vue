<template>
  <el-row class="h-100 w-100 flex-column" type="flex" justify="center" align="middle">
    <router-link style :to="{ name: 'menu' }" class="el-icon-back back-button" v-ripple>
    </router-link>
    <el-row>
      <img src="../../static/assets/logo.png" />
    </el-row>
    <h2 class="subtitle">Choisissez un niveau</h2>
    <hr>
    <el-row class="menu-container" type="flex" justify="space-around">
      <!-- Use template to avoid rendering a real tag. -->
      <!-- Because there's only a difference in wrapper -->
      <!-- Assume there is always a tutorial and make it always the first entry -->
      <template v-if="!this.$store.state[this.gameid].tutorialDone">
      <el-badge is-dot>
        <nav-button text="Tutoriel" :to="{ name: 'levelintro', params: { gameid, levelid: 'tutorial' } }"
        :classes="[gameNavTheme, 'level-nav']" :icon="game.levels.tutorial.icon">
        </nav-button>
      </el-badge>
      </template>
      <template v-else>
        <nav-button text="Tutoriel" :to="{ name: 'levelintro', params: { gameid, levelid: 'tutorial' } }"
        :classes="[gameNavTheme, 'level-nav']" :icon="game.levels.tutorial.icon">
        </nav-button>
      </template>
      <nav-button v-for="(level, levelId) in game.levels" v-if="levelId != 'tutorial'"
      :key="levelId" :text="level.name" :to="{ name: 'levelintro', params: { gameid, levelid: levelId } }"
      :classes="gameNavTheme" :icon="level.icon">
      </nav-button>
    </el-row>
  </el-row>
</template>

<script>
import NavButton from './NavButton';
import games from '../service/GameProvider';
import validators from '../service/ValidatorProvider';
export default {
  components: {
    NavButton
  },
  name: 'LevelSelect',
  props: {
    gameid: {
      type: String,
      validator: validators.game
    }
  },
  data: function() {
    return {
      game: games[this.gameid]
    };
  },
  computed: {
    gameNavTheme: function() {
      // TODO maybe use the same gradient throughout every iteration of the theme
      // instead of a somehow smoother one for nav
      return 'gradient-' + this.game.theme + '-nav';
    }
  }
};
</script>
