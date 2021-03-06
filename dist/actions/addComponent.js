"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const art_template_1 = tslib_1.__importDefault(require("art-template"));
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
function default_1(name, options) {
    // console.log('name', name)
    // console.log('options', options.tsx)
    let basePath = 'components';
    let trueName = name;
    const data = name.split('/');
    if (data.length > 1) {
        trueName = data.pop(); // pop有可能是undefined ！断言一下就行
        basePath = data.join('/');
    }
    let suffix = '.vue';
    if (options.tsx) {
        suffix = '.tsx';
    }
    try {
        const content = art_template_1.default(path_1.join(__dirname, '../../templates', 'component' + suffix), { name: trueName, rootCls: lodash_1.kebabCase(trueName) });
        const dest = `src/${basePath}/${trueName}${suffix}`;
        fs_extra_1.outputFileSync(dest, content);
        console.log(chalk_1.default.green('创建组件成功', dest));
    }
    catch (error) {
        console.log(chalk_1.default.red('创建组件成功'));
        throw error;
    }
}
exports.default = default_1;
