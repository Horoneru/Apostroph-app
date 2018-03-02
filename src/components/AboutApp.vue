<template>
  <double-pane-layout title="Apostroph" leftImage="../../static/assets/logo-accent-color.png" contentClasses="gradient-primary-color" :useGutter="false">
    <div slot="rightContent">
      <div id="a-propos">
        <h2>À propos</h2>
          <p>L’agence s'est formée en regroupant plusieurs talents afin de créer une application pour la Fête du Code.</p>
          <p>L'idée était simple : avoir une application pédagogique permettant aux visiteurs de cette fête d'apprendre le code en s'amusant.</p>
          <p>Nous espérons que vous appréciez le fruit de cette idée !</p>
      </div>
      <div id="equipe">
        <h2>Notre équipe</h2>
        <el-row type="flex" :gutter="1" justify="center" class="mb-4">
          <el-col v-ripple :span="10" class="team-col">
            <h3>Quentin Delpy « <pre>Horoneru</pre> »</h3>
            <p><small><em>Développeur Full-Stack / Chef de projet</em></small></p>
            <a href="https://github.com/Horoneru" target="_blank">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAA3lBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ymXGKAAAASXRSTlMAAQIDBAgLExQVFxgaHB4gIiMlJikqLC8yMzU4OTo8SUpLT2RnaGltb3l/goOLjJedoqWmqqvAwcXIys7R1dne4uTm6O3v8fv9ok7bawAAAOZJREFUGBmFweVaAkEAQNE77KqrWIjY3d3dGOB9/xdyXPlw8I/n0JUP1uuDOX/NXFi6mCE1cGPXzQBd020T7Wk6av4xTqmvpcONK0tXjWFt9fHtQJ+BoRzyIeBZ94n61XcS72o/sKLekbhXl4FLdYxETb0EmmogEdQXwIgeRoBRhUSmfgJPapVEVX0E9tQjEofqLjBltJ3RUdkymgTCW2tkx4/1UaKJzQ+jZiBa9CE/1lWiNUtzlM7cCAuzGVHVbyf8yG6dDyEQFUbXFTqyc7UgKtTTCr+WXi2ICl8X6RFqgShMBP7xBZRbOTwGf+zFAAAAAElFTkSuQmCC">
            </a>
          </el-col>
          <el-col v-ripple :span="10" class="team-col">
            <h3>Thomas Wils « <pre>Dalor</pre> » </h3>
            <p><small><em>Web-Designer / Graphiste</em></small></p>
            <a href="https://thomas-wils.artstation.com/resume">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABYlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8kSK3AAAAAdXRSTlMAAQIDBAUGBwgJCgsMDQ4PEBETFhccHh8gISMkJiouLzI0NTc4Ojs9PkBBREtOT1hbXV5iZmlsb3Bxc3V3eXx+f4CCg4iLjJGUlZeam52io6WmqKuvtLW3ubq8vsDBw8XHyMrMztze4OLo6evt7/Hz9ff5+/15j0XGAAABSElEQVQYGQXBCSPTAQAH0PcfptXWQeWodKgodF+kQwfdp6VTRUsmNtrv+/ceQGX86ffN3/VbQwUA6L2XpJ3sJGunADDcyurlfcXDDOw938jrLoCxJJ2MKaZK1FayWgYGkyRLKmBXkqUCev7+WU+SydwBD5LMwHQG6kmSpAp7/iWpUu48t5wk2T4GXEgyx2gOWU6SRh+g2E5azO8UribJUQArSfp9rVPOVDF4CcDnJCOaC3i1AACLSSZsPEZl9QwAbieZ8G0RSi8flQAcSDJifgO40rh+92Y3cGIx/UbTB0wmaZ4EZluUO7PA6STJSg1drTlMpwYWkiR5g2upoWdzuQRnkyQZ4nBmwGBeFHAxSZ5wcOtjAYzlUxXeJ+9Kxnd+lQGOtDs39utuZX338S952wVA7/2k+SNpJ2ujAEDl3LOfW2sfZoYLwH93hmJct+vVwwAAAABJRU5ErkJggg==">
            </a>
            <a href="https://www.linkedin.com/in/thomas-wils-89a83912a">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAilBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2N2iNAAAALXRSTlMAAQIDCw8QEhMVJCw1OEJDREVRYmdreHl/iJWam52esLnAw8rT4uTm8fX5+/3Y0S+AAAAAoUlEQVQoz3XQRxLCQBAEwcIt3nuEkxiMdun/f48bEUhDHTtvDUzzqJ9iPgHI5HSAmdwmFD7kJOnea46rEJG0AK5VQdISuHlQjroreeCGpGMIQe8QQngOm7S3X9gBEkAHgHUdaDSAVqrBIJZ94FKDh7QB9jWQlAE7D05VeP+D9A9iFZIPkUJ6mZlkZiapNLOXlDP3P5zC2dszgHmRftdUzOADb4ZH2zx82ZIAAAAASUVORK5CYII=">
            </a>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="1" justify="center">
          <el-col v-ripple :span="10" class="team-col">
            <h3>Nicolaï Magniadas « <pre>Niki Loma</pre> »</h3>
            <p><small><em>Web-Designer</em></small></p>
            <a href="http://www.nicolai-magniadas.fr/">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABYlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8kSK3AAAAAdXRSTlMAAQIDBAUGBwgJCgsMDQ4PEBETFhccHh8gISMkJiouLzI0NTc4Ojs9PkBBREtOT1hbXV5iZmlsb3Bxc3V3eXx+f4CCg4iLjJGUlZeam52io6WmqKuvtLW3ubq8vsDBw8XHyMrMztze4OLo6evt7/Hz9ff5+/15j0XGAAABSElEQVQYGQXBCSPTAQAH0PcfptXWQeWodKgodF+kQwfdp6VTRUsmNtrv+/ceQGX86ffN3/VbQwUA6L2XpJ3sJGunADDcyurlfcXDDOw938jrLoCxJJ2MKaZK1FayWgYGkyRLKmBXkqUCev7+WU+SydwBD5LMwHQG6kmSpAp7/iWpUu48t5wk2T4GXEgyx2gOWU6SRh+g2E5azO8UribJUQArSfp9rVPOVDF4CcDnJCOaC3i1AACLSSZsPEZl9QwAbieZ8G0RSi8flQAcSDJifgO40rh+92Y3cGIx/UbTB0wmaZ4EZluUO7PA6STJSg1drTlMpwYWkiR5g2upoWdzuQRnkyQZ4nBmwGBeFHAxSZ5wcOtjAYzlUxXeJ+9Kxnd+lQGOtDs39utuZX338S952wVA7/2k+SNpJ2ujAEDl3LOfW2sfZoYLwH93hmJct+vVwwAAAABJRU5ErkJggg==">
            </a>
            <a href="https://www.linkedin.com/in/nicolaï-magniadas-2b8906141">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAilBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2N2iNAAAALXRSTlMAAQIDCw8QEhMVJCw1OEJDREVRYmdreHl/iJWam52esLnAw8rT4uTm8fX5+/3Y0S+AAAAAoUlEQVQoz3XQRxLCQBAEwcIt3nuEkxiMdun/f48bEUhDHTtvDUzzqJ9iPgHI5HSAmdwmFD7kJOnea46rEJG0AK5VQdISuHlQjroreeCGpGMIQe8QQngOm7S3X9gBEkAHgHUdaDSAVqrBIJZ94FKDh7QB9jWQlAE7D05VeP+D9A9iFZIPkUJ6mZlkZiapNLOXlDP3P5zC2dszgHmRftdUzOADb4ZH2zx82ZIAAAAASUVORK5CYII=">
            </a>
          </el-col>
          <el-col v-ripple :span="10" class="team-col">
            <h3>Anthony Buisson « <pre>Sratuke</pre> » </h3>
            <p><small><em>Chargé de communication</em></small></p>
            <a href="https://twitter.com/Sratuke" target="_blank">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAxlBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////DTx3aAAAAQXRSTlMAAQIDBAUICQoOEBIVGBwfICIkJSYqLS80NTdKTVBRVlljZnN1e4KOm56gpqqtsrzFyszR1dfZ3uTm6Ovx8/f5/XVXBq8AAAC0SURBVBgZpcFrI8JQAMfh32EauYQIkYl0Y+RSojL/7/+l7Gxna7WXPQ+bOg2COjEDHJGrjBQbHTSfPOC1i2PelYrOKsBcA49EU854fAx8SNNLrEc50TmxtmKT1r6hK6eH5X0p8fc5lfOA9dzRugArVEkD60QlOyRutCYkZRpvWlEjtfWjFS9kDhcqWOyS8zsT5S4oMPfKtFiq3n7L+b0is9fXUs+noHoXRpJmw2ufErNt2NQ/aZ8/fy6bEvQAAAAASUVORK5CYII=">
            </a>
            <a href="https://www.twitch.tv/sratuke">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAARVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////9SnXPCAAAAFnRSTlMABBUXHR4jJCotMTc4QEJ3ytni9fn9abIumQAAAFhJREFUKM/NzzcSgEAQA8HBe3dG/38qKRS7BSETqiMBq54FgN2BUg5sHkQP9AYjSGoofgXffhwOxMqGVGNC7rBhwIYJG1auBUlKDY+CpNxiQ2/szMtS35cTDf0iXI+iD+IAAAAASUVORK5CYII=">
            </a>
            <a href="https://fr.linkedin.com/in/abuisson93" target="_blank">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAilBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2N2iNAAAALXRSTlMAAQIDCw8QEhMVJCw1OEJDREVRYmdreHl/iJWam52esLnAw8rT4uTm8fX5+/3Y0S+AAAAAoUlEQVQoz3XQRxLCQBAEwcIt3nuEkxiMdun/f48bEUhDHTtvDUzzqJ9iPgHI5HSAmdwmFD7kJOnea46rEJG0AK5VQdISuHlQjroreeCGpGMIQe8QQngOm7S3X9gBEkAHgHUdaDSAVqrBIJZ94FKDh7QB9jWQlAE7D05VeP+D9A9iFZIPkUJ6mZlkZiapNLOXlDP3P5zC2dszgHmRftdUzOADb4ZH2zx82ZIAAAAASUVORK5CYII=">
            </a>
          </el-col>
        </el-row>
      </div>
    </div>
  </double-pane-layout>
</template>

<script>
import DoublePaneLayout from './DoublePaneLayout';
import Ripple from 'fi-ripple';
export default {
  name: 'AboutApp',
  components: { DoublePaneLayout },
  directives: { Ripple }
};
</script>

<style scoped>
  pre {
    display: inline;
    font-size: 11px;
    font-weight: normal;
  }

  #a-propos {
    line-height: 1.5rem;
    max-width: 95%;
    margin: auto;
  }

  #equipe {
    line-height: 1rem;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .team-col {
    background-color: rgba(0, 0, 0, 0.1);
    margin-left: 10px;
    margin-right: 10px;
    transition: all 0.3s ease-out;
    padding-bottom: 10px;
  }

  .team-col:hover, .team-col:focus {
    background-color: rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }

  h3 {
    font-size: 16px;
  }

</style>
