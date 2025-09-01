import { httpGet, httpPut } from 'boot/axios';
import { ref } from 'vue';

let seeAllNotifications = ref(false);

const FetchNotifications = (payload) => {
  return new Promise((resolve, reject) => {
    httpGet('core/notifications', {
      success(response) {
        resolve(response.data);
      },
      catch(response) {
        reject(response);
      },
    }, payload)
  });
}

const UpdateNotifications = (id, payload) => {
  return new Promise((resolve, reject) => {
    httpPut(`core/notifications/${id}`, payload, {
      success(response) {
        resolve(response.data);
      },
      catch(response) {
        reject(response);
      },
    })
  });
}


export {
  seeAllNotifications,
  FetchNotifications,
  UpdateNotifications
};
