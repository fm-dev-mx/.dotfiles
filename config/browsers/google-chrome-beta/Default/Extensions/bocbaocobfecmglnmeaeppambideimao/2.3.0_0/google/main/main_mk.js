(function(){var e="Преведи",t=this||self;function n(e,n){e=e.split(".");var o,r=t;e[0]in r||void 0===r.execScript||r.execScript("var "+e[0]);for(;e.length&&(o=e.shift());)e.length||void 0===n?r=r[o]&&r[o]!==Object.prototype[o]?r[o]:r[o]={}:r[o]=n}var o={0:e,1:"Откажи",2:"Затвори",3:function(e){return"Google ја преведе автоматски оваа страница на: "+e},4:function(e){return"Преведено на: "+e},5:"Грешка: Серверот не можеше да го исполни Вашето барање. Обидете се повторно подоцна.",6:"Дознајте повеќе",7:function(e){return"Овозможено од "+e},8:e,9:"Се прев едува",10:function(e){return"Преведи ја оваа страница на: "+e+" со Google Преведувач?"},11:function(e){return"Види ја оваа страница на: "+e},12:"Прикажи оригинал",13:"Содржината на оваа локална датотека ќе биде испратена за превод до Google преку безбедна врска.",14:"Содржината на оваа безбедна страница ќе биде испратена за превод до Google преку безбедна врска.",15:"Содржината на оваа интранет страница ќе биде испратена за преведување до Google преку безбедна врска.",16:"Одбери јазик",17:function(e){return"Исклучи "+e+" превод"},18:function(e){return"Исклучи за:"+e},19:"Секогаш сокриј",20:"Изворен текст:",21:"Придонеси за подобар превод",22:"Придонеси",23:"Преведи ги сите ",24:"Обнови ги сите",25:"Откажи ги сите ",26:"Преведи делови на мојот јазик ",27:function(e){return"Преведи сè на "+e},28:"Прикажи оригинални јазици",29:"Опции",30:"Исклучи  превод на оваа страница ",31:null,32:"Прикажи алтернативни преводи.",33:"Кликнете на зборовите погоре за да видите алтернативни преводи",34:"Употреба",35:"Влечете со копчето Shift за да го промените редоследот.",36:"Кликнете за други преводи",37:"Држете го копчето Shift, кликнете и влечете ги зборовите погоре за да го промените нивниот редослед.",38:"Ви благодариме што приложивте предлог за превод на Google Translate.",39:"Управувај со преводот на оваа веб-страница",40:"Кликнете на збор за други преводи или кликнете двапати за директно да го уредите преводот",41:"Оригинален текст",42:e,43:e,44:"Вашата корекција е поднесена.",45:"Грешка: јазикот на веб-страницата не е поддржан.",46:"Виџет „Преведи на Google“"},r=window.google&&google.translate&&google.translate._const;if(r){var a;e:{for(var l=[],i=[""],c=0;c<i.length;++c){var s=i[c].split(","),g=s[0];if(g){var m=Number(s[1]);if(!(!m||.1<m||0>m)){var u=Number(s[2]),f=new Date,h=1e4*f.getFullYear()+100*(f.getMonth()+1)+f.getDate();!u||u<h||l.push({version:g,ratio:m,a:u})}}}var d=0,v=window.location.href.match(/google\.translate\.element\.random=([\d\.]+)/),p=Number(v&&v[1])||Math.random();for(c=0;c<l.length;++c){var _=l[c];if(1<=(d+=_.ratio))break;if(p<d){a=_.version;break e}}a="TE_20200210_00"}"/element/%s/e/js/element/element_main.js".replace("%s",a);if("0"==a){var j=" element %s e js element element_main.js".split(" ");j[j.length-1]="main_mk.js",j.join("/").replace("%s",a)}if(r._cjlc)r._cjlc(this.EDGE_TRANSLATE_URL+"google/element_main.js");else{var E=this.EDGE_TRANSLATE_URL+"google/element_main.js",G=document.createElement("script");G.type="text/javascript",G.charset="UTF-8",G.src=E;var T=document.getElementsByTagName("head")[0];T||(T=document.body.parentNode.appendChild(document.createElement("head"))),T.appendChild(G)}n("google.translate.m",o),n("google.translate.v",a)}}).call(window);