import chalk from "chalk"
import ora from "ora"

interface CreateOptions {
    tool: 'webpack' | 'gulp';
    install: boolean;
    pkgTool: 'npm' | 'yarn';
}
export default function (projectName: string, options: CreateOptions) {
    console.log(projectName)
    console.log(options)
    const spinner = ora(chalk.blue('初始化模板...')).start()
    setTimeout(() => {
        spinner.text = '正在下载...'
    }, 2000)
    setTimeout(() => {
        spinner.succeed(chalk.green('模板初始化成功!'))
    }, 5000)
}