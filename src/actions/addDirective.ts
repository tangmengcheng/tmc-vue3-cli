import template from 'art-template'
import { join } from 'path'
import { outputFileSync } from 'fs-extra'
import chalk from 'chalk'
export default function(name: string) {
    let basePath = 'directives'
    let trueName = name
    const data = name.split('/')
    if(data.length > 1) {
        trueName = data.pop()! // pop有可能是undefined ！断言一下就行
        basePath = data.join('/')
    }
    try {
        const content = template(
            join(__dirname, '../../templates', 'directive.ts'), 
            {name: trueName}
        )
        const dest = `src/${basePath}/${trueName}.ts`
        outputFileSync(dest, content)
        console.log(chalk.green('创建指令成功', dest))
    } catch (error) {
        console.log(chalk.red('创建指令成功'))
        throw error
    }
}