<template>
	<div class="core-avatar-card">
		<div class="row">
			<div class="col-12">
				<q-card class="avatar-card-content shadow-5 cursor-pointer" @click="showAction">
					<div class="full-height">
						<div class="flex justify-between full-height">
							<div class="flex justify start">
								<q-avatar>
									<img src="https://cdn.quasar.dev/img/avatar.png" />
								</q-avatar>
								<div class="q-ml-md flex items-center">
									<div>
										<div class="text-15 text-semibold text-primary">
											{{ userAccount.full_name }}
										</div>
										<div class="text-10 text-accent-2">@{{ userAccount.username }}</div>
										<div class="text-white text-8 bg-violet-0 border-radius-50 q-px-sm q-mt-sm">
											{{ userAccount.permission }}
										</div>
									</div>
								</div>
							</div>

							<div class="avatar-log text-right self-center">
								<div class="log-status">
									<div class="recent-log text-8 text-accent-2 q-mr-sm">
										{{ userAccount.latest_session }}
									</div>
									<span class="status self-center"></span>
								</div>
							</div>
						</div>

						<transition name="fade">
							<div class="action-button" v-if="!active">
								<q-btn-group class="full-height">
									<q-btn
										class="text-bold"
										color="red"
										label="Delete User Account"
										@click="deleteUser(userAccount.id)"
									/>
									<q-btn
										class="text-bold"
										color="primary"
										label="Reset Password"
										@click="resetPassword(userAccount)"
									/>
									<q-btn
										class="text-bold"
										color="secondary"
										label="Edit User Account"
										@click="editUser(userAccount)"
									/>
								</q-btn-group>
							</div>
						</transition>
					</div>
				</q-card>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
export default {
	name: 'CoreAvatarCard',
	props: {
		user: Object, // consist of {id, full_name, username, permission, latest_session}
	},
	setup(props, context) {
		const active = ref(true);
		const showAction = () => {
			active.value = !active.value;
		};
		const deleteUser = (id) => {
			context.emit('deleteUser', id);
		};
		const resetPassword = (user) => {
			console.log('user ', user);
			context.emit('editUser', user, 1);
		};
		const editUser = (user) => {
			context.emit('editUser', user);
		};
		const userAccount = ref(props.user);
		return {
			active,
			showAction,
			deleteUser,
			resetPassword,
			editUser,
			userAccount,
		};
	},
};
</script>
