!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=22)}([function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"f",(function(){return i})),n.d(e,"a",(function(){return u})),n.d(e,"e",(function(){return c})),n.d(e,"g",(function(){return s})),n.d(e,"d",(function(){return l}));const r=(t,e)=>t&&e?`${t}_${e}`:"",o=(t,e)=>`${t}#channel:${e}`,i=(t,e,n)=>{if(t.length<e.length)return"";const r=t.indexOf(e);if(-1===r)return"";const o=r+e.length,i=t.indexOf(n,o);let u="";return i!==o?u=-1!==i&&i>o||-1!==i?t.substring(o,i):t.substring(o):""===n&&(u=t.substring(o)),u},u=(t,e)=>{const n=Object.getOwnPropertyNames(t),r=Object.getOwnPropertyNames(e);if(n.length!==r.length)return!1;for(let r=0;r<n.length;r++){const o=n[r];if(t[o]!==e[o])return!1}return!0},c=()=>"complete"===document.readyState&&"visible"===document.visibilityState,s=(t,e)=>`${t}: ${e.statusText} (${e.status})`,a={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},f=/&(?:amp|lt|gt|quot|#(0+)?39);/g,d=RegExp(f.source),l=t=>t&&d.test(t)?t.replace(f,t=>a[t]||"'"):t||""},function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"a",(function(){return i})),n.d(e,"c",(function(){return u}));let r=null;const o=()=>r,i=t=>{r?t(!0):(chrome.runtime.sendMessage("mnojpmjdmbbfmejpflffifhffcmidifd",{type:"SupportsGreaselion"},(function(e){if(!chrome.runtime.lastError&&e&&e.supported)return r=chrome.runtime.connect("mnojpmjdmbbfmejpflffifhffcmidifd",{name:"Greaselion"}),void t(!0)})),setTimeout(()=>{if(!r)return r=chrome.runtime.connect("jidkidbbcafjabdphckchenhfomhnfma",{name:"Greaselion"}),void t(!0)},100))},u=(t,e)=>{t&&r&&r.postMessage({type:"GreaselionError",mediaType:t,data:{errorMessage:e}})}},,function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(1);let o=!1;const i=(t,e)=>{if(!t||o)return;o=!0;const n=Object(r.b)();n&&(n.postMessage({type:"RegisterOnUpdatedTab",mediaType:t}),n.onMessage.addListener((function(t){if(t.data)switch(t.type){case"OnUpdatedTab":e(t.data.changeInfo)}})))}},,,,,function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"h",(function(){return i})),n.d(e,"c",(function(){return u})),n.d(e,"e",(function(){return c})),n.d(e,"f",(function(){return s})),n.d(e,"b",(function(){return a})),n.d(e,"d",(function(){return f})),n.d(e,"g",(function(){return d}));var r=n(0);const o=(t,e)=>{if(!t)return"";let n="www";return e&&(n="old"),`https://${n}.reddit.com/user/${t}/`},i=t=>t.hostname.startsWith("old.")||t.hostname.startsWith("np."),u=async(t,e)=>{if(!t)throw new Error("Invalid parameters");const n=o(t,e);if(!n)throw new Error("Invalid profile url");const i=await fetch(n);if(!i.ok){const t=r.g("Profile request failed",i);throw new Error(t)}return i.text()},c=t=>{if(!t.pathname||!t.pathname.startsWith("/user/"))return"";const e=t.pathname.split("/").filter(t=>t);return e&&0!==e.length?e.length<2?"":e[1]:""},s=t=>{if(!t)return"";let e=r.f(t,'hideFromRobots":false,"id":"t2_','","isEmployee"')||r.f(t,'hideFromRobots":true,"id":"t2_','","isEmployee"');return e||(e=r.f(t,'target_fullname": "t2_','"')),e},a=t=>t?r.f(t,'accountIcon":"',"?"):"",f=t=>{if(!t)return"";let e=r.f(t,'username":"','"');return e||(e=r.f(t,'target_name": "','"')),e},d=t=>{if(["/","/coins","/contact","/login","/premium"].includes(t))return!0;const e=["/dev/","/help/","/r/","/wiki/"];for(const n of e)if(t.startsWith(n))return!0;return!1}},,function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return o}));const r="reddit",o="reddit.com"},function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(1),o=n(0);const i=(t,e,n,i)=>{if(!t||!e)return;const u=Object(r.b)();u&&u.postMessage({type:"MediaDurationMetadata",mediaType:t,data:{mediaKey:o.b(t,e),duration:n,firstVisit:i}})}},,,,,,,,,,,function(t,e,n){"use strict";n.r(e);var r=n(1),o=n(11),i=n(3),u=n(10),c=n(8);let s=0,a="";const f=new Set,d=()=>{s=Date.now()},l=t=>{t&&(t.url||"complete"===t.status)&&location.href!==a&&(a=location.href,d())};chrome.extension.inIncognitoContext||(Object(r.a)(t=>{t?(document.addEventListener("visibilitychange",(function(){"visible"===document.visibilityState?d():(()=>{const t=new URL(location.href),e=c.e(t),n=!f.has(e);n&&f.add(e);const r=Math.round((Date.now()-s)/1e3);o.a(u.b,e,r,n)})()})),"visible"===document.visibilityState&&d(),i.a(u.b,l)):console.error("Failed to initialize communications port")}),console.info("Greaselion script loaded: redditAutoContribution.ts"))}]);