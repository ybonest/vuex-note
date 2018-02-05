### State数据共享池
+ state是vuex中存放数据的共享数据池

#### 初步使用vuex的步骤
1. 引入Vuex插件`<script src="./js/vuex.js"></script>`
2. 实例化一个Vuex.Store对象，并挂载到Vue中
3. 在vuex中的state数据池中定义共享数据

实例展示以及[(链接)](https://ybonest.github.io/vue-note/vuexexample/example/index.html)
<iframe style="overflow:hidden;height:180px;width:100%" class="yboflag" src="vuexexample/example/index.html"></iframe>

```
<div id="app">
    <component-one></component-one>
    <hr>
    <component-two></component-two>
  </div>
  <script>
    Vue.use(Vuex)
    const store = new Vuex.Store({
      state:{  //数据池
        count:0,
        cart:[
          {id:1,count:1},
        ]
      },
      mutations:{
        increme(state){
          state.count++;
        }
      }
    })
    //定义组件
    Vue.component('component-one',{
      template:`<div>
          <p>{{dataOne}}</p>
          <input type="button" value="增加数据1" @click="increment">
          <input type="button" value="增加数据2" @click="increment2">
          <p>count:{{$store.state.count}}</p>
        </div>`,
      data(){
        return {
          dataOne:'component-one组件'
        }
      },
      methods:{
        increment(){
          console.log(this);  //当在Vue实例中挂载Vuex的实例store后，可以看到，组件中多了一个$store对象，该对象存放了共享数据
          console.log(this.$store.state.count)
          this.$store.state.count++;  //虽然可以这样操作共享数据，但是一般情况下这中操作数据的方式是被禁止的，vuex中修改gongxiang数据需要借用mutations
        },
        increment2(){
          this.$store.commit('increme');
        }
      }
    })
    Vue.component('component-two',{
      template:`<div>
          <p>{{dataTwo}}</p>
          <p>{{count}}</p>
        </div>`,
      data(){
        return {
          dataTwo:'component-two组件'
        }
      },
      computed:{
        ...Vuex.mapState(["count"])  //使用展开运算符以及mapState把数据映射state数据映射到组件的计算属性中
      }
    })
    const vm = new Vue({
      el:"#app",
      data:{
        dataApp:'来自App的数据'
      },
      store  //将vuex实例挂载到组件上
    })
  </script>
```

#### mapState辅助函数
mapState函数可以快捷方便的辅助我们生成计算属性，实时更新共享数据的变化

实例展示以及[(链接)](https://ybonest.github.io/vue-note/vuexexample/example.1/index.html)
<iframe style="overflow:hidden;height:180px;width:100%" class="yboflag" src="vuexexample/example.1/index.html"></iframe>

```
<div id="app">
    <component-one></component-one>
  </div>
  <script>
    const store = new Vuex.Store({
      state:{  //数据池
        count:0,
        cart:[
          {id:1,count:1},
        ]
      },
      mutations:{
        increme(state){
          state.count++;
        }
      }
    })
    //定义组件
    Vue.component('component-one',{
      template:`<div>
          <p>{{dataOne}}</p>
          <button @click="add">+1</button>
          <p>{{count}}</p>
          <p>{{countAlias}}</p>
          <p>{{countPlusLocalState}}</p>
        </div>`,
      data(){
        return {
          dataOne:'component-one组件',
          localCount:2
        }
      },
      methods:{
        add(){
          this.$store.commit('increme') //commit参数对应所要调用的mutations中的属性方法
        }
      },
      computed:Vuex.mapState({  //使用mapState生成计算属性
        count:state => state.count, //使用箭头函数
        countAlias:'count', //传入的字符串等同于箭头函数state => state.count
        countPlusLocalState(state){
          return state.count + this.localCount
        }
      })
    })
    const vm = new Vue({
      el:"#app",
      data:{
        dataApp:'来自App的数据'
      },
      store  //将vuex实例挂载到组件上
    })
  </script>
```

> 当映射的计算属性的名称与 state 的子节点名称相同时，也可以给 mapState 传一个字符串数组

```
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

> 使用对象展开运算符
上例中都是覆盖式的将共享数据以计算属性的方式映射到computed，这样组件再也无法自定义自己的计算属性，因此推荐使用对象展开运算符形式


```
computed: {
    // 这是使用 vuex 映射过来的计算属性,mapState传入的是是要映射到该处的共享数据
    ...mapState(["count"]),
    // 这是自定义的计算属性
    myinfo: function() {
      return this.a + "~~~~";
    }
  }
```