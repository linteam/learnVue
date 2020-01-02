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
      { variantId: 2234, variantColor: "green" },
      { variantId: 2235, variantColor: "blue" }
    ],
    sizes: ["sm", "m", "lg", "xl", "xxl"]
  }
});
//console'da app.product = "Coats" desek html hemen degisir.
