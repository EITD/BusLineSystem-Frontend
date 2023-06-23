<template>
  <div id="app">
    <div id="nav">
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link> |-->
<!--      <router-link to="/menu">Menu</router-link>-->
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
// this.$axios.post("/api/line/get",{name:"N8"})
//     .then(res=>{
//       alert(res.data.result.text);
//       this.data=res.data.result.text;
//       console.log(res.data)
//     })
// module.exports = {
//   dev: {
//
//     proxyTable:{
//       'api': {
//         target: 'https://localhost:8080/', //服务器的地址
//         secure: true,//如果是https请设置为true
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//
//       }
//     },
//
// }
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/*#nav {*/
/*  padding: 30px;*/
/*}*/

/*#nav a {*/
/*  font-weight: bold;*/
/*  color: #2c3e50;*/
/*}*/

/*#nav a.router-link-exact-active {*/
/*  color: #42b983;*/
/*}*/
</style>

