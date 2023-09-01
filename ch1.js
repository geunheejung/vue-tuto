Vue.component("modal", {
  template: '<div class="outer-wrapper">모달</div>',
});

Vue.component("child-component", {
  // 상위 컴포넌트의 data 속성인 message를 propsdata라는 속성으로 넘겨받음.
  props: ["name"],
  template: `<p>Welcome {{ name }}!</p>`,
});

// 컴포넌트 간 통신을 위해 Event Bus사용.
// 화면 개발을 위한 인스턴스와 다른 별도의 인스턴스를 생성하여 활용
const eventBus = new Vue();

new Vue({
  el: "#app-2",
  created: function () {
    // 콜백으로써 this가 바인딩되기에 현재 컨텍스트의 this를 할당해줘야 함.
    const vm = this;
    eventBus.$on("refresh", function (data) {
      console.log(this); // 여기서의 this는 이벤트 버스용 인스턴스를 가리킴.
      console.log(vm);
    });
  },
});

const SignIn = { template: "<div>로그인</div>" };
const SignUp = { template: "<div>회원가입</div>" };

const AppHeader = { template: "<header>헤더</header>" };
const Body = { template: "<section>메인</section>" };
const AppFooter = { template: "<footer>바닥</footer>" };

const routes = [
  { path: "/sign-in", component: SignIn },
  { path: "/sign-up", component: SignUp },
  {
    path: "/home",
    components: {
      appHeader: AppHeader,
      default: Body,
      appFooter: AppFooter,
    },
  },
];

const router = new VueRouter({
  routes,
});

let vm = new Vue({
  router,
  data: { a: 1, name: "Geuni", data: [], message: "hello world" },
  filters: {
    capitalize: function (value) {
      if (!value) return "";

      value = value.toString();
      return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
    },
  },
  methods: {
    onIncrement: function () {
      this.a += 1;
      eventBus.$emit("refresh", this.a);
    },
    fetchData: async function () {
      const res = await axios.get("https://randomuser.me/api");
      this.data = res;
      console.log(res);
    },
  },
  // Local Component
  components: {
    "increment-btn": {
      methods: {},
      template: `<button>increment</button>`,
    },
  },
  created: function () {
    console.log("created", this.a);
    console.log(document.getElementById("aText"));
  },
  mounted: function () {
    console.log("mounted", this.a);
    console.log(document.getElementById("aText"));
  },
  updated: function () {
    console.log("updated", this.a);
  },
  destroyed: function () {
    console.log("destroyed");
  },
}).$mount("#app");
