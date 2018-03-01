<template>
  <div>
    <game-view :tools="tools" :artist="artist" :artwork="artwork" :tutorialSteps="tutorialSteps">
      <div slot="playground" style="position:relative;height:500px;max-width:400px" class="m-auto">
        <span v-for="el in tab" class="original-piece" :key="el.image" :style="getOriginalPieceBorders(el.wall.position)"><img :src="el.image"></span>
        <span class="grid-element" id="cursor" :style="gridElements.cursor.style"></span>
        <span class="grid-element" id="ghost" :style="gridElements.ghost.style"></span>
        <span class="grid-element animated pulse infinite el-icon-location" id="goal" :style="gridElements.goal.style"></span>
      </div>
      <programing-timeline-item slot="footer-left" v-for="(el, index) in actionHistory" :key="index" :index="index" :text="el.text" :icon="el.icon" :active="el.active" :count="el.count"/>
      <el-row type="flex" justify="space-around" slot="footer-right">
        <el-button v-ripple type="primary" id="exec-button" :disabled="actionHistory.length === 0 || blockUserInput" @click="executeMoves">Exécuter</el-button>
        <el-button v-ripple type="text" id="reset-button" v-show="actionHistory.length !== 0 && !blockUserInput" @click="resetDialogVisible = true" icon="el-icon-delete"></el-button>
      </el-row>
    </game-view>
    <el-dialog title="Recommencer à zéro ?" :visible.sync="resetDialogVisible">
      <span>Es-tu sûr de recommencer à zéro ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button v-ripple @click="resetDialogVisible = false">Non</el-button>
        <el-button v-ripple type="primary" @click="reset('hard');resetDialogVisible= false">Oui ! </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GameView from '../GameView.vue';
import ProgramingTimelineItem from './ProgrammingTimelineItem';
import games from '../../../service/GameProvider';
import validators from '../../../service/ValidatorProvider';
import Wall from '../../../entity/Wall';
import merge from 'lodash-es/merge';
import Ripple from 'fi-ripple';
import { introJs } from 'intro.js';
import 'intro.js/introjs.css';
// TODO : Add docs
export default {
  props: {
    levelid: {
      type: String,
      required: true,
      validator: function(value) {
        return validators.level('programming', value);
      }
    }
  },
  components: { GameView, ProgramingTimelineItem },
  directives: { Ripple },
  name: 'Programming',
  data () {
    return {
      tutorialSteps: [],
      setupInit: false,
      tools: [
        {
          icon: '../../../../static/assets/up-arrow.png',
          style: {
            transform: null,
            transition: 'transform 0.25s ease-out'
          },
          action: () => {
            this.userInput({
              type: 'move',
              value: this.$data.direction,
              text: this.$data.direction,
              icon: '../../../../static/assets/' + this.$data.direction + '-arrow.png',
              active: false,
              count: this.loopActivated ? this.loopCount : 1
            });
          }
        },
        {
          icon: '../../../../static/assets/programming/rotate-clockwise.png',
          action: () => {
            this.userInput({
              type: 'directionChange',
              value: 'clockwise',
              text: 'rotate',
              icon: '../../../../static/assets/programming/rotate-clockwise.png',
              active: false,
              count: this.loopActivated ? this.loopCount : 1
            });
          }
        },
        {
          icon: '../../../../static/assets/programming/rotate-counter-clockwise.png',
          action: () => {
            this.userInput({
              type: 'directionChange',
              value: 'counter-clockwise',
              text: 'rotate',
              icon: '../../../../static/assets/programming/rotate-counter-clockwise.png',
              active: false,
              count: this.loopActivated ? this.loopCount : 1
            });
          }
        }
      ],
      levelData: games.programming.levels[this.levelid],
      artist: games.programming.levels[this.levelid].artist,
      artwork: games.programming.levels[this.levelid].artwork,
      rowCount: 4,
      columnCount: 5,
      tab: [],
      moveInfo: {
        'up': {
          property: 'top',
          amount: -100,
          errorAmount: -25,
          opposite: 'down'
        },
        'down': {
          property: 'top',
          amount: 100,
          errorAmount: 25,
          opposite: 'up'
        },
        'right': {
          property: 'left',
          amount: 100,
          errorAmount: 25,
          opposite: 'left'
        },
        'left': {
          property: 'left',
          amount: -100,
          errorAmount: -25,
          opposite: 'right'
        }
      },
      direction: 'up',
      directions: ['up', 'right', 'down', 'left'],
      actionTarget: null,
      gridElements: {
        cursor: {
          style: {
            top: '500px',
            left: '175px',
            transform: 'rotate(0 deg)'
          }
        },
        ghost: {
          style: {
            top: '500px',
            left: '175px',
            transform: 'rotate(0 deg)'
          }
        },
        goal: {
          style: {
            top: '500px',
            left: '175px'
          }
        }
      },
      actionHistory: [],
      cursorDegrees: 0,
      goalReached: false,
      blockUserInput: false,
      resetDialogVisible: false,
      maxActions: 14,
      loopActivated: false,
      loopCount: null,
      backAndForthMoveHappening: false,
      tries: 0
    };
  },
  created: function() {
    const walls = this.createWalls();
    for(let i = 0; i < 20; i++) {
      // Empty wall. everything is false
      let wall = new Wall();
      if(walls[i]) {
        wall = walls[i];
      }
      this.tab.push(
        {
          id: i,
          image: '../../../../static/assets/programming/' + this.levelid + '/img-' + i + '.jpg',
          wall
        }
      );
    }

    const tutorialSteps = this.levelData.tutorialSteps;
    if(tutorialSteps) {
      this.tutorialSteps = this.tutorialSteps.concat(tutorialSteps);
    }

    if(this.levelData.usesLoop) {
      this.loopCount = this.levelData.loopCount;
      this.tools.push({
        icon: '../../../../static/assets/programming/loop.png',
        action: () => {
          this.userInput({
            type: 'loop',
            value: null,
            text: 'loop',
            icon: '../../../../static/assets/programming/loop.png',
            active: false
          });
        },
        customComponent: 'LoopTool',
        count: this.loopCount
      });
    }

    this.tools[0].style.transform = 'rotate(' + this.cursorDegrees + ' deg)';

    this.actionTarget = this.gridElements.ghost;

    this.reset('hard');

    if(this.levelData.mixins) {
      if(this.levelData.mixins.created) {
        this.levelData.mixins.created(this);
      }
    }
  },
  watch: {
    actionTarget: function(newActionTarget, oldActionTarget) {
      if(oldActionTarget) {
        oldActionTarget.style.transform = 'rotate(0deg)';
      }
      newActionTarget.style.transform = 'rotate(' + this.cursorDegrees + 'deg)';

      if(oldActionTarget === this.gridElements.ghost) {
        this.gridElements.ghost.style.opacity = '0';
      }
      else if(newActionTarget === this.gridElements.ghost) {
        this.gridElements.ghost.style.opacity = '0.5';
      }
    },
    cursorDegrees: function(newCursorDegrees, oldCursorDegrees) {
      this.actionTarget.style.transform = 'rotate(' + newCursorDegrees + 'deg)';
      this.tools[0].style.transform = 'rotate(' + newCursorDegrees + 'deg)';
    }
  },
  methods: {
    userInput: function(actionObject) {
      if(this.actionHistory.length !== this.maxActions) {
        if(!this.blockUserInput) {
          this.executeAction(actionObject);
          if(actionObject.type === 'loop') {
            this.loopActivated = !this.loopActivated;
          }
          if(actionObject.value !== null) {
            this.loopActivated = false;
            this.actionHistory.push(actionObject);
          }
        }
      }
      else {
        this.$message({
          type: 'warning',
          message: 'Tu as atteint la limite d\'actions.<br>Appuie sur la poubelle en bas à droite pour recommencer !',
          dangerouslyUseHTMLString: true
        });
      }
    },
    move: function() {
      const moveInfo = this.moveInfo[this.direction];
      const currentPos = parseInt(this.actionTarget.style[moveInfo.property]);
      const canMove = this.canMove(moveInfo);
      if(canMove) {
        const moveAmount = moveInfo.amount;
        this.actionTarget.style[moveInfo.property] = currentPos + moveAmount + 'px';
        this.checkPosition();
      }
      else if(!this.backAndForthMoveHappening) {
        this.backAndForthMove(currentPos, moveInfo);
      }
    },
    backAndForthMove: function(originalPos, moveInfo) {
      // Store the previous block state to recover it after we're done
      const originalBlockState = this.blockUserInput;

      // Block moves to avoid the user moving while temporarily not in the grid
      this.blockUserInput = true;
      this.backAndForthMoveHappening = true;
      this.actionTarget.style[moveInfo.property] = originalPos + moveInfo.errorAmount + 'px';
      // Go back, set a low timeout to have a quick motion
      setTimeout(() => {
        this.actionTarget.style[moveInfo.property] = originalPos + 'px';
        this.blockUserInput = originalBlockState;
        this.backAndForthMoveHappening = false;
      }, 150);
    },
    canMove: function(moveInfo) {
      const currentRow = this.getGridPosition(this.actionTarget.style);
      const range = Array.from({length: 20}, (x, i) => i);
      if(!range.includes(currentRow)) {
        console.log('WTF');
        return false;
      }
      // If there is a wall on the side of the row we have to go to when moving
      if(this.tab[currentRow].wall.position[this.direction]) {
        return false;
      }

      const destinationCoordinates = JSON.parse(JSON.stringify(this.actionTarget.style));
      destinationCoordinates[moveInfo.property] =
        parseInt(destinationCoordinates[moveInfo.property]) + moveInfo.amount + 'px';
      const destinationRow = this.getGridPosition(destinationCoordinates);
      // If there is a wall when crossing the row we'll be at when moving
      if(this.tab[destinationRow].wall.position[moveInfo.opposite]) {
        return false;
      }

      return true;
    },
    rotate: function(degrees) {
      // TODO : Being able to change direction by degrees other than 90 or -90
      const mode = this.cursorDegrees < degrees ? 'clockwise' : 'counter-clockwise';
      this.direction = this.rotateDirection(mode);
      this.cursorDegrees = degrees;
    },
    rotateDirection: function(mode) {
      const currentDirectionIndex = this.directions.indexOf(this.direction);
      let newDirection;
      if(mode === 'clockwise') {
        if(currentDirectionIndex !== this.directions.length - 1) {
          newDirection = this.directions[currentDirectionIndex + 1];
        }
        else {
          newDirection = this.directions[0];
        }
      }
      else {
        if(currentDirectionIndex !== 0) {
          newDirection = this.directions[currentDirectionIndex - 1];
        }
        else {
          newDirection = this.directions[this.directions.length - 1];
        }
      }

      return newDirection;
    },
    executeAction: function(actionObject) {
      if(actionObject.type === 'move') {
        for(let i = 0; i < actionObject.count; i++) {
          this.move();
        }
      }
      else if(actionObject.type === 'directionChange') {
        if(actionObject.value === 'clockwise') {
          for(let i = 0; i < actionObject.count; i++) {
            this.rotate(this.cursorDegrees + 90);
          }
        }
        else {
          for(let i = 0; i < actionObject.count; i++) {
            this.rotate(this.cursorDegrees - 90);
          }
        }
      }
    },
    executeMoves: function() {
      this.reset('soft');
      this.actionTarget = this.gridElements.cursor;
      this.blockUserInput = true;
      const executeFunction = (times) => {
        const move = this.actionHistory[times];
        move.active = true;
        this.executeAction(move);
        if(times !== this.actionHistory.length - 1) {
          setTimeout(() => {
            move.active = false;
            executeFunction(times + 1);
          }, 300);
        }
        else {
          // This timeout is a little cooldown to be sure the goal is reached
          // It also feels more natural in case of a mistake
          setTimeout(() => {
            if(this.goalReached) {
              this.levelComplete();
            }
            else {
              this.tries++;
              this.reset('hard');
              this.blockUserInput = false;
            }
          }, 250);
        }
      };

      executeFunction(0);
    },
    levelComplete: function() {
      this.$store.commit({
        type: 'updateLevelScore',
        gameid: 'programming',
        levelid: this.levelid,
        score: this.levelData.expectedMoves - (this.actionHistory.length + this.tries)
      });
      setTimeout(() => {
        this.$router.push({ name: 'levelcomplete', params: { gameid: 'programming', levelid: this.levelid } });
      }, 250);
    },
    reset: function(mode) {
      this.cursorDegrees = 0;
      this.direction = 'up'; // TODO use the level data's initial direction
      this.actionTarget = this.gridElements.ghost;

      if(mode === 'hard') {
        this.gridElements.cursor.style =
          Object.assign(this.gridElements.cursor.style,
            this.calculatePosition(this.levelData.start));
        this.gridElements.ghost.style =
          Object.assign(this.gridElements.ghost.style,
            this.calculatePosition(this.levelData.start));
        this.gridElements.goal.style =
          Object.assign(this.gridElements.goal.style,
            this.calculatePosition(this.levelData.goal));

        this.actionHistory = [];
      }
    },
    checkPosition: function() {
      // We could do something for the ghost, too.
      if(this.getGridPosition(this.actionTarget.style) === parseInt(this.levelData.goal)) {
        // But right now, we only care about the actual cursor
        if(this.actionTarget === this.gridElements.cursor) {
          this.goalReached = true;
        }
        if(this.actionTarget === this.gridElements.ghost) {
          if(this.levelid === 'tutorial') {
            let introjs = introJs();
            let options =
              {
                doneLabel: 'OK'
              };
            options.steps = [
              {
                element: document.getElementById('exec-button'),
                intro: 'Bravo ! Tu as réussi à atteindre l\'objectif!<br>Appuie sur ce bouton pour valider et terminer le niveau'
              }
            ];
            introjs.setOptions(options);
            introjs.start();
          }
        }
      }
    },
    createWalls: function() {
      const columnTotal = this.columnCount * this.rowCount;
      let leftWalls = {};
      for(let i = 0; i <= this.rowCount; i++) {
        const row = 4 * i;
        leftWalls[row] = true;
      }

      let rightWalls = {};
      for(let i = 0; i <= this.rowCount; i++) {
        const row = 4 * i + 3;
        rightWalls[row] = true;
      }

      let upperWalls = {};
      for(let i = 0; i < 0 + this.columnCount - 1; i++) {
        upperWalls[i] = true;
      }

      let downWalls = {};
      for(let i = columnTotal - 1; i > (columnTotal - this.columnCount); i--) {
        downWalls[i] = true;
      }

      let walls = {};

      // Merge all objects
      // Must go custom because properties would be overwritten by subsequent walls if trying to merge them
      for(let i = 0; i < columnTotal; i++) {
        walls[i] = new Wall();
        if(leftWalls[i]) {
          walls[i].position.left = true;
        }
        if(rightWalls[i]) {
          walls[i].position.right = true;
        }
        if(upperWalls[i]) {
          walls[i].position.up = true;
        }
        if(downWalls[i]) {
          walls[i].position.down = true;
        }
      }

      merge(walls, this.levelData.walls);

      return walls;
    },
    getOriginalPieceBorders: function(wallPositions) {
      let borders = {};
      const style = '3px var(--accent-color-light) solid';
      if(wallPositions.left) {
        borders['border-left'] = style;
      }
      if(wallPositions.right) {
        borders['border-right'] = style;
      }
      if(wallPositions.up) {
        borders['border-top'] = style;
      }
      if(wallPositions.down) {
        borders['border-bottom'] = style;
      }

      return borders;
    },
    calculatePosition: function(gridPosition) {
      return {
        top: 30 + (100 * (Math.floor(gridPosition / 4))) + 'px',
        left: 25 + (100 * (gridPosition % 4)) + 'px'
      };
    },
    getGridPosition: function(coordinates) {
      const row = (parseInt(coordinates.top)) / 100 - 0.30;
      const column = (parseInt(coordinates.left)) / 100 - 0.25;
      return Math.round(row * this.rowCount + column);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .original-piece {
    display: block;
    float: left;
    width: 100px;
    height: 100px;
    box-sizing: border-box;
  }

  .grid-element {
    position: absolute;
    width: 48px;
    height: 48px;
    transition: all 0.25s ease-out;
  }

  #cursor, #ghost {
    background-image: url('../../../../static/assets/programming/cursor.png');
    z-index: 10;
    background-size: cover;
  }

  #goal {
    border-radius: 50%;
    background-color: var(--accent-color-dark);
    font-size: 32px;
    line-height: 45px;
    border: 2px rgba(0, 0, 0, 0.7) outset;
    box-shadow: 0 0 0 rgba(204,169,44, 0.4);
    animation: goal-pulse 1.5s infinite;
  }

  #ghost {
    opacity: 0.5;
  }

  #reset-button {
    color:white;
    font-size:18px;
  }

  .original-piece > img {
    height: 100px;
    width: 100px;
  }

  @keyframes goal-pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 153, 255, 0.7);
    }
    70% {
        box-shadow: 0 0 0 15px rgba(0, 153, 255, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(0, 153, 255, 0);
    }
  }

</style>
