
<template>
  <div>
    <b-table :items="getItems" :fields="fields" striped responsive>
      <template #cell(show_details)>
        <b-form-checkbox v-model="detailsShowing" plain class="vs-checkbox-con">
          <span class="vs-checkbox">
            <span class="vs-checkbox--check">
              <i class="vs-icon feather icon-check" />
            </span>
          </span>
          <span class="vs-label">{{ detailsShowing ? "Hide" : "Show" }}</span>
        </b-form-checkbox>
        <p>{{ detailsShowing }}</p>
      </template>

      <template #row-details="detailsShowing">
        <b-card>
          <b-row class="mb-2">
            <b-col md="4" class="mb-1">
              <strong>Full Name : </strong>{{ row.item.full_name }}
            </b-col>
            <b-col md="4" class="mb-1">
              <strong>Post : </strong>{{ row.item.post }}
            </b-col>
            <b-col md="4" class="mb-1">
              <strong>Email : </strong>{{ row.item.email }}
            </b-col>
            <b-col md="4" class="mb-1">
              <strong>City : </strong>{{ row.item.city }}
            </b-col>
            <b-col md="4" class="mb-1">
              <strong>Salary : </strong>{{ row.item.salary }}
            </b-col>
            <b-col md="4" class="mb-1">
              <strong>Age : </strong>{{ row.item.age }}
            </b-col>
          </b-row>

          <b-button
            size="sm"
            variant="outline-secondary"
            @click="row.toggleDetails"
          >
            Hide Details
          </b-button>
        </b-card>
      </template>

      <template #cell(avatar)="data">
        <b-avatar :src="data.value" />
      </template>

      <template #cell(status)="data">
        <b-badge :variant="status[1][data.value]">
          {{ status[0][data.value] }}
        </b-badge>
      </template>
    </b-table>
  </div>
</template>

<script>
import {
  BTable,
  BFormCheckbox,
  BButton,
  BCard,
  BRow,
  BCol,
  BAvatar,
  BBadge,
} from "bootstrap-vue";

export default {
  props: {
    headers: Array,
    module: String,
    title: String,
    path: String,
    lottie: String,
    notId: {
      type: Boolean,
      default: true,
    },
    create: {
      type: Boolean,
      default: true,
    },
    update: {
      type: Boolean,
      default: true,
    },
    sort: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: true,
    },
    pageLength: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    BTable,
    BButton,
    BFormCheckbox,
    BCard,
    BRow,
    BCol,
    BBadge,
    BAvatar,
  },
  computed: {
    getItems() {
      return this.$store.getters[`${this.module}/getAllData`];
    },
    totalItems() {
      return this.$store.getters[`${this.module}/getTotalItems`];
    },
  },
  methods: {
    toggleCheckbox(data) {
      console.warn("data", data);
    },
  },
  data() {
    return {
      detailsShowing: true,
      fields: [
        "show_details",
        "id",
        { key: "avatar", label: "Avatar" },
        "full_name",
        "post",
        "email",
        "city",
        "start_date",
        "salary",
        "age",
        "experience",
        { key: "status", label: "Status" },
      ],
      items: [
        {
          id: 1,
          // eslint-disable-next-line global-require
          avatar: require("@/assets/images/avatars/10-small.png"),
          full_name: "Korrie O'Crevy",
          post: "Nuclear Power Engineer",
          email: "kocrevy0@thetimes.co.uk",
          city: "Krasnosilka",
          start_date: "09/23/2016",
          salary: "$23896.35",
          age: "61",
          experience: "1 Year",
          status: 2,
        },
        {
          id: 2,
          // eslint-disable-next-line global-require
          avatar: require("@/assets/images/avatars/1-small.png"),
          full_name: "Bailie Coulman",
          post: "VP Quality Control",
          email: "bcoulman1@yolasite.com",
          city: "Hinigaran",
          start_date: "05/20/2018",
          salary: "$13633.69",
          age: "63",
          experience: "3 Years",
          status: 2,
        },
      ],
      status: [
        {
          1: "Current",
          2: "Professional",
          3: "Rejected",
          4: "Resigned",
          5: "Applied",
        },
        {
          1: "light-primary",
          2: "light-success",
          3: "light-danger",
          4: "light-warning",
          5: "light-info",
        },
      ],
    };
  },
};
</script>
