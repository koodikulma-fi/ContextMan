function t(e,s,n=-1){if(e===s)return!0;if(e&&n&&'object'==typeof e){if(!s||'object'!=typeof s)return!1;const i=e.constructor;if(i!==s.constructor)return!1;n--;let r=!1;switch(i){case Object:break;case Array:r=!0;break;case Set:r=!0,e=[...e],s=[...s];break;case Map:if(e.size!==s.size)return!1;for(const[i,r]of e){if(!s.has(i))return!1;if(n?!t(s.get(i),r,n):s.get(i)!==r)return!1}return!0;default:const i=e.toString();'[object NodeList]'!==i&&'[object HTMLCollection]'!==i||(r=!0)}if(r){const i=e.length;if(i!==s.length)return!1;for(let r=0;r<i;r++)if(n?!t(e[r],s[r],n):e[r]!==s[r])return!1}else{for(const i in s){if(!e.hasOwnProperty(i))return!1;if(n?!t(e[i],s[i],n):e[i]!==s[i])return!1}for(const t in e)if(!s.hasOwnProperty(t))return!1}return!0}return!1}function e(t,s=-1){if(!t||!s||'object'!=typeof t)return t;s--;let n=null;switch(t.constructor){case Object:break;case Array:n=t;break;case Set:return new Set(s?[...t].map((t=>e(t,s))):t);case Map:return new Map(s?[...t].map((([t,n])=>[e(t,s),e(n,s)])):t);default:const i=t.toString();'[object NodeList]'!==i&&'[object HTMLCollection]'!==i||(n=[...t])}if(n)return s?n.map((t=>e(t,s))):[...n];if(!s)return Object.assign({},t);const i=new t.constructor;for(const n in t)i[n]=e(t[n],s);return i}var s,n;function i(e,n,i=1){const r='string'==typeof i?s[i]:i;let o;return(s,i=!1,a)=>{const c=n;if(r<-1){if(-2!==r)return!1}else if(!i&&t(c,s,r))return!1;return void 0!==a&&(o&&o(c,s),o=void 0,e=a||void 0),n=s,e&&(o=e(s,c)||void 0),!1}}function r(e,n=0){let i,r;const o='string'==typeof n?s[n]:n;return(...s)=>{if(r)if(o<-1){if(-2!==o)return i}else if(t(r,s,o>=0?o+1:o))return i;return r=s,i=e(...s),i}}function o(e,n,i=0){let r,o;const a='string'==typeof i?s[i]:i;return(...s)=>{const i=e(...s);if(r)if(a<-1){if(-2!==a)return o}else if(t(i,r,a))return o;return r=i,o=n(...r),o}}function a(t,e,s,n=0){const i={};return(...r)=>{const a=s(...r,i);return i[a]||(i[a]=o(t,e,n)),i[a](...r)}}function c(t,e){for(const s of t.slice()){const i=s[2]||0;if(i&n.OneShot){const e=s[4]||t,n=e.indexOf(s);-1!==n&&e.splice(n,1)}i&n.Deferred?setTimeout((()=>s[0](...s[1]&&e?[...e,...s[1]]:e||s[1]||[])),0):s[0](...s[1]&&e?[...e,...s[1]]:e||s[1]||[])}}(t=>{t[t.never=-3]='never',t[t.always=-2]='always',t[t.deep=-1]='deep',t[t.changed=0]='changed',t[t.shallow=1]='shallow',t[t.double=2]='double'})(s||(s={})),(t=>{t[t.OneShot=1]='OneShot',t[t.Deferred=2]='Deferred',t[t.None=0]='None',t[t.All=3]='All'})(n||(n={}));class l extends(h(Object)){}function h(t){return class extends t{constructor(){super(...arguments),this.signals={}}listenTo(t,e,s,i=n.None,r){var o,a;let c=this.signals[t];const l=[e,s||null,i||n.None,null!=r?r:null];c?c.some(((t,s)=>t[0]===e&&(c[s]=l)))||c.push(l):this.signals[t]=c=[l],l[2]&n.OneShot&&l.push(c),null===(a=(o=this.constructor).onListener)||void 0===a||a.call(o,this,t,c.indexOf(l),!0)}unlistenTo(t,e,s){var n,i;null==t?t=Object.keys(this.signals):'string'==typeof t&&(t=[t]);const r=null!=s;for(const o of t){const t=this.signals[o];if(t){for(let a=t.length-1;a>=0;a--)e&&t[a][0]!==e||r&&t[a][3]!==s||(null===(i=(n=this.constructor).onListener)||void 0===i||i.call(n,this,o,a,!1),t.splice(a,1));t[0]||delete this.signals[o]}}}isListening(t,e,s){return null==t?Object.keys(this.signals).some((t=>this.isListening(t,e,s))):!!this.signals[t]&&(!(e&&!this.signals[t].some((t=>t[0]===e)))&&!(null!=s&&!this.signals[t].some((t=>t[3]===s))))}sendSignal(t,...e){const s=this.constructor.getListenersFor?this.constructor.getListenersFor(this,t):this.signals[t];s&&c(s,e)}static onListener(t,e,s,n){}}}function u(t,e,s){const i=s&&(s.includes('first')||s.includes('first-true')),r=s&&(i||s.includes('last')),o=s&&s.includes('no-false'),a=s&&s.includes('no-null');let c=[];for(const l of t.slice()){const h=l[2]||0;if(h&n.OneShot){const e=l[4]||t,s=e.indexOf(l);-1!==s&&e.splice(s,1)}if(h&n.Deferred)setTimeout((()=>l[0](...l[1]&&e?[...e,...l[1]]:e||l[1]||[])),0);else{const t=l[0](...l[1]&&e?[...e,...l[1]]:e||l[1]||[]);if(!t&&(void 0===t||o||a&&null==t))continue;if(r?c[0]=t:c.push(t),i&&(t||!s.includes('first-true')))break}}return r?c[0]:c}class d extends(f(Object)){}function f(t){return class extends(h(t)){sendSignalAs(t,e,...s){const n='string'==typeof t?[t]:t,i=n.includes('delay')||n.includes('pre-delay'),r=n.includes('first')||n.includes('first-true'),o=n.includes('multi')||!r&&!n.includes('last');if(n.includes('await'))return new Promise((async t=>{i&&await this.afterRefresh(n.includes('delay'));const a=this.constructor.getListenersFor?this.constructor.getListenersFor(this,e):this.signals[e];if(!a)return t(o?[]:void 0);let c=(await Promise.all(u(a,s))).filter((t=>!(void 0===t||null==t&&n.includes('no-null')||!t&&n.includes('no-false'))));r&&n.includes('first-true')&&(c=c.filter((t=>t)));const l=c.length;l?r?t(o?[c[0]]:c[0]):n.includes('last')?t(o?[c[l-1]]:c[l-1]):t(c):t(o?[]:void 0)}));if(!i){const t=this.constructor.getListenersFor?this.constructor.getListenersFor(this,e):this.signals[e];return t?u(t,s,n):n.includes('last')||r?void 0:[]}(async()=>{await this.afterRefresh(n.includes('delay'));const t=this.constructor.getListenersFor?this.constructor.getListenersFor(this,e):this.signals[e];t&&(r?u(t,s,n):c(t,s))})()}afterRefresh(t=!1){return new Promise((e=>setTimeout(t&&this.awaitDelay?async()=>{await this.awaitDelay(),e()}:e,0)))}}}class g extends(y(Object)){}function y(t){return class extends t{constructor(){super(...arguments),this.dataListeners=new Map}listenToData(...t){var e;let s=1;const n=t.length,i='boolean'==typeof t[n-s]&&t[n-s++],r='object'==typeof t[0],o=r?t[0]:Array.isArray(t[n-s])?null===(e=t[n-s++])||void 0===e?void 0:e.slice():void 0,a=r?Object.keys(t[0]):t.slice(0,n-s),c=t[n-s];this.dataListeners.set(c,[o,...a]),i&&c(...this.getDataArgsBy(a,o))}unlistenToData(t){return!!this.dataListeners.has(t)&&(this.dataListeners.delete(t),!0)}getInData(t,e=void 0){}setInData(t,e,s,n){}getDataArgsBy(t,e){return e?Array.isArray(e)?t.map(((t,s)=>this.getInData(t,e[s]))):[t.reduce(((t,s)=>(t[s]=this.getInData(s,e[s]),t)),{})]:t.map(((t,e)=>this.getInData(t)))}callDataBy(t=!0,e){if(e||!this.constructor.callDataListenersFor)for(const[e,[s,...n]]of this.dataListeners.entries())(!0===t||t.some((t=>n.some((e=>e===t||e.startsWith(t+'.')||t.startsWith(e+'.'))))))&&e(...this.getDataArgsBy(n,s));else this.constructor.callDataListenersFor(this,t)}}}var p=(t,e)=>{var s={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(s[n]=t[n]);if(null!=t&&'function'==typeof Object.getOwnPropertySymbols){var i=0;for(n=Object.getOwnPropertySymbols(t);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(t,n[i])&&(s[n[i]]=t[n[i]])}return s};class v extends(x(Object)){}function x(t){return class extends(y(t)){constructor(...t){super(...t.slice(1)),this.dataListeners=new Map,this.dataKeysPending=null,this.data=t[0]||{}}getData(){return this.data}getInData(t,e){if(!this.data)return e;if(!t)return this.data;const s=t.split('.');let n=this.data;for(const t of s){if(!n)return e;n=n[t]}return void 0===n?e:n}setData(t,e=!0,s=!0,n){this.data=!1!==e?Object.assign(Object.assign({},this.data),t):t,s?this.refreshData(!0,n):this.addRefreshKeys(!0)}setInData(t,e,s=!0,n=!0,i){var r,o,a;if(this.data){if(t){const n=t.split('.'),i=n.pop();if(!i)return;let c=(r=this.data,this.data=p(r,[]),r);for(const t of n)c=c[t]=(null===(o=c[t])||void 0===o?void 0:o.constructor)===Object?Object.assign({},c[t]):c[t]||{};c[i]=s&&(null===(a=c[i])||void 0===a?void 0:a.constructor)===Object?Object.assign(Object.assign({},c[i]),e):e}else this.data=s&&this.data?Object.assign(Object.assign({},this.data),e):e;n?this.refreshData(t||!0,i):this.addRefreshKeys(t||!0)}}refreshData(t,e){if(t&&this.addRefreshKeys(t),null!=e)return void setTimeout((()=>this.refreshData(null)),e);const s=this.dataKeysPending;this.dataKeysPending=null,s&&this.callDataBy(s)}addRefreshKeys(t){if(!0===t)this.dataKeysPending=!0;else if(t&&!0!==this.dataKeysPending)if('string'==typeof t&&(t=[t]),this.dataKeysPending)for(const e of t)this.dataKeysPending.some((t=>t===e||e.startsWith(t+'.')))||this.dataKeysPending.push(e);else this.dataKeysPending=[...t]}}}class D extends l{constructor(...t){super(),this.promise=Promise.resolve(),this.state='',this.pending={},this.autoPending=t[0]||{}}start(t,e){return this.state?('waiting'===this.state&&void 0!==e&&this.extend(e),this.promise):(this.state='waiting',this.promise=new Promise((t=>this._resolvePromise=()=>{delete this._resolvePromise,t()})),void 0!==t&&this.extend(t),this.sendSignal('onStart'),this.promise)}update(t,e,s){t&&this.absorb(t),this.state?void 0!==s&&this.extend(s):this.start(void 0===s?e:s)}absorb(t){for(const e in t)switch(this.autoPending[e]||''){case'set':{const s=this.pending[e]||(this.pending[e]=new Set);for(const n of t[e])s.add(n);break}case'array':{const s=this.pending[e]||(this.pending[e]=[]);for(const n of t[e])s.push(n);break}case'object':this.pending[e]=Object.assign(Object.assign({},this.pending[e]),t[e]);break;default:this.pending[e]=t[e]}}eject(t){for(const e in t)if(void 0!==this.pending[e])switch(this.autoPending[e]||''){case'set':{const s=this.pending[e];for(const n of t[e])s.delete(n);break}case'array':{const s=this.pending[e]||(this.pending[e]=[]);for(const n of t[e]){const t=s.indexOf(n);-1!==t&&s.splice(t,1)}break}case'object':{const s=this.pending[e]=Object.assign({},this.pending[e]);for(const e in t)delete s[e];break}default:delete this.pending[e]}else delete this.pending[e]}extend(t){null===t?this.resolve():'resolving'!==this.state&&(void 0!==this.timer&&(clearTimeout(this.timer),delete this.timer),void 0!==t&&(this.timer=setTimeout((()=>{delete this.timer,this.resolve()}),t)))}resolve(){if('waiting'!==this.state)return;this.constructor.flushCycle(this);const t=this.pending;this.pending={},this.sendSignal('onRefresh',t),this.sendSignal('onFinish',!1)}reject(){'waiting'===this.state&&(this.pending={},this.constructor.flushCycle(this),this.sendSignal('onFinish',!0))}static flushCycle(t){var e;t.state='resolving',void 0!==t.timer&&(clearTimeout(t.timer),delete t.timer),t._resolvePromise&&(t.sendSignal('onResolve'),null===(e=t._resolvePromise)||void 0===e||e.call(t)),t.state=''}}class b extends(x(f(Object))){constructor(t,e){super(t),this.settings=this.constructor.getDefaultSettings(),this.contextAPIs=new Map,this.preDelayCycle=new D,this.delayCycle=new D,e&&this.modifySettings(e),this.constructor.initializeCyclesFor(this)}modifySettings(t){var e;const s=this.constructor.getDefaultSettings();for(const n in t)this.settings[n]=void 0!==t[n]?t[n]:null!==(e=this.settings[n])&&void 0!==e?e:s[n]}getListenersFor(t){let e=this.signals[t]||[];for(const[s,n]of this.contextAPIs)for(const i of n){const n=s.constructor.getListenersFor?s.constructor.getListenersFor(s,i+'.'+t):s.signals[i+'.'+t];n&&(e=e.concat(n))}return e[0]&&e}triggerRefresh(t){this.preDelayCycle.start(this.settings.refreshTimeout,t)}afterRefresh(t=!1,e){return t?this.delayCycle.start(void 0,e):this.preDelayCycle.start(this.settings.refreshTimeout,e)}async awaitDelay(){const t=new Set;for(const e of this.contextAPIs.keys())t.add(e.afterRefresh(!0));await Promise.all(t)}refreshData(t,e){t&&this.addRefreshKeys(t),this.triggerRefresh(e)}static getDefaultSettings(){return{refreshTimeout:0}}static initializeCyclesFor(t){t.preDelayCycle.listenTo('onRefresh',(()=>t.constructor.runPreDelayFor(t))),t.delayCycle.listenTo('onRefresh',(()=>t.constructor.runDelayFor(t))),t.preDelayCycle.listenTo('onFinish',(()=>{t.delayCycle.start(),'waiting'===t.delayCycle.state&&(t.awaitDelay?t.awaitDelay().then((()=>t.delayCycle.resolve())):t.delayCycle.resolve())})),t.delayCycle.listenTo('onStart',(()=>t.preDelayCycle.start())),t.delayCycle.listenTo('onResolve',(()=>t.preDelayCycle.resolve()))}static runPreDelayFor(t){const e=t.dataKeysPending;if(t.dataKeysPending=null,e){for(const[s,[n,...i]]of t.dataListeners.entries())(!0===e||e.some((t=>i.some((e=>e===t||e.startsWith(t+'.')||t.startsWith(e+'.'))))))&&s(...t.getDataArgsBy(i,n));for(const[s,n]of t.contextAPIs.entries())s.callDataBy(!0===e?n:n.reduce(((t,s)=>t.concat(e.map((t=>t?s+'.'+t:s)))),[]))}}static runDelayFor(t){}}class m extends(y(f(Object))){constructor(t){super(),this.contexts=Object.assign({},t),this.dataListeners=new Map}afterRefresh(t=!1,e){return this.awaitDelay?this.awaitDelay():Promise.resolve()}sendSignal(t,...e){var s;const n=t.indexOf('.');-1!==n&&(null===(s=this.getContext(t.slice(0,n)))||void 0===s||s.sendSignal(t.slice(n+1),...e))}sendSignalAs(t,e,...s){const n=e.indexOf('.'),i=-1===n?null:this.getContext(e.slice(0,n));if(i)return i.sendSignalAs(t,e.slice(n+1),...s);const r='string'==typeof t?[t]:t,o=r.includes('last')||r.includes('first')||r.includes('first-true')?void 0:[];return r.includes('await')?Promise.resolve(o):o}getInData(t,e=void 0){const s=t.indexOf('.'),n=this.getContext(-1===s?t:t.slice(0,s));return n?-1===s?n.getData():n.getInData(t.slice(s+1),e):e}setInData(t,e,s,n,i){const r=t.indexOf('.'),o=this.getContext(-1===r?t:t.slice(0,r));o&&(-1===r?o.setData(e,s,n,i):o.setInData(t.slice(r+1),e,s,n,i))}refreshData(t,e){var s,n;const i={};for(const e of'string'==typeof t?[t]:t){const t=e.indexOf('.'),n=-1===t?e:e.slice(0,t);void 0!==i[n]&&(i[n]=this.getContext(n)),null===(s=i[n])||void 0===s||s.addRefreshKeys(-1===t||e.slice(n.length+1))}for(const t in i)null===(n=i[t])||void 0===n||n.refreshData(null,e)}refreshDataBy(t,e){const s=this.getContexts(t);for(const n in s){const i=s[n];i&&i.refreshData(t[n],e)}}getContext(t){return this.contexts[t]}getContexts(t,e=!1){if(!t)return Object.assign({},this.contexts);const s=t.constructor===Set?t:t.constructor===Array?new Set(t):new Set(Object.keys(t)),n={};for(const t in this.contexts)!s.has(t)||void 0===this.contexts[t]||e&&null===this.contexts[t]||(n[t]=this.contexts[t]);return n}newContext(t,e,s=!0){const n=new b(t);return e&&this.setContext(e,n,s),n}newContexts(t,e=!1,s=!0){const n={};for(const e in t)n[e]=new b(t[e]);return e&&this.setContexts(n,s),n}setContext(t,e,s=!0){const n=this.contexts[t];if(n===e)return!1;if(n){const e=n.contextAPIs.get(this);if(e){const s=e.filter((e=>e!==t));s.length?n.contextAPIs.set(this,s):n.contextAPIs.delete(this)}}if(e){const s=e.contextAPIs.get(this)||[];s.includes(t)||s.push(t),e.contextAPIs.set(this,s)}return void 0!==e?this.contexts[t]=e:delete this.contexts[t],s&&this.callDataBy([t]),!0}setContexts(t,e=!0){let s=!1;for(const e in t)s=this.setContext(e,t[e],!1)||s;return e&&s&&this.callDataBy(Object.keys(t)),s}static parseContextDataKey(t){const e=t.indexOf('.');return-1===e?[t,'']:[t.slice(0,e),t.slice(e+1)]}static readContextNamesFrom(t){return t.reduce(((t,e)=>{const s=e.indexOf('.'),n=-1===s?e:e.slice(0,s);return n&&!t.includes(n)&&t.push(n),t}),[])}static readContextDictionaryFrom(t){const e={};for(const s of t){const[t,n]=m.parseContextDataKey(s);!0!==e[t]&&(n?(e[t]||(e[t]=[])).push(n):e[t]=!0)}return e}}export{s as CompareDataDepthEnum,b as Context,m as ContextAPI,g as DataBoy,v as DataMan,D as RefreshCycle,l as SignalBoy,n as SignalListenerFlags,d as SignalMan,t as areEqual,u as askListeners,c as callListeners,a as createCachedSource,r as createDataMemo,o as createDataSource,i as createDataTrigger,e as deepCopy,y as mixinDataBoy,x as mixinDataMan,h as mixinSignalBoy,f as mixinSignalMan};
