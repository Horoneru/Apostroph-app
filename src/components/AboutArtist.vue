<template>
  <double-pane-layout :title="artist.name" :leftImage="artist.image" imageAlign="bottom" :contentClasses="'gradient-' + this.artist.theme">
    <p slot="rightContent" v-html="artist.desc"></p>
  </double-pane-layout>
</template>

<script>
import DoublePaneLayout from './DoublePaneLayout';
import artists from '../service/ArtistProvider';
import validators from '../service/ValidatorProvider';

export default {
  name: 'AboutArtist',
  props: {
    artistid: {
      type: String,
      required: true,
      validator: validators.artist
    }
  },
  components: { DoublePaneLayout },
  data: function() {
    return {
      artist: null
    };
  },
  created: function() {
    this.artist = artists[this.artistid];
  }
};
</script>

<style scoped>
</style>
