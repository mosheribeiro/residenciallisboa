<template>
  <div class="maintenance">
    <PageTitle icon="fa fa-wrench" main=" Manutenção" sub="Manutenções períodicas" />
    <b-table hover striped :items="tasksModels" :fields="fields"></b-table>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "Maintenance",
  components: { PageTitle },
  data: function() {
    return {
      tasksModels: [],
      fields: [
        { key: "title", label: "Título", sortable: true },
        { key: "frequency", label: "repete (dias)", sortable: true },
        { key: "lastFinish", label: "Última realização", sortable: true },
        { key: "nextFinish", label: "Próxima", sortable: true }
      ]
    };
  },
  methods: {
    loadTasksModels() {
      const url = `${baseApiUrl}/getTasksModels`;
      axios
        .get(url)
        .then(res => {
           const {Items} = res.data
          this.tasksModels = Items;
        })
        .catch(error => {
          showError(error);
        });
    }
  },
  mounted() {
    this.loadTasksModels();
  }
};
</script>


<style>
</style>