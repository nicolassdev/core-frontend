<template>
  <div class="notification-container core-bg-accent-0 core-text-primary">
    <div class="row top-notifications">
      <div class="col-12 q-py-sm">
        <div
          class="row notification-bar flex justify-between items-center core-bg-accent-0 text-white"
        >
          <div class="row flex items-center notification-action">
            <q-btn
              rounded
              dense
              flat
              icon="chevron_left"
              @click="seeAllNotifications = false"
              class="core-text-primary"
            ></q-btn>
            <label class="text-24 core-text-primary">Notifications</label>
          </div>
          <q-btn
            dense
            flat
            round
            icon="more_vert"
            size="md"
            class="q-mr-sm core-text-primary"
          >
            <q-menu class="menu-container q-pa-sm" style="width: 16%">
              <q-list>
                <q-item
                  clickable
                  v-close-popup
                  @click="onMarkAllRead()"
                  class="menu-list"
                >
                  <q-item-section>
                    <div class="row items-center">
                      <q-icon name="check" class="q-mr-sm"></q-icon>
                      <label>Mark All as Read</label>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <q-scroll-area class="scrollable-area">
          <div v-for="(notification, systemIndex) in notifications" :key="systemIndex">
            <div class="top-notification-header text-22 q-px-md q-pt-md">
              {{ notification.system }}
            </div>
            <div
              v-for="(item, index) in notification.list"
              :key="index"
              @mouseenter="item.menuHover = true"
              @mouseleave="item.menuHover = false"
              class="relative-position row notification-bar q-mb-xs flex items-center q-py-xs q-px-md"
            >
              <div class="col-11 column notification-display">
                <div :class="`text-14 ${item.menuHover && 'text-white'}`">
                  {{ item.notification_content }}
                </div>
                <div class="row flex justify-between">
                  <div class="notification-time text-10">
                    {{ formatDateLabel("date", item.date_created) }}
                  </div>
                  <div class="notification-time text-10">
                    {{ formatDateLabel("time", item.date_created) }}
                  </div>
                </div>
              </div>
              <div class="absolute-top-right q-mr-sm">
                <q-btn
                  flat
                  round
                  size="sm"
                  icon="more_vert"
                  v-if="!item.is_read"
                  style="color: white; text-decoration: none"
                  @click="item.menuOver = true"
                  :class="`${!item.menuHover && !item.menuOver ? 'hidden' : ''}`"
                >
                  <q-menu
                    @mouseenter="item.menuOver = true"
                    @mouseleave="item.menuOver = false"
                    class="menu-container"
                    style="width: 16%; padding: 5px"
                  >
                    <q-list>
                      <q-item
                        clickable
                        v-close-popup
                        @click="updateNotifications(item.id, { id: item.id })"
                        class="menu-list"
                      >
                        <q-item-section>
                          <div class="row items-center">
                            <q-icon name="check" class="q-mr-sm"></q-icon>
                            <label>Mark as read</label>
                          </div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>

              <q-icon
                v-if="!item.is_read"
                class="col-1"
                name="circle"
                color="purple-11"
                size=".5rem"
              />
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script src="./scripts/Notifications.js"></script>

<style lang="scss" scope>
@import "./styles/Notifications.scss";
</style>
