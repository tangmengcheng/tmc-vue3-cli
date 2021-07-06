import download from 'download-git-repo'
import { promisify } from 'util'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import { partition } from 'lodash'
import template from 'art-template'

// const downloadTemplate = promisify<string, string, { clone: boolean }>(download)
const projectName = 'temp'
// downloadTemplate('direct:https://github.com/tangmengcheng/vue3-multiple-cli.git#main', 'temp', { clone: true }).then(() => {
//     console.log('下载成功')
//     recursiveDir(projectName)
// })

interface FileItem {
    file: string;
    isDir: boolean;
}
// console.log(recursiveDir(projectName))
const allFiles = recursiveDir(projectName)
if (allFiles.length) {
    const files = partition(allFiles, 'isDir')[1]
    // files.forEach(item => {
    //     console.log('files', item)
    // })
    const pkgJson = files[10]
    console.log(pkgJson.file)
    const content = readFileSync(pkgJson.file, 'utf-8')
    // console.log(content)
    const newContent = template(process.cwd() + '/' + pkgJson.file, { projectName })
    // console.log(newContent)
    // const dest = pkgJson.file.split('/').slice(1).join()
    writeFileSync(pkgJson.file, newContent)

    // console.log(partition(allFiles, 'isDir')) 区分目录和文件
}
function recursiveDir(sourceDir: string) {
    const res: FileItem[] = [];
    function traverse(dir: string) {
        readdirSync(dir).forEach((file: string) => {
            const pathname = `${dir}/${file}` // temp/.gitignore
            const isDir = statSync(pathname).isDirectory()
            res.push({ file: pathname, isDir })
            if (isDir) {
                traverse(pathname)
            }
        })
    }
    traverse(sourceDir)
    return res
}
// download('direct:https://github.com/tangmengcheng/vue3-multiple-cli.git#main', 'temp', { clone: true }, (err: any) => {
//     if (err) {
//         throw err
//     }
//     console.log('下载成功')
// })