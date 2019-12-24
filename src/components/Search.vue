<template>
    <div>
        <ul class="searchHead" id="isSearch" :class="{'isSearch' : isSearch}">
            <router-link to="/login" tag="li" id="isBlack" :class="{'isBlack' : isBlack}">登录</router-link>
            <li>
                <input type="search" v-model="inputtext" @click="searchgoods()" :class="{'isGrey' : isGrey}">
            </li>
            <i class="iconfont icon-icon-test11" :class="{'isBlack' : isBlack}"></i>
        </ul>
        <div class="searchlist" v-if="$store.state.searchlistisShow">
            <div>
                <div class="inputbox">
                    <span class="iconfont icon-icon-test12"></span>
                    <input search="text" v-model="inputtext" @input="search()">
                    <span @click="cleartext()" class="reset">
                        <span>x</span>
                    </span>
                </div>
                <span @click="closeSearch()" class="closesearch">取消</span>
            </div>
            <ul v-if="true" class="goodslist">
                <li v-for="(data,index) in searchlist" :key="index" @click="gosearchlist(data.name)">
                    <h3>{{data.name}}</h3><span>约:{{data.productCount}}件商品</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
export default {
  data () {
    return {
      inputtext: '',
      searchlist: [],
      isSearch: false,
      isBlack: false,
      isGrey: false
    }
  },
  methods: {
    initHeight () {
      // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 如果被卷曲的高度大于吸顶元素到顶端位置 的距离
      this.isSearch = scrollTop > this.offsetTop
      this.isBlack = scrollTop > this.offsetTop
      this.isGrey = scrollTop > this.offsetTop

      //   console.log('吸顶')
    },
    gosearchlist (name) {
      this.$router.push(`/searchlist/${name}`)
    },
    search () {
      Axios({
        url: `http://www.meihigo.hk/appapi/search/searchSuggest/v3?text=${this.inputtext}`
      }).then(res => {
        this.searchlist = res.data.result ? res.data.result : []
        console.log(this.searchlist)
      })
    },
    cleartext () {
      this.inputtext = ''
    },
    searchgoods () {
      // console.log('1112')
      this.$store.commit('opensearch')
    },
    closeSearch () {
      this.$store.commit('closesearch')
    }
  },
  mounted () {
    Axios({
      url: 'http://www.meihigo.hk/appapi/search/searchDefault/v3'
    }).then(res => {
      this.inputtext = res.data.words
    })
    window.addEventListener('scroll', this.initHeight)
    this.$nextTick(() => {
      // 获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置
      this.offsetTop = document.querySelector('#boxFixed').offsetTop
      this.offsetTop = document.querySelector('#isHeight').offsetTop
    })
  },
  // 回调中移除监听
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss" scoped>
    .isBlack{
        color: #000;
    }
    .searchHead{
        position: relative;
        z-index: 100;
        height: 0.5rem;
        flex-flow: row;
        font-size: 0.14rem;
        color: #fff;
        li{
            text-align: center;
            line-height: 0.5rem;
            flex: 1;
            box-sizing: border-box;
            font-size: 0.14rem;
            &:nth-of-type(2){
                flex: 5;
            }
            input{
                font-size: 0.14rem;
                color:#fff;
                text-align: center;
                height: 0.4rem;
                width: 100%;
                border: none;
                background: rgba($color: #fff, $alpha: 0.2);
            }
                .isGrey{
        background: #f5f5f5;
        color: #000;
    }
        }
        display: flex;
    }
           .isSearch{
        background: #fff;
    }

    i.icon-icon-test11{
       font-size: 0.3rem;
       margin-top: 0.09rem;
       margin-right: 0.14rem;
       margin-left: 0.16rem;
    }
    .searchlist{
        width: 100%;
        height: 100%;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9300;
        .icon-icon-test12{
            font-size: 0.2rem;
        }
    }
    .searchlist>div{
        width: 100%;
        display: flex;
        height: 0.4rem;
        background:#fff;
        line-height: 0.4rem;
        text-align: center;
        font-size: 0.14rem;
        .inputbox{
            flex: 5;
            display: flex;

        &>span{
            flex: 1;
        }
        &>input{
            flex: 6;
            background: #f5f5f5;
            border: 0;
        }
        .reset{
            position: relative;
            &>span{
                line-height: 0.15rem;
                color: white;
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top:-22%;
                margin-left:-22%;
            width: 0.15rem;
            height: 0.15rem;
            border-radius: 50%;
            background: #999;
            }
        }
        }
        &>span{
            flex: 1;
        }
    }
    .goodslist{
        li{
            height: 0.6rem;
            width: 100%;
            border-bottom: 1px solid #888;
            h3{
                line-height: 0.6rem;
                float: left;
            }
            span{
                line-height: 0.6rem;
                float: right;
            }
        }
    }
</style>
