<template>
  <div id="navbar">
    <div class="navbar-menu">
      <ul class="navbar-navigation">
        <li class="navbar-header">
          <a href="javascript:;" class="navbar-brand">{{ SystemName }}</a>
        </li>
        <li class="navbar-item" v-for="item in NavList"><a>{{ item }}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SystemName: "地震可视化",
      NavList: [],
    };
  },
  beforeMount() {
    this.NavList.push("地震空间");
    this.NavList.push("灾情数据");
  },
};
</script>

<style>
/* #region navbar主体效果*/
#navbar {
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  position: relative;
  box-shadow: 0 1px 3px rgba(173, 140, 140, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.navbar-menu {
  justify-content: flex-start;
  min-height: 58px;
  transition: 0.6s ease;
  width: 100%;
  background-color: #006064;
  color: #fff;
}

.navbar-menu .navbar-item:hover {
  background-color: #00838f;
}

.navbar-navigation {
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.navbar-menu a,
.navbar-item a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.navbar-item {
  height: 58px;
}

.navbar-item a {
  padding: 18px 24px 18px 24px;
  display: block;
}

.navbar-header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 58px;
}

.navbar-brand {
  font-size: 1.6em;
  padding: 18px 24px 18px 24px;
}

/* #endregion */

/* 屏幕大于768px分辨率效果  */
@media screen and (min-width: 768px) {
  .navbar-navigation {
    flex-flow: row;
  }
}
</style>