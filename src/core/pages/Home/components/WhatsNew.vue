<template>
	<div>
		<div class="core-whats-new">
			<div class="items-center new-post-container" v-for="(systems, index) in systemPost" :key="index">
				<a class="system-link core-text-primary" :href="systems.link" target="_blank">
					<q-card class="bg-accent-1 border-radius-15 cursor-pointer q-hoverable" v-ripple>
						<q-card-section class="header">
							<div class="items-center">
								<div class="full-width">
									<div class="row post-container">
										<div class="col-10 system-title text-left text-13 text-yellow text-semibold">
											<q-img
												class="q-mr-sm"
												src="./../../../statics/apps/skb-logo.png"
												size="sm"
											/>
											{{ systems.title }}
										</div>
										<div class="col system-date text-13 text-right text-yellow text-semibold">
											{{ systems.date }}
										</div>
									</div>
								</div>
							</div>
							<div id="content-text" class="q-pt-sm text-bold text-white ellipsis-2-lines">
								{{ systems.content }}
							</div>
						</q-card-section>
						<div class="img-container border-radius-15">
							<div
								class="img-bg full-height full-width"
								:style="{
									'background-image': 'url(' + systems.imgLink + ')',
									borderBottomLeftRadius: '15px',
									borderBottomRightRadius: '15px',
								}"
							></div>
						</div>
					</q-card>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import { toRef, ref, reactive, watch, onMounted } from 'vue';

export default {
	props: {
		posts: Array,
	},
	setup(props) {
		let systemPost = ref(props.posts);
		watch(
			() => props.posts,
			(newValue) => {
				systemPost.value = newValue;
			}
		);

		return {
			systemPost,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '../styles/WhatsNew.scss';
</style>
