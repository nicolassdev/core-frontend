<template>
	<div v-if="$q.screen.width > 767" id="core_footer" class="core-footer">
		<transition appear class="animated bounceInUp">
			<div class="relative-position full-height">
				<footer class="footer full-height flex items-center core-bg-accent-0 core-text-primary">
					<div class="row full-width">
						<div class="col-6 text-center q-pr-lg">
							<div><q-icon name="fingerprint" size="sm" /></div>
							<div class="text-10 text-accent-2">Biometrics</div>
						</div>
						<div class="col-6 text-center q-pl-lg">
							<div><q-icon name="notifications" size="sm" /></div>
							<div class="text-10 text-accent-2">Notification</div>
						</div>
					</div>
				</footer>

				<div class="absolute dashboard core-bg-white">
					<q-icon class="core-text-violet-0" name="dashboard" />
				</div>
			</div>
		</transition>
	</div>
</template>
<style lang="scss">
.core-footer {
	transition: 0.2s ease-out;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	@media screen and (max-width: 767px) {
		height: 64px;
	}
	footer {
		box-shadow: 0px -4px 3px rgb(50, 50, 50, 0.16);
		@media screen and (min-width: $breakpoint-sm-min) {
			display: none;
		}
	}
	.dashboard {
		padding: 20px;
		border-radius: 50px;
		@media screen and (max-width: 767px) {
			top: -40px;
			left: 50%;
			transform: translateX(-50%);
		}
		i {
			font-size: 38px;
		}
		@media screen and (min-width: $breakpoint-sm-min) {
			padding: 30px;
			bottom: 20px;
			right: 20px;
			i {
				font-size: 28px;
			}
		}
		@media screen and (min-width: $breakpoint-sm-max) {
			display: none;
		}
	}
}
</style>
