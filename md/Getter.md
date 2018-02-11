+ 有时候需要从store中的state中派生处于一些状态，例如对列表进行过滤排序并计数,例如

```
computed:{
  doneTodosCount(){
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

> 但是如果有多个组件需要使用到此属性，就需要复制多份，或者使用一个共享函数后在多出导入，但是这两种凡是都不是很理想

+ Vuex允许在store中定义`getter`（可以认为是store的计算属性），就像计算属性一样，getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了变化才会被重新计算

#### 使用
  1. **Getter接受state作为其第一个参数**
  2. **Getter会暴露store.getters对象**
  3. **Getter也可以接受其他getter作为第二个参数**
  4. **可以通过让getter返回一个函数，来实现给getter传参**

实例展示以及[(链接)](https://ybonest.github.io/vuex-note/vuexexample/example.3/index.html)
<iframe style="overflow:hidden;height:180px;width:100%" class="yboflag" src="vuexexample/example.3/index.html"></iframe>
```
<div id="app">
  <component-one></component-one>
</div>
<script>
  const store = new Vuex.Store({
    state: {  //数据池
      count: 0,
      carts: [
        { id: 1, count: 1 },
        { id: 2, count: 2 },
        { id: 3, count: 3 },
        { id: 4, count: 4 },
        { id: 5, count: 5 },
      ]
    },
    mutations: {
      increme(state) {
        state.count++;
      }
    },
    getters: {
      filtersCart(state) {  //使用普通函数
        return state.carts;
      },
      filterCart: state => { //使用箭头函数
        return state.carts.filter(cart => cart.id % 2 === 0)
      },
      getId5: (state) => (id) => {  //返回一个函数来传入参数
        console.log(id);
        console.log(state.carts.find(cart => cart.id === id))
        return state.carts.find(cart => cart.id === id)
      }
    }
  })
  //定义组件
  Vue.component('component-one', {
    template: `<div>
          <p>{{dataOne}}</p>
          <p v-for="item in getCart" :key="item.id">{{item.count}}</p>
          <hr>
          <div>
            <p v-for="item in getFiltersCart" :key="item.id">{{item.count}}</p>
          </div>
          <hr>
          <div>
            <p>{{getId5Arg.count}}</p>
          </div>
        </div>`,
    data() {
      return {
        dataOne: 'component-one组件'
      }
    },
    created() {
      this.test();
    },
    methods: {
      test() {
        console.log(this);
        console.log(this.getFiltersCart)
      }
    },
    computed: {
      getCart() { //引入store中的getters
        return this.$store.getters.filtersCart;
      },
      getFiltersCart() {
        return this.$store.getters.filterCart;
      },
      getId5Arg() {
        return this.$store.getters.getId5(5);  //调用getters传入参数
      }
    }
  })
  const vm = new Vue({
    el: "#app",
    data: {
      dataApp: '来自App的数据'
    },
    store  //将vuex实例挂载到组件上
  })
</script>
```

#### mapGetters辅助函数
+ mapGetters辅助函数可以将store中的getter映射到局部计算属性

```
export default {
  computed:{
    //使用对象展开运算符将getter混入computed对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter'
    ])
  }
}
```

+ 如果你想将一个getter属性另取一个名字，使用对象形式：
```
export default {
  computed:{
    //使用对象展开运算符将getter混入computed对象中
    ...mapGetters({
      doneCount:'doneTodosCount'
    })
  }
}
```