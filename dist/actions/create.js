"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const ora_1 = tslib_1.__importDefault(require("ora"));
const download_git_repo_1 = tslib_1.__importDefault(require("download-git-repo"));
const util_1 = require("util");
const utils_1 = require("../utils");
const lodash_1 = require("lodash");
const art_template_1 = tslib_1.__importDefault(require("art-template"));
const fs_1 = require("fs");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const inquirers_1 = require("../inquirers");
const downloadTemplate = util_1.promisify(download_git_repo_1.default);
// art-template 解决index.html<% %> 语法冲突
const rule = art_template_1.default.defaults.rules[0];
rule.test = new RegExp(rule.test.source.replace('<%', '<\\\?').replace('%>', '\\\?>'));
function default_1(projectName, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const spinner = ora_1.default(chalk_1.default.blue('初始化模板...')).start();
        try {
            yield downloadTemplate('direct:https://github.com/lycHub/vue-next-mutiple-template.git#' + options.tool, projectName, { clone: true });
            const allFiles = utils_1.recursiveDir(projectName);
            if (allFiles.length) {
                lodash_1.partition(allFiles, 'isDir')[1].forEach(item => {
                    if (!item.file.includes('assets')) {
                        const content = art_template_1.default(process.cwd() + '/' + item.file, { projectName });
                        // writeFileSync(item.file, content)
                        // 将.art后缀的文件替换
                        let dest = item.file;
                        if (dest.includes('.art')) {
                            fs_1.unlinkSync(dest); // 删除
                            dest = dest.replace(/\.art/, '');
                        }
                        fs_1.writeFileSync(dest, content);
                    }
                });
                spinner.info('模板初始化成功!');
                const cwd = './' + projectName;
                if (options.install) { // 是否自动安装依赖
                    installPkg(options.pkgTool, cwd);
                }
                else {
                    // 没有传-i时的逻辑 
                    // 判断需不要出现第二个问题？when方法需不需要出现
                    const answers = yield inquirer_1.default.prompt([
                        inquirers_1.installQues,
                        Object.assign(Object.assign({}, inquirers_1.pkgToolQues), { when(currentAnswers) {
                                return currentAnswers.install && !options.pkgTool;
                            } })
                    ]);
                    if (answers.install) {
                        installPkg(answers.pkgTool || options.pkgTool, cwd);
                    }
                    else {
                        console.log(chalk_1.default.green('项目创建成功'));
                    }
                }
            }
        }
        catch (error) {
            spinner.fail('项目创建失败!');
            throw error;
        }
    });
}
exports.default = default_1;
function installPkg(pkgTool, cwd) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let tool = pkgTool;
        if (!tool) { // 如果用户没有传
            const answers = yield inquirer_1.default.prompt([inquirers_1.pkgToolQues]);
            tool = answers.pkgTool;
        }
        if (tool === 'yarn' && !utils_1.hasYarn()) {
            console.log(chalk_1.default.red('请先安装 yarn 包管理器!'));
        }
        else {
            const spinner = ora_1.default(chalk_1.default.blue('正在安装依赖...')).start();
            yield utils_1.exec(tool + ' install', { cwd });
            spinner.succeed(chalk_1.default.green('依赖安装完成, 项目创建成功'));
        }
    });
}
