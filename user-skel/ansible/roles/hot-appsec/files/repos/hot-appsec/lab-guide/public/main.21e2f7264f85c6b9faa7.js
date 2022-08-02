(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"/eoE":function(t,e,n){"use strict";function r(t){return"function"==typeof t}n.r(e);let s=!1;const i={Promise:void 0,set useDeprecatedSynchronousErrorHandling(t){if(t){const t=new Error;console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n"+t.stack)}else s&&console.log("RxJS: Back to a better error behavior. Thank you. <3");s=t},get useDeprecatedSynchronousErrorHandling(){return s}};function o(t){setTimeout(()=>{throw t},0)}const a={closed:!0,next(t){},error(t){if(i.useDeprecatedSynchronousErrorHandling)throw t;o(t)},complete(){}},l=(()=>Array.isArray||(t=>t&&"number"==typeof t.length))();function c(t){return null!==t&&"object"==typeof t}const u=(()=>{function t(t){return Error.call(this),this.message=t?`${t.length} errors occurred during unsubscription:\n${t.map((t,e)=>`${e+1}) ${t.toString()}`).join("\n  ")}`:"",this.name="UnsubscriptionError",this.errors=t,this}return t.prototype=Object.create(Error.prototype),t})();let h=(()=>{class t{constructor(t){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,t&&(this._unsubscribe=t)}unsubscribe(){let e;if(this.closed)return;let{_parentOrParents:n,_unsubscribe:s,_subscriptions:i}=this;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,n instanceof t)n.remove(this);else if(null!==n)for(let t=0;t<n.length;++t)n[t].remove(this);if(r(s))try{s.call(this)}catch(o){e=o instanceof u?d(o.errors):[o]}if(l(i)){let t=-1,n=i.length;for(;++t<n;){const n=i[t];if(c(n))try{n.unsubscribe()}catch(o){e=e||[],o instanceof u?e=e.concat(d(o.errors)):e.push(o)}}}if(e)throw new u(e)}add(e){let n=e;if(!e)return t.EMPTY;switch(typeof e){case"function":n=new t(e);case"object":if(n===this||n.closed||"function"!=typeof n.unsubscribe)return n;if(this.closed)return n.unsubscribe(),n;if(!(n instanceof t)){const e=n;n=new t,n._subscriptions=[e]}break;default:throw new Error("unrecognized teardown "+e+" added to Subscription.")}let{_parentOrParents:r}=n;if(null===r)n._parentOrParents=this;else if(r instanceof t){if(r===this)return n;n._parentOrParents=[r,this]}else{if(-1!==r.indexOf(this))return n;r.push(this)}const s=this._subscriptions;return null===s?this._subscriptions=[n]:s.push(n),n}remove(t){const e=this._subscriptions;if(e){const n=e.indexOf(t);-1!==n&&e.splice(n,1)}}}return t.EMPTY=function(t){return t.closed=!0,t}(new t),t})();function d(t){return t.reduce((t,e)=>t.concat(e instanceof u?e.errors:e),[])}const f=(()=>"function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random())();class p extends h{constructor(t,e,n){switch(super(),this.syncErrorValue=null,this.syncErrorThrown=!1,this.syncErrorThrowable=!1,this.isStopped=!1,arguments.length){case 0:this.destination=a;break;case 1:if(!t){this.destination=a;break}if("object"==typeof t){t instanceof p?(this.syncErrorThrowable=t.syncErrorThrowable,this.destination=t,t.add(this)):(this.syncErrorThrowable=!0,this.destination=new m(this,t));break}default:this.syncErrorThrowable=!0,this.destination=new m(this,t,e,n)}}[f](){return this}static create(t,e,n){const r=new p(t,e,n);return r.syncErrorThrowable=!1,r}next(t){this.isStopped||this._next(t)}error(t){this.isStopped||(this.isStopped=!0,this._error(t))}complete(){this.isStopped||(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe())}_next(t){this.destination.next(t)}_error(t){this.destination.error(t),this.unsubscribe()}_complete(){this.destination.complete(),this.unsubscribe()}_unsubscribeAndRecycle(){const{_parentOrParents:t}=this;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=t,this}}class m extends p{constructor(t,e,n,s){let i;super(),this._parentSubscriber=t;let o=this;r(e)?i=e:e&&(i=e.next,n=e.error,s=e.complete,e!==a&&(o=Object.create(e),r(o.unsubscribe)&&this.add(o.unsubscribe.bind(o)),o.unsubscribe=this.unsubscribe.bind(this))),this._context=o,this._next=i,this._error=n,this._complete=s}next(t){if(!this.isStopped&&this._next){const{_parentSubscriber:e}=this;i.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?this.__tryOrSetError(e,this._next,t)&&this.unsubscribe():this.__tryOrUnsub(this._next,t)}}error(t){if(!this.isStopped){const{_parentSubscriber:e}=this,{useDeprecatedSynchronousErrorHandling:n}=i;if(this._error)n&&e.syncErrorThrowable?(this.__tryOrSetError(e,this._error,t),this.unsubscribe()):(this.__tryOrUnsub(this._error,t),this.unsubscribe());else if(e.syncErrorThrowable)n?(e.syncErrorValue=t,e.syncErrorThrown=!0):o(t),this.unsubscribe();else{if(this.unsubscribe(),n)throw t;o(t)}}}complete(){if(!this.isStopped){const{_parentSubscriber:t}=this;if(this._complete){const e=()=>this._complete.call(this._context);i.useDeprecatedSynchronousErrorHandling&&t.syncErrorThrowable?(this.__tryOrSetError(t,e),this.unsubscribe()):(this.__tryOrUnsub(e),this.unsubscribe())}else this.unsubscribe()}}__tryOrUnsub(t,e){try{t.call(this._context,e)}catch(n){if(this.unsubscribe(),i.useDeprecatedSynchronousErrorHandling)throw n;o(n)}}__tryOrSetError(t,e,n){if(!i.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{e.call(this._context,n)}catch(r){return i.useDeprecatedSynchronousErrorHandling?(t.syncErrorValue=r,t.syncErrorThrown=!0,!0):(o(r),!0)}return!1}_unsubscribe(){const{_parentSubscriber:t}=this;this._context=null,this._parentSubscriber=null,t.unsubscribe()}}const g=(()=>"function"==typeof Symbol&&Symbol.observable||"@@observable")();function y(t){return t}let _=(()=>{class t{constructor(t){this._isScalar=!1,t&&(this._subscribe=t)}lift(e){const n=new t;return n.source=this,n.operator=e,n}subscribe(t,e,n){const{operator:r}=this,s=function(t,e,n){if(t){if(t instanceof p)return t;if(t[f])return t[f]()}return t||e||n?new p(t,e,n):new p(a)}(t,e,n);if(s.add(r?r.call(s,this.source):this.source||i.useDeprecatedSynchronousErrorHandling&&!s.syncErrorThrowable?this._subscribe(s):this._trySubscribe(s)),i.useDeprecatedSynchronousErrorHandling&&s.syncErrorThrowable&&(s.syncErrorThrowable=!1,s.syncErrorThrown))throw s.syncErrorValue;return s}_trySubscribe(t){try{return this._subscribe(t)}catch(e){i.useDeprecatedSynchronousErrorHandling&&(t.syncErrorThrown=!0,t.syncErrorValue=e),function(t){for(;t;){const{closed:e,destination:n,isStopped:r}=t;if(e||r)return!1;t=n&&n instanceof p?n:null}return!0}(t)?t.error(e):console.warn(e)}}forEach(t,e){return new(e=b(e))((e,n)=>{let r;r=this.subscribe(e=>{try{t(e)}catch(s){n(s),r&&r.unsubscribe()}},n,e)})}_subscribe(t){const{source:e}=this;return e&&e.subscribe(t)}[g](){return this}pipe(...t){return 0===t.length?this:(0===(e=t).length?y:1===e.length?e[0]:function(t){return e.reduce((t,e)=>e(t),t)})(this);var e}toPromise(t){return new(t=b(t))((t,e)=>{let n;this.subscribe(t=>n=t,t=>e(t),()=>t(n))})}}return t.create=e=>new t(e),t})();function b(t){if(t||(t=i.Promise||Promise),!t)throw new Error("no Promise impl found");return t}const v=(()=>{function t(){return Error.call(this),this.message="object unsubscribed",this.name="ObjectUnsubscribedError",this}return t.prototype=Object.create(Error.prototype),t})();class w extends h{constructor(t,e){super(),this.subject=t,this.subscriber=e,this.closed=!1}unsubscribe(){if(this.closed)return;this.closed=!0;const t=this.subject,e=t.observers;if(this.subject=null,!e||0===e.length||t.isStopped||t.closed)return;const n=e.indexOf(this.subscriber);-1!==n&&e.splice(n,1)}}class C extends p{constructor(t){super(t),this.destination=t}}let x=(()=>{class t extends _{constructor(){super(),this.observers=[],this.closed=!1,this.isStopped=!1,this.hasError=!1,this.thrownError=null}[f](){return new C(this)}lift(t){const e=new E(this,this);return e.operator=t,e}next(t){if(this.closed)throw new v;if(!this.isStopped){const{observers:e}=this,n=e.length,r=e.slice();for(let s=0;s<n;s++)r[s].next(t)}}error(t){if(this.closed)throw new v;this.hasError=!0,this.thrownError=t,this.isStopped=!0;const{observers:e}=this,n=e.length,r=e.slice();for(let s=0;s<n;s++)r[s].error(t);this.observers.length=0}complete(){if(this.closed)throw new v;this.isStopped=!0;const{observers:t}=this,e=t.length,n=t.slice();for(let r=0;r<e;r++)n[r].complete();this.observers.length=0}unsubscribe(){this.isStopped=!0,this.closed=!0,this.observers=null}_trySubscribe(t){if(this.closed)throw new v;return super._trySubscribe(t)}_subscribe(t){if(this.closed)throw new v;return this.hasError?(t.error(this.thrownError),h.EMPTY):this.isStopped?(t.complete(),h.EMPTY):(this.observers.push(t),new w(this,t))}asObservable(){const t=new _;return t.source=this,t}}return t.create=(t,e)=>new E(t,e),t})();class E extends x{constructor(t,e){super(),this.destination=t,this.source=e}next(t){const{destination:e}=this;e&&e.next&&e.next(t)}error(t){const{destination:e}=this;e&&e.error&&this.destination.error(t)}complete(){const{destination:t}=this;t&&t.complete&&this.destination.complete()}_subscribe(t){const{source:e}=this;return e?this.source.subscribe(t):h.EMPTY}}function T(t){return t&&"function"==typeof t.schedule}class k extends p{constructor(t,e,n){super(),this.parent=t,this.outerValue=e,this.outerIndex=n,this.index=0}_next(t){this.parent.notifyNext(this.outerValue,t,this.outerIndex,this.index++,this)}_error(t){this.parent.notifyError(t,this),this.unsubscribe()}_complete(){this.parent.notifyComplete(this),this.unsubscribe()}}const I=t=>e=>{for(let n=0,r=t.length;n<r&&!e.closed;n++)e.next(t[n]);e.complete()};function A(){return"function"==typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator"}const S=A();const O=t=>{if(t&&"function"==typeof t[g])return i=t,t=>{const e=i[g]();if("function"!=typeof e.subscribe)throw new TypeError("Provided object does not correctly implement Symbol.observable");return e.subscribe(t)};if((e=t)&&"number"==typeof e.length&&"function"!=typeof e)return I(t);var e,n,r,s,i;if((n=t)&&"function"!=typeof n.subscribe&&"function"==typeof n.then)return s=t,t=>(s.then(e=>{t.closed||(t.next(e),t.complete())},e=>t.error(e)).then(null,o),t);if(t&&"function"==typeof t[S])return r=t,t=>{const e=r[S]();for(;;){const n=e.next();if(n.done){t.complete();break}if(t.next(n.value),t.closed)break}return"function"==typeof e.return&&t.add(()=>{e.return&&e.return()}),t};{const e=c(t)?"an invalid object":`'${t}'`;throw new TypeError(`You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`)}};class R extends p{notifyNext(t,e,n,r,s){this.destination.next(e)}notifyError(t,e){this.destination.error(t)}notifyComplete(t){this.destination.complete()}}function D(t,e){return function(n){if("function"!=typeof t)throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");return n.lift(new N(t,e))}}class N{constructor(t,e){this.project=t,this.thisArg=e}call(t,e){return e.subscribe(new P(t,this.project,this.thisArg))}}class P extends p{constructor(t,e,n){super(t),this.project=e,this.count=0,this.thisArg=n||this}_next(t){let e;try{e=this.project.call(this.thisArg,t,this.count++)}catch(n){return void this.destination.error(n)}this.destination.next(e)}}function M(t,e){return new _(n=>{const r=new h;let s=0;return r.add(e.schedule(function(){s!==t.length?(n.next(t[s++]),n.closed||r.add(this.schedule())):n.complete()})),r})}function j(t,e,n=Number.POSITIVE_INFINITY){return"function"==typeof e?r=>r.pipe(j((n,r)=>{return(s=t(n,r),s instanceof _?s:new _(O(s))).pipe(D((t,s)=>e(n,t,r,s)));var s},n)):("number"==typeof e&&(n=e),e=>e.lift(new F(t,n)))}class F{constructor(t,e=Number.POSITIVE_INFINITY){this.project=t,this.concurrent=e}call(t,e){return e.subscribe(new L(t,this.project,this.concurrent))}}class L extends R{constructor(t,e,n=Number.POSITIVE_INFINITY){super(t),this.project=e,this.concurrent=n,this.hasCompleted=!1,this.buffer=[],this.active=0,this.index=0}_next(t){this.active<this.concurrent?this._tryNext(t):this.buffer.push(t)}_tryNext(t){let e;const n=this.index++;try{e=this.project(t,n)}catch(r){return void this.destination.error(r)}this.active++,this._innerSub(e,t,n)}_innerSub(t,e,n){const r=new k(this,e,n),s=this.destination;s.add(r);const i=function(t,e,n,r,s=new k(t,n,r)){if(!s.closed)return e instanceof _?e.subscribe(s):O(e)(s)}(this,t,void 0,void 0,r);i!==r&&s.add(i)}_complete(){this.hasCompleted=!0,0===this.active&&0===this.buffer.length&&this.destination.complete(),this.unsubscribe()}notifyNext(t,e,n,r,s){this.destination.next(e)}notifyComplete(t){const e=this.buffer;this.remove(t),this.active--,e.length>0?this._next(e.shift()):0===this.active&&this.hasCompleted&&this.destination.complete()}}function H(t,e){return e?M(t,e):new _(I(t))}function V(){return function(t){return t.lift(new B(t))}}class B{constructor(t){this.connectable=t}call(t,e){const{connectable:n}=this;n._refCount++;const r=new z(t,n),s=e.subscribe(r);return r.closed||(r.connection=n.connect()),s}}class z extends p{constructor(t,e){super(t),this.connectable=e}_unsubscribe(){const{connectable:t}=this;if(!t)return void(this.connection=null);this.connectable=null;const e=t._refCount;if(e<=0)return void(this.connection=null);if(t._refCount=e-1,e>1)return void(this.connection=null);const{connection:n}=this,r=t._connection;this.connection=null,!r||n&&r!==n||r.unsubscribe()}}class $ extends _{constructor(t,e){super(),this.source=t,this.subjectFactory=e,this._refCount=0,this._isComplete=!1}_subscribe(t){return this.getSubject().subscribe(t)}getSubject(){const t=this._subject;return t&&!t.isStopped||(this._subject=this.subjectFactory()),this._subject}connect(){let t=this._connection;return t||(this._isComplete=!1,t=this._connection=new h,t.add(this.source.subscribe(new q(this.getSubject(),this))),t.closed&&(this._connection=null,t=h.EMPTY)),t}refCount(){return V()(this)}}const U=(()=>{const t=$.prototype;return{operator:{value:null},_refCount:{value:0,writable:!0},_subject:{value:null,writable:!0},_connection:{value:null,writable:!0},_subscribe:{value:t._subscribe},_isComplete:{value:t._isComplete,writable:!0},getSubject:{value:t.getSubject},connect:{value:t.connect},refCount:{value:t.refCount}}})();class q extends C{constructor(t,e){super(t),this.connectable=e}_error(t){this._unsubscribe(),super._error(t)}_complete(){this.connectable._isComplete=!0,this._unsubscribe(),super._complete()}_unsubscribe(){const t=this.connectable;if(t){this.connectable=null;const e=t._connection;t._refCount=0,t._subject=null,t._connection=null,e&&e.unsubscribe()}}}function Z(){return new x}
/**
 * @license Angular v11.2.0
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function W(t){for(let e in t)if(t[e]===W)return e;throw Error("Could not find renamed property on target object.")}function G(t,e){for(const n in e)e.hasOwnProperty(n)&&!t.hasOwnProperty(n)&&(t[n]=e[n])}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Q(t){if("string"==typeof t)return t;if(Array.isArray(t))return"["+t.map(Q).join(", ")+"]";if(null==t)return""+t;if(t.overriddenName)return`${t.overriddenName}`;if(t.name)return`${t.name}`;const e=t.toString();if(null==e)return""+e;const n=e.indexOf("\n");return-1===n?e:e.substring(0,n)}function K(t,e){return null==t||""===t?null===e?"":e:null==e||""===e?t:t+" "+e}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */const J=W({__forward_ref__:W});function Y(t){return t.__forward_ref__=Y,t.toString=function(){return Q(this())},t}function X(t){return"function"==typeof(e=t)&&e.hasOwnProperty(J)&&e.__forward_ref__===Y?t():t;var e;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function tt(t){return{token:t.token,providedIn:t.providedIn||null,factory:t.factory,value:void 0}}function et(t){return{factory:t.factory,providers:t.providers||[],imports:t.imports||[]}}function nt(t){return rt(t,it)||rt(t,at)}function rt(t,e){return t.hasOwnProperty(e)?t[e]:null}function st(t){return t&&(t.hasOwnProperty(ot)||t.hasOwnProperty(lt))?t[ot]:null}const it=W({"\u0275prov":W}),ot=W({"\u0275inj":W}),at=W({ngInjectableDef:W}),lt=W({ngInjectorDef:W});
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ct=function(t){return t[t.Default=0]="Default",t[t.Host=1]="Host",t[t.Self=2]="Self",t[t.SkipSelf=4]="SkipSelf",t[t.Optional=8]="Optional",t}({});
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */let ut;function ht(t){const e=ut;return ut=t,e}function dt(t,e,n){const r=nt(t);if(r&&"root"==r.providedIn)return void 0===r.value?r.value=r.factory():r.value;if(n&ct.Optional)return null;if(void 0!==e)return e;throw new Error(`Injector: NOT_FOUND [${Q(t)}]`)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function ft(t){return{toString:t}.toString()}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */var pt=function(t){return t[t.OnPush=0]="OnPush",t[t.Default=1]="Default",t}({}),mt=function(t){return t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom",t}({});
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const gt="undefined"!=typeof globalThis&&globalThis,yt="undefined"!=typeof window&&window,_t="undefined"!=typeof self&&"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&self,bt="undefined"!=typeof global&&global,vt=gt||bt||yt||_t,wt={},Ct=[],xt=W({"\u0275cmp":W}),Et=W({"\u0275dir":W}),Tt=W({"\u0275pipe":W}),kt=W({"\u0275mod":W}),It=W({"\u0275loc":W}),At=W({"\u0275fac":W}),St=W({__NG_ELEMENT_ID__:W});
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let Ot=0;function Rt(t){return ft(()=>{const e={},n={type:t.type,providersResolver:null,decls:t.decls,vars:t.vars,factory:null,template:t.template||null,consts:t.consts||null,ngContentSelectors:t.ngContentSelectors,hostBindings:t.hostBindings||null,hostVars:t.hostVars||0,hostAttrs:t.hostAttrs||null,contentQueries:t.contentQueries||null,declaredInputs:e,inputs:null,outputs:null,exportAs:t.exportAs||null,onPush:t.changeDetection===pt.OnPush,directiveDefs:null,pipeDefs:null,selectors:t.selectors||Ct,viewQuery:t.viewQuery||null,features:t.features||null,data:t.data||{},encapsulation:t.encapsulation||mt.Emulated,id:"c",styles:t.styles||Ct,_:null,setInput:null,schemas:t.schemas||null,tView:null},r=t.directives,s=t.features,i=t.pipes;return n.id+=Ot++,n.inputs=jt(t.inputs,e),n.outputs=jt(t.outputs),s&&s.forEach(t=>t(n)),n.directiveDefs=r?()=>("function"==typeof r?r():r).map(Dt):null,n.pipeDefs=i?()=>("function"==typeof i?i():i).map(Nt):null,n})}function Dt(t){return Lt(t)||function(t){return t[Et]||null}(t)}function Nt(t){return function(t){return t[Tt]||null}(t)}const Pt={};function Mt(t){const e={type:t.type,bootstrap:t.bootstrap||Ct,declarations:t.declarations||Ct,imports:t.imports||Ct,exports:t.exports||Ct,transitiveCompileScopes:null,schemas:t.schemas||null,id:t.id||null};return null!=t.id&&ft(()=>{Pt[t.id]=t.type}),e}function jt(t,e){if(null==t)return wt;const n={};for(const r in t)if(t.hasOwnProperty(r)){let s=t[r],i=s;Array.isArray(s)&&(i=s[1],s=s[0]),n[s]=r,e&&(e[s]=i)}return n}const Ft=Rt;function Lt(t){return t[xt]||null}function Ht(t,e){const n=t[kt]||null;if(!n&&!0===e)throw new Error(`Type ${Q(t)} does not have '\u0275mod' property.`);return n}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Vt=20,Bt=10;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function zt(t){return Array.isArray(t)&&"object"==typeof t[1]}function $t(t){return Array.isArray(t)&&!0===t[1]}function Ut(t){return 0!=(8&t.flags)}function qt(t){return 2==(2&t.flags)}function Zt(t){return 1==(1&t.flags)}function Wt(t){return null!==t.template}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function Gt(t,e){return t.hasOwnProperty(At)?t[At]:null}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class Qt extends Error{constructor(t,e){super(function(t,e){return`${t?`NG0${t}: `:""}${e}`}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */(t,e)),this.code=t}}function Kt(t){return"string"==typeof t?t:null==t?"":String(t)}function Jt(t){return"function"==typeof t?t.name||t.toString():"object"==typeof t&&null!=t&&"function"==typeof t.type?t.type.name||t.type.toString():Kt(t)}function Yt(t,e){const n=e?` in ${e}`:"";throw new Qt("201",`No provider for ${Jt(t)} found${n}`)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class Xt{constructor(t,e,n){this.previousValue=t,this.currentValue=e,this.firstChange=n}isFirstChange(){return this.firstChange}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function te(){const t=ne(this),e=null==t?void 0:t.current;if(e){const n=t.previous;if(n===wt)t.previous=e;else for(let t in e)n[t]=e[t];t.current=null,this.ngOnChanges(e)}}function ee(t,e,n,r){const s=ne(t)||function(t,e){return t.__ngSimpleChanges__=e}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */(t,{previous:wt,current:null}),i=s.current||(s.current={}),o=s.previous,a=this.declaredInputs[n],l=o[a];i[a]=new Xt(l&&l.currentValue,e,o===wt),t[r]=e}function ne(t){return t.__ngSimpleChanges__||null}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let re;function se(){return void 0!==re?re:"undefined"!=typeof document?document:void 0}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function ie(t){return!!t.listen}const oe={createRenderer:(t,e)=>se()};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function ae(t){for(;Array.isArray(t);)t=t[0];return t}function le(t,e){return ae(e[t])}function ce(t,e){return ae(e[t.index])}function ue(t,e){return t.data[e]}function he(t,e){const n=e[t];return zt(n)?n:n[0]}function de(t){const e=function(t){return t.__ngContext__||null}(t);return e?Array.isArray(e)?e:e.lView:null}function fe(t){return 4==(4&t[2])}function pe(t){return 128==(128&t[2])}function me(t,e){return null==e?null:t[e]}function ge(t){t[18]=0}function ye(t,e){t[5]+=e;let n=t,r=t[3];for(;null!==r&&(1===e&&1===n[5]||-1===e&&0===n[5]);)r[5]+=e,n=r,r=r[3]}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */const _e={lFrame:He(null),bindingsEnabled:!0,isInCheckNoChangesMode:!1};function be(){return _e.bindingsEnabled}function ve(){return _e.lFrame.lView}function we(){return _e.lFrame.tView}function Ce(t){_e.lFrame.contextLView=t}function xe(){let t=Ee();for(;null!==t&&64===t.type;)t=t.parent;return t}function Ee(){return _e.lFrame.currentTNode}function Te(t,e){const n=_e.lFrame;n.currentTNode=t,n.isParent=e}function ke(){return _e.lFrame.isParent}function Ie(){_e.lFrame.isParent=!1}function Ae(){return _e.isInCheckNoChangesMode}function Se(t){_e.isInCheckNoChangesMode=t}function Oe(){return _e.lFrame.bindingIndex++}function Re(t,e){const n=_e.lFrame;n.bindingIndex=n.bindingRootIndex=t,De(e)}function De(t){_e.lFrame.currentDirectiveIndex=t}function Ne(){return _e.lFrame.currentQueryIndex}function Pe(t){_e.lFrame.currentQueryIndex=t}function Me(t){const e=t[1];return 2===e.type?e.declTNode:1===e.type?t[6]:null}function je(t,e,n){if(n&ct.SkipSelf){let r=e,s=t;for(;r=r.parent,!(null!==r||n&ct.Host||(r=Me(s),null===r)||(s=s[15],10&r.type)););if(null===r)return!1;e=r,t=s}const r=_e.lFrame=Le();return r.currentTNode=e,r.lView=t,!0}function Fe(t){const e=Le(),n=t[1];_e.lFrame=e,e.currentTNode=n.firstChild,e.lView=t,e.tView=n,e.contextLView=t,e.bindingIndex=n.bindingStartIndex,e.inI18n=!1}function Le(){const t=_e.lFrame,e=null===t?null:t.child;return null===e?He(t):e}function He(t){const e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:t,child:null,inI18n:!1};return null!==t&&(t.child=e),e}function Ve(){const t=_e.lFrame;return _e.lFrame=t.parent,t.currentTNode=null,t.lView=null,t}const Be=Ve;function ze(){const t=Ve();t.isParent=!0,t.tView=null,t.selectedIndex=-1,t.contextLView=null,t.elementDepthCount=0,t.currentDirectiveIndex=-1,t.currentNamespace=null,t.bindingRootIndex=-1,t.bindingIndex=-1,t.currentQueryIndex=0}function $e(){return _e.lFrame.selectedIndex}function Ue(t){_e.lFrame.selectedIndex=t}function qe(){const t=_e.lFrame;return ue(t.tView,t.selectedIndex)}function Ze(t,e){for(let n=e.directiveStart,r=e.directiveEnd;n<r;n++){const e=t.data[n].type.prototype,{ngAfterContentInit:r,ngAfterContentChecked:s,ngAfterViewInit:i,ngAfterViewChecked:o,ngOnDestroy:a}=e;r&&(t.contentHooks||(t.contentHooks=[])).push(-n,r),s&&((t.contentHooks||(t.contentHooks=[])).push(n,s),(t.contentCheckHooks||(t.contentCheckHooks=[])).push(n,s)),i&&(t.viewHooks||(t.viewHooks=[])).push(-n,i),o&&((t.viewHooks||(t.viewHooks=[])).push(n,o),(t.viewCheckHooks||(t.viewCheckHooks=[])).push(n,o)),null!=a&&(t.destroyHooks||(t.destroyHooks=[])).push(n,a)}}function We(t,e,n){Ke(t,e,3,n)}function Ge(t,e,n,r){(3&t[2])===n&&Ke(t,e,n,r)}function Qe(t,e){let n=t[2];(3&n)===e&&(n&=2047,n+=1,t[2]=n)}function Ke(t,e,n,r){const s=null!=r?r:-1,i=e.length-1;let o=0;for(let a=void 0!==r?65535&t[18]:0;a<i;a++)if("number"==typeof e[a+1]){if(o=e[a],null!=r&&o>=r)break}else e[a]<0&&(t[18]+=65536),(o<s||-1==s)&&(Je(t,n,e,a),t[18]=(4294901760&t[18])+a+2),a++}function Je(t,e,n,r){const s=n[r]<0,i=n[r+1],o=t[s?-n[r]:n[r]];s?t[2]>>11<t[18]>>16&&(3&t[2])===e&&(t[2]+=2048,i.call(o)):i.call(o)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */const Ye=-1;class Xe{constructor(t,e,n){this.factory=t,this.resolving=!1,this.canSeeViewProviders=e,this.injectImpl=n}}function tn(t,e,n){const r=ie(t);let s=0;for(;s<n.length;){const i=n[s];if("number"==typeof i){if(0!==i)break;s++;const o=n[s++],a=n[s++],l=n[s++];r?t.setAttribute(e,a,l,o):e.setAttributeNS(o,a,l)}else{const o=i,a=n[++s];en(o)?r&&t.setProperty(e,o,a):r?t.setAttribute(e,o,a):e.setAttribute(o,a),s++}}return s}function en(t){return 64===t.charCodeAt(0)}function nn(t,e){if(null===e||0===e.length);else if(null===t||0===t.length)t=e.slice();else{let n=-1;for(let r=0;r<e.length;r++){const s=e[r];"number"==typeof s?n=s:0===n||rn(t,n,s,null,-1===n||2===n?e[++r]:null)}}return t}function rn(t,e,n,r,s){let i=0,o=t.length;if(-1===e)o=-1;else for(;i<t.length;){const n=t[i++];if("number"==typeof n){if(n===e){o=-1;break}if(n>e){o=i-1;break}}}for(;i<t.length;){const e=t[i];if("number"==typeof e)break;if(e===n){if(null===r)return void(null!==s&&(t[i+1]=s));if(r===t[i+1])return void(t[i+2]=s)}i++,null!==r&&i++,null!==s&&i++}-1!==o&&(t.splice(o,0,e),i=o+1),t.splice(i++,0,n),null!==r&&t.splice(i++,0,r),null!==s&&t.splice(i++,0,s)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function sn(t){return t!==Ye}function on(t){return 32767&t}function an(t,e){let n=t>>16,r=e;for(;n>0;)r=r[15],n--;return r}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */let ln=!0;function cn(t){const e=ln;return ln=t,e}let un=0;function hn(t,e){const n=fn(t,e);if(-1!==n)return n;const r=e[1];r.firstCreatePass&&(t.injectorIndex=e.length,dn(r.data,t),dn(e,null),dn(r.blueprint,null));const s=pn(t,e),i=t.injectorIndex;if(sn(s)){const t=on(s),n=an(s,e),r=n[1].data;for(let s=0;s<8;s++)e[i+s]=n[t+s]|r[t+s]}return e[i+8]=s,i}function dn(t,e){t.push(0,0,0,0,0,0,0,0,e)}function fn(t,e){return-1===t.injectorIndex||t.parent&&t.parent.injectorIndex===t.injectorIndex||null===e[t.injectorIndex+8]?-1:t.injectorIndex}function pn(t,e){if(t.parent&&-1!==t.parent.injectorIndex)return t.parent.injectorIndex;let n=0,r=null,s=e;for(;null!==s;){const t=s[1],e=t.type;if(r=2===e?t.declTNode:1===e?s[6]:null,null===r)return Ye;if(n++,s=s[15],-1!==r.injectorIndex)return r.injectorIndex|n<<16}return Ye}function mn(t,e,n){!function(t,e,n){let r;"string"==typeof n?r=n.charCodeAt(0)||0:n.hasOwnProperty(St)&&(r=n[St]),null==r&&(r=n[St]=un++);const s=255&r;e.data[t+(s>>5)]|=1<<s}(t,e,n)}function gn(t,e,n){if(n&ct.Optional)return t;Yt(e,"NodeInjector")}function yn(t,e,n,r){if(n&ct.Optional&&void 0===r&&(r=null),0==(n&(ct.Self|ct.Host))){const s=t[9],i=ht(void 0);try{return s?s.get(e,r,n&ct.Optional):dt(e,r,n&ct.Optional)}finally{ht(i)}}return gn(r,e,n)}function _n(t,e,n,r=ct.Default,s){if(null!==t){const i=function(t){if("string"==typeof t)return t.charCodeAt(0)||0;const e=t.hasOwnProperty(St)?t[St]:void 0;return"number"==typeof e?e>=0?255&e:vn:e}(n);if("function"==typeof i){if(!je(e,t,r))return r&ct.Host?gn(s,n,r):yn(e,n,r,s);try{const t=i();if(null!=t||r&ct.Optional)return t;Yt(n)}finally{Be()}}else if("number"==typeof i){let s=null,o=fn(t,e),a=Ye,l=r&ct.Host?e[16][6]:null;for((-1===o||r&ct.SkipSelf)&&(a=-1===o?pn(t,e):e[o+8],a!==Ye&&Tn(r,!1)?(s=e[1],o=on(a),e=an(a,e)):o=-1);-1!==o;){const t=e[1];if(En(i,o,t.data)){const t=wn(o,e,n,s,r,l);if(t!==bn)return t}a=e[o+8],a!==Ye&&Tn(r,e[1].data[o+8]===l)&&En(i,o,e)?(s=t,o=on(a),e=an(a,e)):o=-1}}}return yn(e,n,r,s)}const bn={};function vn(){return new kn(xe(),ve())}function wn(t,e,n,r,s,i){const o=e[1],a=o.data[t+8],l=Cn(a,o,n,null==r?qt(a)&&ln:r!=o&&0!=(3&a.type),s&ct.Host&&i===a);return null!==l?xn(e,o,l,a):bn}function Cn(t,e,n,r,s){const i=t.providerIndexes,o=e.data,a=1048575&i,l=t.directiveStart,c=i>>20,u=s?a+c:t.directiveEnd;for(let h=r?a:a+c;h<u;h++){const t=o[h];if(h<l&&n===t||h>=l&&t.type===n)return h}if(s){const t=o[l];if(t&&Wt(t)&&t.type===n)return l}return null}function xn(t,e,n,r){let s=t[n];const i=e.data;if(s instanceof Xe){const o=s;o.resolving&&function(t,e){throw new Qt("200",`Circular dependency in DI detected for ${t}`)}(Jt(i[n]));const a=cn(o.canSeeViewProviders);o.resolving=!0;const l=o.injectImpl?ht(o.injectImpl):null;je(t,r,ct.Default);try{s=t[n]=o.factory(void 0,i,t,r),e.firstCreatePass&&n>=r.directiveStart&&
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function(t,e,n){const{ngOnChanges:r,ngOnInit:s,ngDoCheck:i}=e.type.prototype;if(r){const r=((o=e).type.prototype.ngOnChanges&&(o.setInput=ee),te);(n.preOrderHooks||(n.preOrderHooks=[])).push(t,r),(n.preOrderCheckHooks||(n.preOrderCheckHooks=[])).push(t,r)}var o;s&&(n.preOrderHooks||(n.preOrderHooks=[])).push(0-t,s),i&&((n.preOrderHooks||(n.preOrderHooks=[])).push(t,i),(n.preOrderCheckHooks||(n.preOrderCheckHooks=[])).push(t,i))}(n,i[n],e)}finally{null!==l&&ht(l),cn(a),o.resolving=!1,Be()}}return s}function En(t,e,n){return!!(n[e+(t>>5)]&1<<t)}function Tn(t,e){return!(t&ct.Self||t&ct.Host&&e)}class kn{constructor(t,e){this._tNode=t,this._lView=e}get(t,e){return _n(this._tNode,this._lView,t,void 0,e)}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const In="__parameters__";function An(t,e,n){return ft(()=>{const r=function(t){return function(...e){if(t){const n=t(...e);for(const t in n)this[t]=n[t]}}}(e);function s(...t){if(this instanceof s)return r.apply(this,t),this;const e=new s(...t);return n.annotation=e,n;function n(t,n,r){const s=t.hasOwnProperty(In)?t[In]:Object.defineProperty(t,In,{value:[]})[In];for(;s.length<=r;)s.push(null);return(s[r]=s[r]||[]).push(e),t}}return n&&(s.prototype=Object.create(n.prototype)),s.prototype.ngMetadataName=t,s.annotationCls=s,s})}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class Sn{constructor(t,e){this._desc=t,this.ngMetadataName="InjectionToken",this.\u0275prov=void 0,"number"==typeof e?this.__NG_ELEMENT_ID__=e:void 0!==e&&(this.\u0275prov=tt({token:this,providedIn:e.providedIn||"root",factory:e.factory}))}toString(){return`InjectionToken ${this._desc}`}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function On(t,e){void 0===e&&(e=t);for(let n=0;n<t.length;n++){let r=t[n];Array.isArray(r)?(e===t&&(e=t.slice(0,n)),On(r,e)):e!==t&&e.push(r)}return e}function Rn(t,e){t.forEach(t=>Array.isArray(t)?Rn(t,e):e(t))}function Dn(t,e,n){e>=t.length?t.push(n):t.splice(e,0,n)}function Nn(t,e){return e>=t.length-1?t.pop():t.splice(e,1)[0]}function Pn(t,e){const n=[];for(let r=0;r<t;r++)n.push(e);return n}function Mn(t,e,n){let r=Fn(t,e);return r>=0?t[1|r]=n:(r=~r,function(t,e,n,r){let s=t.length;if(s==e)t.push(n,r);else if(1===s)t.push(r,t[0]),t[0]=n;else{for(s--,t.push(t[s-1],t[s]);s>e;)t[s]=t[s-2],s--;t[e]=n,t[e+1]=r}}(t,r,e,n)),r}function jn(t,e){const n=Fn(t,e);if(n>=0)return t[1|n]}function Fn(t,e){return function(t,e,n){let r=0,s=t.length>>1;for(;s!==r;){const n=r+(s-r>>1),i=t[n<<1];if(e===i)return n<<1;i>e?s=n:r=n+1}return~(s<<1)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */(t,e)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Ln={},Hn=/\n/gm,Vn="__source",Bn=W({provide:String,useValue:W});let zn;function $n(t){const e=zn;return zn=t,e}function Un(t,e=ct.Default){if(void 0===zn)throw new Error("inject() must be called from an injection context");return null===zn?dt(t,void 0,e):zn.get(t,e&ct.Optional?null:void 0,e)}function qn(t,e=ct.Default){return(ut||Un)(X(t),e)}function Zn(t){const e=[];for(let n=0;n<t.length;n++){const r=X(t[n]);if(Array.isArray(r)){if(0===r.length)throw new Error("Arguments array must have arguments.");let t,n=ct.Default;for(let e=0;e<r.length;e++){const s=r[e],i=s.__NG_DI_FLAG__;"number"==typeof i?-1===i?t=s.token:n|=i:t=s}e.push(qn(t,n))}else e.push(qn(r))}return e}function Wn(t,e){return t.__NG_DI_FLAG__=e,t.prototype.__NG_DI_FLAG__=e,t}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Gn=Wn(An("Inject",t=>({token:t})),-1),Qn=Wn(An("Optional"),8),Kn=Wn(An("SkipSelf"),4);
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let Jn,Yn;function Xn(t){var e;return(null===(e=function(){if(void 0===Jn&&(Jn=null,vt.trustedTypes))try{Jn=vt.trustedTypes.createPolicy("angular",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch(e){}return Jn}())||void 0===e?void 0:e.createHTML(t))||t}function tr(t){var e;return(null===(e=function(){if(void 0===Yn&&(Yn=null,vt.trustedTypes))try{Yn=vt.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch(e){}return Yn}())||void 0===e?void 0:e.createHTML(t))||t}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class er{constructor(t){this.changingThisBreaksApplicationSecurity=t}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`}}function nr(t){return t instanceof er?t.changingThisBreaksApplicationSecurity:t}class rr{constructor(t){this.inertDocumentHelper=t}getInertBodyElement(t){t="<body><remove></remove>"+t;try{const e=(new window.DOMParser).parseFromString(Xn(t),"text/html").body;return null===e?this.inertDocumentHelper.getInertBodyElement(t):(e.removeChild(e.firstChild),e)}catch(e){return null}}}class sr{constructor(t){if(this.defaultDoc=t,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert"),null==this.inertDocument.body){const t=this.inertDocument.createElement("html");this.inertDocument.appendChild(t);const e=this.inertDocument.createElement("body");t.appendChild(e)}}getInertBodyElement(t){const e=this.inertDocument.createElement("template");if("content"in e)return e.innerHTML=Xn(t),e;const n=this.inertDocument.createElement("body");return n.innerHTML=Xn(t),this.defaultDoc.documentMode&&this.stripCustomNsAttrs(n),n}stripCustomNsAttrs(t){const e=t.attributes;for(let r=e.length-1;0<r;r--){const n=e.item(r).name;"xmlns:ns1"!==n&&0!==n.indexOf("ns1:")||t.removeAttribute(n)}let n=t.firstChild;for(;n;)n.nodeType===Node.ELEMENT_NODE&&this.stripCustomNsAttrs(n),n=n.nextSibling}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const ir=/^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,or=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;function ar(t){return(t=String(t)).match(ir)||t.match(or)?t:"unsafe:"+t}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function lr(t){const e={};for(const n of t.split(","))e[n]=!0;return e}function cr(...t){const e={};for(const n of t)for(const t in n)n.hasOwnProperty(t)&&(e[t]=!0);return e}const ur=lr("area,br,col,hr,img,wbr"),hr=lr("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),dr=lr("rp,rt"),fr=cr(dr,hr),pr=cr(ur,cr(hr,lr("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),cr(dr,lr("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),fr),mr=lr("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),gr=lr("srcset"),yr=cr(mr,gr,lr("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),lr("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext")),_r=lr("script,style,template");class br{constructor(){this.sanitizedSomething=!1,this.buf=[]}sanitizeChildren(t){let e=t.firstChild,n=!0;for(;e;)if(e.nodeType===Node.ELEMENT_NODE?n=this.startElement(e):e.nodeType===Node.TEXT_NODE?this.chars(e.nodeValue):this.sanitizedSomething=!0,n&&e.firstChild)e=e.firstChild;else for(;e;){e.nodeType===Node.ELEMENT_NODE&&this.endElement(e);let t=this.checkClobberedElement(e,e.nextSibling);if(t){e=t;break}e=this.checkClobberedElement(e,e.parentNode)}return this.buf.join("")}startElement(t){const e=t.nodeName.toLowerCase();if(!pr.hasOwnProperty(e))return this.sanitizedSomething=!0,!_r.hasOwnProperty(e);this.buf.push("<"),this.buf.push(e);const n=t.attributes;for(let s=0;s<n.length;s++){const t=n.item(s),e=t.name,i=e.toLowerCase();if(!yr.hasOwnProperty(i)){this.sanitizedSomething=!0;continue}let o=t.value;mr[i]&&(o=ar(o)),gr[i]&&(r=o,o=(r=String(r)).split(",").map(t=>ar(t.trim())).join(", ")),this.buf.push(" ",e,'="',Cr(o),'"')}var r;return this.buf.push(">"),!0}endElement(t){const e=t.nodeName.toLowerCase();pr.hasOwnProperty(e)&&!ur.hasOwnProperty(e)&&(this.buf.push("</"),this.buf.push(e),this.buf.push(">"))}chars(t){this.buf.push(Cr(t))}checkClobberedElement(t,e){if(e&&(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_CONTAINED_BY)===Node.DOCUMENT_POSITION_CONTAINED_BY)throw new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`);return e}}const vr=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,wr=/([^\#-~ |!])/g;function Cr(t){return t.replace(/&/g,"&amp;").replace(vr,function(t){return"&#"+(1024*(t.charCodeAt(0)-55296)+(t.charCodeAt(1)-56320)+65536)+";"}).replace(wr,function(t){return"&#"+t.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}let xr;function Er(t){return"content"in t&&function(t){return t.nodeType===Node.ELEMENT_NODE&&"TEMPLATE"===t.nodeName}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */(t)?t.content:null}var Tr=function(t){return t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL",t}({});
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function kr(t){const e=function(){const t=ve();return t&&t[12]}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */();return e?tr(e.sanitize(Tr.HTML,t)||""):function(t,e){const n=function(t){return t instanceof er&&t.getTypeName()||null}(t);if(null!=n&&n!==e){if("ResourceURL"===n&&"URL"===e)return!0;throw new Error(`Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`)}return n===e}(t,"HTML")?tr(nr(t)):function(t,e){let n=null;try{xr=xr||
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function(t){const e=new sr(t);return function(){try{return!!(new window.DOMParser).parseFromString(Xn(""),"text/html")}catch(t){return!1}}()?new rr(e):e}(t);let r=e?String(e):"";n=xr.getInertBodyElement(r);let s=5,i=r;do{if(0===s)throw new Error("Failed to sanitize html because the input is unstable");s--,r=i,i=n.innerHTML,n=xr.getInertBodyElement(r)}while(r!==i);return Xn((new br).sanitizeChildren(Er(n)||n))}finally{if(n){const t=Er(n)||n;for(;t.firstChild;)t.removeChild(t.firstChild)}}}(se(),Kt(t))}function Ir(t){return t.ngDebugContext}function Ar(t){return t.ngOriginalError}function Sr(t,...e){t.error(...e)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class Or{constructor(){this._console=console}handleError(t){const e=this._findOriginalError(t),n=this._findContext(t),r=function(t){return t.ngErrorLogger||Sr}(t);r(this._console,"ERROR",t),e&&r(this._console,"ORIGINAL ERROR",e),n&&r(this._console,"ERROR CONTEXT",n)}_findContext(t){return t?Ir(t)?Ir(t):this._findContext(Ar(t)):null}_findOriginalError(t){let e=Ar(t);for(;e&&Ar(e);)e=Ar(e);return e}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Rr(t,e){t.__ngContext__=e}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Dr=(()=>("undefined"!=typeof requestAnimationFrame&&requestAnimationFrame||setTimeout).bind(vt))();function Nr(t){return t instanceof Function?t():t}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Pr=function(t){return t[t.Important=1]="Important",t[t.DashCase=2]="DashCase",t}({});
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Mr(t,e){return(void 0)(t,e)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function jr(t){const e=t[3];return $t(e)?e[3]:e}function Fr(t){return Hr(t[13])}function Lr(t){return Hr(t[4])}function Hr(t){for(;null!==t&&!$t(t);)t=t[4];return t}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Vr(t,e,n,r,s){if(null!=r){let i,o=!1;$t(r)?i=r:zt(r)&&(o=!0,r=r[0]);const a=ae(r);0===t&&null!==n?null==s?Gr(e,n,a):Wr(e,n,a,s||null,!0):1===t&&null!==n?Wr(e,n,a,s||null,!0):2===t?function(t,e,n){const r=Kr(t,e);r&&function(t,e,n,r){ie(t)?t.removeChild(e,n,r):e.removeChild(n)}(t,r,e,n)}(e,a,o):3===t&&e.destroyNode(a),null!=i&&function(t,e,n,r,s){const i=n[7];i!==ae(n)&&Vr(e,t,r,i,s);for(let o=Bt;o<n.length;o++){const s=n[o];ss(s[1],s,t,e,r,i)}}(e,t,i,n,s)}}function Br(t,e,n){return ie(t)?t.createElement(e,n):null===n?t.createElement(e):t.createElementNS(n,e)}function zr(t,e){const n=t[9],r=n.indexOf(e),s=e[3];1024&e[2]&&(e[2]&=-1025,ye(s,-1)),n.splice(r,1)}function $r(t,e){if(t.length<=Bt)return;const n=Bt+e,r=t[n];if(r){const i=r[17];null!==i&&i!==t&&zr(i,r),e>0&&(t[n-1][4]=r[4]);const o=Nn(t,Bt+e);ss(r[1],s=r,s[11],2,null,null),s[0]=null,s[6]=null;const a=o[19];null!==a&&a.detachView(o[1]),r[3]=null,r[4]=null,r[2]&=-129}var s;return r}function Ur(t,e){if(!(256&e[2])){const n=e[11];ie(n)&&n.destroyNode&&ss(t,e,n,3,null,null),function(t){let e=t[13];if(!e)return qr(t[1],t);for(;e;){let n=null;if(zt(e))n=e[13];else{const t=e[10];t&&(n=t)}if(!n){for(;e&&!e[4]&&e!==t;)zt(e)&&qr(e[1],e),e=e[3];null===e&&(e=t),zt(e)&&qr(e[1],e),n=e&&e[4]}e=n}}(e)}}function qr(t,e){if(!(256&e[2])){e[2]&=-129,e[2]|=256,function(t,e){let n;if(null!=t&&null!=(n=t.destroyHooks))for(let r=0;r<n.length;r+=2){const t=e[n[r]];if(!(t instanceof Xe)){const e=n[r+1];if(Array.isArray(e))for(let n=0;n<e.length;n+=2)e[n+1].call(t[e[n]]);else e.call(t)}}}(t,e),function(t,e){const n=t.cleanup,r=e[7];let s=-1;if(null!==n)for(let i=0;i<n.length-1;i+=2)if("string"==typeof n[i]){const t=n[i+1],o="function"==typeof t?t(e):ae(e[t]),a=r[s=n[i+2]],l=n[i+3];"boolean"==typeof l?o.removeEventListener(n[i],a,l):l>=0?r[s=l]():r[s=-l].unsubscribe(),i+=2}else{const t=r[s=n[i+1]];n[i].call(t)}if(null!==r){for(let t=s+1;t<r.length;t++)(0,r[t])();e[7]=null}}(t,e),1===e[1].type&&ie(e[11])&&e[11].destroy();const n=e[17];if(null!==n&&$t(e[3])){n!==e[3]&&zr(n,e);const r=e[19];null!==r&&r.detachView(t)}}}function Zr(t,e,n){return function(t,e,n){let r=e;for(;null!==r&&40&r.type;)r=(e=r).parent;if(null===r)return n[0];if(2&r.flags){const e=t.data[r.directiveStart].encapsulation;if(e===mt.None||e===mt.Emulated)return null}return ce(r,n)}(t,e.parent,n)}function Wr(t,e,n,r,s){ie(t)?t.insertBefore(e,n,r,s):e.insertBefore(n,r,s)}function Gr(t,e,n){ie(t)?t.appendChild(e,n):e.appendChild(n)}function Qr(t,e,n,r,s){null!==r?Wr(t,e,n,r,s):Gr(t,e,n)}function Kr(t,e){return ie(t)?t.parentNode(e):e.parentNode}function Jr(t,e,n){return Yr(t,e,n)}let Yr=function(t,e,n){return 40&t.type?ce(t,n):null};function Xr(t,e,n,r){const s=Zr(t,r,e),i=e[11],o=Jr(r.parent||e[6],r,e);if(null!=s)if(Array.isArray(n))for(let a=0;a<n.length;a++)Qr(i,s,n[a],o,!1);else Qr(i,s,n,o,!1)}function ts(t,e){if(null!==e){const n=e.type;if(3&n)return ce(e,t);if(4&n)return ns(-1,t[e.index]);if(8&n){const n=e.child;if(null!==n)return ts(t,n);{const n=t[e.index];return $t(n)?ns(-1,n):ae(n)}}if(32&n)return Mr(e,t)()||ae(t[e.index]);{const n=es(t,e);return null!==n?Array.isArray(n)?n[0]:ts(jr(t[16]),n):ts(t,e.next)}}return null}function es(t,e){return null!==e?t[16][6].projection[e.projection]:null}function ns(t,e){const n=Bt+t+1;if(n<e.length){const t=e[n],r=t[1].firstChild;if(null!==r)return ts(t,r)}return e[7]}function rs(t,e,n,r,s,i,o){for(;null!=n;){const a=r[n.index],l=n.type;if(o&&0===e&&(a&&Rr(ae(a),r),n.flags|=4),64!=(64&n.flags))if(8&l)rs(t,e,n.child,r,s,i,!1),Vr(e,t,s,a,i);else if(32&l){const o=Mr(n,r);let l;for(;l=o();)Vr(e,t,s,l,i);Vr(e,t,s,a,i)}else 16&l?is(t,e,r,n,s,i):Vr(e,t,s,a,i);n=o?n.projectionNext:n.next}}function ss(t,e,n,r,s,i){rs(n,r,t.firstChild,e,s,i,!1)}function is(t,e,n,r,s,i){const o=n[16],a=o[6].projection[r.projection];if(Array.isArray(a))for(let l=0;l<a.length;l++)Vr(e,t,s,a[l],i);else rs(t,e,a,o[3],s,i,!0)}function os(t,e,n){ie(t)?t.setAttribute(e,"style",n):e.style.cssText=n}function as(t,e,n){ie(t)?""===n?t.removeAttribute(e,"class"):t.setAttribute(e,"class",n):e.className=n}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function ls(t,e,n){let r=t.length;for(;;){const s=t.indexOf(e,n);if(-1===s)return s;if(0===s||t.charCodeAt(s-1)<=32){const n=e.length;if(s+n===r||t.charCodeAt(s+n)<=32)return s}n=s+1}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */const cs="ng-template";function us(t,e,n){let r=0;for(;r<t.length;){let s=t[r++];if(n&&"class"===s){if(s=t[r],-1!==ls(s.toLowerCase(),e,0))return!0}else if(1===s){for(;r<t.length&&"string"==typeof(s=t[r++]);)if(s.toLowerCase()===e)return!0;return!1}}return!1}function hs(t){return 4===t.type&&t.value!==cs}function ds(t,e,n){return e===(4!==t.type||n?t.value:cs)}function fs(t,e,n){let r=4;const s=t.attrs||[],i=function(t){for(let n=0;n<t.length;n++)if(3===(e=t[n])||4===e||6===e)return n;var e;return t.length}(s);let o=!1;for(let a=0;a<e.length;a++){const l=e[a];if("number"!=typeof l){if(!o)if(4&r){if(r=2|1&r,""!==l&&!ds(t,l,n)||""===l&&1===e.length){if(ps(r))return!1;o=!0}}else{const c=8&r?l:e[++a];if(8&r&&null!==t.attrs){if(!us(t.attrs,c,n)){if(ps(r))return!1;o=!0}continue}const u=ms(8&r?"class":l,s,hs(t),n);if(-1===u){if(ps(r))return!1;o=!0;continue}if(""!==c){let t;t=u>i?"":s[u+1].toLowerCase();const e=8&r?t:null;if(e&&-1!==ls(e,c,0)||2&r&&c!==t){if(ps(r))return!1;o=!0}}}}else{if(!o&&!ps(r)&&!ps(l))return!1;if(o&&ps(l))continue;o=!1,r=l|1&r}}return ps(r)||o}function ps(t){return 0==(1&t)}function ms(t,e,n,r){if(null===e)return-1;let s=0;if(r||!n){let n=!1;for(;s<e.length;){const r=e[s];if(r===t)return s;if(3===r||6===r)n=!0;else{if(1===r||2===r){let t=e[++s];for(;"string"==typeof t;)t=e[++s];continue}if(4===r)break;if(0===r){s+=4;continue}}s+=n?1:2}return-1}return function(t,e){let n=t.indexOf(4);if(n>-1)for(n++;n<t.length;){const r=t[n];if("number"==typeof r)return-1;if(r===e)return n;n++}return-1}(e,t)}function gs(t,e,n=!1){for(let r=0;r<e.length;r++)if(fs(t,e[r],n))return!0;return!1}function ys(t,e){return t?":not("+e.trim()+")":e}function _s(t){let e=t[0],n=1,r=2,s="",i=!1;for(;n<t.length;){let o=t[n];if("string"==typeof o)if(2&r){const e=t[++n];s+="["+o+(e.length>0?'="'+e+'"':"")+"]"}else 8&r?s+="."+o:4&r&&(s+=" "+o);else""===s||ps(o)||(e+=ys(i,s),s=""),r=o,i=i||!ps(r);n++}return""!==s&&(e+=ys(i,s)),e}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const bs={};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function vs(t){ws(we(),ve(),$e()+t,Ae())}function ws(t,e,n,r){if(!r)if(3==(3&e[2])){const r=t.preOrderCheckHooks;null!==r&&We(e,r,n)}else{const r=t.preOrderHooks;null!==r&&Ge(e,r,0,n)}Ue(n)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Cs(t,e){return t<<17|e<<2}function xs(t){return t>>17&32767}function Es(t){return 2|t}function Ts(t){return(131068&t)>>2}function ks(t,e){return-131069&t|e<<2}function Is(t){return 1|t}function As(t,e){const n=t.contentQueries;if(null!==n)for(let r=0;r<n.length;r+=2){const s=n[r],i=n[r+1];if(-1!==i){const n=t.data[i];Pe(s),n.contentQueries(2,e[i],i)}}}function Ss(t,e,n,r,s,i,o,a,l,c){const u=e.blueprint.slice();return u[0]=s,u[2]=140|r,ge(u),u[3]=u[15]=t,u[8]=n,u[10]=o||t&&t[10],u[11]=a||t&&t[11],u[12]=l||t&&t[12]||null,u[9]=c||t&&t[9]||null,u[6]=i,u[16]=2==e.type?t[16]:u,u}function Os(t,e,n,r,s){let i=t.data[e];if(null===i)i=function(t,e,n,r,s){const i=Ee(),o=ke(),a=t.data[e]=function(t,e,n,r,s,i){return{type:n,index:r,insertBeforeIndex:null,injectorIndex:e?e.injectorIndex:-1,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,propertyBindings:null,flags:0,providerIndexes:0,value:s,attrs:i,mergedAttrs:null,localNames:null,initialInputs:void 0,inputs:null,outputs:null,tViews:null,next:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}(0,o?i:i&&i.parent,n,e,r,s);return null===t.firstChild&&(t.firstChild=a),null!==i&&(o?null==i.child&&null!==a.parent&&(i.child=a):null===i.next&&(i.next=a)),a}(t,e,n,r,s),_e.lFrame.inI18n&&(i.flags|=64);else if(64&i.type){i.type=n,i.value=r,i.attrs=s;const t=function(){const t=_e.lFrame,e=t.currentTNode;return t.isParent?e:e.parent}();i.injectorIndex=null===t?-1:t.injectorIndex}return Te(i,!0),i}function Rs(t,e,n,r){if(0===n)return-1;const s=e.length;for(let i=0;i<n;i++)e.push(r),t.blueprint.push(r),t.data.push(null);return s}function Ds(t,e,n){Fe(e);try{const r=t.viewQuery;null!==r&&oi(1,r,n);const s=t.template;null!==s&&Ms(t,e,s,1,n),t.firstCreatePass&&(t.firstCreatePass=!1),t.staticContentQueries&&As(t,e),t.staticViewQueries&&oi(2,t.viewQuery,n);const i=t.components;null!==i&&function(t,e){for(let n=0;n<e.length;n++)ei(t,e[n])}(e,i)}catch(r){throw t.firstCreatePass&&(t.incompleteFirstPass=!0),r}finally{e[2]&=-5,ze()}}function Ns(t,e,n,r){const s=e[2];if(256==(256&s))return;Fe(e);const i=Ae();try{ge(e),_e.lFrame.bindingIndex=t.bindingStartIndex,null!==n&&Ms(t,e,n,2,r);const o=3==(3&s);if(!i)if(o){const n=t.preOrderCheckHooks;null!==n&&We(e,n,null)}else{const n=t.preOrderHooks;null!==n&&Ge(e,n,0,null),Qe(e,0)}if(function(t){for(let e=Fr(t);null!==e;e=Lr(e)){if(!e[2])continue;const t=e[9];for(let e=0;e<t.length;e++){const n=t[e],r=n[3];0==(1024&n[2])&&ye(r,1),n[2]|=1024}}}(e),function(t){for(let e=Fr(t);null!==e;e=Lr(e))for(let t=Bt;t<e.length;t++){const n=e[t],r=n[1];pe(n)&&Ns(r,n,r.template,n[8])}}(e),null!==t.contentQueries&&As(t,e),!i)if(o){const n=t.contentCheckHooks;null!==n&&We(e,n)}else{const n=t.contentHooks;null!==n&&Ge(e,n,1),Qe(e,1)}!function(t,e){const n=t.hostBindingOpCodes;if(null!==n)try{for(let t=0;t<n.length;t++){const r=n[t];if(r<0)Ue(~r);else{const s=r,i=n[++t],o=n[++t];Re(i,s),o(2,e[s])}}}finally{Ue(-1)}}(t,e);const a=t.components;null!==a&&function(t,e){for(let n=0;n<e.length;n++)Xs(t,e[n])}(e,a);const l=t.viewQuery;if(null!==l&&oi(2,l,r),!i)if(o){const n=t.viewCheckHooks;null!==n&&We(e,n)}else{const n=t.viewHooks;null!==n&&Ge(e,n,2),Qe(e,2)}!0===t.firstUpdatePass&&(t.firstUpdatePass=!1),i||(e[2]&=-73),1024&e[2]&&(e[2]&=-1025,ye(e[3],-1))}finally{ze()}}function Ps(t,e,n,r){const s=e[10],i=!Ae(),o=fe(e);try{i&&!o&&s.begin&&s.begin(),o&&Ds(t,e,r),Ns(t,e,n,r)}finally{i&&!o&&s.end&&s.end()}}function Ms(t,e,n,r,s){const i=$e();try{Ue(-1),2&r&&e.length>Vt&&ws(t,e,Vt,Ae()),n(r,s)}finally{Ue(i)}}function js(t,e,n){be()&&(function(t,e,n,r){const s=n.directiveStart,i=n.directiveEnd;t.firstCreatePass||hn(n,e),Rr(r,e);const o=n.initialInputs;for(let a=s;a<i;a++){const r=t.data[a],i=Wt(r);i&&Qs(e,n,r);const l=xn(e,t,a,n);Rr(l,e),null!==o&&Ks(0,a-s,l,r,0,o),i&&(he(n.index,e)[8]=l)}}(t,e,n,ce(n,e)),128==(128&n.flags)&&function(t,e,n){const r=n.directiveStart,s=n.directiveEnd,i=n.index,o=_e.lFrame.currentDirectiveIndex;try{Ue(i);for(let n=r;n<s;n++){const r=t.data[n],s=e[n];De(n),null===r.hostBindings&&0===r.hostVars&&null===r.hostAttrs||Us(r,s)}}finally{Ue(-1),De(o)}}(t,e,n))}function Fs(t,e,n=ce){const r=e.localNames;if(null!==r){let s=e.index+1;for(let i=0;i<r.length;i+=2){const o=r[i+1],a=-1===o?n(e,t):t[o];t[s++]=a}}}function Ls(t){const e=t.tView;return null===e||e.incompleteFirstPass?t.tView=Hs(1,null,t.template,t.decls,t.vars,t.directiveDefs,t.pipeDefs,t.viewQuery,t.schemas,t.consts):e}function Hs(t,e,n,r,s,i,o,a,l,c){const u=Vt+r,h=u+s,d=function(t,e){const n=[];for(let r=0;r<e;r++)n.push(r<t?null:bs);return n}(u,h),f="function"==typeof c?c():c;return d[1]={type:t,blueprint:d,template:n,queries:null,viewQuery:a,declTNode:e,data:d.slice().fill(null,u),bindingStartIndex:u,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:"function"==typeof i?i():i,pipeRegistry:"function"==typeof o?o():o,firstChild:null,schemas:l,consts:f,incompleteFirstPass:!1}}function Vs(t,e,n,r){const s=li(e);null===n?s.push(r):(s.push(n),t.firstCreatePass&&ci(t).push(r,s.length-1))}function Bs(t,e,n){for(let r in t)if(t.hasOwnProperty(r)){const s=t[r];(n=null===n?{}:n).hasOwnProperty(r)?n[r].push(e,s):n[r]=[e,s]}return n}function zs(t,e,n,r){let s=!1;if(be()){const i=function(t,e,n){const r=t.directiveRegistry;let s=null;if(r)for(let i=0;i<r.length;i++){const o=r[i];gs(n,o.selectors,!1)&&(s||(s=[]),mn(hn(n,e),t,o.type),Wt(o)?(qs(t,n),s.unshift(o)):s.push(o))}return s}(t,e,n),o=null===r?null:{"":-1};if(null!==i){s=!0,Ws(n,t.data.length,i.length);for(let t=0;t<i.length;t++){const e=i[t];e.providersResolver&&e.providersResolver(e)}let r=!1,a=!1,l=Rs(t,e,i.length,null);for(let s=0;s<i.length;s++){const c=i[s];n.mergedAttrs=nn(n.mergedAttrs,c.hostAttrs),Gs(t,n,e,l,c),Zs(l,c,o),null!==c.contentQueries&&(n.flags|=8),null===c.hostBindings&&null===c.hostAttrs&&0===c.hostVars||(n.flags|=128);const u=c.type.prototype;!r&&(u.ngOnChanges||u.ngOnInit||u.ngDoCheck)&&((t.preOrderHooks||(t.preOrderHooks=[])).push(n.index),r=!0),a||!u.ngOnChanges&&!u.ngDoCheck||((t.preOrderCheckHooks||(t.preOrderCheckHooks=[])).push(n.index),a=!0),l++}!function(t,e){const n=e.directiveEnd,r=t.data,s=e.attrs,i=[];let o=null,a=null;for(let l=e.directiveStart;l<n;l++){const t=r[l],n=t.inputs,c=null===s||hs(e)?null:Js(n,s);i.push(c),o=Bs(n,l,o),a=Bs(t.outputs,l,a)}null!==o&&(o.hasOwnProperty("class")&&(e.flags|=16),o.hasOwnProperty("style")&&(e.flags|=32)),e.initialInputs=i,e.inputs=o,e.outputs=a}(t,n)}o&&function(t,e,n){if(e){const r=t.localNames=[];for(let t=0;t<e.length;t+=2){const s=n[e[t+1]];if(null==s)throw new Qt("301",`Export of name '${e[t+1]}' not found!`);r.push(e[t],s)}}}(n,r,o)}return n.mergedAttrs=nn(n.mergedAttrs,n.attrs),s}function $s(t,e,n,r,s,i){const o=i.hostBindings;if(o){let n=t.hostBindingOpCodes;null===n&&(n=t.hostBindingOpCodes=[]);const i=~e.index;(function(t){let e=t.length;for(;e>0;){const n=t[--e];if("number"==typeof n&&n<0)return n}return 0})(n)!=i&&n.push(i),n.push(r,s,o)}}function Us(t,e){null!==t.hostBindings&&t.hostBindings(1,e)}function qs(t,e){e.flags|=2,(t.components||(t.components=[])).push(e.index)}function Zs(t,e,n){if(n){if(e.exportAs)for(let r=0;r<e.exportAs.length;r++)n[e.exportAs[r]]=t;Wt(e)&&(n[""]=t)}}function Ws(t,e,n){t.flags|=1,t.directiveStart=e,t.directiveEnd=e+n,t.providerIndexes=e}function Gs(t,e,n,r,s){t.data[r]=s;const i=s.factory||(s.factory=Gt(s.type)),o=new Xe(i,Wt(s),null);t.blueprint[r]=o,n[r]=o,$s(t,e,0,r,Rs(t,n,s.hostVars,bs),s)}function Qs(t,e,n){const r=ce(e,t),s=Ls(n),i=t[10],o=ni(t,Ss(t,s,null,n.onPush?64:16,r,e,i,i.createRenderer(r,n),null,null));t[e.index]=o}function Ks(t,e,n,r,s,i){const o=i[e];if(null!==o){const t=r.setInput;for(let e=0;e<o.length;){const s=o[e++],i=o[e++],a=o[e++];null!==t?r.setInput(n,a,s,i):n[i]=a}}}function Js(t,e){let n=null,r=0;for(;r<e.length;){const s=e[r];if(0!==s)if(5!==s){if("number"==typeof s)break;t.hasOwnProperty(s)&&(null===n&&(n=[]),n.push(s,t[s],e[r+1])),r+=2}else r+=2;else r+=4}return n}function Ys(t,e,n,r){return new Array(t,!0,!1,e,null,0,r,n,null,null)}function Xs(t,e){const n=he(e,t);if(pe(n)){const t=n[1];80&n[2]?Ns(t,n,t.template,n[8]):n[5]>0&&ti(n)}}function ti(t){for(let n=Fr(t);null!==n;n=Lr(n))for(let t=Bt;t<n.length;t++){const e=n[t];if(1024&e[2]){const t=e[1];Ns(t,e,t.template,e[8])}else e[5]>0&&ti(e)}const e=t[1].components;if(null!==e)for(let n=0;n<e.length;n++){const r=he(e[n],t);pe(r)&&r[5]>0&&ti(r)}}function ei(t,e){const n=he(e,t),r=n[1];!function(t,e){for(let n=e.length;n<t.blueprint.length;n++)e.push(t.blueprint[n])}(r,n),Ds(r,n,n[8])}function ni(t,e){return t[13]?t[14][4]=e:t[13]=e,t[14]=e,e}function ri(t){for(;t;){t[2]|=64;const e=jr(t);if(0!=(512&t[2])&&!e)return t;t=e}return null}function si(t,e,n){const r=e[10];r.begin&&r.begin();try{Ns(t,e,t.template,n)}catch(s){throw ui(e,s),s}finally{r.end&&r.end()}}function ii(t){!function(t){for(let e=0;e<t.components.length;e++){const n=t.components[e],r=de(n),s=r[1];Ps(s,r,s.template,n)}}(t[8])}function oi(t,e,n){Pe(0),e(t,n)}const ai=(()=>Promise.resolve(null))();function li(t){return t[7]||(t[7]=[])}function ci(t){return t.cleanup||(t.cleanup=[])}function ui(t,e){const n=t[9],r=n?n.get(Or,null):null;r&&r.handleError(e)}function hi(t,e,n,r,s){for(let i=0;i<n.length;){const o=n[i++],a=n[i++],l=e[o],c=t.data[o];null!==c.setInput?c.setInput(l,s,r,a):l[a]=s}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function di(t,e,n){let r=n?t.styles:null,s=n?t.classes:null,i=0;if(null!==e)for(let o=0;o<e.length;o++){const t=e[o];"number"==typeof t?i=t:1==i?s=K(s,t):2==i&&(r=K(r,t+": "+e[++o]+";"))}n?t.styles=r:t.stylesWithoutHost=r,n?t.classes=s:t.classesWithoutHost=s}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const fi=new Sn("INJECTOR",-1);
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class pi{get(t,e=Ln){if(e===Ln){const e=new Error(`NullInjectorError: No provider for ${Q(t)}!`);throw e.name="NullInjectorError",e}return e}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */const mi=new Sn("Set Injector scope."),gi={},yi={},_i=[];
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */let bi;function vi(){return void 0===bi&&(bi=new pi),bi}function wi(t,e=null,n=null,r){return new Ci(t,n,e||vi(),r)}class Ci{constructor(t,e,n,r=null){this.parent=n,this.records=new Map,this.injectorDefTypes=new Set,this.onDestroy=new Set,this._destroyed=!1;const s=[];e&&Rn(e,n=>this.processProvider(n,t,e)),Rn([t],t=>this.processInjectorType(t,[],s)),this.records.set(fi,Ei(void 0,this));const i=this.records.get(mi);this.scope=null!=i?i.value:null,this.source=r||("object"==typeof t?null:Q(t))}get destroyed(){return this._destroyed}destroy(){this.assertNotDestroyed(),this._destroyed=!0;try{this.onDestroy.forEach(t=>t.ngOnDestroy())}finally{this.records.clear(),this.onDestroy.clear(),this.injectorDefTypes.clear()}}get(t,e=Ln,n=ct.Default){this.assertNotDestroyed();const r=$n(this);try{if(!(n&ct.SkipSelf)){let e=this.records.get(t);if(void 0===e){const n=("function"==typeof(s=t)||"object"==typeof s&&s instanceof Sn)&&nt(t);e=n&&this.injectableDefInScope(n)?Ei(xi(t),gi):null,this.records.set(t,e)}if(null!=e)return this.hydrate(t,e)}return(n&ct.Self?vi():this.parent).get(t,e=n&ct.Optional&&e===Ln?null:e)}catch(i){if("NullInjectorError"===i.name){if((i.ngTempTokenPath=i.ngTempTokenPath||[]).unshift(Q(t)),r)throw i;return function(t,e,n,r){const s=t.ngTempTokenPath;throw e[Vn]&&s.unshift(e[Vn]),t.message=function(t,e,n,r=null){t=t&&"\n"===t.charAt(0)&&"\u0275"==t.charAt(1)?t.substr(2):t;let s=Q(e);if(Array.isArray(e))s=e.map(Q).join(" -> ");else if("object"==typeof e){let t=[];for(let n in e)if(e.hasOwnProperty(n)){let r=e[n];t.push(n+":"+("string"==typeof r?JSON.stringify(r):Q(r)))}s=`{${t.join(", ")}}`}return`${n}${r?"("+r+")":""}[${s}]: ${t.replace(Hn,"\n  ")}`}("\n"+t.message,s,n,r),t.ngTokenPath=s,t.ngTempTokenPath=null,t}(i,t,"R3InjectorError",this.source)}throw i}finally{$n(r)}var s;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */}_resolveInjectorDefTypes(){this.injectorDefTypes.forEach(t=>this.get(t))}toString(){const t=[];return this.records.forEach((e,n)=>t.push(Q(n))),`R3Injector[${t.join(", ")}]`}assertNotDestroyed(){if(this._destroyed)throw new Error("Injector has already been destroyed.")}processInjectorType(t,e,n){if(!(t=X(t)))return!1;let r=st(t);const s=null==r&&t.ngModule||void 0,i=void 0===s?t:s,o=-1!==n.indexOf(i);if(void 0!==s&&(r=st(s)),null==r)return!1;if(null!=r.imports&&!o){let t;n.push(i);try{Rn(r.imports,r=>{this.processInjectorType(r,e,n)&&(void 0===t&&(t=[]),t.push(r))})}finally{}if(void 0!==t)for(let e=0;e<t.length;e++){const{ngModule:n,providers:r}=t[e];Rn(r,t=>this.processProvider(t,n,r||_i))}}this.injectorDefTypes.add(i),this.records.set(i,Ei(r.factory,gi));const a=r.providers;if(null!=a&&!o){const e=t;Rn(a,t=>this.processProvider(t,e,a))}return void 0!==s&&void 0!==t.providers}processProvider(t,e,n){let r=ki(t=X(t))?t:X(t&&t.provide);const s=function(t,e,n){return Ti(t)?Ei(void 0,t.useValue):Ei(function(t,e,n){let r;if(ki(t)){const e=X(t);return Gt(e)||xi(e)}if(Ti(t))r=()=>X(t.useValue);else if((s=t)&&s.useFactory)r=()=>t.useFactory(...Zn(t.deps||[]));else if(function(t){return!(!t||!t.useExisting)}(t))r=()=>qn(X(t.useExisting));else{const e=X(t&&(t.useClass||t.provide));if(!function(t){return!!t.deps}(t))return Gt(e)||xi(e);r=()=>new e(...Zn(t.deps))}var s;return r}(t),gi)}(t);if(ki(t)||!0!==t.multi)this.records.get(r);else{let e=this.records.get(r);e||(e=Ei(void 0,gi,!0),e.factory=()=>Zn(e.multi),this.records.set(r,e)),r=t,e.multi.push(t)}this.records.set(r,s)}hydrate(t,e){var n;return e.value===gi&&(e.value=yi,e.value=e.factory()),"object"==typeof e.value&&e.value&&null!==(n=e.value)&&"object"==typeof n&&"function"==typeof n.ngOnDestroy&&this.onDestroy.add(e.value),e.value}injectableDefInScope(t){return!!t.providedIn&&("string"==typeof t.providedIn?"any"===t.providedIn||t.providedIn===this.scope:this.injectorDefTypes.has(t.providedIn))}}function xi(t){const e=nt(t),n=null!==e?e.factory:Gt(t);if(null!==n)return n;const r=st(t);if(null!==r)return r.factory;if(t instanceof Sn)throw new Error(`Token ${Q(t)} is missing a \u0275prov definition.`);if(t instanceof Function)return function(t){const e=t.length;if(e>0){const n=Pn(e,"?");throw new Error(`Can't resolve all parameters for ${Q(t)}: (${n.join(", ")}).`)}const n=function(t){const e=t&&(t[it]||t[at]);if(e){const n=function(t){if(t.hasOwnProperty("name"))return t.name;const e=(""+t).match(/^function\s*([^\s(]+)/);return null===e?"":e[1]}(t);return console.warn(`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`),e}return null}(t);return null!==n?()=>n.factory(t):()=>new t}(t);throw new Error("unreachable")}function Ei(t,e,n=!1){return{factory:t,value:e,multi:n?[]:void 0}}function Ti(t){return null!==t&&"object"==typeof t&&Bn in t}function ki(t){return"function"==typeof t}const Ii=function(t,e,n){return function(t,e=null,n=null,r){const s=wi(t,e,n,r);return s._resolveInjectorDefTypes(),s}({name:n},e,t,n)};let Ai=(()=>{class t{static create(t,e){return Array.isArray(t)?Ii(t,e,""):Ii(t.providers,t.parent,t.name||"")}}return t.THROW_IF_NOT_FOUND=Ln,t.NULL=new pi,t.\u0275prov=tt({token:t,providedIn:"any",factory:()=>qn(fi)}),t.__NG_ELEMENT_ID__=-1,t})();function Si(t,e){Ze(de(t)[1],xe())}function Oi(t){let e=Object.getPrototypeOf(t.type.prototype).constructor,n=!0;const r=[t];for(;e;){let s;if(Wt(t))s=e.\u0275cmp||e.\u0275dir;else{if(e.\u0275cmp)throw new Error("Directives cannot inherit Components");s=e.\u0275dir}if(s){if(n){r.push(s);const e=t;e.inputs=Ri(t.inputs),e.declaredInputs=Ri(t.declaredInputs),e.outputs=Ri(t.outputs);const n=s.hostBindings;n&&Pi(t,n);const i=s.viewQuery,o=s.contentQueries;if(i&&Di(t,i),o&&Ni(t,o),G(t.inputs,s.inputs),G(t.declaredInputs,s.declaredInputs),G(t.outputs,s.outputs),Wt(s)&&s.data.animation){const e=t.data;e.animation=(e.animation||[]).concat(s.data.animation)}}const e=s.features;if(e)for(let r=0;r<e.length;r++){const s=e[r];s&&s.ngInherit&&s(t),s===Oi&&(n=!1)}}e=Object.getPrototypeOf(e)}!function(t){let e=0,n=null;for(let r=t.length-1;r>=0;r--){const s=t[r];s.hostVars=e+=s.hostVars,s.hostAttrs=nn(s.hostAttrs,n=nn(n,s.hostAttrs))}}(r)}function Ri(t){return t===wt?{}:t===Ct?[]:t}function Di(t,e){const n=t.viewQuery;t.viewQuery=n?(t,r)=>{e(t,r),n(t,r)}:e}function Ni(t,e){const n=t.contentQueries;t.contentQueries=n?(t,r,s)=>{e(t,r,s),n(t,r,s)}:e}function Pi(t,e){const n=t.hostBindings;t.hostBindings=n?(t,r)=>{e(t,r),n(t,r)}:e}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let Mi=null;function ji(){if(!Mi){const t=vt.Symbol;if(t&&t.iterator)Mi=t.iterator;else{const t=Object.getOwnPropertyNames(Map.prototype);for(let e=0;e<t.length;++e){const n=t[e];"entries"!==n&&"size"!==n&&Map.prototype[n]===Map.prototype.entries&&(Mi=n)}}}return Mi}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Fi(t){return!!Li(t)&&(Array.isArray(t)||!(t instanceof Map)&&ji()in t)}function Li(t){return null!==t&&("function"==typeof t||"object"==typeof t)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Hi(t,e,n){return!Object.is(t[e],n)&&(t[e]=n,!0)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function Vi(t,e,n,r){const s=ve();return Hi(s,Oe(),e)&&(we(),function(t,e,n,r,s,i){const o=ce(t,e);!function(t,e,n,r,s,i,o){if(null==i)ie(t)?t.removeAttribute(e,s,n):e.removeAttribute(s);else{const a=null==o?Kt(i):o(i,r||"",s);ie(t)?t.setAttribute(e,s,a,n):n?e.setAttributeNS(n,s,a):e.setAttribute(s,a)}}(e[11],o,i,t.value,n,r,s)}(qe(),s,t,e,n,r)),Vi}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Bi(t,e,n,r,s,i,o,a){const l=ve(),c=we(),u=t+Vt,h=c.firstCreatePass?
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function(t,e,n,r,s,i,o,a,l){const c=e.consts,u=Os(e,t,4,o||null,me(c,a));zs(e,n,u,me(c,l)),Ze(e,u);const h=u.tViews=Hs(2,u,r,s,i,e.directiveRegistry,e.pipeRegistry,null,e.schemas,c);return null!==e.queries&&(e.queries.template(e,u),h.queries=e.queries.embeddedTView(u)),u}(u,c,l,e,n,r,s,i,o):c.data[u];Te(h,!1);const d=l[11].createComment("");Xr(c,l,d,h),Rr(d,l),ni(l,l[u]=Ys(d,l,d,h)),Zt(h)&&js(c,l,h),null!=o&&Fs(l,h,a)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function zi(t,e=ct.Default){const n=ve();return null===n?qn(t,e):_n(xe(),n,X(t),e)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function $i(t,e,n){const r=ve();return Hi(r,Oe(),e)&&function(t,e,n,r,s,i,o,a){const l=ce(e,n);let c,u=e.inputs;var h;null!=u&&(c=u[r])?(hi(t,n,c,r,s),qt(e)&&function(t,e){const n=he(e,t);16&n[2]||(n[2]|=64)}(n,e.index)):3&e.type&&(r="class"===(h=r)?"className":"for"===h?"htmlFor":"formaction"===h?"formAction":"innerHtml"===h?"innerHTML":"readonly"===h?"readOnly":"tabindex"===h?"tabIndex":h,s=null!=o?o(s,e.value||"",r):s,ie(i)?i.setProperty(l,r,s):en(r)||(l.setProperty?l.setProperty(r,s):l[r]=s))}(we(),qe(),r,t,e,r[11],n),$i}function Ui(t,e,n,r,s){const i=s?"class":"style";hi(t,n,e.inputs[i],i,r)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function qi(t,e,n,r){const s=ve(),i=we(),o=Vt+t,a=s[11],l=s[o]=Br(a,e,_e.lFrame.currentNamespace),c=i.firstCreatePass?function(t,e,n,r,s,i,o){const a=e.consts,l=Os(e,t,2,s,me(a,i));return zs(e,n,l,me(a,o)),null!==l.attrs&&di(l,l.attrs,!1),null!==l.mergedAttrs&&di(l,l.mergedAttrs,!0),null!==e.queries&&e.queries.elementStart(e,l),l}(o,i,s,0,e,n,r):i.data[o];Te(c,!0);const u=c.mergedAttrs;null!==u&&tn(a,l,u);const h=c.classes;null!==h&&as(a,l,h);const d=c.styles;null!==d&&os(a,l,d),64!=(64&c.flags)&&Xr(i,s,l,c),0===_e.lFrame.elementDepthCount&&Rr(l,s),_e.lFrame.elementDepthCount++,Zt(c)&&(js(i,s,c),function(t,e,n){if(Ut(e)){const r=e.directiveEnd;for(let s=e.directiveStart;s<r;s++){const e=t.data[s];e.contentQueries&&e.contentQueries(1,n[s],s)}}}(i,c,s)),null!==r&&Fs(s,c)}function Zi(){let t=xe();ke()?Ie():(t=t.parent,Te(t,!1));const e=t;_e.lFrame.elementDepthCount--;const n=we();n.firstCreatePass&&(Ze(n,t),Ut(t)&&n.queries.elementEnd(t)),null!=e.classesWithoutHost&&function(t){return 0!=(16&t.flags)}(e)&&Ui(n,e,ve(),e.classesWithoutHost,!0),null!=e.stylesWithoutHost&&function(t){return 0!=(32&t.flags)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */(e)&&Ui(n,e,ve(),e.stylesWithoutHost,!1)}function Wi(t,e,n,r){qi(t,e,n,r),Zi()}function Gi(){return ve()}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Qi(t){return!!t&&"function"==typeof t.then}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function Ki(t,e,n=!1,r){const s=ve(),i=we(),o=xe();return function(t,e,n,r,s,i,o=!1,a){const l=Zt(r),c=t.firstCreatePass&&ci(t),u=li(e);let h=!0;if(3&r.type){const d=ce(r,e),f=a?a(d):wt,p=f.target||d,m=u.length,g=a?t=>a(ae(t[r.index])).target:r.index;if(ie(n)){let o=null;if(!a&&l&&(o=function(t,e,n,r){const s=t.cleanup;if(null!=s)for(let i=0;i<s.length-1;i+=2){const t=s[i];if(t===n&&s[i+1]===r){const t=e[7],n=s[i+2];return t.length>n?t[n]:null}"string"==typeof t&&(i+=2)}return null}(t,e,s,r.index)),null!==o)(o.__ngLastListenerFn__||o).__ngNextListenerFn__=i,o.__ngLastListenerFn__=i,h=!1;else{i=Yi(r,e,i,!1);const t=n.listen(f.name||p,s,i);u.push(i,t),c&&c.push(s,g,m,m+1)}}else i=Yi(r,e,i,!0),p.addEventListener(s,i,o),u.push(i),c&&c.push(s,g,m,o)}else i=Yi(r,e,i,!1);const d=r.outputs;let f;if(h&&null!==d&&(f=d[s])){const t=f.length;if(t)for(let n=0;n<t;n+=2){const t=e[f[n]][f[n+1]].subscribe(i),o=u.length;u.push(i,t),c&&c.push(s,r.index,o,-(o+1))}}}(i,s,s[11],o,t,e,n,r),Ki}function Ji(t,e,n){try{return!1!==e(n)}catch(r){return ui(t,r),!1}}function Yi(t,e,n,r){return function s(i){if(i===Function)return n;const o=2&t.flags?he(t.index,e):e;0==(32&e[2])&&ri(o);let a=Ji(e,n,i),l=s.__ngNextListenerFn__;for(;l;)a=Ji(e,l,i)&&a,l=l.__ngNextListenerFn__;return r&&!1===a&&(i.preventDefault(),i.returnValue=!1),a}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Xi(t=1){return function(t){return(_e.lFrame.contextLView=function(t,e){for(;t>0;)e=e[15],t--;return e}(t,_e.lFrame.contextLView))[8]}(t)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const to=[];function eo(t,e,n,r,s){const i=t[n+1],o=null===e;let a=r?xs(i):Ts(i),l=!1;for(;0!==a&&(!1===l||o);){const n=t[a+1];no(t[a],e)&&(l=!0,t[a+1]=r?Is(n):Es(n)),a=r?xs(n):Ts(n)}l&&(t[n+1]=r?Es(i):Is(i))}function no(t,e){return null===t||null==e||(Array.isArray(t)?t[1]:t)===e||!(!Array.isArray(t)||"string"!=typeof e)&&Fn(t,e)>=0}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function ro(t,e){return function(t,e,n,r){const s=ve(),i=we(),o=function(t){const e=_e.lFrame,n=e.bindingIndex;return e.bindingIndex=e.bindingIndex+2,n}();i.firstUpdatePass&&function(t,e,n,r){const s=t.data;if(null===s[n+1]){const i=s[$e()],o=function(t,e){return e>=t.expandoStartIndex}(t,n);(function(t,e){return 0!=(16&t.flags)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */)(i)&&null===e&&!o&&(e=!1),e=function(t,e,n,r){const s=function(t){const e=_e.lFrame.currentDirectiveIndex;return-1===e?null:t[e]}(t);let i=e.residualClasses;if(null===s)0===e.classBindings&&(n=io(n=so(null,t,e,n,r),e.attrs,r),i=null);else{const o=e.directiveStylingLast;if(-1===o||t[o]!==s)if(n=so(s,t,e,n,r),null===i){let n=function(t,e,n){const r=e.classBindings;if(0!==Ts(r))return t[xs(r)]}(t,e);void 0!==n&&Array.isArray(n)&&(n=so(null,t,e,n[1],r),n=io(n,e.attrs,r),function(t,e,n,r){t[xs(e.classBindings)]=r}(t,e,0,n))}else i=function(t,e,n){let r;const s=e.directiveEnd;for(let i=1+e.directiveStylingLast;i<s;i++)r=io(r,t[i].hostAttrs,true);return io(r,e.attrs,true)}(t,e)}return void 0!==i&&(e.residualClasses=i),n}(s,i,e,r),function(t,e,n,r,s,i){let o=e.classBindings,a=xs(o),l=Ts(o);t[r]=n;let c,u=!1;if(Array.isArray(n)){const t=n;c=t[1],(null===c||Fn(t,c)>0)&&(u=!0)}else c=n;if(s)if(0!==l){const e=xs(t[a+1]);t[r+1]=Cs(e,a),0!==e&&(t[e+1]=ks(t[e+1],r)),t[a+1]=131071&t[a+1]|r<<17}else t[r+1]=Cs(a,0),0!==a&&(t[a+1]=ks(t[a+1],r)),a=r;else t[r+1]=Cs(l,0),0===a?a=r:t[l+1]=ks(t[l+1],r),l=r;u&&(t[r+1]=Es(t[r+1])),eo(t,c,r,!0),eo(t,c,r,!1),function(t,e,n,r,s){const i=t.residualClasses;null!=i&&"string"==typeof e&&Fn(i,e)>=0&&(n[r+1]=Is(n[r+1]))}(e,c,t,r),o=Cs(a,l),e.classBindings=o}(s,i,e,n,o)}}(i,t,o,true),e!==bs&&Hi(s,o,e)&&function(t,e,n,r,s,i,o,a){if(!(3&e.type))return;const l=t.data,c=l[a+1];ao(1==(1&c)?oo(l,e,n,s,Ts(c),o):void 0)||(ao(i)||function(t){return 2==(2&t)}(c)&&(i=oo(l,null,n,s,a,o)),function(t,e,n,r,s){const i=ie(t);s?i?t.addClass(n,r):n.classList.add(r):i?t.removeClass(n,r):n.classList.remove(r)}(r,0,le($e(),n),s,i))}(i,i.data[$e()],s,s[11],t,s[o+1]=function(t,e){return null==t||"object"==typeof t&&(t=Q(nr(t))),t}(e),true,o)}(t,e),ro}function so(t,e,n,r,s){let i=null;const o=n.directiveEnd;let a=n.directiveStylingLast;for(-1===a?a=n.directiveStart:a++;a<o&&(i=e[a],r=io(r,i.hostAttrs,s),i!==t);)a++;return null!==t&&(n.directiveStylingLast=a),r}function io(t,e,n){const r=n?1:2;let s=-1;if(null!==e)for(let i=0;i<e.length;i++){const o=e[i];"number"==typeof o?s=o:s===r&&(Array.isArray(t)||(t=void 0===t?[]:["",t]),Mn(t,o,!!n||e[++i]))}return void 0===t?null:t}function oo(t,e,n,r,s,i){const o=null===e;let a;for(;s>0;){const e=t[s],i=Array.isArray(e),l=i?e[1]:e,c=null===l;let u=n[s+1];u===bs&&(u=c?to:void 0);let h=c?jn(u,r):l===r?u:void 0;if(i&&!ao(h)&&(h=jn(e,r)),ao(h)&&(a=h,o))return a;const d=t[s+1];s=o?xs(d):Ts(d)}if(null!==e){let t=i?e.residualClasses:e.residualStyles;null!=t&&(a=jn(t,r))}return a}function ao(t){return void 0!==t}function lo(t,e=""){const n=ve(),r=we(),s=t+Vt,i=r.firstCreatePass?Os(r,s,1,e,null):r.data[s],o=n[s]=function(t,e){return ie(t)?t.createText(e):t.createTextNode(e)}(n[11],e);Xr(r,n,o,i),Te(i,!1)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function co(t){return uo("",t,""),co}function uo(t,e,n){const r=ve(),s=function(t,e,n,r){return Hi(t,Oe(),n)?e+Kt(n)+r:bs}(r,t,e,n);return s!==bs&&function(t,e,n){const r=le(e,t);!function(t,e,n){ie(t)?t.setValue(e,n):e.textContent=n}(t[11],r,n)}(r,$e(),s),uo}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const ho=void 0;var fo=["en",[["a","p"],["AM","PM"],ho],[["AM","PM"],ho,ho],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],ho,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],ho,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm a","h:mm:ss a","h:mm:ss a z","h:mm:ss a zzzz"],["{1}, {0}",ho,"{1} 'at' {0}",ho],[".",",",";","%","+","-","E","\xd7","\u2030","\u221e","NaN",":"],["#,##0.###","#,##0%","\xa4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",function(t){let e=Math.floor(Math.abs(t)),n=t.toString().replace(/^[^.]*\.?/,"").length;return 1===e&&0===n?1:5}];
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */let po={};function mo(t){return t in po||(po[t]=vt.ng&&vt.ng.common&&vt.ng.common.locales&&vt.ng.common.locales[t]),po[t]}var go=function(t){return t[t.LocaleId=0]="LocaleId",t[t.DayPeriodsFormat=1]="DayPeriodsFormat",t[t.DayPeriodsStandalone=2]="DayPeriodsStandalone",t[t.DaysFormat=3]="DaysFormat",t[t.DaysStandalone=4]="DaysStandalone",t[t.MonthsFormat=5]="MonthsFormat",t[t.MonthsStandalone=6]="MonthsStandalone",t[t.Eras=7]="Eras",t[t.FirstDayOfWeek=8]="FirstDayOfWeek",t[t.WeekendRange=9]="WeekendRange",t[t.DateFormat=10]="DateFormat",t[t.TimeFormat=11]="TimeFormat",t[t.DateTimeFormat=12]="DateTimeFormat",t[t.NumberSymbols=13]="NumberSymbols",t[t.NumberFormats=14]="NumberFormats",t[t.CurrencyCode=15]="CurrencyCode",t[t.CurrencySymbol=16]="CurrencySymbol",t[t.CurrencyName=17]="CurrencyName",t[t.Currencies=18]="Currencies",t[t.Directionality=19]="Directionality",t[t.PluralCase=20]="PluralCase",t[t.ExtraData=21]="ExtraData",t}({});const yo="en-US";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let _o=yo;function bo(t){var e,n;n="Expected localeId to be defined",null==(e=t)&&function(t,e,n,r){throw new Error(`ASSERTION ERROR: ${t} [Expected=> null != ${e} <=Actual]`)}(n,e),"string"==typeof t&&(_o=t.toLowerCase().replace(/_/g,"-"))}class vo{}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class wo{resolveComponentFactory(t){throw function(t){const e=Error(`No component factory found for ${Q(t)}. Did you add it to @NgModule.entryComponents?`);return e.ngComponent=t,e}(t)}}let Co=(()=>{class t{}return t.NULL=new wo,t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function xo(...t){}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Eo(t,e){return new ko(ce(t,e))}const To=function(){return Eo(xe(),ve())};let ko=(()=>{class t{constructor(t){this.nativeElement=t}}return t.__NG_ELEMENT_ID__=To,t})();function Io(t){return t instanceof ko?t.nativeElement:t}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class Ao{}let So=(()=>{class t{}return t.\u0275prov=tt({token:t,providedIn:"root",factory:()=>null}),t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class Oo{constructor(t){this.full=t,this.major=t.split(".")[0],this.minor=t.split(".")[1],this.patch=t.split(".").slice(2).join(".")}}const Ro=new Oo("11.2.0");
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class Do{constructor(){}supports(t){return Fi(t)}create(t){return new Po(t)}}const No=(t,e)=>e;class Po{constructor(t){this.length=0,this._linkedRecords=null,this._unlinkedRecords=null,this._previousItHead=null,this._itHead=null,this._itTail=null,this._additionsHead=null,this._additionsTail=null,this._movesHead=null,this._movesTail=null,this._removalsHead=null,this._removalsTail=null,this._identityChangesHead=null,this._identityChangesTail=null,this._trackByFn=t||No}forEachItem(t){let e;for(e=this._itHead;null!==e;e=e._next)t(e)}forEachOperation(t){let e=this._itHead,n=this._removalsHead,r=0,s=null;for(;e||n;){const i=!n||e&&e.currentIndex<Lo(n,r,s)?e:n,o=Lo(i,r,s),a=i.currentIndex;if(i===n)r--,n=n._nextRemoved;else if(e=e._next,null==i.previousIndex)r++;else{s||(s=[]);const t=o-r,e=a-r;if(t!=e){for(let n=0;n<t;n++){const r=n<s.length?s[n]:s[n]=0,i=r+n;e<=i&&i<t&&(s[n]=r+1)}s[i.previousIndex]=e-t}}o!==a&&t(i,o,a)}}forEachPreviousItem(t){let e;for(e=this._previousItHead;null!==e;e=e._nextPrevious)t(e)}forEachAddedItem(t){let e;for(e=this._additionsHead;null!==e;e=e._nextAdded)t(e)}forEachMovedItem(t){let e;for(e=this._movesHead;null!==e;e=e._nextMoved)t(e)}forEachRemovedItem(t){let e;for(e=this._removalsHead;null!==e;e=e._nextRemoved)t(e)}forEachIdentityChange(t){let e;for(e=this._identityChangesHead;null!==e;e=e._nextIdentityChange)t(e)}diff(t){if(null==t&&(t=[]),!Fi(t))throw new Error(`Error trying to diff '${Q(t)}'. Only arrays and iterables are allowed`);return this.check(t)?this:null}onDestroy(){}check(t){this._reset();let e,n,r,s=this._itHead,i=!1;if(Array.isArray(t)){this.length=t.length;for(let e=0;e<this.length;e++)n=t[e],r=this._trackByFn(e,n),null!==s&&Object.is(s.trackById,r)?(i&&(s=this._verifyReinsertion(s,n,r,e)),Object.is(s.item,n)||this._addIdentityChange(s,n)):(s=this._mismatch(s,n,r,e),i=!0),s=s._next}else e=0,function(t,e){if(Array.isArray(t))for(let n=0;n<t.length;n++)e(t[n]);else{const n=t[ji()]();let r;for(;!(r=n.next()).done;)e(r.value)}}(t,t=>{r=this._trackByFn(e,t),null!==s&&Object.is(s.trackById,r)?(i&&(s=this._verifyReinsertion(s,t,r,e)),Object.is(s.item,t)||this._addIdentityChange(s,t)):(s=this._mismatch(s,t,r,e),i=!0),s=s._next,e++}),this.length=e;return this._truncate(s),this.collection=t,this.isDirty}get isDirty(){return null!==this._additionsHead||null!==this._movesHead||null!==this._removalsHead||null!==this._identityChangesHead}_reset(){if(this.isDirty){let t;for(t=this._previousItHead=this._itHead;null!==t;t=t._next)t._nextPrevious=t._next;for(t=this._additionsHead;null!==t;t=t._nextAdded)t.previousIndex=t.currentIndex;for(this._additionsHead=this._additionsTail=null,t=this._movesHead;null!==t;t=t._nextMoved)t.previousIndex=t.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(t,e,n,r){let s;return null===t?s=this._itTail:(s=t._prev,this._remove(t)),null!==(t=null===this._unlinkedRecords?null:this._unlinkedRecords.get(n,null))?(Object.is(t.item,e)||this._addIdentityChange(t,e),this._reinsertAfter(t,s,r)):null!==(t=null===this._linkedRecords?null:this._linkedRecords.get(n,r))?(Object.is(t.item,e)||this._addIdentityChange(t,e),this._moveAfter(t,s,r)):t=this._addAfter(new Mo(e,n),s,r),t}_verifyReinsertion(t,e,n,r){let s=null===this._unlinkedRecords?null:this._unlinkedRecords.get(n,null);return null!==s?t=this._reinsertAfter(s,t._prev,r):t.currentIndex!=r&&(t.currentIndex=r,this._addToMoves(t,r)),t}_truncate(t){for(;null!==t;){const e=t._next;this._addToRemovals(this._unlink(t)),t=e}null!==this._unlinkedRecords&&this._unlinkedRecords.clear(),null!==this._additionsTail&&(this._additionsTail._nextAdded=null),null!==this._movesTail&&(this._movesTail._nextMoved=null),null!==this._itTail&&(this._itTail._next=null),null!==this._removalsTail&&(this._removalsTail._nextRemoved=null),null!==this._identityChangesTail&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(t,e,n){null!==this._unlinkedRecords&&this._unlinkedRecords.remove(t);const r=t._prevRemoved,s=t._nextRemoved;return null===r?this._removalsHead=s:r._nextRemoved=s,null===s?this._removalsTail=r:s._prevRemoved=r,this._insertAfter(t,e,n),this._addToMoves(t,n),t}_moveAfter(t,e,n){return this._unlink(t),this._insertAfter(t,e,n),this._addToMoves(t,n),t}_addAfter(t,e,n){return this._insertAfter(t,e,n),this._additionsTail=null===this._additionsTail?this._additionsHead=t:this._additionsTail._nextAdded=t,t}_insertAfter(t,e,n){const r=null===e?this._itHead:e._next;return t._next=r,t._prev=e,null===r?this._itTail=t:r._prev=t,null===e?this._itHead=t:e._next=t,null===this._linkedRecords&&(this._linkedRecords=new Fo),this._linkedRecords.put(t),t.currentIndex=n,t}_remove(t){return this._addToRemovals(this._unlink(t))}_unlink(t){null!==this._linkedRecords&&this._linkedRecords.remove(t);const e=t._prev,n=t._next;return null===e?this._itHead=n:e._next=n,null===n?this._itTail=e:n._prev=e,t}_addToMoves(t,e){return t.previousIndex===e||(this._movesTail=null===this._movesTail?this._movesHead=t:this._movesTail._nextMoved=t),t}_addToRemovals(t){return null===this._unlinkedRecords&&(this._unlinkedRecords=new Fo),this._unlinkedRecords.put(t),t.currentIndex=null,t._nextRemoved=null,null===this._removalsTail?(this._removalsTail=this._removalsHead=t,t._prevRemoved=null):(t._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=t),t}_addIdentityChange(t,e){return t.item=e,this._identityChangesTail=null===this._identityChangesTail?this._identityChangesHead=t:this._identityChangesTail._nextIdentityChange=t,t}}class Mo{constructor(t,e){this.item=t,this.trackById=e,this.currentIndex=null,this.previousIndex=null,this._nextPrevious=null,this._prev=null,this._next=null,this._prevDup=null,this._nextDup=null,this._prevRemoved=null,this._nextRemoved=null,this._nextAdded=null,this._nextMoved=null,this._nextIdentityChange=null}}class jo{constructor(){this._head=null,this._tail=null}add(t){null===this._head?(this._head=this._tail=t,t._nextDup=null,t._prevDup=null):(this._tail._nextDup=t,t._prevDup=this._tail,t._nextDup=null,this._tail=t)}get(t,e){let n;for(n=this._head;null!==n;n=n._nextDup)if((null===e||e<=n.currentIndex)&&Object.is(n.trackById,t))return n;return null}remove(t){const e=t._prevDup,n=t._nextDup;return null===e?this._head=n:e._nextDup=n,null===n?this._tail=e:n._prevDup=e,null===this._head}}class Fo{constructor(){this.map=new Map}put(t){const e=t.trackById;let n=this.map.get(e);n||(n=new jo,this.map.set(e,n)),n.add(t)}get(t,e){const n=this.map.get(t);return n?n.get(t,e):null}remove(t){const e=t.trackById;return this.map.get(e).remove(t)&&this.map.delete(e),t}get isEmpty(){return 0===this.map.size}clear(){this.map.clear()}}function Lo(t,e,n){const r=t.previousIndex;if(null===r)return r;let s=0;return n&&r<n.length&&(s=n[r]),r+e+s}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class Ho{constructor(){}supports(t){return t instanceof Map||Li(t)}create(){return new Vo}}class Vo{constructor(){this._records=new Map,this._mapHead=null,this._appendAfter=null,this._previousMapHead=null,this._changesHead=null,this._changesTail=null,this._additionsHead=null,this._additionsTail=null,this._removalsHead=null,this._removalsTail=null}get isDirty(){return null!==this._additionsHead||null!==this._changesHead||null!==this._removalsHead}forEachItem(t){let e;for(e=this._mapHead;null!==e;e=e._next)t(e)}forEachPreviousItem(t){let e;for(e=this._previousMapHead;null!==e;e=e._nextPrevious)t(e)}forEachChangedItem(t){let e;for(e=this._changesHead;null!==e;e=e._nextChanged)t(e)}forEachAddedItem(t){let e;for(e=this._additionsHead;null!==e;e=e._nextAdded)t(e)}forEachRemovedItem(t){let e;for(e=this._removalsHead;null!==e;e=e._nextRemoved)t(e)}diff(t){if(t){if(!(t instanceof Map||Li(t)))throw new Error(`Error trying to diff '${Q(t)}'. Only maps and objects are allowed`)}else t=new Map;return this.check(t)?this:null}onDestroy(){}check(t){this._reset();let e=this._mapHead;if(this._appendAfter=null,this._forEach(t,(t,n)=>{if(e&&e.key===n)this._maybeAddToChanges(e,t),this._appendAfter=e,e=e._next;else{const r=this._getOrCreateRecordForKey(n,t);e=this._insertBeforeOrAppend(e,r)}}),e){e._prev&&(e._prev._next=null),this._removalsHead=e;for(let t=e;null!==t;t=t._nextRemoved)t===this._mapHead&&(this._mapHead=null),this._records.delete(t.key),t._nextRemoved=t._next,t.previousValue=t.currentValue,t.currentValue=null,t._prev=null,t._next=null}return this._changesTail&&(this._changesTail._nextChanged=null),this._additionsTail&&(this._additionsTail._nextAdded=null),this.isDirty}_insertBeforeOrAppend(t,e){if(t){const n=t._prev;return e._next=t,e._prev=n,t._prev=e,n&&(n._next=e),t===this._mapHead&&(this._mapHead=e),this._appendAfter=t,t}return this._appendAfter?(this._appendAfter._next=e,e._prev=this._appendAfter):this._mapHead=e,this._appendAfter=e,null}_getOrCreateRecordForKey(t,e){if(this._records.has(t)){const n=this._records.get(t);this._maybeAddToChanges(n,e);const r=n._prev,s=n._next;return r&&(r._next=s),s&&(s._prev=r),n._next=null,n._prev=null,n}const n=new Bo(t);return this._records.set(t,n),n.currentValue=e,this._addToAdditions(n),n}_reset(){if(this.isDirty){let t;for(this._previousMapHead=this._mapHead,t=this._previousMapHead;null!==t;t=t._next)t._nextPrevious=t._next;for(t=this._changesHead;null!==t;t=t._nextChanged)t.previousValue=t.currentValue;for(t=this._additionsHead;null!=t;t=t._nextAdded)t.previousValue=t.currentValue;this._changesHead=this._changesTail=null,this._additionsHead=this._additionsTail=null,this._removalsHead=null}}_maybeAddToChanges(t,e){Object.is(e,t.currentValue)||(t.previousValue=t.currentValue,t.currentValue=e,this._addToChanges(t))}_addToAdditions(t){null===this._additionsHead?this._additionsHead=this._additionsTail=t:(this._additionsTail._nextAdded=t,this._additionsTail=t)}_addToChanges(t){null===this._changesHead?this._changesHead=this._changesTail=t:(this._changesTail._nextChanged=t,this._changesTail=t)}_forEach(t,e){t instanceof Map?t.forEach(e):Object.keys(t).forEach(n=>e(t[n],n))}}class Bo{constructor(t){this.key=t,this.previousValue=null,this.currentValue=null,this._nextPrevious=null,this._next=null,this._prev=null,this._nextAdded=null,this._nextRemoved=null,this._nextChanged=null}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function zo(){return new $o([new Do])}let $o=(()=>{class t{constructor(t){this.factories=t}static create(e,n){if(null!=n){const t=n.factories.slice();e=e.concat(t)}return new t(e)}static extend(e){return{provide:t,useFactory:n=>t.create(e,n||zo()),deps:[[t,new Kn,new Qn]]}}find(t){const e=this.factories.find(e=>e.supports(t));if(null!=e)return e;throw new Error(`Cannot find a differ supporting object '${t}' of type '${n=t,n.name||typeof n}'`);var n;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */}}return t.\u0275prov=tt({token:t,providedIn:"root",factory:zo}),t})();function Uo(){return new qo([new Ho])}let qo=(()=>{class t{constructor(t){this.factories=t}static create(e,n){if(n){const t=n.factories.slice();e=e.concat(t)}return new t(e)}static extend(e){return{provide:t,useFactory:n=>t.create(e,n||Uo()),deps:[[t,new Kn,new Qn]]}}find(t){const e=this.factories.find(e=>e.supports(t));if(e)return e;throw new Error(`Cannot find a differ supporting object '${t}'`)}}return t.\u0275prov=tt({token:t,providedIn:"root",factory:Uo}),t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Zo(t,e,n,r,s=!1){for(;null!==n;){const i=e[n.index];if(null!==i&&r.push(ae(i)),$t(i))for(let t=Bt;t<i.length;t++){const e=i[t],n=e[1].firstChild;null!==n&&Zo(e[1],e,n,r)}const o=n.type;if(8&o)Zo(t,e,n.child,r);else if(32&o){const t=Mr(n,e);let s;for(;s=t();)r.push(s)}else if(16&o){const t=es(e,n);if(Array.isArray(t))r.push(...t);else{const n=jr(e[16]);Zo(n[1],n,t,r,!0)}}n=s?n.projectionNext:n.next}return r}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class Wo{constructor(t,e){this._lView=t,this._cdRefInjectingView=e,this._appRef=null,this._attachedToViewContainer=!1}get rootNodes(){const t=this._lView,e=t[1];return Zo(e,t,e.firstChild,[])}get context(){return this._lView[8]}get destroyed(){return 256==(256&this._lView[2])}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){const t=this._lView[3];if($t(t)){const e=t[8],n=e?e.indexOf(this):-1;n>-1&&($r(t,n),Nn(e,n))}this._attachedToViewContainer=!1}Ur(this._lView[1],this._lView)}onDestroy(t){Vs(this._lView[1],this._lView,null,t)}markForCheck(){ri(this._cdRefInjectingView||this._lView)}detach(){this._lView[2]&=-129}reattach(){this._lView[2]|=128}detectChanges(){si(this._lView[1],this._lView,this.context)}checkNoChanges(){!function(t,e,n){Se(!0);try{si(t,e,n)}finally{Se(!1)}}(this._lView[1],this._lView,this.context)}attachToViewContainerRef(){if(this._appRef)throw new Error("This view is already attached directly to the ApplicationRef!");this._attachedToViewContainer=!0}detachFromAppRef(){var t;this._appRef=null,ss(this._lView[1],t=this._lView,t[11],2,null,null)}attachToAppRef(t){if(this._attachedToViewContainer)throw new Error("This view is already attached to a ViewContainer!");this._appRef=t}}class Go extends Wo{constructor(t){super(t),this._view=t}detectChanges(){ii(this._view)}checkNoChanges(){!function(t){Se(!0);try{ii(t)}finally{Se(!1)}}(this._view)}get context(){return null}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Qo=[new Ho],Ko=new $o([new Do]),Jo=new qo(Qo),Yo=function(){return na(xe(),ve())};let Xo=(()=>{class t{}return t.__NG_ELEMENT_ID__=Yo,t})();const ta=Xo,ea=class extends ta{constructor(t,e,n){super(),this._declarationLView=t,this._declarationTContainer=e,this.elementRef=n}createEmbeddedView(t){const e=this._declarationTContainer.tViews,n=Ss(this._declarationLView,e,t,16,null,e.declTNode,null,null,null,null);n[17]=this._declarationLView[this._declarationTContainer.index];const r=this._declarationLView[19];return null!==r&&(n[19]=r.createEmbeddedView(e)),Ds(e,n,t),new Wo(n)}};function na(t,e){return 4&t.type?new ea(e,t,Eo(t,e)):null}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class ra{}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const sa=function(){return ua(xe(),ve())};let ia=(()=>{class t{}return t.__NG_ELEMENT_ID__=sa,t})();const oa=ia,aa=class extends oa{constructor(t,e,n){super(),this._lContainer=t,this._hostTNode=e,this._hostLView=n}get element(){return Eo(this._hostTNode,this._hostLView)}get injector(){return new kn(this._hostTNode,this._hostLView)}get parentInjector(){const t=pn(this._hostTNode,this._hostLView);if(sn(t)){const e=an(t,this._hostLView),n=on(t);return new kn(e[1].data[n+8],e)}return new kn(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(t){const e=la(this._lContainer);return null!==e&&e[t]||null}get length(){return this._lContainer.length-Bt}createEmbeddedView(t,e,n){const r=t.createEmbeddedView(e||{});return this.insert(r,n),r}createComponent(t,e,n,r,s){const i=n||this.parentInjector;if(!s&&null==t.ngModule&&i){const t=i.get(ra,null);t&&(s=t)}const o=t.create(i,r,void 0,s);return this.insert(o.hostView,e),o}insert(t,e){const n=t._lView,r=n[1];if($t(n[3])){const e=this.indexOf(t);if(-1!==e)this.detach(e);else{const e=n[3],r=new aa(e,e[6],e[3]);r.detach(r.indexOf(t))}}const s=this._adjustIndex(e),i=this._lContainer;!function(t,e,n,r){const s=Bt+r,i=n.length;r>0&&(n[s-1][4]=e),r<i-Bt?(e[4]=n[s],Dn(n,Bt+r,e)):(n.push(e),e[4]=null),e[3]=n;const o=e[17];null!==o&&n!==o&&function(t,e){const n=t[9];e[16]!==e[3][3][16]&&(t[2]=!0),null===n?t[9]=[e]:n.push(e)}(o,e);const a=e[19];null!==a&&a.insertView(t),e[2]|=128}(r,n,i,s);const o=ns(s,i),a=n[11],l=Kr(a,i[7]);return null!==l&&function(t,e,n,r,s,i){r[0]=s,r[6]=e,ss(t,r,n,1,s,i)}(r,i[6],a,n,l,o),t.attachToViewContainerRef(),Dn(ca(i),s,t),t}move(t,e){return this.insert(t,e)}indexOf(t){const e=la(this._lContainer);return null!==e?e.indexOf(t):-1}remove(t){const e=this._adjustIndex(t,-1),n=$r(this._lContainer,e);n&&(Nn(ca(this._lContainer),e),Ur(n[1],n))}detach(t){const e=this._adjustIndex(t,-1),n=$r(this._lContainer,e);return n&&null!=Nn(ca(this._lContainer),e)?new Wo(n):null}_adjustIndex(t,e=0){return null==t?this.length+e:t}};function la(t){return t[8]}function ca(t){return t[8]||(t[8]=[])}function ua(t,e){let n;const r=e[t.index];if($t(r))n=r;else{let s;if(8&t.type)s=ae(r);else{const n=e[11];s=n.createComment("");const r=ce(t,e);Wr(n,Kr(n,r),s,function(t,e){return ie(t)?t.nextSibling(e):e.nextSibling}(n,r),!1)}e[t.index]=n=Ys(r,e,s,t),ni(e,n)}return new aa(n,t,e)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */const ha={};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class da extends Co{constructor(t){super(),this.ngModule=t}resolveComponentFactory(t){const e=Lt(t);return new ma(e,this.ngModule)}}function fa(t){const e=[];for(let n in t)t.hasOwnProperty(n)&&e.push({propName:t[n],templateName:n});return e}const pa=new Sn("SCHEDULER_TOKEN",{providedIn:"root",factory:()=>Dr});class ma extends vo{constructor(t,e){super(),this.componentDef=t,this.ngModule=e,this.componentType=t.type,this.selector=t.selectors.map(_s).join(","),this.ngContentSelectors=t.ngContentSelectors?t.ngContentSelectors:[],this.isBoundToModule=!!e}get inputs(){return fa(this.componentDef.inputs)}get outputs(){return fa(this.componentDef.outputs)}create(t,e,n,r){const s=(r=r||this.ngModule)?function(t,e){return{get:(n,r,s)=>{const i=t.get(n,ha,s);return i!==ha||r===ha?i:e.get(n,r,s)}}}(t,r.injector):t,i=s.get(Ao,oe),o=s.get(So,null),a=i.createRenderer(null,this.componentDef),l=this.componentDef.selectors[0][0]||"div",c=n?function(t,e,n){if(ie(t))return t.selectRootElement(e,n===mt.ShadowDom);let r="string"==typeof e?t.querySelector(e):e;return r.textContent="",r}(a,n,this.componentDef.encapsulation):Br(i.createRenderer(null,this.componentDef),l,function(t){const e=t.toLowerCase();return"svg"===e?"http://www.w3.org/2000/svg":"math"===e?"http://www.w3.org/1998/MathML/":null}(l)),u=this.componentDef.onPush?576:528,h={components:[],scheduler:Dr,clean:ai,playerHandler:null,flags:0},d=Hs(0,null,null,1,0,null,null,null,null,null),f=Ss(null,d,h,u,null,null,i,a,o,s);let p,m;Fe(f);try{const t=function(t,e,n,r,s,i){const o=n[1];n[20]=t;const a=Os(o,20,2,"#host",null),l=a.mergedAttrs=e.hostAttrs;null!==l&&(di(a,l,!0),null!==t&&(tn(s,t,l),null!==a.classes&&as(s,t,a.classes),null!==a.styles&&os(s,t,a.styles)));const c=r.createRenderer(t,e),u=Ss(n,Ls(e),null,e.onPush?64:16,n[20],a,r,c,null,null);return o.firstCreatePass&&(mn(hn(a,n),o,e.type),qs(o,a),Ws(a,n.length,1)),ni(n,u),n[20]=u}(c,this.componentDef,f,i,a);if(c)if(n)tn(a,c,["ng-version",Ro.full]);else{const{attrs:t,classes:e}=function(t){const e=[],n=[];let r=1,s=2;for(;r<t.length;){let i=t[r];if("string"==typeof i)2===s?""!==i&&e.push(i,t[++r]):8===s&&n.push(i);else{if(!ps(s))break;s=i}r++}return{attrs:e,classes:n}}(this.componentDef.selectors[0]);t&&tn(a,c,t),e&&e.length>0&&as(a,c,e.join(" "))}if(m=ue(d,Vt),void 0!==e){const t=m.projection=[];for(let n=0;n<this.ngContentSelectors.length;n++){const r=e[n];t.push(null!=r?Array.from(r):null)}}p=function(t,e,n,r,s){const i=n[1],o=function(t,e,n){const r=xe();t.firstCreatePass&&(n.providersResolver&&n.providersResolver(n),Gs(t,r,e,Rs(t,e,1,null),n));const s=xn(e,t,r.directiveStart,r);Rr(s,e);const i=ce(r,e);return i&&Rr(i,e),s}(i,n,e);if(r.components.push(o),t[8]=o,s&&s.forEach(t=>t(o,e)),e.contentQueries){const t=xe();e.contentQueries(1,o,t.directiveStart)}const a=xe();return!i.firstCreatePass||null===e.hostBindings&&null===e.hostAttrs||(Ue(a.index),$s(n[1],a,0,a.directiveStart,a.directiveEnd,e),Us(e,o)),o}(t,this.componentDef,f,h,[Si]),Ds(d,f,null)}finally{ze()}return new ga(this.componentType,p,Eo(m,f),f,m)}}class ga extends
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class{}{constructor(t,e,n,r,s){super(),this.location=n,this._rootLView=r,this._tNode=s,this.instance=e,this.hostView=this.changeDetectorRef=new Go(r),this.componentType=t}get injector(){return new kn(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(t){this.hostView.onDestroy(t)}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const ya=new Map;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class _a extends ra{constructor(t,e){super(),this._parent=e,this._bootstrapComponents=[],this.injector=this,this.destroyCbs=[],this.componentFactoryResolver=new da(this);const n=Ht(t),r=t[It]||null;r&&bo(r),this._bootstrapComponents=Nr(n.bootstrap),this._r3Injector=wi(t,e,[{provide:ra,useValue:this},{provide:Co,useValue:this.componentFactoryResolver}],Q(t)),this._r3Injector._resolveInjectorDefTypes(),this.instance=this.get(t)}get(t,e=Ai.THROW_IF_NOT_FOUND,n=ct.Default){return t===Ai||t===ra||t===fi?this:this._r3Injector.get(t,e,n)}destroy(){const t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(t=>t()),this.destroyCbs=null}onDestroy(t){this.destroyCbs.push(t)}}class ba extends class{}{constructor(t){super(),this.moduleType=t,null!==Ht(t)&&function(t){const e=new Set;!function t(n){const r=Ht(n,!0),s=r.id;null!==s&&(function(t,e,n){if(e&&e!==n)throw new Error(`Duplicate module registered for ${t} - ${Q(e)} vs ${Q(e.name)}`)}(s,ya.get(s),n),ya.set(s,n));const i=Nr(r.imports);for(const o of i)e.has(o)||(e.add(o),t(o))}(t)}(t)}create(t){return new _a(this.moduleType,t)}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */const va=
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class extends x{constructor(t=!1){super(),this.__isAsync=t}emit(t){super.next(t)}subscribe(t,e,n){let r,s=t=>null,i=()=>null;t&&"object"==typeof t?(r=this.__isAsync?e=>{setTimeout(()=>t.next(e))}:e=>{t.next(e)},t.error&&(s=this.__isAsync?e=>{setTimeout(()=>t.error(e))}:e=>{t.error(e)}),t.complete&&(i=this.__isAsync?()=>{setTimeout(()=>t.complete())}:()=>{t.complete()})):(r=this.__isAsync?e=>{setTimeout(()=>t(e))}:e=>{t(e)},e&&(s=this.__isAsync?t=>{setTimeout(()=>e(t))}:t=>{e(t)}),n&&(i=this.__isAsync?()=>{setTimeout(()=>n())}:()=>{n()}));const o=super.subscribe(r,s,i);return t instanceof h&&t.add(o),o}};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function wa(){return this._results[ji()]()}class Ca{constructor(t=!1){this._emitDistinctChangesOnly=t,this.dirty=!0,this._results=[],this._changesDetected=!1,this._changes=null,this.length=0,this.first=void 0,this.last=void 0;const e=ji(),n=Ca.prototype;n[e]||(n[e]=wa)}get changes(){return this._changes||(this._changes=new va)}get(t){return this._results[t]}map(t){return this._results.map(t)}filter(t){return this._results.filter(t)}find(t){return this._results.find(t)}reduce(t,e){return this._results.reduce(t,e)}forEach(t){this._results.forEach(t)}some(t){return this._results.some(t)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(t,e){const n=this;n.dirty=!1;const r=On(t);(this._changesDetected=!function(t,e,n){if(t.length!==e.length)return!1;for(let r=0;r<t.length;r++){let s=t[r],i=e[r];if(n&&(s=n(s),i=n(i)),i!==s)return!1}return!0}(n._results,r,e))&&(n._results=r,n.length=r.length,n.last=r[this.length-1],n.first=r[0])}notifyOnChanges(){!this._changes||!this._changesDetected&&this._emitDistinctChangesOnly||this._changes.emit(this)}setDirty(){this.dirty=!0}destroy(){this.changes.complete(),this.changes.unsubscribe()}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class xa{constructor(t){this.queryList=t,this.matches=null}clone(){return new xa(this.queryList)}setDirty(){this.queryList.setDirty()}}class Ea{constructor(t=[]){this.queries=t}createEmbeddedView(t){const e=t.queries;if(null!==e){const n=null!==t.contentQueries?t.contentQueries[0]:e.length,r=[];for(let t=0;t<n;t++){const n=e.getByIndex(t);r.push(this.queries[n.indexInDeclarationView].clone())}return new Ea(r)}return null}insertView(t){this.dirtyQueriesWithMatches(t)}detachView(t){this.dirtyQueriesWithMatches(t)}dirtyQueriesWithMatches(t){for(let e=0;e<this.queries.length;e++)null!==Ma(t,e).matches&&this.queries[e].setDirty()}}class Ta{constructor(t,e,n=null){this.predicate=t,this.flags=e,this.read=n}}class ka{constructor(t=[]){this.queries=t}elementStart(t,e){for(let n=0;n<this.queries.length;n++)this.queries[n].elementStart(t,e)}elementEnd(t){for(let e=0;e<this.queries.length;e++)this.queries[e].elementEnd(t)}embeddedTView(t){let e=null;for(let n=0;n<this.length;n++){const r=null!==e?e.length:0,s=this.getByIndex(n).embeddedTView(t,r);s&&(s.indexInDeclarationView=n,null!==e?e.push(s):e=[s])}return null!==e?new ka(e):null}template(t,e){for(let n=0;n<this.queries.length;n++)this.queries[n].template(t,e)}getByIndex(t){return this.queries[t]}get length(){return this.queries.length}track(t){this.queries.push(t)}}class Ia{constructor(t,e=-1){this.metadata=t,this.matches=null,this.indexInDeclarationView=-1,this.crossesNgTemplate=!1,this._appliesToNextNode=!0,this._declarationNodeIndex=e}elementStart(t,e){this.isApplyingToNode(e)&&this.matchTNode(t,e)}elementEnd(t){this._declarationNodeIndex===t.index&&(this._appliesToNextNode=!1)}template(t,e){this.elementStart(t,e)}embeddedTView(t,e){return this.isApplyingToNode(t)?(this.crossesNgTemplate=!0,this.addMatch(-t.index,e),new Ia(this.metadata)):null}isApplyingToNode(t){if(this._appliesToNextNode&&1!=(1&this.metadata.flags)){const e=this._declarationNodeIndex;let n=t.parent;for(;null!==n&&8&n.type&&n.index!==e;)n=n.parent;return e===(null!==n?n.index:-1)}return this._appliesToNextNode}matchTNode(t,e){const n=this.metadata.predicate;if(Array.isArray(n))for(let r=0;r<n.length;r++){const s=n[r];this.matchTNodeWithReadOption(t,e,Aa(e,s)),this.matchTNodeWithReadOption(t,e,Cn(e,t,s,!1,!1))}else n===Xo?4&e.type&&this.matchTNodeWithReadOption(t,e,-1):this.matchTNodeWithReadOption(t,e,Cn(e,t,n,!1,!1))}matchTNodeWithReadOption(t,e,n){if(null!==n){const r=this.metadata.read;if(null!==r)if(r===ko||r===ia||r===Xo&&4&e.type)this.addMatch(e.index,-2);else{const n=Cn(e,t,r,!1,!1);null!==n&&this.addMatch(e.index,n)}else this.addMatch(e.index,n)}}addMatch(t,e){null===this.matches?this.matches=[t,e]:this.matches.push(t,e)}}function Aa(t,e){const n=t.localNames;if(null!==n)for(let r=0;r<n.length;r+=2)if(n[r]===e)return n[r+1];return null}function Sa(t,e,n,r){return-1===n?function(t,e){return 11&t.type?Eo(t,e):4&t.type?na(t,e):null}(e,t):-2===n?function(t,e,n){return n===ko?Eo(e,t):n===Xo?na(e,t):n===ia?ua(e,t):void 0}(t,e,r):xn(t,t[1],n,e)}function Oa(t,e,n,r){const s=e[19].queries[r];if(null===s.matches){const r=t.data,i=n.matches,o=[];for(let t=0;t<i.length;t+=2){const s=i[t];o.push(s<0?null:Sa(e,r[s],i[t+1],n.metadata.read))}s.matches=o}return s.matches}function Ra(t,e,n,r){const s=t.queries.getByIndex(n),i=s.matches;if(null!==i){const o=Oa(t,e,s,n);for(let t=0;t<i.length;t+=2){const n=i[t];if(n>0)r.push(o[t/2]);else{const s=i[t+1],o=e[-n];for(let t=Bt;t<o.length;t++){const e=o[t];e[17]===e[3]&&Ra(e[1],e,s,r)}if(null!==o[9]){const t=o[9];for(let e=0;e<t.length;e++){const n=t[e];Ra(n[1],n,s,r)}}}}}return r}function Da(t){const e=ve(),n=we(),r=Ne();Pe(r+1);const s=Ma(n,r);if(t.dirty&&fe(e)===(2==(2&s.metadata.flags))){if(null===s.matches)t.reset([]);else{const i=s.crossesNgTemplate?Ra(n,e,r,[]):Oa(n,e,s,r);t.reset(i,Io),t.notifyOnChanges()}return!0}return!1}function Na(t,e,n){const r=we();r.firstCreatePass&&(function(t,e,n){null===t.queries&&(t.queries=new ka),t.queries.track(new Ia(e,-1))}(r,new Ta(t,e,n)),2==(2&e)&&(r.staticViewQueries=!0)),function(t,e,n){const r=new Ca(4==(4&n));Vs(t,e,r,r.destroy),null===e[19]&&(e[19]=new Ea),e[19].queries.push(new xa(r))}(r,ve(),e)}function Pa(){return t=ve(),e=Ne(),t[19].queries[e].queryList;var t,e}function Ma(t,e){return t.queries.getByIndex(e)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */const ja=new Sn("Application Initializer");let Fa=(()=>{class t{constructor(t){this.appInits=t,this.resolve=xo,this.reject=xo,this.initialized=!1,this.done=!1,this.donePromise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}runInitializers(){if(this.initialized)return;const t=[],e=()=>{this.done=!0,this.resolve()};if(this.appInits)for(let n=0;n<this.appInits.length;n++){const e=this.appInits[n]();Qi(e)&&t.push(e)}Promise.all(t).then(()=>{e()}).catch(t=>{this.reject(t)}),0===t.length&&e(),this.initialized=!0}}return t.\u0275fac=function(e){return new(e||t)(qn(ja,8))},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const La=new Sn("AppId"),Ha={provide:La,useFactory:function(){return`${Va()}${Va()}${Va()}`},deps:[]};function Va(){return String.fromCharCode(97+Math.floor(25*Math.random()))}const Ba=new Sn("Platform Initializer"),za=new Sn("Platform ID"),$a=new Sn("appBootstrapListener");let Ua=(()=>{class t{log(t){console.log(t)}warn(t){console.warn(t)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const qa=new Sn("LocaleId"),Za=new Sn("DefaultCurrencyCode");
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class Wa{constructor(t,e){this.ngModuleFactory=t,this.componentFactories=e}}const Ga=function(t){return new ba(t)},Qa=Ga,Ka=function(t){return Promise.resolve(Ga(t))},Ja=function(t){const e=Ga(t),n=Nr(Ht(t).declarations).reduce((t,e)=>{const n=Lt(e);return n&&t.push(new ma(n)),t},[]);return new Wa(e,n)},Ya=Ja,Xa=function(t){return Promise.resolve(Ja(t))};let tl=(()=>{class t{constructor(){this.compileModuleSync=Qa,this.compileModuleAsync=Ka,this.compileModuleAndAllComponentsSync=Ya,this.compileModuleAndAllComponentsAsync=Xa}clearCache(){}clearCacheFor(t){}getModuleId(t){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})();const el=(()=>Promise.resolve(0))();function nl(t){"undefined"==typeof Zone?el.then(()=>{t&&t.apply(null,null)}):Zone.current.scheduleMicroTask("scheduleMicrotask",t)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class rl{constructor({enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:e=!1,shouldCoalesceRunChangeDetection:n=!1}){if(this.hasPendingMacrotasks=!1,this.hasPendingMicrotasks=!1,this.isStable=!0,this.onUnstable=new va(!1),this.onMicrotaskEmpty=new va(!1),this.onStable=new va(!1),this.onError=new va(!1),"undefined"==typeof Zone)throw new Error("In this configuration Angular requires Zone.js");Zone.assertZonePatched();const r=this;r._nesting=0,r._outer=r._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(r._inner=r._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(r._inner=r._inner.fork(Zone.longStackTraceZoneSpec)),r.shouldCoalesceEventChangeDetection=!n&&e,r.shouldCoalesceRunChangeDetection=n,r.lastRequestAnimationFrameId=-1,r.nativeRequestAnimationFrame=function(){let t=vt.requestAnimationFrame,e=vt.cancelAnimationFrame;if("undefined"!=typeof Zone&&t&&e){const n=t[Zone.__symbol__("OriginalDelegate")];n&&(t=n);const r=e[Zone.__symbol__("OriginalDelegate")];r&&(e=r)}return{nativeRequestAnimationFrame:t,nativeCancelAnimationFrame:e}}().nativeRequestAnimationFrame,function(t){const e=()=>{!function(t){-1===t.lastRequestAnimationFrameId&&(t.lastRequestAnimationFrameId=t.nativeRequestAnimationFrame.call(vt,()=>{t.fakeTopEventTask||(t.fakeTopEventTask=Zone.root.scheduleEventTask("fakeTopEventTask",()=>{t.lastRequestAnimationFrameId=-1,ol(t),il(t)},void 0,()=>{},()=>{})),t.fakeTopEventTask.invoke()}),ol(t))}(t)};t._inner=t._inner.fork({name:"angular",properties:{isAngularZone:!0},onInvokeTask:(n,r,s,i,o,a)=>{try{return al(t),n.invokeTask(s,i,o,a)}finally{(t.shouldCoalesceEventChangeDetection&&"eventTask"===i.type||t.shouldCoalesceRunChangeDetection)&&e(),ll(t)}},onInvoke:(n,r,s,i,o,a,l)=>{try{return al(t),n.invoke(s,i,o,a,l)}finally{t.shouldCoalesceRunChangeDetection&&e(),ll(t)}},onHasTask:(e,n,r,s)=>{e.hasTask(r,s),n===r&&("microTask"==s.change?(t._hasPendingMicrotasks=s.microTask,ol(t),il(t)):"macroTask"==s.change&&(t.hasPendingMacrotasks=s.macroTask))},onHandleError:(e,n,r,s)=>(e.handleError(r,s),t.runOutsideAngular(()=>t.onError.emit(s)),!1)})}(r)}static isInAngularZone(){return!0===Zone.current.get("isAngularZone")}static assertInAngularZone(){if(!rl.isInAngularZone())throw new Error("Expected to be in Angular Zone, but it is not!")}static assertNotInAngularZone(){if(rl.isInAngularZone())throw new Error("Expected to not be in Angular Zone, but it is!")}run(t,e,n){return this._inner.run(t,e,n)}runTask(t,e,n,r){const s=this._inner,i=s.scheduleEventTask("NgZoneEvent: "+r,t,sl,xo,xo);try{return s.runTask(i,e,n)}finally{s.cancelTask(i)}}runGuarded(t,e,n){return this._inner.runGuarded(t,e,n)}runOutsideAngular(t){return this._outer.run(t)}}const sl={};function il(t){if(0==t._nesting&&!t.hasPendingMicrotasks&&!t.isStable)try{t._nesting++,t.onMicrotaskEmpty.emit(null)}finally{if(t._nesting--,!t.hasPendingMicrotasks)try{t.runOutsideAngular(()=>t.onStable.emit(null))}finally{t.isStable=!0}}}function ol(t){t.hasPendingMicrotasks=!!(t._hasPendingMicrotasks||(t.shouldCoalesceEventChangeDetection||t.shouldCoalesceRunChangeDetection)&&-1!==t.lastRequestAnimationFrameId)}function al(t){t._nesting++,t.isStable&&(t.isStable=!1,t.onUnstable.emit(null))}function ll(t){t._nesting--,il(t)}class cl{constructor(){this.hasPendingMicrotasks=!1,this.hasPendingMacrotasks=!1,this.isStable=!0,this.onUnstable=new va,this.onMicrotaskEmpty=new va,this.onStable=new va,this.onError=new va}run(t,e,n){return t.apply(e,n)}runGuarded(t,e,n){return t.apply(e,n)}runOutsideAngular(t){return t()}runTask(t,e,n,r){return t.apply(e,n)}}let ul=(()=>{class t{constructor(t){this._ngZone=t,this._pendingCount=0,this._isZoneStable=!0,this._didWork=!1,this._callbacks=[],this.taskTrackingZone=null,this._watchAngularEvents(),t.run(()=>{this.taskTrackingZone="undefined"==typeof Zone?null:Zone.current.get("TaskTrackingZone")})}_watchAngularEvents(){this._ngZone.onUnstable.subscribe({next:()=>{this._didWork=!0,this._isZoneStable=!1}}),this._ngZone.runOutsideAngular(()=>{this._ngZone.onStable.subscribe({next:()=>{rl.assertNotInAngularZone(),nl(()=>{this._isZoneStable=!0,this._runCallbacksIfReady()})}})})}increasePendingRequestCount(){return this._pendingCount+=1,this._didWork=!0,this._pendingCount}decreasePendingRequestCount(){if(this._pendingCount-=1,this._pendingCount<0)throw new Error("pending async requests below zero");return this._runCallbacksIfReady(),this._pendingCount}isStable(){return this._isZoneStable&&0===this._pendingCount&&!this._ngZone.hasPendingMacrotasks}_runCallbacksIfReady(){if(this.isStable())nl(()=>{for(;0!==this._callbacks.length;){let t=this._callbacks.pop();clearTimeout(t.timeoutId),t.doneCb(this._didWork)}this._didWork=!1});else{let t=this.getPendingTasks();this._callbacks=this._callbacks.filter(e=>!e.updateCb||!e.updateCb(t)||(clearTimeout(e.timeoutId),!1)),this._didWork=!0}}getPendingTasks(){return this.taskTrackingZone?this.taskTrackingZone.macroTasks.map(t=>({source:t.source,creationLocation:t.creationLocation,data:t.data})):[]}addCallback(t,e,n){let r=-1;e&&e>0&&(r=setTimeout(()=>{this._callbacks=this._callbacks.filter(t=>t.timeoutId!==r),t(this._didWork,this.getPendingTasks())},e)),this._callbacks.push({doneCb:t,timeoutId:r,updateCb:n})}whenStable(t,e,n){if(n&&!this.taskTrackingZone)throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');this.addCallback(t,e,n),this._runCallbacksIfReady()}getPendingRequestCount(){return this._pendingCount}findProviders(t,e,n){return[]}}return t.\u0275fac=function(e){return new(e||t)(qn(rl))},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})(),hl=(()=>{class t{constructor(){this._applications=new Map,pl.addToWindow(this)}registerApplication(t,e){this._applications.set(t,e)}unregisterApplication(t){this._applications.delete(t)}unregisterAllApplications(){this._applications.clear()}getTestability(t){return this._applications.get(t)||null}getAllTestabilities(){return Array.from(this._applications.values())}getAllRootElements(){return Array.from(this._applications.keys())}findTestabilityInTree(t,e=!0){return pl.findTestabilityInTree(this,t,e)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})();class dl{addToWindow(t){}findTestabilityInTree(t,e,n){return null}}let fl,pl=new dl,ml=!0,gl=!1;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function yl(){return gl=!0,ml}const _l=new Sn("AllowMultipleToken");function bl(t,e,n=[]){const r=`Platform: ${e}`,s=new Sn(r);return(e=[])=>{let i=vl();if(!i||i.injector.get(_l,!1))if(t)t(n.concat(e).concat({provide:s,useValue:!0}));else{const t=n.concat(e).concat({provide:s,useValue:!0},{provide:mi,useValue:"platform"});!function(t){if(fl&&!fl.destroyed&&!fl.injector.get(_l,!1))throw new Error("There can be only one platform. Destroy the previous one to create a new one.");fl=t.get(wl);const e=t.get(Ba,null);e&&e.forEach(t=>t())}(Ai.create({providers:t,name:r}))}return function(t){const e=vl();if(!e)throw new Error("No platform exists!");if(!e.injector.get(t,null))throw new Error("A platform with a different configuration has been created. Please destroy it first.");return e}(s)}}function vl(){return fl&&!fl.destroyed?fl:null}let wl=(()=>{class t{constructor(t){this._injector=t,this._modules=[],this._destroyListeners=[],this._destroyed=!1}bootstrapModuleFactory(t,e){const n=function(t,e){let n;return n="noop"===t?new cl:("zone.js"===t?void 0:t)||new rl({enableLongStackTrace:yl(),shouldCoalesceEventChangeDetection:!!(null==e?void 0:e.ngZoneEventCoalescing),shouldCoalesceRunChangeDetection:!!(null==e?void 0:e.ngZoneRunCoalescing)}),n}(e?e.ngZone:void 0,{ngZoneEventCoalescing:e&&e.ngZoneEventCoalescing||!1,ngZoneRunCoalescing:e&&e.ngZoneRunCoalescing||!1}),r=[{provide:rl,useValue:n}];return n.run(()=>{const e=Ai.create({providers:r,parent:this.injector,name:t.moduleType.name}),s=t.create(e),i=s.injector.get(Or,null);if(!i)throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");return n.runOutsideAngular(()=>{const t=n.onError.subscribe({next:t=>{i.handleError(t)}});s.onDestroy(()=>{El(this._modules,s),t.unsubscribe()})}),function(t,e,n){try{const r=n();return Qi(r)?r.catch(n=>{throw e.runOutsideAngular(()=>t.handleError(n)),n}):r}catch(r){throw e.runOutsideAngular(()=>t.handleError(r)),r}}(i,n,()=>{const t=s.injector.get(Fa);return t.runInitializers(),t.donePromise.then(()=>(bo(s.injector.get(qa,yo)||yo),this._moduleDoBootstrap(s),s))})})}bootstrapModule(t,e=[]){const n=Cl({},e);return function(t,e,n){const r=new ba(n);return Promise.resolve(r)}(0,0,t).then(t=>this.bootstrapModuleFactory(t,n))}_moduleDoBootstrap(t){const e=t.injector.get(xl);if(t._bootstrapComponents.length>0)t._bootstrapComponents.forEach(t=>e.bootstrap(t));else{if(!t.instance.ngDoBootstrap)throw new Error(`The module ${Q(t.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`);t.instance.ngDoBootstrap(e)}this._modules.push(t)}onDestroy(t){this._destroyListeners.push(t)}get injector(){return this._injector}destroy(){if(this._destroyed)throw new Error("The platform has already been destroyed!");this._modules.slice().forEach(t=>t.destroy()),this._destroyListeners.forEach(t=>t()),this._destroyed=!0}get destroyed(){return this._destroyed}}return t.\u0275fac=function(e){return new(e||t)(qn(Ai))},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})();function Cl(t,e){return Array.isArray(e)?e.reduce(Cl,t):Object.assign(Object.assign({},t),e)}let xl=(()=>{class t{constructor(t,e,n,r,s,i){this._zone=t,this._console=e,this._injector=n,this._exceptionHandler=r,this._componentFactoryResolver=s,this._initStatus=i,this._bootstrapListeners=[],this._views=[],this._runningTick=!1,this._stable=!0,this.componentTypes=[],this.components=[],this._onMicrotaskEmptySubscription=this._zone.onMicrotaskEmpty.subscribe({next:()=>{this._zone.run(()=>{this.tick()})}});const o=new _(t=>{this._stable=this._zone.isStable&&!this._zone.hasPendingMacrotasks&&!this._zone.hasPendingMicrotasks,this._zone.runOutsideAngular(()=>{t.next(this._stable),t.complete()})}),a=new _(t=>{let e;this._zone.runOutsideAngular(()=>{e=this._zone.onStable.subscribe(()=>{rl.assertNotInAngularZone(),nl(()=>{this._stable||this._zone.hasPendingMacrotasks||this._zone.hasPendingMicrotasks||(this._stable=!0,t.next(!0))})})});const n=this._zone.onUnstable.subscribe(()=>{rl.assertInAngularZone(),this._stable&&(this._stable=!1,this._zone.runOutsideAngular(()=>{t.next(!1)}))});return()=>{e.unsubscribe(),n.unsubscribe()}});this.isStable=function(...t){let e=Number.POSITIVE_INFINITY,n=null,r=t[t.length-1];return T(r)?(n=t.pop(),t.length>1&&"number"==typeof t[t.length-1]&&(e=t.pop())):"number"==typeof r&&(e=t.pop()),null===n&&1===t.length&&t[0]instanceof _?t[0]:function(t=Number.POSITIVE_INFINITY){return j(y,t)}(e)(H(t,n))}(o,a.pipe(t=>{return V()((e=Z,function(t){let n;n="function"==typeof e?e:function(){return e};const r=Object.create(t,U);return r.source=t,r.subjectFactory=n,r})(t));var e}))}bootstrap(t,e){if(!this._initStatus.done)throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");let n;n=t instanceof vo?t:this._componentFactoryResolver.resolveComponentFactory(t),this.componentTypes.push(n.componentType);const r=n.isBoundToModule?void 0:this._injector.get(ra),s=n.create(Ai.NULL,[],e||n.selector,r),i=s.location.nativeElement,o=s.injector.get(ul,null),a=o&&s.injector.get(hl);return o&&a&&a.registerApplication(i,o),s.onDestroy(()=>{this.detachView(s.hostView),El(this.components,s),a&&a.unregisterApplication(i)}),this._loadComponent(s),yl()&&this._console.log("Angular is running in development mode. Call enableProdMode() to enable production mode."),s}tick(){if(this._runningTick)throw new Error("ApplicationRef.tick is called recursively");try{this._runningTick=!0;for(let t of this._views)t.detectChanges()}catch(t){this._zone.runOutsideAngular(()=>this._exceptionHandler.handleError(t))}finally{this._runningTick=!1}}attachView(t){const e=t;this._views.push(e),e.attachToAppRef(this)}detachView(t){const e=t;El(this._views,e),e.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView),this.tick(),this.components.push(t),this._injector.get($a,[]).concat(this._bootstrapListeners).forEach(e=>e(t))}ngOnDestroy(){this._views.slice().forEach(t=>t.destroy()),this._onMicrotaskEmptySubscription.unsubscribe()}get viewCount(){return this._views.length}}return t.\u0275fac=function(e){return new(e||t)(qn(rl),qn(Ua),qn(Ai),qn(Or),qn(Co),qn(Fa))},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})();function El(t,e){const n=t.indexOf(e);n>-1&&t.splice(n,1)}const Tl=bl(null,"core",[{provide:za,useValue:"unknown"},{provide:wl,deps:[Ai]},{provide:hl,deps:[]},{provide:Ua,deps:[]}]),kl=[{provide:xl,useClass:xl,deps:[rl,Ua,Ai,Or,Co,Fa]},{provide:pa,deps:[rl],useFactory:function(t){let e=[];return t.onStable.subscribe(()=>{for(;e.length;)e.pop()()}),function(t){e.push(t)}}},{provide:Fa,useClass:Fa,deps:[[new Qn,ja]]},{provide:tl,useClass:tl,deps:[]},Ha,{provide:$o,useFactory:
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function(){return Ko},deps:[]},{provide:qo,useFactory:function(){return Jo},deps:[]},{provide:qa,useFactory:function(t){return bo(t=t||"undefined"!=typeof $localize&&$localize.locale||yo),t},deps:[[new Gn(qa),new Qn,new Kn]]},{provide:Za,useValue:"USD"}];let Il=(()=>{class t{constructor(t){}}return t.\u0275mod=Mt({type:t}),t.\u0275inj=et({factory:function(e){return new(e||t)(qn(xl))},providers:kl}),t})(),Al=null;function Sl(){return Al}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Ol=new Sn("DocumentToken");
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Rl=function(t){return t[t.Zero=0]="Zero",t[t.One=1]="One",t[t.Two=2]="Two",t[t.Few=3]="Few",t[t.Many=4]="Many",t[t.Other=5]="Other",t}({});
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class Dl{}let Nl=(()=>{class t extends Dl{constructor(t){super(),this.locale=t}getPluralCategory(t,e){switch(function(t){return function(t){const e=function(t){return t.toLowerCase().replace(/_/g,"-")}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */(t);let n=mo(e);if(n)return n;const r=e.split("-")[0];if(n=mo(r),n)return n;if("en"===r)return fo;throw new Error(`Missing locale data for the locale "${t}".`)}(t)[go.PluralCase]}(e||this.locale)(t)){case Rl.Zero:return"zero";case Rl.One:return"one";case Rl.Two:return"two";case Rl.Few:return"few";case Rl.Many:return"many";default:return"other"}}}return t.\u0275fac=function(e){return new(e||t)(qn(qa))},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function Pl(t,e){e=encodeURIComponent(e);for(const n of t.split(";")){const t=n.indexOf("="),[r,s]=-1==t?[n,""]:[n.slice(0,t),n.slice(t+1)];if(r.trim()===e)return decodeURIComponent(s)}return null}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class Ml{constructor(t,e,n,r){this.$implicit=t,this.ngForOf=e,this.index=n,this.count=r}get first(){return 0===this.index}get last(){return this.index===this.count-1}get even(){return this.index%2==0}get odd(){return!this.even}}let jl=(()=>{class t{constructor(t,e,n){this._viewContainer=t,this._template=e,this._differs=n,this._ngForOf=null,this._ngForOfDirty=!0,this._differ=null}set ngForOf(t){this._ngForOf=t,this._ngForOfDirty=!0}set ngForTrackBy(t){this._trackByFn=t}get ngForTrackBy(){return this._trackByFn}set ngForTemplate(t){t&&(this._template=t)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;const n=this._ngForOf;if(!this._differ&&n)try{this._differ=this._differs.find(n).create(this.ngForTrackBy)}catch(e){throw new Error(`Cannot find a differ supporting object '${n}' of type '${t=n,t.name||typeof t}'. NgFor only supports binding to Iterables such as Arrays.`)}}var t;if(this._differ){const t=this._differ.diff(this._ngForOf);t&&this._applyChanges(t)}}_applyChanges(t){const e=[];t.forEachOperation((t,n,r)=>{if(null==t.previousIndex){const n=this._viewContainer.createEmbeddedView(this._template,new Ml(null,this._ngForOf,-1,-1),null===r?void 0:r),s=new Fl(t,n);e.push(s)}else if(null==r)this._viewContainer.remove(null===n?void 0:n);else if(null!==n){const s=this._viewContainer.get(n);this._viewContainer.move(s,r);const i=new Fl(t,s);e.push(i)}});for(let n=0;n<e.length;n++)this._perViewChange(e[n].view,e[n].record);for(let n=0,r=this._viewContainer.length;n<r;n++){const t=this._viewContainer.get(n);t.context.index=n,t.context.count=r,t.context.ngForOf=this._ngForOf}t.forEachIdentityChange(t=>{this._viewContainer.get(t.currentIndex).context.$implicit=t.item})}_perViewChange(t,e){t.context.$implicit=e.item}static ngTemplateContextGuard(t,e){return!0}}return t.\u0275fac=function(e){return new(e||t)(zi(ia),zi(Xo),zi($o))},t.\u0275dir=Ft({type:t,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"}}),t})();class Fl{constructor(t,e){this.record=t,this.view=e}}let Ll=(()=>{class t{constructor(t,e){this._viewContainer=t,this._context=new Hl,this._thenTemplateRef=null,this._elseTemplateRef=null,this._thenViewRef=null,this._elseViewRef=null,this._thenTemplateRef=e}set ngIf(t){this._context.$implicit=this._context.ngIf=t,this._updateView()}set ngIfThen(t){Vl("ngIfThen",t),this._thenTemplateRef=t,this._thenViewRef=null,this._updateView()}set ngIfElse(t){Vl("ngIfElse",t),this._elseTemplateRef=t,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngTemplateContextGuard(t,e){return!0}}return t.\u0275fac=function(e){return new(e||t)(zi(ia),zi(Xo))},t.\u0275dir=Ft({type:t,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}}),t})();class Hl{constructor(){this.$implicit=null,this.ngIf=null}}function Vl(t,e){if(e&&!e.createEmbeddedView)throw new Error(`${t} must be a TemplateRef, but received '${Q(e)}'.`)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */let Bl=(()=>{class t{}return t.\u0275mod=Mt({type:t}),t.\u0275inj=et({factory:function(e){return new(e||t)},providers:[{provide:Dl,useClass:Nl}]}),t})();class zl extends
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license Angular v11.2.0
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class extends class{}{constructor(){super()}supportsDOMEvents(){return!0}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */{static makeCurrent(){var t;t=new zl,Al||(Al=t)}getProperty(t,e){return t[e]}log(t){window.console&&window.console.log&&window.console.log(t)}logGroup(t){window.console&&window.console.group&&window.console.group(t)}logGroupEnd(){window.console&&window.console.groupEnd&&window.console.groupEnd()}onAndCancel(t,e,n){return t.addEventListener(e,n,!1),()=>{t.removeEventListener(e,n,!1)}}dispatchEvent(t,e){t.dispatchEvent(e)}remove(t){return t.parentNode&&t.parentNode.removeChild(t),t}getValue(t){return t.value}createElement(t,e){return(e=e||this.getDefaultDocument()).createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,e){return"window"===e?window:"document"===e?t:"body"===e?t.body:null}getHistory(){return window.history}getLocation(){return window.location}getBaseHref(t){const e=Ul||(Ul=document.querySelector("base"),Ul)?Ul.getAttribute("href"):null;return null==e?null:(n=e,$l||($l=document.createElement("a")),$l.setAttribute("href",n),"/"===$l.pathname.charAt(0)?$l.pathname:"/"+$l.pathname);var n;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */}resetBaseElement(){Ul=null}getUserAgent(){return window.navigator.userAgent}performanceNow(){return window.performance&&window.performance.now?window.performance.now():(new Date).getTime()}supportsCookies(){return!0}getCookie(t){return Pl(document.cookie,t)}}let $l,Ul=null;const ql=new Sn("TRANSITION_ID"),Zl=[{provide:ja,useFactory:function(t,e,n){return()=>{n.get(Fa).donePromise.then(()=>{const n=Sl();Array.prototype.slice.apply(e.querySelectorAll("style[ng-transition]")).filter(e=>e.getAttribute("ng-transition")===t).forEach(t=>n.remove(t))})}},deps:[ql,Ol,Ai],multi:!0}];
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class Wl{static init(){var t;t=new Wl,pl=t}addToWindow(t){vt.getAngularTestability=(e,n=!0)=>{const r=t.findTestabilityInTree(e,n);if(null==r)throw new Error("Could not find testability for element.");return r},vt.getAllAngularTestabilities=()=>t.getAllTestabilities(),vt.getAllAngularRootElements=()=>t.getAllRootElements(),vt.frameworkStabilizers||(vt.frameworkStabilizers=[]),vt.frameworkStabilizers.push(t=>{const e=vt.getAllAngularTestabilities();let n=e.length,r=!1;const s=function(e){r=r||e,n--,0==n&&t(r)};e.forEach(function(t){t.whenStable(s)})})}findTestabilityInTree(t,e,n){if(null==e)return null;const r=t.getTestability(e);return null!=r?r:n?Sl().isShadowRoot(e)?this.findTestabilityInTree(t,e.host,!0):this.findTestabilityInTree(t,e.parentElement,!0):null}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */const Gl=new Sn("EventManagerPlugins");let Ql=(()=>{class t{constructor(t,e){this._zone=e,this._eventNameToPlugin=new Map,t.forEach(t=>t.manager=this),this._plugins=t.slice().reverse()}addEventListener(t,e,n){return this._findPluginFor(e).addEventListener(t,e,n)}addGlobalEventListener(t,e,n){return this._findPluginFor(e).addGlobalEventListener(t,e,n)}getZone(){return this._zone}_findPluginFor(t){const e=this._eventNameToPlugin.get(t);if(e)return e;const n=this._plugins;for(let r=0;r<n.length;r++){const e=n[r];if(e.supports(t))return this._eventNameToPlugin.set(t,e),e}throw new Error(`No event manager plugin found for event ${t}`)}}return t.\u0275fac=function(e){return new(e||t)(qn(Gl),qn(rl))},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})();class Kl{constructor(t){this._doc=t}addGlobalEventListener(t,e,n){const r=Sl().getGlobalEventTarget(this._doc,t);if(!r)throw new Error(`Unsupported event target ${r} for event ${e}`);return this.addEventListener(r,e,n)}}let Jl=(()=>{class t{constructor(){this._stylesSet=new Set}addStyles(t){const e=new Set;t.forEach(t=>{this._stylesSet.has(t)||(this._stylesSet.add(t),e.add(t))}),this.onStylesAdded(e)}onStylesAdded(t){}getAllStyles(){return Array.from(this._stylesSet)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})(),Yl=(()=>{class t extends Jl{constructor(t){super(),this._doc=t,this._hostNodes=new Set,this._styleNodes=new Set,this._hostNodes.add(t.head)}_addStylesToHost(t,e){t.forEach(t=>{const n=this._doc.createElement("style");n.textContent=t,this._styleNodes.add(e.appendChild(n))})}addHost(t){this._addStylesToHost(this._stylesSet,t),this._hostNodes.add(t)}removeHost(t){this._hostNodes.delete(t)}onStylesAdded(t){this._hostNodes.forEach(e=>this._addStylesToHost(t,e))}ngOnDestroy(){this._styleNodes.forEach(t=>Sl().remove(t))}}return t.\u0275fac=function(e){return new(e||t)(qn(Ol))},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Xl={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},tc=/%COMP%/g;function ec(t,e,n){for(let r=0;r<e.length;r++){let s=e[r];Array.isArray(s)?ec(t,s,n):(s=s.replace(tc,t),n.push(s))}return n}function nc(t){return e=>{if("__ngUnwrap__"===e)return t;!1===t(e)&&(e.preventDefault(),e.returnValue=!1)}}let rc=(()=>{class t{constructor(t,e,n){this.eventManager=t,this.sharedStylesHost=e,this.appId=n,this.rendererByCompId=new Map,this.defaultRenderer=new sc(t)}createRenderer(t,e){if(!t||!e)return this.defaultRenderer;switch(e.encapsulation){case mt.Emulated:{let n=this.rendererByCompId.get(e.id);return n||(n=new ic(this.eventManager,this.sharedStylesHost,e,this.appId),this.rendererByCompId.set(e.id,n)),n.applyToHost(t),n}case 1:case mt.ShadowDom:return new oc(this.eventManager,this.sharedStylesHost,t,e);default:if(!this.rendererByCompId.has(e.id)){const t=ec(e.id,e.styles,[]);this.sharedStylesHost.addStyles(t),this.rendererByCompId.set(e.id,this.defaultRenderer)}return this.defaultRenderer}}begin(){}end(){}}return t.\u0275fac=function(e){return new(e||t)(qn(Ql),qn(Yl),qn(La))},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})();class sc{constructor(t){this.eventManager=t,this.data=Object.create(null)}destroy(){}createElement(t,e){return e?document.createElementNS(Xl[e]||e,t):document.createElement(t)}createComment(t){return document.createComment(t)}createText(t){return document.createTextNode(t)}appendChild(t,e){t.appendChild(e)}insertBefore(t,e,n){t&&t.insertBefore(e,n)}removeChild(t,e){t&&t.removeChild(e)}selectRootElement(t,e){let n="string"==typeof t?document.querySelector(t):t;if(!n)throw new Error(`The selector "${t}" did not match any elements`);return e||(n.textContent=""),n}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,e,n,r){if(r){e=r+":"+e;const s=Xl[r];s?t.setAttributeNS(s,e,n):t.setAttribute(e,n)}else t.setAttribute(e,n)}removeAttribute(t,e,n){if(n){const r=Xl[n];r?t.removeAttributeNS(r,e):t.removeAttribute(`${n}:${e}`)}else t.removeAttribute(e)}addClass(t,e){t.classList.add(e)}removeClass(t,e){t.classList.remove(e)}setStyle(t,e,n,r){r&(Pr.DashCase|Pr.Important)?t.style.setProperty(e,n,r&Pr.Important?"important":""):t.style[e]=n}removeStyle(t,e,n){n&Pr.DashCase?t.style.removeProperty(e):t.style[e]=""}setProperty(t,e,n){t[e]=n}setValue(t,e){t.nodeValue=e}listen(t,e,n){return"string"==typeof t?this.eventManager.addGlobalEventListener(t,e,nc(n)):this.eventManager.addEventListener(t,e,nc(n))}}class ic extends sc{constructor(t,e,n,r){super(t),this.component=n;const s=ec(r+"-"+n.id,n.styles,[]);e.addStyles(s),this.contentAttr="_ngcontent-%COMP%".replace(tc,r+"-"+n.id),this.hostAttr="_nghost-%COMP%".replace(tc,r+"-"+n.id)}applyToHost(t){super.setAttribute(t,this.hostAttr,"")}createElement(t,e){const n=super.createElement(t,e);return super.setAttribute(n,this.contentAttr,""),n}}class oc extends sc{constructor(t,e,n,r){super(t),this.sharedStylesHost=e,this.hostEl=n,this.shadowRoot=n.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);const s=ec(r.id,r.styles,[]);for(let i=0;i<s.length;i++){const t=document.createElement("style");t.textContent=s[i],this.shadowRoot.appendChild(t)}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}appendChild(t,e){return super.appendChild(this.nodeOrShadowRoot(t),e)}insertBefore(t,e,n){return super.insertBefore(this.nodeOrShadowRoot(t),e,n)}removeChild(t,e){return super.removeChild(this.nodeOrShadowRoot(t),e)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}}let ac=(()=>{class t extends Kl{constructor(t){super(t)}supports(t){return!0}addEventListener(t,e,n){return t.addEventListener(e,n,!1),()=>this.removeEventListener(t,e,n)}removeEventListener(t,e,n){return t.removeEventListener(e,n)}}return t.\u0275fac=function(e){return new(e||t)(qn(Ol))},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */const lc=["alt","control","meta","shift"],cc={"\b":"Backspace","\t":"Tab","\x7f":"Delete","\x1b":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},uc={A:"1",B:"2",C:"3",D:"4",E:"5",F:"6",G:"7",H:"8",I:"9",J:"*",K:"+",M:"-",N:".",O:"/","`":"0","\x90":"NumLock"},hc={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey};let dc=(()=>{class t extends Kl{constructor(t){super(t)}supports(e){return null!=t.parseEventName(e)}addEventListener(e,n,r){const s=t.parseEventName(n),i=t.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Sl().onAndCancel(e,s.domEventName,i))}static parseEventName(e){const n=e.toLowerCase().split("."),r=n.shift();if(0===n.length||"keydown"!==r&&"keyup"!==r)return null;const s=t._normalizeKey(n.pop());let i="";if(lc.forEach(t=>{const e=n.indexOf(t);e>-1&&(n.splice(e,1),i+=t+".")}),i+=s,0!=n.length||0===s.length)return null;const o={};return o.domEventName=r,o.fullKey=i,o}static getEventFullKey(t){let e="",n=function(t){let e=t.key;if(null==e){if(e=t.keyIdentifier,null==e)return"Unidentified";e.startsWith("U+")&&(e=String.fromCharCode(parseInt(e.substring(2),16)),3===t.location&&uc.hasOwnProperty(e)&&(e=uc[e]))}return cc[e]||e}(t);return n=n.toLowerCase()," "===n?n="space":"."===n&&(n="dot"),lc.forEach(r=>{r!=n&&(0,hc[r])(t)&&(e+=r+".")}),e+=n,e}static eventCallback(e,n,r){return s=>{t.getEventFullKey(s)===e&&r.runGuarded(()=>n(s))}}static _normalizeKey(t){switch(t){case"esc":return"escape";default:return t}}}return t.\u0275fac=function(e){return new(e||t)(qn(Ol))},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})();const fc=bl(Tl,"browser",[{provide:za,useValue:"browser"},{provide:Ba,useValue:
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function(){zl.makeCurrent(),Wl.init()},multi:!0},{provide:Ol,useFactory:function(){return function(t){re=t}(document),document},deps:[]}]),pc=[[],{provide:mi,useValue:"root"},{provide:Or,useFactory:function(){return new Or},deps:[]},{provide:Gl,useClass:ac,multi:!0,deps:[Ol,rl,za]},{provide:Gl,useClass:dc,multi:!0,deps:[Ol]},[],{provide:rc,useClass:rc,deps:[Ql,Yl,La]},{provide:Ao,useExisting:rc},{provide:Jl,useExisting:Yl},{provide:Yl,useClass:Yl,deps:[Ol]},{provide:ul,useClass:ul,deps:[rl]},{provide:Ql,useClass:Ql,deps:[Gl,rl]},[]];let mc=(()=>{class t{constructor(t){if(t)throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")}static withServerTransition(e){return{ngModule:t,providers:[{provide:La,useValue:e.appId},{provide:ql,useExisting:La},Zl]}}}return t.\u0275mod=Mt({type:t}),t.\u0275inj=et({factory:function(e){return new(e||t)(qn(t,12))},providers:pc,imports:[Bl,Il]}),t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function gc(...t){let e=t[t.length-1];return T(e)?(t.pop(),M(t,e)):H(t)}"undefined"!=typeof window&&window;class yc{constructor(t,e){this.predicate=t,this.thisArg=e}call(t,e){return e.subscribe(new _c(t,this.predicate,this.thisArg))}}class _c extends p{constructor(t,e,n){super(t),this.predicate=e,this.thisArg=n,this.count=0}_next(t){let e;try{e=this.predicate.call(this.thisArg,t,this.count++)}catch(n){return void this.destination.error(n)}e&&this.destination.next(t)}}
/**
 * @license Angular v11.2.0
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class bc{}class vc{}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class wc{constructor(t){this.normalizedNames=new Map,this.lazyUpdate=null,t?this.lazyInit="string"==typeof t?()=>{this.headers=new Map,t.split("\n").forEach(t=>{const e=t.indexOf(":");if(e>0){const n=t.slice(0,e),r=n.toLowerCase(),s=t.slice(e+1).trim();this.maybeSetNormalizedName(n,r),this.headers.has(r)?this.headers.get(r).push(s):this.headers.set(r,[s])}})}:()=>{this.headers=new Map,Object.keys(t).forEach(e=>{let n=t[e];const r=e.toLowerCase();"string"==typeof n&&(n=[n]),n.length>0&&(this.headers.set(r,n),this.maybeSetNormalizedName(e,r))})}:this.headers=new Map}has(t){return this.init(),this.headers.has(t.toLowerCase())}get(t){this.init();const e=this.headers.get(t.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(t){return this.init(),this.headers.get(t.toLowerCase())||null}append(t,e){return this.clone({name:t,value:e,op:"a"})}set(t,e){return this.clone({name:t,value:e,op:"s"})}delete(t,e){return this.clone({name:t,value:e,op:"d"})}maybeSetNormalizedName(t,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,t)}init(){this.lazyInit&&(this.lazyInit instanceof wc?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(t=>this.applyUpdate(t)),this.lazyUpdate=null))}copyFrom(t){t.init(),Array.from(t.headers.keys()).forEach(e=>{this.headers.set(e,t.headers.get(e)),this.normalizedNames.set(e,t.normalizedNames.get(e))})}clone(t){const e=new wc;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof wc?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([t]),e}applyUpdate(t){const e=t.name.toLowerCase();switch(t.op){case"a":case"s":let n=t.value;if("string"==typeof n&&(n=[n]),0===n.length)return;this.maybeSetNormalizedName(t.name,e);const r=("a"===t.op?this.headers.get(e):void 0)||[];r.push(...n),this.headers.set(e,r);break;case"d":const s=t.value;if(s){let t=this.headers.get(e);if(!t)return;t=t.filter(t=>-1===s.indexOf(t)),0===t.length?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,t)}else this.headers.delete(e),this.normalizedNames.delete(e)}}forEach(t){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>t(this.normalizedNames.get(e),this.headers.get(e)))}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class Cc{encodeKey(t){return xc(t)}encodeValue(t){return xc(t)}decodeKey(t){return decodeURIComponent(t)}decodeValue(t){return decodeURIComponent(t)}}function xc(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/gi,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%2B/gi,"+").replace(/%3D/gi,"=").replace(/%3F/gi,"?").replace(/%2F/gi,"/")}class Ec{constructor(t={}){if(this.updates=null,this.cloneFrom=null,this.encoder=t.encoder||new Cc,t.fromString){if(t.fromObject)throw new Error("Cannot specify both fromString and fromObject.");this.map=function(t,e){const n=new Map;return t.length>0&&t.split("&").forEach(t=>{const r=t.indexOf("="),[s,i]=-1==r?[e.decodeKey(t),""]:[e.decodeKey(t.slice(0,r)),e.decodeValue(t.slice(r+1))],o=n.get(s)||[];o.push(i),n.set(s,o)}),n}(t.fromString,this.encoder)}else t.fromObject?(this.map=new Map,Object.keys(t.fromObject).forEach(e=>{const n=t.fromObject[e];this.map.set(e,Array.isArray(n)?n:[n])})):this.map=null}has(t){return this.init(),this.map.has(t)}get(t){this.init();const e=this.map.get(t);return e?e[0]:null}getAll(t){return this.init(),this.map.get(t)||null}keys(){return this.init(),Array.from(this.map.keys())}append(t,e){return this.clone({param:t,value:e,op:"a"})}appendAll(t){const e=[];return Object.keys(t).forEach(n=>{const r=t[n];Array.isArray(r)?r.forEach(t=>{e.push({param:n,value:t,op:"a"})}):e.push({param:n,value:r,op:"a"})}),this.clone(e)}set(t,e){return this.clone({param:t,value:e,op:"s"})}delete(t,e){return this.clone({param:t,value:e,op:"d"})}toString(){return this.init(),this.keys().map(t=>{const e=this.encoder.encodeKey(t);return this.map.get(t).map(t=>e+"="+this.encoder.encodeValue(t)).join("&")}).filter(t=>""!==t).join("&")}clone(t){const e=new Ec({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(t),e}init(){null===this.map&&(this.map=new Map),null!==this.cloneFrom&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(t=>this.map.set(t,this.cloneFrom.map.get(t))),this.updates.forEach(t=>{switch(t.op){case"a":case"s":const e=("a"===t.op?this.map.get(t.param):void 0)||[];e.push(t.value),this.map.set(t.param,e);break;case"d":if(void 0===t.value){this.map.delete(t.param);break}{let e=this.map.get(t.param)||[];const n=e.indexOf(t.value);-1!==n&&e.splice(n,1),e.length>0?this.map.set(t.param,e):this.map.delete(t.param)}}}),this.cloneFrom=this.updates=null)}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Tc(t){return"undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer}function kc(t){return"undefined"!=typeof Blob&&t instanceof Blob}function Ic(t){return"undefined"!=typeof FormData&&t instanceof FormData}class Ac{constructor(t,e,n,r){let s;if(this.url=e,this.body=null,this.reportProgress=!1,this.withCredentials=!1,this.responseType="json",this.method=t.toUpperCase(),function(t){switch(t){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}(this.method)||r?(this.body=void 0!==n?n:null,s=r):s=n,s&&(this.reportProgress=!!s.reportProgress,this.withCredentials=!!s.withCredentials,s.responseType&&(this.responseType=s.responseType),s.headers&&(this.headers=s.headers),s.params&&(this.params=s.params)),this.headers||(this.headers=new wc),this.params){const t=this.params.toString();if(0===t.length)this.urlWithParams=e;else{const n=e.indexOf("?");this.urlWithParams=e+(-1===n?"?":n<e.length-1?"&":"")+t}}else this.params=new Ec,this.urlWithParams=e}serializeBody(){return null===this.body?null:Tc(this.body)||kc(this.body)||Ic(this.body)||"string"==typeof this.body?this.body:this.body instanceof Ec?this.body.toString():"object"==typeof this.body||"boolean"==typeof this.body||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return null===this.body||Ic(this.body)?null:kc(this.body)?this.body.type||null:Tc(this.body)?null:"string"==typeof this.body?"text/plain":this.body instanceof Ec?"application/x-www-form-urlencoded;charset=UTF-8":"object"==typeof this.body||"number"==typeof this.body||Array.isArray(this.body)?"application/json":null}clone(t={}){const e=t.method||this.method,n=t.url||this.url,r=t.responseType||this.responseType,s=void 0!==t.body?t.body:this.body,i=void 0!==t.withCredentials?t.withCredentials:this.withCredentials,o=void 0!==t.reportProgress?t.reportProgress:this.reportProgress;let a=t.headers||this.headers,l=t.params||this.params;return void 0!==t.setHeaders&&(a=Object.keys(t.setHeaders).reduce((e,n)=>e.set(n,t.setHeaders[n]),a)),t.setParams&&(l=Object.keys(t.setParams).reduce((e,n)=>e.set(n,t.setParams[n]),l)),new Ac(e,n,s,{params:l,headers:a,reportProgress:o,responseType:r,withCredentials:i})}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */var Sc=function(t){return t[t.Sent=0]="Sent",t[t.UploadProgress=1]="UploadProgress",t[t.ResponseHeader=2]="ResponseHeader",t[t.DownloadProgress=3]="DownloadProgress",t[t.Response=4]="Response",t[t.User=5]="User",t}({});class Oc{constructor(t,e=200,n="OK"){this.headers=t.headers||new wc,this.status=void 0!==t.status?t.status:e,this.statusText=t.statusText||n,this.url=t.url||null,this.ok=this.status>=200&&this.status<300}}class Rc extends Oc{constructor(t={}){super(t),this.type=Sc.ResponseHeader}clone(t={}){return new Rc({headers:t.headers||this.headers,status:void 0!==t.status?t.status:this.status,statusText:t.statusText||this.statusText,url:t.url||this.url||void 0})}}class Dc extends Oc{constructor(t={}){super(t),this.type=Sc.Response,this.body=void 0!==t.body?t.body:null}clone(t={}){return new Dc({body:void 0!==t.body?t.body:this.body,headers:t.headers||this.headers,status:void 0!==t.status?t.status:this.status,statusText:t.statusText||this.statusText,url:t.url||this.url||void 0})}}class Nc extends Oc{constructor(t){super(t,0,"Unknown Error"),this.name="HttpErrorResponse",this.ok=!1,this.message=this.status>=200&&this.status<300?`Http failure during parsing for ${t.url||"(unknown url)"}`:`Http failure response for ${t.url||"(unknown url)"}: ${t.status} ${t.statusText}`,this.error=t.error||null}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Pc(t,e){return{body:e,headers:t.headers,observe:t.observe,params:t.params,reportProgress:t.reportProgress,responseType:t.responseType,withCredentials:t.withCredentials}}let Mc=(()=>{class t{constructor(t){this.handler=t}request(t,e,n={}){let r;if(t instanceof Ac)r=t;else{let s,i;s=n.headers instanceof wc?n.headers:new wc(n.headers),n.params&&(i=n.params instanceof Ec?n.params:new Ec({fromObject:n.params})),r=new Ac(t,e,void 0!==n.body?n.body:null,{headers:s,params:i,reportProgress:n.reportProgress,responseType:n.responseType||"json",withCredentials:n.withCredentials})}const s=gc(r).pipe(j(t=>this.handler.handle(t),void 0,1));if(t instanceof Ac||"events"===n.observe)return s;const i=s.pipe((o=t=>t instanceof Dc,function(t){return t.lift(new yc(o,undefined))}));var o;switch(n.observe||"body"){case"body":switch(r.responseType){case"arraybuffer":return i.pipe(D(t=>{if(null!==t.body&&!(t.body instanceof ArrayBuffer))throw new Error("Response is not an ArrayBuffer.");return t.body}));case"blob":return i.pipe(D(t=>{if(null!==t.body&&!(t.body instanceof Blob))throw new Error("Response is not a Blob.");return t.body}));case"text":return i.pipe(D(t=>{if(null!==t.body&&"string"!=typeof t.body)throw new Error("Response is not a string.");return t.body}));case"json":default:return i.pipe(D(t=>t.body))}case"response":return i;default:throw new Error(`Unreachable: unhandled observe type ${n.observe}}`)}}delete(t,e={}){return this.request("DELETE",t,e)}get(t,e={}){return this.request("GET",t,e)}head(t,e={}){return this.request("HEAD",t,e)}jsonp(t,e){return this.request("JSONP",t,{params:(new Ec).append(e,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,e={}){return this.request("OPTIONS",t,e)}patch(t,e,n={}){return this.request("PATCH",t,Pc(n,e))}post(t,e,n={}){return this.request("POST",t,Pc(n,e))}put(t,e,n={}){return this.request("PUT",t,Pc(n,e))}}return t.\u0275fac=function(e){return new(e||t)(qn(bc))},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */class jc{constructor(t,e){this.next=t,this.interceptor=e}handle(t){return this.interceptor.intercept(t,this.next)}}const Fc=new Sn("HTTP_INTERCEPTORS");let Lc=(()=>{class t{intercept(t,e){return e.handle(t)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Hc=/^\)\]\}',?\n/;class Vc{}let Bc=(()=>{class t{constructor(){}build(){return new XMLHttpRequest}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})(),zc=(()=>{class t{constructor(t){this.xhrFactory=t}handle(t){if("JSONP"===t.method)throw new Error("Attempted to construct Jsonp request without HttpClientJsonpModule installed.");return new _(e=>{const n=this.xhrFactory.build();if(n.open(t.method,t.urlWithParams),t.withCredentials&&(n.withCredentials=!0),t.headers.forEach((t,e)=>n.setRequestHeader(t,e.join(","))),t.headers.has("Accept")||n.setRequestHeader("Accept","application/json, text/plain, */*"),!t.headers.has("Content-Type")){const e=t.detectContentTypeHeader();null!==e&&n.setRequestHeader("Content-Type",e)}if(t.responseType){const e=t.responseType.toLowerCase();n.responseType="json"!==e?e:"text"}const r=t.serializeBody();let s=null;const i=()=>{if(null!==s)return s;const e=1223===n.status?204:n.status,r=n.statusText||"OK",i=new wc(n.getAllResponseHeaders()),o=function(t){return"responseURL"in t&&t.responseURL?t.responseURL:/^X-Request-URL:/m.test(t.getAllResponseHeaders())?t.getResponseHeader("X-Request-URL"):null}(n)||t.url;return s=new Rc({headers:i,status:e,statusText:r,url:o}),s},o=()=>{let{headers:r,status:s,statusText:o,url:a}=i(),l=null;204!==s&&(l=void 0===n.response?n.responseText:n.response),0===s&&(s=l?200:0);let c=s>=200&&s<300;if("json"===t.responseType&&"string"==typeof l){const t=l;l=l.replace(Hc,"");try{l=""!==l?JSON.parse(l):null}catch(u){l=t,c&&(c=!1,l={error:u,text:l})}}c?(e.next(new Dc({body:l,headers:r,status:s,statusText:o,url:a||void 0})),e.complete()):e.error(new Nc({error:l,headers:r,status:s,statusText:o,url:a||void 0}))},a=t=>{const{url:r}=i(),s=new Nc({error:t,status:n.status||0,statusText:n.statusText||"Unknown Error",url:r||void 0});e.error(s)};let l=!1;const c=r=>{l||(e.next(i()),l=!0);let s={type:Sc.DownloadProgress,loaded:r.loaded};r.lengthComputable&&(s.total=r.total),"text"===t.responseType&&n.responseText&&(s.partialText=n.responseText),e.next(s)},u=t=>{let n={type:Sc.UploadProgress,loaded:t.loaded};t.lengthComputable&&(n.total=t.total),e.next(n)};return n.addEventListener("load",o),n.addEventListener("error",a),t.reportProgress&&(n.addEventListener("progress",c),null!==r&&n.upload&&n.upload.addEventListener("progress",u)),n.send(r),e.next({type:Sc.Sent}),()=>{n.removeEventListener("error",a),n.removeEventListener("load",o),t.reportProgress&&(n.removeEventListener("progress",c),null!==r&&n.upload&&n.upload.removeEventListener("progress",u)),n.readyState!==n.DONE&&n.abort()}})}}return t.\u0275fac=function(e){return new(e||t)(qn(Vc))},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const $c=new Sn("XSRF_COOKIE_NAME"),Uc=new Sn("XSRF_HEADER_NAME");class qc{}let Zc,Wc=(()=>{class t{constructor(t,e,n){this.doc=t,this.platform=e,this.cookieName=n,this.lastCookieString="",this.lastToken=null,this.parseCount=0}getToken(){if("server"===this.platform)return null;const t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=Pl(t,this.cookieName),this.lastCookieString=t),this.lastToken}}return t.\u0275fac=function(e){return new(e||t)(qn(Ol),qn(za),qn($c))},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})(),Gc=(()=>{class t{constructor(t,e){this.tokenService=t,this.headerName=e}intercept(t,e){const n=t.url.toLowerCase();if("GET"===t.method||"HEAD"===t.method||n.startsWith("http://")||n.startsWith("https://"))return e.handle(t);const r=this.tokenService.getToken();return null===r||t.headers.has(this.headerName)||(t=t.clone({headers:t.headers.set(this.headerName,r)})),e.handle(t)}}return t.\u0275fac=function(e){return new(e||t)(qn(qc),qn(Uc))},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})(),Qc=(()=>{class t{constructor(t,e){this.backend=t,this.injector=e,this.chain=null}handle(t){if(null===this.chain){const t=this.injector.get(Fc,[]);this.chain=t.reduceRight((t,e)=>new jc(t,e),this.backend)}return this.chain.handle(t)}}return t.\u0275fac=function(e){return new(e||t)(qn(vc),qn(Ai))},t.\u0275prov=tt({token:t,factory:t.\u0275fac}),t})(),Kc=(()=>{class t{static disable(){return{ngModule:t,providers:[{provide:Gc,useClass:Lc}]}}static withOptions(e={}){return{ngModule:t,providers:[e.cookieName?{provide:$c,useValue:e.cookieName}:[],e.headerName?{provide:Uc,useValue:e.headerName}:[]]}}}return t.\u0275mod=Mt({type:t}),t.\u0275inj=et({factory:function(e){return new(e||t)},providers:[Gc,{provide:Fc,useExisting:Gc,multi:!0},{provide:qc,useClass:Wc},{provide:$c,useValue:"XSRF-TOKEN"},{provide:Uc,useValue:"X-XSRF-TOKEN"}]}),t})(),Jc=(()=>{class t{}return t.\u0275mod=Mt({type:t}),t.\u0275inj=et({factory:function(e){return new(e||t)},providers:[Mc,{provide:bc,useClass:Qc},zc,{provide:vc,useExisting:zc},Bc,{provide:Vc,useExisting:Bc}],imports:[[Kc.withOptions({cookieName:"XSRF-TOKEN",headerName:"X-XSRF-TOKEN"})]]}),t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function Yc(t){return null!=t&&"false"!=`${t}`}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function Xc(t){return t instanceof ko?t.nativeElement:t}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */try{Zc="undefined"!=typeof Intl&&Intl.v8BreakIterator}catch(nh){Zc=!1}let tu,eu,nu=(()=>{class t{constructor(t){this._platformId=t,this.isBrowser=this._platformId?"browser"===this._platformId:"object"==typeof document&&!!document,this.EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent),this.TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent),this.BLINK=this.isBrowser&&!(!window.chrome&&!Zc)&&"undefined"!=typeof CSS&&!this.EDGE&&!this.TRIDENT,this.WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT,this.IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window),this.FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent),this.ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT,this.SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT}}return t.\u0275fac=function(e){return new(e||t)(qn(za))},t.\u0275prov=tt({factory:function(){return new t(qn(za))},token:t,providedIn:"root"}),t})(),ru=(()=>{class t{}return t.\u0275mod=Mt({type:t}),t.\u0275inj=et({factory:function(e){return new(e||t)}}),t})();function su(t){return function(){if(null==tu&&"undefined"!=typeof window)try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>tu=!0}))}finally{tu=tu||!1}return tu}()?t:!!t.capture}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function iu(t){return 0===t.buttons}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */"undefined"!=typeof Element&&Element;const ou=new Sn("cdk-focus-monitor-default-options"),au=su({passive:!0,capture:!0});let lu=(()=>{class t{constructor(t,e,n,r){this._ngZone=t,this._platform=e,this._origin=null,this._windowFocused=!1,this._elementInfo=new Map,this._monitoredElementCount=0,this._rootNodeFocusListenerCount=new Map,this._documentKeydownListener=()=>{this._lastTouchTarget=null,this._setOriginForCurrentEventQueue("keyboard")},this._documentMousedownListener=t=>{if(!this._lastTouchTarget){const e=iu(t)?"keyboard":"mouse";this._setOriginForCurrentEventQueue(e)}},this._documentTouchstartListener=t=>{null!=this._touchTimeoutId&&clearTimeout(this._touchTimeoutId),this._lastTouchTarget=cu(t),this._touchTimeoutId=setTimeout(()=>this._lastTouchTarget=null,650)},this._windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)},this._rootNodeFocusAndBlurListener=t=>{const e=cu(t),n="focus"===t.type?this._onFocus:this._onBlur;for(let r=e;r;r=r.parentElement)n.call(this,t,r)},this._document=n,this._detectionMode=(null==r?void 0:r.detectionMode)||0}monitor(t,e=!1){const n=Xc(t);if(!this._platform.isBrowser||1!==n.nodeType)return gc(null);const r=function(t){if(function(){if(null==eu){const t="undefined"!=typeof document?document.head:null;eu=!(!t||!t.createShadowRoot&&!t.attachShadow)}return eu}()){const e=t.getRootNode?t.getRootNode():null;if("undefined"!=typeof ShadowRoot&&ShadowRoot&&e instanceof ShadowRoot)return e}return null}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */(n)||this._getDocument(),s=this._elementInfo.get(n);if(s)return e&&(s.checkChildren=!0),s.subject;const i={checkChildren:e,subject:new x,rootNode:r};return this._elementInfo.set(n,i),this._registerGlobalListeners(i),i.subject}stopMonitoring(t){const e=Xc(t),n=this._elementInfo.get(e);n&&(n.subject.complete(),this._setClasses(e),this._elementInfo.delete(e),this._removeGlobalListeners(n))}focusVia(t,e,n){const r=Xc(t);r===this._getDocument().activeElement?this._getClosestElementsInfo(r).forEach(([t,n])=>this._originChanged(t,e,n)):(this._setOriginForCurrentEventQueue(e),"function"==typeof r.focus&&r.focus(n))}ngOnDestroy(){this._elementInfo.forEach((t,e)=>this.stopMonitoring(e))}_getDocument(){return this._document||document}_getWindow(){return this._getDocument().defaultView||window}_toggleClass(t,e,n){n?t.classList.add(e):t.classList.remove(e)}_getFocusOrigin(t){return this._origin?this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:this._wasCausedByTouch(t)?"touch":"program"}_setClasses(t,e){this._toggleClass(t,"cdk-focused",!!e),this._toggleClass(t,"cdk-touch-focused","touch"===e),this._toggleClass(t,"cdk-keyboard-focused","keyboard"===e),this._toggleClass(t,"cdk-mouse-focused","mouse"===e),this._toggleClass(t,"cdk-program-focused","program"===e)}_setOriginForCurrentEventQueue(t){this._ngZone.runOutsideAngular(()=>{this._origin=t,0===this._detectionMode&&(this._originTimeoutId=setTimeout(()=>this._origin=null,1))})}_wasCausedByTouch(t){const e=cu(t);return this._lastTouchTarget instanceof Node&&e instanceof Node&&(e===this._lastTouchTarget||e.contains(this._lastTouchTarget))}_onFocus(t,e){const n=this._elementInfo.get(e);n&&(n.checkChildren||e===cu(t))&&this._originChanged(e,this._getFocusOrigin(t),n)}_onBlur(t,e){const n=this._elementInfo.get(e);!n||n.checkChildren&&t.relatedTarget instanceof Node&&e.contains(t.relatedTarget)||(this._setClasses(e),this._emitOrigin(n.subject,null))}_emitOrigin(t,e){this._ngZone.run(()=>t.next(e))}_registerGlobalListeners(t){if(!this._platform.isBrowser)return;const e=t.rootNode,n=this._rootNodeFocusListenerCount.get(e)||0;n||this._ngZone.runOutsideAngular(()=>{e.addEventListener("focus",this._rootNodeFocusAndBlurListener,au),e.addEventListener("blur",this._rootNodeFocusAndBlurListener,au)}),this._rootNodeFocusListenerCount.set(e,n+1),1==++this._monitoredElementCount&&this._ngZone.runOutsideAngular(()=>{const t=this._getDocument(),e=this._getWindow();t.addEventListener("keydown",this._documentKeydownListener,au),t.addEventListener("mousedown",this._documentMousedownListener,au),t.addEventListener("touchstart",this._documentTouchstartListener,au),e.addEventListener("focus",this._windowFocusListener)})}_removeGlobalListeners(t){const e=t.rootNode;if(this._rootNodeFocusListenerCount.has(e)){const t=this._rootNodeFocusListenerCount.get(e);t>1?this._rootNodeFocusListenerCount.set(e,t-1):(e.removeEventListener("focus",this._rootNodeFocusAndBlurListener,au),e.removeEventListener("blur",this._rootNodeFocusAndBlurListener,au),this._rootNodeFocusListenerCount.delete(e))}if(!--this._monitoredElementCount){const t=this._getDocument(),e=this._getWindow();t.removeEventListener("keydown",this._documentKeydownListener,au),t.removeEventListener("mousedown",this._documentMousedownListener,au),t.removeEventListener("touchstart",this._documentTouchstartListener,au),e.removeEventListener("focus",this._windowFocusListener),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._touchTimeoutId),clearTimeout(this._originTimeoutId)}}_originChanged(t,e,n){this._setClasses(t,e),this._emitOrigin(n.subject,e),this._lastFocusOrigin=e}_getClosestElementsInfo(t){const e=[];return this._elementInfo.forEach((n,r)=>{(r===t||n.checkChildren&&r.contains(t))&&e.push([r,n])}),e}}return t.\u0275fac=function(e){return new(e||t)(qn(rl),qn(nu),qn(Ol,8),qn(ou,8))},t.\u0275prov=tt({factory:function(){return new t(qn(rl),qn(nu),qn(Ol,8),qn(ou,8))},token:t,providedIn:"root"}),t})();function cu(t){return t.composedPath?t.composedPath()[0]:t.target}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const uu="cdk-high-contrast-black-on-white",hu="cdk-high-contrast-white-on-black",du="cdk-high-contrast-active";let fu=(()=>{class t{constructor(t,e){this._platform=t,this._document=e}getHighContrastMode(){if(!this._platform.isBrowser)return 0;const t=this._document.createElement("div");t.style.backgroundColor="rgb(1,2,3)",t.style.position="absolute",this._document.body.appendChild(t);const e=this._document.defaultView||window,n=e&&e.getComputedStyle?e.getComputedStyle(t):null,r=(n&&n.backgroundColor||"").replace(/ /g,"");switch(this._document.body.removeChild(t),r){case"rgb(0,0,0)":return 2;case"rgb(255,255,255)":return 1}return 0}_applyBodyHighContrastModeCssClasses(){if(this._platform.isBrowser&&this._document.body){const t=this._document.body.classList;t.remove(du),t.remove(uu),t.remove(hu);const e=this.getHighContrastMode();1===e?(t.add(du),t.add(uu)):2===e&&(t.add(du),t.add(hu))}}}return t.\u0275fac=function(e){return new(e||t)(qn(nu),qn(Ol))},t.\u0275prov=tt({factory:function(){return new t(qn(nu),qn(Ol))},token:t,providedIn:"root"}),t})(),pu=(()=>{class t{}return t.\u0275mod=Mt({type:t}),t.\u0275inj=et({factory:function(e){return new(e||t)}}),t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const mu=new Oo("11.2.0");
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function gu(){return"undefined"!=typeof process&&"[object process]"==={}.toString.call(process)}let yu=(t,e)=>!1,_u=(t,e)=>!1,bu=(t,e,n)=>[];const vu=gu();(vu||"undefined"!=typeof Element)&&((t,e)=>t.contains(e),_u=(()=>{if(vu||Element.prototype.matches)return(t,e)=>t.matches(e);{const t=Element.prototype,e=t.matchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector||t.webkitMatchesSelector;return e?(t,n)=>e.apply(t,[n]):_u}})());const wu=new Sn("AnimationModuleType"),Cu=new Oo("11.2.0"),xu=new Sn("mat-sanity-checks",{providedIn:"root",factory:function(){return!0}});let Eu,Tu=(()=>{class t{constructor(t,e,n){this._hasDoneGlobalChecks=!1,this._document=n,t._applyBodyHighContrastModeCssClasses(),this._sanityChecks=e,this._hasDoneGlobalChecks||(this._checkDoctypeIsDefined(),this._checkThemeIsPresent(),this._checkCdkVersionMatch(),this._hasDoneGlobalChecks=!0)}_getWindow(){const t=this._document.defaultView||window;return"object"==typeof t&&t?t:null}_checksAreEnabled(){return yl()&&!this._isTestEnv()}_isTestEnv(){const t=this._getWindow();return t&&(t.__karma__||t.jasmine)}_checkDoctypeIsDefined(){this._checksAreEnabled()&&(!0===this._sanityChecks||this._sanityChecks.doctype)&&!this._document.doctype&&console.warn("Current document does not have a doctype. This may cause some Angular Material components not to behave as expected.")}_checkThemeIsPresent(){if(!this._checksAreEnabled()||!1===this._sanityChecks||!this._sanityChecks.theme||!this._document.body||"function"!=typeof getComputedStyle)return;const t=this._document.createElement("div");t.classList.add("mat-theme-loaded-marker"),this._document.body.appendChild(t);const e=getComputedStyle(t);e&&"none"!==e.display&&console.warn("Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"),this._document.body.removeChild(t)}_checkCdkVersionMatch(){this._checksAreEnabled()&&(!0===this._sanityChecks||this._sanityChecks.version)&&Cu.full!==mu.full&&console.warn("The Angular Material version ("+Cu.full+") does not match the Angular CDK version ("+mu.full+").\nPlease ensure the versions of these two packages exactly match.")}}return t.\u0275mod=Mt({type:t}),t.\u0275inj=et({factory:function(e){return new(e||t)(qn(fu),qn(xu,8),qn(Ol))},imports:[[pu],pu]}),t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function ku(t){return class extends t{constructor(...t){super(...t),this._disabled=!1}get disabled(){return this._disabled}set disabled(t){this._disabled=Yc(t)}}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Iu(t,e){return class extends t{constructor(...t){super(...t),this.defaultColor=e,this.color=e}get color(){return this._color}set color(t){const e=t||this.defaultColor;e!==this._color&&(this._color&&this._elementRef.nativeElement.classList.remove(`mat-${this._color}`),e&&this._elementRef.nativeElement.classList.add(`mat-${e}`),this._color=e)}}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */function Au(t){return class extends t{constructor(...t){super(...t),this._disableRipple=!1}get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=Yc(t)}}}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */try{Eu="undefined"!=typeof Intl}catch(nh){Eu=!1}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class Su{constructor(t,e,n){this._renderer=t,this.element=e,this.config=n,this.state=3}fadeOut(){this._renderer.fadeOutRipple(this)}}const Ou={enterDuration:450,exitDuration:400},Ru=su({passive:!0}),Du=["mousedown","touchstart"],Nu=["mouseup","mouseleave","touchend","touchcancel"];class Pu{constructor(t,e,n,r){this._target=t,this._ngZone=e,this._isPointerDown=!1,this._activeRipples=new Set,this._pointerUpEventsRegistered=!1,r.isBrowser&&(this._containerElement=Xc(n))}fadeInRipple(t,e,n={}){const r=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),s=Object.assign(Object.assign({},Ou),n.animation);n.centered&&(t=r.left+r.width/2,e=r.top+r.height/2);const i=n.radius||function(t,e,n){const r=Math.max(Math.abs(t-n.left),Math.abs(t-n.right)),s=Math.max(Math.abs(e-n.top),Math.abs(e-n.bottom));return Math.sqrt(r*r+s*s)}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */(t,e,r),o=t-r.left,a=e-r.top,l=s.enterDuration,c=document.createElement("div");c.classList.add("mat-ripple-element"),c.style.left=o-i+"px",c.style.top=a-i+"px",c.style.height=2*i+"px",c.style.width=2*i+"px",null!=n.color&&(c.style.backgroundColor=n.color),c.style.transitionDuration=`${l}ms`,this._containerElement.appendChild(c),window.getComputedStyle(c).getPropertyValue("opacity"),c.style.transform="scale(1)";const u=new Su(this,c,n);return u.state=0,this._activeRipples.add(u),n.persistent||(this._mostRecentTransientRipple=u),this._runTimeoutOutsideZone(()=>{const t=u===this._mostRecentTransientRipple;u.state=1,n.persistent||t&&this._isPointerDown||u.fadeOut()},l),u}fadeOutRipple(t){const e=this._activeRipples.delete(t);if(t===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),this._activeRipples.size||(this._containerRect=null),!e)return;const n=t.element,r=Object.assign(Object.assign({},Ou),t.config.animation);n.style.transitionDuration=`${r.exitDuration}ms`,n.style.opacity="0",t.state=2,this._runTimeoutOutsideZone(()=>{t.state=3,n.parentNode.removeChild(n)},r.exitDuration)}fadeOutAll(){this._activeRipples.forEach(t=>t.fadeOut())}setupTriggerEvents(t){const e=Xc(t);e&&e!==this._triggerElement&&(this._removeTriggerEvents(),this._triggerElement=e,this._registerEvents(Du))}handleEvent(t){"mousedown"===t.type?this._onMousedown(t):"touchstart"===t.type?this._onTouchStart(t):this._onPointerUp(),this._pointerUpEventsRegistered||(this._registerEvents(Nu),this._pointerUpEventsRegistered=!0)}_onMousedown(t){const e=iu(t),n=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+800;this._target.rippleDisabled||e||n||(this._isPointerDown=!0,this.fadeInRipple(t.clientX,t.clientY,this._target.rippleConfig))}_onTouchStart(t){if(!this._target.rippleDisabled){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;const e=t.changedTouches;for(let t=0;t<e.length;t++)this.fadeInRipple(e[t].clientX,e[t].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._activeRipples.forEach(t=>{!t.config.persistent&&(1===t.state||t.config.terminateOnPointerUp&&0===t.state)&&t.fadeOut()}))}_runTimeoutOutsideZone(t,e=0){this._ngZone.runOutsideAngular(()=>setTimeout(t,e))}_registerEvents(t){this._ngZone.runOutsideAngular(()=>{t.forEach(t=>{this._triggerElement.addEventListener(t,this,Ru)})})}_removeTriggerEvents(){this._triggerElement&&(Du.forEach(t=>{this._triggerElement.removeEventListener(t,this,Ru)}),this._pointerUpEventsRegistered&&Nu.forEach(t=>{this._triggerElement.removeEventListener(t,this,Ru)}))}}const Mu=new Sn("mat-ripple-global-options");let ju=(()=>{class t{constructor(t,e,n,r,s){this._elementRef=t,this._animationMode=s,this.radius=0,this._disabled=!1,this._isInitialized=!1,this._globalOptions=r||{},this._rippleRenderer=new Pu(this,e,t,n)}get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._setupTriggerEventsIfEnabled()}get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(t){this._trigger=t,this._setupTriggerEventsIfEnabled()}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:Object.assign(Object.assign(Object.assign({},this._globalOptions.animation),"NoopAnimations"===this._animationMode?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(t,e=0,n){return"number"==typeof t?this._rippleRenderer.fadeInRipple(t,e,Object.assign(Object.assign({},this.rippleConfig),n)):this._rippleRenderer.fadeInRipple(0,0,Object.assign(Object.assign({},this.rippleConfig),t))}}return t.\u0275fac=function(e){return new(e||t)(zi(ko),zi(rl),zi(nu),zi(Mu,8),zi(wu,8))},t.\u0275dir=Ft({type:t,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(t,e){2&t&&ro("mat-ripple-unbounded",e.unbounded)},inputs:{radius:["matRippleRadius","radius"],disabled:["matRippleDisabled","disabled"],trigger:["matRippleTrigger","trigger"],color:["matRippleColor","color"],unbounded:["matRippleUnbounded","unbounded"],centered:["matRippleCentered","centered"],animation:["matRippleAnimation","animation"]},exportAs:["matRipple"]}),t})(),Fu=(()=>{class t{}return t.\u0275mod=Mt({type:t}),t.\u0275inj=et({factory:function(e){return new(e||t)},imports:[[Tu,ru],Tu]}),t})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Lu=["mat-button",""],Hu=["*"],Vu=["mat-button","mat-flat-button","mat-icon-button","mat-raised-button","mat-stroked-button","mat-mini-fab","mat-fab"];class Bu{constructor(t){this._elementRef=t}}const zu=Iu(ku(Au(Bu)));let $u=(()=>{class t extends zu{constructor(t,e,n){super(t),this._focusMonitor=e,this._animationMode=n,this.isRoundButton=this._hasHostAttributes("mat-fab","mat-mini-fab"),this.isIconButton=this._hasHostAttributes("mat-icon-button");for(const r of Vu)this._hasHostAttributes(r)&&this._getHostElement().classList.add(r);t.nativeElement.classList.add("mat-button-base"),this.isRoundButton&&(this.color="accent")}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}focus(t,e){t?this._focusMonitor.focusVia(this._getHostElement(),t,e):this._getHostElement().focus(e)}_getHostElement(){return this._elementRef.nativeElement}_isRippleDisabled(){return this.disableRipple||this.disabled}_hasHostAttributes(...t){return t.some(t=>this._getHostElement().hasAttribute(t))}}return t.\u0275fac=function(e){return new(e||t)(zi(ko),zi(lu),zi(wu,8))},t.\u0275cmp=Rt({type:t,selectors:[["button","mat-button",""],["button","mat-raised-button",""],["button","mat-icon-button",""],["button","mat-fab",""],["button","mat-mini-fab",""],["button","mat-stroked-button",""],["button","mat-flat-button",""]],viewQuery:function(t,e){if(1&t&&Na(ju,1),2&t){let t;Da(t=Pa())&&(e.ripple=t.first)}},hostAttrs:[1,"mat-focus-indicator"],hostVars:5,hostBindings:function(t,e){2&t&&(Vi("disabled",e.disabled||null),ro("_mat-animation-noopable","NoopAnimations"===e._animationMode)("mat-button-disabled",e.disabled))},inputs:{disabled:"disabled",disableRipple:"disableRipple",color:"color"},exportAs:["matButton"],features:[Oi],attrs:Lu,ngContentSelectors:Hu,decls:4,vars:5,consts:[[1,"mat-button-wrapper"],["matRipple","",1,"mat-button-ripple",3,"matRippleDisabled","matRippleCentered","matRippleTrigger"],[1,"mat-button-focus-overlay"]],template:function(t,e){1&t&&(function(t){const e=ve()[16][6];if(!e.projection){const t=e.projection=Pn(1,null),n=t.slice();let r=e.child;for(;null!==r;){const e=0;null!==e&&(n[e]?n[e].projectionNext=r:t[e]=r,n[e]=r),r=r.next}}}(),qi(0,"span",0),function(t,e=0,n){const r=ve(),s=we(),i=Os(s,Vt+t,16,null,n||null);null===i.projection&&(i.projection=e),Ie(),64!=(64&i.flags)&&function(t,e,n){is(e[11],0,e,n,Zr(t,n,e),Jr(n.parent||e[6],n,e))}(s,r,i)}(1),Zi(),Wi(2,"span",1),Wi(3,"span",2)),2&t&&(vs(2),ro("mat-button-ripple-round",e.isRoundButton||e.isIconButton),$i("matRippleDisabled",e._isRippleDisabled())("matRippleCentered",e.isIconButton)("matRippleTrigger",e._getHostElement()))},directives:[ju],styles:[".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n"],encapsulation:2,changeDetection:0}),t})(),Uu=(()=>{class t{}return t.\u0275mod=Mt({type:t}),t.\u0275inj=et({factory:function(e){return new(e||t)},imports:[[Fu,Tu],Tu]}),t})(),qu=(()=>{class t{}return t.\u0275mod=Mt({type:t}),t.\u0275inj=et({factory:function(e){return new(e||t)},imports:[[Bl,Uu]]}),t})();const Zu=["activitiesContainer"];function Wu(t,e){if(1&t){const t=Gi();qi(0,"li",18),Ki("click",function(n){Ce(t);const r=e.$implicit,s=Xi(2).$implicit;return Xi().setActivity(r,s),n.stopPropagation()}),lo(1),Zi()}if(2&t){const t=e.$implicit;ro("dtu-active",t===Xi(3).currentActivity),vs(1),uo(" ",t.name," ")}}function Gu(t,e){if(1&t&&(qi(0,"ol",16),Bi(1,Wu,2,3,"li",17),Zi()),2&t){const t=Xi().$implicit;$i("hidden",t!==Xi().currentSection),vs(1),$i("ngForOf",t.activityList)}}function Qu(t,e){if(1&t){const t=Gi();qi(0,"div",11),Ki("click",function(){Ce(t);const n=e.$implicit;return Xi().setActivity(n,n)}),qi(1,"div",12),lo(2),Zi(),qi(3,"div",13),qi(4,"div",14),lo(5),Zi(),Bi(6,Gu,2,2,"ol",15),Zi(),Zi()}if(2&t){const t=e.$implicit,n=e.index,r=Xi();vs(1),ro("dtu-active",t===r.currentSection),vs(1),co(n+1),vs(3),co(t.name),vs(1),$i("ngIf",t.activityList.length)}}function Ku(t,e){if(1&t){const t=Gi();qi(0,"button",19),Ki("click",function(){Ce(t);const e=Xi();return e.setActivity(e.previousActivity,e.previousSection)}),lo(1,"Go back"),Zi()}}function Ju(t,e){if(1&t){const t=Gi();qi(0,"button",20),Ki("click",function(){Ce(t);const e=Xi();return e.setActivity(e.nextActivity,e.nextSection)}),lo(1,"Continue"),Zi()}}let Yu=(()=>{class t{constructor(){this.activityChange=new va,this.scrollChange=new va}ngOnInit(){let t=null,e=null;for(const n of this.activityList){n.id===this.currentSectionId&&(t=n),n.id===this.currentActivityId&&(e=n);for(const t of n.activityList)t.id===this.currentActivityId&&(e=t)}this.setActivity(e||this.activityList[0],t||this.activityList[0],!1)}setActivity(t,e,n=!0){this.currentActivity=t,this.currentSection=e,this.activityChange.emit({sectionId:this.currentSection.id,activityId:this.currentActivity.id}),this.previousActivity=this.nextActivity=null,this.previousSection=this.nextSection=null;let r=!1;for(const s of this.activityList){if(r){this.nextActivity=this.nextActivity?this.nextActivity:s,this.nextSection=this.nextSection?this.nextSection:s;break}s===this.currentActivity?r=!0:(this.previousActivity=s,this.previousSection=s);for(const t of s.activityList){if(r){this.nextActivity=t,this.nextSection=s;break}t===this.currentActivity?r=!0:(this.previousActivity=t,this.previousSection=s)}}n&&setTimeout(()=>{const t=this.activitiesContainer.nativeElement.getBoundingClientRect();this.scrollChange.emit(t.top-40)},0)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=Rt({type:t,selectors:[["dtu-event-activities"]],viewQuery:function(t,e){if(1&t&&Na(Zu,1),2&t){let t;Da(t=Pa())&&(e.activitiesContainer=t.first)}},inputs:{activityList:"activityList",currentActivityId:"currentActivityId",currentSectionId:"currentSectionId"},outputs:{activityChange:"activityChange",scrollChange:"scrollChange"},decls:12,vars:4,consts:[[1,"row"],["activitiesContainer",""],[1,"hidden-xs","col-sm-5","col-md-4"],[1,"dtu-section"],[1,"dtu-activity-list"],["class","dtu-activity-section",3,"click",4,"ngFor","ngForOf"],[1,"col-xs-12","col-sm-7","col-md-8"],[1,"dtu-event-activity",3,"innerHTML"],[1,"dtu-activity-pagination"],["mat-button","","color","accent",3,"click",4,"ngIf"],["mat-button","","color","primary",3,"click",4,"ngIf"],[1,"dtu-activity-section",3,"click"],[1,"dtu-activity-section-number"],[1,"dtu-activity-section-content"],[1,"dtu-activity-section-title"],["class","dtu-activity-section-list",3,"hidden",4,"ngIf"],[1,"dtu-activity-section-list",3,"hidden"],[3,"dtu-active","click",4,"ngFor","ngForOf"],[3,"click"],["mat-button","","color","accent",3,"click"],["mat-button","","color","primary",3,"click"]],template:function(t,e){1&t&&(qi(0,"div",0,1),qi(2,"div",2),qi(3,"section",3),qi(4,"div",4),Bi(5,Qu,7,5,"div",5),Zi(),Zi(),Zi(),qi(6,"div",6),qi(7,"section",3),Wi(8,"div",7),qi(9,"div",8),Bi(10,Ku,2,0,"button",9),Bi(11,Ju,2,0,"button",10),Zi(),Zi(),Zi(),Zi()),2&t&&(vs(5),$i("ngForOf",e.activityList),vs(3),$i("innerHTML",e.currentActivity.content,kr),vs(2),$i("ngIf",e.previousActivity),vs(1),$i("ngIf",e.nextActivity))},directives:[jl,Ll,$u],styles:['.dtu-activity-list[_ngcontent-%COMP%]{position:relative}.dtu-activity-list[_ngcontent-%COMP%]:before{position:absolute;z-index:-1;top:15px;bottom:15px;left:16px;width:4px;background-color:var(--secondaryBackground);content:""}.dtu-activity-section[_ngcontent-%COMP%]{position:relative;display:flex;align-items:flex-start;cursor:pointer}.dtu-activity-section[_ngcontent-%COMP%]:last-of-type:before{position:absolute;z-index:-1;top:15px;bottom:15px;left:16px;width:4px;background-color:var(--background);content:""}.dtu-activity-section[_ngcontent-%COMP%]   .dtu-activity-section-number[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:36px;min-width:36px;height:36px;margin-top:12px;margin-right:10px;border:3px solid var(--background);border-radius:50%;background-color:var(--tertiaryBackground);color:var(--white)}.dtu-activity-section[_ngcontent-%COMP%]   .dtu-activity-section-number.dtu-active[_ngcontent-%COMP%]{background-image:linear-gradient(to bottom right,var(--blue) 25%,var(--purple) 75%)}.dtu-activity-section[_ngcontent-%COMP%]   .dtu-activity-section-content[_ngcontent-%COMP%]{flex-grow:2;padding:20px;border-radius:5px;transition:background-color .2s ease-in-out}.dtu-activity-section[_ngcontent-%COMP%]:hover   .dtu-activity-section-content[_ngcontent-%COMP%]{background-color:var(--backgroundHover)}.dtu-activity-section[_ngcontent-%COMP%]   .dtu-activity-section-list[_ngcontent-%COMP%]{margin:15px 0 0;padding-left:25px}.dtu-activity-section[_ngcontent-%COMP%]   .dtu-activity-section-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{position:relative;margin-bottom:10px;font-size:.875rem;font-weight:400;color:var(--textLight);transition:color .2s ease-in-out}.dtu-activity-section[_ngcontent-%COMP%]   .dtu-activity-section-list[_ngcontent-%COMP%]   li.dtu-active[_ngcontent-%COMP%], .dtu-activity-section[_ngcontent-%COMP%]   .dtu-activity-section-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{color:var(--text)}.dtu-activity-section[_ngcontent-%COMP%]   .dtu-activity-section-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-of-type{margin-bottom:0}.dtu-activity-pagination[_ngcontent-%COMP%]{margin-top:25px}']}),t})();function Xu(t,e){if(1&t){const t=Gi();qi(0,"dtu-event-activities",3),Ki("scrollChange",function(){return Ce(t),Xi().scrollToTop()}),Zi()}2&t&&$i("activityList",Xi().labGuide)}let th=(()=>{class t{constructor(t){this.http=t,this.labGuidePath="./lab-guide.json",this.getLabGuide()}getLabGuide(){return t=this,void 0,n=function*(){try{this.labGuide=yield this.http.get(this.labGuidePath).toPromise()}catch(t){console.log("No lab guide found")}},new((e=void 0)||(e=Promise))(function(r,s){function i(t){try{a(n.next(t))}catch(e){s(e)}}function o(t){try{a(n.throw(t))}catch(e){s(e)}}function a(t){var n;t.done?r(t.value):(n=t.value,n instanceof e?n:new e(function(t){t(n)})).then(i,o)}a((n=n.apply(t,[])).next())});var t,e,n}scrollToTop(){window.scrollTo(0,0)}}return t.\u0275fac=function(e){return new(e||t)(zi(Mc))},t.\u0275cmp=Rt({type:t,selectors:[["dtu-root"]],decls:3,vars:1,consts:[[1,"dtu-wrapper"],[1,"dtu-section"],[3,"activityList","scrollChange",4,"ngIf"],[3,"activityList","scrollChange"]],template:function(t,e){1&t&&(qi(0,"div",0),qi(1,"div",1),Bi(2,Xu,1,1,"dtu-event-activities",2),Zi(),Zi()),2&t&&(vs(2),$i("ngIf",e.labGuide))},directives:[Ll,Yu],styles:[".dtu-section[_ngcontent-%COMP%]{margin-top:40px}"]}),t})(),eh=(()=>{class t{}return t.\u0275mod=Mt({type:t,bootstrap:[th]}),t.\u0275inj=et({factory:function(e){return new(e||t)},imports:[[mc,qu,Jc]]}),t})();(function(){if(gl)throw new Error("Cannot enable prod mode after platform setup.");ml=!1}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */)(),fc().bootstrapModule(eh).catch(t=>console.error(t))},0:function(t,e,n){t.exports=n("/eoE")},zn8P:function(t,e){function n(t){return Promise.resolve().then(function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e})}n.keys=function(){return[]},n.resolve=n,t.exports=n,n.id="zn8P"}},[[0,0]]]);