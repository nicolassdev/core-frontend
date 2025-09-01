<template>
	<div class="core-delete-confirmation">
		<q-dialog class="core-dialog-background" v-model="GET_DELETE_DIALOG_STATE">
			<div class="core-dialog-container text-center text-white no-shadow flex justify-center items-center">
				<div class="width-300">
					<h4 :class="`text-semibold text-32 q-my-none ${$q.screen.width < 768 ? 'q-mb-sm' : 'q-mb-xl'}`">
						Delete Confirmation
					</h4>
					<p class="text-24 text-weight-light">
						Are you sure you want to remove (<span class="text-bold">{{ parameter.payload.length }}</span
						>) selected record(s)?
					</p>
					<q-btn
						:disable="btnLoadingState"
						@click="fireDeleteEvent()"
						flat
						label="OK"
						dense
						:class="`bg-violet-0 full-width q-py-sm q-mb-s border-radius-${
							$q.screen.width < 768 ? '10' : '50'
						}`"
					/>
					<div @click="cancel()" class="full-width q-py-sm text-hover-violet-2 cursor-pointer text-14">
						Cancel
					</div>
				</div>
				<!-- <q-btn flat label="Cancel" class="text-accent-2" @click="cancel()" /> -->
			</div>
		</q-dialog>
	</div>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref, toRef, computed } from 'vue';
import { useStore } from 'vuex';
export default {
	/** This Component accepts 1 Prop
	 *
	 *  params = object | refers to the option allowed to control this component
	 *
	 *  params has 2 properties
	 *  1 dispatch - refers to the action which gonna use after clicking the "OK Button"
	 *  2 payload - the params that will passed on dispatch as payload
	 */
	props: {
		params: Object,
	},
	setup(props) {
		const store = useStore();
		const $q = useQuasar();
		let btnLoadingState = ref(false);
		let parameter = toRef(props, 'params');
		const fireDeleteEvent = () => {
			btnLoadingState.value = true;
			store.dispatch(parameter.value.dispatch, parameter.value.payload).then((response) => {
				response.status === 'success' && store.commit('Core/Triggers/TOGGLE_DELETE_DIALOG_STATE');
				btnLoadingState.value = false;
			});
		};

		let GET_DELETE_DIALOG_STATE = computed(() => store.getters['Core/Triggers/GET_DELETE_DIALOG_STATE']);
		const cancel = () => {
			store.commit('Core/Triggers/TOGGLE_DELETE_DIALOG_STATE');
		};
		return {
			fireDeleteEvent,
			parameter,
			cancel,
			btnLoadingState,
			GET_DELETE_DIALOG_STATE,
		};
	},
};
</script>
