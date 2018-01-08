import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import games from '../service/GameProvider.js';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState(
      {
        key: 'apostroph-app'
        // TODO Use paths to optimize the store
      }
    )
  ],
  state: {
    currentGame: null,
    cryptography: {
      currentLevel: null,
      doneTutorial: false
    },
    programming: {
      currentLevel: null,
      doneTutorial: false
    }
  },
  getters: {
    // See l-36
    currentTheme: function({ currentGame }) {
      return currentGame ? games[currentGame].theme : 'primary-color';
    }
  },
  mutations: {
    // TODO : Do we even care...? Could be done all locally
    changeGame: function(state, currentGame) {
      state.currentGame = currentGame;
    },
    tutorialDone: function(state, gameid) {
      state[gameid].tutorialDone = true;
    }
  }
});
