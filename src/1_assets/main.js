//Div id'si olan app'i el olarak veriyorum Vue sinifina
//Bu instance uygulamanin kalbidir.
var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    image: "./1_assets/vmSocks-green-onWhite.jpg",
    link: "http://www.linspark.com",
    //inventory: 100 //envanter demek
    inStock: true,
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "vmSocks-green-onWhite.jpg"
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "vmSocks-blue-onWhite.jpg"
      }
    ],
    sizes: ["sm", "m", "lg", "xl", "xxl"],
    cart: 0
  },
  methods: {
    addToCart() {
      this.cart++; //data icindeki verilere ulasmak icin this keyword'unu kullaniyoruz
    },
    setImage(variantImage) {
      this.image = `./1_assets/${variantImage}`; //
    }
  }
});
//console'da app.product = "Coats" desek html hemen degisir.
