<template>
	<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="2000">
		<div class="core-registration fixed-center">
			<div class="q-pt-xl q-pb-lg text-center text-bold">
				<label class="text-28">Verify your email address</label>
			</div>
			<!-- logo image -->
			<div class="q-pb-xl text-center">
				<q-img
					:src="getImagePath('drafts.png')"
					alt="Image Description"
					class="email-icon"
					style="width: 28%"
				></q-img>
			</div>
			<div class="text-13 text-center">Thank you for registering your organization.</div>
			<div class="q-pb-xl text-13 text-center">
				An email has been sent to the provided email address: {{ route.params.email }}
			</div>
			<div class="text-13 text-center">
				If you haven't received the email, please check your spam folder or click
			</div>
			<div class="q-pb-lg text-13 text-center">the button to resend the email verification.</div>
			<div class="text-center">
				<q-btn
					rounded
					dense
					flat
					no-caps
					label="Continue"
					class="core-border-accent-0 text-white bg-violet-0 q-px-xl"
					@click="toOrgStepOne()"
				/>
			</div>
			<div class="text-center q-pt-md text-13">
				<router-link
					to="/core-resend-verification-email"
					class="core-text-accent-0 text-decoration-none"
					@click="toEmail"
					>Resend Verification Email</router-link
				>
			</div>
		</div>
	</transition>
</template>

<script src="./scripts/OrgVerifyEmail"></script>

<style lang="scss" scoped>
@import './styles/Registration.scss';
</style>
./scripts/VerifySms.js./scripts/VerifySms.js
