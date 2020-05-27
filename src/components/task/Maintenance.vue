<template>
  <div class="maintenance">
    <PageTitle icon="fa fa-wrench" main=" Manutenção" sub="Manutenções períodicas" />
    <b-table
      hover
      striped
      small
      responsive
      :tbody-tr-class="rowClass"
      :items="tasksModels"
      :fields="fields"
    ></b-table>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import moment from "moment";

export default {
  name: "Maintenance",
  components: { PageTitle },
  data: function() {
    return {
      tasksModels: [],
      fields: [
        { key: "title", label: "Título", sortable: true },
        { key: "frequency", label: "repete (dias)", sortable: true },
        {
          key: "lastFinish",
          label: "Última",
          sortable: true,
          formatter: value => {
            return this.formatterDate(value);
          }
        },
        {
          key: "nextFinish",
          label: "Próxima",
          sortable: true,
          formatter: value => {
            return this.formatterDate(value);
          }
        }
      ]
    };
  },
  methods: {
    loadTasksModels() {
      const url = `${baseApiUrl}/getTasksModels`;
      axios
        .get(url)
        .then(res => {
          const { Items } = res.data;
          this.tasksModels = Items;
        })
        .catch(error => {
          showError(error);
        });
    },
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.nextFinish == "") return;
      const dataAtual = new Date().toISOString().substring(0, 10);
      if (item.nextFinish === dataAtual) return "table-warning";
      if (item.nextFinish > dataAtual) return "table-success";
      if (item.nextFinish < dataAtual) return "table-danger";
    },
    formatterDate(value) {
      if (!value) return undefined;
      const data = moment(value);
      return data.format("DD/MM/YYYY");
    }
  },
  mounted() {
    this.loadTasksModels();
  }
};
</script>


<style>
</style>