<template>
	<div class="q-pt-md core-ip-management">
		<div v-if="$q.screen.lt.md" class="mobile-view">
			<div class="row q-px-sm header-btn-container">
				<div class="col-4">
					<div class="q-mx-sm">
						<q-btn
							flat
							icon="list"
							no-caps
							class="
								bg-white
								full-width
								border-radius-12
								shadow-5
								text
								q-mr-sm
								text-13 text-semibold
								q-py-md
							"
							id="list"
							label="List"
							@click="showIpContent('btnManageIp', '')"
						/>
					</div>
				</div>
				<div class="col-4">
					<div class="q-mx-sm">
						<q-btn
							flat
							icon="edit"
							no-caps
							class="
								bg-white
								full-width
								border-radius-12
								shadow-5
								text
								q-mr-sm
								text-13 text-semibold
								q-py-md
							"
							id="manage"
							label="Manage"
							@click="showIpContent('btnManage', '')"
						/>
					</div>
				</div>

				<div class="col-4">
					<div class="q-mx-sm">
						<q-btn
							flat
							icon="settings"
							no-caps
							class="
								bg-white
								full-width
								border-radius-12
								shadow-5
								text
								q-mr-sm
								text-13 text-semibold
								q-py-md
							"
							id="preferences"
							label="Preferences"
							@click="showIpContent('btnPreferences', '')"
						/>
					</div>
				</div>
			</div>

			<div class="ip-container text-center q-pt-md">
				<!-- all connected content -->
				<div v-if="showOnMobile === 'all-connected'">
					<!-- <div class="text-26 text-bold text-center q-pt-md">All Connected</div> -->
					<q-scroll-area class="scroll-mobile">
						<q-list v-for="realtimeAccess in realtimeAccessMonitorRow" :key="realtimeAccess.id">
							<q-item class="list-ips" clickable>
								<q-item-section avatar class="avatar-icon">
									<q-avatar class="icons" icon="place" />
								</q-item-section>

								<q-item-section class="text-left">
									<q-item-label lines="1" class="text-15 core-text-secondary text-semibold">
										{{ realtimeAccess.ip_address }}
									</q-item-label>
									<q-item-label caption class="text-10 core-text-secondary duration">
										{{ realtimeAccess.duration }}
									</q-item-label>
								</q-item-section>

								<q-item-section side>
									<q-item-label caption class="text-12 core-text-secondary">
										{{ realtimeAccess.current_access }} JuanHR - Payroll
									</q-item-label>
								</q-item-section>
							</q-item>
						</q-list>
					</q-scroll-area>
				</div>
				<!-- end all connected content -->
				<!-- Preferences content -->
				<div v-if="showOnMobile === 'preferences'" class="q-px-lg q-pt-xl q-mt-sm">
					<div class="text-26 text-bold text-left q-pt-md q-pb-sm">Ip Connection Rule</div>

					<div class="row q-pt-lg">
						<div class="col-12 q-pb-sm">
							<q-toggle
								class="text-14 full-width"
								color="deep-purple-8"
								v-model="blockedIps"
								label="Allow all IP Connections, except for Blocked IPs. "
							/>
						</div>
						<div class="col-12 q-pt-lg">
							<q-toggle
								class="text-14 full-width"
								color="deep-purple-8"
								v-model="whitelistIp"
								label="Only allow connections from Whitelist. "
							/>
						</div>
					</div>

					<div class="q-my-lg q-py-xl row">
						<div class="col-6 q-pr-sm">
							<q-btn
								flat
								no-caps
								class="
									border-violet-0
									bg-hover-violet-1
									core-text-secondary
									text-12 text-semibold
									border-radius-8
									full-width
								"
								label="Add IP to Whitelist"
								@click="showIpContent('btnPreferences', '')"
							/>
						</div>

						<div class="col-6 q-pl-sm">
							<q-btn
								flat
								no-caps
								class="
									border-violet-0
									bg-hover-violet-1
									core-text-secondary
									text-12 text-semibold
									border-radius-8
									full-width
								"
								label="Manual Block IP"
								@click="showIpContent('btnPreferences', '')"
							/>
						</div>
					</div>
				</div>
				<!-- end preferences content -->

				<!-- ip manage content -->
				<div v-if="showOnMobile === 'ip-manage'" class="ips">
					<q-scroll-area class="scroll-mobile">
						<!-- List of white list ips -->
						<q-list v-for="realtimeAccess in realtimeAccessMonitorRow" :key="realtimeAccess.id">
							<q-item
								class="list-ips"
								clickable
								@click="selectedMobileIp(realtimeAccess.id, 'whitelist')"
							>
								<q-item-section avatar class="avatar-icon">
									<q-avatar
										:id="realtimeAccess.id"
										class="icons border-radius-12"
										:icon="setIcon(realtimeAccess.id)"
									/>
								</q-item-section>

								<q-item-section class="text-left">
									<q-item-label lines="1" class="text-15 core-text-secondary text-semibold">
										{{ realtimeAccess.ip_address }}
									</q-item-label>
									<q-item-label caption class="text-10 core-text-secondary duration">
										{{ realtimeAccess.duration }}
									</q-item-label>
								</q-item-section>

								<q-item-section side>
									<q-item-label caption class="text-12 core-text-secondary">
										{{ realtimeAccess.current_access }} JuanHR - Payroll
									</q-item-label>
								</q-item-section>
							</q-item>
						</q-list>
						<!-- end list of white list ips -->

						<div class="text-center q-py-lg">
							<q-btn
								flat
								class="
									border-violet-0
									bg-hover-violet-1
									core-text-secondary
									q-mr-sm
									text-12 text-semibold
									border-radius-8
								"
								no-caps
								label="Block Selected"
								@click="checkFormAction('onDesktop')"
							/>
						</div>

						<div class="text-18 text-semibold core-text-secondary text-left q-px-md">
							Blocked IP Addresses
						</div>

						<!-- List of block list ips -->
						<q-list v-for="realtimeAccess in realtimeAccessMonitorRow" :key="realtimeAccess.id">
							<q-item class="list-ips" clickable @click="selectedMobileIp(realtimeAccess.id, 'block')">
								<q-item-section avatar class="avatar-icon">
									<q-avatar
										:id="realtimeAccess.id"
										class="icons border-radius-12"
										:icon="setIcon(realtimeAccess.id)"
									/>
								</q-item-section>

								<q-item-section class="text-left">
									<q-item-label lines="1" class="text-15 core-text-secondary text-semibold">
										{{ realtimeAccess.ip_address }}
									</q-item-label>
									<q-item-label caption class="text-10 core-text-secondary duration">
										{{ realtimeAccess.duration }}
									</q-item-label>
								</q-item-section>

								<q-item-section side>
									<q-item-label caption class="text-12 core-text-secondary">
										{{ realtimeAccess.current_access }} JuanHR - Payroll
									</q-item-label>
								</q-item-section>
							</q-item>
						</q-list>
						<!-- end List of block list ips -->

						<div class="text-center q-py-lg">
							<q-btn
								flat
								class="
									border-violet-0
									bg-hover-violet-1
									core-text-secondary
									q-mr-sm
									text-12 text-semibold
									border-radius-8
								"
								no-caps
								label="Unblock Selected"
								@click="checkFormAction('onDesktop')"
							/>
						</div>
					</q-scroll-area>
				</div>
				<!-- end ip manage content -->
			</div>
		</div>
		<q-scroll-area class="core-scroll-panel-height" v-else>
			<div class="col-3">
				<h5 class="title text-28 q-ma-none text-semibold">IP Management</h5>
				<h3 class="text-16 text-bold">Real-time Access Monitor</h3>
			</div>

			<div class="row justify-end q-pb-md">
				<Pagination v-model:pagination="realtimePagination" :numRows="realtimeAccessMonitorRow" />
			</div>

			<q-table
				:rows="realtimeAccessMonitorRow"
				:columns="realtimeAccessMonitorColumn"
				:visible-columns="visibleRealtimeColumns"
				row-key="name"
				v-model:pagination="realtimePagination"
				class="core-table"
				dense
				flat
			>
				<template v-slot:body-cell-action="props">
					<q-td :props="props">
						<button class="pointer" disable>Block</button>
					</q-td>
				</template>
			</q-table>

			<!-- Toggles-->
			<div class="row">
				<div class="col-12 q-pt-md">
					<q-separator size="2px" color="grey" />
					<h3 class="text-16 text-bold q-pt-md">IP Connections Rule</h3>
				</div>
				<div class="col-6-md togglesBtn">
					<q-toggle
						class="text-14"
						color="deep-purple-8"
						v-model="blockedIps"
						label="Allow all IP connections, except for Blocked IPs"
					/>
				</div>
				<div class="col-6-md togglesBtn">
					<q-toggle
						style="border-size: 10px"
						class="q-pl-xl text-14 toggleWhite"
						color="deep-purple-8"
						v-model="whitelistIp"
						label="Only allow Connections from Whitelist"
					/>
				</div>
			</div>
			<q-separator class="q-mt-lg" size="2px" color="grey" />

			<div class="col-3">
				<h3 class="text-16 text-bold q-pt-md">Whitelist</h3>
			</div>
			<div class="row q-pb-md">
				<div class="col-3"></div>
				<div class="col-6 flex justify-center">
					<div class="ip-buttons">
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
							label="Block Batch"
							@click="checkFormAction('onDesktop')"
						/>

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
							label="Add IP to List"
						/>
					</div>
				</div>
				<div class="col-3 flex justify-end">
					<Pagination v-model:pagination="ipConnectionPagination" :numRows="ipConnectionRow" />
				</div>
			</div>

			<q-table
				:rows="ipConnectionRow"
				:columns="ipConnectionColumn"
				:visible-columns="visibleColumns"
				row-key="id"
				v-model:pagination="ipConnectionPagination"
				selection="multiple"
				:selected-rows-label="getSelectedString"
				@update:selected="getSelected"
				v-model:selected="selected"
				class="core-table"
				dense
				flat
			>
				<template v-slot:body-cell-action="props">
					<q-td :props="props">
						<button class="pointer">Block</button>
					</q-td>
				</template>
			</q-table>
		</q-scroll-area>

		<IpForm :visible="showForm" @modalState="showForm = $event" :action="modalAction" />
	</div>
</template>
<script src="./scripts/IPManagement.js"></script>
<style lang="scss" scoped>
@import './styles/IPManagement';
</style>
