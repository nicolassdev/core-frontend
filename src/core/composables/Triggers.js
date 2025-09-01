import { LocalStorage } from 'quasar';
import { ref } from 'vue';

let DarkMode = ref(LocalStorage.getItem('_DarkMode') ? true : false);
let DialogState = ref(false);

let mobileHeaderTitle = ref(null);
let MenuBtnState = ref(false);
let showMobileSearch = ref(false);
let SearchBtnState = ref(false);

const ToggleDarkModeState = () => {
	DarkMode.value = !DarkMode.value;
	LocalStorage.set('_DarkMode', DarkMode.value);
};

const ToggleMainDialogState = () => {
	DialogState.value = !DialogState.value;
};

export {
	DarkMode,
	DialogState,
	MenuBtnState,
	SearchBtnState,
	ToggleDarkModeState,
	ToggleMainDialogState,
	mobileHeaderTitle,
	showMobileSearch
};
