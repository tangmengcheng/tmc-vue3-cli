const pkgToolQues = {
    type: 'list',
    name: 'pkgTool',
    choices: ['npm', 'yarn'],
    default: 'npm',
    message: 'npm or yarn?'
}

const installQues = {
    type: 'confirm',
    name: 'install',
    default: false,
    message: '是否安装依赖?'
}

const pageTypeQues = {
    type: 'list',
    name: 'pageType',
    choices: ['webpack', 'gulp'],
    default: 'webpack',
    message: 'webpack or gulp?'
}

export {
    pkgToolQues,
    installQues,
    pageTypeQues
}