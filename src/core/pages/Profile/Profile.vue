<template>
	<div class="profile">
		<div class="flex justify-between items-center q-mb-lg">
			<h4 class="core-text-primary text-26 text-semibold q-my-none">Personal Management</h4>
			<q-btn
				flat
				dense
				:rounded="!$q.screen.lt.sm"
				no-caps
				:class="
					!$q.screen.lt.sm &&
					'q-px-xl q-mt-sm height-38 core-text-secondary bg-hover-violet-0 border-violet-2'
				"
				:to="{ name: 'edit-profile', params: { id: UserDetails.id } }"
				:label="$q.screen.width > 767 ? 'Edit Profile' : ''"
				><q-icon v-if="$q.screen.width < 768" class="edit"
			/></q-btn>
			<!-- :to="{ name: 'core-profile-form' }" -->
		</div>
		<div>
			<h3 class="text-23 q-my-none">Profile Details</h3>
			<div class="row text-20">
				<div class="col-2 text-accent-2">First Name</div>
				<div class="col-5">{{ UserDetails.first_name }}</div>
			</div>
			<div class="row text-20">
				<div class="col-2 text-accent-2">Last Name</div>
				<div class="col-5">{{ UserDetails.last_name }}</div>
			</div>
			<div class="row text-20">
				<div class="col-2 text-accent-2">Address</div>
				<div class="col-6">{{ UserDetails.address }}</div>
			</div>
			<div class="row text-20">
				<div class="col-2 text-accent-2">Email Address</div>
				<div class="col-6">{{ UserDetails.email_address }}</div>
			</div>
			<div class="row text-20">
				<div class="col-2 text-accent-2">Contact Number</div>
				<div class="col-5">+63 {{ UserDetails.contact_number }}</div>
			</div>
			<div class="row text-20">
				<div class="col-2 text-accent-2">Birthdate</div>
				<div class="col-5">{{ UserDetails.birthdate }}</div>
			</div>
		</div>
	</div>
</template>
<script src="./script/Profile.js"></script>
