import { ToggleMainDialogState } from '../../../composables/Triggers';
import { useRoute } from "vue-router";
import { personalForm } from '../composables/index';

export default {
	setup() {
        const router = useRoute();

        //open modal
        const openDialog = () => {
            ToggleMainDialogState();
        }

        const getImagePath = (logo) => {
            return require(`src/assets/img/${logo}`);
        };
        
		return {
            personalForm,
            openDialog,
            router,
            getImagePath
		};
	},
};
