<template>
  <router-link tag="a" :to="to">
    <el-row v-ripple :class="['flex-column','p-4', 'm-x-3', 'bordered-menu', 'nav', classes]" type="flex" justify="center" align="middle">
      <slot name="content">
        <img v-if="icon" class="nav-icon" :src="icon">
        <el-button v-if="text" type="text">{{ text }}</el-button>
      </slot>
    </el-row>
  </router-link>
</template>

<script>
  import Ripple from 'fi-ripple';
  export default {
    name: 'NavButton',
    directives: { Ripple },
    props: {
      to: {
        type: Object,
        required: true
      },
      text: {
        type: String
      },
      icon: {
        type: String
      },
      classes: {
        type: [Array, String]
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav {
    min-height: 142px;
    min-width: 142px;
    margin-bottom: 40px;
  }

  .bordered-menu {
    border: 1px white solid;
  }

  .nav-icon {
    width: 72px;
    height: 72px;
  }

  .el-button--text {
    font-size: 18px;
    color: white;
  }

  a {
    text-decoration: none;
  }
</style>
