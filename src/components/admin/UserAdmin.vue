<template>
  <div class="user-admin">
    <b-form>
      <input id="user-id" type="hidden" v-model="user.idUser" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              :readonly="mode === 'remove'"
              v-model="user.nameUser"
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
              v-model="user.profile"
              :options="optionsProfile"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Situação:" label-for="user-status">
            <b-form-select
              :readonly="mode === 'remove'"
              v-model="user.statusUser"
              :options="optionsStatus"
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
        { key: "idUser", label: "Código", sortable: true },
        { key: "nameUser", label: "Nome", sortable: true },
        { key: "email", label: "Email", sortable: true },
        {
          key: "profile",
          label: "Perfil",
          sortable: true /*,
          formatter: value =>
            value == "admin"
              ? "Administrador"
              : value == "zel"
              ? "Zelador"
              : value == "port"
              ? "porteiro"
              : "Não definido"
              */
        },
        { key: "statusUser", label: "Situação", sortable: true },
        { key: "actions", label: "Ações" }
      ],
      optionsProfile: [
        { value: undefined, text: "Selecione um perfil" },
        { value: "administrador", text: "Administrador" },
        { value: "zelador", text: "Zelador" },
        { value: "porteiro", text: "Porteiro" },
        { value: "condomino", text: "Condômino" }
      ],
      optionsStatus: [
        { value: undefined, text: "Selecione uma situação" },
        { value: "ativo", text: "Ativo" },
        { value: "inativo", text: "Inativo" }
      ]
    };
  },
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/getUsers`;
      axios
        .get(url)
        .then(res => {
          const { Items } = res.data;
          this.users = Items;
        })
        .catch(showError);
    },
    reset() {
      this.mode = "save"
      this.user = {}
      this.loadUsers()
    },
    save() {
      axios
        .post(`${baseApiUrl}/putUser`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError);
    },
    remove() {
      const id = {idUser: this.user.idUser};
      axios
        .post(`${baseApiUrl}/removeUser`, id)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(error => {
          showError(error)
        });
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