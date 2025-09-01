import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { FetchUserDetails, UserDetails } from './../../../composables/UserManagement';

export default {
	setup() {
		const route = useRoute();

		// Fetch user details
		FetchUserDetails({ id: route.params.id, is_profile: 1 });

		const role = ref(['Super Admin', 'Registrar', 'Human Resource Management', 'Employee']);
		return { UserDetails, role };
	},
};
