<style lang="css" scoped>
    .qrcode-qrcanvas {
        width: 5.1rem;
        height: 5.1rem;
    }
</style>

<template>
    <div class="qrcode-qrcanvas">
        <qrcode-vue :value="qrUrl" :size="size" level="H" v-if="size"></qrcode-vue>
    </div>
</template>

<script>
    import QrcodeVue from 'qrcode.vue';
    export default {
        name: 'Qrcode',
        components: {
            QrcodeVue
        },
        props: {
            qrUrl: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                size: 0,
            }
        },
        mounted() {
            this.size = parseFloat(getComputedStyle(this.$el, null).width);
        }
    }

</script>