/*
	返り値のモジュールオブジェクト.debugがtrueならコンソール出力
*/

// Modules
import {is, not} from '@honeo/type-check';
import makeElement from 'make-element';

// var
const
	doc = document,
	head = doc.head;

// 本体、APIの入れもの
const StyleHandle = {
	debug: false
}

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
const addedRules = [];



/*
	ルール適用のためのStyle要素を作って、そのCSSStyleSheetオブジェクトを返す
		Style要素は初回呼び出し時に作成・挿入
*/
const getCSSSS = do{
	let style;
	(function _getCSSSS(){
		if( !style ){
			style = makeElement('style', {class: 'style-handle-rule'});
			head.appendChild(style);
		}
		return style.sheet;
	});
}

/*
	テキスト流し込み用のstyle要素を作って返す
		Style要素は初回呼び出し時に作成・挿入
*/
const getStyleForText = do{
	let style;
	(function _getStyleForText(){
		if( !style ){
			style = makeElement('style', {class: 'style-handle-text'});
			head.appendChild(style);
		}
		return style;
	});
}


/*
    引数のCSSルールを追加する
		追加したルールの詳細をオブジェクトで返す
		追加したルールの詳細オブジェクトをaddedRulesに記録する
*/
StyleHandle.addRule = (rule)=>{
	StyleHandle.debug && console.log('addRule', rule);
	if( not.str(rule) ){
		throw new TypeError('Invalid argument');
	}
	const CSSSS = getCSSSS();
    const index = CSSSS.insertRule(rule, CSSSS.cssRules.length);
	const resultObj = {
		originText: rule,
		parsedText: CSSSS.cssRules[index].cssText,
		index
	}
	addedRules.push(resultObj);
	return resultObj;
}

/*
	addRuleの複数版
		引数チェックはaddRuleで行うため省略
*/
StyleHandle.addRules = (...ruleArr)=>{
	StyleHandle.debug && console.log('addRules', ruleArr);
	return ruleArr.map(StyleHandle.addRule);
}


/*
	_removeRuleの可変長引数対応版
		引数チェックは_removeRuleで行うため省略
*/
StyleHandle.removeRule = (...args)=>{
	StyleHandle.debug && console.log('removeRule', args);
	args.forEach(_removeRule);
}

/*
	登録したCSSルールを削除する
		引数が数値ならその番号のルールを削除
		引数が文字列ならaddedRulesから一致するものを探して削除
		addedRulesからも削除
*/
function _removeRule(arg){
	StyleHandle.debug && console.log('_removeRule', arg);
	const CSSSS = getCSSSS();
	if(typeof arg==='number'){
		CSSSS.deleteRule( arg );
		const index = addedRules.findIndex( (obj)=>{
			return obj.index===arg;
		});
		if(typeof index==='number'){
			addedRules.slice(index, 1)
		}
	}else if(typeof arg==='string'){
		const index = addedRules.findIndex( (obj)=>{
			StyleHandle.debug && console.log('_removeRule-string', obj, addedRules.length)
			return arg===obj.originText;
		});
		if(typeof index==='number'){
			CSSSS.deleteRule( addedRules[index].index );
			addedRules.slice(index, 1)
		}
	}else{
		throw new TypeError('invalid argument');
	}
}

/*
	大雑把に追加
*/
StyleHandle.addText = (text)=>{
	StyleHandle.debug && console.log('addText', text);
	if( not.str(text) ){
		throw new TypeError('Invalid argument');
	}
	const style = getStyleForText();
	style.appendChild( doc.createTextNode(text) );
	return text;
}

/*
    大雑把に削除
		テキストノード単位
        引数と同じものが複数あったら全部無くなっちゃうけど大雑把だから許してくれるね
*/
StyleHandle.removeText = (text)=>{
	StyleHandle.debug && console.log('removeText', text);
	if( not.str(text) ){
		throw new TypeError('Invalid argument');
	}
	const style = getStyleForText();
    Array.from( style.childNodes ).forEach( (v)=>{
		v.nodeType===3 && ( v.nodeValue = v.nodeValue.replace(text, '') );
	});
}

/*
	引数URLの.cssファイルを読み込む
*/
StyleHandle.addURL = (href)=>{
	StyleHandle.debug && console.log('addURL', href);
	if( not.str(text) ){
		throw new TypeError('Invalid argument');
	}
	const link = makeElement('link', {
		href,
		rel: 'stylesheet',
		class: 'style-handle-url'
	});
	head.appendChild(link);
	return href;
}

/*
	引数URLの.cssファイル読み込みを削除
*/
StyleHandle.removeURL = (href)=>{
	StyleHandle.debug && console.log('removeURL', href);
	if( not.str(text) ){
		throw new TypeError('Invalid argument');
	}
	const linkArr = Array.from( head.getElementsByClassName('style-handle-url') );
	const link_target = linkArr.find( (link)=>{
		return link.href===href;
	});
	link_target && link_target.remove();
}

export default StyleHandle;
