//Div id'si olan app'i el olarak veriyorum Vue sinifina
//Bu instance uygulamanin kalbidir.
var app = new Vue({
  el: "#app",
  data: {
    brand: "Zara",
    product: "Socks",
    selectedVariant: 0, //"./1_assets/vmSocks-green-onWhite.jpg",
    link: "http://www.linspark.com",
    //inventory: 100 //envanter demek
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "vmSocks-green-onWhite.jpg",
        variantQuantity: 10
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "vmSocks-blue-onWhite.jpg",
        variantQuantity: 0
      }
    ],
    sizes: ["sm", "m", "lg", "xl", "xxl"],
    cart: 0
  },
  methods: {
    addToCart() {
      this.cart++; //data icindeki verilere ulasmak icin this keyword'unu kullaniyoruz
    },
    setVariant(index) {
      console.log(index);

      this.selectedVariant = index;
    }
  },
  //Cache'lendigi icin sonucu degisene kadar calismaz, metotlara gore daha iyi karmasik islemler icin
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return `./1_assets/${this.variants[this.selectedVariant].variantImage}`; //
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    }
  }
});
//console'da app.product = "Coats" desek html hemen degisir.
