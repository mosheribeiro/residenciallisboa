<template>
  <div class="admin-pages">
    <PageTitle icon="fa fa-cogs" main=" Administração do Sistema" sub="Cadastros & Cia" />
    <div class="admin-pages-tabs">
      <b-card no-body>
        <!-- tag do bootStrao vue, tem documentacao na internet -->
        <b-tabs card>
          <b-tab title="Manutenções" active>
            <MaintananceAdmin/>
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
import MaintananceAdmin from "./MaintananceAdmin";
import UserAdmin from "./UserAdmin";

export default {
  name: "AdminPages",
  components: { PageTitle, MaintananceAdmin, UserAdmin }
};
</script>

<style>
</style>