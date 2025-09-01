<template>
	<div>
		<q-dialog v-model="dialog" persistent :maximized="true" @hide="hideDialog">
			<div class="dialogContainer">
				<q-img src="./../../../../../assets/dialog-background.png" class="full-width full-height" />
				<div class="q-pa-md column absolute-center dialogContent text-center">
					<q-card-section>
						<q-img src="./../../../../../assets/dialog-background.png" class="absolute-center shaped-bg" />
						<div class="form-container text-white absolute-center">
							<div class="text-32 text-semibold">Block IP</div>
							<div class="description q-mt-md text-20 text-light">
								You can add multiple IP connections by separating them using ",".
							</div>
							<div class="label q-mt-lg text-12 text-left q-pb-sm">Enter Ip Connection*</div>
							<q-input class="q-px-md border-radius-10 border-violet-0" borderless></q-input>
							<div class="q-pt-xl">
								<q-btn
									rounded
									flat
									no-caps
									class="
										border-violet-0
										bg-violet-0 bg-hover-violet-7
										core-text-secondary
										text-20
										q-mr-sm q-py-md
										text-13 text-semibold
										full-width
									"
									label="Block Connection"
								/>
							</div>
							<div class="q-pt-md">
								<q-btn
									rounded
									flat
									no-caps
									v-close-popup
									class="btn-cancel core-text-secondary text q-mr-sm text-13 text-semibold full-width"
									label="Cancel"
								/>
							</div>
						</div>
					</q-card-section>
				</div>
			</div>
		</q-dialog>
	</div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
	props: {
		visible: Boolean,
		action: String,
	},
	setup(props, { emit }) {
		let dialog = ref(null);
		watch(
			() => props.visible,
			(newValue) => {
				dialog.value = newValue;
			}
		);

		let hideDialog = () => {
			emit('modalState', false);
		};

		return {
			dialog,
			hideDialog,
		};
	},
};
</script>

<style lang="scss" scoped>
.dialogContainer {
	background: black;
	.dialogContent {
		width: 687.08px;
		@media screen and (max-width: 767px) {
			width: 100%;
			.text-32 {
				font-size: 20px;
			}
			.label {
				margin-top: 12px;
				font-size: 20px;
			}
			.q-field__control-container,
			.q-field__inner {
				height: 31px !important;
			}
			.q-pt-xl {
				padding-top: 19px !important;
			}
			button.q-py-md {
				width: 80% !important;
				padding: 0px 9px !important;
			}
			.btn-cancel {
				width: 80% !important;
				padding: 0px 9px !important;
				border: 1px solid #641fff;
			}

			.q-pt-md {
				padding-top: 7px !important;
			}
			.form-container {
				width: 80%;
			}
		}
		.q-field__native {
			color: white !important;
		}
		.bg-violet-0 {
			background-color: #5100c1 !important;
		}
	}
}
</style>
