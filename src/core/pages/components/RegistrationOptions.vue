<template>
  <div
    :class="`width-300 relative-position flex justify-between items-center align-center column ${
      $q.screen.width > 767 ? 'q-gutter-y-lg' : 'q-gutter-y-sm'
    } `"
  >
    <!-- close dialog -->
    <div class="flex justify-end full-width q-ma-none">
      <q-btn @click="closeDialog()" flat dense round class="q-mt-md">
        <q-icon name="close" />
      </q-btn>
    </div>

    <q-img class="image-logo" src="../../../assets/img/logo.png" style="width: 4rem" />
    <h4 class="header text-23 line-height-25 q-mb-xs">Registration Options</h4>
    <p class="text-16 q-pb-md">Choose the type of account to register:</p>

    <!-- buttons -->
    <div
      :class="`${$q.screen.width > 767 ? 'q-gutter-x-md row' : 'column q-gutter-y-sm full-width'}`"
    >
      <q-btn
        rounded
        dense
        flat
        no-caps
        label="Personal"
        :class="`${
          $q.screen.width > 767 ? 'border-radius-15 col' : 'border-radius-10'
        } bg-violet-0 text-white q-px-xl`"
        @click="toPersonalRegistration"
      />
      <q-btn
        rounded
        dense
        flat
        no-caps
        label="Organization"
        :class="`${
          $q.screen.width > 767 ? 'border-radius-15 col' : 'border-radius-10'
        } bg-violet-0 text-white q-px-xl`"
        @click="toOrganizationRegistration"
      />
    </div>
    <p class="text-12 q-mt-lg text-center">
      Once selected, you will be redirected to the corresponding form.
    </p>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { ToggleMainDialogState } from "../../composables/Triggers";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const $q = useQuasar();
    const store = useStore();
    let btnLoadingState = ref(false);
    const closeDialog = () => {
      ToggleMainDialogState();
    };

    const router = useRouter();
    const route = useRoute();

    const toPersonalRegistration = () => {
      closeDialog();
      router.push("core-registration");
    };

    const toOrganizationRegistration = () => {
      closeDialog();
      router.push("core-org-registration");
    };

    return {
      btnLoadingState,
      closeDialog,
      router,
      route,
      toPersonalRegistration,
      toOrganizationRegistration,
    };
  },
};
</script>

<style></style>
