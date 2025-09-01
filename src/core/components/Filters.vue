<template>
  <div class="filters-component">
    <div class="flex items-center">
      <div class="text-14 core-text-primary q-mr-md">Filters:</div>
      <div>
        <q-select
          v-model="duration"
          dense
          borderless
          emit-value
          :options="dateOptions"
          @update:model-value="filter('date')"
          class="minmax-width border-violet-2 border-radius-50 core-select-field height-31 text-14 q-mr-md"
          :label="duration ? '' : 'Date'"
          :popup-content-class="`max-width-130 ${
            GET_DARK_MODE_STATE ? 'option-style-dark ' : 'option-style-light'
          }`"
        >
          <template v-slot:after-options>
            <q-separator color="violet-2" />
            <div class="q-px-sm">
              <q-item-section class="text-accent-2 q-my-sm">Custom Range</q-item-section>
              <div>
                <div>
                  <label>From</label>
                  <q-input
                    class="border-violet-2 border-radius-5 core-input-field filter-date-field q-px-sm label-accent-2"
                    v-model="fromDate"
                    borderless
                    dense
                    hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon
                        name="calendar_today"
                        class="cursor-pointer margin-top-n13 text-accent-3 text-14"
                      >
                        <q-popup-proxy
                          ref="startDate"
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            @update:model-value="() => $refs.startDate.hide()"
                            v-model="fromDate"
                            minimal
                            flat
                            class="bg-violet-1 filter-date"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="q-mt-xs">
                  <label>To</label>
                  <q-input
                    class="filter-date-field border-radius-5 core-input-field border-violet-2 label-accent-2 q-px-sm"
                    v-model="toDate"
                    borderless
                    dense
                    hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon
                        name="calendar_today"
                        class="cursor-pointer margin-top-n13 text-accent-3 text-14"
                      >
                        <q-popup-proxy
                          ref="endDate"
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            @update:model-value="() => $refs.endDate.hide()"
                            v-model="toDate"
                            minimal
                            flat
                            class="bg-violet-1 filter-date"
                          >
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
            <div class="q-px-sm q-mb-md q-mt-sm">
              <q-btn
                @click="filter('dates')"
                class="apply-btn text-white border-radius-15 bg-violet-1 border-white full-width"
                label="Apply"
                :disable="btnLoadingState"
                flat
                no-caps
                dense
              />
            </div>
          </template>
        </q-select>
      </div>
      <q-input
        v-if="isSearchVisible"
        borderless
        v-model="keywordRef"
        placeholder="Search"
        autofocus
        @keydown.enter="onFilterKeyword"
        class="minmax-width filter-date-field border-violet-2 border-radius-50 core-input-field q-pa-none"
        input-class="q-px-sm flex-center"
      >
        <template #after>
          <div class="row items-center q-mr-sm">
            <q-icon
              v-if="keywordRef"
              dense
              size="xs"
              name="close"
              @click="onFilterAll"
              class="cursor-pointer core-text-secondary q-mr-sm"
            ></q-icon>
            <q-icon
              dense
              size="xs"
              name="search"
              @click="onFilterKeyword"
              :class="`cursor-pointer core-text-secondary ${!keywordRef && 'disabled'}`"
            ></q-icon>
          </div>
        </template>
      </q-input>
      <!-- <div>
				<q-item-section class="item-start text-white">
					<q-select
						borderless
						dense
						v-model="choice"
						:options="propOptions"
						option-value="value"
						option-label="label"
						class="minmax-width border-violet-2 border-radius-50 core-select-field height-31"
						:label="choice ? '' : 'User'"
						:popup-content-class="GET_DARK_MODE_STATE ? 'option-style-dark' : 'option-style-light'"
					>
					</q-select>
				</q-item-section>
			</div> -->
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { DarkMode } from "../composables/Triggers";

export default {
  props: {
    searchVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let store = useStore();
    let GET_DARK_MODE_STATE = computed(
      () => store.getters["Core/Triggers/GET_DARK_MODE_STATE"]
    );
    let fromDate = ref(null);
    let toDate = ref(null);
    let duration = ref(null);
    let btnLoadingState = ref(false);
    // let choice = ref(null);
    // const propOptions = ref(props.options);
    let isSearchVisible = ref(props.searchVisible);
    let keywordRef = ref(null);

    const dateOptions = ref([
      {
        value: 0,
        label: "All time",
      },
      {
        value: 1,
        label: "Today",
      },
      {
        value: 2,
        label: "Yesterday",
      },
      {
        value: 3,
        label: "Past 7 days",
      },
      {
        value: 4,
        label: "Past 30 days",
      },
    ]);

    const filter = (action) => {
      let payload;
      btnLoadingState.value = true;
      if (action !== "dates") {
        payload = {
          search: {
            latest_session: duration.value,
          },
        };
      } else {
        payload = {
          search: {
            from: fromDate.value,
            to: toDate.value,
          },
        };
      }

      if (action === "keyword") {
        payload = {
          search_keyword: keywordRef.value,
        };
      }

      store
        .dispatch("Core/Searches/SEARCH", {
          path: "core/accounts",
          params: payload,
        })
        .then((response) => {
          btnLoadingState.value = false;
        });
    };

    const onFilterKeyword = () => {
      filter("keyword");
    };

    const onFilterAll = () => {
      keywordRef.value = null;
      filter("date");
    };

    return {
      DarkMode,
      GET_DARK_MODE_STATE,
      fromDate,
      toDate,
      duration,
      filter,
      keywordRef,
      isSearchVisible,
      btnLoadingState,
      // choice,
      // propOptions,
      dateOptions,
      onFilterKeyword,
      onFilterAll,
    };
  },
};
</script>

<style lang="scss">
.filters-component {
  .minmax-width {
    min-width: 130px;
    @media screen and (min-width: $breakpoint-lg-max) {
      min-width: 190px;
    }
  }
}

.filter-date-field {
  height: 30px;
  .q-field__control,
  .q-field__marginal {
    height: 30px;
  }
}
.filter-date {
  .q-date__content {
    color: white !important;
  }
}
</style>
