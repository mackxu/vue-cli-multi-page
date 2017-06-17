<style lang="css" scoped>
    .popup-container {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 11;
        width: 19.2rem;
        height: 10.8rem;
        background: rgba(0, 0, 0, 0.75);
    }

    .popup-wrap {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 12;
        width: 7.5rem;
        min-height: 1.5rem;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #222322;
    }

    .popup-content {
        color: #ababab;
        text-align: center;
        background: rgba(0, 0, 0, 0.8) url(./assets/goldrightsbortop.png) no-repeat;
        -webkit-background-size: contain;
        background-size: contain;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        font-size: 0.42rem;
        line-height: 0.6rem;
    }
</style>

<template>
    <div></div>
</template>

<script>

    export default {
        name: 'Popup',
        components: {},
        props: {},
        data () {
            return {
                text: '初始化文本',
                show: false,
                showTimer: null,
            }
        },
        mounted: function () {
//            var _this = this;
//            bus.$on('showPopup', function (text, time, callback) {
//                _this.showPopup(text, time, callback);
//            })
        },
        methods:{
            showPopup: function (text, time, callback) {
                var _this = this;
                _this.text = text;
                _this.show = true;
                clearTimeout(_this.showTimer);
                _this.showTimer = setTimeout(function () {
                    _this.show = false;
                    !!callback&&callback();
                }, time);
            }
        }
    }

</script>