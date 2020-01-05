//import ProductDetails from "./ProductDetails.js";

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  template: `<div class="product">
        <div class="product-image">
            <!--v-bind dynamically binds an attribute to an expression-->
            <!-- v-bind: yerine sadece : kullanarak bind edebilirsin -->
            <!-- :alt="description", :href="url" , :title: -->
            <a :href="link"><img v-bind:src="image"></a>
        </div>
        <div class="product-info">
            <!-- <h1>{{brand}} {{product}}</h1> -->
            <h1> {{title}} </h1>
            <!-- <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-else>Out of Stock</p> -->
            <!--style="display-none"-->
            <!-- <span v-if="onSale">On Sale</span> -->
            <p v-show="inStock">In Stock</p>
            <p v-show="!inStock" :class="{lineThrough: !inStock}">Out of Stock</p>
            <p>Shipping: {{shipping}}</p>
            <product-details :details="details"></product-details>

            <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box"
            :style="{backgroundColor: variant.variantColor}" @mouseover="setVariant(index)">
                <!-- :style="{fontSize: fontSize}" dedigimde sagdaki fontSize data'dan gelir -->
                <!-- :style="{'font-size': fontSize}" olarak da yazabilirsin -->
                <!-- :style="styleObject" data:{styleObject:{color: 'red'}}-->
                <!-- :style:"[styleObject1, styleObject2]"-->

            </div>
            
            <ul>
                <li v-for="size in sizes">{{size}}</li>
            </ul>

            <!-- <button v-on:click="cart += 1">Add to Cart</button> -->
            <!-- Class Bindings - Expression'a gore class ekleme ya da cikarma
            :class="{active: activeClass, 'text-danger': errorClass"}
            //data tarafinda
            data: {activeClass: true, errorClass: false}
            Direkt class objesi de atanabilir, class object array de olabilir
            -->
            
            <button @click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock}">Add to Cart</button>
            
            <div>
              <h2>Reviews</h2>
              <p v-if="!reviews.length">There are no reviews yet.</p>
              <ul>
                <li v-for="review in reviews">
                  <p>{{review.name}}</p>
                  <p>Rating: {{review.rating}}</p>
                  <p>{{review.review}}</p>

                </li>
              </ul>
            </div>

            <product-review @review-submitted="addReview"></product-review>
            
        </div>
    </div>`,
  data() {
    return {
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
      reviews: []
    };
  },
  methods: {
    addToCart() {
      //this.cart++; //data icindeki verilere ulasmak icin this keyword'unu kullaniyoruz
      //Yukari ile iletisim kurmak icin bir event olustururuz.
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId); //emit add-to-cart event
    },
    addReview(productReview) {
      console.log("add review");
      this.reviews.push(productReview);
      console.log(this.reviews);
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
    },
    shipping() {
      return this.premium ? "FREE" : "2.99";
    }
  }
});

Vue.component("product-review", {
  //v-model 2 yonlu data binding yapmak icin kullaniliyor.
  //html5'in required attribute'i kullanilabilir gerekli yerlerde
  //<textarea id="review" v-model="review" required></textarea>
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
        <b>Please correct the following error(s)</b>
        <ul>
          <li v-for="error in errors">{{error}}</li>
        </ul>
    </p>
    <p>
      <label for="name"> Name: </label>
      <input id="name" v-model="name">
    </p>
    <p>
      <label for="review"> Review: </label>
      <textarea id="review" v-model="review"></textarea>
    </p>
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating"> 
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
    <p>Would you recommend this product?</p>
    <label>
      Yes
      <input type="radio" value="Yes" v-model="recommend"/>
    </label>
    <label>
      No
      <input type="radio" value="No" v-model="recommend"/>
    </label>
    <p>
    <input type="submit" value="Submit">
    </p>
  </form>`,
  data() {
    return {
      name: null,
      review: null,
      rating: null, //v-model.number ile type casting yaparak aldik
      recommend: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      console.log("On submit");
      this.errors = [];
      if (!this.name) this.errors.push("Name Required");
      if (!this.review) this.errors.push("Review Required");
      if (!this.rating) this.errors.push("Rating Required");
      if (!this.recommend) this.errors.push("Recommendation required.");
      if (this.errors.length === 0) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        };
        this.$emit("review-submitted", productReview);
      }
      this.name = null;
      this.review = null;
      this.rating = null;
    }
  }
});

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
