<template>
	<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="2000">
		<div class="core-reset flex justify-center items-center full-width">
			<div class="my-card q-mt-xl">
				<q-card-section class="text-center q-mt-md">
					<div class="q-mb-xs text-26 q-my-sm">Forgot Password</div>
					<label>We’ve sent a code to your email</label>
				</q-card-section>

				<q-card-section class="q-px-xl q-pt-none q-pb-xl" v-if="form.email && !reset_password">
					<q-form @submit="verifyOTP" @reset="onReset" class="q-gutter-y-md">
						<div class="input-highlight">
							<div class="text-13 q-mt-lg q-mb-xs">Email Address</div>
							<q-input
								v-model="form.email"
								type="text"
								color="teal"
								lazy-rules
								hide-bottom-space
								class="core-input-field standard border-accent-0 border-radius-10 q-px-sm"
								dense
								borderless
								disable
								:rules="[
									(val) => !!val || 'OTP is required',
									(val) => val.length === 4 || 'OTP should be 4 characters',
								]"
							/>

							<div class="input-highlight">
								<div class="text-13 q-mt-md q-mb-xs">
									Enter Code <span class="text-negative">*</span>
								</div>
								<q-input
									v-model="form.otp"
									type="text"
									color="teal"
									lazy-rules
									hide-bottom-space
									class="core-input-field standard border-accent-0 border-radius-10 q-px-sm"
									dense
									borderless
									:rules="[
										(val) => !!val || 'OTP is required',
										(val) => val.length === 4 || 'OTP should be 4 characters',
									]"
								>
									<template v-slot:append>
										<q-icon name="help_outline" color="grey">
											<q-tooltip>Check your email for the OTP code</q-tooltip>
										</q-icon>
									</template>
								</q-input>
							</div>
						</div>
						<div class="q-mt-md">
							<!-- Increased top margin -->
							<q-btn
								label="Continue"
								type="submit"
								class="continue full-width text-white"
								size="18px"
								:loading="loading"
								style="background-color: #6200ea"
								no-caps
							/>
						</div>

						<!-- OTP Field - More Visible -->
					</q-form>
				</q-card-section>

				<q-card-section class="q-px-xl q-pt-none q-pb-xl" v-if="reset_password">
					<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md">
						<!-- New Password Field - More Visible -->
						<div class="input-highlight">
							<q-input
								outlined
								v-model="passwordForm.new_password"
								label="New Password"
								:type="showPassword ? 'text' : 'password'"
								color="teal"
								lazy-rules
								dense
								:rules="[(val) => !!val || 'Password is required']"
							>
								<template v-slot:append>
									<q-icon
										:name="showPassword ? 'visibility_off' : 'visibility'"
										class="cursor-pointer"
										color="primary"
										@click="showPassword = !showPassword"
									/>
								</template>
							</q-input>
						</div>

						<!-- Confirm Password Field - More Visible -->
						<div class="input-highlight">
							<q-input
								outlined
								v-model="passwordForm.password"
								label="Confirm Password"
								:type="showPassword ? 'text' : 'password'"
								color="teal"
								lazy-rules
								dense
								class="input-forgot"
								:rules="[
									(val) => !!val || 'Please confirm your password',
									(val) => val === passwordForm.new_password || 'Passwords do not match',
								]"
							>
							</q-input>
						</div>

						<div class="q-mt-md">
							<!-- Increased top margin -->
							<q-btn
								label="Continue"
								type="submit"
								class="continue full-width text-white"
								size="18px"
								:loading="loading"
								style="background-color: #6200ea"
								no-caps
							/>
						</div>

						<div class="text-center q-mt-md">
							<router-link to="/login" class="text-primary text-weight-medium">Back to Login</router-link>
						</div>
					</q-form>
				</q-card-section>
			</div>
		</div>
	</transition>
</template>
<script src="./scripts/ResetPassword.js"></script>

<style lang="scss">
@import './styles/ResetPassword.scss';
</style>
