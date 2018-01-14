<template>
    <el-row class="h-100 w-100 mt-2" type="flex" justify="center" ref="gameContainer" align="middle">
        <el-col class="h-100">
          <h2>{{ artwork }} - {{ artist.name }}</h2>
          <div id="playground-stage" ref="playgroundStage" class="w-75">
            <slot name="playground"><p>Playground</p></slot>
          </div>
        </el-col>
        <el-col :span="7">
          <div id="toolbar" ref="toolbar">
            <div v-ripple class="tool" v-for="tool in tools" :key="tool.icon">
              <img :src="tool.icon" @click="tool.action"/>
            </div>
            <p v-if="!tools">Toolbar container</p>
          </div>
        </el-col>
    </el-row>
</template>

<script>
import { introJs } from 'intro.js';
import 'intro.js/introjs.css';
import '../../../src/assets/css/introjs-theme.css';
import Ripple from 'fi-ripple';
export default {
  name: 'GameView',
  props: {
    tools: {
      type: Array,
      required: true
    },
    artwork: {
      type: String,
      required: true
    },
    artist: {
      type: Object,
      required: true
    },
    tutorialMode: {
      type: Boolean,
      default: false
    },
    tutorialSteps: {
      type: Array,
      required: true
    }
  },
  directives: { Ripple },
  data () {
    return {
    };
  },
  mounted: function() {
    if(this.tutorialMode) {
      setTimeout(() => {
        var introjs = introJs();
        let options =
          {
            prevLabel: '<',
            nextLabel: '>',
            skipLabel: 'Passer',
            doneLabel: 'C\'est parti ! '
          };
        let steps = [];
        this.tutorialSteps.forEach(tutorial => {
          let intro = {
            intro: tutorial.text
          };
          if(tutorial.element) {
            intro.element = this.$refs[tutorial.element];
          }
          steps.push(intro);
        });

        options.steps = steps;
        let vm = this;
        introjs.setOptions(options);
        introjs.oncomplete(() => {
          vm.$parent.$emit('tutorialFinished');
        });
        introjs.onexit(() => {
          vm.$parent.$emit('tutorialFinished');
        });
        introjs.onchange(() => {
          vm.$parent.$emit('tutorialStepChange', introjs._currentStep);
        });
        introjs.start();

        this.$parent.$emit('tutorialLaunch');
      }, 500);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #playground-stage {
    background-color: rgba(255, 255, 255, 0.25);
    padding-left: 10%;
    padding-top: 1%;
    margin-top: 4%;
    margin-left: 10%;
    border-radius: 10px;
  }

  #toolbar {
    border: 5px rgba(255, 255, 255, 0.25) solid;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.10);
    padding: 20%;
    margin-right: 20%;
  }

  .tool:not(:last-child) {
    margin-bottom: 20%;
  }
</style>
