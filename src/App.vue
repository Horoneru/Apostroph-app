<template>
  <div id="app" :class="appBackgroundClass">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import ressources from './data/Ressources';
export default {
  name: 'app',
  computed: {
    appBackgroundClass: function() {
      return 'gradient-' + this.$store.getters.currentTheme;
    }
  },
  watch: {
    '$route' (to, from) {
      // TODO Handle the possibility of directly going to the game
      if (to.params.gameid || to.params.levelid) {
        let game = to.params.gameid;

        if(!game) {
          if(to.path.includes('cryptography')) {
            game = 'cryptography';
          }
          else if(to.path.includes('programming')) {
            game = 'programming';
          }
        }

        this.$store.commit('changeGame', game);
      }

      else if(!to.path.includes('about')) {
        this.$store.commit('changeGame', null);
      }
    }
  },
  created: function() {
    ressources.important.forEach(element => {
      let res = new Image();
      res.src = element;
    });
  }
};
</script>

<style>

/* CSS variables */
:root {
  /* Colors */
  --primary-color: #00efe3;
  --secondary-color: #1bd6a4;
  --accent-color-light: #00efe6;
  --accent-color-dark: #0085bd;
  --primary-color-inverse: rgba(191, 127, 235, 0.7);
  --primary-color-inverse-accent: rgba(57, 49, 228, 0.7);
}

body, html {
  /* Reset margins */
  margin: 0;
  /* Permet aux enfants de styliser l'ensemble de la page */
  height: 100%;
}

h1, h2 {
  font-weight: normal;
}

body {
  color: rgb(240, 240, 240);
}


/* Make 'em responsive */
img {
  max-width: 100%;
  max-height: 100%;
}

hr {
  border: 0;
  height: 5px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5));
  width: 30%;
  margin: 10px 0px 40px;
}

#app {
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-attachment: fixed;
  background-size: cover;
  line-height: 2rem;
  height: 100%;
  overflow-x: hidden;
}

.teaser {
  color: #f1f1f1;
  text-shadow: 0px 1px 20px rgba(0, 0, 0, 0.25);
  margin-top: -20px;
  margin-bottom: 60px;
}

.subtitle {
  font-size: 20px;
}

.flex-column {
  flex-direction: column;
}

.gradient-primary-color {
  background: linear-gradient(90deg, #bf7feb, #00efe6);
}

.gradient-accent-color {
  background: linear-gradient(180deg, var(--accent-color-dark), var(--accent-color-light));
}

.gradient-color-inverse {
  background: linear-gradient(0, var(--primary-color-inverse), var(--primary-color-inverse-accent));
}

.gradient-accent-color-nav {
  background: linear-gradient(180deg,  rgba(255, 255, 255, 0.25), rgb(68, 177, 233));
}

.gradient-color-inverse-nav {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.25), rgba(195, 143, 230, 0.7));
}

.top-left-element {
  position: absolute !important;
  margin: auto !important;
  top: 25px;
  left: 15px;
  text-decoration: none;
  z-index: 10;
}

.top-right-element {
  position: absolute !important;
  margin: auto !important;
  right: 15px;
  top: 27px;
  text-decoration: none;
  z-index: 10;
}

.back-button {
  width: 50px;
  height: 30px;
  font-size: 32px !important;
  color: rgb(240, 240, 240);
}

.info-button {
  width: 50px;
  height: 20px;
  font-size: 32px !important;
  color: rgb(240, 240, 240);
  font-weight: bold;
  border: 3px solid rgb(240, 240, 240) !important;
  border-radius: 30px;
  padding: 10px 0 19px 0;
}

.more-button {
  font-size: 32px;
  color: rgb(240, 240, 240);
}

.el-dropdown-menu__item [class*=" el-icon-"], .el-dropdown-menu__item [class^="el-icon-"]{
  margin-right: 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s
}

.fade-enter, .fade-leave-to {
  opacity: 0
}

.menu-container {
    width: 40%;
    flex-wrap: wrap;
}

/* Element CSS custom */

.el-message__content {
  font-size: 16px;
}

.el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus {
  background-color: rgb(64, 158, 255, 0.2);
  border-color: rgb(64, 158, 255, 0.2);
}

.el-badge__checkmark > .el-badge__content {
  top: 0 !important;
  right: 10px !important;
}

.el-badge__checkmark--perfect > .el-badge__content {
  background-color: #67C23A;
}

.el-badge__checkmark--color-inverse > .el-badge__content {
  background-color: var(--primary-color-inverse);
}

.el-badge__checkmark--accent-color > .el-badge__content {
  background-color: rgb(0, 133, 189, 0.7);
}
</style>
