import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import execa from 'execa'
import { execSync } from 'child_process'

interface FileItem {
    file: string;
    isDir: boolean;
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

function exec(command: string, options: execa.Options) {
    return new Promise((resolve, reject) => {
        const subProcess = execa.command(command, options); // 子进程
        subProcess.stdout?.pipe(process.stdout); // 将子进程的信息推到主线程中显示
        subProcess.stdout?.on('close', resolve) // 监听成功
        subProcess.stdout?.on('error', reject)
    })
}

function hasYarn(): boolean {
    try {
        // 注意：execa.command命令只有同步方法才能try-catch
        // execa.commandSync('yarn -v', {stdio: 'ignore'}) // stdio: 'ignore'不需要输出信息
        execSync('yarn -v', {stdio: 'ignore'})
        return true
    } catch (error) {
        return false
    }
}

export {
    recursiveDir,
    exec,
    hasYarn
}