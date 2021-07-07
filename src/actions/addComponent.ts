import { kebabCase, partition } from 'lodash'
import template from 'art-template'
import { join } from 'path'
import { outputFileSync } from 'fs-extra'
import chalk from 'chalk'
export default function(name: string, options: {tsx: false}) {
    // console.log('name', name)
    // console.log('options', options.tsx)
    let basePath = 'components'
    let trueName = name
    const data = name.split('/')
    if(data.length > 1) {
        trueName = data.pop()! // pop有可能是undefined ！断言一下就行
        basePath = data.join('/')
    }
    let suffix = '.vue'
    if(options.tsx) {
        suffix = '.tsx'
    }
    try {
        const content = template(
            join(__dirname, '../../templates', 'component' + suffix), 
            {name: trueName, rootCls: kebabCase(trueName)}
        )
        const dest = `src/${basePath}/${trueName}${suffix}`
        outputFileSync(dest, content)
        console.log(chalk.green('创建组件成功', dest))
    } catch (error) {
        console.log(chalk.red('创建组件成功'))
        throw error
    }
}