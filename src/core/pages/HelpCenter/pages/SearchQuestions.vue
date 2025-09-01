<template>
  <div class="search-questions q-px-lg core-bg-secondary">
    <SearchForm route="search-questions" :class="$q.screen.width >= '768' && 'hidden'" class="q-mt-xl q-mb-lg" />
    <div class="text-center">
      <div v-if="!GET_SEARCH_RESULT.length" class="core-test-primary">No results found!</div>
      <div v-else class="core-text-primary">Results found ({{GET_SEARCH_RESULT.length}})</div>
    </div>
    <div class="q-mb-lg">
      <div v-for="question in GET_SEARCH_RESULT" :key="question.id">
        <div class="bg-accent-1 box-shadow-secodary text-accent-2 q-pa-lg border-radius-10 q-mt-md">
          <p class="text-white text-16">{{question.title}}</p>
          <div class="text-16 text-justify">
            {{question.description}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from '../../../components/SearchForm';
import {useStore} from 'vuex';
import {ref, computed} from 'vue';
import { useQuasar } from 'quasar';
export default {
  components: {
    SearchForm
  },
  setup() {
    const $q = useQuasar();
    let store = useStore();
    let GET_SEARCH_RESULT = computed(() => store.getters['Core/Searches/GET_SEARCH_RESULT']);

    return {
      GET_SEARCH_RESULT
    }
  },
}
</script>
