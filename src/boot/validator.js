import { boot } from 'quasar/wrappers';
import { ValidateUserToken } from './../core/composables/Authenticate';
// import {
// 	FetchUser as PM_FetchUser,
// 	GetUserInformation as PM_GetUserInformation,
// } from 'src/resources/ProjectManagement/composables/UserManagement';
// import PM_Permissions from 'src/resources/ProjectManagement/permissions.json';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ router, store }) => {
	ValidateUserToken()
		.then((response) => {
			if (response.status !== 'success') {
				router.replace({ name: 'core-login' });
			}
		})
		.catch(() => {
			router.replace({ name: 'core-login' });
		})
		.finally(() => {
			store.commit('Core/Triggers/TOGGLE_LOADING_STATE');
		});

	// Validate route access
	router.beforeEach((to, from) => {
		switch (to.matched[0].name) {
			case 'juanHR':
				// validation here
				break;
			case 'projectManagement':
				// if (!PM_GetUserInformation.value) {
				// 	// Get user role
				// 	PM_FetchUser().then((response) => {
				// 		if (response.status === 'success') {
				// 			validateRouteAccess(to, PM_GetUserInformation.value.role, PM_Permissions);
				// 		} else {
				// 			// If error occured reroute to the core dashboard
				// 			// means user has no permission to access the system app
				// 			router.replace({ name: 'core' });
				// 		}
				// 	});
				// } else {
				// 	validateRouteAccess(to, PM_GetUserInformation.value.role, PM_Permissions);
				// }
				break;
		}
	});

	/**
	 *
	 * @param {*} route | Route accessed by the user
	 * @param {*} role | User role (per system)
	 * @param {*} permissions | Routes that user can access
	 */
	const validateRouteAccess = (route, role, permissions) => {
		// let routeIndex = permissions.roles[role].routes.findIndex((route_name) => route_name === route.name);
		// routeIndex === -1 && router.go(-1);
	};
});
