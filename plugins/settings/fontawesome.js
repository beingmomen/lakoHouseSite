import Vue from "vue";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPalette,
  faIdCard,
  faTrophy,
  faBacon,
  faSitemap,
  faArrowDownShortWide,
  faTruck,
  faCity,
  faGlobe,
  faLocationDot,
  faWarehouse,
  faSignal,
} from "@fortawesome/free-solid-svg-icons";
// import { faFile } from '@fortawesome/free-regular-svg-icons'
import { faTwitter, faFacebookF } from "@fortawesome/free-brands-svg-icons";

config.autoAddCss = false;
library.add(
  faPalette,
  faIdCard,
  faTrophy,
  faBacon,
  faSitemap,
  faTwitter,
  faFacebookF,
  faArrowDownShortWide,
  faTruck,
  faCity,
  faGlobe,
  faLocationDot,
  faWarehouse,
  faSignal
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
