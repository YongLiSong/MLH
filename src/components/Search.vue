<template>
    <div>
        <ul>
            <router-link to="/login" tag="li" style="font-size:0.2rem">登录</router-link>
            <li>
                <input type="search" placeholder="Chloe 最低可至6折">
            </li>
            <li class="shopingcar"></li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
    ul{
        position: relative;
        z-index: 100;
<<<<<<< HEAD
        height: 0.5rem;
        flex-flow: row;
        li{
            padding-top: 0.05rem;
            text-align: center;
            line-height: 0.5rem;
=======
        height: 0.50rem;
        flex-flow: row;
        li{
            text-align: center;
            line-height: 0.50rem;
>>>>>>> 69bc85e7dab323d14aa69c10dac3480caaec1aaf
            flex: 1;
            box-sizing: border-box;
            font-size: 0.16rem;
            color: #fff;
            &:nth-of-type(2){
                flex: 5;
            }
            input{
                font-size: 0.16rem;
                color:#fff ;
                text-align: center;
<<<<<<< HEAD
                height: 0.4rem;
=======
                height: 0.40rem;
>>>>>>> 69bc85e7dab323d14aa69c10dac3480caaec1aaf
                width: 100%;
                border: none;
                background: rgba($color: #fff, $alpha: 0.2);
            }
        }
        display: flex;
    }
    .shopingcar{
        background: url(data:image/png;base64,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) no-repeat 0.20rem 0.20rem ;
        background-size:30%
    }
</style>
