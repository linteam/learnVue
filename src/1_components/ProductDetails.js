Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  // data() {
  //   return {};
  // },
  // methods: {},
  // computed: {},
  template: `<ul>
    <li v-for="detail in details">{{ detail }}</li>
  </ul>`
});
// export default {
//   "product-details": ProductDetails
// };
