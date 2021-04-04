<template>
  <div class="goods">
    <!-- 分类列表 -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <!-- 专场 -->
        <li
          class="menu-item"
          :class="{ current: currentIndex === 0 }"
          @click="selectMenu(0)"
        >
          <p class="text">
            <img
              v-if="container.tag_icon"
              :src="container.tag_icon"
              class="icon"
            />
            {{ container.tag_name }}
          </p>
        </li>
        <li
          class="menu-item"
          v-for="(item, index) in goods"
          :key="index"
          :class="{ current: currentIndex === index + 1 }"
          @click="selectMenu(index + 1)"
        >
          <p class="text">
            <img v-if="item.icon" :src="item.icon" class="icon" />
            {{ item.name }}
          </p>
          <i class="num" v-show="calculateCount(item.spus)">
            {{ calculateCount(item.spus) }}
          </i>
        </li>
      </ul>
    </div>

    <!-- 商品列表-->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!-- 专场 -->
        <li class="container-list food-list-hook">
          <div
            v-for="(item, index) in container.operation_source_list"
            :key="index"
          >
            <img :src="item.pic_url" />
          </div>
        </li>
        <!-- 具体分类 -->
        <li
          v-for="(item, index) in goods"
          :key="index"
          class="food-list food-list-hook"
        >
          <h3 class="title">{{ item.name }}</h3>
          <!-- 具体的商品列表 -->
          <ul>
            <li
              v-for="(food, index) in item.spus"
              :key="index"
              class="food-item"
              @click="showDetail(food)"
            >
              <div class="icon" :style="head_bg(food.picture)"></div>
              <div class="content">
                <h3 class="name">{{ food.name }}</h3>
                <p class="desc" v-if="food.description">
                  {{ food.description }}
                </p>
                <div class="extra">
                  <span class="saled">{{ food.month_saled_content }}</span>
                  <span class="praise">{{ food.praise_content }}</span>
                </div>
                <img :src="food.product_label_picture" class="product" />
                <p class="price">
                  <span class="text">￥{{ food.min_price }}</span>
                  <span class="unit">/{{ food.unit }}</span>
                </p>
              </div>
              <div class="cartcontrol-wrapper">
                <app-cart-control :food="food"></app-cart-control>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车 -->
    <app-shopcart :poiInfo="poiInfo" :selectFoods="selectFoods"></app-shopcart>
    <!-- 商品详情 -->
    <app-product-detail :food="selectFood" ref="foodView"></app-product-detail>
  </div>
</template>

<script>
import Shopcart from "@/views/shopcart/Shopcart";
import CartControl from "@/views/cartcontrol/CartControl";
import ProductDetail from "@/views/productDetail/ProductDetail";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      container: {},
      goods: [],
      menuScroll: {},
      foodScroll: {},
      scrollY: 0,
      listHeight: [],
      poiInfo: {},
      selectFood: {},
    };
  },
  components: {
    "app-shopcart": Shopcart,
    "app-cart-control": CartControl,
    "app-product-detail": ProductDetail,
  },
  computed: {
    currentIndex() {
      for (let i = 1; i <= this.listHeight.length; i++) {
        // 获取商品区间的范围
        let height1 = this.listHeight[i - 1];
        let height2 = this.listHeight[i];
        // 判断是否在区间中
        if (this.scrollY >= height1 && this.scrollY <= height2) {
          return i - 1;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((myfoods) => {
        myfoods.spus.forEach((food) => {
          if (food.count > 0) {
            foods.push(food);
          }
        });
      });
      return foods;
    },
  },
  created() {
    fetch("/api/goods")
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.code === 0) {
          this.container = response.data.container_operation_source;
          this.goods = response.data.food_spu_tags;
          this.poiInfo = response.data.poi_info;
          // 等待DOM更新后计算 wrapper 和 content 的高度，这时候 content 的高度大于 wrapper, 才能滚动
          this.$nextTick(() => {
            this.initScroll();
            this.calculateHeight();
          });
        }
      });
  },
  methods: {
    head_bg(imgName) {
      return "background-image: url(" + imgName + ");";
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true,
      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        click: true,
        probeType: 3,
      });
      this.foodScroll.on("scroll", (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    calculateHeight() {
      // 获取所有商品分类
      let foodlist = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodlist.length; i++) {
        let item = foodlist[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index) {
      let foodlist = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      let element = foodlist[index];
      this.foodScroll.scrollToElement(element, 250);
    },
    calculateCount(spus) {
      let count = 0;
      spus.forEach((food) => {
        if (food.count > 0) {
          count += food.count;
        }
      });
      return count;
    },
    showDetail(food) {
      this.selectFood = food;
      this.$refs.foodView.showView();
    },
  },
};
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
h3,
p {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
.goods {
  display: flex;
  position: absolute;
  top: 190px;
  bottom: 51px;
  overflow: hidden;
  width: 100%;
}

.goods .menu-wrapper {
  flex: 0 0 85px;
  background: #f4f4f4;
}

.goods .foods-wrapper {
  flex: 1;
  /* background: blue; */
}
/* Menu item */
.goods .menu-wrapper .menu-item {
  padding: 16px 23px 15px 10px;
  border-bottom: 1px solid #e4e4e4;
  position: relative;
}
.goods .menu-wrapper .menu-item .text {
  font-size: 13px;
  color: #333333;
  line-height: 17px;
  vertical-align: middle;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.goods .menu-wrapper .menu-item .text .icon {
  width: 15px;
  height: 15px;
  vertical-align: middle;
}
/* 专场样式 */
.goods .foods-wrapper .container-list {
  padding: 11px 11px 0 11px;
  border-bottom: 1px solix #e4e4e4;
}
.goods .foods-wrapper .container-list img {
  width: 100%;
  margin-bottom: 11px;
  border-radius: 5px;
}
/* 具体分类商品布局 */
.goods .foods-wrapper .food-list {
  padding: 11px;
}
.goods .foods-wrapper .food-list .title {
  height: 13px;
  font-size: 13px;
  padding-left: 7px;
  background: url(./img/btn_yellow_highlighted@2x.png) no-repeat left center;
  background-size: 2px 10px;
  margin-bottom: 12px;
}
.goods .foods-wrapper .food-list .food-item {
  display: flex;
  margin-bottom: 25px;
  position: relative;
}
.goods .foods-wrapper .food-list .food-item .icon {
  flex: 0 0 63px;
  background-position: center;
  background-size: 120% 100%;
  background-repeat: no-repeat;
  margin-right: 11px;
  height: 75px;
}
.goods .foods-wrapper .food-list .food-item .content {
  flex: 1;
}
/* 具体内容样式 */
.goods .foods-wrapper .food-list .food-item .content .name {
  font-size: 16px;
  line-height: 21px;
  color: #333333;
  margin-bottom: 10px;
  padding-right: 27px;
}
.goods .foods-wrapper .food-list .food-item .content .desc {
  font-size: 10px;
  line-height: 19px;
  color: #bfbfbf;
  margin-bottom: 8px;

  /* 超出部分显示省略号*/
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods .foods-wrapper .food-list .food-item .content .extra {
  font-size: 10px;
  color: #bfbfbf;
  margin-bottom: 7px;
}
.goods .foods-wrapper .food-list .food-item .content .extra .saled {
  margin-right: 14px;
}
.goods .foods-wrapper .food-list .food-item .content .product {
  height: 15px;
  margin-bottom: 6px;
}
.goods .foods-wrapper .food-list .food-item .content .price {
  font-size: 0;
}
.goods .foods-wrapper .food-list .food-item .content .price .text {
  font-size: 14px;
  color: #fb4e44;
}
.goods .foods-wrapper .food-list .food-item .content .price .unit {
  font-size: 12px;
  color: #bfbfbf;
}
.goods .foods-wrapper .food-list .food-item .cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 0;
}
/* 当前选中 */
.goods .menu-wrapper .menu-item.current {
  background: white;
  font-weight: bold;
  transform: scale(1.05);
}
.goods .menu-wrapper .menu-item .num {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  color: white;
  background: red;
  text-align: center;
  font-size: 7px;
  line-height: 13px;
}
</style>
