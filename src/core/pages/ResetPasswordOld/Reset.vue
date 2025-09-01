<template>
	<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="2000">
		<div class="core-reset flex justify-center items-center full-width">
			<!-- <div v-if="$q.screen.width > 767">
				<h1 class="text-28 text-semibold q-my-none text-center"></h1>
			</div> -->
			<q-card class="my-card text-black text-center border-bottom-red">
				<q-card-section class="q-mx-md">
					<div class="text-h4">Reset Password</div>
				</q-card-section>
				<q-card-section>
					<q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
						<q-input
							filled
							v-model="form.otp"
							flat
							dense
							placeholder="Enter your OTP"
							lazy-rules
							:rules="[(val) => !!val || 'OTP is required']"
						/>
						<q-input
							filled
							v-model="form.new_password"
							flat
							dense
							placeholder="Enter New Password"
							lazy-rules
							:rules="[(val) => !!val || 'New Password is required']"
						/>
						<q-input
							filled
							v-model="form.password"
							flat
							dense
							placeholder="Enter Confirm Password"
							lazy-rules
							:rules="[
								(val) => !!val || 'Confirm Password is required',
								(val) => val === form.new_password || 'Passwords do not match',
							]"
						/>
						<q-btn label="Reset Password" type="submit" color="primary" class="full-width item-center" />
					</q-form>
				</q-card-section>
			</q-card>
		</div>
	</transition>
</template>
<script src="./scripts/Reset.js"></script>

<style lang="scss" scoped>
@import './styles/style.scss';
</style>
