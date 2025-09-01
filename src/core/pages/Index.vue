<template>
	<div class="core-index text-white full-width">
		<div class="text-h1 text-18 core-text-primary text-bold">System Name</div>
		<div class="row">
			<div class="col-6 col-sm-4 col-md-2 q-mb-lg" v-for="(systems, alias) in SystemList" :key="systems">
				<div class="q-mr-lg">
					<q-btn
						:loading="btnLoading"
						flat
						@click="redirectTo(alias)"
						class="row cursor-pointer border-radius-10 relative-position full-width q-px-md q-py-xl"
					>
						<div class="col-5">
							<q-avatar square style="font-size:70px">
								<q-img src="./../statics/apps/skb-logo.png" size="lg" />
							</q-avatar>
						</div>
						<div class="col-7">
							<h5 class="text-white text-23 text-bold q-my-none text-left ellipsis">
								{{ systems.name }}
							</h5>
						</div>
					</q-btn>
					<div class="col-12 text-center">
						<h6 class="core-text-primary text-18 q-ma-none q-mt-md text-weight-regular ellipsis">
							{{ systems.description }}
						</h6>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import {SystemList} from './../composables/Authenticate'
export default {
  setup () {
    return {
      SystemList
    }
  },
	name: 'Index',
	data() {
		return {
			btnLoading: false,
			triggers: {
				isLoading: false,
			},
		};
	},
	methods: {
		redirectTo(alias) {
			this.btnLoading = true;
			setTimeout(() => {
				this.$router.push({ name: alias, params: { alias: alias } });
			}, 1000);
		},
	},
};
</script>

<style lang="scss">
.core-index {
	.q-btn {
		background: #ffbf67;
	}
}
</style>
