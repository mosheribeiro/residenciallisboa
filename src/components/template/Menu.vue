<template>
  <aside class="menu" v-show="isMenuVisible">
    <b-nav vertical>
      <b-nav-item to="/">
        <i class="fa fa-home" /> Painel de controle
      </b-nav-item>      
      <b-nav-item to="/task/maintenance">
        <i class="fa fa-wrench" /> Manutenções
      </b-nav-item>
      <b-nav-item to="/task/task">
        <i class="fa fa-tasks" /> Tarefas
      </b-nav-item>
    </b-nav>
  </aside>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Menu",
  computed: mapState(["isMenuVisible"]) //função que mapea as propriedades da store
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.menu a,
.menu a:hover {
  color: #fff;
  text-decoration: none;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>