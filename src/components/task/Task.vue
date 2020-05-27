<template>
  <div class="tasks">
    <PageTitle icon="fa fa-tasks" main=" Tarefas" sub="Tarefas a serem realizadas" />
    <b-table hover striped :items="tasks" :fields="fields">
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
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "Task",
  components: { PageTitle },
  data: function() {
    return {
      tasks: [],
      fields: [
        { key: "title", label: "Título", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadTasks() {
      const url = `${baseApiUrl}/getTasks`;
      axios
        .get(url)
        .then(res => {
          const {Items} = res.data
          this.tasks = Items;
        })
        .catch(error => {
          showError(error)
        });
    },
    checkTask(task) {
      const id = {idTask : task.idTask};
      axios
        .post(`${baseApiUrl}/finishTask`, id)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.loadTasks();
        })
        .catch(error => {
          showError(error)
        });
    },
  },
  mounted() {
    this.loadTasks();
  }
};
</script>


<style>
</style>