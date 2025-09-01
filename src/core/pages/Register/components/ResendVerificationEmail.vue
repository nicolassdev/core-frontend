<template>
  <q-dialog auto-close v-model="show">
    <div class="no-shadow flex justify-center align-center">
      <div class="core-registration">
        <q-card class="card-center bg-white">
          <q-card-section
            :class="`${$q.screen.width < 768 ? 'flex justify-center column' : 'q-pa-lg'}`"
          >
            <div
              :class="`${
                $q.screen.width < 768 && 'text-center q-mb-xl'
              }`"
            >
              <q-img
                :src="getImagePath($q.screen.width > 767 ? 'logo.png' : 'SGLGIF.png')"
                alt="Image Description"
                class="upper-page-image-icon"
                :style="`width: ${$q.screen.width > 767 ? '10%' : '35%'}`"
              ></q-img>
            </div>
            <div class="greetings text-22 q-my-xl">
              Hi {{ data.first_name }} {{ data.last_name }}
            </div>
            <div
              :class="`message text-22 full-width ${
                $q.screen.width < 768 ? 'text-center' : ''
              }`"
            >
              Thank you for registering with us! To complete your account setup, please
              verify your email address by clicking the link below:
            </div>
            <div class="button flex justify-center">
              <q-btn
                rounded
                dense
                flat
                no-caps
                label="Verify"
                @click="onSubmit"
                :class="`${
                  $q.screen.width > 767 ? 'bg-violet-0 q-my-xl' : 'bg-amber-9 q-my-md'
                } text-white q-px-xl justify-center`"
              />
            </div>
            <div class="bottom-text q-my-md text-center">
              If you did not create an account with us, you can safely ignore this
              message.
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    modelValue: { type: Boolean, required: true },
    data: { type: Object, required: true },
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

    const getImagePath = (drafts) => {
      return require(`../../../../assets/img/${drafts}`);
    };

    return {
      getImagePath,
      show,
    };
  },
};
</script>

<style lang="scss">
.core-registration {
  .upper-page-image,
  .greetings,
  .message,
  .button {
    @media (width < 768px) {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
