<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main=" Painel de Controle" sub="Residencial Lisboa" />
    <div class="stats">
      <Stat title="Manutenções" :value="stat.maintenance" icon="fa fa-folder" color="#d54d50" />
      <Stat title="Tarefas" :value="stat.tasks" icon="fa fa-file" color="#d54d50" />
      <Stat title="Usuários" :value="stat.users" icon="fa fa-user" color="#3282cd" />
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Stat from "./Stat";
import axios from "axios";
import { baseApiUrl } from "@/global";

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
        .get(`${baseApiUrl}/stats`)
        .then(res => {
          console.log("entrou no then")
          this.stat = res.data
          })
        .catch(() => {
          console.log("entrou no catch")
          this.stat = {
            maintenance: 150,
            tasks: 80,
            users: 20
          };
        });
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