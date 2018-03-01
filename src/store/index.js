import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import games from '../service/GameProvider.js';

Vue.use(Vuex);

const defaultState = {
  currentGame: null,
  cryptography: {
    scores: {
      tutorial: null,
      1: null,
      2: null,
      3: null
    },
    introDone: false
  },
  programming: {
    scores: {
      tutorial: null,
      1: null,
      2: null,
      3: null
    },
    introDone: false
  },
  seenFinalCredits: false
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
  state: JSON.parse(JSON.stringify(defaultState)),
  getters: {
    currentTheme: function({ currentGame }) {
      return currentGame ? games[currentGame].theme : 'primary-color';
    }
  },
  mutations: {
    changeGame: function(state, currentGame) {
      state.currentGame = currentGame;
    },
    updateLevelScore: function(state, payload) {
      state[payload.gameid].scores[payload.levelid] = payload.score;
    },
    introDone: function(state, gameid) {
      state[gameid].introDone = true;
    },
    reset: function(state, gameid) {
      state[gameid] = JSON.parse(JSON.stringify(defaultState[gameid]));
      state.seenFinalCredits = false;
    },
    seenFinalCredits: function(state) {
      state.seenFinalCredits = true;
    }
  }
});
