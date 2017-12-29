import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import Menu from '@/components/Menu';
import GameIntro from '@/components/GameIntro';
import Cryptography from '@/components/games/cryptography/main';
import Programming from '@/components/games/programming/main';
import LevelIntro from '@/components/LevelIntro';
import LevelComplete from '@/components/LevelComplete';
import AboutArtist from '@/components/AboutArtist';
import AboutApp from '@/components/AboutApp';

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
      path: '/intro/:game',
      name: 'gameintro',
      component: GameIntro,
      props: true
    },
    {
      path: '/game/cryptography/:levelid',
      name: 'cryptography',
      component: Cryptography,
      props: true
    },
    {
      path: '/game/programming/:levelid',
      name: 'programming',
      component: Programming,
      props: true
    },
    {
      path: '/intro/:game/:levelid',
      name: 'levelintro',
      component: LevelIntro,
      props: true
    },
    {
      path: '/game/:game/:levelid/complete',
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
      path: '/about/:artistId',
      name: 'aboutartist',
      component: AboutArtist,
      props: true
    }
  ]
});
