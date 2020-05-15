<template>
  <div class="admin-pages">
    <PageTitle icon="fa fa-cogs" main=" Administração do Sistema" sub="Cadastros & Cia" />
    <div class="admin-pages-tabs">
      <b-card no-body>
        <!-- tag do bootStrao vue, tem documentacao na internet -->
        <b-tabs card>
          <b-tab title="Manutenções" active>
            <MaintenanceAdmin/>
          </b-tab>
          <b-tab title="Usuários">
            <UserAdmin/>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import MaintenanceAdmin from "./MaintenanceAdmin";
import UserAdmin from "./UserAdmin";

export default {
  name: "AdminPages",
  components: { PageTitle, MaintenanceAdmin, UserAdmin }
};
</script>

<style>
</style>