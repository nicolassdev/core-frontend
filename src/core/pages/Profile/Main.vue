<template>
	<div class="core-profile main core-text-primary q-px-sm">
		<!-- <div class="col-12 col-sm-12 col-md-3">
			<div class="core-menu side full-height core-bg-accent-0">
				<div class="content flex justify-center">
					<div class="border four avatar overflow-hidden relative-position">
						<q-img
							v-if="User.photo"
							width="100"
							height="100"
							:src="`data:image/png;base64, ${User.photo}`"
						/>
						<q-img
							v-else
							class="fit"
							:src="require(`./../../assets/${!User.sex ? 'male' : 'female'}-avatar.svg`)"
						/>
						<div class="absolute-bottom camera q-py-xs flex justify-center">
							<q-icon
								@click="toggleUploaDialog()"
								name="camera"
								color="grey"
								size="sm"
								class="cursor-pointer"
							/>
						</div>
					</div>
					<CoreDialog v-if="ActiveModal === 'upload-profile'" :content="$options.components.UploadImage" />
				</div>
				<q-separator class="q-my-lg" color="grey-7" />
				<div class="subtitle core-text-secondary">
					<div class="text-violet-2">My Profile</div>
				</div>
			</div>
		</div> -->
		<div class="col-12 col-sm-12 col-md-9">
			<q-scroll-area
				class="core-menu main relative-position"
				:class="$q.screen.width >= 768 && 'core-bg-accent-0'"
				style="height: calc(100vh - 80px)"
			>
				<div>
					<router-view />
				</div>
			</q-scroll-area>
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import CoreDialog from 'src/core/components/CoreDialog';
import UploadImage from './components/UploadImage.vue';
import { UserDetails } from './../../composables/UserManagement';
import { ActiveModal } from './../../composables/Profile';
export default {
	components: {
		CoreDialog,
		UploadImage,
	},
	setup(props) {
		const $q = useQuasar();
		const router = useRouter();
		const route = useRoute();
		const store = useStore();

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

		const toggleUploaDialog = () => {
			ActiveModal.value = 'upload-profile';
			store.commit('Core/Triggers/TOGGLE_CORE_DIALOG_STATE');
		};
		return {
			toggleUploaDialog,
			User,
			ActiveModal,
		};
	},
};
</script>
<style lang="scss" scoped>
.core-profile {
	.avatar {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		border-color: $violet-0;
		.camera {
			transition: 0.2s;
			background: rgba(0, 0, 0, 0.5);
			&:hover {
				background: rgba(98, 0, 234, 0.5);
			}
		}
	}
}
</style>
