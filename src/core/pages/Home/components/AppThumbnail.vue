<template>
  <div class="">
    <q-btn
      :id="`qbtn-${systemDetails.alias}`"
      flat
      :loading="btnLoading"
      @click="redirectTo(systemDetails.alias)"
      class="row system-button cursor-pointer border-radius-10 relative-position full-width q-px-md q-py-xl"
    >
      <div class="col-12 col-sm-5">
        <q-avatar square>
          <q-img src="./../../../statics/apps/skb-logo.png" size="lg" />
        </q-avatar>
      </div>
      <div class="col-12 col-sm-7 ellipsis">
        <h5 class="text-white text-23 text-bold q-my-none text-left ellipsis">
          {{ systemDetails.name }}
        </h5>
      </div>
    </q-btn>
    <div class="col-12 text-center ellipsis">
      <h6
        class="core-text-primary text-18 q-ma-none q-mt-md text-weight-regular ellipsis"
      >
        {{ systemDetails.description }}
      </h6>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { FetchUserDetails } from "../../../composables/UserManagement";
import { GetLoggedInUser } from "../../../composables/Authenticate";

export default {
  props: {
    name: String,
    description: String,
    alias: String,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const btnLoading = ref(false);
    const $q = useQuasar();
    const redirectTo = (alias) => {
      btnLoading.value = true;
      if (alias === "juanHR" && GetLoggedInUser.value.is_super_user !== 1) {
        let payload = {
          account_id: GetLoggedInUser.value.id,
          alias: alias,
        };

        FetchUserDetails(payload).then((response) => {
          if (response.status === "success") {
            setTimeout(() => {
              router.push({ name: alias, params: { alias: alias } });
            }, 1000);
          } else {
            $q.notify({
              position: "top-right",
              classes: "bg-violet-0 q-px-lg q-pt-none q-pb-none",
              html: true,
              actions: [
                {
                  icon: "close",
                  color: "white",
                },
              ],
              message:
                "<span>Failed,</span> You do not have JuanHR Account. Please contact the administrator",
            });
            btnLoading.value = false;
          }
        });
      } else {
        setTimeout(() => {
          router.push({ name: alias, params: { alias: alias } });
        }, 1000);
      }
    };

    let systemDetails = ref({
      alias: "",
      name: "",
      description: "",
    });

    onMounted(() => {
      systemDetails.value.alias = props.alias;
      systemDetails.value.name = props.name;
      systemDetails.value.description = props.description;
    });

    return {
      systemDetails,
      btnLoading,
      redirectTo,
    };
  },
};
</script>

<style></style>
