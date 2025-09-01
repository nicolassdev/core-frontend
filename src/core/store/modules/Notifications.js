import { LocalStorage } from "quasar";
import { httpGet, httpPut } from "boot/axios";

const store = {
  namespaced: true,
  state: {
    notifications: [],
  },
  getters: {
    GET_ALL_NOTIFICATIONS: (state) => {
      return state.notifications;
    },
    GET_TEN_NOTIFICATIONS: (state) => {
      return state.notifications.slice(0, 10);
    },
  },
  mutations: {
    SET_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications;
    },
    PUSH_NOTIFICATION(state, notification) {
      state.notifications.unshift(notification);
    },
    MARK_NOTIFICATION_AS_READ(state, notificationID) {
      let index = state.notifications.findIndex((e) => {
        return e.id === notificationID;
      });

      if (index !== -1) {
        state.notifications[index].is_read = 1;
      }
    },
  },
  actions: {
    GET_NOTIFICATIONS(context, payload) {
      return new Promise((resolve, reject) => {
        httpGet(
          "core/notifications",
          {
            success: (response) => {
              if (response.data.status === "success") {
                context.commit("SET_NOTIFICATIONS", response.data.data);
              }

              resolve(response.data);
            },
            catch: (response) => {
              reject(response.data);
            },
          },
          payload
        );
      });
    },
    CONNECT_TO_REALTIME_NOTIFICATIONS(context, payload) {
      return new Promise((resolve, reject) => {
        let evtSource = new EventSource(
          "http://localhost:3000?token=" + LocalStorage.getItem("Bearer"),
          {
            withCredentials: true,
          }
        );

        evtSource.onmessage = (e) => {
          resolve(200);
        };

        evtSource.addEventListener("ping", (e) => {
          context.commit("PUSH_NOTIFICATION", JSON.parse(e.data));
        });
      });
    },
    MARK_AS_READ(context, payload) {
      return new Promise((resolve, reject) => {
        httpPut("core/notifications", payload, {
          success: (response) => {
            if (response.data.status === "success") {
              context.commit(
                "MARK_NOTIFICATION_AS_READ",
                response.data.data.id
              );
            }

            resolve(response.data);
          },
          catch: (response) => {
            reject(response.data);
          },
        });
      });
    },
  },
};

export default store;
