"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageTypeQues = exports.installQues = exports.pkgToolQues = void 0;
const pkgToolQues = {
    type: 'list',
    name: 'pkgTool',
    choices: ['npm', 'yarn'],
    default: 'npm',
    message: 'npm or yarn?'
};
exports.pkgToolQues = pkgToolQues;
const installQues = {
    type: 'confirm',
    name: 'install',
    default: false,
    message: '是否安装依赖?'
};
exports.installQues = installQues;
const pageTypeQues = {
    type: 'list',
    name: 'pageType',
    choices: ['webpack', 'gulp'],
    default: 'webpack',
    message: 'webpack or gulp?'
};
exports.pageTypeQues = pageTypeQues;
