<style lang="css" scoped>

</style>

<template>
    <qrcode-wrap :url="qrUrl"></qrcode-wrap>
</template>

<script>
    import QrcodeWrap from '../../../components/QrcodeWrap.vue';
    export default {
        name: 'AutoRenewQrcode',
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