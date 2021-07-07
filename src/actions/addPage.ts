import template from 'art-template'
import { join } from 'path'
import { outputFileSync, readdirSync } from 'fs-extra'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { pageTypeQues } from '../inquirers'
export default async function(name: string) {
    try {
        const { pageType } = await inquirer.prompt([pageTypeQues])
        const tplPath = join(__dirname, '../../templates/page', pageType)
        const files = readdirSync(tplPath)
        console.log(files)
        files.forEach(file => {
            const content = template(tplPath + '/' + file, {name})
            const dest = `src/pages/${name}/${file}`
            outputFileSync(dest, content)
        })
        console.log(chalk.green('创建页面组件成功', pageType))
    } catch (error) {
        console.log(chalk.red('创建页面组件成功'))
        throw error
    }
}