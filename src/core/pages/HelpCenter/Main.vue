<template>
  <div class="core-help-center main row core-text-primary q-px-lg">
    <div class="col-12 col-sm-12 col-md-3">
      <div class="core-menu side full-height core-bg-accent-0">
        <div class="content">
          <h5 class="title text-28 text-weight-medium q-my-none">Help Center</h5>
          <div class="subtitle core-text-secondary">
            <div @click="redirect('frequently-ask-questions')">Frequently Asked Questions</div>
            <div @click="redirect('customer-support')">Customer Support</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-12 col-md-9">
      <div class="core-menu main relative-position" :class="$q.screen.width >= 768 && 'core-bg-accent-0'" :style="{height: height}" >
        <div>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useQuasar } from 'quasar';
  import { useRouter } from 'vue-router';
  export default {
    setup (props) {
      const $q = useQuasar();
      const router = useRouter();
      const redirect = (route_name) => {
        router.push({name: route_name});
      }
      return {
        redirect,
        height,
      }
    },
  }
</script>
