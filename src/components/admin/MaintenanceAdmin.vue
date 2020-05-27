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
          <b-form-group label="Última:" label-for="taskModel-lastFinish">
            <b-form-input
              id="taskModel-lastFinish"
              type="date"
              :readonly="mode === 'remove'"
              required
              v-model="taskModel.lastFinish"
              placeholder
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Próxima:" label-for="taskModel-nextFinish">
            <b-form-input
              id="taskModel-nextFinish"
              type="date"
              :readonly="mode === 'remove'"
              required
              v-model="taskModel.nextFinish"
              placeholder
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
    <b-table
      hover
      :tbody-tr-class="rowClass"
      striped
      small
      responsive
      :items="tasksModels"
      :fields="fields"
    >
      <template v-slot:cell(actions)="row">
        <b-button size="sm" variant="warning" @click="loadTaskModel(row.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button size="sm" variant="danger" @click="loadTaskModel(row.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import moment from "moment";

export default {
  title: "taskModelAdmin",
  data: function() {
    return {
      mode: "save",
      taskModel: {},
      tasksModels: [],
      fields: [
        { key: "title", label: "Título", sortable: true },
        { key: "frequency", label: "repete (dias)", sortable: true },
        {
          key: "lastFinish",
          label: "Última realização",
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
        },
        { key: "actions", label: "Ações" }
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
    reset() {
      this.mode = "save";
      this.taskModel = {};
      this.loadTasksModels();
    },
    save() {
      axios
        .post(`${baseApiUrl}/putTaskModel`, this.taskModel)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(error => {
          console.log(error);
        });
    },
    remove() {
      const id = { idTaskModel: this.taskModel.idTaskModel };
      axios
        .post(`${baseApiUrl}/removeTaskModel`, id)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(error => {
          showError(error);
        });
    },
    loadTaskModel(taskModel, mode = "save") {
      this.mode = mode;
      this.taskModel = { ...taskModel };
    },
    formatterDate(value) {
      if (!value) return undefined;
      const data = moment(value);
      return data.format("DD/MM/YYYY");
    },
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.nextFinish == "") return;
      const dataAtual = new Date().toISOString().substring(0, 10);
      if (item.nextFinish === dataAtual) return "table-warning";
      if (item.nextFinish > dataAtual) return "table-success";
      if (item.nextFinish < dataAtual) return "table-danger";
    }
  },
  mounted() {
    this.loadTasksModels();
  }
};
</script>

<style>
</style>