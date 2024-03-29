# React with Webpack + Typescript + Babel + Eslint

[Source](https://duthanhduoc.com/blog/tao-du-an-react-webpack-typescript-babel-eslint#cau-truc-thu-muc-full)

## Cấu trúc thư mục full

Dưới đây là cấu trúc thư mục hoàn chỉnh của dự án ReactJs Typescript Webpack Babel ESLint

```
📦React-Webpack-Typescript
┣ 📂dist
┣ 📂public
┃ ┣ 📜icon.png
┃ ┗ 📜index.html
┣ 📂src
┃ ┣ 📜App.scss
┃ ┣ 📜App.tsx
┃ ┣ 📜index.tsx
┃ ┗ 📜react-app-env.d.ts
┣ 📜.babelrc
┣ 📜.browserslistrc
┣ 📜.editorconfig
┣ 📜.env
┣ 📜.eslintignore
┣ 📜.eslintrc.js
┣ 📜.gitignore
┣ 📜.prettierignore
┣ 📜.prettierrc
┣ 📜package.json
┣ 📜tsconfig.json
┣ 📜webpack.config.js
┗ 📜yarn.lock
```

\- Thư mục dist: Thư mục chứa các file build  
\- Thư mục public: Chứa file index.html và các file liên quan như favicon.ico, robots.txt,...  
\- Thư mục src: Chứa mã nguồn chính của chúng ta  
\- Thư mục src/assets: Chứa media, css, fonts  
\- Còn lại những file config sẽ được mình giới thiệu ở những phần dưới

## Khởi tạo dự án React

### Khởi tạo một dự án nodejs

Khởi tạo bằng `yarn` hoặc `npm` tùy mọi người, nhưng mình khuyến khích mọi người dùng `yarn` vì `yarn` nhanh hơn, ít lỗi hơn.

```
yarn init --yes
```

Hoặc

```
npm init --yes
```

### Cài các package cần thiết

Cài đặt React vào `dependencies`

```
yarn add react react-dom
```

Cài type cho React vào `devDependencies`

```
yarn add -D @types/react @types/react-dom typescript
```

Cài đặt Webpack

```
yarn add -D webpack webpack-cli webpack-dev-server
```

Cài đặt Babel

```
yarn add -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader
```

Cài đặt các loader và plugins bổ trợ

```
yarn add -D clean-webpack-plugin compression-webpack-plugin copy-webpack-plugin css-loader css-minimizer-webpack-plugin dotenv-webpack file-loader html-webpack-plugin mini-css-extract-plugin sass sass-loader serve webpack-bundle-analyzer
```

\- `clean-webpack-plugin`: Dọn dẹp thư mục build  
\- `compression-webpack-plugin`: Nén gzip, brotli file build  
\- `copy-webpack-plugin`: Copy các file trong thư mục public vào thư mục dist  
\- `css-loader`: import css trong dự án  
\- `css-minimizer-webpack-plugin`: minify css  
\- `dotenv-webpack`: Giúp dùng được các biến môi trường trong file .env  
\- `file-loader`: import ảnh, font trong dự án  
\- `html-webpack-plugin`: Tự động thêm script và style tag vào file html  
\- `mini-css-extract-plugin`: Tách css ra thành file riêng khi build thay vì đưa vào file js  
\- `sass`: Giúp dùng sass cho dự án  
\- `sass-loader`: Cũng giúp dùng Sass cho dự án, phải cài cả 2 sass sass-loader  
\- `serve`: Giúp preview file build  
\- `webpack-bundle-analyzer`: Phân tích kích thước file build

Cài đặt ESLint và Prettier

```
yarn add -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-webpack-plugin eslint-import-resolver-typescript
```

## Config dự án

### Tạo file `public/index.html`

```
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="icon.svg" />
        <title>React with Webpack + Typescript + Babel + Eslint</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

### Thêm file ảnh `public/icon.png` vào

### Tạo file `.babelrc` ở thư mục root

Mục đích là chứa các preset babel

```
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript", ["@babel/preset-react", { "runtime": "automatic" }]]
}
```

### Tạo file `.browserslistrc` ở thư mục root

Mục đích là cấu hình target trình duyệt mà dự án chúng ta hỗ trợ

```
# Hỗ trợ các phiên bản trình duyệt mà có lượng người dùng lớn hơn 0.2% và chưa bị khai tử
> 0.2% and not dead
```

### Tạo file `.editorconfig` ở thư mục root

Mục đích là cấu hình các config đồng bộ các editor với nhau nếu dự án có nhiều người tham gia.  
Để VS Code hiểu được file này thì anh em cài Extension là `EditorConfig for VS Code` nhé

```
[*]
indent_size = 4
indent_style = space
```

### Tạo file `.env` ở thư mục root

Mục đích là chứa các biến môi trường dùng trong dự án React của chúng ta

```
HOST=https://react.dev/
```

### Tạo file `.eslintrc.js` ở thư mục root

Mục đích là chứa cấu hình ESLint

```
const path = require('path');
module.exports = {
    extends: [
        // Chúng ta sẽ dùng các rule mặc định từ các plugin mà chúng ta đã cài.
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:@typescript-eslint/recommended',
        // Disable các rule mà eslint xung đột với prettier.
        // Để cái này ở dưới để nó override các rule phía trên!.
        'eslint-config-prettier',
        'prettier'
    ],
    plugins: ['prettier'],
    settings: {
        react: {
            // Nói eslint-plugin-react tự động biết version của React.
            version: 'detect'
        },
        // Nói ESLint cách xử lý các import
        'import/resolver': {
            node: {
                paths: [path.resolve(__dirname)],
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            },
            typescript: {
                project: path.resolve(__dirname, './tsconfig.json')
            }
        }
    },
    env: {
        node: true
    },
    rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        // Tắt rule yêu cầu import React trong file jsx
        'react/react-in-jsx-scope': 'off',
        // Cảnh báo khi thẻ <a target='_blank'> mà không có rel="noreferrer"
        'react/jsx-no-target-blank': 'warn',
        // Tăng cường một số rule prettier (copy từ file .prettierrc qua)
        'prettier/prettier': [
            'warn',
            {
                arrowParens: 'always',
                semi: true,
                trailingComma: 'none',
                tabWidth: 4,
                endOfLine: 'auto',
                useTabs: false,
                singleQuote: true,
                printWidth: 120,
                jsxSingleQuote: true
            }
        ]
    }
};
```

### Tạo file `.eslintignore` ở thư mục root

Mục đích là ESLint bỏ qua những file không cần thiết

```
node_modules/
dist/
```

### Tạo file `.gitignore` ở thư mục root

Mục đích là Git bỏ qua những file không cần thiết

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

### Tạo file `.prettierrc` ở thư mục root

Mục đích là cấu hình prettier. Anh em nên cài Extension `Prettier - Code formatter` cho VS Code để nó hiểu nhé.

```
{
    "arrowParens": "always",
    "semi": true,
    "trailingComma": "none",
    "tabWidth": 4,
    "endOfLine": "auto",
    "useTabs": false,
    "singleQuote": true,
    "printWidth": 120,
    "jsxSingleQuote": true
}
```

### Tạo file `.prettierignore` ở thư mục root

Mục đích là Prettier bỏ qua các file không cần thiết

```
node_modules/
dist/
```

### Tạo file `tsconfig.json` ở thư mục root

Mục đích là cấu hình Typescript cho dự án chúng ta

```
{
    "compilerOptions": {
        "target": "ES2015",
        "useDefineForClassFields": true,
        "lib": ["DOM", "DOM.Iterable", "ESNext"],
        "allowJs": false,
        "skipLibCheck": true,
        "esModuleInterop": false,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "module": "ESNext",
        "moduleResolution": "Node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "baseUrl": ".",
        "paths": {
            "@pages/*": ["src/pages/*"]
        }
    },
    "include": ["src"]
}
```

### Mở file `package.json` lên, thêm đoạn script dưới vào

```
"scripts": {
    "dev": "webpack-dev-server --mode development",
    "build": "webpack --mode production",
    "build:analyze": "webpack --mode production --env analyze",
    "preview": "serve dist/ -s",
    "lint": "eslint --ext js,jsx,ts,tsx src/",
    "lint:fix": "eslint --fix --ext js,jsx,ts,tsx src/",
    "prettier": "prettier --check \"src/**/(*.tsx|*.ts|*.jsx|*.js|*.scss|*.css)\"",
    "prettier:fix": "prettier --write \"src/**/(*.tsx|*.ts|*.jsx|*.js|*.scss|*.css)\""
}
```

### Tạo file `webpack.config.js` tại thư mục root

Mục đích là cấu hình webpack cho dự án ReactJs Typescript.  
Chi tiết mình có giải thích hết trong file cấu hình này, các bạn đọc là sẽ hiểu nhé.  
File cấu hình này áp dụng cho 2 môi trường là development và production luôn.

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

// Cái dòng này giúp Editor gợi ý được các giá trị cho dòng code config ngay phía dưới nó
// (giống như đang dùng Typescript vậy đó 😉)
/** @type {(env: any, arg: {mode: string}) => import('webpack').Configuration} **/
module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const isAnalyze = Boolean(env?.analyze);
    /** @type {import('webpack').Configuration} **/
    const config = {
        // Quy định cách webpack giải quyết các file
        resolve: {
            // Giải quyết các file theo thứ tự ưu tiên từ trái sang phải nếu import
            // các file cùng một tên nhưng các đuôi mở rộng
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            alias: {
                // Cấu hình alias cho webpack
                // để khi import cho ngắn gọn
                // Ví dụ: import Login from '@pages/Login'
                // Thay vì: import Login from '../pages/Login' chẳng hạn
                '@pages': path.resolve(__dirname, './src/pages')
            }
        },
        // File đầu vào cho webpack, file này thường là file import mọi file khác
        entry: ['./src/index.tsx'],
        // Khai báo các module dùng trong webpack
        module: {
            rules: [
                {
                    test: /\.tsx?$/, // duyệt các file .ts || .tsx
                    exclude: /node_modules/,
                    use: ['babel-loader'] // Giúp dịch code TS, React sang JS,
                },
                {
                    test: /\.(s[ac]ss|css)$/, // duyệt các file sass || scss || css
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader', // dùng import 'filename.css' trong file tsx, ts
                            options: { sourceMap: !isProduction } // Hiển thị sourcemap ở môi trường dev cho dễ debug
                        },
                        {
                            loader: 'sass-loader', // biên dịch sass sang css
                            options: { sourceMap: !isProduction }
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/, // Dùng để import file ảnh, nếu có video/ảnh định dạng khác thì thêm vào đây
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: isProduction ? 'static/media/[name].[contenthash:6].[ext]' : '[path][name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/, // Dùng để import font
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: isProduction ? 'static/fonts/[name].[ext]' : '[path][name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },

        output: {
            filename: 'static/js/main.[contenthash:6].js', // Thêm mã hash tên file dựa vào content để tránh bị cache bởi CDN hay browser.
            path: path.resolve(__dirname, 'dist'), // Build ra thư mục dist
            publicPath: '/'
        },
        devServer: {
            hot: true, // enable Hot Module Replacement, kiểu như reload nhanh
            port: 3000, // Chạy port 3000 khi dev
            historyApiFallback: true, // Phải set true nếu không khi bạn dùng lazyload module React thì sẽ gặp lỗi không load được file.
            // Cấu hình phục vụ file html trong public
            static: {
                directory: path.resolve(__dirname, 'public', 'index.html'),
                serveIndex: true,
                watch: true // khi thay đổi content trong index.html thì cũng sẽ reload
            }
        },
        devtool: isProduction ? false : 'source-map',
        plugins: [
            // Đưa css ra thành một file .css riêng biệt thay vì bỏ vào file .js
            new MiniCssExtractPlugin({
                filename: isProduction ? 'static/css/[name].[contenthash:6].css' : '[name].css'
            }),
            // Dùng biến môi trường env trong dự án
            new Dotenv(),
            // Copy mọi files trong folder public trừ file index.html
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'public',
                        to: '.',
                        filter: (name) => {
                            return !name.endsWith('index.html');
                        }
                    }
                ]
            }),

            // Plugin hỗ trợ thêm thẻ style và script vào index.html
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
                filename: 'index.html'
            }),
            // Thêm eslint cho webpack
            new ESLintPlugin({
                extensions: ['.tsx', '.ts', '.js', '.jsx']
            })
        ]
    };

    //🚀 Nếu build thì sẽ thêm một số config
    if (isProduction) {
        config.plugins = [
            ...config.plugins,
            new webpack.ProgressPlugin(), // Hiển thị % khi build
            // Nén brotli css và js nhưng không hiểu sao chỉ có js được nén 🥲
            new CompressionPlugin({
                test: /\.(css|js)$/,
                algorithm: 'brotliCompress'
            }),
            new CleanWebpackPlugin() // Dọn dẹp thư mục build trước đó để chuẩn bị cho bản build hiện tại
        ];
        if (isAnalyze) {
            config.plugins = [...config.plugins, new BundleAnalyzerPlugin()];
        }
        config.optimization = {
            minimizer: [
                `...`, // Cú pháp kế thừa bộ minimizers mặc định trong webpack 5 (i.e. `terser-webpack-plugin`)
                new CssMinimizerPlugin() // minify css
            ]
        };
    }
    return config;
};
```

### Thêm code React vào

`src/App.tsx`

```
import { FC, useState } from 'react';

const App: FC = () => {
    const [state, setState] = useState('React');

    return (
        <div>
            <h1>{state}</h1>
            <h2>React with Webpack + Typescript + Babel + ESLint</h2>
        </div>
    );
};

export default App;
```

`src/index.tsx`

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

Thêm file `src/react-app-env.d.ts` để import ảnh không bị typescript bắt lỗi.  
Nếu sau này có thêm những định dạng video, ảnh khác thì khai báo thêm vào trong file này

```
// images
declare module '*.png' {
    const src: string;
    export default src;
}
declare module '*.jpg' {
    const src: string;
    export default src;
}
declare module '*.jpeg' {
    const src: string;
    export default src;
}
declare module '*.svg' {
    const src: string;
    export default src;
}
```

Tạo file `src/App.scss`

```
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    scroll-behavior: smooth;
    min-height: 0;
    min-width: 0;
}

html,
body {
    height: 100%;
    min-height: 100vh;
    line-height: 1.5;
}
```

## Chạy thử

### Môi trường Dev

Chạy `yarn dev` để xem thành quả

### Build dự án

Để build dự án thì chạy `yarn build`

### Preview dự án React sau khi build

Chạy `yarn preview` để preview nhé, yêu cầu là trong thư mục `dist` phải có bản build mới preview được

### Build dự án kèm phân tích file build

Để phân tích file build thì ae chỉ cần chạy câu lệnh `yarn build:analyze`

### Kiểm tra ESLint và Prettier

\- Kiểm tra dự án có bị lỗi gì liên quan ESLint không: `yarn lint`  
\- Tự động fix các lỗi liên quan ESLint (không phải cái gì cũng fix được, nhưng fix cũng nhiều): `yarn lint:fix`  
\- Kiểm tra dự án có bị lỗi gì liên quan Prettier không: `yarn prettier`  
\- Tự động fix các lỗi liên quan Prettier: `yarn prettier:fix`
