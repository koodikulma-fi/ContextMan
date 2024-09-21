function t(e,s,i=-1){if(e===s)return!0;if(e&&i&&'object'==typeof e){if(!s||'object'!=typeof s)return!1;const n=e.constructor;if(n!==s.constructor)return!1;i--;let r=!1;switch(n){case Object:break;case Array:r=!0;break;case Set:r=!0,e=[...e],s=[...s];break;case Map:if(e.size!==s.size)return!1;for(const[n,r]of e){if(!s.has(n))return!1;if(i?!t(s.get(n),r,i):s.get(n)!==r)return!1}return!0;default:const n=e.toString();'[object NodeList]'!==n&&'[object HTMLCollection]'!==n||(r=!0)}if(r){const n=e.length;if(n!==s.length)return!1;for(let r=0;r<n;r++)if(i?!t(e[r],s[r],i):e[r]!==s[r])return!1}else{for(const n in s){if(!e.hasOwnProperty(n))return!1;if(i?!t(e[n],s[n],i):e[n]!==s[n])return!1}for(const t in e)if(!s.hasOwnProperty(t))return!1}return!0}return!1}function e(t,s=-1){if(!t||!s||'object'!=typeof t)return t;s--;let i=null;switch(t.constructor){case Object:break;case Array:i=t;break;case Set:return new Set(s?[...t].map((t=>e(t,s))):t);case Map:return new Map(s?[...t].map((([t,i])=>[e(t,s),e(i,s)])):t);default:const n=t.toString();'[object NodeList]'!==n&&'[object HTMLCollection]'!==n||(i=[...t])}if(i)return s?i.map((t=>e(t,s))):[...i];if(!s)return Object.assign({},t);const n=new t.constructor;for(const i in t)n[i]=e(t[i],s);return n}var s,i;function n(e,i,n=1){const r='string'==typeof n?s[n]:n;let o;return(s,n=!1,a)=>{const l=i;if(r<-1){if(-2!==r)return!1}else if(!n&&t(l,s,r))return!1;return void 0!==a&&(o&&o(l,s),o=void 0,e=a||void 0),i=s,e&&(o=e(s,l)||void 0),!1}}function r(e,i=0){let n,r;const o='string'==typeof i?s[i]:i;return(...s)=>{if(r)if(o<-1){if(-2!==o)return n}else if(t(r,s,o>=0?o+1:o))return n;return r=s,n=e(...s),n}}function o(e,i,n=0){let r,o;const a='string'==typeof n?s[n]:n;return(...s)=>{const n=e(...s);if(r)if(a<-1){if(-2!==a)return o}else if(t(n,r,a))return o;return r=n,o=i(...r),o}}function a(t,e,s,i=0){const n={};return(...r)=>{const a=s(...r,n);return n[a]||(n[a]=o(t,e,i)),n[a](...r)}}function l(t,e){for(const s of t.slice()){const n=s[2]||0;if(n&i.OneShot){const e=s[4]||t,i=e.indexOf(s);-1!==i&&e.splice(i,1)}n&i.Deferred?setTimeout((()=>s[0](...s[1]&&e?[...e,...s[1]]:e||s[1]||[])),0):s[0](...s[1]&&e?[...e,...s[1]]:e||s[1]||[])}}(t=>{t[t.never=-3]='never',t[t.always=-2]='always',t[t.deep=-1]='deep',t[t.changed=0]='changed',t[t.shallow=1]='shallow',t[t.double=2]='double'})(s||(s={})),(t=>{t[t.OneShot=1]='OneShot',t[t.Deferred=2]='Deferred',t[t.None=0]='None',t[t.All=3]='All'})(i||(i={}));class c extends(h(Object)){}function h(t){return class extends t{constructor(){super(...arguments),this.signals={}}listenTo(t,e,s,n=i.None,r){var o,a;let l=this.signals[t];const c=[e,s||null,n||i.None,null!=r?r:null];l?l.some(((t,s)=>t[0]===e&&(l[s]=c)))||l.push(c):this.signals[t]=l=[c],c[2]&i.OneShot&&c.push(l),null===(a=(o=this.constructor).onListener)||void 0===a||a.call(o,this,t,l.indexOf(c),!0)}unlistenTo(t,e,s){var i,n;null==t?t=Object.keys(this.signals):'string'==typeof t&&(t=[t]);const r=null!=s;for(const o of t){const t=this.signals[o];if(t){for(let a=t.length-1;a>=0;a--)e&&t[a][0]!==e||r&&t[a][3]!==s||(null===(n=(i=this.constructor).onListener)||void 0===n||n.call(i,this,o,a,!1),t.splice(a,1));t[0]||delete this.signals[o]}}}isListening(t,e,s){return null==t?Object.keys(this.signals).some((t=>this.isListening(t,e,s))):!!this.signals[t]&&(!(e&&!this.signals[t].some((t=>t[0]===e)))&&!(null!=s&&!this.signals[t].some((t=>t[3]===s))))}sendSignal(t,...e){const s=this.constructor.getListenersFor?this.constructor.getListenersFor(this,t):this.signals[t];s&&l(s,e)}static onListener(t,e,s,i){}}}function u(t,e,s){const n=s&&(s.includes('first')||s.includes('first-true')),r=s&&(n||s.includes('last')),o=s&&s.includes('no-false'),a=s&&s.includes('no-null');let l=[];for(const c of t.slice()){const h=c[2]||0;if(h&i.OneShot){const e=c[4]||t,s=e.indexOf(c);-1!==s&&e.splice(s,1)}if(h&i.Deferred)setTimeout((()=>c[0](...c[1]&&e?[...e,...c[1]]:e||c[1]||[])),0);else{const t=c[0](...c[1]&&e?[...e,...c[1]]:e||c[1]||[]);if(!t&&(void 0===t||o||a&&null==t))continue;if(r?l[0]=t:l.push(t),n&&(t||!s.includes('first-true')))break}}return r?l[0]:l}class d extends(f(Object)){}function f(t){return class extends(h(t)){sendSignalAs(t,e,...s){const i='string'==typeof t?[t]:t,n=i.includes('delay')||i.includes('pre-delay'),r=i.includes('first')||i.includes('first-true'),o=i.includes('multi')||!r&&!i.includes('last');if(i.includes('await'))return new Promise((async t=>{n&&await this.afterRefresh(i.includes('delay'));const a=this.constructor.getListenersFor?this.constructor.getListenersFor(this,e):this.signals[e];if(!a)return t(o?[]:void 0);let l=(await Promise.all(u(a,s))).filter((t=>!(void 0===t||null==t&&i.includes('no-null')||!t&&i.includes('no-false'))));r&&i.includes('first-true')&&(l=l.filter((t=>t)));const c=l.length;c?r?t(o?[l[0]]:l[0]):i.includes('last')?t(o?[l[c-1]]:l[c-1]):t(l):t(o?[]:void 0)}));if(!n){const t=this.constructor.getListenersFor?this.constructor.getListenersFor(this,e):this.signals[e];return t?u(t,s,i):i.includes('last')||r?void 0:[]}(async()=>{await this.afterRefresh(i.includes('delay'));const t=this.constructor.getListenersFor?this.constructor.getListenersFor(this,e):this.signals[e];t&&(r?u(t,s,i):l(t,s))})()}afterRefresh(t=!1){return new Promise((e=>setTimeout(t&&this.awaitDelay?async()=>{await this.awaitDelay(),e()}:e,0)))}}}class g extends(y(Object)){}function y(t){return class extends t{constructor(){super(...arguments),this.dataListeners=new Map}listenToData(...t){var e;let s=1;const i=t.length,n='boolean'==typeof t[i-s]&&t[i-s++],r='object'==typeof t[0],o=r?t[0]:Array.isArray(t[i-s])?null===(e=t[i-s++])||void 0===e?void 0:e.slice():void 0,a=r?Object.keys(t[0]):t.slice(0,i-s),l=t[i-s];this.dataListeners.set(l,[o,...a]),n&&l(...this.getDataArgsBy(a,o))}unlistenToData(t){return!!this.dataListeners.has(t)&&(this.dataListeners.delete(t),!0)}getInData(t,e=void 0){}setInData(t,e,s,i){}getDataArgsBy(t,e){return e?Array.isArray(e)?t.map(((t,s)=>this.getInData(t,e[s]))):[t.reduce(((t,s)=>(t[s]=this.getInData(s,e[s]),t)),{})]:t.map(((t,e)=>this.getInData(t)))}callDataBy(t=!0,e){if(e||!this.constructor.callDataListenersFor)for(const[e,[s,...i]]of this.dataListeners.entries())(!0===t||t.some((t=>i.some((e=>e===t||e.startsWith(t+'.')||t.startsWith(e+'.'))))))&&e(...this.getDataArgsBy(i,s));else this.constructor.callDataListenersFor(this,t)}}}var p=(t,e)=>{var s={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(s[i]=t[i]);if(null!=t&&'function'==typeof Object.getOwnPropertySymbols){var n=0;for(i=Object.getOwnPropertySymbols(t);n<i.length;n++)e.indexOf(i[n])<0&&Object.prototype.propertyIsEnumerable.call(t,i[n])&&(s[i[n]]=t[i[n]])}return s};class v extends(x(Object)){}function x(t){return class extends(y(t)){constructor(...t){super(...t.slice(1)),this.dataListeners=new Map,this.dataKeysPending=null,this.data=t[0]||{}}getData(){return this.data}getInData(t,e){if(!this.data)return e;if(!t)return this.data;const s=t.split('.');let i=this.data;for(const t of s){if(!i)return e;i=i[t]}return void 0===i?e:i}setData(t,e=!0,s=!0,i){this.data=!1!==e?Object.assign(Object.assign({},this.data),t):t,s?this.refreshData(!0,i):this.addRefreshKeys(!0)}setInData(t,e,s=!0,i=!0,n){var r,o,a;if(this.data){if(t){const i=t.split('.'),n=i.pop();if(!n)return;let l=(r=this.data,this.data=p(r,[]),r);for(const t of i)l=l[t]=(null===(o=l[t])||void 0===o?void 0:o.constructor)===Object?Object.assign({},l[t]):l[t]||{};l[n]=s&&(null===(a=l[n])||void 0===a?void 0:a.constructor)===Object?Object.assign(Object.assign({},l[n]),e):e}else this.data=s&&this.data?Object.assign(Object.assign({},this.data),e):e;i?this.refreshData(t||!0,n):this.addRefreshKeys(t||!0)}}refreshData(t,e){if(t&&this.addRefreshKeys(t),null!=e)return void setTimeout((()=>this.refreshData(null)),e);const s=this.dataKeysPending;this.dataKeysPending=null,s&&this.callDataBy(s)}addRefreshKeys(t){if(!0===t)this.dataKeysPending=!0;else if(t&&!0!==this.dataKeysPending)if('string'==typeof t&&(t=[t]),this.dataKeysPending)for(const e of t)this.dataKeysPending.some((t=>t===e||e.startsWith(t+'.')))||this.dataKeysPending.push(e);else this.dataKeysPending=[...t]}}}class D extends c{constructor(...t){super(),this.promise=Promise.resolve(),this.state='',this.pendingInitializer=t[0],this.pending=this.pendingInitializer?this.pendingInitializer():void 0}trigger(t,e){return this.state?void 0!==e&&this.extend(e):(this.state='waiting',this.promise=new Promise((t=>this._resolvePromise=()=>{delete this._resolvePromise,t()})),this.extend(void 0===e?t:e),this.sendSignal('onStart')),this.promise}extend(t,e=!0){'resolving'===this.state&&(this.clearTimer(),null===t?this.resolve():this.state?void 0!==t&&(this.timer=setTimeout((()=>{delete this.timer,this.resolve()}),t)):e&&this.trigger(t))}clearTimer(){void 0!==this.timer&&(clearTimeout(this.timer),delete this.timer)}resetPending(){const t=this.pending;return this.pending=this.pendingInitializer?this.pendingInitializer():void 0,t}resolve(){if('waiting'!==this.state)return;this.state='resolving',this.clearTimer();const t=this.resetPending();this.sendSignal('onResolve');let e=0;const s=(t=!1)=>{var s;1&e?t||2&e||'resolving'!==this.state||(e|=2,this.state=''):(e|=t?1:3,t||(this.state=''),null===(s=this._resolvePromise)||void 0===s||s.call(this))};this.sendSignal('onRefresh',t,s),s(),this.sendSignal('onFinish',!1)}reject(){var t;'waiting'===this.state&&(this.state='resolving',this.clearTimer(),this.resetPending(),this.sendSignal('onResolve'),this.state='',null===(t=this._resolvePromise)||void 0===t||t.call(this),this.sendSignal('onFinish',!0))}}class m extends(x(f(Object))){constructor(t,e){super(t),this.settings=this.constructor.getDefaultSettings(),this.contextAPIs=new Map,this.preDelayCycle=new D,this.delayCycle=new D,e&&this.modifySettings(e),this.constructor.initializeCyclesFor(this)}modifySettings(t){var e;const s=this.constructor.getDefaultSettings();for(const i in t)this.settings[i]=void 0!==t[i]?t[i]:null!==(e=this.settings[i])&&void 0!==e?e:s[i]}triggerRefresh(t){this.preDelayCycle.trigger(this.settings.refreshTimeout,t)}afterRefresh(t=!1,e){return t?this.delayCycle.trigger(void 0,e):this.preDelayCycle.trigger(this.settings.refreshTimeout,e)}async awaitDelay(){const t=new Set;for(const e of this.contextAPIs.keys())t.add(e.afterRefresh(!0));await Promise.all(t)}refreshData(t,e){t&&this.addRefreshKeys(t),this.triggerRefresh(e)}static getListenersFor(t,e){let s=t.signals[e]||[];for(const[i,n]of t.contextAPIs)for(const t of n){const n=i.constructor.getListenersFor?i.constructor.getListenersFor(i,t+'.'+e):i.signals[t+'.'+e];n&&(s=s.concat(n))}return s[0]&&s}static getDefaultSettings(){return{refreshTimeout:0}}static initializeCyclesFor(t){t.preDelayCycle.listenTo('onRefresh',((e,s)=>t.constructor.runPreDelayFor(t,s))),t.delayCycle.listenTo('onRefresh',((e,s)=>t.constructor.runDelayFor(t,s))),t.preDelayCycle.listenTo('onFinish',(()=>{t.delayCycle.trigger(),'waiting'===t.delayCycle.state&&(t.awaitDelay?t.awaitDelay().then((()=>t.delayCycle.resolve())):t.delayCycle.resolve())})),t.delayCycle.listenTo('onStart',(()=>t.preDelayCycle.trigger())),t.delayCycle.listenTo('onResolve',(()=>t.preDelayCycle.resolve()))}static runPreDelayFor(t,e){const s=t.dataKeysPending;if(t.dataKeysPending=null,e(),s){for(const[e,[i,...n]]of t.dataListeners.entries())(!0===s||s.some((t=>n.some((e=>e===t||e.startsWith(t+'.')||t.startsWith(e+'.'))))))&&e(...t.getDataArgsBy(n,i));for(const[e,i]of t.contextAPIs.entries())e.callDataBy(!0===s?i:i.reduce(((t,e)=>t.concat(s.map((t=>t?e+'.'+t:e)))),[]))}}static runDelayFor(t,e){}}class O extends(y(f(Object))){constructor(t){super(),this.contexts=Object.assign({},t),this.dataListeners=new Map}afterRefresh(t=!1,e){return this.awaitDelay?this.awaitDelay():Promise.resolve()}sendSignal(t,...e){var s;const i=t.indexOf('.');-1!==i&&(null===(s=this.getContext(t.slice(0,i)))||void 0===s||s.sendSignal(t.slice(i+1),...e))}sendSignalAs(t,e,...s){const i=e.indexOf('.'),n=-1===i?null:this.getContext(e.slice(0,i));if(n)return n.sendSignalAs(t,e.slice(i+1),...s);const r='string'==typeof t?[t]:t,o=r.includes('last')||r.includes('first')||r.includes('first-true')?void 0:[];return r.includes('await')?Promise.resolve(o):o}getInData(t,e=void 0){const s=t.indexOf('.'),i=this.getContext(-1===s?t:t.slice(0,s));return i?-1===s?i.getData():i.getInData(t.slice(s+1),e):e}setInData(t,e,s,i,n){const r=t.indexOf('.'),o=this.getContext(-1===r?t:t.slice(0,r));o&&(-1===r?o.setData(e,s,i,n):o.setInData(t.slice(r+1),e,s,i,n))}refreshData(t,e){var s,i;const n={};for(const e of'string'==typeof t?[t]:t){const t=e.indexOf('.'),i=-1===t?e:e.slice(0,t);void 0!==n[i]&&(n[i]=this.getContext(i)),null===(s=n[i])||void 0===s||s.addRefreshKeys(-1===t||e.slice(i.length+1))}for(const t in n)null===(i=n[t])||void 0===i||i.refreshData(null,e)}refreshDataBy(t,e){const s=this.getContexts(t);for(const i in s){const n=s[i];n&&n.refreshData(t[i],e)}}getContext(t){return this.contexts[t]}getContexts(t,e=!1){if(!t)return Object.assign({},this.contexts);const s=t.constructor===Set?t:t.constructor===Array?new Set(t):new Set(Object.keys(t)),i={};for(const t in this.contexts)!s.has(t)||void 0===this.contexts[t]||e&&null===this.contexts[t]||(i[t]=this.contexts[t]);return i}newContext(t,e,s=!0){const i=new m(t);return e&&this.setContext(e,i,s),i}newContexts(t,e=!1,s=!0){const i={};for(const e in t)i[e]=new m(t[e]);return e&&this.setContexts(i,s),i}setContext(t,e,s=!0){const i=this.contexts[t];if(i===e)return!1;if(i){const e=i.contextAPIs.get(this);if(e){const s=e.filter((e=>e!==t));s.length?i.contextAPIs.set(this,s):i.contextAPIs.delete(this)}}if(e){const s=e.contextAPIs.get(this)||[];s.includes(t)||s.push(t),e.contextAPIs.set(this,s)}return void 0!==e?this.contexts[t]=e:delete this.contexts[t],s&&this.callDataBy([t]),!0}setContexts(t,e=!0){let s=!1;for(const e in t)s=this.setContext(e,t[e],!1)||s;return e&&s&&this.callDataBy(Object.keys(t)),s}static parseContextDataKey(t){const e=t.indexOf('.');return-1===e?[t,'']:[t.slice(0,e),t.slice(e+1)]}static readContextNamesFrom(t){return t.reduce(((t,e)=>{const s=e.indexOf('.'),i=-1===s?e:e.slice(0,s);return i&&!t.includes(i)&&t.push(i),t}),[])}static readContextDictionaryFrom(t){const e={};for(const s of t){const[t,i]=O.parseContextDataKey(s);!0!==e[t]&&(i?(e[t]||(e[t]=[])).push(i):e[t]=!0)}return e}}export{s as CompareDataDepthEnum,m as Context,O as ContextAPI,g as DataBoy,v as DataMan,D as RefreshCycle,c as SignalBoy,i as SignalListenerFlags,d as SignalMan,t as areEqual,u as askListeners,l as callListeners,a as createCachedSource,r as createDataMemo,o as createDataSource,n as createDataTrigger,e as deepCopy,y as mixinDataBoy,x as mixinDataMan,h as mixinSignalBoy,f as mixinSignalMan};
