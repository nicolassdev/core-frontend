<template>
	<div class="core-dialog-confirmation">
		<q-dialog class="core-dialog-background" v-model="GET_CORE_DIALOG_STATE">
			<div class="core-dialog-container text-center text-white no-shadow flex justify-center items-center">
				<div class="width-300">
					<component :is="content" />
				</div>
			</div>
		</q-dialog>
	</div>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref, toRef, computed } from 'vue';
import { useStore } from 'vuex';
export default {
	props: {
		params: Object,
		content: Object,
		// propsComponsent,
	},
	setup(props) {
		const store = useStore();
		const $q = useQuasar();
		let parameter = toRef(props, 'params');
		// let componentProp = toRef(props, 'propsComponent');

		let GET_CORE_DIALOG_STATE = computed(() => store.getters['Core/Triggers/GET_CORE_DIALOG_STATE']);

		return {
			parameter,
			GET_CORE_DIALOG_STATE,
			// componentProp,
		};
	},
};
</script>
