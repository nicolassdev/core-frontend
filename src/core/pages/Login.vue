<template>
	<div class="core-login">
		<div class="row full-height full-width justify-center items-center">
			<div class="core-quasar full-height flex justify-center items-center">
				<div v-if="!state.isLoading" class="col-3 relative-position">
					<transition
						appear
						enter-active-class="animated zoomIn"
						leave-active-class="animated zoomOut"
						:duration="4000"
					>
						<div
							v-if="error"
							class="bg-red text-white text-16 q-px-md q-py-sm q-mb-sm rounded-borders text-center"
						>
							<q-icon name="close" class="q-pr-sm" size="sm" />
							{{ errorMessage }}
						</div>
					</transition>
					<div class="row justify-center items-center">
						<q-form class="" @keyup.enter="loginUser">
							<div class="col-12 q-pt-md text-white">
								<q-input
									dense
									borderless
									:input-class="usernameInput"
									v-model="form.username"
									@update:model-value="usernameBehavior"
									placeholder="Username"
									class="q-pb-none q-pb-sm q-mb-md"
									:class="!error ? 'border-bottom-white' : 'border-bottom-red'"
								>
									<template v-slot:prepend>
										<q-icon :class="userNameIcon" class="q-px-md" name="person" />
									</template>
								</q-input>

								<q-input
									dense
									borderless
									:input-class="passwordInput"
									:type="isPwd ? 'password' : 'text'"
									v-model="form.password"
									@update:model-value="passwordBehavior"
									placeholder="Password"
									class="q-pb-none q-pb-sm"
									:class="!error ? 'border-bottom-white' : 'border-bottom-red'"
								>
									<template v-slot:prepend>
										<q-icon :class="passwordIcon" class="q-px-md" name="lock" />
									</template>
									<template v-slot:append>
										<q-icon
											:name="isPwd ? 'visibility_off' : 'visibility'"
											class="cursor-pointer text-accent-3"
											@click="isPwd = !isPwd"
										/>
									</template>
								</q-input>
							</div>

              <div class="col-12 q-px-lg q-pt-xl">
                <div>
                  <q-btn
                    rounded
                    flat
                    dense
                    no-caps
                    :class="
                      disabledBtn ? 'bg-accent-3 text-black' : 'bg-violet-0 text-white'
                    "
                    class="full-width"
                    label="Log In"
                    size="18px"
                    @click="loginUser"
                    :disable="disabledBtn"
                    :loading="btnLoadingState"
                  />
                </div>
                <!-- <div class="column no-wrap q-py-md text-center">
                  <a
                    class="text-white cursor-pointer"
                    @click="$router.push('core-forgot-password')"
                  >
                    Forgot Password?
                  </a>
                  <div class="row no-wrap items-center self-center q-mt-sm">
                    <label class="text-grey-8 q-mr-xs">Don't have an account?</label>
                    <a
                      class="text-white cursor-pointer"
                      @click="$router.push('core-registration')"
                    >
                      Register
                    </a>
                  </div>
                </div> -->
              </div>
            </q-form>
          </div>
        </div>

				<div v-else class="col-12 full-width text-center text-white">
					<div class="q-mb-xl">
						<h1 class="text-60 text-weight-medium q-my-none">Welcome Back!</h1>
						<p class="text-28">We're just loading data for you.</p>
					</div>
					<div>
						<q-linear-progress
							rounded
							size="7px"
							:value="progress"
							class="bg-white border-primary text-violet-0"
						/>
						<p class="text-22 text-violet-4 q-mt-sm text-bold">Updating the dashboard...</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { LoginUser } from './../composables/Authenticate';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ToggleMainDialogState } from '../composables/Triggers';
import MainDialog from '../components/MainDialog.vue';
import RegistrationOptions from './components/RegistrationOptions';
import { resetForm } from './Register/composables/index';

export default {
	name: 'Login',
	components: { MainDialog, RegistrationOptions },
	setup() {
		const store = useStore();
		const router = useRouter();

		let disabledBtn = ref(true);
		let btnLoadingState = ref(false);
		let isPwd = ref(true);
		let progress = ref(0);
		let usernameInput = ref('text-white');
		let passwordInput = ref('text-white');
		let passwordIcon = ref('text-violet-0');
		let userNameIcon = ref('text-violet-0');

		let state = ref({
			isLoading: false,
			step: 1,
		});

		let error = ref(false);
		let errorMessage = ref(null);

		let form = ref({
			username: null,
			password: null,
		});

		onMounted(() => {
			resetForm();
		});

		const usernameBehavior = () => {
			disabledBtn.value = form.value.username && form.value.password ? false : true;
			usernameInput.value && (usernameInput.value = 'text-white');
		};

		const passwordBehavior = () => {
			disabledBtn.value = form.value.username && form.value.password ? false : true;
			passwordInput.value && (passwordInput.value = 'text-white');
		};

		const loginUser = () => {
			btnLoadingState.value = true;
			LoginUser(form.value)
				.then((response) => {
					if (response.status === 'success') {
						showLoadingState();
					} else {
						error.value = true;
						errorMessage.value = "Sorry, that password isn't right.";
						passwordIcon.value = 'text-negative';
						userNameIcon.value = 'text-negative';
						usernameInput.value = 'text-negative';
						passwordInput.value = 'text-negative';
					}
					btnLoadingState.value = false;
				})
				.catch((error) => {
					console.log(error);
					btnLoadingState.value = false;
					errorMessage.value = 'Something went wrong!';
				})
				.finally(() => {});
		};

		const showLoadingState = () => {
			state.value.isLoading = true;
			let loadingState = setInterval(() => {
				progress.value++;
				// end loading state
				if (progress.value === 50) {
					clearInterval(loadingState);
					router.push({ name: 'core-index' });
				}
			}, 10);

			// Start loading state
			loadingState;
		};

		const openDialog = () => {
			ToggleMainDialogState();
		};

		return {
			disabledBtn,
			btnLoadingState,
			isPwd,
			progress,
			usernameInput,
			passwordInput,
			passwordIcon,
			userNameIcon,
			state,
			error,
			errorMessage,
			form,
			usernameBehavior,
			passwordBehavior,
			loginUser,
			openDialog,
		};
	},
};
</script>

<style lang="scss">
@import 'Style/Login.scss';
</style>
