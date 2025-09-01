<template>
    <div class="customer-support" :class="$q.screen.width < '768' ? 'core-bg-secondary q-pt-md q-pb-xl' : 'q-pa-lg'">
      <h6 class="title text-26 text-semibold q-my-none">Contact Olympus Support
        <div class="text-16" :class="$q.screen.width < '768' ? 'q-mx-xl q-mt-md core-text-primary line-height-15' : 'text-accent-2'">Send us a message and we'll reach out to you as soon as we recieve it.</div>
        <Navigation class="q-mt-lg q-px-lg" />
      </h6>
      <div :class="$q.screen.width < '768' && 'q-px-md core-bg-white'">
        <q-form ref="customerSupportForm" class="row">
          <div class="col-12 col-sm-5 col-md-4 col-xl-3">
            <div class="q-mt-md text-weight-medium">Subject</div>
              <div class="row permission q-gutter-lg">
                <div class="col q-pt-xs">
                  <q-select
                    class="border-radius-10 border-violet-2 core-select-field"
                    dense
                    borderless
                    v-model="form.subject"
                    :label="form.subject ? '' : 'Select subject'"
                    emit-value
                    map-options
                    :options="options"
                    :rules="[val => !!val || '']" hide-bottom-space
                    :popup-content-class="GET_DARK_MODE_STATE ? 'option-style-dark' : 'option-style-light'"
                    :options-selected-class="GET_DARK_MODE_STATE ? 'selected-class' : ''"
                    transition-show="scale"
                    transition-hide="scale"
                  />
                </div>
              </div>
              <div class="text-weight-medium" :class="$q.screen.width < '1920' ? 'q-mt-md' : 'q-mt-xl'">Title</div>
              <q-input v-model="form.title" :rules="[val => !!val || '']" hide-bottom-space dense borderless placeholder="Title" class="core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-sm" />
              <div class="text-weight-medium" :class="$q.screen.width < '1920' ? 'q-mt-md' : 'q-mt-xl'">Description</div>
              <div class="q-mb-xl">
                <q-input borderless
                  v-model="form.description"
                  :rules="[val => !!val || '']" hide-bottom-space
                  type="textarea"
                  class="core-input-field textarea label-accent-2 border-radius-10 border-violet-2 q-mt-sm"
                  :label="form.description ? '' : 'Tell us what we can solve for you'"
                />
            </div>
          </div>
          <div class="col-12">
            <h6 class="q-ma-none text-22 text-semibold">How can we reach you?
              <div class="text-accent-2 text-16">We'll contact you through your chosen communication.</div>
            </h6>
          </div>
          <div class="col-12 col-sm-5 col-md-4 col-xl-3 q-mt-lg">
            <q-input v-model="form.contact_number" :rules="[val => !!val || '']" hide-bottom-space unmasked-value dense borderless mask="#### ### ###" placeholder="+63 000 000 0000" class="core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md" input-class="text-right">
              <template v-slot:prepend><q-icon class="text-violet-2" name="phone"/></template>
            </q-input>
            <q-input v-model="form.email_address" :rules="rules.email_address" lazy-rules hide-bottom-space dense borderless placeholder="Email address" class="core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-lg q-mb-xl" input-class="text-right">
              <template v-slot:prepend><q-icon class="text-violet-2" name="mail"/></template>
            </q-input>
            <q-btn @click="submitTicket()" :loading="btnLoadingState" :class="$q.screen.width < '768' ? 'full-width border-radius-10' : 'q-mt-xl'" flat :rounded="$q.screen.width < '768' ? false : true" dense no-caps class="bg-violet-0 q-py-sm q-px-xl text-white" label="Submit Ticket"/>
          </div>
        </q-form>
      </div>
    </div>
</template>

<script src="../scripts/CustomerSupport"></script>
<style lang="scss">
  @import "../styles/CustomerSupport";
</style>
