<template>
	<div class="forgot-password-page flex justify-center">
		<div class="forgot-password-card q-pa-md q-my-xl">
			<q-card-section class="text-center">
				<div class="q-mb-xs text-26 q-my-sm">Forgot Password</div>
			</q-card-section>

			<q-card-section>
				<q-form @submit="onSubmit" class="q-gutter-y-md">
					<p class="text-20">Email Address <span class="text-red">*</span></p>
					<q-input
						dense
						borderless
						hide-bottom-space
						class="core-input-field standard border-accent-0 border-radius-10 q-px-sm"
						v-model="form.emails"
						placeholder="Enter your email address"
						type="email"
						lazy-rules
						:rules="[(val) => /.+@.+\..+/.test(val) || 'Please enter a valid email']"
					/>

					<q-btn
						label="Continue"
						:loading="btnLoading"
						type="submit"
						style="background-color: #6200ea"
						class="continue-btn full-width q-mt-md text-white"
						size="18px"
						unelevated
						no-caps
					/>
				</q-form>
			</q-card-section>

			<q-card-section class="text-center q-pt-none">
				<div class="text-caption text-18">
					<label class="text-grey-8 q-mr-xs">Already have an account?</label>
					<a class="text-primary cursor-pointer" @click="$router.push('core-login')"> Login </a>
				</div>
			</q-card-section>
		</div>
	</div>
</template>

<script src="./scripts/ForgotPassword.js"></script>

<style lang="scss">
@import './styles/ForgotPassword.scss';
</style>
