<template>
  <game-view></game-view>
</template>

<script>
import GameView from '../GameView.vue';
export default {
  components: { GameView },
  name: 'Programming',
  data () {
    return {
      visible: false
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
