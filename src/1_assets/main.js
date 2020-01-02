//Div id'si olan app'i el olarak veriyorum Vue sinifina
//Bu instance uygulamanin kalbidir.
var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    image: "./1_assets/vmSocks-green-onWhite.jpg",
    link: "http://www.linspark.com",
    inStock: true,
    onSale: true
    //inventory: 100 //envanter demek
  }
});
//console'da app.product = "Coats" desek html hemen degisir.
