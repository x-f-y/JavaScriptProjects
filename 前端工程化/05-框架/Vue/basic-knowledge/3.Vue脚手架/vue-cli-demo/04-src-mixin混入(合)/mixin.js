export const mixin = {
    methods: {
        showName(){
            alert(this.name)
        }
    },
    mounted(){
        console.log('hello')
    }
}

export const mixin2 = {
    data(){
        return {
            x: 100,
            y: 200
        }
    }
}