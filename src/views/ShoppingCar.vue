<template>
    <div>
         <input type="checkbox" v-model="isAllChecked" @change="handleChange"/>
        <ul>
            <li v-for="(list,index) in cartList" :key="list.id">
                 <input type="checkbox" v-model="checkgroup" :value="list" @change="handleItemchange"/>
                {{ list.id }}
                {{ list.name }}
                <img :src="list.myimg" />
                ￥{{ priceSum }}
                {{ list.size }}
                <button @click="handleDel(list)">-</button>
                {{ list.num }}
                <button @click="list.num++">+</button>
                {{ list.value }}  ------{{index}}
                <button @click="removeList(index)">删除</button>

            </li>
        </ul>
              {{checkgroup}}
              <p>总金额{{ sum() }}</p>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isAllChecked: false,
      cartList: null,
      priceSum: 0,
      checkgroup: []
    }
  },
  mounted () {
    this.cartInt()
  },
  methods: {
    // 减去商品数量
    handleDel (data) {
      // console.log(data)
      data.num--
      if (data.num === 0) {
        data.num = 1
      }
    },
    // 全选按钮
    handleChange () {
      // console.log(this.isAllChecked)
      if (this.isAllChecked) {
        this.checkgroup = this.cartList
      } else {
        this.checkgroup = []
      }
    },
    // 单选按钮
    handleItemchange () {
      // console.log("aaaaa")
      if (this.checkgroup.length === this.cartList.length) {
        // console.log('全选')
        this.isAllChecked = true
      } else {
        // console.log('不全选')
        this.isAllChecked = false
      }
    },
    // 商品总和
    sum () {
      var mysum = 0

      for (var i in this.checkgroup) {
        mysum += this.checkgroup[i].num * this.checkgroup[i].price
      }
      return mysum
    },
    // 删除商品
    removeList (index) {
      this.cartList.splice(index, 1)
      console.log(index)
      this.setCartStorage()
    },
    getCartStorage () {
      return JSON.parse(localStorage.getItem('cart'))
    },
    setCartStorage (checkgroup) {
      return localStorage.setItem('cart', JSON.stringify(this.cartList))
    },
    // 从本地存储获取购物车数据
    cartInt () {
      this.cartList = this.getCartStorage() || []
      //  console.log(this.cartList)
      for (var i in this.cartList) {
        // console.log(this.cartList[i].price * this.cartList[i].num)
        this.priceSum = this.cartList[i].price * this.cartList[i].num
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    img{
        width: 0.3rem;
    }
    li{
      border: 1px solid #000;
    }
</style>
