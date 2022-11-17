<template>
  <li class="nav-item has-sub" :class="sub ? 'open' : ''">
    <b-link
      @click.native="toggleSub"
      class="d-flex align-items-center add-arrow-icon"
    >
      <slot name="icon"></slot>
      <span class="menu-title text-truncate" v-text="title"></span>
      <b-badge
        pill
        variant="light-warning"
        class="mr-1 ml-auto"
        v-if="childNumber"
        v-text="child.length"
      />
    </b-link>
    <b-collapse v-model="sub" class="menu-content" tag="ul">
      <li
        v-for="(c, i) in child"
        :key="i"
        class="nav-item"
        :class="{ active: $route.path == c.route }"
      >
        <nuxt-link
          :to="localePath(`/categories/${c.slug}-${c._id}`)"
          class="d-flex align-items-center"
        >
          <circle-icon size="1x" class="custom-class circle-icon"></circle-icon>
          <span class="menu-title text-truncate" v-text="c.name"></span>
        </nuxt-link>
      </li>
    </b-collapse>
  </li>
</template>

<script>
import { CircleIcon } from "vue-feather-icons";
export default {
  props: {
    title: String,
    child: [Array, Object],
    childNumber: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sub: false,
    };
  },
  methods: {
    toggleSub() {
      this.sub = this.sub ? false : true;
    },
  },
  components: {
    CircleIcon,
  },
};
</script>

<style lang="scss" scoped>
.nav-item.has-sub {
  .add-arrow-icon {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      background-image: url("/img/chevron-left.svg") !important;
      width: 20px;
      height: 20px;
      transition: all 0.3s ease-in-out;
      &:dir(ltr) {
        transform: rotate(180deg);
        right: 10px;
      }
      &:dir(rtl) {
        left: 10px;
      }
    }
  }
}
.nav-item.has-sub.open {
  .add-arrow-icon {
    transition: all 1s ease-in-out;
    &::after {
      transition: all 0.3s ease-in-out;
      &:dir(ltr) {
        transform: rotate(270deg);
      }
      &:dir(rtl) {
        transform: rotate(-90deg);
      }
    }
  }
}

.circle-icon {
  &:dir(rtl) {
    margin-left: 1.38rem;
    margin-right: 2rem;
  }
  &:dir(ltr) {
    margin-right: 1.38rem;
    margin-left: 2rem;
  }
}
</style>
