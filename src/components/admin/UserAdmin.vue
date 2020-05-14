<template>
  <div class="user-admin">
    <b-form>
      <input id="user-id" type="hidden" v-model="user.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              :readonly="mode === 'remove'"
              v-model="user.name"
              required
              placeholder="Informe o Nome do Usuário..."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Email:" label-for="user-email">
            <b-form-input
              id="user-email"
              type="text"
              :readonly="mode === 'remove'"
              v-model="user.email"
              required
              placeholder="Informe o Email do Usuário..."
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Perfil:" label-for="user-perfil">
            <b-form-select
              :readonly="mode === 'remove'"
              v-model="selected"
              :options="optionsProfile"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="mode === 'save'">
        <b-col md="6" sm="12">
          <b-form-group label="Senha:" label-for="user-password">
            <b-form-input
              id="user-password"
              type="password"
              v-model="user.password"
              required
              placeholder="Informe a Senha do Usuário..."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Confirmação de senha:" label-for="user-confirm-password">
            <b-form-input
              id="user-confirm-password"
              type="password"
              v-model="user.confirmPassword"
              required
              placeholder="Confirme a Senha do Usuário..."
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
    <b-table hover striped :items="users" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadUser(data.item, 'remove')">
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
  name: "UserAdmin",
  data: function() {
    return {
      mode: "save",
      user: {},
      users: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "Email", sortable: true },
        {
          key: "profile",
          label: "Perfil",
          sortable: true,
          formatter: value =>
            value == "admin"
              ? "Administrador"
              : value == "zel"
              ? "Zelador"
              : value == "port"
              ? "porteiro"
              : "Não definido"
        },
        { key: "actions", label: "Ações" }
      ],
      selected: null,
      optionsProfile: [
        { value: null, text: "Selecione um perfil" },
        { value: "admin", text: "Administrador" },
        { value: "zel", text: "Zelador" },
        { value: "port", text: "Porteiro" },
        { value: "cond", text: "Condômino" }
      ]
    };
  },
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios
        .get(url)
        .then(res => {
          this.users = res.data;
        })
        .catch(() => {
          this.users = [
            {
              id: 1,
              name: "Moshe Ribeiro",
              email: "mosheribeiro01@gmail.com",
              profile: "admin"
            },
            {
              id: 2,
              name: "Roberto ....",
              email: "roberto@gmail.com",
              profile: "zel"
            },
            {
              id: 3,
              name: "Seu joão....",
              email: "roberto@gmail.com",
              profile: "port"
            },
            {
              id: 4,
              name: "Seu Carlos....",
              email: "roberto@gmail.com",
              profile: "port"
            },
            {
              id: 5,
              name: "Jacelís....",
              email: "roberto@gmail.com",
              profile: "admin"
            },
            {
              id: 6,
              name: "Moshe Ribeiro",
              email: "mosheribeiro01@gmail.com",
              profile: "admin"
            },
            {
              id: 7,
              name: "Roberto ....",
              email: "roberto@gmail.com",
              profile: "zelador"
            },
            {
              id: 8,
              name: "Seu joão....",
              email: "roberto@gmail.com",
              profile: "port"
            },
            {
              id: 9,
              name: "Seu Carlos....",
              email: "roberto@gmail.com",
              profile: "port"
            },
            {
              id: 10,
              name: "Jacelís....",
              email: "roberto@gmail.com",
              profile: "admin"
            }
          ];
        });
    },
    reset() {
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },
    save() {
      const method = this.user.id ? "put" : "post";
      const id = this.user.id ? `/${this.user.id}` : "";
      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.user.id;
      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
    }
  },
  mounted() {
    this.loadUsers();
  }
};
</script>

<style>
</style>