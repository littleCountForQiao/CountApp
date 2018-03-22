<template>
  <v-app id="inspire">
    <!--<v-navigation-drawer-->
      <!--fixed-->
      <!--v-model="drawer"-->
      <!--app-->
    <!--&gt;-->
      <!--<v-list dense>-->
        <!--<v-list-tile @click="">-->
          <!--<v-list-tile-action>-->
            <!--<v-icon>home</v-icon>-->
          <!--</v-list-tile-action>-->
          <!--<v-list-tile-content>-->
            <!--<v-list-tile-title>Home</v-list-tile-title>-->
          <!--</v-list-tile-content>-->
        <!--</v-list-tile>-->
        <!--<v-list-tile @click="">-->
          <!--<v-list-tile-action>-->
            <!--<v-icon>contact_mail</v-icon>-->
          <!--</v-list-tile-action>-->
          <!--<v-list-tile-content>-->
            <!--<v-list-tile-title>Contact</v-list-tile-title>-->
          <!--</v-list-tile-content>-->
        <!--</v-list-tile>-->
      <!--</v-list>-->
    <!--</v-navigation-drawer>-->
    <v-toolbar color="indigo" dark fixed app>
      <!--<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>-->
      <v-toolbar-title>APP FOR QIAO</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-start
        >
          <v-flex text-xs-center>
            <v-stepper v-model="step">
              <v-stepper-header>
                <v-stepper-step step="1" :complete="step > 1">输入入选的花灯序号</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="step > 2">依次输入网友评选的花灯序号</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3" :complete="step === 3">查看结果</v-stepper-step>
              </v-stepper-header>
              <v-stepper-items>
                <v-stepper-content step="1" style="background: lightblue;">
                  <v-card class="elevation-3 mb-4">
                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <h3 class="mb-3">添加入选的花灯序号</h3>
                        </v-flex>
                        <v-flex lg2 sm4 xs12 class="px-3" v-for="(item, index) in model" :key="index">
                          <v-text-field
                            label="请输入"
                            type="number"
                            v-model.number="model[index]"
                            :rules="[rules.required(model[index]), rules.repeated(index)]"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 class="px-3">
                          <v-btn @click="model.push(0)">添加</v-btn>
                          <v-btn flat @click="model.pop()">移除最后一项</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                  <v-btn color="primary" @click.native="next1">继续</v-btn>
                </v-stepper-content>
                <v-stepper-content step="2" style="background: lightblue;">
                  <v-card class="mb-4">
                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <h3 class="mb-3">输入网友评选的花灯序号</h3>
                        </v-flex>
                        <v-flex xs12 md4 lg4 class="px-3">
                          <v-text-field
                            label="请输入姓名"
                            v-model="answer.name"></v-text-field>
                        </v-flex>
                        <v-flex xs12 md8 lg7 class="px-3">
                          <v-text-field
                            label="请输入网友答案"
                            v-model="answer.content"
                            hint="大部分格式均可支持"></v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 lg1 class="px-3">
                          <v-btn color="primary" @click="saveData">保存</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                  <v-card class="mb-4 light-blue lighten-5">
                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex class="px-3" style="width: 60vw;">
                          <p>更改上一步所填入选花灯序号时需要点击重新计算</p>
                          <v-data-table
                            :headers="headers"
                            :items="items"
                            hide-actions
                            class="elevation-1"
                            no-data-text="暂无数据"
                            ref="table"
                          >
                            <template slot="items" slot-scope="props">
                              <td>{{ props.item.name }}</td>
                              <td :class="{ pink: isCorrect( props.item.num1 ) }">{{ props.item.num1 }}</td>
                              <td :class="{ pink: isCorrect( props.item.num2 ) }">{{ props.item.num2 }}</td>
                              <td :class="{ pink: isCorrect( props.item.num3 ) }">{{ props.item.num3 }}</td>
                              <td :class="{ pink: isCorrect( props.item.num4 ) }">{{ props.item.num4 }}</td>
                              <td :class="{ pink: isCorrect( props.item.num5 ) }">{{ props.item.num5 }}</td>
                              <td :class="{ pink: isCorrect( props.item.num6 ) }">{{ props.item.num6 }}</td>
                              <td :class="{ pink: isCorrect( props.item.num7 ) }">{{ props.item.num7 }}</td>
                              <td :class="{ pink: isCorrect( props.item.num8 ) }">{{ props.item.num8 }}</td>
                              <td :class="{ pink: isCorrect( props.item.num9 ) }">{{ props.item.num9 }}</td>
                              <td :class="{ pink: isCorrect( props.item.num10 ) }">{{ props.item.num10 }}</td>
                              <td>{{ props.item.count }}</td>
                              <td><v-btn icon @click="deleteItem(props)"><v-icon color="pink">delete</v-icon></v-btn></td>
                            </template>
                          </v-data-table>
                          <v-btn color="mt-4" class="primary" @click="recompute">重新计算</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                  <v-btn color="primary" @click.native="next2">继续</v-btn>
                  <v-btn flat @click="step = 1">返回</v-btn>
                </v-stepper-content>
                <v-stepper-content step="3" style="background: lightblue;">
                  <v-card class="mb-4">
                    <v-card-text>
                      <v-layout row justify-center>
                        <v-flex xs12>
                          <h3 class="headline mb-0" v-if="result.length">恭喜以下网友中奖，猜中{{result[0] ? result[0].count : ''}}个花灯，撒花~~~ (゜-゜)つロ</h3>
                          <h3 class="headline mb-0" v-else>请返回输入数据</h3>
                        </v-flex>
                      </v-layout>
                      <v-layout row justify-center>
                        <v-flex xs12 sm8 md6 lg4 xl3>
                          <v-list>
                            <v-list-tile v-for="item in result" :key="item.name" @click="() => false">
                              <v-list-tile-action>
                                <v-icon color="pink">star</v-icon>
                              </v-list-tile-action>
                              <v-list-tile-content>
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                                <v-list-tile-sub-title>所选序号：{{ `${item.num1}，${item.num2}，${item.num3}，${item.num4}，${item.num5}，${item.num6}，${item.num7}，${item.num8}，${item.num9}，${item.num10}` }}</v-list-tile-sub-title>
                              </v-list-tile-content>
                            </v-list-tile>
                          </v-list>
                        </v-flex>
                      </v-layout>
                      <v-layout row justify-center>
                        <v-flex xs12 sm8 md6 lg4 xl3>
                          <v-btn @click="exportXLSX">导出为EXCEL</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                  <v-btn color="primary" @click.native="step = 1">返回首页</v-btn>
                  <v-btn flat @click.native="step = 2">返回</v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar v-model="snackbar">{{snackbarText}}</v-snackbar>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text px-3">&copy; 2017</span>
      <v-spacer></v-spacer>
      <span class="white--text px-3">by Stitch_C</span>
    </v-footer>
  </v-app>
</template>

<script>
import XLSX from 'xlsx'

export default {
  name: 'appMain',
  data () {
    let model = JSON.parse(localStorage.getItem('model'))
    let items = JSON.parse(localStorage.getItem('items'))
    if (!model) {
      model = []
    }
    if (!items) {
      items = []
    }
    let that = this
    return {
      drawer: false,
      step: 1,
      rules: {
        required (v) { return v !== '' || '请输入序号' },
        repeated (v) {
          for (let i = 0; i < that.model.length; i++) {
            if (v !== i) {
              if (that.model[v] === that.model[i]) {
                return '请勿输入重复序号'
              }
            }
          }
          return true
        }
      },
      model,
      answer: {
        name: '',
        content: ''
      },
      headers: [
        { text: '姓名', value: 'name', sortable: false, align: 'center' },
        { text: '花灯1', value: 'num1', sortable: false, align: 'center' },
        { text: '花灯2', value: 'num2', sortable: false, align: 'center' },
        { text: '花灯3', value: 'num3', sortable: false, align: 'center' },
        { text: '花灯4', value: 'num4', sortable: false, align: 'center' },
        { text: '花灯5', value: 'num5', sortable: false, align: 'center' },
        { text: '花灯6', value: 'num6', sortable: false, align: 'center' },
        { text: '花灯7', value: 'num7', sortable: false, align: 'center' },
        { text: '花灯8', value: 'num8', sortable: false, align: 'center' },
        { text: '花灯9', value: 'num9', sortable: false, align: 'center' },
        { text: '花灯10', value: 'num10', sortable: false, align: 'center' },
        { text: '猜中总数', value: 'count', sortable: false, align: 'center' },
        { text: '操作', sortable: false, align: 'center' }
      ],
      items,
      result: [],
      snackbarText: '',
      snackbar: false
    }
  },
  methods: {
    vertify () {
      if (this.model.some(v => v === '')) {
        this.snackbarText = '请输入全部入选的花灯序号'
        this.snackbar = true
        return false
      }
      if ([...new Set(this.model)].length < this.model.length) {
        this.snackbarText = '花灯序号有重复，请仔细核对'
        this.snackbar = true
        return false
      }
      return true
    },
    next1 () {
      if (this.vertify()) {
        this.model = this.model.map(v => parseInt(v))
        localStorage.setItem('model', JSON.stringify(this.model))
        this.step = '2'
      }
    },
    next2 () {
      this.result = this.getResult()
      this.step = '3'
    },
    saveData () {
      let num = this.getNum()
      if (this.answer.name === '') {
        this.snackbarText = '请输入姓名'
        this.snackbar = true
        return false
      }
      if (!num) return false
      let count = this.countNum(num)
      this.items.push({
        value: false,
        name: this.answer.name,
        num1: num[0],
        num2: num[1],
        num3: num[2],
        num4: num[3],
        num5: num[4],
        num6: num[5],
        num7: num[6],
        num8: num[7],
        num9: num[8],
        num10: num[9],
        count
      })
      localStorage.setItem('items', JSON.stringify(this.items))
      this.answer.name = ''
      this.answer.content = ''
    },
    deleteItem (props) {
      let i = props.index
      this.items.splice(i, 1)
      localStorage.setItem('items', JSON.stringify(this.items))
    },
    getNum () {
      let value = this.answer.content
      let cache = []
      if (value.indexOf('.') !== -1) {
        cache = value.split('.')
      }
      if (value.indexOf('、') !== -1) {
        cache = value.split('、')
      }
      if (value.indexOf(' ') !== -1) {
        cache = value.split(' ')
      }
      if (value.indexOf(',') !== -1) {
        cache = value.split(',')
      }
      if (value.indexOf('，') !== -1) {
        cache = value.split('，')
      }
      if (value.indexOf('-') !== -1) {
        let flag = value.split('-')
        for (let i = flag[0] - 0; i < flag[1] - 0 + 1; i++) {
          cache.push(i)
        }
      }
      if (value.indexOf('–') !== -1) {
        let flag = value.split('–')
        for (let i = flag[0] - 0; i < flag[1] - 0 + 1; i++) {
          cache.push(i)
        }
      }
      if (value.indexOf('－') !== -1) {
        let flag = value.split('－')
        for (let i = flag[0] - 0; i < flag[1] - 0 + 1; i++) {
          cache.push(i)
        }
      }
      if (value.indexOf('～') !== -1) {
        let flag = value.split('～')
        for (let i = flag[0] - 0; i < flag[1] - 0 + 1; i++) {
          cache.push(i)
        }
      }
      if (value.indexOf('~') !== -1) {
        let flag = value.split('~')
        for (let i = flag[0] - 0; i < flag[1] - 0 + 1; i++) {
          cache.push(i)
        }
      }
      if (cache.length === 0) {
        this.snackbarText = '数据无法识别，请修改输入数据的格式'
        this.snackbar = true
        return false
      }
      if (cache.length > 10) {
        this.snackbarText = '所选花灯序号超过10个'
        this.snackbar = true
        return false
      }
      return cache.map(v => parseInt(v))
    },
    countNum (num) {
      let count = 0
      let model = this.model
      num.forEach(value => {
        if (model.some(v => v === value)) {
          count++
        }
      })
      return count
    },
    isCorrect (value) {
      return this.model.some(v => value === v)
    },
    getResult () {
      if (this.items.length < 2) {
        return this.items
      }
      let arr = [...this.items]
      arr.sort((a, b) => {
        return b.count - a.count
      })
      let num = 0
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].count > arr[i + 1].count) {
          num = i
          break
        }
      }
      return arr.splice(0, num + 1)
    },
    recompute () {
      let that = this
      this.items.forEach(
        v => {
          let arr = [ v.num1, v.num2, v.num3, v.num4, v.num5, v.num6, v.num7, v.num8, v.num9, v.num10 ]
          let count = that.countNum(arr)
          v.count = count
        }
      )
      localStorage.setItem('items', JSON.stringify(this.items))
    },
    exportXLSX () {
      // console.log(this.$refs.table.$el.children[0].children[0])
      let dom = this.$refs.table.$el.children[0].children[0]
      let wb = XLSX.utils.table_to_book(dom, { sheet: 'Sheet JS' })
      XLSX.writeFile(wb, '666.xlsx')
    }
  }
}
</script>

<style>

</style>
