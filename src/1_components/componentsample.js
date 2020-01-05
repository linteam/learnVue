Vue.component("componentsample", {
  //props: [message] /*Component ust component verilerine props ile ulasir*/,
  props: {
    message: {
      type: String,
      required: true,
      default: "Hi"
    }
  },
  template: `<div>{{message}}</div>`,
  data() {
    //Component'de data Object return eder baska yerde kullanilmasi icin
    return {
      //....
    };
  }
});
