<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main=" Painel de Controle" sub="Residencial Lisboa" />
    <div class="stats">
      <Stat title="Manutenções" :value="stat.maintenanceCount" icon="fa fa-wrench" color="#d54d50" />
      <Stat title="Tarefas" :value="stat.taskCount" icon="fa fa-tasks" color="#3bc480" />
      <Stat title="Usuários" :value="stat.userCount" icon="fa fa-user" color="#3282cd" />
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Stat from "./Stat";
import axios from "axios";
import { baseApiUrl, showError } from "@/global";

export default {
  name: "Home",
  components: { PageTitle, Stat },
  data: function() {
    return {
      stat: {}
    };
  },
  methods: {
    getStats() {
      axios
        .get(`${baseApiUrl}/getStat`)
        .then(res => {
          this.stat = res.data
          })
        .catch(showError);
    }
  },
  mounted() {
    this.getStats()
  }
};
</script>

<style>
  .stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>