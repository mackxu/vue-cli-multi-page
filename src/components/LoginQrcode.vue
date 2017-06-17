<style lang="css" scoped>

</style>

<template>
    <qrcode-wrap :qrUrl="qrUrl"></qrcode-wrap>
</template>

<script>
    import QrcodeWrap from './QrcodeWrap.vue';
    export default {
        name: 'LoginQrcode',
        components: {
            QrcodeWrap
        },
        props: {

        },
        data () {
            return {
                qrUrl: 'http://baidu.com'
            }
        }
    }

</script>