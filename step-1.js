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
