import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import games from '../service/GameProvider.js';

Vue.use(Vuex);

const defaultState = {
  currentGame: null,
  cryptography: {
    currentLevel: null,
    tutorialDone: false,
    introDone: false
  },
  programming: {
    currentLevel: null,
    tutorialDone: false,
    introDone: false
  }
};

export default new Vuex.Store({
  plugins: [
    createPersistedState(
      {
        key: 'apostroph-app'
        // TODO Use paths to optimize the store
      }
    )
  ],
  state: defaultState,
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
    },
    introDone: function(state, gameid) {
      state[gameid].introDone = true;
    },
    reset: function(state, gameid) {
      state[gameid] = defaultState[gameid];
    }
  }
});
