import { ref, computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { date, useQuasar } from 'quasar';
import Pagination from './../../../../../components/Pagination';
import IpForm from './../components/IpForm';

export default {
	components: {
		Pagination,
		IpForm,
	},
	setup() {
		let realtimePagination = ref({
			sortBy: 'desc',
			descending: false,
			page: 1,
			rowsPerPage: 5,
		});

		let ipConnectionPagination = ref({
			sortBy: 'desc',
			descending: false,
			page: 1,
			rowsPerPage: 3,
		});

		let store = useStore();
		let GET_DARK_MODE_STATE = computed(() => store.getters['Core/Triggers/GET_DARK_MODE_STATE']);

		//for table row selection
		let selected = ref([]);
		let getSelected = (newSelected) => {
			selected.value = newSelected;
		};
		let getSelectedString = () => {
			return '';
		}; //end for table row selection

		//real time access table data
		const realtimeAccessMonitorColumn = [
			{ name: 'id', align: 'left', label: 'ID', field: 'id' },
			{
				name: 'ip_address',
				required: true,
				label: 'IP Connection',
				align: 'left',
				field: 'ip_address',
				sortable: true,
			},
			{ name: 'duration', align: 'left', label: 'Duration', field: 'duration', sortable: true },
			{ name: 'current_access', align: 'left', label: 'Current Access', field: 'current_access', sortable: true },
			{ name: 'action', align: 'left', label: 'Action', field: 'action', sortable: true },
		];
		let realtimeAccessMonitorRow = ref([]);
		let visibleRealtimeColumns = ref(['ip_address', 'duration', 'current_access', 'action']);
		//end real time access table data

		//white & block list table data
		const ipConnectionColumn = [
			{ name: 'id', align: 'left', label: 'ID', field: 'id' },
			{
				name: 'host_address',
				required: true,
				label: 'IP Connection',
				align: 'left',
				field: 'host_address',
				sortable: true,
			},
			{ name: 'alias', align: 'left', label: 'Alias', field: 'alias', sortable: true },
			{ name: 'date_created', align: 'left', label: 'Date Added', field: 'date_created', sortable: true },
			{ name: 'action', align: 'left', label: 'Action', field: 'action', sortable: true },
		];
		let ipConnectionRow = ref([]);
		let visibleColumns = ref(['host_address', 'alias', 'date_created', 'action']);
		//end table data

		//fetch ips in database
		let getIps = async () => {
			//get all real time access ips
			let ipRealTimeAccess = store.dispatch('Core/IPManagement/FETCH_REALTIME_ACCESS_IPS');
			await ipRealTimeAccess.then((info) => {
				if (info.status === 'success') {
					realtimeAccessMonitorRow.value = info.data;
				}
			});

			// //get all white&block ips
			let ipConnectionInfo = store.dispatch('Core/IPManagement/FETCH_IPS');
			await ipConnectionInfo.then((info) => {
				if (info.status === 'success') {
					info.data.forEach((element) => {
						let timeStamp = new Date(element.date_created);
						element.date_created = date.formatDate(timeStamp, 'MMMM D, YYYY');
						ipConnectionRow.value.push(element);
					});
					// ipConnectionRow.value = info.data;
				}
			});
		}; //end fetch ips

		const route = useRoute();
		//every
		const startInterval = () => {
			let autoSlide = setInterval(() => {
				if (route.name !== 'core-ip-management') {
					clearInterval(autoSlide);
					return;
				} else {
					//get all real time access ips
					let ipRealTimeAccess = store.dispatch('Core/IPManagement/FETCH_REALTIME_ACCESS_IPS');
					ipRealTimeAccess.then((info) => {
						if (info.status === 'success') {
							realtimeAccessMonitorRow.value = info.data;
						}
					});
				}
			}, 600000);
			autoSlide;
		};

		const $q = useQuasar();
		$q.screen.setSizes({ md: 768 });

		let showForm = ref(null);
		let modalAction = ref(null);

		const btnManageIp = ref(null);
		const btnPreferences = ref(null);

		let checkFormAction = (action) => {
			modalAction.value = action === 'block' ? 'block' : 'add';
			showForm.value = true;
		};

		let showOnMobile = ref(null);
		let allowConnection = ref(null);
		let ipHeader = ref({
			title: '',
			icon: '',
			btnText: '',
		});

		let selectedIps = ref([]);
		let selectedToBlockIps = ref([]);
		let selectedToUnblockIps = ref([]);
		let iconName = ref([]);

		let showIpContent = (btn, ipAction) => {
			// console.log($q.screen.lt.md, 'this is $q.screen.lt.md');
			const list = document.querySelector('#list');
			const manage = document.querySelector('#manage');
			const preferences = document.querySelector('#preferences');

			selectedIps.value = [];
			iconName.value = [];

			if (btn === 'btnManageIp') {
				list.classList.add('active-btn');
				preferences.classList.remove('active-btn');
				manage.classList.remove('active-btn');
				showOnMobile.value = 'all-connected';
			} else if (btn === 'btnManage') {
				manage.classList.add('active-btn');
				list.classList.remove('active-btn');
				preferences.classList.remove('active-btn');
				showOnMobile.value = 'ip-manage';
			} else if (btn === 'btnPreferences') {
				preferences.classList.add('active-btn');
				manage.classList.remove('active-btn');
				list.classList.remove('active-btn');
				showOnMobile.value = 'preferences';
			}
		};

		// function for add/remove selected ip in array
		let selectedMobileIp = (selected_id, action) => {
			const icon = document.getElementById(selected_id);
			if (iconName.value[selected_id] === 'check') {
				icon.classList.remove('check');
				iconName.value[selected_id] = 'place';

				//remove selected id in array
				let index = selectedIps.value.indexOf(selected_id);
				selectedIps.value.splice(index, 1);
			} else {
				icon.classList.add('check');
				iconName.value[selected_id] = 'check';
				selectedIps.value.push(selected_id);
			}

			ipManagement(action, selectedIps.value);
		}; // end function for add/remove selected ip in array

		//set icon default value on load
		let setIcon = (id) => {
			if (typeof iconName.value[id] === 'undefined') {
				iconName.value[id] = 'place';
			}
			return iconName.value[id];
		}; // end set icon default value on load

		//use this function for block/unblock ips
		let ipManagement = (action, selectedIps) => {
			console.log('🚀 ~ file: CoreIPManagement.js ~ line 215 ~ ipManagement ~ selectedIps', selectedIps);
		};

		/**
		 * Initialize function onMounted
		 */
		onMounted(() => {
			getIps();

			if ($q.screen.lt.md) {
				showIpContent('btnManageIp', '');
			}

			startInterval();
		});

		return {
			//pagination
			ipConnectionPagination,
			realtimePagination,
			//end pagination

			//table data
			getIps,
			ipConnectionColumn,
			ipConnectionRow,
			realtimeAccessMonitorColumn,
			realtimeAccessMonitorRow,
			//end table data

			//form
			showForm,
			checkFormAction,
			showIpContent,
			showOnMobile,
			allowConnection,
			modalAction,
			//end
			selectedMobileIp,
			iconName,
			setIcon,
			ipHeader,

			blockedIps: ref(false),
			whitelistIp: ref(false),
			visibleColumns,
			visibleRealtimeColumns,
			selected,
			getSelected,
			getSelectedString,
			btnManageIp,
			btnPreferences,
			//getters
			GET_DARK_MODE_STATE,
		};
	},
};
