<template>
  <b-col :lg="lg" :md="md" :sm="sm" class="text-center">
    <b-avatar v-if="!multi" class="p-0" size="120px" :src="url" />

    <template v-if="multi">
      <b-avatar
        v-for="(img, i) in url"
        :key="i"
        class="p-0 mx-2 mb-2"
        size="120px"
        :src="img"
      />
    </template>
  </b-col>
</template>

<script>
import BCardCode from "~/@core/components/b-card-code/BCardCode.vue";
export default {
  props: {
    module: String,
    storeKey: String,
    path: String,
    multi: {
      type: Boolean,
      default: false,
    },
    lg: {
      type: String,
      default: "6",
    },
    md: {
      type: String,
      default: "6",
    },
    sm: {
      type: String,
      default: "12",
    },
  },
  data() {
    return {
      mainProps: {
        blank: true,
        blankColor: "#777",
        width: 75,
        height: 75,
        class: "m1",
      },
    };
  },
  computed: {
    url() {
      let url = null;
      if (this.multi) {
        let imgsArr = [];
        let imgs = this.$store.getters[`${this.module}/get${this.storeKey}`];
        imgs.forEach((img) => {
          imgsArr.push(`${this.$config.NODE_URL_images}/${this.path}/${img}`);
        });
        url = imgsArr;
      } else {
        url = `${this.$config.NODE_URL_images}/${this.path}/${
          this.$store.getters[`${this.module}/get${this.storeKey}`]
        }`;
      }

      return url;
    },
  },
  components: {
    BCardCode,
  },
};
</script>

<style lang="scss" scoped>
.preview {
  object-fit: contain;
}
</style>
