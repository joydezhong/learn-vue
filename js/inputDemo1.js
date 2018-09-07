function isValueNumber(value){
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}

Vue.component('input-number',{
    template: '<div class="input-number">' +
    '<input type="text" :value="currentValue" @change="handleChange" @keydown="keyboardInput">' +
    '<button @click="handleDown" :disabled="currentValue<=min">-</button>' +
    '<button @click="handleStep">step</button>' +
    '<button @click="handleUp" :disabled="currentValue>=max">+</button>' +
    '</div>',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: function(){
        return {
            currentValue: this.value,
            currentStep: 1
        }
    },
    watch: {
        currentValue: function(val){+
            this.$emit('input', val);
            this.$emit('on-change', val);
        },
        value: function(val){
            this.updateValue(val)
        }
    },
    methods: {
        updateValue: function(val){
            if(val > this.max) val = this.max;
            if(val < this.min) val = this.min;
            this.currentValue = val;
        },
        handleDown: function(){
            if(this.currentValue <= this.min) return;
            this.currentValue -= this.currentStep;
        },
        handleUp: function(){
            if(this.currentValue>=this.max) return;
            this.currentValue += this.currentStep;
        },
        handleChange: function(event){
            var val = event.target.value.trim();
            var min = this.min;
            var max = this.max;
            if(isValueNumber(val)){
                val = Number(val);
                this.currentValue = val;
                if(val>max){
                    this.currentValue = max;
                }else if(val<max){
                    this.currentValue = min;
                }
            }else{
                event.target.value = this.currentValue;
            }
        },
        keyboardInput: function(event){
            if(event.keyCode == 38){
                this.handleUp();
            }else if(event.keyCode == 40){
                this.handleDown();
            }
        },
        handleStep: function(){
            this.currentStep = this.currentValue;
        }
    },
    mounted: function(){
        this.updateValue(this.value);
    }
});