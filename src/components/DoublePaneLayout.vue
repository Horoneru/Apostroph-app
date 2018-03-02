<template>
  <el-row class="h-100 w-100" type="flex" justify="center" :align="imageAlign" style="background-color: white;">
    <!-- As we don't know from where the user could be coming from, let's just go back one step -->
    <a v-ripple class="el-icon-back back-button top-left-element" style="color: #727272" @click="$router.go(-1)">
    </a>
    <el-col :span="16">
      <img :src="leftImage" />
    </el-col>
    <el-col :class="[this.contentClasses, 'h-100']">
      <h1>{{ title }}</h1>
      <hr class="mx-auto">
      <p :class="{ 'half-gutter': useGutter }">
        <slot name="rightContent"></slot>
      </p>
    </el-col>
  </el-row>
</template>

<script>
import Ripple from 'fi-ripple';
export default {
  name: 'DoublePaneLayout',
  props: {
    title: {
      type: String,
      required: true
    },
    leftImage: {
      type: String,
      required: true
    },
    contentClasses: {
      type: String
    },
    imageAlign: {
      type: String,
      default: 'middle',
      validator: function(value) {
        return [
          'top',
          'middle',
          'bottom'
        ].indexOf(value) !== -1;
      }
    },
    useGutter: {
      type: Boolean,
      default: true
    }
  },
  directives: { Ripple }
};
</script>

<style scoped>
h1 {
  margin-top: 10%;
}

.half-gutter {
  margin: auto auto;
  max-width: 66%;
}
</style>
