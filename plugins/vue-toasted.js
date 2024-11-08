import Toasted from 'vue-toasted';
import Vue from 'vue';

Vue.use(Toasted, {
  theme: "toasted-primary",
  position: "top-center",
  duration: 2000
});
//  使用说明
//  this.$toasted.show('hello billo');
