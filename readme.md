# style-handle
* [honeo/style-handle](https://github.com/honeo/style-handle)  
* [style-handle](https://www.npmjs.com/package/style-handle)

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
```js
const obj = StyleHandle.addRule('.hoge{color: white;}');
```

### .addRules(...string)
引数文字列のルールを全て追加して結果のobjectを配列で返す。
```js
const arr = StyleHandle.addRules('.foo{padding: 10px;}', '.bar{margin: 10px;}');
```

### .removeRule(...string or index)
引数文字列またはindexのルールを削除する。
```js
const obj = StyleHandle.addRule('.hoge{color: white;}');

StyleHandle.removeRule('.hoge{color: white;}');
// or
StyleHandle.removeRule(obj.originText);
// or
StyleHandle.removeRule(obj.index);
```

### .addText(string)
引数文字列のルールをまとめて適用する。  
引数をそのまま返す。
```js
StyleHandle.addText(`
    /* comment */
    .hoge {
        color: white;
    }
`);
```

### .removeText(string)
引数文字列のルールをまとめて削除する。
```js
StyleHandle.removeText(`
    /* comment */
    .hoge {
        color: white;
    }
`);
```

### .addURL(url)
引数URLの.cssファイルを読み込む。  
引数をそのまま帰す。
```js
StyleHandle.addURL('http//example.com/hoge.css');
```

### .removeURL(url)
引数URLの.cssファイル読み込みを削除する。
```js
StyleHandle.removeURL('http//example.com/hoge.css');
```
