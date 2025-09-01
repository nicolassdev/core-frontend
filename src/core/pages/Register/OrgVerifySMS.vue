<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="core-registration">
      <!-- verification code -->
      <div
        :class="`${$q.screen.width > 767 ? 'q-py-xl' : 'q-py-md'} text-center text-bold`"
      >
        <label class="text-28">SMS Verification Code</label>
      </div>
      <div class="flex justify-center">
        <div class="text-18 text-center form-container self-center">
          Thank you for registering your organization. An SMS with a verification code has
          been sent to the provided number:<b> 0{{ organizationForm.contact_number }} </b>
        </div>
      </div>
      <div class="flex justify-center q-mt-xl row">
        <input
          v-for="i in 6"
          :key="i"
          type="number"
          min="0"
          max="9"
          maxLength="1"
          inputmode="numeric"
          :class="`col digit-input text-center flex justify-center border-radius-5 q-ma-xs bg-grey-4 ${{
            'core-border-accent-0': isOtpFilled,
            'border-no-border': !timerExpired,
            'core-border-accent-red': timerExpired,
          }}`"
          :disabled="isOtpFilled || timerExpired"
          :ref="(el) => (codeInputs[i - 1] = el)"
          @keyup="handleInput(i, $event.target.value)"
        />
      </div>
      <p class="text-negative text-center q-ma-sm" v-if="timerExpired">
        Retry again later.
      </p>

      <div class="q-py-lg text-18 text-center">Time Remaining: {{ timer }}</div>
      <div class="flex justify-center">
        <div class="q-my-xl text-13 text-center form-container">
          If you did not receive the SMS with the verification code, please ensure that
          the provided phone number is correct and try again or click the button to resend
          the code.
        </div>
      </div>

      <div class="q-pb-md text-center">
        <router-link
          to="/core-org-verify-sms"
          class="core-text-accent-0 text-bold text-decoration-none"
          @click="toSms"
        >
          Resend Verification Code
        </router-link>
      </div>
      <div class="text-center">
        <router-link
          to="/core-org-verify-sms"
          class="core-text-accent-0 text-decoration-none"
          @click="toSms"
        >
          Entered a wrong number?
        </router-link>
      </div>
    </div>
  </transition>
</template>

<script src="./scripts/OrgVerifySms.js"></script>

<style lang="scss" scoped>
@import "./styles/Registration.scss";
</style>
