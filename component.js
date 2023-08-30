// 소문자, 하이픈
Vue.component("my-component", {
  template: "<div>사용자 정의 컴포넌트</div>",
});

const Child = {
  template: "<div>사용자 정의 지역 컴포넌트</div>",
};

const vm = new Vue({
  el: "#app",
  data: {
    todoList: Array(3)
      .fill(0)
      .map((row, index) => ({ id: index, content: `hello ${index}` })),

    title: "Hello",
  },
  components: {
    "child-component": Child,
    "my-row": {
      props: {
        //vue.js:5108 [Vue warn]: Invalid prop: type check failed for prop "todo". Expected Object, got String with value "a".
        todo: {
          type: Object,
          default: {},
          validator: function (value) {
            return value.content.length;
          },
        },
        // vue.js:5108 [Vue warn]: Missing required prop: "title"
        title: {
          type: String,
          required: true,
        },
      },
      template: "<tr>{{todo.id}}: {{ todo.content }}</tr>",
      // 함수여야 함.
      // message: "hello",
      // data: function () {
      //   return {
      //     message: "hello",
      //   };
      // },
    },
  },
});

Vue.component("button-counter", {
  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0,
    };
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1;
      this.$emit("increment");
    },
  },
});

Vue.component("my-checkbox", {
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    checked: Boolean,
    value: String,
  },
});

new Vue({
  el: "#counter-event-example",
  data: { total: 0, message: "", foo: { checked: false, value: "yes" } },
  methods: {
    incrementTotal: function (e) {
      debugger;
      this.total += 1;
      console.log(e);
    },
    something: function (e) {
      alert(1);
      console.log(e);
    },
  },
});
