<template>
  <q-header class="core-header">
    <div class="core-bg-primary">
      <div v-if="$q.screen.width < 768" class="q-px-lg">
        <div class="relative-position row items-center justify-between">
          <div><q-icon @click="openLeftDrawer" class="cursor-pointer core-text-primary text-hover-violet-0 opacity-7 q-my-lg" size="sm" name="menu" /></div>
          <div><q-icon class="cursor-pointer core-text-primary text-30 text-hover-violet-0" name="view_in_ar" /></div>
          <div><q-icon @click="toggleSearchField" class="cursor-pointer core-text-primary text-hover-violet-0 opacity-7" size="sm" name="search" /></div>
          <q-input placeholder="Search" borderless autofocus dense :class="showSearchInput ? 'animate-input' : 'inanimate-input'" class="border-violet-0 border-radius-10 transition-02s bg-white pr-6 q-pl-sm
          right-0 absolute" />
          <q-icon @click="toggleSearchField" size="13px" :class="showSearchInput ? 'inanimate-opacity' : 'animate-opacity'" class="q-pl-md text-violet-0 absolute right-0 magnify" name="search" />
        </div>
      </div>

      <!-- <div class="mobile-view row items-center justify-between q-px-md">
        <div><q-icon class="cursor-pointer core-text-primary text-hover-violet-0 opacity-7 q-my-lg" size="sm" name="arrow_back" /></div>
        <div class="text-23">User Management</div>
        <div><q-icon class="cursor-pointer core-text-primary text-hover-violet-0 opacity-7" size="sm" name="add" /></div>
      </div> -->
      <div v-else class="tablet-desktop-view row justify-between q-px-lg q-py-md">
        <div class="col-9 col-md-5 flex items-center">
          <q-input
            class="core-border-violet-0 full-width"
            dense
            borderless
            bg-color="white"
            placeholder="Search Filter..."
          >
            <template v-slot:prepend>
              <q-icon class="q-pl-md text-violet-0" name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-3 col-md-6">
          <div class="row items-center core-text-primary justify-end">
            <div class="desktop-materials col-auto">
              <q-icon
                @click="setColorMode()"
                :class="GET_DARK_MODE_STATE ? 'text-amber-7' : 'text-violet-0'"
                class="text-hover-violet-1 outlined q-pr-md cursor-pointer material-icons"
                :name="GET_DARK_MODE_STATE ? 'light_mode' : 'dark_mode'"
                size="sm"
              />
              <q-tooltip transition-show="scale" transition-hide="scale">
                {{ GET_DARK_MODE_STATE ? "Light mode" : "Dark mode" }}
              </q-tooltip>
            </div>
            <div class="desktop-materials col-auto">
              <q-icon @click="$router.push({name: 'core-index'})" class="text-hover-violet-1 outlined cursor-pointer q-pb-xs" name="home" size="sm" />
              <q-tooltip  transition-show="scale" transition-hide="scale">
                Home
              </q-tooltip>
            </div>
            <div class="tablet-materials col-auto q-pr-sm">
              <q-icon class="core-text-accent-1 text-hover-violet-1 bg-hover-accent-0" name="info" size="sm" />
            </div>
            <div class="tablet-materials col-auto q-pr-sm">
              <q-icon class="core-text-accent-1 text-hover-violet-1 bg-hover-accent-0 relative-postion" name="notifications" size="sm">
               <div class="absolute bg-white notification-container shadow-3 q-px-xs q-py-sm">
                  <div class="flex justify-between q-px-xs items-center text-10">
                    <div class="text-primary">Notification</div>
                    <div class="text-violet-2">See all</div>
                  </div>
                  <div
                    class="flex justify-between text-10 q-mt-xs q-pa-xs bg-hover-accent-4"
                  >
                    <div class="text-left">
                      <div class="text-secondary">I just read your message.</div>
                      <div class="text-violet-2 q-mt-xs text-9">David Lee</div>
                    </div>
                    <span class="ellipse bg-violet-2 float-right"></span>
                  </div>
                  <div
                    class="flex justify-between text-10 q-mt-xs q-pa-xs bg-hover-accent-4"
                  >
                    <div class="text-left">
                      <div class="text-secondary">I just read your message.</div>
                      <div class="text-violet-2 q-mt-xs text-9">David Lee</div>
                    </div>
                    <span class="ellipse bg-violet-2 float-right"></span>
                  </div>
                </div>
              </q-icon>
            </div>
            <div class="col-1 q-px-md"></div>
            <!-- <div class="desktop-materials col-3 col-xl-2 q-px-md">
              <q-btn
                rounded
                flat
                no-caps
                class="full-width border-violet-0 q-py-sm bg-hover-violet-1"
                label="All Apps"
              />
            </div> -->
            <div
              class="avatar col-auto cursor-pointer relative-position flex justify-between items-center"
            >
              <div>
                <q-avatar class="bg-hover-accent-0">
                  <q-img
                    class="fit"
                    v-if="GetLoggedInUser.photo"
                    :src="`data:image/png;base64, ${GetLoggedInUser.photo}`"
                  />
                  <q-img
                    v-else
                    class="fit"
                    :src="
                      require(`./../../assets/${
                        !GetLoggedInUser.sex ? 'male' : 'female'
                      }-avatar.svg`)
                    "
                  />
                </q-avatar>
              </div>
              <div class="desktop-materials">
                <q-icon class="q-pa-none text-accent-3" size="sm" name="expand_more" />
              </div>
              <div class="profile-container absolute">
                <div
                  class="content bg-white q-px-xs q-py-md shadow-3 text-12 text-secondary"
                >
                  <div class="q-px-xs">Account</div>
                  <div class="text-bold q-mt-sm">
                    <div
                      @click="
                        router.push({
                          name: 'core-profile',
                          params: { id: GetLoggedInUser.id },
                        })
                      "
                      class="q-px-xs q-py-xs bg-hover-accent-4 cursor-pointer"
                    >
                      My Profile
                    </div>
                    <div
                      @click="logout()"
                      class="q-px-xs q-py-xs bg-hover-accent-4 cursor-pointer"
                    >
                      Logout
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-header>
</template>

<script>
import { LocalStorage } from "quasar";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { onMounted, ref, toRefs, toRef, computed, watch } from "vue";
import { LogoutUser, GetLoggedInUser } from "./../../composables/Authenticate";
export default {
  name: "Header",
  setup(props, context) {
    let store = useStore();
    let router = useRouter();
    const $q = useQuasar();

    let showSearchInput = ref(false);
    const toggleSearchField = () => {
      showSearchInput.value = !showSearchInput.value;
    };

    let logout = () => {
      store.commit("Core/Triggers/TOGGLE_LOADING_STATE");
      LogoutUser({})
        .then((response) => {
          let status = Boolean(response.status === "success");
          status && router.replace({ name: "core-login" });
          $q.notify({
							position: 'top-right',
							classes: 'bg-violet-0 q-px-lg q-pt-none q-pb-none',
							html: true,
							actions: [
								{
									icon: 'close',
									color: 'white',
								},
							],
							message: status
								? `You have been logged out!`
								: `<span>Failed,</span> ${response.message}`,
						});
				})
				.catch((error) => {
					console.log(error);
					$q.notify({
            position: 'top-right',
            message: 'API Error: Please try again.'
          });
        })
        .catch((error) => {
          console.log(error);
          $q.notify({
            position: "top-right",
            message: "API Error: Please try again.",
          });
        })
        .finally(() => {
          store.commit("Core/Triggers/TOGGLE_LOADING_STATE");
        });
    };
    /** Dark mode switch */
    let GET_DARK_MODE_STATE = computed(
      () => store.getters["Core/Triggers/GET_DARK_MODE_STATE"]
    );
    let setColorMode = () => {
      store.commit("Core/Triggers/TOGGLE_DARK_MODE_STATE");
    };

    let showApps = () => {
      router.push({ name: "core-index" });
    };

    /** Open Left Drawer */
    let openLeftDrawer = () => {
      store.commit("Core/Triggers/TOGGLE_LEFT_DRAWER_STATE");
    };
    return {
      router,
      showSearchInput,
      toggleSearchField,
      logout,
      setColorMode,
      showApps,
      openLeftDrawer,
      // Getters variable
      GET_DARK_MODE_STATE,
      GetLoggedInUser,
    };
  },
};
</script>

<style lang="scss">
.core-header {
  @media screen and (max-width: $breakpoint-xs-max) {
    border-bottom: 1px solid $violet-0;
  }
  .mobile-view {
    background-color: red;
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
  .tablet-desktop-view {
    .icon-activity,
    .icon-notification {
      border-radius: 50px;
      padding: 6px;
    }
    .icon-notification {
      .notification-container {
        display: none;
        border-radius: 6px;
        width: 230px;
        right: 0;
        top: 45px;
        .ellipse {
          width: 6px;
          height: 6px;
          border-radius: 3px;
        }
      }
      &:hover {
        .notification-container {
          display: block;
        }
      }
    }
    .bg-hover-accent-4 {
      transition: 0.2s ease-out;
      &:hover {
        background-color: #e2e2e2;
      }
    }
    .avatar {
      @media screen and (min-width: 1024px) {
        .q-avatar {
          margin-right: 8px;
        }
      }
      .profile-container {
        .content {
          width: 110px;
          border-radius: 6px;
        }
        transition: 0.2s ease-out;
        visibility: hidden;
        opacity: 0;
        right: 0;
        top: 51px;
        @media screen and (min-width: 1024px) {
          padding-top: 20px;
          right: 21px;
          top: 35px;
        }
      }
      img {
        transition: 0.2s;
      }
      &:hover {
        @media screen and (max-width: 1024px) {
          img {
            width: 70%;
            height: 70%;
          }
        }
        .profile-container {
          visibility: visible;
          opacity: 1;
        }
      }
    }

    @media screen and (max-width: 767px) {
      display: none;
    }
  }
  .q-field__control {
    border-radius: 5px;
  }
  .avatar {
    @media screen and (min-width: $breakpoint-sm-max) {
      padding-right: 16px;
    }
  }
  .desktop-materials {
    display: none;
    @media screen and (min-width: $breakpoint-sm-max) {
      display: block;
    }
  }
  .tablet-materials {
    @media screen and (min-width: $breakpoint-sm-max) {
      display: none;
    }
  }
}
.core-light-mode {
  .core-header {
    .core-bg-primary {
      @media screen and (max-width: 767px) {
        background-color: $violet-0 !important;
      }
    }
    .core-text-primary {
      color: $violet-0;
      @media screen and (max-width: 767px) {
        color: $white;
      }
      .outlined {
        color: $white;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: $violet-0;
        transition: 0.2s ease-out;
        &:hover {
          color: $violet-1;
        }
      }
    }
    .core-text-accent-1 {
      color: $accent-1;
    }
    .core-border-violet-0 {
      .q-field__control {
        border: 1px solid $violet-0;
      }
    }
    .bg-hover-accent-0 {
      transition: 0.2s ease-out;
      &:hover {
        background-color: $white;
      }
    }
  }
}
.core-dark-mode {
  .core-header {
    .core-bg-primary {
      @media screen and (max-width: $breakpoint-xs-max) {
        background-color: $secondary !important;
      }
    }
    .core-text-primary {
      color: $white;
    }
  }
}
</style>
