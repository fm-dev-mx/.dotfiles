(()=>{"use strict";const e=new class{constructor(){this._services=new Map,this._eventManager=new class{constructor(){this._handlerID=1,this._eventToHandlerIDs=new Map,this._handlerIDToHandler=new Map}on(e,t){const s=this._allocHandlerID();this._handlerIDToHandler.set(s,t),this._eventToHandlerIDs.has(e)?this._eventToHandlerIDs.get(e).add(s):this._eventToHandlerIDs.set(e,new Set([s]));let n=!1;return(()=>{n?console.warn("You shouldn't call the canceler more than once!"):(n=!0,this._off(e,s))}).bind(this)}emit(e,t,s){const n=this._eventToHandlerIDs.get(e);if(n)for(const e of n){const n=this._handlerIDToHandler.get(e);n&&n(t,s)}}_allocHandlerID(){for(;this._handlerIDToHandler.has(this._handlerID);)this._handlerID=(this._handlerID+1)%Number.MAX_SAFE_INTEGER;return this._handlerID}_off(e,t){const s=this._eventToHandlerIDs.get(e);s&&s.delete(t),this._handlerIDToHandler.delete(t)}},chrome.runtime.onMessage.addListener(((e,t,s)=>{let n=JSON.parse(e);if(n&&n.type)switch(n.type){case"event":this._eventManager.emit(n.event,n.detail,t),s&&s();break;case"service":{const e=this._services.get(n.service);if(!e)break;return e(n.params,t).then((e=>s&&s(e))),!0}default:console.error(`Unknown message type: ${e.type}`)}else console.error(`Bad message: ${e}`)}).bind(this))}provide(e,t){this._services.set(e,t)}request(e,t){const s=JSON.stringify({type:"service",service:e,params:t});return new Promise(((e,t)=>{chrome.runtime.sendMessage(s,(s=>{chrome.runtime.lastError?t(chrome.runtime.lastError):e(s)}))}))}requestToTab(e,t,s){const n=this._getTabMessageSender();return n?n(e,JSON.stringify({type:"service",service:t,params:s})):Promise.reject("Can not send message to tabs in current context!")}on(e,t){return this._eventManager.on(e,t)}emit(e,t){let s=JSON.stringify({type:"event",event:e,detail:t});chrome.runtime.sendMessage(s,(()=>{chrome.runtime.lastError&&console.error(chrome.runtime.lastError)}))}emitToTabs(e,t,s){const n=this._getTabMessageSender();if(!n)return void console.error("Can not send message to tabs in current context!");"number"==typeof e&&(e=[e]);const r=JSON.stringify({type:"event",event:t,detail:s});for(let t of e)n(t,r).catch((e=>console.error(e)))}_getTabMessageSender(){return chrome.tabs&&chrome.tabs.sendMessage?(e,t)=>new Promise(((s,n)=>{chrome.tabs.sendMessage(e,t,(e=>{chrome.runtime.lastError?n(chrome.runtime.lastError):s(e)}))})):null}};function t(e,t){let s=document.getElementsByClassName("translator-config");for(let n of s){for(let e=n.options.length;e>0;e--)n.options.remove(e-1);let s=n.getAttribute("data-affected").split(/\s/g),r=e.selections[s[0]];for(let e of t)e===r?n.options.add(new Option(chrome.i18n.getMessage(e),e,!0,!0)):n.options.add(new Option(chrome.i18n.getMessage(e),e));n.onchange=()=>{let t=n.options[n.selectedIndex].value;for(let n of s)e.selections[n]=t;let r=new Set;e.translators=[];for(let t in e.selections){let s=e.selections[t];r.has(s)||(e.translators.push(s),r.add(s))}chrome.storage.sync.set({HybridTranslatorConfig:e})}}}function s(e,t){let s=e;return t.forEach((e=>{s=s[e]})),s}function n(e,t,s){let n=e;for(let e=0;e<t.length-1;e++)n=n[t[e]];n[t[t.length-1]]=s;let r={};r[t[0]]=e[t[0]],chrome.storage.sync.set(r)}window.onload=()=>{!function(){let e=document.getElementsByClassName("i18n");for(let t=0;t<e.length;t++){let s="beforeEnd";e[t].hasAttribute("data-insert-pos")&&(s=e[t].getAttribute("data-insert-pos")),e[t].insertAdjacentText(s,chrome.i18n.getMessage(e[t].getAttribute("data-i18n-name")))}}(),document.getElementById("PrivacyPolicyLink").setAttribute("href",chrome.i18n.getMessage("PrivacyPolicyLink")),chrome.storage.sync.get(["languageSetting","HybridTranslatorConfig"],(async s=>{let n=s.HybridTranslatorConfig,r=s.languageSetting;t(n,(await e.request("get_available_translators",{from:r.sl,to:r.tl})).slice(1))})),e.on("hybrid_translator_config_updated",(e=>t(e.config,e.availableTranslators))),chrome.storage.sync.get((e=>{let t=document.getElementsByTagName("input");const r=document.getElementById("select-translate-position");for(let a of[...t,r]){let t=a.getAttribute("setting-path").split(/\s/g),r=s(e,t);switch(a.getAttribute("setting-type")){case"checkbox":a.checked=-1!==r.indexOf(a.value),a.onchange=t=>{const r=t.target,a=r.getAttribute("setting-path").split(/\s/g),o=s(e,a);r.checked?o.push(r.value):o.splice(o.indexOf(r.value),1),n(e,a,o)};break;case"radio":a.checked=r===a.value,a.onchange=t=>{const s=t.target,r=s.getAttribute("setting-path").split(/\s/g);s.checked&&n(e,r,s.value)};break;case"switch":a.checked=r,a.onchange=t=>{const s=t.target.getAttribute("setting-path").split(/\s/g);n(e,s,t.target.checked)};break;case"select":a.value=r,a.onchange=t=>{const s=t.target,r=s.getAttribute("setting-path").split(/\s/g);n(e,r,s.options[s.selectedIndex].value)}}}}))}})();