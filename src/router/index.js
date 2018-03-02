import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import Menu from '@/components/Menu';
import GameIntro from '@/components/GameIntro';
import LevelSelect from '@/components/LevelSelect';
import Cryptography from '@/components/games/cryptography/main';
import Programming from '@/components/games/programming/main';
import LevelIntro from '@/components/LevelIntro';
import LevelComplete from '@/components/LevelComplete';
import AboutArtist from '@/components/AboutArtist';
import AboutApp from '@/components/AboutApp';
import Thankyou from '@/components/Thankyou';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/:gameid/intro',
      name: 'gameintro',
      component: GameIntro,
      props: true
    },
    {
      path: '/:gameid/levels',
      name: 'levelselect',
      component: LevelSelect,
      props: true
    },
    {
      path: '/cryptography/:levelid',
      name: 'cryptography',
      component: Cryptography,
      props: true
    },
    {
      path: '/programming/:levelid',
      name: 'programming',
      component: Programming,
      props: true
    },
    {
      path: '/:gameid/:levelid/intro',
      name: 'levelintro',
      component: LevelIntro,
      props: true
    },
    {
      path: '/:gameid/:levelid/complete',
      name: 'levelcomplete',
      component: LevelComplete,
      props: true
    },
    {
      path: '/about/app',
      name: 'aboutapp',
      component: AboutApp
    },
    {
      path: '/about/:artistid',
      name: 'aboutartist',
      component: AboutArtist,
      props: true
    },
    {
      path: '/thankyou/:context',
      name: 'thankyou',
      component: Thankyou,
      props: true
    }
  ]
});
