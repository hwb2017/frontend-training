<template>
  <div id="app">
    <app-header :poiInfo="poiInfo"></app-header>
    <app-nav :commentNum="commentNum"></app-nav>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less"></style>

<script>
import Header from "./views/Header";
import Nav from "./views/Nav";

export default {
  name: "App",
  data() {
    return {
      poiInfo: {},
      commentNum: 0,
    };
  },
  components: {
    "app-header": Header,
    "app-nav": Nav,
  },
  created() {
    fetch("/api/goods")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code === 0) {
          this.poiInfo = data.data.poi_info;
        }
      });
    // 请求ratings
    fetch("/api/ratings")
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.code == 0) {
          this.commentNum = response.data.comment_num;
        }
      });
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "margin: 0; padding: 0;");
  },
};
</script>

<style scoped></style>
