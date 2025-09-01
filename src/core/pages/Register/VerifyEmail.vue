<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="core-registration absolute-center full-width">
      <div :class="`text-center text-bold q-mb-xl`">
        <label class="text-28">Verify your email address</label>
      </div>
      <!-- logo image -->
      <div class="q-pb-xl text-center">
        <q-img
          :src="getImagePath('drafts.png')"
          alt="Image Description"
          class="email-icon q-mt-xl"
          style="width: 8rem"
        ></q-img>
      </div>
      <div class="text-13 text-center">
        We have sent you an email to {{ route.params.email }}
      </div>
      <div class="q-pb-xl text-13 text-center">
        Please follow the instructions in the email to verify your account.
      </div>
      <div class="text-13 text-center">
        If you haven't received the email, please check your spam folder or click
      </div>
      <div class="q-pb-lg text-13 text-center">
        the button to resend the email verification.
      </div>
      <div class="text-center q-pt-md text-13">
        <q-btn
          flat
          dense
          :ripple="false"
          no-caps
          @click="() => (resendDialogRef = true)"
          class="text-amber-9 border-radius-15 q-px-lg"
        >
          Resend Verification Email
        </q-btn>
      </div>
      <resend-verification-email
        :modelValue="resendDialogRef"
        :onSubmit="verifyEmail"
        :data="personalForm"
      />
    </div>
  </transition>
</template>

<script src="./scripts/VerifyEmail.js"></script>

<style lang="scss" scoped>
@import "./styles/Registration.scss";
</style>
