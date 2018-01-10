<template>
  <el-row class="h-100 w-100 flex-column" type="flex" justify="center" align="middle">
  <router-link style :to="{ name: 'aboutapp' }" class="info-button">i</router-link>
      <el-row>
        <img src="../../static/assets/logo.png"/>
        <h2 class="teaser">Le code tout simplement</h2>
      </el-row>
      <div>
        <router-link tag="a" to="/menu"><el-button type="primary" plain round icon="el-icon-caret-right">Jouer</el-button></router-link>
      </div>
  </el-row>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
