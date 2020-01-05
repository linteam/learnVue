//Div id'si olan app'i el olarak veriyorum Vue sinifina
//Bu instance uygulamanin kalbidir.
var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: 0
  }
});
//console'da app.product = "Coats" desek html hemen degisir.
