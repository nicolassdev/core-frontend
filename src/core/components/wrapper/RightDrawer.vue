<template>
  <q-drawer
    show-if-above
    :mini="miniState"
    v-model="openRightDrawer"
    side="right"
    :width="$q.screen.lt.lg ? 300 : 421"
    :mini-width="0.1"
    class="core-right-drawer"
  >
    <div class="col-12 full-height core-bg-accent-1">
      <q-scroll-area v-if="seeAllNotifications" class="full-height">
        <notifications />
      </q-scroll-area>
      <!-- My Apps Section -->
      <q-scroll-area v-else style="height: 100%">
        <template v-if="notificationData">
          <div class="apps-section core-bg-accent-0 core-text-primary full-width q-pa-lg">
            <div class="row section-header q-pb-sm q-mb-sm">
              <div class="col-2 icon-container">
                <q-icon class="notif-icon" name="notifications"></q-icon>
              </div>
              <div class="col-7 section-title text-18 text-bold q-mt-md">
                <p>My Apps</p>
              </div>
              <div class="col see-all-btn">
                <div class="see-all">
                  <q-btn
                    class="text-12"
                    @click="router.push({ name: 'core-notifications' })"
                    no-caps
                    flat
                    label="See all"
                  ></q-btn>
                </div>
              </div>
            </div>
            <div class="row apps-display-container q-my-md q-ml-md q-mr-sm">
              <div
                class="col-6 app-column-right text-14"
                v-for="(system, alias) in systems"
                :key="system"
              >
                <div v-if="showApps(alias)" class="app-display q-mr-sm q-mb-md">
                  <AppThumbnail
                    :name="system.name"
                    :description="system.pretext"
                    :alias="alias"
                    class="app-list border-radius-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Notification Section -->
        <template v-else>
          <q-card
            class="notif-main-container core-bg-accent-0 core-text-primary full-width q-pa-lg"
          >
            <div class="row section-header-notifications q-pa-none">
              <div class="col-2 icon-container">
                <q-icon class="notif-icon" name="notifications"></q-icon>
                <q-avatar
                  v-if="notifications.length && notifications.at(0).unread_count > 0"
                  size="xs"
                  dense
                  class="bg-violet-2 text-white absolute-bottom-right q-ma-sm"
                >
                  {{ notifications.at(0).unread_count }}
                </q-avatar>
              </div>
              <div class="col-7 section-title text-18 text-bold q-mt-md">
                <p>Notifications</p>
              </div>
              <div class="col see-all-btn">
                <div class="see-all">
                  <q-btn
                    class="text-12"
                    @click="seeAllNotifications = true"
                    no-caps
                    flat
                    label="See all"
                  ></q-btn>
                </div>
              </div>
            </div>

            <div class="notification-section q-py-sm q-mt-xs">
              <div
                class="row notification-display"
                v-for="notification in notifications"
                :key="notification"
              >
                <div class="col-11 notif-contents q-py-md q-pl-md">
                  <div class="notification-message text-11">
                    {{ notification.notification_content }}
                  </div>
                  <div class="notification-name text-10">
                    {{ notification.system_name }}
                  </div>
                </div>
                <div v-if="!notification.is_read" class="col-1 status-container q-pt-lg">
                  <div class="notification-status"></div>
                </div>
                <div class="line-separator">
                  <q-separator />
                </div>
              </div>
            </div>
          </q-card>
        </template>

        <!-- Clock Section -->
        <q-card
          class="core-date-time core-bg-accent-0 core-text-primary text-bold full-width q-pa-lg"
        >
          <div class="row clock-section-head justify-between">
            <div class="col-6 clock-section-title text-16">Time & Date</div>
            <div class="col date">
              <div class="row">
                <q-icon class="text-14 q-mr-sm" name="calendar_today"></q-icon>
                <p class="calendar-date">{{ textDate }}</p>
              </div>
            </div>
          </div>
          <div class="full-width flex justify-center">
            <div class="row clock-section full-width">
              <div class="col-5 core-analog-clock-accent-1 relative-position">
                <div class="core-analog-clock-accent-1__face">
                  <span
                    v-for="n in 60"
                    :key="n"
                    class="core-analog-clock-accent-1__notch"
                    :class="{ '-long': !(n % 15) }"
                    :style="{ transform: `rotate(${n * 6}deg)` }"
                  >
                  </span>
                  <span
                    class="core-analog-clock-accent-1__hand -minutes"
                    :style="minutes"
                  ></span>
                  <span
                    class="core-analog-clock-accent-1__hand -hours"
                    :style="hours"
                  ></span>
                </div>
              </div>
              <div class="col time-container">
                <div class="text-time text-bold">
                  {{ textTime }}
                </div>
              </div>
            </div>
          </div>
        </q-card>

        <!-- My Activities Section -->
        <q-card
          class="core-activity core-bg-accent-0 core-text-primary text-bold full-width q-pa-none q-px-lg q-pb-lg q-pt-xl"
        >
          <div class="activity-section q-pt-xs q-px-md">
            <div class="col-12 activity-head text-16 q-pb-md">My Activity</div>
            <div
              class="row activity-container"
              v-for="text in texts"
              :key="text.activity"
            >
              <div class="col-8 activity-details text-14">
                {{ text.activity }}
              </div>
              <div class="col-4 activity-log text-14 q-pr-sm q-pt-sm">
                {{ text.date }}
              </div>
            </div>
          </div>
        </q-card>
      </q-scroll-area>
      <span
        @click="miniState = !miniState"
        class="btn-mini-state core-bg-accent-1"
      ></span>
    </div>
  </q-drawer>
</template>

<script src="./scripts/RightDrawer.js"></script>

<style lang="scss" scoped>
@import "./styles/RightDrawerApps.scss";
@import "./styles/RightDrawerClockandActivity.scss";
@import "./styles/RightDrawerNotification.scss";
.core-right-drawer {
  .btn-mini-state {
    height: 79px;
    width: 5px;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: -11px;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>
