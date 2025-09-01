<template>
	<q-btn icon="close" flat dense rounded class="float-right q-mb-xl" @click="closeDialog()" />
	<div class="width-300 q-pt-lg">
		<div class="content flex justify-center q-my-lg q-ml-sm">
			<div class="border profile four avatar overflow-hidden relative-position">
				<q-img
					v-if="tempImage"
					width="100"
					height="100"
					:src="tempImage"
					:style="`transform: scale(${zoomLevel})`"
				/>
				<q-img v-else-if="User.photo" width="100" height="100" :src="`data:image/png;base64, ${User.photo}`" />
				<q-img
					v-else
					class="fit"
					:src="require(`./../../../assets/${!User.sex ? 'male' : 'female'}-avatar.svg`)"
				/>
			</div>
		</div>

		<div v-if="resize && tempImage" class="q-mt-md flex justify-center row">
			<!-- Zoom controls -->

			<q-btn class="col-1" round dense flat icon="zoom_out" @click="zoomOut" :disable="zoomLevel <= 0.5" />
			<q-slider
				class="col q-mx-md"
				color="white"
				v-model="zoomLevel"
				:min="0.5"
				:max="2"
				:step="0.1"
				style="width: 200px"
			/>
			<q-btn class="col-1" round dense flat icon="zoom_in" @click="zoomIn" :disable="zoomLevel >= 2" />
		</div>
		<div class="flex justify-between q-mt-md row">
			<q-btn
				flat
				rounded
				no-caps
				outline
				dense
				primary
				icon="edit"
				:label="resize ? 'Back' : 'Change'"
				class="col border-violet-2 q-py-xs q-mr-md cursor-pointer text-14 q-mt-md"
				@click="handleButton"
				v-if="!resize"
			>
				<input ref="fileInput" type="file" style="display: none" @change="pushUpload" accept="image/*"
			/></q-btn>
			<q-btn
				v-else
				flat
				rounded
				no-caps
				outline
				dense
				primary
				:label="resize ? 'Back' : 'Change'"
				class="col border-violet-2 q-py-xs q-mr-md cursor-pointer text-14 q-mt-md"
				@click="handleButton"
			/>

			<q-btn
				flat
				outline
				rounded
				dense
				no-caps
				class="col bg-violet-0 q-py-none cursor-pointer text-14 q-mt-md"
				color="white"
				:disable="!hasImageToSave"
				:label="!resize ? 'Next' : 'Save'"
				@click="resize ? saveImage() : (resize = true)"
			>
				<q-tooltip v-if="!isNext"> Please upload a photo first </q-tooltip>
			</q-btn>
		</div>
	</div>
</template>

<script>
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import { ref, computed } from 'vue';
import { UpdateProfileImage } from './../../../composables/Profile';
import { ToggleMainDialogState } from '../../../composables/Triggers';
import { UserDetails } from './../../../composables/UserManagement';
export default {
	setup() {
		const $q = useQuasar();
		const store = useStore();

		let btnLoadingState = ref(false);
		let resize = ref(false);
		let isNext = ref(false);

		const tempImage = ref(null); // For storing the preview image
		const selectedFile = ref(null); // For storing the actual file

		const fileInput = ref(null);
		let zoomLevel = ref(1);

		const closeDialog = () => {
			tempImage.value = null;
			selectedFile.value = null;
			zoomLevel.value = 1;
			isNext.value = false;
			resize.value = false;
			ToggleMainDialogState();
		};

		if (UserDetails.value.photo) {
			tempImage.value = `data:image/png;base64,${UserDetails.value.photo}`;
		}

		// Computed property to check if there's an image to save
		const hasImageToSave = computed(() => {
			return !!selectedFile.value;
		});

		// Function to hold the upload file
		const pushUpload = (event) => {
			const file = event.target.files;
			// Check file size (max 2MB)
			const validFiles = checkFileSize(Array.from(file));
			if (validFiles.length === 0) {
				$q.notify({
					position: 'top-right',
					classes: 'bg-violet-0 q-px-lg q-pt-none q-pb-none',
					html: true,
					message: `<span>Failed,</span> File size must be less than 10MB`,
					actions: [{ icon: 'close', color: 'white' }],
				});
				return;
			}

			/** Function for uploading avatar */
			let formData = new FormData();
			formData.append('file', validFiles[0]);
			formData.append('id', UserDetails.value.id);
			formData.id = UserDetails.value.id;

			// Store the selected file
			selectedFile.value = validFiles[0];
			if (selectedFile.value) {
				isNext.value = true;
			} else {
				resize.value = false;
				isNext.value = false;
			}
			// Create preview
			const reader = new FileReader();
			reader.onload = (e) => {
				tempImage.value = e.target.result;
			};
			reader.readAsDataURL(validFiles[0]);
		};

		// Save the uploaded image
		const saveImage = async () => {
			if (!selectedFile.value) return;

			btnLoadingState.value = true;

			try {
				const formData = new FormData();
				formData.append('file', selectedFile.value);
				formData.append('id', UserDetails.value.id);

				const response = await UpdateProfileImage(formData);

				const status = Boolean(response.status === 'success');
				$q.notify({
					position: 'top-right',
					classes: 'bg-violet-0 q-px-lg q-pt-none q-pb-none',
					html: true,
					actions: [{ icon: 'close', color: 'white' }],
					message: status
						? `<span>Success,</span> Photo updated successfully!`
						: `<span>Failed,</span> ${response.message}`,
				});

				if (status) {
					// Refresh user data or update local state
					// Then close the dialog
					closeDialog();
				}
			} catch (error) {
				$q.notify({
					message: 'Upload failed: ' + error.message,
					color: 'negative',
				});
			} finally {
				btnLoadingState.value = false;
			}
		};

		// function to zoom in the image
		const zoomIn = () => {
			if (zoomLevel.value < 2) {
				zoomLevel.value += 0.1;
			}
		};

		// function to zoom out the image
		const zoomOut = () => {
			if (zoomLevel.value > 0.5) {
				zoomLevel.value -= 0.1;
			}
		};

		const handleButton = () => {
			if (!resize.value) {
				fileInput.value.click();
			} else {
				resize.value = false;
				zoomLevel.value = 1;
			}
		};

		// function for validation file size
		const checkFileSize = (files) => {
			/** Max 2 MB */
			return files.filter((file) => file.size < 10485760);
		};

		let User = computed(() => {
			try {
				return UserDetails.value;
			} catch (error) {
				return {
					photo: null,
					sex: null,
				};
			}
		});

		return {
			btnLoadingState,
			hasImageToSave,
			fileInput,
			zoomLevel,
			tempImage,

			resize,
			User,
			isNext,

			closeDialog,
			pushUpload,
			saveImage,
			handleButton,
			checkFileSize,
			zoomIn,
			zoomOut,
		};
	},
};
</script>

<style lang="scss" scoped>
.uploader {
	border: dashed 1px white;
	border-radius: 10px !important;
	min-height: 130px;
	max-height: 200px;
}

.avatar {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	border-color: $violet-0;
}
</style>
