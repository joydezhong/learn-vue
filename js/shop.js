var app = new Vue({
    el: '#app',
    data: {
        list: [
            {
                id: 1,
                name: 'iphone7',
                price: 6188,
                count: 1
            },
            {
                id: 2,
                name: 'iPad Pro',
                price: 5888,
                count: 1
            },
            {
                id: 3,
                name: 'MacBook Pro',
                price: 21488,
                count: 1
            }
        ],
        checkAll: false,
        checkOne: [false,false,false]
    },
    computed: {
        totalPrice: function(){
            console.log(123);
            var total = 0;
            for(var i =  0; i < this.checkOne.length; i++){
                if(this.checkOne[i]){
                    var item = this.list[i];
                    total += item.price * item.count;
                }
            }
            return  total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
        }
    },
    methods: {
        handleReduce: function(index){
            if(this.list[index].count === 1) return;
            this.list[index].count--;
        },
        handleAdd: function(index){
            this.list[index].count++;
        },
        handleRemove: function(index){
            this.list.splice(index, 1);
        },
        //全选
        handleCheckAll: function(){
            for(var i = 0; i < this.checkOne.length; i++){
                // this.checkOne[i] = !this.checkAll;
                Vue.set( this.checkOne, i, !this.checkAll);
            }
        },
        //单选
        handleCheckOne: function(index){
            this.checkOne[index] = true;
        }
    }
});