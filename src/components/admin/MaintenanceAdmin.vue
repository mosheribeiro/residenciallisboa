<template>
  <div class="taskModel-admin">
    <b-form>
      <input id="taskModel-id" type="hidden" v-model="taskModel.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Título:" label-for="taskModel-title">
            <b-form-input
              id="taskModel-title"
              type="text"
              :readonly="mode === 'remove'"
              v-model="taskModel.title"
              required
              placeholder="Informe o título da tarefa..."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Periodicidade:" label-for="taskModel-frequency">
            <b-form-input
              id="taskModel-frequency"
              type="number"
              :readonly="mode === 'remove'"
              v-model="taskModel.frequency"
              required
              placeholder="0"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Última realização:" label-for="taskModel-lastFinish">
            <b-form-input
              id="taskModel-lastFinish"
              type="date"
              :readonly="mode === 'remove'"
              required
              v-model="taskModel.lastFinish"
              placeholder=""
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr />
    <b-table hover striped :items="tasksModels" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadTaskModel(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadTaskModel(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  title: "taskModelAdmin",
  data: function() {
    return {
      mode: "save",
      taskModel: {},
      tasksModels: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "title", label: "Título", sortable: true },
        { key: "frequency", label: "repete (dias)", sortable: true },
        { key: "lastFinish", label: "Última realização", sortable: true },
        { key: "nextFinish", label: "Próxima", sortable: true },
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
              lastFinish:  '2020-01-03',
              nextFinish: '2020-01-03'
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
    reset() {
      this.mode = "save";
      this.taskModel = {};
      this.loadTasksModels();
    },
    save() {
      const method = this.taskModel.id ? "put" : "post";
      const id = this.taskModel.id ? `/${this.taskModel.id}` : "";
      axios[method](`${baseApiUrl}/tasksModels${id}`, this.taskModel)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.taskModel.id;
      axios
        .delete(`${baseApiUrl}/tasksModels/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadTaskModel(taskModel, mode = "save") {
      this.mode = mode;
      this.taskModel = { ...taskModel };
    }
  },
  mounted() {
    this.loadTasksModels();
  }
};
</script>

<style>
</style>