<template>
  <b-row class="content-header">
    <!-- Content Left -->
    <b-col class="content-header-left mb-2">
      <b-row class="breadcrumbs-top">
        <b-col cols="12 d-flex ">
          <h2 class="content-header-title pe-4 mb-0 text-uppercase">
            {{ title }}
          </h2>
          <div class="breadcrumb-wrapper">
            <b-breadcrumb>
              <b-breadcrumb-item :to="localePath('/panel')">
                <home-icon size="1.5x" class="custom-class"></home-icon>
              </b-breadcrumb-item>
              <b-breadcrumb-item
                v-for="item in breadcrumbs"
                :key="item.text"
                :active="item.active"
                :to="item.to"
                class="text-capitalize breadcrumb-item-c"
              >
                {{ item.text }}
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { HomeIcon } from "vue-feather-icons";
export default {
  props: {
    title: String,
    breadcrumbs: Array,
  },
  components: {
    HomeIcon,
  },
};
</script>

<style lang="scss" scoped>
.content-header-title {
  border-inline-end: 1px solid #d6dce1;
  border-inline-start: none !important;
}

.breadcrumb-item-c {
  margin-top: 3px;
}
</style>
