<template>
	<div class="flex items-center">
		<div class="text-14 core-text-primary q-mr-md">Rows</div>
		<div>
			<q-select
				borderless
				v-model="selectedRow"
				:options="rowsPerpage"
				@update:model-value="updatePagination()"
				class="
					core-select-field
					border-radius-50
					height-31
					min-width-90
					border-violet-2
					text-center text-15
					q-mr-md
				"
				:popup-content-class="GET_DARK_MODE_STATE ? 'option-style-dark' : 'option-style-light'"
			/>
		</div>
		<div class="paginationContainer">
			<q-pagination
				v-model="childPagination.page"
				color="grey-8"
				:max="Math.ceil(numberOfRows.length / selectedRow)"
				size="sm"
				direction-links
				class="pagination"
				@update:model-value="updatePagination()"
			/>
			<div class="core-pagination-select-input">
				<q-select
					v-model="selectedRow"
					dense
					rounded
					outlined
					:display-value="`${
						selectedRows * childPagination.page > numberOfRows.length
							? numberOfRows.length
							: selectedRows * childPagination.page
					} / ${numberOfRows.length}`"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
export default {
	emits: ['update:pagination'],
	props: {
		pagination: {
			sortBy: String,
			descending: Boolean,
			page: Number,
			rowsPerPage: Number,
		},
		numRows: Array,
	},
	setup(props, { emit }) {
		const $q = useQuasar();
		let childPagination = ref(props.pagination);
		let numberOfRows = computed(() => props.numRows);
		let selectedRow = ref(childPagination.value.rowsPerPage);
		let selectedRows = ref(selectedRow);
		const options = ref([]);
		const rowsPerpage = ref([5, 10, 15, 20, 25, 30, 35, 40, 45, 50]);
		/**
		 * on update/select pagination
		 * change select value and emit changes to parent
		 */
		let updatePagination = () => {
			childPagination.value.rowsPerPage = selectedRow.value;
			emit('update:pagination', childPagination.value);
			console.log('childPagination.value ', childPagination.value);
		};

		//vuex store
		let store = useStore();
		let GET_DARK_MODE_STATE = computed(() => store.getters['Core/Triggers/GET_DARK_MODE_STATE']);

		return {
			childPagination,
			updatePagination,
			options,
			rowsPerpage,
			selectedRow,
			selectedRows,
			numberOfRows,
			//getters
			GET_DARK_MODE_STATE,
		};
	},
};
</script>

<style></style>
