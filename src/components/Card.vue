<template >
  <div>
    <section class="vh-100" style="background-color: #eee">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-12 col-xl-7">
            <div class="card" style="border-radius: 15px; width: 100%">
              <div class="card-body text-center">
                <div class="mt-3 mb-4">
                  <img
                    :src="profile.avatar_url"
                    class="rounded-circle img-fluid"
                    style="width: 100px"
                  />
                </div>
                <h4 class="mb-2">{{ profile.login }}</h4>
                <p class="text-muted mb-4">
                  <a :href="profile.html_url">Profili ziyaret et </a>
                </p>
                <div
                  class="d-flex justify-content-between text-center mt-5 mb-2"
                >
                  <div v-for="(item, index) in data" :key="item.id" class="">
                    <p class="mb-2 h5">{{ index }}</p>
                    <p class="text-muted mb-0">{{ item }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["profile", "data"],
};
</script>

<style>
</style>