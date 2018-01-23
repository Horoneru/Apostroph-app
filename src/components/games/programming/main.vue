<template>
  <div>
    <router-link style :to="{ name: 'levelselect', params: { gameid: 'programming' }}" class="el-icon-back back-button top-left-element">
    </router-link>
    <game-view :tools="tools" :artist="artist" :artwork="artwork" :tutorialMode="tutorialMode" :tutorialSteps="tutorialSteps">
      <div slot="playground" style="position:relative;height:500px;max-width:500px" class="p-5">
        <span v-for="el in tab" class="original-piece" :key="el.image"><img :src="el.image"></span>
        <span class="grid-element" id="cursor" :style="gridElements.cursor.style"></span>
        <span class="grid-element" id="ghost" :style="gridElements.ghost.style"></span>
        <span class="grid-element animated pulse infinite" id="goal" :style="gridElements.goal.style"></span>
      </div>
    </game-view>
    <el-row type="flex" justify="center" align="middle" id="timeline-container">
      <el-col :span="20">
        <programing-timeline-item v-for="(el, index) in moveHistory" :key="index" :index="index" :text="el.text" :icon="el.icon" :active="el.active"/>
      </el-col>
      <el-col :span="3" v-if="moveHistory.length !== 0">
        <el-button type="primary" @click="executeMoves">Exécuter</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GameView from '../GameView.vue';
import ProgramingTimelineItem from './ProgrammingTimelineItem';
import games from '../../../service/GameProvider';
import validators from '../../../service/ValidatorProvider';
import utils from '../../../utils/utils';
import Wall from '../../../entity/Wall';
import merge from 'lodash-es/merge';
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
  name: 'Programming',
  data () {
    return {
      tutorialMode: false,
      setupInit: false,
      tutorialSteps: [
        {
          element: 'playgroundStage',
          text: 'Voici une oeuvre.<br>' +
          'Ce jeu te permet de naviguer à l\'intérieur de celle-ci !'
        },
        {
          element: 'toolbar',
          text: 'Tu peux avancer dans l\'oeuvre en utilisant le bouton directionnel ici !'
        },
        {
          element: null,
          text: 'Essaie d\'avancer 4 fois, puis appuies sur le bouton bleu "exécuter"'
        },
        {
          element: null,
          text: 'À toi de jouer !'
        }
      ],
      tools: [
        {
          icon: '../../../../static/assets/programming/up-arrow.png',
          style: {
            transform: null,
            transition: 'transform 0.25s ease-out'
        },
          action: () => {
            if(!this.moving) {
              this.move();
              this.moveHistory.push({
                type: 'move',
                value: this.$data.direction,
                text: this.$data.direction,
                icon: '../../../../static/assets/programming/' + this.$data.direction + '-arrow.png',
                active: false
              });
            }
          }
        },
        {
          icon: '../../../../static/assets/programming/rotate-clockwise.png',
          action: () => {
            if(!this.moving) {
              this.rotate(this.cursorDegrees + 90);
              this.moveHistory.push({
                type: 'directionChange',
                value: 'clockwise',
                text: 'rotate',
                icon: '../../../../static/assets/programming/rotate-clockwise.png',
                active: false
              });
        }
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
      useErrorAmount: false,
      moveTarget: null,
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
      moveHistory: [],
      cursorDegrees: 0,
      goalReached: false
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

    if(this.levelData.mixins.created) {
      this.levelData.mixins.created(this);
    }

    this.tools[0].style.transform = 'rotate(' + this.cursorDegrees + ' deg)';

    this.moveTarget = this.gridElements.ghost;

    this.reset('hard');
  },
  watch: {
    moveTarget: function(newMoveTarget, oldMoveTarget) {
      if(oldMoveTarget) {
        oldMoveTarget.style.transform = 'rotate(0deg)';
      }
      newMoveTarget.style.transform = 'rotate(' + this.cursorDegrees + 'deg)';

      if(oldMoveTarget === this.gridElements.ghost) {
        this.gridElements.ghost.style.opacity = '0';
    }
      else if(newMoveTarget === this.gridElements.ghost) {
        this.gridElements.ghost.style.opacity = '0.5';
      }
  },
    cursorDegrees: function(newCursorDegrees, oldCursorDegrees) {
      this.moveTarget.style.transform = 'rotate(' + newCursorDegrees + 'deg)';
      this.tools[0].style.transform = 'rotate(' + newCursorDegrees + 'deg)';
    }
  },
  methods: {
    move: function() {
      // Locking the moves so that there is at least a bit of cooldown
      this.moving = true;

      const moveInfo = this.moveInfo[this.direction];
      const currentPos = parseInt(this.moveTarget.style[moveInfo.property]);
      // If the errorAmount flag is set, use it
      const canMove = !this.useErrorAmount ? this.canMove() : false;
      const moveAmount = canMove ? moveInfo.amount : moveInfo.errorAmount;
      this.moveTarget.style[moveInfo.property] = currentPos + moveAmount + 'px';

      // Cooldown reset
      setTimeout(() => {
        if(!canMove && !this.useErrorAmount) {
          // Go back to the other direction
          this.direction = this.moveInfo[this.direction].opposite;
          // Flag that we should move back with the little move
          this.useErrorAmount = true;
          this.move();
          // Reset the flag. We did the back and forth move
          this.useErrorAmount = false;
        }
        this.moving = false;
        this.checkPosition();
      }, 0);
    },
    canMove: function() {
      return true;
    },
    rotate: function(degrees) {
      const mode = degrees > 0 ? 'clockwise' : 'counter-clockwise';
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
    executeMoves: function() {
      this.reset('soft');
      this.moveTarget = this.gridElements.cursor;

      const executeFunction = (times) => {
        const move = this.moveHistory[times];
        move.active = true;
        if(move.type === 'directionChange') {
          if(move.value === 'clockwise') {
            this.rotate(this.cursorDegrees + 90);
          }
          else {
            this.rotate(this.cursorDegrees - 90);
          }
        }
        else if(move.type === 'move') {
        this.move();
        }
        else if(move.type === 'loop') {
          // TODO do loop logic !
        }
        if(times !== this.moveHistory.length - 1) {
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
              setTimeout(() => {
                this.$router.push({ name: 'levelcomplete', params: { gameid: 'programming', levelid: this.levelid } });
              }, 250);
            }
            else {
              this.reset('hard');
            }
          }, 250);
        }
      };

      executeFunction(0);
    },
    reset: function(mode) {
      this.cursorDegrees = 0;
      this.direction = 'up'; // TODO use the level data's initial direction
      this.moveTarget = this.gridElements.ghost;

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

        this.moveHistory = [];
      }
    },
    checkPosition: function() {
      // We could do something for the ghost, too.
      if(this.getGridPosition(this.moveTarget.style) === parseInt(this.levelData.goal)) {
        // But right now, we only care about the actual cursor
        if(this.moveTarget === this.gridElements.cursor) {
          this.goalReached = true;
        }
      }
    },
    createWalls: function() {
      const columnTotal = this.columnCount * this.rowCount;
      let leftWalls = {};
      for(let i = 0; i <= this.rowCount; i++) {
        const row = 4 * i;
        if(!utils.isObject(leftWalls[row])) {
          leftWalls[row] = new Wall();
        }

        leftWalls[row].position.left = true;
      }

      let rightWalls = {};
      for(let i = 0; i <= this.rowCount; i++) {
        const row = 4 * i + 3;
        if(!utils.isObject(rightWalls[row])) {
          rightWalls[row] = new Wall();
        }

        rightWalls[row].position.right = true;
      }

      let upperWalls = {};
      for(let i = 0; i < 0 + this.columnCount - 1; i++) {
        if(!utils.isObject(upperWalls[i])) {
          upperWalls[i] = new Wall();
        }

        upperWalls[i].position.up = true;
      }

      let downWalls = {};
      for(let i = columnTotal - 1; i > (columnTotal - this.columnCount); i--) {
        if(!utils.isObject(downWalls[i])) {
          downWalls[i] = new Wall();
        }

        downWalls[i].position.down = true;
      }

      // Merge all objects
      let walls = merge({}, downWalls, rightWalls, upperWalls, leftWalls);

      // TODO Fetch and merge the level data's additional walls

      // Object with id with walls as properties
      return walls;
    },
    calculatePosition: function(gridPosition) {
      return {
        top: 100 + (100 * (Math.floor(gridPosition / 4))) + 'px',
        left: 75 + (100 * (gridPosition % 4)) + 'px'
      };
    },
    getGridPosition: function(coordinates) {
      const row = (parseInt(coordinates.top)) / 100 - 1;
      const column = (parseInt(coordinates.left)) / 100 - 0.75;
      return row * this.rowCount + column;
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
  }

  .grid-element {
    position: absolute;
    width: 48px;
    height: 48px;
    transition: all 0.25s ease-out;
  }

  #cursor, #ghost {
    background-image: url('../../../../static/assets/programming/cursor.png');
  }

  #goal {
    background-image: url('../../../../static/assets/programming/goal.png');
  }

  #ghost {
    opacity: 0.5;
  }

  #timeline-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.6);
    margin: auto;
  }

</style>
