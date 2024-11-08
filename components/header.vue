<template>
  <div class="page-header">
    <div class="page-header-content">
      <img src="~@/assets/t-logo-light.png" v-show="isLight" class="nav-item-logo"/>
      <img src="~@/assets/t-logo-dark.png" v-show="!isLight" class="nav-item-logo"/>
      <div class="nav-item">定价</div>
      <div class="nav-item">下载</div>
      <div class="nav-item">资源</div>
      <div style="flex:1">
      </div>
      <div class="nva-item-light">
        <img src="~@/assets/light.png" v-show="isLight"/>
        <img src="~@/assets/dark.png" v-show="!isLight"/>
      </div>
      <div class="nva-item-select">
        <img src="~@/assets/tellurian.png"/>
        <el-select @change="changeLanguag" v-model="languagCode" placeholder="请选择">
          <el-option v-for="item in languageConfig"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="nva-item-theme" @click="theme">
        <img v-show="isLight" src="~@/assets/theme-light.png"/>
        <img v-show="!isLight" src="~@/assets/theme-dark.png"/>
      </div>
      <div class="nva-item-btn">登录</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "x-header",
    data() {
      return {
        languageConfig: [
          {
            value: "en",
            label: "English"
          }, {
            value: "zh_Hans",
            label: "中文（简体）"
          }, {
            value: "zh_Hant",
            label: "中文（繁體）"
          }, {
            value: "es",
            label: "español"
          },
          {
            value: "fr",
            label: "français"
          },
          {
            value: "pt",
            label: "português "
          },
          {
            value: "ru",
            label: "русский"
          },
          {
            value: "de",
            label: "Deutsch"
          },
          {
            value: "ja",
            label: "日本語"
          },
          {
            value: "it",
            label: "italiano"
          },
          {
            value: "ko",
            label: "한국어"
          }
        ],
        languagCode: this.$cookies.get("languagCode") || "zh_Hans",
        isLight: true
      };
    },
    methods: {
      theme() {
        /* const appDocument = document.getElementsByTagName("HTML")[0];
         if (appDocument.getAttribute("data-theme") == "light") {
           appDocument.setAttribute("data-theme", "dark");
           this.isLight = false;
         } else {
           appDocument.setAttribute("data-theme", "light");
           this.isLight = true;
         }*/
      },
      changeLanguag(value) {
        this.$emit("refreshLanguag", value);
        //把语言保存在localStorage中
        this.$cookies.set("languagCode", value);
      }
    }
  };
</script>

<style type="text/css">
  .nav-item-logo {
    width: 160px;
    height: 40px;
    vertical-align: middle;
    cursor: pointer;
  }

  .nav-item {
    width: auto;
    margin-left: 40px;
    cursor: pointer;
  }

  .nav-item:hover {
    color: #7C3AED;
  }

  .nva-item-light {
    width: 44px;
    height: 44px;
    border-radius: 4px;
    background: #EBE1FC;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  [data-theme='dark'] .nva-item-light {
    background: #36245E;
  }

  .nva-item-light img {
    width: 26px;
    height: 26px;
  }

  .nva-item-select {
    width: 200px;
    margin-left: 20px;
    background: #F5F5FA;
    border-radius: 4px;
    position: relative;
  }

  [data-theme='dark'] .nva-item-select {
    background: #24252B;
  }

  .nva-item-select img {
    width: 26px;
    height: 26px;
    position: absolute;
    left: 10px;
    top: 9px;
    z-index: 2;
  }

  .el-input__inner {
    border: 0px;
    background-color: #F5F5FA;
    height: 44px;
    line-height: 44px;
    padding-left: 40px;
    padding-right: 30px !important;
  }

  .el-input__inner:hover {
    background: #EBE9F3;
  }

  [data-theme='dark'] .el-input__inner {
    background-color: #24252B;
  }

  .el-select .el-input.is-focus .el-input__inner {
    border: 0px;
  }

  .el-select .el-input .el-select__caret {
    color: #333333;
    font-weight: 800;
  }

  .el-select-dropdown__wrap {
    max-height: 100%;
  }

  .el-select-dropdown__item.selected {
    color: #7C3AED;
    font-weight: 400;
  }

  .nva-item-theme {
    width: 44px;
    height: 44px;
    border-radius: 4px;
    background: #F5F5FA;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }

  .nva-item-theme:hover {
    background: #EBE9F3;
  }

  [data-theme='dark'] .nva-item-theme {
    background: #24252B;
  }

  .nva-item-theme img {
    width: 26px;
    height: 26px;
    cursor: pointer;
  }

  .nva-item-btn {
    width: 100px;
    height: 44px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
    color: #FFFFFF;
    background: #7C3AED;
  }

  .nva-item-btn:hover {
    background: #6931C9;
  }
</style>
