<template>
  <div class="mobile-view relative-position q-px-md">
    <div
      class="relative-position mobile-header-container items-center align-center full-height q-py-sm"
    >
      <q-icon
        v-if="MenuBtnState"
        class="bg-orange-10 text-white core-border-radius-8 q-pa-xs"
        size="sm"
        name="menu"
      />
      <q-icon
        v-else
        size="1.5rem"
        name="arrow_back"
        class="text-white border-radius-8 q-pa-xs"
        @click="$router.go(-1)"
      />
      <div class="text-white text-center full-width q-pr-md">{{ mobileHeaderTitle }}</div>

      <div
        :class="`ob-header-content absolute ${
          SearchBtnState ? 'left-right-30' : 'left-right-24'
        }`"
      >
        <component :is="content" class="full-height flex justify-center items-center" />
      </div>

      <div class="flex items-center" v-if="SearchBtnState">
        <q-icon
          class="bg-amber-4 core-text-accent-1 core-border-radius-8 q-pa-xs"
          size="sm"
          name="search"
        />

        <q-input
          placeholder="Search"
          borderless
          autofocus
          dense
          :class="showSearchInput ? 'animate-input' : 'inanimate-input'"
          class="core-border-accent-0 core-border-radius-10 transition-02s bg-accent-0 pr-6 q-pl-sm right-0 absolute"
        />
        <q-icon
          @click="toggleSearchField()"
          size="sm"
          :class="showSearchInput ? 'inanimate-opacity' : 'animate-opacity'"
          class="q-pl-md core-text-accent-1 absolute right-0 magnify"
          name="search"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, shallowRef, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  MenuBtnState,
  SearchBtnState,
  showMobileSearch,
  mobileHeaderTitle,
} from "../../composables/Triggers";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    let showSearchInput = ref(false);
    const toggleSearchField = () => {
      showSearchInput.value = !showSearchInput.value;
    };

    let content = shallowRef(null);

    return {
      MenuBtnState,
      SearchBtnState,
      showSearchInput,
      toggleSearchField,
      content,
      showMobileSearch,
      mobileHeaderTitle,
    };
  },
};
</script>

<style lang="scss">
.ob-dark-mode {
  .mobile-view {
    background-color: #232c40;
  }
}
.mobile-view {
  background-color: $violet-0;
  .mobile-header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  // background-color: #ffbf00;
  .dt-text-24 {
    font-size: 24px;
  }
  height: 80px;
  .opacity-7 {
    opacity: 0.7;
  }
  @media screen and (min-width: 767px) {
    display: none;
  }
  .right-0 {
    right: -1px;
  }
  .pr-6 {
    padding-right: 6px;
  }
  .magnify {
    margin-right: 5px;
  }
  .inanimate-opacity {
    opacity: 1;
  }
  .animate-opacity {
    transition: 0.5s;
    opacity: 0;
  }
  .inanimate-input {
    width: 24px;
    height: 27px;
    visibility: hidden;
    opacity: 0.8;
    transition: 0.3s;
    .q-field__native {
      display: none;
    }
  }
  .animate-input {
    width: 100%;
    visibility: visible;
    animation-name: input;
    transition: 0.3s;
    @keyframes input {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    .q-field__native {
      display: block;
    }
  }
}
</style>
