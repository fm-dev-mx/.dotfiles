window.chrome=chrome||window.chrome||window.browser,window.chrome.runtime.getURL(""),(()=>{"use strict";let e=window.chrome||window.browser||browser;function o(o,n){e.runtime.sendMessage({type:"MSG_FIREFOX",payload:o,obj:n},(function(e){console.debug("SF Msg sent:",e)}))}function n(){o("Pop redirecting to Dashboard"),window.location.href="app.html"}function r(){o("Pop redirecting to Onboarding"),window.location.href="eventpages/email.html"}navigator.userAgent.includes("Edge/")&&(e=window.browser),document.addEventListener("DOMContentLoaded",(function(){o("Pop doc ready. Onboarding."),e.runtime.sendMessage({type:"MSG_IS_ONBOARDING_COMPLETE"},(function(e){!e||e.error?(o("Onboarding failed: "+e),r()):(o("Is onboarding complete: ",e.success),e.success?e.success.group?"GROUP_A"===e.success.group&&e.success.result?n():r():n():r())}))}))})();