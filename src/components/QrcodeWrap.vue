<style lang="css" scoped>
    .qrcode-wrap {
        padding: 0.2rem;
        background: #fff;
    }
    .qrcode-text {
        text-align: center;
        font-size: 0.36rem;
        line-height: 0.36rem;
        padding-top: 0.2rem;
    }
</style>

<template>
    <div id="qrcode-wrap" class="qrcode-wrap">
        <qrcode v-if="qrUrl" :qrUrl="qrUrl"/>
        <div id="qrcode-text" class="qrcode-text">支持微信扫码开通</div>
    </div>
</template>

<script>
    import Qrcode from './Qrcode.vue';
    export default {
        name: 'QrcodeWrap',
        components: {
            Qrcode
        },
        props: {
            qrUrl: {type: String, required: true}
        }
    }

</script>