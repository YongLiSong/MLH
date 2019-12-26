<template>
    <div>
      <listnav>
        <div class="detail_title">
          <p>购物车</p>
        </div>
      </listnav>
        <ul>
            <li v-for="(list,index) in cartList" :key="list.id" class="cart_li">
                <input type="checkbox" v-model="checkgroup" :value="list" @change="handleItemchange"/>
                <!-- {{ list.id }} -->
                <img :src="list.myimg" />
                <div class="cartFont">
                  <h3>{{ list.name }}</h3>
                  <div class="value_size">
                    <p>已选：{{ list.value }}</p>
                    <p>{{ list.size }}</p>
                  </div>
                  <div class="price_num">
                    <p>￥{{ list.price }}</p>
                    <div class="num">
                      <button @click="handleDel(list)" class="min">-</button>
                      <span>{{ list.num }}</span>
                      <button @click="list.num++" class="add">+</button>
                    </div>
                  </div>
                  <button @click="removeList(index)" class="remove">删除</button>
                </div>
            </li>
        </ul>
        <!-- {{checkgroup}} -->
        <div class="cartFix">
          <div class="CheckAll">
            <input type="checkbox" v-model="isAllChecked" @change="handleChange"/>
            <p>全选</p>
          </div>
          <p class="allprice">总金额: <span>￥{{ sum() }}</span></p>
          <button class="buynow">去结算</button>
        </div>
        <div class="button_box"></div>
    </div>
</template>
<script>
import listnav from '@/components/Listnav'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      isAllChecked: false,
      cartList: null,
      priceSum: 0,
      checkgroup: []
    }
  },
  components: {
    listnav
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
        // 全选
        this.isAllChecked = true
      } else {
        // 不全选
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
      // console.log(index)
      // 删除按钮弹窗
      MessageBox({
        title: '删除商品',
        message: '确定删除此商品?',
        showCancelButton: true
      }).then(action => {
        if (action === 'confirm') {
          // console.log('删除成功')
          this.cartList.splice(index, 1)
          this.setCartStorage()
          MessageBox('提示', '删除成功')
        } else {
          // console.log('再逛逛')
        }
      })
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
    }
  }
}
</script>

<style lang="scss" scoped>
.cartFix{
  box-sizing: border-box;
  width: 100%;
  height: 0.5rem;
  box-shadow: 0 0.013333rem 0.133333rem 0.066667rem rgba(0,0,0,.05);
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0 0.12rem ;
  .CheckAll{
    width: 0.65rem;
    height: 100%;
    margin-top: 0.14rem;
    input{
      width: 0.18rem;
      height: 0.18rem;
      background: #fff;
      float: left;
      margin-right: 0.11rem;
    }
  }
  .allprice{
    margin-right: 1.24rem;
    margin-top: 0.16rem;
    color: #000;
    font-weight: bold;
    span{
      color: #dc2424;
    }
  }
  .buynow{
    width: 1.09rem;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    color: #fff;
    background: #dc2424;
  }
}
.detail_title{
      width: 100%;
      p{
        text-align: center;
      }
    }
    li{
      width: 100%;
      height: 1.4rem;
      border-top: 1px solid #dfdfdf;
      border-bottom: 1px solid #dfdfdf;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0.14rem;
      input{
        width: 0.18rem;
        height: 0.18rem;
        background: #fff;
        border: none;
        border: 1px solid #e0e0e0;
        margin-right: 0.11rem;
        margin-top: 0.44rem;
      }
      img{
        width: 0.97rem;
        margin-right: 0.11rem;
      }
      .cartFont{
        flex: 1;
        h3{
          width: 2.08rem;
          font-size: 0.14rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 0.03rem;
          font-weight: bold;
        }
        .value_size{
          width: 2.08rem;
          height: 0.25rem;
          background: #fff;
          border: 1px solid #e0e0e0;
          box-sizing: border-box;
          padding-left: 0.04rem;
          margin-top: 0.07rem;
          p{
            float: left;
            line-height: 0.25rem;
            font-size: 0.14rem;
            color: #9d9d9d;
            margin-right: 0.13rem;
          }
        }
        .price_num{
          width: 2.08rem;
          display: flex;
          justify-content: space-between;
          margin-top: 0.07rem;
          p{
            font-size: 0.14rem;
            color: #dc2424;
            font-weight: bold;
          }
          .num{
            width: 0.73rem;
            height: 0.22rem;
            button{
              width: 0.22rem;
              height: 0.22rem;
              border: none;
              background: #e0e0e0;
            }
            button.min{
              margin-right: 0.1rem;
            }
            button.add{
              margin-left: 0.1rem;
            }
          }
        }
        .remove{
          width: 0.5rem;
          height: 0.19rem;
          border: none;
          background: #dc2424;
          color: #fff;
          margin-top: 0.05rem;
        }
      }
    }
    .button_box{
      height: 0.5rem;
      width: 100%;
    }
</style>
