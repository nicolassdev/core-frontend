<template>
	<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="2000">
		<div class="core-registration">
			<!-- verification code -->
			<div :class="`${$q.screen.width > 767 ? 'q-py-xl' : 'q-py-md'} text-center text-bold`">
				<label class="text-28">SMS Verification Code</label>
			</div>

			<div class="text-18 text-center">We have sent you a verification code to {{}}</div>
			<div class="q-pb-xl text-18 text-center">Please enter the code below to verify your account.</div>
			<div class="flex items-center justify-center row">
				<input
					v-for="i in 6"
					:key="i"
					:class="`flex items-center justify-center border-radius-5 q-ma-xs bg-grey-4 col digit-input text-center ${
						errorOccured ? 'border-red' : 'border-accent-0'
					}`"
					type="number"
					min="0"
					max="9"
					maxLength="1"
					inputmode="numeric"
					:ref="(el) => (codeInputs[i - 1] = el)"
					@keyup="handleInput(i, $event.target.value)"
				/>
			</div>
			<div class="q-pt-xl text-13 text-center">
				If you haven't received the verification code, please ensure that the provided {{ errorOccured }}
			</div>
			<div class="q-pb-xl text-13 text-center">
				contact number is correct or tap the "Resend Verification Code" the button to resend the code.
			</div>
			<div class="q-pb-lg text-center"></div>

			<div class="q-pb-md text-center">
				<q-btn
					no-caps
					flat
					class="text-accent-9"
					@click="resendOTP()"
					:loading="resendBtnLoadingState"
					label="Resend Verification Code"
				/>
			</div>
			<div class="q-pb-md text-center">
				<router-link
					to="/core-verify-sms"
					class="core-text-accent-0 text-decoration-none"
					@click="wrongNumber()"
				>
					Entered a wrong number?
				</router-link>
			</div>
		</div>
	</transition>
</template>

<script src="./scripts/VerifySms.js"></script>

<style lang="scss" scoped>
@import './styles/Registration.scss';
</style>
