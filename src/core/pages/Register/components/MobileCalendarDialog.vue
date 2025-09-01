<template>
  <q-dialog
    auto-close
    v-model="show"
    transition-hide="slide-down"
    transition-show="slide-up"
    position="bottom"
  >
    <div
      class="no-shadow flex justify-center items-center align-center bg-white column"
      style="border-radius: 35px 35px 0 0"
    >
      <q-date
        minimal
        v-model="selectedDate"
        class="no-shadow q-pa-none"
        mask="'YYYY-MM-DD'"
        no-unset
        color="violet-0"
      ></q-date>
      <div class="full-width items-center q-pa-md">
        <q-btn
          flat
          class="text-white bg-accent-1 full-width bg-violet-0 border-radius-10"
          no-caps
          :disable="selectedDate == null"
          @click="onSubmit(selectedDate)"
        >
          Apply
        </q-btn>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { computed, ref } from "vue";

export default {
  props: {
    modelValue: { type: Boolean, required: true },
    onSubmit: { type: Function },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const show = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      },
    });

    let selectedDate = ref(null);

    return {
      selectedDate,
      show,
    };
  },
};
</script>

<style lang="scss"></style>
