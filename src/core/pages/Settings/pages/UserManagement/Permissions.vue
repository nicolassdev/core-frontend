<template>
  <div class="permissions full-height">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <q-icon @click="$router.go(-1)" class="core-text-primary cursor-pointer q-mt-sm" name="arrow_back" />
        <h4 class="core-text-primary text-26 text-semibold title q-my-none q-ml-lg text-capitalize">
          {{ $route.params.system_name }} App Permissions
        </h4>
      </div>
      <div>
        <q-toggle
          v-model="selectALLPermissions"
          label="All"
          left-label
          size="xs"
          color="deep-purple-6"
          @click="selectAllFunctions('parent')"
          class="core-toggle q-mr-lg"
        />
      </div>
    </div>
    <div v-if="!showInnerLoading" class="q-mt-sm">
      <q-list>
        <q-expansion-item
          dense-toggle
          v-for="module in systemModules"
          :key="module"
          class="border-bottom-accent-3"
        >
          <template v-slot:header>
            <q-item-section class="max-width-30">
              <q-img :src="require(`../../../../assets/juanhr-logo.svg`)" height="30px" />
            </q-item-section>
            <q-item-section class="text-capitalize">
              <!-- module name -->
              {{ module[0] }}
              <!-- module description -->
              <div class="text-12 core-text-secondary ellipsis">
                {{ module[1].description }}
              </div>
            </q-item-section>
          </template>
          <q-card class="transparent q-px-lg">
            <div class="flex justify-between items-center q-my-sm">
              <div>Select All</div>
              <div>
                <q-toggle
                  v-model="permissions"
                  left-label
                  :val="module[0]"
                  size="xs"
                  :label="permissions.find((m) => m === module[0]) ? 'On' : 'Off'"
                  color="deep-purple-6"
                  @click="
                    selectAllFunctions('subParent', {
                      functions: module[1].functions,
                      name: module[0],
                    })
                  "
                  class="core-toggle"
                />
              </div>
            </div>
            <q-separator class="core-text-secondary q-my-md" />
            <!-- module functions -->
            <div
              v-for="permission in module[1].functions"
              :key="permission"
              class="row no-wrap items-center"
            >
              <div>
                <!-- permission name -->
                <div class="text-capitalize">
                  {{ permission.name ? permission.name : "Name Not Set" }}
                </div>
                <!-- permission description -->
                <div class="text-12 core-text-secondary ellipsis">
                  {{
                    permission.description
                      ? permission.description
                      : "Description Not Set"
                  }}
                </div>
              </div>
              <q-space />
              <div>
                <q-toggle
                  class="core-toggle"
                  :label="functionIds.find((e) => e === permission.id) ? 'On' : 'Off'"
                  v-model="functionIds"
                  :val="permission.id"
                  @click="
                    selectAllFunctions('child', {
                      functions: module[1].functions,
                      name: module[0],
                    })
                  "
                  left-label
                  size="xs"
                  color="deep-purple-6"
                />
              </div>
            </div>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
    <div v-if="showInnerLoading" class="absolute-center text-center">
      <q-spinner class="core-text-primary" size="3em" :thickness="1" />
      <div>Fetching data...</div>
    </div>
  </div>
</template>

<script src="./scripts/Permissions.js"></script>

<style lang="scss">
.permissions {
  .max-width-30 {
    max-width: 30px;
  }
}
</style>
