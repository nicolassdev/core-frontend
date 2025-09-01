<template>
  <q-layout>
    <q-page-container>
      <mobile-header-vue  />
      <q-scroll-area class="main-scroll" style="height: calc(100vh - 80px)">
        <router-view />
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>
<script>
import MobileHeaderVue from "../components/wrapper/MobileHeader.vue";
export default {
  components: {
    MobileHeaderVue,
  },
};
</script>
