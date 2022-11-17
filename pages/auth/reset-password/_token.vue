<template>
  <ActionsAuth
    :img="img"
    :welcome="$t('resetPass.welcome')"
    :please="$t('resetPass.please')"
    :second="$t('resetPass.back')"
    :btn="$t('buttons.resetPass')"
    :module="module"
    url="/login"
  >
    <template #auth>
      <FormPasswordInput
        :label="$t('inputs.password')"
        storeKey="password"
        :module="module"
        lg="12"
        md="12"
      >
        <template #icon>
          <lock-icon size="1.5x" class="custom-class"></lock-icon>
        </template>
      </FormPasswordInput>

      <FormPasswordInput
        :label="$t('inputs.passwordConfirm')"
        storeKey="passwordConfirm"
        :module="module"
        lg="12"
        md="12"
      >
        <template #icon>
          <lock-icon size="1.5x" class="custom-class"></lock-icon>
        </template>
      </FormPasswordInput>
    </template>
  </ActionsAuth>
</template>

<script>
import { LockIcon } from "vue-feather-icons";
export default {
  name: "reset-password",
  layout: "auth",
  data() {
    return {
      module: "authentication/resetPass",
      img: "reset-password-v2.svg",
      btnDisabled: false,
    };
  },
  components: {
    LockIcon,
  },
  methods: {
    resetPass() {
      this.$refs.form.validate().then((res) => {
        if (res) {
          this.btnDisabled = true;
          this.$axios
            .$patch(
              `/users/resetPassword/${this.$route.params.token}`,
              this.reset
            )
            .then((res) => {
              this.$toast.success(res.status);
              this.$router.push("/login");
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
