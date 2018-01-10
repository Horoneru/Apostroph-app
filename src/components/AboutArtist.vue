<template>
  <double-pane-layout :title="artist.name" :leftImage="artist.image" imageAlign="bottom" :contentClasses="'gradient-' + this.artist.theme">
    <p slot="rightContent" v-html="artist.desc"></p>
  </double-pane-layout>
</template>

<script>
import DoublePaneLayout from './DoublePaneLayout';
import artists from '../service/ArtistProvider.js';

export default {
  name: 'AboutArtist',
  props: ['artistId'],
  components: { DoublePaneLayout },
  data: function() {
    return {
      artist: null
    };
  },
  created: function() {
    this.artist = artists[this.artistId];
  }
};
</script>

<style scoped>
</style>
