const console = {log(){}}

// var
const
	doc = document,
	head = doc.head || doc.getElementsByTagName('head')[0];

/*
	骨組み
	addedRules
		追加したルールが [ ...{
			originText: 'パース前のCSSルール',
			parsedText: 'パース後のCSSルール',
			index: Number //追加位置
		} ]
		で入っている
*/
const Style = {
	addedRules: []
}

/*
	ルール適用するstyle要素を作ってCSSStyleSheetの参照を返す
*/
Style.__defineGetter__('CSSSS', ( ()=>{
	var s;
	return ()=>{
		if( !s ){
		    s =  doc.createElement('style');
		    s.setAttribute('class', 'style-handle-rule');
		    head.appendChild( s );
		}
		return s.sheet;
	}
})() );

/*
	テキスト流し込み用のstyle要素を作って返す
*/
Style.__defineGetter__('style_text', ( ()=>{
	var s;
	return ()=>{
		if( !s ){
		    s =  doc.createElement('style');
		    s.setAttribute('class', 'style-handle-text');
		    head.appendChild( s );
		}
		return s;
	}
})() );

/*
    引数のCSSルールを追加する
        addRule("div{color:red;}");
	追加したルールの詳細をオブジェクトで返す
		一つなら数値で、複数なら配列で。
	追加したルールの詳細をaddedRulesにオブジェクトで記録する
	その他
    	2014年時点でChromeは@-webkit-以外のkeyframesを入れるとコケる
*/
Style.addRule = (...ruleArr)=>{
	console.log('addRule', ruleArr);
	var result = [];
    ruleArr.forEach( (v)=>{
        var index = Style.CSSSS.insertRule(
			v,
			Style.CSSSS.cssRules.length
		);
		var obj = {
			originText: v,
			parsedText: Style.CSSSS.cssRules[index].cssText,
			index
		}
		Style.addedRules.push(obj);
		result.push(obj);
    });
	return 1 < result.length ?
		result: result[0];
}

/*
	引数のCSSルールを削除する
		引数が数値ならその番号のルールを削除
		引数が文字列ならaddedRulesから一致するものを探して削除
		cssRulesのを削除したらaddedRulesのも削除。
*/
Style.removeRule = (...ruleArr)=>{
	console.log('removeRule', ruleArr);
	ruleArr.forEach( (arg)=>{
		if(typeof arg==='number'){
			Style.CSSSS.deleteRule( arg );
			var index = Style.addedRules.findIndex( (v)=>{
				return v.index===arg;
			});
			if( typeof index==='number' ){
				delete Style.addedRules[index];
			}
		}else if(typeof arg==='string'){
			var index = Style.addedRules.findIndex( (v)=>{
				return arg===v.originText;
			});
			if( typeof index==='number' ){
				Style.CSSSS.deleteRule( Style.addedRules[index].index );
				delete Style.addedRules[index];
			}
		}
    });
}

/*
	大雑把に追加
*/
Style.addText = (text)=>{
	console.log('addText', text);
	Style.style_text.appendChild( doc.createTextNode(text) );
	return text;
}

/*
    大雑把に削除
		テキストノード単位
        引数と同じものが複数あったら全部無くなっちゃうけど大雑把だから許してくれるね
*/
Style.removeText = (text)=>{
	console.log('removeText', text);
    Array.from( Style.style_text.childNodes ).forEach( (v)=>{
		v.nodeType===3 && ( v.nodeValue = v.nodeValue.replace(text, '') );
	});
}

/*
	引数URLの.cssファイルを読み込む
*/
Style.addURL = (str)=>{
	console.log('addURL', str);
	var link = doc.createElement('link');
	link.setAttribute('href', str);
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('class', 'style-handle-url');
	head.appendChild(link);
	return str;
}

/*
	引数URLの.cssファイル読み込みを削除
*/
Style.removeURL = (str)=>{
	console.log('removeURL', str);
	var linkArr = Array.from( head.getElementsByClassName('style-handle-url') );
	var link = linkArr.find( (v)=>{
		return v.href===str;
	});
	link && link.remove();
}

//console.log('style-handle', Style);
module.exports = Style;
