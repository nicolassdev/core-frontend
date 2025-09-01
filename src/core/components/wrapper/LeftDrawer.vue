<template>
  <div class="core-left-drawer">
    <q-drawer class=" core-bg-secondary" show-if-above :behavior="$q.screen.width < 768 ? 'mobile' : 'desktop'" v-model="GET_LEFT_DRAWER_STATE" side="left" :width="$q.screen.width <  768 ? 324 : $q.screen.width === 768 ? 61 : $q.screen.width > 1919 ? 106 : 75">
      <div
        class="tablet-desktop-materials column items-center justify-between full-height q-py-lg"
      >
        <div class="col-auto">
          <q-icon class="cursor-pointer text-30 core-text-primary text-hover-violet-0" name="view_in_ar" />
        </div>
        <div class="col-auto">
          <div class="column items-center text-center core-text-primary">
            <div class="col-auto q-pt-lg">
              <q-icon :class="$route.name === 'core-activity-log' && 'active'" class="relative-position icon cursor-pointer text-24 text-hover-violet-0" name="info">
              <span class="absolute text-9 core-text-primary">Activity Log</span>
              </q-icon>
            </div>
            <!-- <div class="col-auto q-pt-lg">
              <q-icon :class="$route.name === 'core-biometrics' && 'active'" class="relative-position icon cursor-pointer text-24 text-hover-violet-0" name="fingerprint">
              <span class="absolute text-9 core-text-primary">Biometrics</span>
              </q-icon>
            </div> -->
            <div class="col-auto q-pt-lg">
              <q-icon @click="$router.push({name: 'core-settings'})" :class="$route.name === 'core-settings' && 'active'" class="relative-position icon cursor-pointer text-24 text-hover-violet-0" name="settings">
              <span class="absolute text-9 core-text-primary">Settings</span>
              </q-icon>
            </div>
            <div class="col-auto q-pt-lg">
              <q-icon @click="$router.push({name: 'core-help-center'})" :class="$route.name === 'core-help-center' && 'active'" class="relative-position icon cursor-pointer text-24 text-hover-violet-0" name="help">
              <span class="absolute text-9 core-text-primary">Help Center</span>
              </q-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="mobile-materials">
        <div class="header bg-violet-1 text-white q-py-md q-pl-lg q-pr-md">
          <q-icon @click="closeLeftDrawer" name="close" size="sm" class="float-right"/>
          <div class="flex items-center full-height">
            <div>
              <div class="avatar q-mb-md">
                <q-img src="../../assets/yes.jpg" />
              </div>
              <div class="text-26 text-bold">Kathryn Johnson</div>
              <div class="text-10">@k.johnson</div>
            </div>
          </div>
        </div>
        <q-list class="core-text-primary text-20 text-semibold q-pa-md">
          <q-expansion-item dense>
            <template v-slot:header>
              <q-item-section>
                <div class="flex justify-start items-center">
                  <q-avatar class="core-text-violet-1" icon="account_circle q-pr-md"  />
                  <div>My Profile</div>
                </div>
              </q-item-section>
            </template>
          </q-expansion-item>
          <q-expansion-item dense>
            <template v-slot:header>
              <q-item-section>
                <div class="flex justify-start items-center">
                  <q-avatar class="core-text-violet-1" icon="settings q-pr-md"  />
                  <div>Settings</div>
                </div>
              </q-item-section>
            </template>
            <q-item-section class="q-px-xl q-mx-md">
              <div class="q-mb-md">User Management</div>
              <div class="q-mb-md">IP Management</div>
              <div class="q-mb-md">Notification</div>
              <div >Widgets</div>
            </q-item-section>
          </q-expansion-item>
          <q-expansion-item dense>
            <template v-slot:header>
              <q-item-section>
                <div class="flex justify-start items-center">
                  <q-avatar class="core-text-violet-1" icon="info q-pr-md"  />
                  <div>Activity Logs</div>
                </div>
              </q-item-section>
            </template>
            <q-item-section class="q-px-xl q-mx-md">
              <div class="q-mb-md">My Activity</div>
              <div>Users Activity</div>
            </q-item-section>
          </q-expansion-item>
        </q-list>
        <q-list class="core-text-primary text-20 text-semibold q-pa-md absolute-bottom">
          <q-expansion-item class="border-top-accent-3 q-pt-md" dense>
            <template v-slot:header>
              <q-item-section>
                <div class="flex justify-start items-center">
                  <q-avatar class="core-text-violet-1" icon="help q-pr-md"  />
                  <div>Help Center</div>
                </div>
              </q-item-section>
            </template>
            <q-item-section class="q-px-xl q-mx-md">
              <div class="q-mb-md text-no-wrap">Frequently Ask Questions</div>
              <div>Customer Support</div>
            </q-item-section>
          </q-expansion-item>
          <q-expansion-item dense>
            <template v-slot:header>
              <q-item-section>
                <div class="flex justify-start items-center">
                  <q-avatar class="core-text-violet-1" icon="logout q-pr-md"  />
                  <div>Logout</div>
                </div>
              </q-item-section>
            </template>
          </q-expansion-item>
        </q-list>
      </div>
    </q-drawer>
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import { ref, computed, watch } from 'vue';
export default {
  name: "LeftDrawer",
  setup(props) {
    const store = useStore();
    const $q = useQuasar();

    let GET_LEFT_DRAWER_STATE = computed(() => store.getters['Core/Triggers/GET_LEFT_DRAWER_STATE']);
    // Close the left sidebar - for mobile
    let closeLeftDrawer = () => {
      store.commit('Core/Triggers/TOGGLE_LEFT_DRAWER_STATE');
    }
    // Used for dynamic sidebar
    let screenWidth = computed(() => $q.screen.width);
    watch(screenWidth, () => {
      (screenWidth.value < 768 && GET_LEFT_DRAWER_STATE.value) && store.commit('Core/Triggers/TOGGLE_LEFT_DRAWER_STATE');
      (screenWidth.value > 767 && !GET_LEFT_DRAWER_STATE.value) && store.commit('Core/Triggers/TOGGLE_LEFT_DRAWER_STATE');
    })

    return {
      closeLeftDrawer,
      // Getters
      GET_LEFT_DRAWER_STATE,
    };
  },
};
</script>

<style lang="scss">
.core-left-drawer {
  .q-drawer__backdrop {
    background-color: rgba(0, 0, 0, 0.8) !important;
    backdrop-filter: blur(2px);
  }
  .tablet-desktop-materials {
    @media screen and (max-width: 767px) {
      display: none;
    }

    .icon {
      @media screen and (max-width: 1023px) {
        margin-top: 10px;
      }
      @media screen and (min-width: 1919px) {
        margin-top: 10px;
      }
      span {
        bottom: -15px;
        opacity: 0;
        transition: .2s ease-out;
      }
      &:hover {
        @media screen and (min-width: $breakpoint-sm-max) {
          span {
          opacity: 1;
          }
          &::before {
            width: 10px;
            height: 10px;
            background: #ffffff;
          }
        }
      }
      &.active {
        color: $violet-0;
        @media screen and (min-width: $breakpoint-sm-max) {
          span {
            opacity: 1;
          }
          &::before {
            width: 10px;
            height: 10px;
            background: #ffffff;
          }
        }
      }
    }
  }
  .mobile-materials {
     @media screen and (min-width: $breakpoint-sm-min) {
      display: none;
    }
    .header {
      height: 222px;
      .avatar {
        width: 65px;
        img {
          border-radius: 50px;
        }
      }
    }
    .q-expansion-item__toggle-icon {
      display: none;
    }
    .border-top-accent-3 {
      border-top: 1px solid #707070;
    }
  }
}
</style>
