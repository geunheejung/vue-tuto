/**
 * 문자열 템플릿을 렌더링하는 것과 매우 유사.
 * HTML과 직접 상호작용 X -> app 엘리먼트와 양방향 바인딩 됨.
 */
var app = new Vue({
  el: "#app",
  data: {
    message: "안녕하세요 Vue!",
  },
});

var app2 = new Vue({
  el: "#app-2",
  data: {
    message: "이 페이지는 " + new Date() + " 에 로드 되었습니다.",
  },
});

var app3 = new Vue({
  el: "#app-3",
  data: {
    seen: true,
  },
});

var app4 = new Vue({
  el: "#app-4",
  data: {
    todos: [
      { text: "Vue 배우기1" },
      { text: "Vue 배우기2" },
      { text: "Vue 배우기3" },
    ],
  },
});

var app5 = new Vue({
  el: "#app-5",
  data: {
    message: "Hello Vue.js!",
    isReverse: true,
  },
  methods: {
    reverseMessage: function () {
      if (!this.isReverse) {
        this.message = this.message.split(" ").reverse().join(" ");
      }
    },
    onToggle: function () {
      this.isReverse = !this.isReverse;
    },
  },
});

var app6 = new Vue({
  el: "#app-6",
  data: {
    message: "안녕하세요 Vue!",
  },
  methods: {
    handleSubmit: function () {
      alert(this.message);
    },
  },
});

// 'v-bind' 를 사용하여 각각의 반복되는 'todo-item' 컴포넌트에 전달할 수 있다.
// Vue.component("todo-item", {
//   props: ["todo"],
//   template: "<li>{{ todo.text }}</li>",
// });

var groceryList = [
  "Vegetables",
  "Cheese",
  "Whatever else humans are supposed to eat",
].map((item, index) => ({
  id: index,
  text: item,
  isCompleted: false,
}));

var app7 = new Vue({
  el: "#app-7",
  components: {
    "todo-item": {
      props: ["todo"],
      template: "<li v-on:click='click(todo.id)'>{{ todo.text }}</li>",
      methods: {
        click: function (todoId) {
          groceryList[todoId].isCompleted = !groceryList[todoId].isCompleted;
        },
      },
    },
  },
  data: {
    groceryList,
  },
});

const data = {
  a: 1,
  b: 2,
  rawHtml: "<span style='color: red'>red</span>",
  dynamicId: "wrapper",
  message: "computed example",
  isButtonDisabled: true,
  url: "",
  attrname: "href",
};

const vm = new Vue({
  el: "#app-8",
  data: data,
  methods: {
    handleClick: function () {
      alert(`${window.location.href} -> ${this.url}`);
    },
    onSubmit: function (event) {
      console.log("submit", event);
    },
  },
  created: function () {
    // this는 vm 인스턴스
    console.log(`a is: ${this.a}`);
  },
  computed: {
    reversedMessage: function () {
      return this.message.split("").reverse().join("");
    },
  },
});

console.log("vm.$data === data ->", vm.$data === data);
console.log(
  `vm.$el === document.getElementById('app-8'), ${
    vm.$el === document.getElementById("app-8")
  }`
);
vm.$watch("a", function (newVal, oldVal) {
  // vm.a 가 변경되면 호출된다.

  alert(`changed ${oldVal} -> ${newVal}`);
});

{
  const vm2 = new Vue({
    el: "#app-9",
    data: {
      firstName: "Foo",
      lastName: "Bar",
      fullName: "Foo Bar",
    },
    // 명령형, 코드를 반복
    watch: {
      firstName: function (val) {
        this.fullName = `${val} ${this.lastName}`;
      },
      lastName: function (val) {
        this.fullName = `${this.firstName} ${val}`;
      },
    },
    // fullName의 대해 선언 해놓은 뒤 사용하는 쪽에서는 가져다 쓰기만 함. fullName이 어떤 행위들을 하는지 관심 X
    // firstName, lastName은 각각 어떤 행위를 하는지 명령
    computed: {
      fullName2: {
        get: function () {
          return `${this.firstName} ${this.lastName}`;
        },
        set: function (newValue) {
          const [firstName, lastName] = newValue.split(" ");

          this.firstName = firstName;
          this.lastName = lastName;
        },
      },
    },
  });

  vm2.fullName2 = "Jon Doe";
}

const vm3 = new Vue({
  el: "#app-10",
  data: {
    question: "",
    answer: "질문을 하기 전까지는 대답할 수 없습니다.",
  },
  watch: {
    question: function (newQuestion) {
      this.answer = "입력을 기다리는 중...";
      this.debouncedGetAnswer();
    },
  },
  created: function () {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
  },
  computed: {
    classObject: function () {
      return {
        loading: this.answer === "입력을 기다리는 중...",
        error: this.answer.includes("에러!"),
      };
    },
  },
  methods: {
    getAnswer: async function () {
      if (this.question.indexOf("?") === -1) {
        this.answer = "질문에는 일반적으로 물음표가 포함 됩니다.";
        return;
      }

      this.answer = "생각중...";

      const vm = this;

      try {
        const res = await axios.get("https://yesno.wtf/api");

        vm.answer = _.capitalize(res.data.answer);
      } catch (error) {
        vm.answer = `에러! API 요청에 요류가 있습니다. ${error}`;
      }
    },
  },
});
