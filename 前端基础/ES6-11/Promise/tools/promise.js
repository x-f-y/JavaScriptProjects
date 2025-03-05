/* 自定义Promise */

class Promise {
	//构造函数
	constructor(executor) {
		//添加属性
		this.promiseState = 'pending';
		this.promiseResult = null;
		//声明属性
		this.callbacks = [];
		//保存实例对象this的值
		const self = this;
		//resolve函数
		function resolve(data) {
			//判断状态是否被修改过，如果被修改过，则不能再修改
			if (self.promiseState != 'pending')
				return;
			//修改对象的状态  promiseState
			self.promiseState = 'fulfilled'; //resolved
			//设置对象的结果值  promiseResult
			self.promiseResult = data;
			//调用成功的回调函数
			setTimeout(() => {
				self.callbacks.forEach(item => {
					item.onresolve(data);
				});
			});
		}
		//reject函数
		function reject(data) {
			//判断状态是否被修改过，如果被修改过，则不能再修改
			if (self.promiseState != 'pending')
				return;
			//修改对象的状态  promiseState
			self.promiseState = 'rejected';
			//设置对象的结果值  promiseResult
			self.promiseResult = data;
			//调用失败的回调函数
			setTimeout(() => {
				self.callbacks.forEach(item => {
					item.onreject(data);
				});
			});
		}
		try {
			//同步调用 执行器函数
			executor(resolve, reject);
		} catch (e) {
			//修改promise状态为 失败
			reject(e);
		}
	}

	//添加then方法
	then(onResolved, onRejected) {
		const self = this;
		//判断回调函数参数
		if (typeof onRejected != 'function') {
			onRejected = reason => {
				throw reason;
			}
		}
		if (typeof onResolved != 'function') {
			onResolved = value => value;
		}
		return new Promise((resolve, reject) => {
			//封装函数
			function callback(type) {
				try {
					//获取回调函数的执行结果
					let result = type(self.promiseResult);
					//判断执行结果是否为promise对象
					if (result instanceof Promise) {
						//如果是promise类型的对象
						result.then(v => {
							resolve(v);
						}, r => {
							reject(r);
						});
					} else {
						//设置结果的状态为成功
						resolve(result);
					}
				} catch (e) {
					reject(e);
				}
			}
			//调用回调函数
			if (this.promiseState == 'fulfilled') {
				setTimeout(() => {
					callback(onResolved);
				});
			}
			if (this.promiseState == 'rejected') {
				setTimeout(() => {
					callback(onRejected);
				});
			}
			if (this.promiseState == 'pending') {
				//保存函数
				this.callbacks.push({
					onresolve: function(value) {
						callback(onResolved);
					},
					onreject: function(reason) {
						callback(onRejected);
					}
				});
			}
		});
	};

	//添加catch方法
	catch (onRejected) {
		return this.then(undefined, onRejected);
	}

	//添加resolve方法
	static resolve(value) {
		return new Promise((resolve, reject) => {
			if (value instanceof Promise) {
				value.then(v => {
					resolve(v);
				}, r => {
					reject(r);
				});
			} else {
				resolve(value);
			}
		});
	}

	//添加reject方法
	static reject(reason) {
		return new Promise((resolve, reject) => {
			reject(reason);
		});
	}

	//添加all方法
	static all(promises) {
		return new Promise((resolve, reject) => {
			//声明变量保存成功的个数
			let count = 0;
			//声明数组保存成功的结果
			let arr = [];
			promises.forEach((value, index) => {
				value.then(v => {
					count++;
					arr[index] = v;
					if (count == promises.length) {
						resolve(arr);
					}
				}, r => {
					reject(r);
				});
			});
		});
	}

	//添加race方法
	static race(promises) {
		return new Promise((resolve, reject) => {
			promises.forEach(value => {
				value.then(v => {
					resolve(v);
				}, r => {
					reject(r);
				});
			});
		})
	}
}
