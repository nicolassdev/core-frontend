<template>
	<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="2000">
		<div
			:class="`core-registration ${$q.screen.width > 767 ? 'justify-center q-py-lg' : 'justify-between'} `"
			:style="`${$q.screen.width < 768 && 'height: calc(100vh - 80px); display: flex; flex-direction: column'}`"
		>
			<div class="text-center q-pt-xl">
				<!-- logo image -->
				<q-img :src="getImagePath('logo.png')" alt="Image Description" class="icon" :style="`${$q.screen.width > 767 ? 'width: 5%' : 'width: 13%'}`"></q-img>
			</div>

			<div :class="`${$q.screen.width > 767 ? 'q-pt-xl q-pb-md' : 'q-my-md'} text-26 text-center text-bold`">
				Registration Confirmation
			</div>
			<div class="text-20 q-pb-md text-center">
				Your personal account registration has been sucessful!
			</div>
			<div class="q-my-xl flex justify-center items-center">
				<div class="border-violet-1 inline-block" id="qr_code">
					<img :src="PersonalQRCode" alt="qr_code" />
				</div>
			</div>
			<div class="text-16 q-pb-md text-center">
				Scan this QR code to effortlessly log in and access your account
			</div>
			<div class="q-mt-xl q-mb-md flex flex-center column">
				<q-btn
					dense
					flat
					no-caps
					@click="downloadQRCode()"
					rounded
					:class="`q-px-md text-white bg-violet-0  q-px-md`"
				>
					<q-icon name="download" size="1rem" class="q-mr-lg"></q-icon>
					<div class="q-mr-lg">Download</div>
				</q-btn>
				<RouterLink :to="{ name: 'core-login' }" class="text-center text-violet-0 block q-mt-md q-mb-md">
					Redirect to login
				</RouterLink>
			</div>
		</div>
	</transition>
</template>

<script src="./scripts/RegistrationConfirmation.js"></script>

<style lang="scss" scoped>
@import './styles/Registration.scss';
</style>
