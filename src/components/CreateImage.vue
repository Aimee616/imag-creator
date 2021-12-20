<template>
  <div class="create-image">
    <div class="header">
      <div class="title">Please select style and language</div>
      <div class="header-filter">
        <el-select v-model="language" size="medium">
          <template v-slot:prefix>Language</template>
          <!-- <slot name="prefix">23</slot> -->
          <el-option
            v-for="item in languageOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-select v-model="style" size="medium" @onChange="handleStyleChange">
          <template v-slot:prefix>Style</template>
          <el-option
            v-for="item in styleoptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <a class="down-btn" :href="imgUrl" download="photo">Download</a>
        <!-- <el-button type="success" size="medium" @click="handleCreatePic"
          >Download</el-button
        > -->
      </div>
    </div>
    <div class="code-content" ref="imageWrapper">
      <div class="code-operate">
        <div class="operate-dot"></div>
        <div class="operate-dot"></div>
        <div class="operate-dot"></div>
      </div>

      <highlightjs
        class="high-light"
        :language="language"
        :code="code"
        contenteditable="true"
        @blur="onContentChange"
      />
    </div>
    <!-- <img :src="imgUrl" /> -->
    <!-- <a :href="imgUrl" download="photo">34</a> -->
  </div>
</template>

<script>
import { ref, unref, defineComponent, onMounted, watch } from "vue";
import { ElSelect, ElOption } from "element-plus";
import "element-plus/es/components/select/style/css";
import "highlight.js/styles/default.css";
import html2canvas from "html2canvas";
export default defineComponent({
  name: "CreateImage",
  components: {
    ElSelect,
    ElOption,
  },
  setup() {
    const languageOptions = ref([
      "auto",
      "xml",
      "bash",
      "c",
      "cpp",
      "csharp",
      "css",
      "markdown",
      "diff",
      "ruby",
      "go",
      "ini",
      "java",
      "javascript",
      "json",
      "kotlin",
      "less",
      "lua",
      "makefile",
      "perl",
      "objectivec",
      "php",
      "php-template",
      "plaintext",
      "python",
      "python-repl",
      "r",
      "rust",
      "scss",
      "shell",
      "sql",
      "swift",
      "yaml",
      "typescript",
      "vbnet",
    ]);
    const styleoptions = ref([
      "default",
      "a11y-dark",
      "rainbow",
      "vs",
      "atom-one-dark",
      "atom-one-light",
    ]);
    const language = ref("auto");
    const style = ref("default");
    const imgUrl = ref("");
    const code = ref(`echo "Hello World!"`);
    const imageWrapper = ref(null);

    const onContentChange = (e) => {
      language.value = "auto";
      style.value = "default";
      code.value = e.target?.innerText || "";

      changeStyle();
      createPic();
    };
    const changeStyle = () => {
      const oldCss = document.querySelector("div[rel=stylesheet]");
      oldCss && oldCss.remove();
      const styleLink = `//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/${style.value}.min.css`;
      const styleEl = document.createElement("link");
      styleEl.setAttribute("rel", "stylesheet");
      styleEl.setAttribute("href", styleLink);
      const head = document.querySelector("head");
      head.append(styleEl);
    };

    const createPic = () => {
      html2canvas(unref(imageWrapper)).then((canvas) => {
        let dataURL = canvas.toDataURL("image/jpg");
        imgUrl.value = dataURL;
        console.log(imgUrl.value);
      });
    };

    onMounted(() => {
      createPic();
    });
    watch(style, () => {
      changeStyle();
      createPic();
    });
    return {
      languageOptions,
      styleoptions,
      language,
      style,
      code,
      imgUrl,
      createPic,
      imageWrapper,
      onContentChange,
    };
  },
  mounted() {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.create-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
  padding: 40px 20px;
  /* background: #121212; */
  .header {
    margin-bottom: 20px;
    width: 100%;
    .title {
      font-size: 20px;
      font-weight: 600;
      line-height: 40px;
      color: #fff;
    }
    .header-filter {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      padding: 20px 50px;
      .down-btn {
        display: block;
        width: 100px;
        height: 34px;
        background: @primary-color;
        color: #fff;
        text-align: center;
        line-height: 34px;
        text-decoration: none;
        border-radius: 4px;
        overflow: hidden;
      }
      /deep/ .el-input__prefix {
        left: 0;
        color: #fff;
        background: @primary-color;
        padding: 0 8px;
        border-radius: 4px 0 0  4px;
      }
    }
  }
  .code-content {
    position: relative;
    width: 100%;
    padding: 20px;
    text-align: left;
    background: #fff;
    .code-operate {
      position: absolute;
      top: 30px;
      left: 26px;
      display: flex;
      flex-direction: row;
      .operate-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgb(252, 64, 66);
        margin-left: 8px;
        &:nth-child(2) {
          background: rgb(223, 180, 33);
        }
        &:last-child {
          background: @primary-color;
        }
      }
    }
    .high-light {
      border-radius: 4px;
      overflow: hidden;
      // 修改第三方组件样式
      /deep/ .hljs {
        &:first-child {
          padding-top: 40px;
        }
      }
    }
  }
}
</style>
