<template>
  <div class="tasks">
    <PageTitle icon="fa fa-tasks" main=" Tarefas" sub="Tarefas a serem realizadas" />
    <b-table hover striped :items="tasksModels" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="primary" @click="checkTask(data.item)" class="mr-2">
          <i class="fa fa-check"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import { baseApiUrl, showSuccess } from "@/global";
import axios from "axios";

export default {
  name: "Task",
  components: { PageTitle },
  data: function() {
    return {
      tasksModels: [],
      fields: [
        { key: "title", label: "Título", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadTasksModels() {
      const url = `${baseApiUrl}/tasksmodels`;
      axios
        .get(url)
        .then(res => {
          this.tasksModels = res.data;
        })
        .catch(() => {
          this.tasksModels = [
            {
              id: 1,
              title: "Lavar caixa d'água",
              frequency: 90,
              lastFinish: "2020-01-02",
              nextFinish: "2020-01-02"
            },
            {
              id: 2,
              title: "Manutenção do portão eletrônico",
              frequency: 90,
              lastFinish: "2020-01-03",
              nextFinish: "2020-01-03"
            },
            {
              id: 3,
              title: "Limpar caixas de gordura",
              frequency: 90,
              lastFinish: "2020-01-04",
              nextFinish: "2020-01-04"
            },
            {
              id: 4,
              title: "Limpar janelas",
              frequency: 90,
              lastFinish: "2020-01-04",
              nextFinish: "2020-01-04"
            },
            {
              id: 5,
              title: "Limpar cobertura acrílica",
              frequency: 90,
              lastFinish: "2020-01-04",
              nextFinish: "2020-01-04"
            },
            {
              id: 6,
              title: "Podar ávores e grama",
              frequency: 90,
              lastFinish: "2020-01-04",
              nextFinish: "2020-01-04"
            },
            {
              id: 7,
              title: "Podar ávores e grama",
              frequency: 90,
              lastFinish: "2020-01-04",
              nextFinish: "2020-01-04"
            },
            {
              id: 8,
              title: "Podar ávores e grama",
              frequency: 90,
              lastFinish: "2020-01-04",
              nextFinish: "2020-01-04"
            },
            {
              id: 9,
              title: "Limpar cobertura acrílica",
              frequency: 90,
              lastFinish: "2020-01-04",
              nextFinish: "2020-01-04"
            },
            {
              id: 10,
              title: "Limpar cobertura acrílica",
              frequency: 90,
              lastFinish: "2020-01-04",
              nextFinish: "2020-01-04"
            }
          ];
        });
    },
    checkTask(task) {
      console.log(task);
      showSuccess();
    }
  },
  mounted() {
    this.loadTasksModels();
  }
};
</script>


<style>
</style>