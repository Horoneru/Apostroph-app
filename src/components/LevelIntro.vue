<template>
  <el-row class="h-100 w-100" type="flex" justify="center" align="middle" style="background-color: white;">
    <el-col :span="16">
      <img :src="'../../static/assets/logo-' + theme + '.png'" />
    </el-col>
      <el-col :class="this.themeClasses">
        <h1>{{ title }}</h1>
        <hr class="mx-auto">
        <h2 class="half-gutter"> Niveau {{ this.levelid }}</h2>
        <img id="picto" :src="'../../static/assets/picto-' + game + '.png'">
      </el-col>
  </el-row>
</template>

<script>
import games from '../service/GameProvider.js';
export default {
  name: 'LevelIntro',
  props: ['game', 'levelid'],
  created: function() {
    if(this.game in games) {
      this.title = games[this.game].name;
      this.theme = games[this.game].theme;
    }
    else {
      console.log('whoopsie there. Nope !');
      this.$router.push({ name: 'menu' });
    }

    setTimeout(() => {
      this.$router.push({ name: this.game, params: { levelid: this.levelid } });
    }, 1500);
  },
  data () {
    return {
      title: null,
      theme: null
    };
  },
  computed: {
    themeClasses: function() {
      return 'h-100 gradient-' + this.theme;
    }
  }
};
</script>

<style scoped>
h1 {
  margin-top: 10%;
}

#picto {
  margin-top: 1%;
}

.half-gutter {
  margin: 10% auto auto auto;
  max-width: 66%;
}
</style>
