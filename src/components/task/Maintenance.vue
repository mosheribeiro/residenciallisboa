<template>
  <div class="maintenance">
    <PageTitle icon="fa fa-wrench" main=" Manutenção" sub="Manutenções períodicas" />
    <b-navbar-nav class="ml-auto">
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" placeholder="Digite aqui"></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" variant="primary">
          <i class="fa fa-search" /> Pesquisar
        </b-button>
      </b-nav-form>
    </b-navbar-nav>

    <b-table hover striped :items="tasksModels" :fields="fields"></b-table>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "Maintenance",
  components: { PageTitle },
  data: function() {
    return {
      tasksModels: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "title", label: "Título", sortable: true },
        { key: "frequency", label: "repete (dias)", sortable: true },
        { key: "lastFinish", label: "Última realização", sortable: true },
        { key: "nextFinish", label: "Próxima", sortable: true }
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
    }
  },
  mounted() {
    this.loadTasksModels();
  }
}
</script>


<style>
</style>