# style-handle
[honeo/style-handle](https://github.com/honeo/style-handle)  
[style-handle](https://www.npmjs.com/package/style-handle)

## なにこれ
JSからCSS操作するやつ。

## 使い方
```bash
$ npm i -S style-handle
```
```js
import StyleHandle from 'style-handle';

// ルール追加
StyleHandle.addRule('.hoge { prop: value; }');

// まとめて追加
StyleHandle.addText(`
/* comment */
.hoge {
    prop: value;
}
.huga {
    prop: value;
}
`);

// .cssファイルを読み込み
StyleHandle.addURL('http//example.com/hoge.css');
```

## API
### .addRule(string)
引数文字列のルールを追加して結果をobjectで返す。
### .addRules(...string)
引数文字列のルールを全て追加して結果のobjectを配列で返す。
### .removeRule(...string or index)
引数文字列またはindexのルールを削除する。
### .addText(string)
引数文字列のルールをまとめて適用する。  
引数をそのまま返す。
### .removeText(string)
引数文字列のルールをまとめて削除する。
### .addURL(url)
引数URLの.cssファイルを読み込む。  
引数をそのまま帰す。
### .removeURL(url)
引数URLの.cssファイル読み込みを削除する。
