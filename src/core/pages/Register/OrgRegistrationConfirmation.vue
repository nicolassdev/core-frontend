<template>
	<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="2000">
		<div class="core-registration fixed-center">
			<div class="text-center">
				<!-- logo image -->
				<q-img :src="getImagePath('logo.png')" alt="Image Description" class="icon" style="width: 13%"></q-img>
			</div>

			<div class="q-pt-xl q-pb-md text-26 text-center text-bold">Registration Confirmation</div>
			<div class="text-20 q-pb-md">Your organization account registration has been successfull!</div>
			<div class="q-my-xl flex justify-center items-center">
				<canvas id="qr-code"></canvas>
			</div>
			<div class="q-mt-xl q-mb-md flex flex-center">
				<q-btn
					dense
					flat
					no-caps
					label="Download QR Code"
					@click="downloadQRCode()"
					rounded
					class="q-px-md text-white bg-violet-0 q-px-xl"
				/>
			</div>
			<RouterLink :to="{ name: 'core-login' }" class="text-center block">Redirect to login</RouterLink>
		</div>
	</transition>
</template>

<script src="./scripts/OrgRegistrationConfirmation.js"></script>

<style lang="scss" scoped>
@import './styles/Registration.scss';
</style>
