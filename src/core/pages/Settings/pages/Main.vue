<template>
	<div class="core-settings main row core-text-primary q-px-lg">
		<div class="col-12 col-sm-12 col-md-3">
			<div class="core-menu side full-height core-bg-accent-0">
				<div class="content" id="settings-menu">
					<h5 class="title text-28 text-weight-medium q-my-none">Settings</h5>
					<div class="subtitle core-text-secondary">
						<div :class="setActive('core-user-management', 2)" @click="redirect('core-user-accounts')">
							User Management
						</div>
						<div :class="setActive('core-ip-management', 2)" @click="redirect('core-ip-management')">
							IP Management
						</div>
						<div :class="setActive('core-notification', 2)" @click="redirect('core-notification')">
							Notification
						</div>
						<div :class="setActive('core-widgets', 2)" @click="redirect('core-widgets')">Widgets</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-12 col-sm-12 col-md-9">
			<q-scroll-area
				class="core-menu main relative-position"
				:class="$q.screen.width >= 768 && 'core-bg-accent-0'"
				style="height: calc(100vh - 80px)"
			>
				<div id="settings-content">
					<router-view />
				</div>
			</q-scroll-area>
		</div>
	</div>
</template>

<script>
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
export default {
	mounted() {
		console.log('route ', this.$route);
	},
	setup(props) {
		const $q = useQuasar();
		const router = useRouter();
		const route = useRoute();
		const redirect = (route_name) => {
			router.push({ name: route_name });
		};
		const setActive = (name, index) => {
			return route.matched[index].name === name ? 'text-violet-0' : '';
		};
		return {
			redirect,
			setActive,
		};
	},
};
</script>
