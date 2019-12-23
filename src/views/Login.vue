<template>
    <div id="border">
        <loginheader class="header"></loginheader>
        <div>
            <h3>登录/注册</h3>
            <p>注册即送2600元新人红包</p>
        </div>
        <logininput></logininput>
    </div>
</template>
<script>
import loginheader from './login/Header'
import logininput from './login/Input'
export default {
  components: {
    loginheader,
    logininput
  }
}
</script>
<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    #border{

        padding: 30px;
        .header{
            ::after{
            content:'';
            height: 0;
            overflow: hidden;
            display: block;
            clear: both;
            }

        }

        h3{
            font-size: 18px;
        }
        p{
            margin-bottom:40px;
        }
    }

</style>
