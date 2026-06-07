# 甲市雷达 Nail Alpha

一个静态 Web 前端原型，覆盖用户端 AI 美甲分析、Nail BTI、AI 试戴、需求发布、门店预约，以及商家端趋势分析、需求接单和运营建议。

## 页面范围

- 首页
- AI分析：上传手图、Nail BTI 结果、AI 试戴
- 需求发布：新建需求、我的需求
- 门店预约
- 商家中心
- 我的
- 16 个业务弹窗，包括裁切、分析中、分享、发布成功、预约、报价、上架和推送确认

## 本地运行

这个项目不依赖构建工具，直接启动静态服务即可：

```bash
python3 -m http.server 4173
```

然后访问：

```text
http://localhost:4173/
```

如果本机有 Node.js，也可以做语法检查：

```bash
node --check app.js
```

## 部署提示

项目入口文件在仓库根目录：

```text
index.html
styles.css
app.js
public/
```

部署到 Vercel 时，Framework Preset 选择 `Other`。如果 Vercel 要求填写输出目录，填 `.`。

## 目录说明

```text
.
├── index.html
├── styles.css
├── app.js
├── public/
│   ├── assets/
│   └── vendor/
└── README.md
```

`docs/extracted/` 和 `docs/screenshots/` 是本地设计资料抽取与验收截图，不建议提交到公开仓库，已在 `.gitignore` 中忽略。
