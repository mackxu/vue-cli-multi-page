/**
 * Created by mackxu on 2017/6/18.
 */

import axios from 'axios'

export default {
		getUserInfo() {
			return new Promise((resolve, reject) => {
				setTimeout(() =>{
					resolve('good work');
				}, 1000);
			})
		}
}