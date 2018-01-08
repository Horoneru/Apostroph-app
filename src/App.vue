<template>
  <div id="app" :class="appBackgroundClass">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
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
      if (to.params.game) {
        // Avoid sudden gradient changes.
        // Do it after the game intro route set it's own theme
        setTimeout(() => {
          this.$store.commit('changeGame', to.params.game);
        }, 500);
      }
      else if(!to.path.includes('game') && !to.path.includes('about')) {
        this.$store.commit('changeGame', null);
      }
    }
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
  /* background: linear-gradient(180deg, #54f5ed, #65d8b9); */
  background: linear-gradient(180deg, var(--primary-color), var(--secondary-color));
}

.gradient-accent-color {
  background: linear-gradient(180deg, var(--accent-color-dark), var(--accent-color-light));
}

.gradient-color-inverse {
  background: linear-gradient(0, var(--primary-color-inverse), var(--primary-color-inverse-accent));
}

.gradient-cryptography-nav {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.25), rgba(195, 143, 230, 0.7));
}

.gradient-programming-nav {
  background: linear-gradient(180deg,  rgba(255, 255, 255, 0.25), rgb(121, 191, 227));
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
