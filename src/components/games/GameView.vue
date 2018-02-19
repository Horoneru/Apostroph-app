<template>
    <el-row class="h-100 w-100 mt-2" type="flex" justify="center" ref="gameContainer" align="middle">
        <el-col class="h-100">
          <h2>{{ artwork }} - {{ artist.name }}</h2>
          <div id="playground-stage" ref="playground-stage" class="w-75">
            <slot name="playground"><p>Playground</p></slot>
          </div>
        </el-col>
        <el-col :span="7">
          <div id="toolbar" ref="toolbar">
            <div v-ripple class="tool" v-for="tool in tools" :key="tool.icon" :ref="getToolRef(tool)">
              <img :src="tool.icon" @click="tool.action" :style="tool.style"/>
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
    if(this.tutorialSteps.length !== 0) {
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
          // If it is a gameview general element
          if(tutorial.element in this.$refs) {
            intro.element = this.$refs[tutorial.element];
            // It seems dynamic refs produce an element put in an array with only one element
            if(intro.element instanceof Array) {
              intro.element = intro.element[0];
            }
          }
          // If it is a game-specific element
          else {
            intro.element = this.$parent.$refs[tutorial.element];
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
  },
  methods: {
    getToolRef: function(tool) {
      let filename = tool.icon.split('/').pop();
      // file name without extension
      return filename.split('.')[0];
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
