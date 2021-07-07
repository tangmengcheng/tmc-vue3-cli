import download from 'download-git-repo'
import { promisify } from 'util'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import { kebabCase, partition } from 'lodash'
import template from 'art-template'
import inquirer from 'inquirer'
import { join } from 'path'
import { outputFileSync } from 'fs-extra'

// const downloadTemplate = promisify<string, string, { clone: boolean }>(download)
// const projectName = 'temp'
// downloadTemplate('direct:https://github.com/tangmengcheng/vue3-multiple-cli.git#main', 'temp', { clone: true }).then(() => {
//     console.log('下载成功')
//     recursiveDir(projectName)
// })

// interface FileItem {
//     file: string;
//     isDir: boolean;
// }
// console.log(recursiveDir(projectName))
// const allFiles = recursiveDir(projectName)
// if (allFiles.length) {
//     const files = partition(allFiles, 'isDir')[1]
//     // files.forEach(item => {
//     //     console.log('files', item)
//     // })
//     const pkgJson = files[10]
//     console.log(pkgJson.file)
//     const content = readFileSync(pkgJson.file, 'utf-8')
//     // console.log(content)
//     const newContent = template(process.cwd() + '/' + pkgJson.file, { projectName })
//     // console.log(newContent)
//     // const dest = pkgJson.file.split('/').slice(1).join()
//     writeFileSync(pkgJson.file, newContent)

//     // console.log(partition(allFiles, 'isDir')) 区分目录和文件
// }
// function recursiveDir(sourceDir: string) {
//     const res: FileItem[] = [];
//     function traverse(dir: string) {
//         readdirSync(dir).forEach((file: string) => {
//             const pathname = `${dir}/${file}` // temp/.gitignore
//             const isDir = statSync(pathname).isDirectory()
//             res.push({ file: pathname, isDir })
//             if (isDir) {
//                 traverse(pathname)
//             }
//         })
//     }
//     traverse(sourceDir)
//     return res
// }
// // download('direct:https://github.com/tangmengcheng/vue3-multiple-cli.git#main', 'temp', { clone: true }, (err: any) => {
// //     if (err) {
// //         throw err
// //     }
// //     console.log('下载成功')
// // })

// inquirer.prompt([
//     {
//         type: 'input',
//         name: 'name',
//         message: '请输入姓名'
//     },
//     {
//         type: 'list',
//         name: 'pkgTool',
//         choices: ['npm', 'yarn'],
//         default: 'npm',
//         message: 'npm or yarn?'
//     }
// ]).then(answers => {
//     console.log(answers)
// })


/**
 * add c comA // src/components/comA
 * add c a/b/c/comA src/a/b/c/comA
 */
const name = 'a/b/c/comAb' // rootCls: com-a
let basePath = 'components'
let trueName = name
const data = name.split('/')
if(data.length > 1) {
    trueName = data.pop()! // pop有可能是undefined ！断言一下就行
    basePath = data.join('/')
}
let suffix = '.vue'
const isTsx = false
if(isTsx) {
    suffix = '.tsx'
}
try {
    const content = template(
        join(__dirname, 'templates', 'component' + suffix), 
        {name: trueName, rootCls: kebabCase(trueName)}
    )
    const dest = `src/${basePath}/${trueName}${suffix}`
    // console.log('content', content)
    // console.log('dest', dest)
    outputFileSync(dest, content)
    // writeFileSync(dest, content) components目录不存在，要先创建
} catch (error) {
    throw error
}