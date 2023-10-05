import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import App from "../App.vue";
import ErrorView from "./components/ErrorView.vue";
import LoadingView from "@/components/LoadingView.vue";

const AsyncComp = () => ({
  component: import("../my-async-component.vue"),
  loading: LoadingView,
  error: ErrorView,
  delay: 200,
  timeout: 3000,
});

// Vue는 컴포넌트가 실제로 렌더링되어야 할 때만 팩토리 기능을 트리거하고 이후의 리렌더링을 위해 결과를 캐시한다.
function factoryFn(resolve, reject) {
  // resolve 콜백은 서버에서 컴포넌트 정의를 가져 왔을 때 호출 되어야 한다.
  setTimeout(function () {
    console.log("async compo");
    resolve({
      template: "<div>I am async!</div>",
    });
  }, 1000);
}
Vue.component("async-example", factoryFn);
Vue.component("async-webpack-example", function (resolve) {
  // Webpack이 Ajax 요청을 통해
  // 로드되는 번들로 작성된 코드를 자동으로 분리하도록 지시함.
  // require(["../my-async-component.vue"], resolve);

  // import 함수는 Promise를 반환함.
  return import("../my-async-component.vue");
});
Vue.component("async-comp", AsyncComp);

const requireComponent = require.context(
  // 컴포넌트들이 있는 폴더
  "./components",
  // 하위 폴더까지 포함할 지 여부
  false,
  // 기본 컴포넌트를 찾는데 사용할 정규표현식
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  // 컴포넌트 설정 가져오기
  const componentConfig = requireComponent(fileName);

  // 컴포넌트의 파스칼표기법 이름 가져오기
  const componentName = upperFirst(
    camelCase(
      // 폴더 위치와 무관하게 파일이름 추출
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // return 병합된 값.
  return {
    sayHello() {
      console.log("hello");
    },
  };
};

// 전역 사용자 정의 디렉티브 v-focus 등록
Vue.directive("focus", {
  // 바인딩 된 엘리먼트가 DOM에 삽입되었을 때..
  inserted(el, ...args) {
    console.log(args);
    // 엘리먼트에 포커스
    el.focus();
  },
});

Vue.directive("pin", {
  update(el, binding, vnode) {
    el.style.position = "fixed";
    var s = binding.arg;
    console.log(s);
    el.style[s] = binding.value + "px";
  },
});

Vue.directive("color-swatch", function (el, binding) {
  el.style.backgroundColor = binding.value;
});

Vue.component("anchored-heading", {
  render(createElement) {
    return createElement(
      `h${this.level}`, // 태그 이름
      this.$slots.default // 자식 배열
      // slot:name -> $slot.name
    );
  },
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
});

Vue.component("items-comp", {
  props: ["items"],
  render: function (createElement) {
    if (this.items.length) {
      return createElement(
        "ul",
        this.items.map(function (item) {
          return createElement("li", item.name);
        })
      );
    } else {
      return createElement("p", "No items found.");
    }
  },
});

new Vue({
  el: "#app",
  render: (h) => h(App),
});
