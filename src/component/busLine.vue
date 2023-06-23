<template>
<!--  <el-row>-->
<!--    <el-button>默认按钮</el-button>-->
<!--    <el-button type="primary">主要按钮</el-button>-->
<!--    <el-button type="success">成功按钮</el-button>-->
<!--    <el-button type="info">信息按钮</el-button>-->
<!--    <el-button type="warning">警告按钮</el-button>-->
<!--    <el-button type="danger">危险按钮</el-button>-->
<!--  </el-row>-->
  <div class="main-wrapper">
    <div class="text-title">
      <h1>金河市公交线路管理系统</h1>
      <div id="container">
        <button class="learn-more" @click="enter">
    <span class="circle" aria-hidden="true">
      <span class="icon arrow"></span>
    </span>
          <span class="button-text">登录系统</span>
        </button>
      </div>

    </div>
    <div class="bus-wrapper">
      <div class="window-section">
        <div class="window-glass">
          <div class="glass-inner">
            <div class="seats"></div>
          </div>
        </div>
        <div class="window-glass">
          <div class="glass-inner">
            <div class="seats first"></div>
            <div class="seats second"></div>
          </div>
        </div>
        <div class="window-glass">
          <div class="glass-inner">
            <div class="seats first"></div>
            <div class="seats second"></div>
          </div>
        </div>
        <div class="window-glass">
          <div class="glass-inner">
            <div class="seats first"></div>
            <div class="seats second"></div>
          </div>
        </div>
        <div class="window-glass">
          <div class="glass-inner">
            <div class="seats first"></div>
            <div class="seats second"></div>
          </div>
        </div>
        <div class="window-glass">
          <div class="glass-inner">
            <div class="seats first"></div>
            <div class="seats second"></div>
          </div>
        </div>
      </div>
      <div class="driver-section">
        <div class="window-glass">
          <div class="glass-inner">
            <div class="handle"></div>
          </div>
        </div>
      </div>
      <div class="headlight-wrap">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="door-lower">
        <div class="dot1"></div>
        <div class="dot2"></div>
      </div>
      <div class="lower-shape"></div>
      <div class="sticker-wrap">
        <img src="https://res.cloudinary.com/dyquku6bs/image/upload/v1463656641/sajhabus_gdifyx.png">
      </div>
      <div class="border-wrap">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="tyres-wrapper">
        <div class="tyres-content">
          <div class="tyres">
            <div class="rim-section">
              <div class="stripe"></div>
            </div>
          </div>
        </div>
        <div class="tyres-content">
          <div class="tyres">
            <div class="rim-section">
              <div class="stripe"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="lights-wrap">
        <div class="lights-1"></div>
        <div class="lights lights-2"></div>
        <div class="lights lights-3"></div>
        <div class="lights lights-4"></div>
        <div class="lights lights-5"></div>
      </div>
      <div class="square-1"></div>
      <div class="square-2">
        <div></div>
      </div>
      <div class="square-3">
        <div></div>
      </div>
    </div>
    <div class="shadow"></div>
    <div class="road">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>




</template>

<script>


export default {
  name: "busLine",
  methods:{
    async enter() {
      await this.$router.push('/home/')
    },
  }


}


</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300");
*,
*:after,
*:before {
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
}

.text-title {
  text-align: center;
  font-family: "Open Sans Condensed", sans-serif;
  margin-top: 50px;
}

.bus-wrapper {
  background: #49d64e;
  max-width: 700px;
  height: 205px;
  border-radius: 4px;
  margin: 100px auto 0;
  position: relative;
  -webkit-animation: bus-bounce 0.75s linear infinite;
  animation: bus-bounce 0.75s linear infinite;
}
.bus-wrapper:before {
  content: "";
  position: absolute;
  left: -12px;
  width: 0;
  height: 0;
  border-top: 103px solid transparent;
  border-bottom: 103px solid transparent;
  border-right: 12px solid #49d64e;
}
.bus-wrapper:after {
  content: "";
  position: absolute;
  right: -18px;
  top: 0;
  width: 0;
  height: 0;
  border-top: 163px solid transparent;
  border-bottom: 40px solid transparent;
  border-left: 18px solid #49d64e;
}

.lower-shape {
  position: absolute;
  width: 0;
  left: -22px;
  height: 0;
  bottom: 0;
  border-left: 20px solid transparent;
  border-right: 90px solid transparent;
  border-bottom: 15px solid white;
}

.window-section {
  width: 607px;
  height: 80px;
  display: inline-block;
  border-radius: 6px;
  background: #2e4148;
  margin-top: 15px;
  margin-left: 24px;
  padding-left: 21px;
}

.window-glass {
  width: 95px;
  height: 58px;
  background: #30b0c9;
  margin-right: 10px;
  border-radius: 4px;
  margin: 11px 10px 11px 0;
  float: left;
  overflow: hidden;
}
.window-glass:nth-child(1) {
  width: 50px;
}
.window-glass:nth-child(2) .glass-inner .seats.second, .window-glass:nth-child(3) .glass-inner .seats.second, .window-glass:nth-child(4) .glass-inner .seats.second {
  left: 45px;
}
.window-glass:nth-child(4) .glass-inner {
  margin-left: 0;
}
.window-glass:nth-child(5) .glass-inner {
  margin-left: -8px;
}
.window-glass:nth-child(5) .glass-inner .seats.first {
  left: 15px;
}
.window-glass:nth-child(5) .glass-inner .seats.second {
  left: 50px;
}
.window-glass:nth-child(6) .glass-inner {
  margin-left: -15px;
}
.window-glass:nth-child(6) .glass-inner .seats.first {
  left: 25px;
}
.window-glass:nth-child(6) .glass-inner .seats.second {
  display: none;
}

.glass-inner {
  width: 95px;
  height: 58px;
  background: #59bfd3;
  margin-top: 11px;
  margin-left: 15px;
  border-radius: 4px;
  position: relative;
}

.seats {
  width: 9px;
  height: 13px;
  background: rgba(255, 255, 255, 0.3);
  transform: skewX(9deg);
  border-radius: 2px;
  position: absolute;
  bottom: 10px;
  left: 6px;
}

.tyres-wrapper {
  position: relative;
  top: 40%;
}
.tyres-wrapper .tyres-content:nth-child(1) {
  position: absolute;
  left: 28%;
  position: absolute;
  bottom: -65px;
  left: 27%;
  border-radius: 90px 90px 0 0;
  -moz-border-radius: 90px 90px 0 0;
  -webkit-border-radius: 90px 90px 0 0;
  background: white;
  padding: 10px;
}
.tyres-wrapper .tyres-content:nth-child(2) {
  position: absolute;
  bottom: -65px;
  right: 9%;
  border-radius: 90px 90px 0 0;
  -moz-border-radius: 90px 90px 0 0;
  -webkit-border-radius: 90px 90px 0 0;
  background: white;
  padding: 10px;
}

.tyres {
  position: relative;
  z-index: 1;
  width: 73px;
  height: 73px;
  background: #4e5066;
  border-radius: 50%;
  border: 8px solid #3a3e4b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-animation: stripe 1s linear infinite;
  animation: stripe 1s linear infinite;
}

.rim-section {
  position: relative;
  width: 35px;
  height: 35px;
  background: #37a13a;
  border-radius: 50%;
  border: 11px solid #49d64e;
}

.stripe {
  width: 25px;
  position: absolute;
  height: 25px;
  border: 2px dashed #4e5066;
  border-radius: 50%;
  top: -6px;
  left: -6px;
  -webkit-animation: stripe 1s linear infinite;
  animation: stripe 1s linear infinite;
}

.sticker-wrap {
  position: absolute;
  right: 80px;
  top: 110px;
  z-index: 1;
}

.border-wrap {
  position: absolute;
  bottom: 18px;
  left: 30px;
}
.border-wrap > span {
  width: 543px;
  height: 4px;
  background: #fff;
  display: block;
  margin-bottom: 3px;
}
.border-wrap > span:last-child {
  margin-bottom: 0;
}

.driver-section {
  background: #2e4148;
  overflow: visible;
  width: 70px;
  border-radius: 4px;
  padding: 10px;
  position: absolute;
  right: 5px;
  top: 15px;
  padding-right: 0;
}
.driver-section:after {
  content: "";
  display: inline-block;
  position: absolute;
  width: 15px;
  height: calc(100% + -2px);
  background: #2e4148;
  float: right;
  right: -6px;
  top: 2px;
  z-index: 10;
  transform: skew(7deg, 0deg);
}
.driver-section .window-glass {
  width: 60px;
}
.driver-section .glass-inner {
  margin-left: -57px;
  margin-top: -5px;
  height: 70px;
  transform: skewX(8deg);
}
.driver-section .handle {
  width: 30px;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(-20deg);
  border-radius: 2px;
  position: absolute;
  bottom: 10px;
  right: 15px;
}

.door-lower {
  width: 82px;
  height: 48px;
  position: absolute;
  border: 4px solid #2e4148;
  top: 110px;
  right: -7px;
  z-index: 1;
  border-radius: 4px;
}
.door-lower .dot1 {
  width: 10px;
  height: 4px;
  background: #3a3e4b;
  border-radius: 4px;
  margin-top: 8px;
  margin-left: 7px;
}
.door-lower .dot2 {
  width: 20px;
  height: 20px;
  background: #3a3e4b;
  float: right;
  margin-right: 7px;
  border-radius: 2px;
  margin-top: -3px;
}

.lights-wrap .lights-1 {
  background: #cc8460;
  box-shadow: 1px 2px 0px 0px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  width: 8px;
  height: 28px;
  position: absolute;
  bottom: 43px;
  left: -5px;
  -webkit-animation: changeColor 0.5s infinite;
  animation: changeColor 0.5s infinite;
}
.lights-wrap .lights {
  background: #cc8460;
  box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  width: 8px;
  height: 3px;
  position: absolute;
  bottom: 43px;
  z-index: 1;
  -webkit-animation: changeColor 0.5s infinite;
  animation: changeColor 0.5s infinite;
}
.lights-wrap .lights.lights-2 {
  left: 50px;
}
.lights-wrap .lights.lights-3 {
  left: 189px;
}
.lights-wrap .lights.lights-4 {
  left: 395px;
}
.lights-wrap .lights.lights-5 {
  right: 165px;
}

.square-1 {
  background: #dedede;
  border: 2px solid #2e4148;
  box-shadow: inset 2px 6px 2px 0px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  position: absolute;
  width: 14px;
  height: 14px;
  left: 50px;
  top: 105px;
}

.square-2 {
  width: 20px;
  height: 20px;
  border: 1px solid rgba(58, 62, 75, 0.1);
  border-radius: 6px;
  padding: 0px;
  display: inline-block;
  text-align: center;
  position: absolute;
  right: 5px;
  bottom: 21px;
}
.square-2 > div {
  width: 12px;
  height: 10px;
  background: #3a3e4b;
  display: inline-block;
  border-radius: 1px;
}

.square-3 {
  width: 20px;
  height: 20px;
  border: 1px solid rgba(58, 62, 75, 0.1);
  border-radius: 6px;
  padding: 0px;
  display: inline-block;
  text-align: center;
  position: absolute;
  right: 35px;
  bottom: 5px;
}
.square-3 > div {
  width: 12px;
  height: 10px;
  background: #3a3e4b;
  display: inline-block;
  border-radius: 1px;
}

.shadow {
  background: #d8d8d8;
  border-radius: 8px;
  width: 663px;
  height: 14px;
  margin: 25px auto 0;
  position: relative;
}

.headlight-wrap {
  position: absolute;
  right: -17px;
  bottom: 66px;
  z-index: 1;
}
.headlight-wrap > span {
  width: 8px;
  height: 2px;
  background: #fff;
  display: block;
  margin-bottom: 1px;
}

.road {
  width: 200%;
  margin-top: -7px;
  position: relative;
  z-index: 1;
  -webkit-animation: mov-road 3s linear infinite;
  animation: mov-road 3s linear infinite;
  overflow: hidden;
}
.road .line {
  float: left;
}
.road .line:nth-child(1) {
  width: 10px;
  height: 6px;
  background: #3a3e4b;
  border-radius: 4px;
  margin-left: 80px;
  margin-right: 20px;
}
.road .line:nth-child(2) {
  width: 20px;
  height: 6px;
  background: #3a3e4b;
  border-radius: 4px;
  margin-right: 150px;
}
.road .line:nth-child(3) {
  width: 200px;
  height: 6px;
  background: #3a3e4b;
  border-radius: 4px;
  margin-right: 80px;
}
.road .line:nth-child(4) {
  width: 200px;
  height: 6px;
  background: #3a3e4b;
  border-radius: 4px;
  margin-right: 180px;
}
.road .line:nth-child(5) {
  width: 150px;
  height: 6px;
  background: #3a3e4b;
  border-radius: 4px;
  margin-right: 300px;
}
.road .line:nth-child(6) {
  width: 200px;
  height: 6px;
  background: #3a3e4b;
  border-radius: 4px;
}
.road .line:nth-child(7) {
  width: 10px;
  height: 6px;
  background: #3a3e4b;
  border-radius: 4px;
  margin-left: 80px;
  margin-right: 20px;
}
.road .line:nth-child(8) {
  width: 20px;
  height: 6px;
  background: #3a3e4b;
  border-radius: 4px;
  margin-right: 150px;
}

@-webkit-keyframes changeColor {
  0% {
    background-color: #cc8460;
  }
  50% {
    background-color: orange;
  }
  100% {
    background-color: #ffc107;
  }
}

@keyframes changeColor {
  0% {
    background-color: #cc8460;
  }
  50% {
    background-color: orange;
  }
  100% {
    background-color: #ffc107;
  }
}
@-webkit-keyframes stripe {
  0% {
    -moz-transform: rotateZ(0deg);
    -webkit-transform: rotateZ(0deg);
    -o-transform: rotateZ(0deg);
    -ms-transform: rotateZ(0deg);
  }
  0% {
    -moz-transform: rotateZ(180deg);
    -webkit-transform: rotateZ(180deg);
    -o-transform: rotateZ(180deg);
    -ms-transform: rotateZ(180deg);
  }
  100% {
    -moz-transform: rotateZ(360deg);
    -webkit-transform: rotateZ(360deg);
    -o-transform: rotateZ(360deg);
    -ms-transform: rotateZ(360deg);
  }
}
@keyframes stripe {
  0% {
    -moz-transform: rotateZ(0deg);
    -webkit-transform: rotateZ(0deg);
    -o-transform: rotateZ(0deg);
    -ms-transform: rotateZ(0deg);
  }
  0% {
    -moz-transform: rotateZ(180deg);
    -webkit-transform: rotateZ(180deg);
    -o-transform: rotateZ(180deg);
    -ms-transform: rotateZ(180deg);
  }
  100% {
    -moz-transform: rotateZ(360deg);
    -webkit-transform: rotateZ(360deg);
    -o-transform: rotateZ(360deg);
    -ms-transform: rotateZ(360deg);
  }
}
@-webkit-keyframes bus-bounce {
  0% {
    top: 2px;
  }
  20% {
    top: 1px;
  }
  40% {
    top: 2px;
  }
  75% {
    top: 0px;
  }
  100% {
    top: 2px;
  }
}
@keyframes bus-bounce {
  0% {
    top: 2px;
  }
  20% {
    top: 1px;
  }
  40% {
    top: 2px;
  }
  75% {
    top: 0px;
  }
  100% {
    top: 2px;
  }
}
@-webkit-keyframes mov-road {
  0% {
    left: 1500px;
  }
  100% {
    left: -1500px;
  }
}
@keyframes mov-road {
  0% {
    left: 1500px;
  }
  100% {
    left: -1500px;
  }
}



@import url("https://fonts.googleapis.com/css?family=Mukta:700");
* {
  box-sizing: border-box;
}
*::before, *::after {
  box-sizing: border-box;
}

body {
  font-family: "Mukta", sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  min-height: 100vh;
  background: #f3f8fa;
}

button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
}
button.learn-more {
  width: 12rem;
  height: auto;
}
button.learn-more .circle {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: relative;
  display: block;
  margin: 0;
  width: 3rem;
  height: 3rem;
  background: #282936;
  border-radius: 1.625rem;
}
button.learn-more .circle .icon {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
}
button.learn-more .circle .icon.arrow {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  left: 0.625rem;
  width: 1.125rem;
  height: 0.125rem;
  background: none;
}
button.learn-more .circle .icon.arrow::before {
  position: absolute;
  content: "";
  top: -0.25rem;
  right: 0.0625rem;
  width: 0.625rem;
  height: 0.625rem;
  border-top: 0.125rem solid #fff;
  border-right: 0.125rem solid #fff;
  transform: rotate(45deg);
}
button.learn-more .button-text {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.75rem 0;
  margin: 0 0 0 1.85rem;
  color: #282936;
  font-weight: 700;
  line-height: 1.6;
  text-align: center;
  text-transform: uppercase;
}
button:hover .circle {
  width: 100%;
}
button:hover .circle .icon.arrow {
  background: #fff;
  transform: translate(1rem, 0);
}
button:hover .button-text {
  color: #fff;
}

/*@supports (display: grid) {*/
/*    body {*/
/*        display: grid;*/
/*        grid-template-columns: repeat(4, 1fr);*/
/*        grid-gap: 0.625rem;*/
/*        grid-template-areas: ". main main ." ". main main .";*/
/*    }*/

/*    #container {*/
/*        grid-area: main;*/
/*        align-self: center;*/
/*        justify-self: center;*/
/*    }*/
/*}*/

</style>