なにこれ
---
JSからCSS操作するやつ。  
[honeo/style-handle](https://github.com/honeo/style-handle)  
[style-handle](https://www.npmjs.com/package/style-handle)

使い方
---
```bash
$ npm i style-handle
```
```js
// ルール追加
var SH = require('style-handle');
SH.addRule('.hoge { prop: value; }');

// まとめて追加
SH.addText(`
/* comment */
.hoge {
    prop: value;
}
.huga {
    prop: value;
}
`);

// .cssファイルを読み込み
SH.addURL('http//example.com/hoge.css');
```

Method
---
.addRule(...string)  
.removeRule(...string or index)  
.addText(string)  
.removeText(string)  
.addURL(string)  
.removeURL(string)  
