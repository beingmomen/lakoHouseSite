<template>
  <div class="message-online" :class="dashboardMode ? 'msg-bg' : 'msg-bg-dark'">
    <section class="landing-section container mb-0 py-4">
      <h2 class="fw-bold section-head">{{ $t("cards.onlineMessage") }}</h2>

      <b-row class="mt-4">
        <b-col cols="12" lg="6" class="mb-3">
          <ValidationObserver ref="formMsg">
            <b-form class="msg-online-style">
              <b-row>
                <b-col md="6">
                  <validation-provider
                    #default="{ errors }"
                    name="Name"
                    rules="required"
                  >
                    <b-form-group
                      :label="$t('inputs.name')"
                      label-for="mc-name"
                    >
                      <b-form-input
                        id="mc-name"
                        :placeholder="$t('inputs.name')"
                        v-model="msg.name"
                        :state="errors.length > 0 ? false : null"
                      />
                    </b-form-group>
                    <!-- <small class="text-danger mb-2">{{ errors[0] }}</small> -->
                  </validation-provider>
                </b-col>
                <b-col md="6">
                  <validation-provider
                    #default="{ errors }"
                    name="Email"
                    rules="required|email"
                  >
                    <b-form-group
                      :label="$t('inputs.email')"
                      label-for="mc-email"
                    >
                      <b-form-input
                        type="email"
                        id="mc-email"
                        v-model="msg.email"
                        :placeholder="$t('inputs.email')"
                        :state="errors.length > 0 ? false : null"
                      />
                    </b-form-group>
                    <!-- <small class="text-danger">{{ errors[0] }}</small> -->
                  </validation-provider>
                </b-col>
                <b-col md="6">
                  <validation-provider
                    #default="{ errors }"
                    name="Phone"
                    rules="required"
                  >
                    <b-form-group
                      :label="$t('inputs.phone')"
                      label-for="mc-phone"
                    >
                      <b-form-input
                        id="mc-phone"
                        :placeholder="$t('inputs.phone')"
                        :state="errors.length > 0 ? false : null"
                        v-model="msg.phone"
                      />
                    </b-form-group>
                    <!-- <small class="text-danger">{{ errors[0] }}</small> -->
                  </validation-provider>
                </b-col>
                <b-col md="6">
                  <validation-provider
                    #default="{ errors }"
                    name="Address"
                    rules="required"
                  >
                    <b-form-group
                      :label="$t('inputs.address')"
                      label-for="mc-address"
                    >
                      <b-form-input
                        id="mc-address"
                        :placeholder="$t('inputs.address')"
                        v-model="msg.address"
                        :state="errors.length > 0 ? false : null"
                      />
                    </b-form-group>
                    <!-- <small class="text-danger">{{ errors[0] }}</small> -->
                  </validation-provider>
                </b-col>
                <b-col md="12">
                  <validation-provider
                    #default="{ errors }"
                    name="Message"
                    rules="required"
                  >
                    <b-form-group
                      :label="$t('inputs.messages')"
                      label-for="mc-message"
                    >
                      <div class="form-label-group">
                        <b-form-textarea
                          id="mc-message"
                          :placeholder="$t('inputs.messages')"
                          rows="5"
                          v-model="msg.message"
                          :state="errors.length > 0 ? false : null"
                        />
                      </div>
                    </b-form-group>
                    <!-- <small class="text-danger">{{ errors[0] }}</small> -->
                  </validation-provider>
                </b-col>

                <!-- submit and reset -->
                <b-col class="d-flex mt-3 justify-content-center">
                  <b-button
                    type="submit"
                    variant="primary"
                    class="px-3"
                    @click.prevent="sendMsg"
                  >
                    {{ $t("buttons.send") }}
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </ValidationObserver>
        </b-col>
        <b-col cols="12" lg="6">
          <div class="img m-auto">
            <img v-if="dashboardMode" src="/img/lako-svg.svg" alt="logo" />
            <img v-else src="/img/lako-dark-svg.svg" alt="logo" />
          </div>

          <div class="mt-3 d-flex flex-column align-items-center">
            <div class="mb-2 d-flex justify-content-start set-">
              <mail-icon size="2x" class="custom-class me-2"></mail-icon>
              <p class="fs-3 mb-0">contact@lakohouse.com</p>
            </div>
            <div class="mb-2 d-flex justify-content-start set-">
              <phone-icon size="2x" class="custom-class me-2"></phone-icon>
              <p class="fs-3 mb-0">010123456789</p>
            </div>
          </div>

          <div class="mt-2 social d-flex justify-content-center">
            <a href="https://www.facebook.com" target="_blank">
              <facebook-icon
                size="3x"
                class="custom-class mx-2"
              ></facebook-icon>
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <instagram-icon
                size="3x"
                class="custom-class mx-2"
              ></instagram-icon>
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <twitter-icon size="3x" class="custom-class mx-2"></twitter-icon>
            </a>
            <!-- <font-awesome-icon icon="fa-brands fa-facebook-f" /> -->
          </div>
        </b-col>
      </b-row>
    </section>
  </div>
</template>

<script>
const reset = () => ({
  name: null,
  email: null,
  phone: null,
  address: null,
  message: null,
});
import {
  MailIcon,
  PhoneIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "vue-feather-icons";
export default {
  data() {
    return {
      msg: {
        name: null,
        email: null,
        phone: null,
        address: null,
        message: null,
      },
    };
  },
  methods: {
    sendMsg() {
      this.$refs.formMsg.validate().then((res) => {
        if (res) {
          this.$axios.$post("/messages", this.msg).then((res) => {
            if (res.status == "success") {
              this.$toast.success(this.$t("msg.msgSent"), {
                position: "bottom-left",
              });
              this.msg = reset();
              this.$nuxt.refresh();
            }
          });
        }
      });
    },
  },
  components: {
    MailIcon,
    PhoneIcon,
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
