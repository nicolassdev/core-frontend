<template>
  <div>
    <q-form>
      <q-input v-model="search" borderless placeholder="Search your question" dense class="q-px-sm core-input-field border-violet-1 border-radius-10">
        <template v-slot:append>
          <q-icon name="search" class="core-text-violet-1" />
        </template>
      </q-input>
      <q-btn label="Search" @click="submitSearch()" :loading="btnLoadingState" no-caps class="text-white q-mt-xs full-width bg-violet-1 border-radius-10"></q-btn>
    </q-form>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import {ref} from 'vue';
import {useStore} from 'vuex';
export default {
  props: {
    route: String
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    let search = ref(null);
    let btnLoadingState = ref(false);

    // Submit search query
    let submitSearch = () => {
      btnLoadingState.value = true;
      store.dispatch('Core/Searches/SEARCH', {
        module: 'customersupport',
        params: {
          search_key: search.value
        }
      }).then((response) => {
        btnLoadingState.value = false;
        // search route
        route.name !== props.route && router.push({name: props.route, query: {q: search.value}});
      });
    }
    route.query.q && (search.value = route.query.q);

    return {
      search,
      submitSearch,
      btnLoadingState
    }
  },
}
</script>

<style lang="scss">
  .core-dark-mode {
    .core-text-violet-1 {
      color: $white;
    }
  }
  .core-light-mode {
    .core-text-violet-1 {
      color: $violet-1;
    }
  }
</style>
