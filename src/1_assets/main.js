//Div id'si olan app'i el olarak veriyorum Vue sinifina
//Bu instance uygulamanin kalbidir.
var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    image: "./1_assets/vmSocks-green-onWhite.jpg",
    link: "http://www.linspark.com"
  }
});
//console'da app.product = "Coats" desek html hemen degisir.
