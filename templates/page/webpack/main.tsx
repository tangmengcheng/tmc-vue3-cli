import { defineComponent } from 'vue'
import './index.scss'
export default defineComponent({
    name: '{{name}}',
    setup() {
        return () => {
            return (
                <div class='{{name}}'>
                    <h1 class='title'>{{name}} hello</h1>
                </div>
            )
        }
    }
})