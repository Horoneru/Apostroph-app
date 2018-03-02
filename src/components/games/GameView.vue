<template>
  <div>
    <a v-ripple class="el-icon-back back-button top-left-element" @click="leaveGameDialog = true"></a>
    <el-dialog title="Quitter ?" :visible.sync="leaveGameDialog">
      <span>Es-tu sûr de vouloir quitter le niveau ?<br>
            Ta progression sera perdue !
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button v-ripple @click="leaveGameDialog = false">Non</el-button>
        <el-button v-ripple type="primary" @click="leaveGame();leaveGameDialog = false">Oui ! </el-button>
      </span>
    </el-dialog>
      <el-row class="h-100 w-100 mt-2" type="flex" justify="center" ref="gameContainer" align="middle">
          <el-col class="h-100">
            <h2>{{ artwork }} - {{ artist.name }}</h2>
            <div id="playground-stage" ref="playground-stage" class="w-75">
              <slot name="playground"><p>Playground</p></slot>
            </div>
          </el-col>
          <el-col :span="7">
            <div id="toolbar" ref="toolbar">
              <div v-ripple :class="['tool', { disabled: tool.disabled }]" v-for="tool in tools" :key="tool.icon" :ref="getToolRef(tool)">
                <img v-if="!tool.customComponent" :src="tool.icon" @click.prevent="tool.action" :style="tool.style"/>
                <component v-if="tool.customComponent" :is="tool.customComponent" :icon="tool.icon" :action="tool.action" :count="tool.count"></component>
              </div>
              <p v-if="!tools">Toolbar container</p>
            </div>
          </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="middle" ref="footer" tag="footer">
        <el-col :span="19">
          <slot name="footer-left"></slot>
        </el-col>
        <el-col :span="4">
          <slot name="footer-right"></slot>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import { introJs } from 'intro.js';
import 'intro.js/introjs.css';
import '../../../src/assets/css/introjs-theme.css';
import Ripple from 'fi-ripple';
import LoopTool from './programming/LoopTool';
import ressources from '../../data/Ressources';
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
  components: { LoopTool },
  data () {
    return {
      leaveGameDialog: false
    };
  },
  mounted: function() {
    this.preloadLevelCompleteRessources();
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

          if(intro.element) {
            // If it's a vue component
            if(intro.element.$el) {
              intro.element = intro.element.$el;
            }
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
    },
    leaveGame: function() {
      this.$router.push({
        name: 'levelselect', params: { gameid: this.$store.state.currentGame }
      });
    },
    preloadLevelCompleteRessources: function() {
      ressources.levelComplete.forEach(element => {
        let res = new Image();
        res.src = element;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #playground-stage {
    background-color: rgba(255, 255, 255, 0.25);
    padding-top: 5%;
    margin-top: 4%;
    margin-left: 10%;
    padding-bottom: 5%;
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

  .tool img, .tool {
    transition: all 1s ease-out;
  }

  .tool.disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.7);
    margin: auto;
  }
</style>
