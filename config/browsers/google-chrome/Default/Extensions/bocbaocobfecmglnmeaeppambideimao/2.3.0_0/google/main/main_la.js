!function(){var e="Translate",t=this;function n(e,n){var a,o=e.split("."),r=t;o[0]in r||!r.execScript||r.execScript("var "+o[0]);for(;o.length&&(a=o.shift());)o.length||void 0===n?r=r[a]?r[a]:r[a]={}:r[a]=n}var a={0:e,1:"Cancel",2:"Close",3:function(e){return"Google has automatically translated this page to: "+e},4:function(e){return"Translated to: "+e},5:"Error: The server could not complete your request. Try again later.",6:"Learn more",7:function(e){return"Powered by "+e},8:e,9:"Translation in progress",10:function(e){return"Translate this page to: "+e+" using Google Translate?"},11:function(e){return"View this page in: "+e},12:"Show original",13:"The content of this local file will be sent to Google for translation using a secure connection.",14:"The content of this secure page will be sent to Google for translation using a secure connection.",15:"The content of this intranet page will be sent to Google for translation using a secure connection.",16:"Select Language",17:function(e){return"Turn off "+e+" translation"},18:function(e){return"Turn off for: "+e},19:"Always hide",20:"Original text:",21:"Contribute a better translation",22:"Contribute",23:"Translate all",24:"Restore all",25:"Cancel all",26:"Translate sections to my language",27:function(e){return"Translate everything to "+e},28:"Show original languages",29:"Options",30:"Turn off translation for this site",31:null,32:"Show alternative translations",33:"Click on words above to get alternative translations",34:"Use",35:"Drag with shift key to reorder",36:"Click for alternative translations",37:"Hold down the shift key, click, and drag the words above to reorder.",38:"Thank you for contributing your translation suggestion to Google Translate.",39:"Manage translation for this site",40:"Click a word for alternative translations, or double-click to edit directly",41:"Original text",42:e,43:e,44:"Your correction has been submitted.",45:"Error: The language of the webpage is not supported."},o=window.google&&google.translate&&google.translate._const;if(o){var r;e:{for(var i=[],l=["26,0.01,20150908"],s=0;s<l.length;++s){var c=l[s].split(","),g=c[0];if(g){var u=Number(c[1]);if(!(!u||.1<u||0>u)){var h=Number(c[2]),f=new Date,d=1e4*f.getFullYear()+100*(f.getMonth()+1)+f.getDate();!h||h<d||i.push({version:g,ratio:u,a:h})}}}var m=0,p=window.location.href.match(/google\.translate\.element\.random=([\d\.]+)/),v=Number(p&&p[1])||Math.random();for(s=0;s<i.length;++s){var T=i[s];if(1<=(m=m+T.ratio))break;if(v<m){r=T.version;break e}}r="33"}"/translate_static/js/element/%s/element_main.js".replace("%s",r);if("0"==r){var b=" translate_static js element %s element_main.js".split(" ");b[b.length-1]="main_la.js",b.join("/").replace("%s",r)}if(o._cjlc)o._cjlc(this.EDGE_TRANSLATE_URL+"google/element_main.js");else{var w=this.EDGE_TRANSLATE_URL+"google/element_main.js",y=document.createElement("script");y.type="text/javascript",y.charset="UTF-8",y.src=w;var _=document.getElementsByTagName("head")[0];_||(_=document.body.parentNode.appendChild(document.createElement("head"))),_.appendChild(y)}n("google.translate.m",a),n("google.translate.v",r)}}();