// modules
import 'babel-polyfill';
import StyleHandle from '../';

// config
StyleHandle.debug = true;

// var
const doc = document;
const [
	textarea_rule,
	textarea_text,
	textarea_url
] = Array.from(doc.getElementsByTagName('textarea'));
const [
	button_addRule,
	button_removeRule,
	button_addText,
	button_removeText,
	button_addURL,
	button_removeURL
] = Array.from(doc.getElementsByTagName('button'));

//////////////////////////////////////

textarea_rule.value =
`body {
	background-color: gray;
}`;

button_addRule.addEventListener('click', (e)=>{
	StyleHandle.addRule(textarea_rule.value);
}, false);

button_removeRule.addEventListener('click', (e)=>{
	StyleHandle.removeRule(textarea_rule.value);
}, false);


textarea_text.value =
`body {
	background-color: skyblue;
}

textarea {
	border: solid 2px black
}`;
button_addText.addEventListener('click', (e)=>{
	StyleHandle.addText(textarea_text.value);
}, false);
button_removeText.addEventListener('click', (e)=>{
	StyleHandle.removeText(textarea_text.value);
}, false);


textarea_url.value =
`/* style.css */
body {
	background-color: pink;
}`;
button_addURL.addEventListener('click', (e)=>{
	StyleHandle.addURL('style.css');
}, false);
button_removeURL.addEventListener('click', (e)=>{
	StyleHandle.removeURL('style.css');
}, false);
