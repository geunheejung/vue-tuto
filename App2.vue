<template>
  <div id="app">
    <button @click="show = !show">Toggle</button>
    <!-- 컴포넌트로 싸여진 엘리먼트가 삽입되거나 제거 될 때 일어남. -->
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      v-bind:css="false"
    >
      <base-layout v-if="show">
        <template #header>
          <navigation-link url="/profile"> Your Profile </navigation-link>
        </template>
        <ul>
          <ol @click="currentTab = 'Checkbox'">
            Checkbox
          </ol>
          <ol @click="currentTab = 'LoadingView'">
            LoadingView
          </ol>
        </ul>
        <keep-alive>
          <component v-bind:is="currentTab" />
        </keep-alive>
        <template #footer>
          <address>주소</address>
        </template>
      </base-layout>
    </transition>
    <transition name="fade" mode="in-out">
      <button
        v-if="docState === 'saved'"
        key="saved"
        @click="docState = 'editing'"
      >
        Edit
      </button>
      <button
        v-if="docState === 'edited'"
        key="edited"
        @click="docState = 'saved'"
      >
        Save
      </button>
      <button
        v-if="docState === 'editing'"
        key="editing"
        @click="docState = 'edited'"
      >
        Cancel
      </button>
    </transition>
    <div id="flip-list-demo" class="demo">
      <button @click="shuffle">Shuffle</button>
      <button @click="add">Add</button>
      <button @click="remove">Remove</button>
      <transition-group name="list-complete" tag="p">
        <span v-for="item in items" :key="item" class="list-complete-item">
          {{ item }}
        </span>
      </transition-group>
    </div>

    <div id="staggered-list-demo">
      <input v-model="query" />
      <transition-group
        name="staggered-fade"
        tag="ul"
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
      >
        <li
          v-for="(item, index) in computedList"
          v-bind:key="item.msg"
          v-bind:data-index="index"
        >
          {{ item.msg }}
        </li>
      </transition-group>
    </div>
    <CustomTranstion />
    <div>
      <valueTransition />
    </div>
    <input type="text" v-focus />
    <select v-model="direction" v-color-swatch="'red'">
      <option>default</option>
      <option value="left">left</option>
      <option value="top">top</option>
      <option value="right">right</option>
      <option value="bottom">bottom</option>
    </select>
    <p v-pin:[direction]="200">Stick me 200px from the top of the page</p>

    <anchored-heading :level="1">
      <span>Title</span>
    </anchored-heading>
    <anchored-heading :level="2">
      <span>Title</span>
    </anchored-heading>
    <anchored-heading :level="3">
      <span>Title</span>
    </anchored-heading>
    <anchored-heading :level="4">
      <span>Title</span>
    </anchored-heading>
    <items-comp :items="[{ name: 'hello' }]" />
    <SayHello style="color: red"> Content </SayHello>
  </div>
</template>

<script>
import NavigationLink from "./src/components/NavigationLink.vue";
import Checkbox from "./src/components/Checkbox.vue";
import LoadingView from "./src/components/LoadingView.vue";
import CustomTranstion from "./src/CustomTranstion.vue";
import valueTransition from "./src/components/valueTransition.vue";
import SayHello from "@/SayHello.vue";
// import SayHello from "@/src/components/SayHello.vue";

export default {
  components: {
    NavigationLink,
    Checkbox,
    LoadingView,
    CustomTranstion,
    valueTransition,
    SayHello,
  },
  data() {
    return {
      show: false,
      currentTab: "Checkbox",
      docState: "edited",
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10,
      query: "",
      list: [
        { msg: "Bruce Lee" },
        { msg: "Jackie Chan" },
        { msg: "Chuck Norris" },
        { msg: "Jet Li" },
        { msg: "Kung Fury" },
      ],
      direction: "",
    };
  },
  computed: {
    computedList: function () {
      var vm = this;
      return this.list.filter(function (item) {
        return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1;
      });
    },
    context() {
      return {
        token: "daopjsdpoasjdpo",
        user: {
          isAuth: true,
        },
        list: [],
      };
    },

    buttonMessage: function () {
      switch (this.docState) {
        case "saved":
          return "Edit";
        case "edited":
          return "Save";
        case "editing":
          return "Cancel";
      }
    },
  },
  provide() {
    return {
      getContext: this.context,
    };
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length);
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++);
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1);
    },
    shuffle() {
      this.items = _.shuffle(this.items);
    },
    beforeEnter: function (el) {
      // 변화하기전에, 투명도 및 높이 0으로 해놓은 다음
      el.style.opacity = 0;
      el.style.height = 0;
    },
    enter: function (el, done) {
      // 변화한 이후에 아이템 개수 * 150만큼 딜레이 걸고
      var delay = el.dataset.index * 150;
      setTimeout(function () {
        // 높이 맞춰서 트랜지션
        Velocity(el, { opacity: 1, height: "1.6em" }, { complete: done });
      }, delay);
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 150;
      //  leave는 다시 숨김 처리
      // 숨겨진 요소의 대해서와 표기되는 요소의 대해서
      setTimeout(function () {
        debugger;
        Velocity(el, { opacity: 0, height: 0 }, { complete: done });
      }, delay);
    },
    // beforeEnter: function (el) {
    //   el.style.opacity = 0;
    // },
    // enter: function (el, done) {
    //   Velocity(el, { opacity: 1, fontSize: "1.4em" }, { duration: 300 });
    //   Velocity(el, { fontSize: "1em" }, { complete: done });
    // },
    // leave: function (el, done) {
    //   Velocity(el, { translateX: "15px", rotateZ: "50deg" }, { duration: 600 });
    //   Velocity(el, { rotateZ: "100deg" }, { loop: 2 });
    //   Velocity(
    //     el,
    //     {
    //       rotateZ: "45deg",
    //       translateY: "30px",
    //       translateX: "30px",
    //       opacity: 0,
    //     },
    //     { complete: done }
    //   );
    // },
  },
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  color: blue;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* 타이밍 기능을 사용할 수 있습니다. */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.flip-list-move {
  transition: transform 1s;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>
