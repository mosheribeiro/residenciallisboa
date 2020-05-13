<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible}">
    <Header title="Residencial Lisboa" 
      :hideToggle="false"
      :hideUserDropdown="false" />
    <Menu />
    <Content />
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "./components/template/Header";
import Menu from "./components/template/Menu";
import Content from "./components/template/Content";
import Footer from "./components/template/Footer";

export default {
  name: "App",
  components: { Header, Menu, Content, Footer },
  computed: mapState(['isMenuVisible'])
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}
.body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased; /*propriedade css */
  -moz-osx-font-smoothing: grayscale; /*propriedade css */

  height: 100vh; /* divide a altura em 100 partes logo essa divide está ocupando toda a tela*/
  display: grid;
  grid-template-rows: 60px 1fr 40px; /*3 linhas: header/conteudo/footer */
  grid-template-columns: 300px 1fr; /* 2 colunas:  menu/resto*/
  grid-template-areas: /**organiza as areas dentro do grid 3x2 */
    "header header" /*1 linha: vai ocupar de ponta a ponta, ou seja as 2 colunas*/
    "menu content" /*2 linha: 1 coluna para o menu e a 2 coluna para o conteudo*/
    "menu footer"; /**3 linha: 1 coluna para o menu e a 2 coluna para o footer */
}

#app.hide-menu{
  grid-template-areas: 
  "header header"
  "content content"
  "footer footer";
}
</style>