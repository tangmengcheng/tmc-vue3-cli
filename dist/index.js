"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = require("commander");
const create_1 = tslib_1.__importDefault(require("./actions/create"));
const childCommand_1 = tslib_1.__importDefault(require("./childCommand"));
// <>表示必填，参数的<>不需要必填；长参数放在所有option的最后面
// npx ts-node src/index.ts -h
// npx ts-node src/index.ts -V
const program = new commander_1.Command('tmc');
program
    .usage('create <projectName> [options]')
    .command('create <projectName>')
    .description('创建项目')
    // .option('-ao --arg-one [oneValue]', '参数一', 'b')
    // .option('-s --small', '是否是最小的', true)
    // .option('-def --def-arg [type]', '默认参数', '默认的type')
    // .option('-l --long [value...]', '长参数')
    .option('-t --tool [value]', '选择构建工具：webpack | gulp', 'webpack')
    .option('-i --install', '是否自动安装依赖', false)
    .option('-pt --pkg-tool [value]', 'npm or yarn?')
    .action(create_1.default);
// 上面是主命令，下面是子命令
program.addCommand(childCommand_1.default(commander_1.Command));
// 帮助信息
program.addHelpText('after', `
    Example create a project:
        $ tmc create helloWorld
`);
// 版本号
program.version(require('../package.json').version);
// program.version('1.0.0')
program.parse(process.argv);
