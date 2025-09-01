<template>
	<div class="core-index text-white full-width">
		<div class="row">
			<div class="col-12 apps q-pl-lg">
				<div class="row apps-row">
					<div class="col-12">
						<div class="row tablet-header q-py-lg q-pr-lg q-mr-md q-mb-sm" v-if="!$q.screen.gt.md">
							<div class="col-8 text-18 core-text-primary text-bold">Apps Installed</div>
							<div class="col-2 text-11 core-text-primary text-right text-bold">Version 20.2.1</div>
							<div class="col-2 text-14 text-right text-violet-2 text-bold">New Updates!</div>
						</div>
						<div class="row items-center">
							<div class="col-6">
								<div class="header text-h1 text-18 core-text-primary text-bold">Apps Installed</div>
							</div>
							<div class="col-6 text-right">
								<div class="see-all" v-if="$q.screen.lt.md">
									<q-btn
										rounded
										flat
										no-caps
										class="
											border-violet-0
											bg-hover-violet-1
											core-text-secondary
											text
											q-mr-sm
											text-13 text-semibold
										"
										label="see all"
									/>
								</div>
							</div>
						</div>
					</div>

					<div
						class="col-6 col-sm-4 col-md-2 q-mb-lg app-column"
						v-for="(systems, alias) in GetSystems"
						:key="systems"
					>
						<div class="q-mr-lg">
							<AppThumbnail :name="systems.name" :description="systems.description" :alias="alias" />
						</div>
					</div>
				</div>
			</div>
<!-- 
			<div class="col-12 quicklinks q-px-lg">
				<div class="row wrapper">
					<div class="col-12">
						<div class="text-18 core-text-primary text-bold q-pb-sm">Quick Links</div>
					</div>
					<div class="col-12 col-sm-6 col-md-4 q-py-md biometrics-section">
						<div class="text-12 core-text-primary gt-xs inline">Biometrics</div>
						<div class="flex links-buttons">
							<div class="btn-wrapper q-pt-sm">
								<q-btn
									rounded
									flat
									no-caps
									class="
										biometric-buttons
										border-violet-0
										bg-hover-violet-1
										core-text-secondary
										text
										q-mr-sm
										text-13 text-semibold
									"
									label="Add Device"
								/>
							</div>
							<div class="btn-wrapper q-pt-sm">
								<q-btn
									rounded
									flat
									no-caps
									class="
										biometric-buttons
										border-violet-0
										bg-hover-violet-1
										core-text-secondary
										q-mr-sm
										text-13 text-semibold
									"
									label="Register User Data"
								/>
							</div>
						</div>
					</div>
					<div class="col-12 col-sm-6 col-md-4 q-py-md ip-section">
						<div class="text-12 core-text-primary gt-xs inline">IP Management</div>
						<div class="flex links-buttons">
							<div class="btn-wrapper q-pt-sm">
								<q-btn
									rounded
									flat
									no-caps
									class="
										ip-buttons
										border-violet-0
										bg-hover-violet-1
										core-text-secondary
										q-mr-sm
										text-13 text-semibold
									"
									label="View IP Connections"
								/>
							</div>
							<div class="btn-wrapper q-pt-sm">
								<q-btn
									rounded
									flat
									no-caps
									class="
										ip-buttons
										border-violet-0
										bg-hover-violet-1
										core-text-secondary
										q-mr-sm
										text-13 text-semibold
									"
									label="Block IP"
								/>
							</div>
						</div>
					</div>
					<div class="col-12 col-md-4 q-py-md customer-support-section">
						<div class="text-12 core-text-primary gt-xs inline">Customer Support</div>
						<div class="flex q links-buttons">
							<div class="btn-wrapper btn-customer-support q-pt-sm">
								<q-btn
									rounded
									flat
									no-caps
									class="
										customer-support-buttons
										border-violet-0
										bg-hover-violet-1
										core-text-secondary
										q-mr-sm
										text-13 text-semibold
									"
									label="Report an Issue"
								/>
							</div>
							<div class="btn-wrapper btn-customer-support q-pt-sm">
								<q-btn
									rounded
									flat
									no-caps
									class="
										customer-support-buttons
										border-violet-0
										bg-hover-violet-1
										core-text-secondary
										q-mr-sm
										text-13 text-semibold
									"
									label="FAQ's"
								/>
							</div>
							<div class="btn-wrapper btn-customer-support q-pt-sm">
								<q-btn
									rounded
									flat
									no-caps
									class="
										customer-support-buttons
										border-violet-0
										bg-hover-violet-1
										core-text-secondary
										q-mr-sm
										text-13 text-semibold
									"
									label="Feature Request"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-12 relative-position whats-new">
				<div class="row posts-container q-pt-sm q-px-lg">
					<div class="col-12">
						<div class="text-18 core-text-primary text-bold q-py-lg">What's New?</div>
					</div>
					<div class="col-12 posts-btn-wrapper">
						<div class="posts-btn text-left q-pb-sm">
							<div
								class="q-pl-none posts"
								active-class="text-blue"
								style="cursor: pointer"
								clickable
								@click="displayBySystemName('all')"
							>
								<div class="default-btn core-text-secondary text-14">All</div>
							</div>
							<div
								v-for="list in systemListData"
								:key="list"
								class="posts"
								active-class="text-blue"
								style="cursor: pointer"
								clickable
								@click="displayBySystemName(list.system_name)"
							>
								<div class="system-btn text-14 core-text-primary q-px-xl">{{ list.system_name }}</div>
							</div>
						</div>
					</div>

					<div class="col-12 q-pt-sm">
						<q-infinite-scroll @load="onLoad" :offset="250">
							<WhatsNew :posts="getWhatsNew" />
							<template v-slot:loading>
								<div class="row justify-center q-my-md core-text-primary">
									<q-spinner-dots size="40px" />
								</div>
							</template>
						</q-infinite-scroll>
					</div>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script src="./../script/Dashboard.js"></script>

<style lang="scss">
@import './../styles/Dashboard.scss';
</style>
