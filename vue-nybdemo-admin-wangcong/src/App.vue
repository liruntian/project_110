<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view v-if="isRouterAlive" ></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  provide () {
	  return {
		  reload: this.reload
	  }
  },
  data () {
	  return {
		  isRouterAlive: true
	  }
  },
  methods: {
	  reload() {
		  this.isRouterAlive = false;
		  this.$nextTick(function() {
			  this.isRouterAlive = true;
		  })
	  }
  }
}

</script>

<style lang="scss">
body {
	margin: 0px;
	padding: 0px;
	font-family: Microsoft YaHei, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,  SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}
a{
  color: #56a9ff;
}
.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
#nprogress .bar {
  height: 3px !important;
  background: #56a9ff !important; //自定义颜色
}
</style>
