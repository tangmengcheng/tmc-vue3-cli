"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasYarn = exports.exec = exports.recursiveDir = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const execa_1 = tslib_1.__importDefault(require("execa"));
const child_process_1 = require("child_process");
function recursiveDir(sourceDir) {
    const res = [];
    function traverse(dir) {
        fs_1.readdirSync(dir).forEach((file) => {
            const pathname = `${dir}/${file}`; // temp/.gitignore
            const isDir = fs_1.statSync(pathname).isDirectory();
            res.push({ file: pathname, isDir });
            if (isDir) {
                traverse(pathname);
            }
        });
    }
    traverse(sourceDir);
    return res;
}
exports.recursiveDir = recursiveDir;
function exec(command, options) {
    return new Promise((resolve, reject) => {
        var _a, _b, _c;
        const subProcess = execa_1.default.command(command, options); // 子进程
        (_a = subProcess.stdout) === null || _a === void 0 ? void 0 : _a.pipe(process.stdout); // 将子进程的信息推到主线程中显示
        (_b = subProcess.stdout) === null || _b === void 0 ? void 0 : _b.on('close', resolve); // 监听成功
        (_c = subProcess.stdout) === null || _c === void 0 ? void 0 : _c.on('error', reject);
    });
}
exports.exec = exec;
function hasYarn() {
    try {
        // 注意：execa.command命令只有同步方法才能try-catch
        // execa.commandSync('yarn -v', {stdio: 'ignore'}) // stdio: 'ignore'不需要输出信息
        child_process_1.execSync('yarn -v', { stdio: 'ignore' });
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.hasYarn = hasYarn;
