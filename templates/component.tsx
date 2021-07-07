
import { defineComponent } from 'vue'

export default defineComponent({
    name: "{{name}}",
    setup() {
        return () => {
            <div class="{{rootCls}}">
                {{name}} component working;
            </div>
        }
    },
})
