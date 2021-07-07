import chalk from "chalk"
import ora from "ora"
import download from 'download-git-repo'
import { promisify } from 'util'
import { exec, hasYarn, recursiveDir } from "../utils"
import { partition } from "lodash"
import template from 'art-template'
import { unlinkSync, writeFileSync } from "fs"
import inquirer from 'inquirer'
import { installQues, pkgToolQues } from "../inquirers"

interface CreateOptions {
    tool: 'webpack' | 'gulp';
    install: boolean;
    pkgTool: 'npm' | 'yarn';
}

const downloadTemplate = promisify<string, string, { clone: boolean }>(download)
// art-template 解决index.html<% %> 语法冲突
const rule = template.defaults.rules[0]
rule.test = new RegExp(rule.test.source.replace('<%', '<\\\?').replace('%>', '\\\?>'))

export default async function (projectName: string, options: CreateOptions) {
    const spinner = ora(chalk.blue('初始化模板...')).start()
    try {
        await downloadTemplate('direct:https://github.com/lycHub/vue-next-mutiple-template.git#' + options.tool, projectName, { clone: true })
        const allFiles = recursiveDir(projectName)
        if(allFiles.length) {
            partition(allFiles, 'isDir')[1].forEach(item => {
                if(!item.file.includes('assets')) {
                    const content = template(process.cwd() + '/' + item.file, { projectName })
                    // writeFileSync(item.file, content)
                    // 将.art后缀的文件替换
                    let dest = item.file
                    if(dest.includes('.art')) {
                        unlinkSync(dest) // 删除
                        dest = dest.replace(/\.art/, '')
                    }
                    writeFileSync(dest, content)
                }
            })
            spinner.info('模板初始化成功!')
            const cwd = './' + projectName
            if(options.install) { // 是否自动安装依赖
                installPkg(options.pkgTool, cwd)
            } else {
                // 没有传-i时的逻辑 
                // 判断需不要出现第二个问题？when方法需不需要出现
                const answers = await inquirer.prompt([
                    installQues,
                    {
                        ...pkgToolQues,
                        when(currentAnswers) {
                            return currentAnswers.install && !options.pkgTool
                        }
                    }
                ])
                if(answers.install) {
                    installPkg(answers.pkgTool || options.pkgTool, cwd)
                } else {
                    console.log(chalk.green('项目创建成功'))
                }
            }
        }
    } catch (error) {
        spinner.fail('项目创建失败!')
        throw error
    }
}

async function installPkg(pkgTool: 'npm' | 'yarn', cwd: string) {
    let tool = pkgTool
    if(!tool) { // 如果用户没有传
        const answers = await inquirer.prompt([pkgToolQues])
        tool = answers.pkgTool
    }
    if(tool === 'yarn' && !hasYarn()) {
        console.log(chalk.red('请先安装 yarn 包管理器!'))
    } else {
        const spinner = ora(chalk.blue('正在安装依赖...')).start()
        await exec(tool + ' install', { cwd })
        spinner.succeed(chalk.green('依赖安装完成, 项目创建成功'))
    }
}