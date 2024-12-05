export default {
    install(Vue, x, y, z){
        console.log(x, y, z)
        // 定义一个全局过滤器
        Vue.filter('mySlice', function(str){
            return str.slice(0, 5)
        })

        // 定义一个全局自定义指令
        Vue.directive('fbind', {
            bind(element, binding){
                element.value = binding.value
            },
            inserted(element){
                element.focus()
            },
            update(element, binding){
                element.value = binding.value
            }
        })

        // 定义一个全局混入
        Vue.mixin({
            data(){
                return {
                    x: 100,
                    y: 200
                }
            }
        })

        // 往Vue的原型对象上添加方法
        Vue.prototype.demo = function(){
            console.log('hello')
        }
    }
}