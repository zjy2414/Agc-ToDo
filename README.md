# AGC-Todo

AGC-Todo是一款基于华为云`App Gallery Connect`提供的认证服务和云数据库能力构建的在线待办事项应用，采用Vue.js作为开发框架。功能包括：注册，密码登录，手机号快捷登录，用户注销，待办事项增删改查。

在线demo：https://todo-list.doyi.online

## 快速开始

如需运行请先将`/src/components/config/agc-service.js`文件中的`context`变量中的Client密钥、API Key等密钥信息配置为您在AGC管理后台所创建Web项目的密钥信息（建议直接复制后台提供的agConnectConfig内容覆盖context的内容更为方便）。同时，确保该应用已开启认证服务和云数据库服务，在云数据库管理面板导入`/src/components/config/agc-service.js`文件创建TodoItem对象类型，并创建todos存储区。

1.安装依赖
```bash
yarn install
```
2.启动项目
```bash
yarn serve
```

## 关于作者

东南dnf（计科大二学生党）