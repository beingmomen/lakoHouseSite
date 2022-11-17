<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <MainLogo />
          <MainTitle />
        </b-link>

        <b-card-title class="mb-1"> Welcome to Vuexy! 👋 </b-card-title>
        <b-card-text class="mb-2">
          Please sign-in to your account and start the adventure
        </b-card-text>

        <!-- form -->
        <ValidationObserver v-slot="{ handleSubmit, invalid }">
          <b-form
            class="auth-login-form mt-2"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <!-- email -->
            <ValidationProvider
              rules="required|email"
              v-slot="{ errors, classes }"
            >
              <b-form-group label-for="email" label="Email" :class="classes">
                <b-form-input
                  id="email"
                  v-model="userEmail"
                  name="login-email"
                  autocomplete="off"
                  :state="errors.length > 0 ? false : null"
                  placeholder="john@example.com"
                  autofocus
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </ValidationProvider>

            <!-- password -->
            <ValidationProvider rules="required" v-slot="{ errors, classes }">
              <b-form-group :class="classes">
                <div class="d-flex justify-content-between">
                  <label for="password">Password</label>
                  <b-link :to="{ name: 'auth-forgot-password-v1' }">
                    <small>Forgot Password?</small>
                  </b-link>
                </div>
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    class="form-control-merge"
                    autocomplete="off"
                    :state="errors.length > 0 ? false : null"
                    name="login-password"
                    placeholder="Password"
                  />

                  <b-input-group-append is-text>
                    <MainEyeIcon
                      :visibility="passwordFieldType"
                      @click.native="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </ValidationProvider>

            <!-- submit button -->
            <b-button variant="primary" type="submit" :disabled="invalid" block>
              Sign in
            </b-button>
          </b-form>
        </ValidationObserver>

        <b-card-text class="text-center mt-4">
          <span>New on our platform? </span>
          <b-link :to="{ name: 'auth-register-v1' }">
            <span>Create an account</span>
          </b-link>
        </b-card-text>
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { HelpCircleIcon, EyeIcon } from "vue-feather-icons";

export default {
  layout: "auth",
  data() {
    return {
      userEmail: "",
      password: "",
      status: "",
    };
  },
  methods: {
    onSubmit() {},
  },
  components: {
    HelpCircleIcon,
    EyeIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
