"use strict";!function(){const e=e=>{if(2===e){const e=window.VApi,n=e.$;"function"==typeof n&&(e.$=function(e,t,o){if(Math.abs(o)>=.1&&"viewerContainer"===e.id&&e.classList.contains("pdfPresentationMode")){const n=e.scrollTop;return e.dispatchEvent(new WheelEvent("wheel",{bubbles:!0,cancelable:!0,composed:!0,deltaY:120*Math.sign(o)})),e.scrollTop!==n}return n.apply(this,arguments)}),e.u=()=>new URLSearchParams(location.search).get("file")||location.href}else 3===e&&window.removeEventListener("vimiumMark",n,!0)},n=e=>{const n=e.relatedTarget,t=n&&document.getElementById("viewerContainer");if(e.stopImmediatePropagation(),!t)return;const o=n.textContent;if(o){const i=o.split(","),c=[~~i[0],~~i[1]];(c[0]>0||c[1]>0)&&(t.scrollTo(c[0],c[1]),n.textContent="",e.preventDefault())}else n.textContent=[t.scrollLeft,t.scrollTop]};chrome.storage.sync.get("vimiumExtensionInjector",(e=>{let n,o=e.vimiumExtensionInjector;if("nul"!==o&&"/dev/null"!==o)if(o||(o=/\sEdg\//.test(navigator.appVersion)?"aibcglbfblnogfjhbcmmpobjhnomhcdo":"hfjbmagddngcpeloejdejnfgbamkjaeg",chrome.storage.sync.set({vimiumExtensionInjector:o})),o.includes("://")&&o.includes("/",o.indexOf("://")+3))t(o);else{try{n=o.includes("://")?new URL(o).hostname:o}catch(e){return}chrome.runtime.sendMessage(n,{handler:"id"},(e=>{if(!e||!e.injector||"string"!=typeof e.injector)return!1===e&&console.log("Connection to the extension named %o was refused.",n),chrome.runtime.lastError;console.log(`Successfully connected to ${n}: %o (version ${e.version}).`,e.name),t(e.injector)}))}}));const t=t=>{const o=document.createElement("script");o.src=t,o.async=!0,o.onload=()=>{const t=window.VimiumInjector;t&&(t.cache?e(2):t.callback=e,window.addEventListener("vimiumMark",n,!0))},document.head.appendChild(o)}}();