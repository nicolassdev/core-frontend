import { date } from 'quasar';
import { GetLoggedInUser } from 'src/core/composables/Authenticate';
import { FetchNotifications, UpdateNotifications, seeAllNotifications } from '../../../composables/Notification.js';
import { onMounted, ref } from 'vue';

export default {
  setup() {
    let notifications = ref([]);

    onMounted(() => {
      fetchNotifications()
    })

    const fetchNotifications = () => {
      FetchNotifications({ account_id: GetLoggedInUser.value.id }).then((response) => {
        const status = response.status === 'success';
        if (status) {
          notifications.value = []
          const data = response.data;
          const systems = getUniqueSystems(data);
          systems.forEach(system => {
            const systemNotifs = data.filter(({ system_name }) => system_name === system);
            notifications.value.push({
              system: system,
              list: systemNotifs
            })
          });
        }
      })
    }

    const onMarkAllRead = () => {
      updateNotifications(GetLoggedInUser.value.id, { account_id: GetLoggedInUser.value.id })
    }

    const updateNotifications = (id, payload) => {
      UpdateNotifications(id, payload).then((response) => {
        const status = response.status === 'success';
        status && fetchNotifications()
      })
    }

    const getUniqueSystems = (list) => {
      return Array.from(new Set(list.map((item) => item.system_name)));
    };

    const formatDateLabel = (type, uDate) => {
      return date.formatDate(uDate, type === 'date' ? 'MMMM DD, YYYY' : 'h:mm a')
    }

    return {
      seeAllNotifications,
      notifications,
      formatDateLabel,
      onMarkAllRead,
      updateNotifications,
    }
  },
};