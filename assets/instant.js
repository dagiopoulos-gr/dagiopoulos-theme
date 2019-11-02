/*! instant.page v1.1.0 - (C) 2019 Alexandre Dieulot - https://instant.page/license */
let urlToPreload,mouseoverTimer,lastTouchTimestamp;const prefetcher=document.createElement("link"),isSupported=prefetcher.relList&&prefetcher.relList.supports&&prefetcher.relList.supports("prefetch"),allowQueryString="instantAllowQueryString"in document.body.dataset;if(isSupported){prefetcher.rel="prefetch",document.head.appendChild(prefetcher);const a={capture:!0,passive:!0};document.addEventListener("touchstart",touchstartListener,a),document.addEventListener("mouseover",mouseoverListener,a)}function touchstartListener(a){lastTouchTimestamp=performance.now();const b=a.target.closest("a");b&&isPreloadable(b)&&(b.addEventListener("touchcancel",touchendAndTouchcancelListener,{passive:!0}),b.addEventListener("touchend",touchendAndTouchcancelListener,{passive:!0}),urlToPreload=b.href,preload(b.href))}function touchendAndTouchcancelListener(){urlToPreload=void 0,stopPreloading()}function mouseoverListener(a){if(1100>performance.now()-lastTouchTimestamp)return;const b=a.target.closest("a");b&&isPreloadable(b)&&(b.addEventListener("mouseout",mouseoutListener,{passive:!0}),urlToPreload=b.href,mouseoverTimer=setTimeout(()=>{preload(b.href),mouseoverTimer=void 0},65))}function mouseoutListener(a){a.relatedTarget&&a.target.closest("a")==a.relatedTarget.closest("a")||(mouseoverTimer?(clearTimeout(mouseoverTimer),mouseoverTimer=void 0):(urlToPreload=void 0,stopPreloading()))}function isPreloadable(a){if(urlToPreload!=a.href){const b=new URL(a.href);return b.origin==location.origin?allowQueryString||!b.search||"instant"in a.dataset?b.hash&&b.pathname+b.search==location.pathname+location.search?void 0:!("noInstant"in a.dataset)||void 0:void 0:void 0}}function preload(a){prefetcher.href=a}function stopPreloading(){prefetcher.removeAttribute("href")}