<template>
<div>
<el-col class="timeline-item">
  <template v-if="count != 1">
    <el-row type="flex" :class="['timeline-item-container flex-column', { 'animated flash infinite' : active } ]">
      <p class="timeline-item-index">{{ index }}</p>
      <span class="timeline-item-content">
        <el-badge :value="count">
          <img class="timeline-item-icon" :src="icon">
        </el-badge>
        <small class="timeline-item-move"> {{ text }}</small>
      </span>
    </el-row>
  </template>
  <el-row v-else type="flex" :class="['timeline-item-container flex-column', { 'animated flash infinite' : active } ]">
    <p class="timeline-item-index">{{ index }}</p>
    <span class="timeline-item-content">
        <img class="timeline-item-icon" :src="icon">
        <small class="timeline-item-move"> {{ text }}</small>
    </span>
  </el-row>
</el-col>
</div>
</template>

<script>
export default {
  name: 'ProgrammingTimelineItem',
  props: {
    active: {
      required: true,
      type: Boolean
    },
    index: {
      required: true,
      type: Number
    },
    icon: {
      required: true,
      type: String
    },
    text: {
      required: true,
      type: String
    },
    count: {
      required: true,
      type: Number
    }
  }
};
</script>

<style>
  .timeline-item {
    width: 7%;
  }

  .timeline-item-container {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .timeline-item-index {
    font-size: 16px;
    margin-bottom: 0px;
    display: inline-block;
  }

  .timeline-item-icon {
    width: 32px;
    height: 32px;
    margin-bottom: -20px;
  }

  .timeline-item-move, .timeline-item-index {
    margin-top: 0;
    margin-bottom: -20px;
  }

  .timeline-item-content, .timeline-delimiter {
    margin: 5px;
  }

  .timeline-item-active {
    box-shadow: 1px 1px 1px 1px rgba(128, 128, 128, 0.5);
  }
</style>
