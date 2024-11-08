<template>
  <div>
    <Header v-on:refreshLanguag="refreshLanguag"/>
    <div class="page-content">
      <div style="display:flex;z-index:1">
        <div style="flex:1">
          <div style="height:40px;line-height:40px;display:flex">
            <div>{{sourceCode|currentLanguage(languagCode)}}</div>
            <div class="translator-icon-arrow" @click.stop="languagesPopover(0)">
              <span class="iconfont icon-xiala" :class="{'icon-xiala-rotate':isArrow1}"/>
            </div>
          </div>
          <div style="margin-top:6px;position:relative">
            <client-only>
              <VueEditor v-model="sourceText" @text-change="debounceCheckLanguage"/>
            </client-only>
            <div class="source-text-hint">{{sourceText.length}}/{{sourceMaxlength}}</div>
            <el-tooltip class="item" effect="dark" content="Ctrl+Enter" placement="top">
              <div @click="translateSource" v-shortkey="['ctrl','enter']" @shortkey="translateSource()"
                   class="translate-btn">翻译
              </div>
            </el-tooltip>
            <div @click="clearSource" class="translate-clear" v-show="sourceText.length>0">
              <img src="~@/assets/clear.png"/>
            </div>
          </div>
        </div>
        <div style="flex:1;margin-left:10px;display:flex;flex-direction:column;position:relative">
          <img class="exchange" src="~@/assets/exchange.png"/>
          <div style="height:40px;line-height:40px;padding-left:15px;display:flex">
            <div>{{targetCode|currentLanguage(languagCode)}}</div>
            <div class="translator-icon-arrow" @click.stop="languagesPopover(1)">
              <span class="iconfont icon-xiala" :class="{'icon-xiala-rotate':isArrow2}"/>
            </div>
          </div>
          <div style="margin-top:6px;flex:1;background:#F5F5FA;padding:10px">
            <div class="target-item" :key="index" v-for="(item,index) in targetText" @mouseover="addHover(index)"
                 @mouseout="removeHover(index)" v-html="item.t">
            </div>
            <loading v-show="isLoading"/>
          </div>
          <div class="target-hint" v-if="checkedArrayTranslate.length>0">
            <img class="target-icon" :src="currentTranslate(0).dark"/>{{currentTranslate(0).value}}
          </div>
          <el-tooltip effect="dark" content="复制译文" placement="top">
            <div class="clipboard" v-show="targetText.length>0">
              <span class="iconfont icon-fuzhi"/>
            </div>
          </el-tooltip>
        </div>
        <div v-if="checkedArrayTranslate.length>1" :class="{'animate__fadeInRight':checkedArrayTranslate.length>1}"
             style="flex:1;margin-left:10px;display:flex;flex-direction:column;position:relative">
          <div style="margin-top:46px;flex:1;background:#F5F5FA;padding:10px">
            <div :key="index" class="target-item" v-for="(item,index) in targetText2" @mouseover="addHover(index)"
                 @mouseout="removeHover(index)" v-html="item.t">
            </div>
            <loading v-show="isLoading"/>
          </div>
          <div class="target-hint">
            <img class="target-icon" :src="currentTranslate(1).dark"/>{{currentTranslate(1).value}}
          </div>
          <el-tooltip effect="dark" content="复制译文" placement="top">
            <div class="clipboard" v-show="targetText2.length>0">
              <span class="iconfont icon-fuzhi"/>
            </div>
          </el-tooltip>
        </div>
      </div>
      <div
        style="height:40px;line-height:40px;position:absolute;right:0;top:0;text-align:right;display:flex;justify-items:center">
        <div :key="code" style="display:flex;margin-left:20px" v-for="code in checkedArrayTranslate">
          <img :src="itemTranslate(code).icon" class="el-checkbox-icon2"/>
          <span>{{itemTranslate(code).value}}</span>
        </div>
        <div style="display:flex;margin-left:10px">
          <el-popover trigger="click">
            <el-checkbox-group v-model="checkedArrayTranslate" @change="noticeWayChange">
              <div :key="item.code" class="translator-item" v-for="item in arrayTranslate">
                <img :src="item.icon" class="el-checkbox-icon"/>
                <el-checkbox :label="item.code">
                  {{item.value}} <span v-show="item.code!='mLLM'" class="el-checkbox-pro">Pro</span>
                </el-checkbox>
              </div>
            </el-checkbox-group>
            <div slot="reference" class="translator-icon-arrow" @click="isArrow=!isArrow">
              <span class="iconfont icon-xiala" :class="{'icon-xiala-rotate':isArrow}"/>
            </div>
          </el-popover>
        </div>
      </div>
      <div class="original-languages-popover" v-show="(isArrow1 || isArrow2)">
        <div style="margin-bottom:2px;border-bottom:1px solid #D9D9D9;position:relative;">
          <el-input @input="searchLanguages" clearable placeholder="搜索语言" v-model="searchKeyword"></el-input>
          <img class="translator-search" src="~@/assets/search.png"/>
        </div>
        <div class="original-languages" v-show="isArrow1">
          <template v-for="(item) in configLanguages">
            <div :key="item.code" @click="itemLanguage(0,item.code)" class="item-language"
                 :class="{'item-language-active':item.code==sourceCode}">
              <span class="iconfont icon-a-Group38603 icon-active" v-show="item.code==sourceCode"/>
              <span style="width:40px;display: inline-block"></span>
              {{item.code|currentLanguage(languagCode)}}
            </div>
          </template>
        </div>
        <div class="original-languages" v-show="isArrow2">
          <template v-for="(item,index) in configLanguages">
            <div :key="item.code" @click="itemLanguage(1,item.code)" class="item-language"
                 :class="{'item-language-active':item.code==targetCode}"
                 v-show="index!=0">
              <span class="iconfont icon-a-Group38603 icon-active" v-show="item.code==targetCode"/>
              <span style="width:40px;display: inline-block"></span>
              {{item.code|currentLanguage(languagCode)}}
            </div>
          </template>
        </div>
      </div>
      <div class="source-text-warning" v-show="this.sourceText.length>sourceMaxlength">
        <span class="iconfont icon-Vector-2" style="color:#FAAD14"></span>
        <span>已超过3,000个字符上限</span>
        <div class="text-warning-close"><img src="~@/assets/clear.png"/></div>
      </div>
    </div>
    <Footer/>
    <div style="display:block">
      <!-- 多语言:{{$t("hello")}}-->
    </div>
  </div>
</template>
<script>
  import support from "../plugins/SupportLanguages.js";
  import loading from "../components/loading.vue";
  import {debounce} from 'lodash';

  export default {
    name: 'IndexPage',
    components: {
      loading
    },
    head() {
      return {
        title: "我是自定义标题"
      }
    },
    data() {
      return {
        isDark: false,
        sourceCode: "und",
        sourceText: "",
        sourceMaxlength: 1000,
        //
        targetCode: "zh_Hans",
        //
        targetText: [],
        copyData: "copyData",
        //
        targetText2: [],
        copyData2: "copyData2",
        //
        isArrow: false,
        isArrow1: false,
        isArrow2: false,
        //
        arrayTranslate: [
          {
            icon: require("~/assets/t-mLLM.png"),
            dark: require("~/assets/t-mLLM-dark.png"),
            value: "mLLM",
            code: "mLLM"
          },
          {
            icon: require("~/assets/t-OpenAI-GPT.png"),
            dark: require("~/assets/t-OpenAI-GPT-dark.png"),
            value: "Open AI GPT",
            code: "GPT"
          },
          {
            icon: require("~/assets/t-Azure-Open-Al-GPT.png"),
            dark: require("~/assets/t-Azure-Open-Al-GPT-dark.png"),
            value: "Azure Open Al GPT",
            code: "AGPT"
          },
          {
            icon: require("~/assets/t-Gemini.png"),
            dark: require("~/assets/t-Gemini-dark.png"),
            value: "Gemini",
            code: "Gemini"
          },
          {
            icon: require("~/assets/t-Claude.png"),
            dark: require("~/assets/t-Claude-dark.png"),
            value: "Claude",
            code: "Claude"
          },
          {
            icon: require("~/assets/t-Llama.png"),
            dark: require("~/assets/t-Llama-dark.png"),
            value: "meta Llama",
            code: "Llama"
          },
          {
            icon: require("~/assets/t-Qwen.png"),
            dark: require("~/assets/t-Qwen-dark.png"),
            value: "Qwen",
            code: "Qwen"
          },
          {
            icon: require("~/assets/t-DeepSeek.png"),
            dark: require("~/assets/t-DeepSeek-dark.png"),
            value: "Deepseek",
            code: "Deepseek"
          },
          {
            icon: require("~/assets/t-Yi.png"),
            dark: require("~/assets/t-Yi-dark.png"),
            value: "Yi",
            code: "Yi"
          },
          {
            icon: require("~/assets/t-Google-Translate.png"),
            dark: require("~/assets/t-Google-Translate-dark.png"),
            value: "Google Cloud Translator",
            code: "GCloud"
          },
          {
            icon: require("~/assets/t-Grok.png"),
            dark: require("~/assets/t-Grok-dark.png"),
            value: "Grok",
            code: "Grok"
          }],
        checkedArrayTranslate: ["mLLM"],
        //
        searchKeyword: "",
        configLanguages: [],
        languagCode: this.$cookies.get("languagCode") || "zh_Hans",
        hoverIndex: 0,
        isLoading: false,
        debounceCheckLanguage: debounce(this.checkLanguage, 500)
      };
    },
    filters: {
      currentLanguage(sourceCode, code) {
        const current = support.configs.find(item => item["code"] == sourceCode);
        if (!current) {
          return "und";
        }
        return current[code];
      }
    },
    methods: {
      languagesPopover(popoverIndex) {
        if (popoverIndex == 0) {
          this.isArrow1 = !this.isArrow1;
          this.isArrow2 = false;
        }
        if (popoverIndex == 1) {
          this.isArrow2 = !this.isArrow2;
          this.isArrow1 = false;
        }
      },
      noticeWayChange() {
        if (this.checkedArrayTranslate.length > 2) {
          this.checkedArrayTranslate.shift();
        }
        if (this.checkedArrayTranslate.length == 0) {
          this.checkedArrayTranslate.push("mLLM");
        }
      },
      handleClose(event) {
        if (!document.querySelector(".original-languages-popover").contains(event.target)) {
          if (this.isArrow1) {
            this.isArrow1 = false;
          }
          if (this.isArrow2) {
            this.isArrow2 = false;
          }
        }
      },
      refreshLanguag(value) {
        this.$i18n.locale = value;
        this.languagCode = value;
      },
      currentTranslate(translateIndex) {
        return this.arrayTranslate.find(item => item.code == this.checkedArrayTranslate[translateIndex]);
      },
      itemTranslate(code) {
        return this.arrayTranslate.find(item => item.code == code);
      },
      addHover(index) {
        $("#quill-container").find(".ql-editor").find("p").eq(index).addClass("per-active");
        console.log(index);
      },
      removeHover(index) {
        $("#quill-container").find(".ql-editor").find("p").eq(index).removeClass("per-active");
      },
      checkLanguage() {
        if (this.sourceText.length > 5) {
          const request = {
            content: this.sourceText
          };
          this.$axios.post("v1/detectLanguage:web", request)
            .then((res) => {
              const resLanguageCode = res.r.languages[0].languageCode;
              this.sourceCode = resLanguageCode == "zh" ? "zh_hans" : resLanguageCode;
            });
        }
      },
      itemLanguage(popoverIndex, itemCode) {
        if (popoverIndex == 0) {
          this.sourceCode = itemCode;
          this.isArrow1 = false;
        }
        if (popoverIndex == 1) {
          this.targetCode = itemCode;
          this.isArrow2 = false;
        }
      },
      translateSource() {
        const request = {
          contents: [this.sourceText],
          sourceLanguageCode: this.sourceCode,
          targetLanguageCode: this.targetCode,
          models: this.checkedArrayTranslate
        };
        this.isLoading = true;
        this.$axios.post("v1/translateText:web", request).then((res) => {
          this.isLoading = false;
          this.targetText = res.r[0].translation;
          //
          if (res.r.length > 1) {
            this.targetText2 = res.r[1].translation;
          }
        }, (err) => {
          console.log(err);
          this.isLoading = false;
        });
      },
      clearSource() {
        this.sourceText = "";
        this.targetText = [];
        this.targetText2 = [];
      },
      onCopySuccess(e) {
        alert("复制成功！");
      },
      searchLanguages() {
        if (this.searchKeyword != "") {
          let arrLanguage = [];
          support.configs.forEach(item => {
            if (item[this.languagCode].search(this.searchKeyword) != -1) {
              arrLanguage.push(item);
            }
          });
          this.configLanguages = arrLanguage;
        } else {
          this.configLanguages = support.configs;
        }
      }
    },
    mounted() {
      this.configLanguages = support.configs;
      document.addEventListener("click", this.handleClose);
    },
    beforeDestroy() {
      document.removeEventListener("click", this.handleClose);
    }
  };
</script>

<style type="text/css">

  .exchange {
    width: 30px;
    height: 30px;
    position: absolute;
    left: -20px;
    top: 5px;
  }

  .clipboard {
    width: 40px;
    height: 40px;
    line-height: 40px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
    text-align: center;
    border-radius: 4px;
  }

  .clipboard .icon-fuzhi {
    font-size: 40px;
    color: #333333;
  }

  .clipboard:hover {
    background: #E8E8EA;
  }

  .el-popover {
    padding: 10px 0px !important;
  }

  .translator-item {
    display: flex;
    height: 50px;
    padding: 10px;
  }

  .translator-item:hover {
    background: #F5F5F5;
  }

  .el-checkbox-icon {
    width: 30px;
    height: 30px;
  }

  .el-checkbox-icon2 {
    width: 30px;
    height: 30px;
    margin-top: 5px;
  }

  .el-checkbox {
    position: relative;
    height: 30px;
    line-height: 30px;
    width: 100%;
    padding-right: 20px;
  }

  .el-checkbox .el-checkbox__input {
    position: absolute;
    right: 0;
    line-height: 30px;
    top: 2px;
  }

  .el-checkbox__label {
    font-size: 16px;
    color: #333333;
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #333333;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #7C3AED;
    border-color: #7C3AED;
  }

  .el-checkbox-pro {
    background: linear-gradient(225deg, #FFECC0 0%, #F3BB39 100%);
    color: #563C00;
    display: inline-block;
    font-size: 12px;
    width: 30px;
    height: 16px;
    line-height: 16px;
    border-radius: 8px;
    text-align: center;
  }

  .translator-search {
    width: 18px;
    height: 18px;
    position: absolute;
    left: 10px;
    top: 14px;
    z-index: 2;
  }

  .el-checkbox-group {
    font-size: 16px;
  }

  .el-textarea__inner {
    min-height: 300px !important;
    resize: none;
  }

  .original-languages-popover {
    position: absolute;
    top: 46px;
    left: 0px;
    z-index: 2;
    width: 100%;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #E4E7ED;
    box-shadow: 0px 6px 16px 0px rgba(38, 0, 74, 0.1);
    padding-bottom: 20px;
  }

  .original-languages-popover .el-input__inner {
    background-color: #ffffff;
    text-indent: 20px;
  }

  .original-languages {
    display: grid;
    grid-template-columns: repeat(6, 16.66%);
  }

  .item-language {
    height: 30px;
    line-height: 30px;
    text-align: left;
    cursor: pointer;
    margin-bottom: 2px;
    margin-left: 2px;
    position: relative;
  }

  .item-language-active {
    background: #F2EBFD;
  }

  .item-language:hover {
    background: #F5F5F5;
  }

  .item-language-active:hover {
    background: #F2EBFD;
  }

  .icon-active {
    position: absolute;
    left: 10px;
    color: #7C3AED;
  }

  .el-textarea .el-input__count {
    left: 10px;
  }

  .translate-btn {
    width: 100px;
    height: 44px;
    line-height: 44px;
    border-radius: 4px;
    color: #ffffff;
    background: #7C3AED;
    text-align: center;
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
  }

  .translate-btn:hover {
    background: #6931C9;
  }

  .translate-clear {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    width: 30px;
    height: 30px;
  }

  .translate-clear:hover {
    background: #F4F4F6;
    border-radius: 4px;
  }

  .translate-clear img {
    width: 24px;
    height: 24px;
    margin-left: 3px;
    margin-top: 3px;
  }

  .target-item {
    cursor: pointer;
  }

  .target-item:hover {
    background: rgba(124, 58, 237, 0.15);
  }

  .target-hint {
    background: #F5F5FA;
    display: flex;
    color: #999999;
    padding: 10px;
    font-size: 16px;
    position: relative;
  }

  .target-icon {
    width: 20px;
    height: 20px;
    margin-top: 2px;
  }

  .source-text-hint {
    width: auto;
    color: #999999;
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 16px;
  }

  .source-text-warning {
    margin: 10px 0;
    color: #333333;
    height: 50px;
    line-height: 50px;
    background: #FFFBE6;
    border-radius: 1px;
    border: 1px solid #FFE58F;
    text-align: center;
    position: relative;
  }

  .text-warning-close {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    width: 34px;
    height: 34px;
  }

  .text-warning-close img {
    width: 24px;
    height: 24px;
    margin-left: 5px;
    margin-top: 5px;
  }

  .per-active {
    background: rgba(124, 58, 237, 0.15);
  }

  .per-active > * {
    background: rgba(124, 58, 237, 0.15);
  }
</style>
