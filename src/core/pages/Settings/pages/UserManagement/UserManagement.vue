<template>
	<div class="core-user-management">
		<div class="flex justify-between">
			<h4 class="core-text-primary text-26 text-semibold title q-my-none">Users</h4>
			<q-btn
				flat
				dense
				:rounded="!$q.screen.lt.sm"
				no-caps
				:class="
					!$q.screen.lt.sm &&
					'q-px-xl q-mt-sm height-38 core-text-secondary bg-hover-violet-0 border-violet-2'
				"
				:label="!$q.screen.lt.sm ? 'Add User' : ''"
				:to="{ name: 'core-user-form' }"
				><q-icon v-if="$q.screen.lt.sm" name="add"
			/></q-btn>
		</div>
		<div v-if="!$q.screen.lt.sm">
			<div class="flex justify-between items-center q-mt-md">
				<!-- <Filters :options="options" /> -->
				<Filters :searchVisible="true" />
				<div class="flex justify-end items-center">
					<Pagination v-model:pagination="realtimePagination" :numRows="accountList" />
					<q-btn
						:disable="!selectedUsersID.length"
						@click="toggleDeleteDialog()"
						size="xs"
						flat
						round
						class="border-violet-2 text-white q-pa-sm q-ml-md"
						><q-icon name="delete" size="13px" class="core-text-primary" /><q-tooltip
							>Delete</q-tooltip
						></q-btn
					>
				</div>
			</div>
			<div class="q-mt-md">
				<q-table
					:rows="accountList"
					:columns="accountColumn"
					:visible-columns="accountVisibleColumn"
					row-key="name"
					v-model:pagination="realtimePagination"
					class="core-table"
					dense
					flat
				>
					<template v-slot:header-cell-selection="props">
						<q-th :props="props">
							<q-checkbox size="sm" v-model="allSelected" @click="selectAllIds" />
						</q-th>
					</template>
					<template v-slot:body-cell-selection="props">
						<q-td :props="props">
							<q-checkbox size="sm" v-model="selectedUsersID" :val="props.row.id" />
						</q-td>
					</template>
					<template v-slot:body-cell-action="props">
						<q-td :props="props">
							<div class="table-menu">
								<q-btn icon="more_vert" dense rounded flat class="text-decoration-none">
									<q-menu class="min-width-160 border-violet-2 bg-accent-0 text-white">
										<q-list>
											<q-item
												@click="editUser(props.row)"
												clickable
												v-close-popup
												class="menu-list"
											>
												<q-item-section>Edit</q-item-section>
											</q-item>
											<q-item
												v-if="!selectedUsersID.length"
												@click="deleteUser(props.row.id)"
												clickable
												v-close-popup
												class="menu-list"
											>
												<q-item-section>Delete</q-item-section>
											</q-item>
										</q-list>
									</q-menu>
								</q-btn>
							</div>
						</q-td>
					</template>
				</q-table>
			</div>
		</div>
		<div v-else class="q-mt-lg">
			<UserCard
				v-for="user in accountList"
				@deleteUser="deleteUser"
				@editUser="editUser"
				:key="user.id"
				:user="user"
				class="q-mb-lg"
			/>
		</div>
		<DeleteConfirmation :params="{ dispatch: 'Core/Permissions/DELETE_ACCOUNT', payload: selectedUsersID }" />
	</div>
</template>

<script>
import Filters from 'src/core/components/Filters';
import Pagination from 'src/core/components/Pagination';
import UserCard from 'src/core/components/UserCard';
import DeleteConfirmation from 'src/core/components/DeleteConfirmation';
import { resetUserForm } from 'src/core/composables/UserManagement';
import { ref, computed, watch, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
	components: { Filters, Pagination, UserCard, DeleteConfirmation },
	setup() {
		const $q = useQuasar();
		const router = useRouter();
		const store = useStore();

		// reset variables
		resetUserForm();

		// Filter option
		// let options = ref([
		// 	{
		// 		value: 1,
		// 		label: 'Nems',
		// 	},
		// 	{
		// 		value: 2,
		// 		label: 'Jads',
		// 	},
		// 	{
		// 		value: 3,
		// 		label: 'Ron',
		// 	},
		// 	{
		// 		value: 4,
		// 		label: 'JC',
		// 	},
		// ]);

		// Pagination default value
		let realtimePagination = ref({
			sortBy: 'desc',
			descending: false,
			page: 1,
			rowsPerPage: 5,
		});

		// Table user selection
		let allSelected = ref(false);
		let selectedUsersID = ref([]);
		let selectAll = ref(false);
		const selectAllIds = () => {
			selectAll.value = !selectAll.value;
			if (selectAll.value) {
				selectedUsersID.value = [];
				accountList.value.forEach((a) => {
					selectedUsersID.value.push(a.id);
				});
			} else {
				selectedUsersID.value = [];
			}
		};

		watch(selectedUsersID, () => {
			selectAll.value = allSelected.value =
				selectedUsersID.value.length === accountList.value.length ? true : false;
		});

		// Empty GET_SEARCH_RESULT on page load
		store.commit('Core/Searches/SET_SEARCH_RESULT', []);
		// Get searches
		let GET_SEARCH_RESULT = computed(() => store.getters['Core/Searches/GET_SEARCH_RESULT']);
		watch(
			() => GET_SEARCH_RESULT,
			() => {
				accountList.value = JSON.parse(JSON.stringify(GET_SEARCH_RESULT.value));
				accountList.value.forEach((a) => {
					// Assign a readable user permission type
					a.permission = permission[a.role];
				});
			},
			{ deep: true }
		);

		// Fetch accounts
		let accountList = ref([]);
		// Readable permission type
		// Note: This array of permission type must be dynamic
		let permission = ['Super Admin', 'Registrar', 'Human Resource Personnel', 'Employee'];
		const fetchAccounts = () => {
			store.dispatch('Core/Permissions/FETCH_ACCOUNT').then((response) => {
				if (response.status === 'success' && response.data.length) {
					response.data.forEach((a) => {
						// Assign a readable user permission type
						a.permission = permission[a.role];
					});
					accountList.value = response.data;
				}
			});
		};
		onMounted(fetchAccounts);

		let accountVisibleColumn = ref([
			'selection',
			'full_name',
			'username',
			'permission',
			'latest_session',
			'action',
		]);
		const accountColumn = [
			{
				name: 'selection',
				align: 'left',
				label: '',
				field: 'selection',
			},
			{
				name: 'full_name',
				required: true,
				label: 'Name',
				align: 'left',
				field: 'full_name',
				sortable: true,
			},
			{ name: 'username', align: 'left', label: 'Username', field: 'username', sortable: true },
			{ name: 'permission', align: 'left', label: 'Permission', field: 'permission', sortable: true },
			{
				name: 'latest_session',
				align: 'left',
				label: 'Latest Session',
				field: 'latest_session',
				sortable: true,
			},
			{
				name: 'action',
				align: 'right',
				label: '',
				field: 'action',
			},
		];

		const editUser = (user, reset = 0) => {
			router.push({ name: 'core-user-form', params: { id: user.id, reset: reset } });
		};

		const toggleDeleteDialog = () => {
			store.commit('Core/Triggers/TOGGLE_DELETE_DIALOG_STATE');
		};
		const GET_DELETE_DIALOG_STATE = computed(() => store.getters['Core/Triggers/GET_DELETE_DIALOG_STATE']);
		watch(GET_DELETE_DIALOG_STATE, () => {
			!GET_DELETE_DIALOG_STATE.value && (selectedUsersID.value = []);
		});

		// Delete user
		const deleteUser = (id) => {
			let index = selectedUsersID.value.findIndex((s) => s === id);
			index === -1 && selectedUsersID.value.push(id);
			toggleDeleteDialog();
		};

		return {
			// options,
			realtimePagination,
			accountColumn,
			accountVisibleColumn,
			accountList,
			fetchAccounts,
			editUser,
			deleteUser,
			toggleDeleteDialog,
			allSelected,
			selectedUsersID,
			selectAllIds,

			// Getters
			GET_SEARCH_RESULT,
			GET_DELETE_DIALOG_STATE,
		};
	},
};
</script>
<style lang="scss">
.text-decoration-none {
	text-decoration: none !important;
}
.min-width-160 {
	min-width: 160px;
}
</style>
