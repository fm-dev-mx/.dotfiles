window.chrome=chrome||window.chrome||window.browser,window.chrome.runtime.getURL(""),(()=>{"use strict";let e=window.chrome||window.browser||browser;navigator.userAgent.includes("Edge/")&&(e=window.browser),window.addEventListener("load",(()=>{const o=document.getElementById("downloading");e.runtime.sendMessage({type:"MSG_DOWNLOAD_LOGS",fullLog:!0},(e=>{!e||e.error?o.textContent=`Download Failed. ${e?e.error:"‍"}`:o.textContent="Download complete"}))}))})();