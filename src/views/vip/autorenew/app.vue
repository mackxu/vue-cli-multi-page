<style lang="css">
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        font-size: 50px;
    }

    @media (min-width: 1280px) {
        html {
            font-size: 66.666px;
        }
    }

    @media (min-width: 1920px) {
        html {
            font-size: 100px;
        }
    }

    @media (min-width: 3840px) {
        html {
            font-size: 200px;
        }
    }

    body {
        width: 19.2rem;
        height: 10.8rem;
        overflow: hidden;
        font-size: 0.32rem;
        background-color: #222328;
    }

    .root {
        padding: 2rem;
        height: 100%;
        width: 100%;
        background: url(./assets/bg-active1.png);
        background-size: 100% 100%;
    }

    .active-img {
        width: 7.6rem;
        height: auto;
    }
</style>

<template>
    <div id="root" class="root">
        <img src="./assets/samsungactivity.png" alt="活动图" id="active-img" class="active-img">
        <qrcode-container></qrcode-container>
    </div>
</template>

<script>
    import QrcodeContainer from './QrcodeContainer.vue';
    export default {
        name: 'AutoRenewApp',
        components: {
            QrcodeContainer
        },
        data() {
            return {}
        }
    }

</script>