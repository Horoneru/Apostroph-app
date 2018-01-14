<template>
  <double-pane-layout title="Apostroph" leftImage="../../static/assets/logo-accent-color.png" contentClasses="gradient-primary-color">
    <div slot="rightContent">
      <h2>Notre équipe</h2>
      <ul>
        <li>Quentin « <pre>Horoneru</pre> » Delpy <br><small><em>Développeur Full-Stack</em></small></li>
        <li>Thomas « <pre>el-macron</pre> »  Wils <br><small><em>Web-Designer / Graphiste</em></small></li>
        <li>Nicolaï « <pre>Nikiloma</pre> » Magniadas <br><small><em>Web-Designer</em></small></li>
        <li>Anthony « <pre>Sratuke</pre> » Buisson <br><small><em>Chargé de communication</em></small></li>
      </ul>
      <h2>À propos</h2>
      <p>L’agence a été créée pour la création d’une application pour la Fête du Code.</p>
    </div>
  </double-pane-layout>
</template>

<script>
import DoublePaneLayout from './DoublePaneLayout';
export default {
  name: 'AboutApp',
  components: { DoublePaneLayout }
};
</script>

<style scoped>
  pre {
    display: inline;
  }
</style>
