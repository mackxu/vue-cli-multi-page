/**
* Created by mackxu on 2017/6/18
*/
<style lang="css" scoped>

</style>

<template>
    <div>
        hello!!
        <hello></hello>
    </div>
</template>

<script>
		import Lib from 'assets/js/Lib'
		import Hello from 'components/Hello.vue'
		export default {
				name: 'APP',
				components: {
						Hello
				},
				data () {
						return {}
				},
				methods: {
						async getUserInfo() {
								let hello = await Lib.API.getUserInfo();
								console.log(hello);
						}
				},
                mounted () {
						this.getUserInfo();
                }
		}
</script>
