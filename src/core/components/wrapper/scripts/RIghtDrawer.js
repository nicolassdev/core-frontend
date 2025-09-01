import { date, LocalStorage } from 'quasar';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { GetLoggedInUser } from '../../../composables/Authenticate.js';
import { FetchNotifications, seeAllNotifications } from '../../../composables/Notification.js';
import AppThumbnail from '../../../pages/Home/components/AppThumbnail.vue';
import Notifications from '../Notifications.vue';

export default {
	name: 'RightDrawer',

	components: {
		AppThumbnail,
		Notifications,
	},

	setup() {
		const route = useRoute();
		const router = useRouter();

		let openRightDrawer = ref(false);
		let miniState = ref(true);
		let notifications = ref([]);
		let rotation = ref({ hours: 0, minutes: 0, seconds: 0 });
		let texts = ref([
			{
				activity: 'Reset Password for Jose P. Rizal',
				date: '1 second ago',
			},
			{
				activity: 'Added Devices',
				date: '3 hours ago',
			},
			{
				activity: "Added Jose Rizal's fingerprint data on Bio-213231",
				date: '7 hours ago',
			},
			{
				activity: 'Deleted User Apol Mabini',
				date: 'Yesterday, 2:30 PM',
			},
		]);

		const notificationData = ref(false);

		let textTime = ref(null);
		let textDate = ref(null);

		const systems = [
			{
				name: 'Juanhr',
				id: 1,
				pretext: 'Payroll System',
			},
			{
				name: 'Poseidon',
				id: 2,
				pretext: 'Sale System',
			},
			{
				name: 'DMATS',
				id: 3,
				pretext: 'Inventory System',
			},
			{
				name: 'PMS',
				id: 4,
				pretext: 'Payroll System',
			},
			{
				name: 'Service Kiosk',
				id: 5,
				pretext: 'Ordering System',
			},
			{
				name: 'Juanhr',
				id: 6,
				pretext: 'Payroll System',
			},
			{
				name: 'Poseidon',
				id: 7,
				pretext: 'Sale System',
			},
			{
				name: 'DMATS',
				id: 8,
				pretext: 'Inventory System',
			},
			{
				name: 'PMS',
				id: 9,
				pretext: 'Payroll System',
			},
			{
				name: 'Service Kiosk',
				id: 10,
				pretext: 'Ordering System',
			},
			{
				name: 'Juanhr',
				id: 11,
				pretext: 'Payroll System',
			},
			{
				name: 'Poseidon',
				id: 12,
				pretext: 'Sale System',
			},
			{
				name: 'DMATS',
				id: 13,
				pretext: 'Inventory System',
			},
			{
				name: 'PMS',
				id: 14,
				pretext: 'Payroll System',
			},
			{
				name: 'Service Kiosk',
				id: 15,
				pretext: 'Ordering System',
			},
			{
				name: 'Juanhr',
				id: 16,
				pretext: 'Payroll System',
			},
			{
				name: 'Poseidon',
				id: 17,
				pretext: 'Sale System',
			},
			{
				name: 'DMATS',
				id: 18,
				pretext: 'Inventory System',
			},
			{
				name: 'PMS',
				id: 19,
				pretext: 'Payroll System',
			},
			{
				name: 'Service Kiosk',
				id: 20,
				pretext: 'Ordering System',
			},
		];

		const hours = computed(() => {
			return { transform: `translate3d(-50%, 0, 0) rotate(${rotation.value.hours}deg)` };
		});

		const minutes = computed(() => {
			return { transform: `translate3d(-50%, 0, 0) rotate(${rotation.value.minutes}deg)` };
		});

		onMounted(() => {
			const date = new Date();
			updateTime(date);
		});

		const fetchNotifications = (payload) => {
			FetchNotifications(payload).then((response) => {
				const status = response.status === 'success';
				if (status) {
					const data = response.data;
					notifications.value = data;
				}
			});
		};

		const updateTime = (time) => {
			rotation.value.minutes = 6 * time.getMinutes();
			rotation.value.hours = 30 * time.getHours() + time.getMinutes() * 0.5;

			textTime.value = date.formatDate(new Date(), 'h:mm a');
			textDate.value = date.formatDate(new Date(), 'dddd, MMMM DD, YYYY');

      const timeoutRef = setTimeout(() => updateTime(new Date()), 60000 - new Date().getMilliseconds());

      if (LocalStorage.getItem('Bearer')) {
        const payload = {
          account_id: GetLoggedInUser.value.id,
          offset: 0,
          limit: 5,
        };
        fetchNotifications(payload);
      } else {
        clearTimeout(timeoutRef)
      }
		};

		const showApps = (index) => {
			return index < 4 ? true : false;
		};

		watch(route.name, (value) => {
			notificationData.value = value === 'core-apps';
		});

		watch(GetLoggedInUser, (value) => {
			this.fetchNotifications({ account_id: value.id });
		});

		return {
			router,
			seeAllNotifications,
			notificationData,
			systems,
			openRightDrawer,
			miniState,
			notifications,
			rotation,
			texts,
			textTime,
			textDate,
			hours,
			minutes,
			showApps,
		};
	},
};
