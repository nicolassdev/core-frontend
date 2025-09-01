<template>
	<div>
		<h4 :class="`text-semibold text-32 q-my-none ${$q.screen.width < 768 ? 'q-mb-sm' : 'q-mb-xl'}`">
			Password Reset Successful
		</h4>
		<!-- <p class="text-24 text-weight-light">
						Are you sure you want to remove (<span class="text-bold">{{ parameter.payload.length }}</span
						>) selected record(s)?
					</p> -->
		<q-btn
			@click="close()"
			flat
			label="OK"
			dense
			:class="`bg-violet-0 full-width q-py-sm q-mb-s border-radius-${$q.screen.width < 768 ? '10' : '50'}`"
		/>
	</div>
</template>

<script>
import { useStore } from 'vuex';
export default {
	setup() {
		const store = useStore();
		const close = () => {
			store.commit('Core/Triggers/TOGGLE_CORE_DIALOG_STATE');
		};
		return {
			close,
		};
	},
};
</script>
