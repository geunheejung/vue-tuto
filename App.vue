<template>
  <div id="app">
    <navigation-link url="/profile"> Your Profile </navigation-link>
    {{ message }}
    test
    <button v-on:click="sayHello">say</button>
    <button @click="message = `say ${message}`">Change Message</button>

    <div id="qQ">
      <child-view v-model="price" />
    </div>
    <div>
      <checkbox
        :checked="checkValue"
        @change="
          (val) => {
            checkValue = val;
          }
        "
        value="some value"
      />
    </div>

    <div>
      <!-- <async-example /> -->
      <!-- <async-webpack-example /> -->
      <async-comp />
    </div>

    <div>
      <base-input :label="'BASE INPUT'" v-model="inputValue" />
      <strong>{{ inputValue }}</strong>
    </div>

    <div>
      <my-list :items="[{ text: 'a' }, { text: 'b' }, { text: 'c' }]">
        <!-- scoped slot 역시 이름을 가질 수 있다 -->
        <li
          slot="slotName"
          slot-scope="props"
          class="list-item"
          :key="props.text"
        >
          {{ props.text }}
        </li>
      </my-list>
    </div>

    <div v-if="loginType === 'username'" key="username-field">
      <label>사용자 이름</label>
      <input placeholder="사용자 이름을 입력하세요" />
    </div>
    <div v-else key="email-field">
      <label>이메일</label>
      <input placeholder="이메일 주소를 입력하세요" />
    </div>

    <h1 v-show="loginType === 'email'">EMAIL</h1>
    <button @click="loginType = 'email'">로그인 유형 변경</button>

    <ul>
      <li v-for="(user, key) of users" :key="user">
        <pre>
          {{ key }} -> {{ user }}
        </pre>
      </li>
    </ul>

    <div>
      <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
      <label for="jack">Jack</label>
      <input type="checkbox" id="john" value="John" v-model="checkedNames" />
      <label for="john">John</label>
      <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
      <label for="mike">Mike</label>
      <br />
      <span>체크한 이름: {{ checkedNames }}</span>

      <input type="radio" id="one" value="One" v-model="picked" />
      <label for="one">One</label>
      <br />
      <input type="radio" id="two" value="Two" v-model="picked" />
      <label for="two">Two</label>
      <br />
      <span>선택: {{ picked }}</span>

      <div>
        <select v-model="selected">
          <option disabled value="">Please select one</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <span>선택함: {{ selected }}</span>
      </div>
      <div>
        <input
          type="checkbox"
          v-model="toggle"
          true-value="yes"
          false-value="no"
        />
        {{ toggle }}
      </div>
    </div>
    <div>
      <input v-model.trim.lazy="textMsg" @change="testChange" />

      {{ textMsg }}
    </div>
    <table id="table">
      <tr is="my-row"></tr>
    </table>

    <div>
      <TestView
        :list="[
          {
            value: 'Title1',
            children: [
              {
                value: 'comment1',
                children: [
                  {
                    value: 'comment1-2',
                  },
                ],
              },
            ],
          },
          {
            value: 'Title2',
            children: [
              {
                value: 'comment1',
              },
              {
                value: 'comment2',
                children: [
                  {
                    value: 'comment2-1',
                  },
                  {
                    value: 'comment2-2',
                    children: [
                      {
                        value: 'comment2-1',
                      },
                      {
                        value: 'comment2-2',
                      },
                    ],
                  },
                ],
              },
              {
                value: 'comment3',
              },
            ],
          },
        ]"
      />
    </div>
    <div id="HELLO">
      <tree-folder
        v-for="folder in [
          {
            name: 'Documents',
            children: [
              {
                name: 'study',
                children: [
                  {
                    name: 'vue',
                    children: [
                      {
                        name: 'nuxt-toy',
                      },
                      {
                        name: 'vue-toy',
                      },
                      {
                        name: 'vue-nodebird',
                      },
                      {
                        name: 'vue-ts',
                      },
                    ],
                  },
                  {
                    name: 'react',
                  },
                  {
                    name: 'ts',
                  },
                  {
                    name: 'nuxt',
                  },
                  {
                    name: 'next',
                  },
                ],
              },
            ],
          },
        ]"
        :folder="folder"
        :key="folder.name"
      />
    </div>
    <base-button>
      <template v-slot:content>
        <span>검색</span>
      </template>
    </base-button>
    <div>
      <base-checkbox v-model="loginVue" />
      <pre>{{ loginVue }}</pre>
    </div>
  </div>
</template>

<script>
import ChildView from "./src/components/ChildView.vue";
import Checkbox from "./src/components/Checkbox.vue";
import MyList from "./src/components/MyList.vue";
import TestView from "./src/components/TestView.vue";
import TreeFolder from "./src/components/TreeFolderTest/tree-folder.vue";
import NavigationLink from "./src/components/NavigationLink.vue";

export default {
  // Creation: 컴포넌트 초기화 단계(컴포넌트가 돔에 마운트 되기 전, 서버 렌더링에서도 지원됨.)
  beforeCreate() {
    //can't use Data(this.title ...), events(vm.$on, vm.$once, vm.$off, vm.$emit)
    console.group("Creation");
    console.group("beforeCreate");
    console.log(this.sayHello);
    console.log(this.message);
    console.log(this.computedMessage);
    console.groupEnd();
  },
  created() {
    // data, events가 활성화되어 접근할 수 있다.
    // 템플릿, 가상돔은 마운트 및 렌더링되지 않은 상태이다.
    console.group("created");
    console.log(`
    1. can use Data(this.title, this.titleComputed ...), events(vm.$on, vm.$once, vm.$off, vm.$emit)
    2. don't use $el`);
    console.log(this.sayHello);
    console.log(this.message);
    console.log(this.computedMessage);
    console.groupEnd();
    console.groupEnd();
  },
  components: {
    ChildView,
    Checkbox,
    MyList,
    TestView,
    TreeFolder,
    NavigationLink,
  },
  data() {
    return {
      inputValue: "",
      checkValue: "",
      message: "Hello World",
      loginType: "username",
      users: {
        1: {
          id: 1,
          name: "pack",
        },
        2: {
          id: 2,
          name: "pack",
        },
      },
      checkedNames: ["Jack", "Mike"],
      picked: "One",
      selected: "",
      toggle: "",
      textMsg: "",
      price: "",
      loginVue: false,
    };
  },
  computed: {
    computedMessage() {
      return this.message;
    },
  },
  methods: {
    sayHello() {
      console.log(this.message);
    },
    testChange() {
      console.log(this.textMsg);
    },
    clickChild() {
      console.log("v-on:click.native");
    },
  },
  // 2. Mounting: 돔 삽입 단계 (초기 렌더링 직전에 컴포넌트에 직접 접근할 수 있다, 서버렌더링에서는 지원하지 않음)
  // 초기 렌더링 직전에 돔을 변경하고자 한다면 활용 가능하나, 컴포넌트 초기에 세팅되어야할 데이터 패치는 created 단계를 사용
  beforeMount() {
    // 템플릿과 렌더 함수들이 '컴파일된 후'에 '첫 렌더링이 일어나기 직전'에 실행된다.
    console.group("Mounted");
    console.group("beforeMount");
    console.log(`this.$el doesn't exist yet, but it will soon!`);
    console.log(this.$el);
    console.groupEnd();
  },
  mounted() {
    // 컴포넌트, 템플릿, 렌더링된 돔에 접근 가능
    // 모든 하위 컴포넌트가 마운트된 상태를 보장하지는 않는다.
    console.group("PARENT VIEW - MOUNTED");
    console.log("parent");
    console.log("this.$el.textContent ->", this.$el.textContent);
    console.groupEnd();
    console.groupEnd();
  },
  beforeUpdate() {
    // 컴포넌트의 데이터가 변하여 업데이트 사이클이 시작될 때 실행된다.
    // DOM이 재 렌더링되고 패치되기 직전에 실행된다.
    // 가상 돔이 재 렌더링은 되었지만, 아직 실제 돔에 반영되기 직전인듯.
    // 재 렌더링 전의 새 상태의 데이터를 얻을 수 있고 더 많은 변경이 가능함
    // 여기서 발생하는 변경은 재 렌더링으로 트리거 되지 않음 -> updated로 넘어가는듯.
    console.group("beforeUpdate");
    this.message = "Hello World";
    console.groupEnd("beforeUpdate");
  },
  updated() {
    // 컴포넌트의 데이터가 변하여 재 렌더링이 일어난 후에 실행된다.
    // dom이 업데이트 완료된 상태이므로 dom 종속적인 연산을 할 수 있다.
    // 여기서 상태 변경 시 무한루프, 모든 자식 컴포넌트의 재 렌더링 상태를 보장하지는 않음

    console.group("update");
    console.log(this.message);
    console.groupEnd("update");
    this.$nextTick(function () {
      console.log("모든 화면이 렌더링된 후 실행합니다.");
      console.log(this.checkValue);
    });
  },
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  color: blue;
}
</style>
