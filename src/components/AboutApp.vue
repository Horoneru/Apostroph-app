<template>
  <double-pane-layout title="Apostroph" leftImage="../../static/assets/logo-accent-color.png" contentClasses="gradient-primary-color">
    <div slot="rightContent">
      <div class="a-propos">
        <h2>À propos</h2>
          <p>L’agence a été créée pour la création d’une application pour la Fête du Code.</p>
      </div>
      <div class="equipe">
        <h2>Notre équipe</h2>
        <div class="first-line-equipe">
          <div>
            <h3>Quentin Delpy</h3>
            <p> « <pre>Horoneru</pre> » </p>
            <p><small><em>Développeur Full-Stack</em></small></p>
          </div>
          <div>
            <h3>Nicolaï Magniadas</h3>
            <p> « <pre>Niki Loma</pre> » </p> 
            <p><small><em>Web-Designer</em></small></p>
          </div>
        </div>
        <div class="second-line-equipe">
          <div>
            <h3>Thomas Wils</h3>
            <p> « <pre>Dalor</pre> » </p> 
            <p><small><em>Web-Designer / Graphiste</em></small></p>
          </div>
          <div>
            <h3>Anthony Buisson</h3>
            <p> « <pre>Sratuke</pre> » </p>
            <p><small><em>Chargé de communication</em></small></p>
          </div>
        </div>
      </div>
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

  .half-gutter {
      width: 80% !important;
  }

  .a-propos {
    line-height: 1.5rem;
    margin-bottom: 30px;
  }

  .first-line-equipe{
    width: 100%;
    height: 150px;
    margin-bottom: 50px;
  }

  .second-line-equipe{
    width: 100%;
    height: 150px;
  }

  .first-line-equipe div, .second-line-equipe div {
    display: inline-block;
    width: 49%; 
    height: auto;
  }

  .equipe {
    width: 100%;
  }

  .equipe h2 {
    line-height: 1rem;
    margin-top: 54px;
    margin-bottom: 10px;
  }

</style>
