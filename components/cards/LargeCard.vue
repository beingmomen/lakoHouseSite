<template>
  <b-card no-body class="card-statistics">
    <b-card-header>
      <b-card-title>Statistics</b-card-title>
      <b-card-text class="mr-25 mb-0"> Updated 1 month ago </b-card-text>
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <b-col
          v-for="item in items"
          :key="item.icon"
          md="3"
          sm="6"
          class="mb-2 mb-md-0"
          :class="item.customClass"
        >
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" :variant="item.color">
                <!-- <feather-icon size="24" :icon="item.icon" /> -->
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ item.title }}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{ item.subtitle }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {

    };
  },
};
</script>

<style lang="scss" scoped>
</style>