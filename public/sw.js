if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const c=e=>n(e,t),r={module:{uri:t},exports:o,require:c};s[t]=Promise.all(i.map((e=>r[e]||c(e)))).then((e=>(a(...e),o)))}}define(["./workbox-1846d813"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"snXmWdoEonFFWarfxbtiv"},{url:"/_next/static/chunks/main-0084d398f6db1ea8.js",revision:"snXmWdoEonFFWarfxbtiv"},{url:"/_next/static/chunks/pages/_app-790194c3eedbc7b1.js",revision:"snXmWdoEonFFWarfxbtiv"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"snXmWdoEonFFWarfxbtiv"},{url:"/_next/static/chunks/pages/index-eba59435138c43a0.js",revision:"snXmWdoEonFFWarfxbtiv"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"snXmWdoEonFFWarfxbtiv"},{url:"/_next/static/chunks/webpack-2e51481b1d484a05.js",revision:"snXmWdoEonFFWarfxbtiv"},{url:"/_next/static/css/6aa79e5cfaf98179.css",revision:"snXmWdoEonFFWarfxbtiv"},{url:"/_next/static/snXmWdoEonFFWarfxbtiv/_buildManifest.js",revision:"snXmWdoEonFFWarfxbtiv"},{url:"/_next/static/snXmWdoEonFFWarfxbtiv/_middlewareManifest.js",revision:"snXmWdoEonFFWarfxbtiv"},{url:"/_next/static/snXmWdoEonFFWarfxbtiv/_ssgManifest.js",revision:"snXmWdoEonFFWarfxbtiv"},{url:"/images/Logo.png",revision:"71ae5d8f6b618032cb65020983874cd3"},{url:"/images/icon-128x128.png",revision:"9ba29441c1424379c579f4ef15bab87c"},{url:"/images/icon-144x144.png",revision:"5bfc603dd7f58f6bf511aa61a99d1437"},{url:"/images/icon-152x152.png",revision:"94c55e7838b2e6fac90722218be1c978"},{url:"/images/icon-192x192.png",revision:"0cf2116d7ba76401ce5b23d56b576aac"},{url:"/images/icon-256x256.png",revision:"8bfe0cf1758418dc751f68b54f8a55f8"},{url:"/images/icon-384x384.png",revision:"eeca38e40f29b404b7091f60898d834b"},{url:"/images/icon-512x512.png",revision:"8337676f82e6756279e704795c7b7674"},{url:"/images/icon-72x72.png",revision:"d44dfe58b579675f27ebad702007e0fc"},{url:"/images/icon-96x96.png",revision:"60804fa822cd5891081c5ff96ec06467"},{url:"/images/login.png",revision:"172bbcb6d84eab43eb94167e460c07b1"},{url:"/images/registration.png",revision:"2762bce1c3222a8eddbd9c3c3be63f19"},{url:"/manifest.json",revision:"ab45747a0bd7d3be78dee6a28fbb8e3a"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
