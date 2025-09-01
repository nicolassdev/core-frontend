<template>
	<div :class="GET_DARK_MODE_STATE ? 'core-dark-mode' : 'core-light-mode'">
		<q-layout class="core-bg-primary" view="lHr LpR fFf">
			<Header />
			<LeftDrawer />
			<RightDrawer />
			<q-page-container>
				<q-scroll-area class="main-scroll" style="height: calc(100vh - 80px)">
					<router-view />
					<q-scroll-observer @scroll="onScroll" />
				</q-scroll-area>
			</q-page-container>
			<Footer /> 
		</q-layout>
	</div>
</template>

<script>
import Header from 'src/core/components/wrapper/Header';
import LeftDrawer from 'src/core/components/wrapper/LeftDrawer';
import RightDrawer from 'src/core/components/wrapper/RightDrawer';
import Footer from 'src/core/components/wrapper/Footer';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
export default {
	components: {
		Header,
		LeftDrawer,
		RightDrawer,
		Footer,
	},
	setup() {
		const store = useStore();
		let GET_DARK_MODE_STATE = computed(() => store.getters['Core/Triggers/GET_DARK_MODE_STATE']);
		const onScroll = (s) => {
			let footer = document.getElementById('core_footer');
			footer.style.bottom = s.direction === 'up' ? '0' : '-105px';
		};
		return {
			onScroll,
			GET_DARK_MODE_STATE,
		};
	},
	methods: {},
};
</script>
