<template>
  <div>
    <h2 class="mb-4">Github Dil Kullanım İstatistiği</h2>
    <div class="d-flex justify-content-center">
      <div class="input-group mb-4" style="width: 30rem">
        <input
          v-model="query"
          @keydown.enter="search"
          type="text"
          class="form-control"
          placeholder="Profil ara"
        />
      </div>
    </div>
    <div v-if="show">
      <Card :profile="profile" :data="data" />
    </div>
    <div v-else>Lütfen Kullanıcı Arayın</div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "home",
  components: { Card },
  data() {
    return {
      query: "",
      show: false,
    };
  },
  methods: {
    ...mapActions({
      getData: "getData",
    }),
    search() {
      // inputa boş arama yapılmasını engelledi.
      if (this.query.length > 0) {
        this.$store.dispatch("getData", this.query);
        this.show = true;
        this.query = "";
      }
    },
  },
  computed: {
    ...mapGetters({
      data: "getSearchData",
      profile: "getProfileData",
    }),
  },
};
</script>
<style>
</style>
