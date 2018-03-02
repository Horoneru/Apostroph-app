<template>
<div>
   <el-popover
    ref="popoverl"
    placement="bottom"
    width="200"
    trigger="click">
      <p>Appuie maintenant sur l'action que tu veut répéter <strong>{{ count }} fois</strong></p>
    </el-popover>
    <el-badge :value="count">
      <img :src="icon" @click.prevent="action" v-popover:popoverl/>
    </el-badge>
</div>
</template>

<script>
export default {
  name: 'LoopTool',
  props: {
    count: {
      required: true,
      type: Number
    },
    icon: {
      required: true,
      type: String
    },
    action: {
      required: true,
      type: Function
    }
  }
};
</script>

<style>
.el-badge__content.is-fixed:not(.is-dot) {
  top: 10px;
}

.el-badge__content {
  height: 18px;
  line-height: 15px;
}
</style>
