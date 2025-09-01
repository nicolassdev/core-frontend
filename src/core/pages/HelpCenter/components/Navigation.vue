<template>
  <div class="row q-px-md" :class="$q.screen.width >= '768' && 'hidden'">
    <q-item :to="{name: 'frequently-ask-questions'}" class="col-6 q-pa-none">
      <div class="q-py-sm q-pr-sm">
        <div :class="$route.name === 'frequently-ask-questions' && 'border-violet-2'" class="shadow-4 border-radius-10 core-bg-accent-0 q-pa-md full-width full-height">
          <q-icon class="text-violet-3" size="md" name="quiz" />
          <div class="core-text-primary q-mt-md text-12 line-height-15">Frequently Ask Questions</div>
        </div>
      </div>
    </q-item>
    <q-item :to="{name: 'customer-support'}" class="col-6 q-pa-none">
      <div class="q-py-sm q-pl-sm full-width full-height">
        <div :class="$route.name === 'customer-support' && 'border-violet-2'" class="shadow-4 border-radius-10 core-bg-accent-0 q-pa-md">
          <q-icon class="text-violet-3" size="md" name="support_agent" />
          <div class="core-text-primary q-mt-md text-12">Customer Support</div>
        </div>
      </div>
    </q-item>
  </div>
</template>
