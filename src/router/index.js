import { LocalStorage } from 'quasar';
import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
	const createHistory = process.env.SERVER
		? createMemoryHistory
		: process.env.VUE_ROUTER_MODE === 'history'
			? createWebHistory
			: createWebHashHistory;

	const Router = createRouter({
		scrollBehavior: () => ({ left: 0, top: 0 }),
		routes,

		// Leave this as is and make changes in quasar.conf.js instead!
		// quasar.conf.js -> build -> vueRouterMode
		// quasar.conf.js -> build -> publicPath
		history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
	});

	Router.beforeEach((to, from, next) => {
		const allowedRoutesForUnauthenticated = [
			'core-login',
			'core-forgot-password',
			'core-reset-password',
			'core-registration',
			'core-verify-email',
			'core-verify-sms',
			'core-registration-steps',
			'core-registration-confirmation',
			'core-org-registration',
			'core-org-verify-email',
			'core-org-verify-sms',
			'core-org-registration-steps',
			'core-org-registration-confirmation',
		];

		if (LocalStorage.getItem('Bearer') === null && !allowedRoutesForUnauthenticated.includes(to.name)) {
			next({ name: 'core-login' });
		} else if (
			LocalStorage.getItem('Bearer') !== null &&
			(
				to.name === 'core-login' ||
				to.name === 'core-forgot-password' ||
				to.name === 'core-reset-password'
			)
		) {
			next({ name: 'core-index' });
		} else {
			next();
		}
	});

	return Router;
});
