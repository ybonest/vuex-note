#### 使用
+ 更改Vuex的store中的状态唯一方法是提交mutation
+ mutation中第一个参数是state

```
const store = new Vuex.Store({
  state:{
    count:1
  },
  mutations:{
    increment(state){
      state.count++
    }
  }
})
```

+ mutation需要以相应的type调用store.commit方法

+ mutation可以传入第二个参数，这个参数一般是对象


实例展示以及[(链接)](https://ybonest.github.io/vuex-note/vuexexample/example.5/index.html)
<iframe style="overflow:hidden;height:180px;width:100%" class="yboflag" src="vuexexample/example.5/index.html"></iframe>


```
  mutations: { //mutations定义
    increme(state) {
      state.count++;
    },
    incremeArg(state,step){
      state.count += step;
    }
  }
  methods: { //调用mutation
    add(){
      this.$store.commit('increme');
    },
    addStep(){
      this.$store.commit('incremeArg',10);
    }
  }
```

+ 除却上例中的提交方式外，mutation也可以直接使用包含type属性的对象

```
store.commit({
  type:'increment',
  amount:10
})
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

#### mapMutations

除了使用this.$store.commit('xxx') 提交 mutation外，也可以用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用
```
 methods: {
  // add(){
  //   this.$store.commit('increme');
  // },
  // addStep(){
  //   this.$store.commit('incremeArg',parseInt(this.step));
  // }
  ...Vuex.mapMutations([
    'increme',
    'incremeArg'
  ]),
  ...Vuex.mapMutations({
    add:'increme'
  })
}
```

实例展示以及[(链接)](https://ybonest.github.io/vuex-note/vuexexample/example.6/index.html)
<iframe style="overflow:hidden;height:180px;width:100%" class="yboflag" src="vuexexample/example.6/index.html"></iframe>