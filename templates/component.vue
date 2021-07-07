<template>
    <div class="{{rootCls}}">
        {{name}} component working;
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>

<style lang="scss" scoped>
.{{rootCls}} {
    
}
</style>
