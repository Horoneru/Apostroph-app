<template>
  <el-row class="h-100 w-100" type="flex" justify="center" :align="imageAlign" style="background-color: white;">
    <el-col :span="16">
      <img :src="leftImage" />
    </el-col>
    <el-col :class="[this.contentClasses, 'h-100']">
      <h1>{{ title }}</h1>
      <hr class="mx-auto">
      <p class="half-gutter">
        <slot name="rightContent"></slot>
      </p>
    </el-col>
  </el-row>
</template>

<script>
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
    }
  }
};
</script>

<style scoped>
h1 {
  margin-top: 10%;
}

.half-gutter {
  margin: 10% auto auto auto;
  max-width: 66%;
}
</style>
