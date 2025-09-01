<template>
	<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="2000">
		<div class="core-forgot-password flex justify-center items-center full-width column fixed-center">
			<div>
				<h1 class="text-28 text-semibold q-my-none text-center">Forgot Password</h1>
			</div>
			<div class="form-container">
				<q-form @submit="submitFunction()">
					<div class="text-13 q-mt-sm required-field q-mb-xs">
						Contact Number<span class="text-negative q-pl-xs">*</span>
					</div>
					<q-input
						dense
						mask="###-####-###"
						borderless
						unmasked-value
            v-model="contactNumber"
						placeholder="Enter Contact Number"
						:rules="[
							(val) => (!!val && String(val).trim() !== '') || '',
							(val) => /^9[0-9]{9}$/.test(val) || '',
						]"
						hide-bottom-space
						class="core-input-field standard border-accent-0 border-radius-10 q-px-sm"
					>
						<template #prepend>
							<div class="text-black text-18">+63</div>
						</template>
					</q-input>
					<div

            class="q-mt-lg full-width flex justify-center"
					>
          <!-- :class="`q-mt-xl full-width flex ${
							$q.screen.width > 767 ? 'justify-end row q-gutter-x-md' : 'column reverse full-width'
						} `" -->
						<!-- <q-btn
							dense
							flat
							no-caps
							label="Back"
							rounded
							:class="`q-px-xl ${$q.screen.width < 768 && 'border-radius-10 bg-grey-4 q-mt-sm'}`"
						/> -->
						<q-btn
							dense
							flat
							no-caps
							type="submit"
							label="Continue"
							rounded
							:class="`text-white bg-violet-0 q-px-xl standard ${
								$q.screen.width < 768 && 'border-radius-10'
							}`"
						/>
					</div>

          <div class="text-center text-20 q-mt-sm">
						Already have an account?<span
							@click="returnLogin()"
							class="text-accent-8 q-pl-xs register cursor-pointer"
							>Login</span
						>
					</div>
				</q-form>
			</div>
		</div>
	</transition>
</template>

<script src="./scripts/ForgotPassword.js"></script>

<style lang="scss" scoped>
@import './styles/ForgotPassword.scss';
</style>
