import { e as consoleError, r as registerInstance, a as createEvent, h as h$1, d as Host, g as getElement } from './index-DOsxbypX.js';
import { v as videoToBlob, C as CameraDirection, i as initWebcamToVideo, c as createVideo, a as createCanvas, r as renderToCanvas } from './camera.service-EIF4KpJN.js';

var t="undefined"!=typeof self?self:{};function e(){throw Error("Invalid UTF8")}function n(t,e){return e=String.fromCharCode.apply(null,e),null==t?e:t+e}let r,i;const s="undefined"!=typeof TextDecoder;let o;const a="undefined"!=typeof TextEncoder;function c(t){if(a)t=(o||=new TextEncoder).encode(t);else {let n=0;const r=new Uint8Array(3*t.length);for(let i=0;i<t.length;i++){var e=t.charCodeAt(i);if(e<128)r[n++]=e;else {if(e<2048)r[n++]=e>>6|192;else {if(e>=55296&&e<=57343){if(e<=56319&&i<t.length){const s=t.charCodeAt(++i);if(s>=56320&&s<=57343){e=1024*(e-55296)+s-56320+65536,r[n++]=e>>18|240,r[n++]=e>>12&63|128,r[n++]=e>>6&63|128,r[n++]=63&e|128;continue}i--;}e=65533;}r[n++]=e>>12|224,r[n++]=e>>6&63|128;}r[n++]=63&e|128;}}t=n===r.length?r:r.subarray(0,n);}return t}var h,u;t:{for(var l=["CLOSURE_FLAGS"],d=t,f=0;f<l.length;f++)if(null==(d=d[l[f]])){u=null;break t}u=d;}var p,g=u&&u[610401301];h=null!=g&&g;const m=t.navigator;function y(t){return !!h&&(!!p&&p.brands.some((({brand:e})=>e&&-1!=e.indexOf(t))))}function _(e){var n;return (n=t.navigator)&&(n=n.userAgent)||(n=""),-1!=n.indexOf(e)}function v(){return !!h&&(!!p&&p.brands.length>0)}function E(){return v()?y("Chromium"):(_("Chrome")||_("CriOS"))&&!(!v()&&_("Edge"))||_("Silk")}function w(t){return w[" "](t),t}p=m&&m.userAgentData||null,w[" "]=function(){};var T=!v()&&(_("Trident")||_("MSIE"));!_("Android")||E(),E(),_("Safari")&&(E()||!v()&&_("Coast")||!v()&&_("Opera")||!v()&&_("Edge")||(v()?y("Microsoft Edge"):_("Edg/"))||v()&&y("Opera"));var A={},b=null;function k(t){const e=t.length;let n=3*e/4;n%3?n=Math.floor(n):-1!="=.".indexOf(t[e-1])&&(n=-1!="=.".indexOf(t[e-2])?n-2:n-1);const r=new Uint8Array(n);let i=0;return function(t,e){function n(e){for(;r<t.length;){const e=t.charAt(r++),n=b[e];if(null!=n)return n;if(!/^[\s\xa0]*$/.test(e))throw Error("Unknown base64 encoding at char: "+e)}return e}S();let r=0;for(;;){const t=n(-1),r=n(0),i=n(64),s=n(64);if(64===s&&-1===t)break;e(t<<2|r>>4),64!=i&&(e(r<<4&240|i>>2),64!=s&&e(i<<6&192|s));}}(t,(function(t){r[i++]=t;})),i!==n?r.subarray(0,i):r}function S(){if(!b){b={};var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),e=["+/=","+/","-_=","-_.","-_"];for(let n=0;n<5;n++){const r=t.concat(e[n].split(""));A[n]=r;for(let t=0;t<r.length;t++){const e=r[t];void 0===b[e]&&(b[e]=t);}}}}var x="undefined"!=typeof Uint8Array,L=!T&&"function"==typeof btoa;function R(t){if(!L){var e;void 0===e&&(e=0),S(),e=A[e];var n=Array(Math.floor(t.length/3)),r=e[64]||"";let c=0,h=0;for(;c<t.length-2;c+=3){var i=t[c],s=t[c+1],o=t[c+2],a=e[i>>2];i=e[(3&i)<<4|s>>4],s=e[(15&s)<<2|o>>6],o=e[63&o],n[h++]=a+i+s+o;}switch(a=0,o=r,t.length-c){case 2:o=e[(15&(a=t[c+1]))<<2]||r;case 1:t=t[c],n[h]=e[t>>2]+e[(3&t)<<4|a>>4]+o+r;}return n.join("")}for(e="",n=0,r=t.length-10240;n<r;)e+=String.fromCharCode.apply(null,t.subarray(n,n+=10240));return e+=String.fromCharCode.apply(null,n?t.subarray(n):t),btoa(e)}const F=/[-_.]/g,I={"-":"+",_:"/",".":"="};function M(t){return I[t]||""}function P(t){if(!L)return k(t);F.test(t)&&(t=t.replace(F,M)),t=atob(t);const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}function O(t){return x&&null!=t&&t instanceof Uint8Array}var C={};function U(){return B||=new N(null,C)}function D(t){j(C);var e=t.g;return null==(e=null==e||O(e)?e:"string"==typeof e?P(e):null)?e:t.g=e}var N=class{h(){return new Uint8Array(D(this)||0)}constructor(t,e){if(j(e),this.g=t,null!=t&&0===t.length)throw Error("ByteString should be constructed with non-empty values")}};let B,G;function j(t){if(t!==C)throw Error("illegal external caller")}function V(t,e){t.__closure__error__context__984382||(t.__closure__error__context__984382={}),t.__closure__error__context__984382.severity=e;}function X(t){return V(t=Error(t),"warning"),t}var H="function"==typeof Symbol&&"symbol"==typeof Symbol(),W=new Set;function z(t,e,n=!1,r=!1){return t="function"==typeof Symbol&&"symbol"==typeof Symbol()?r&&Symbol.for&&t?Symbol.for(t):null!=t?Symbol(t):Symbol():e,n&&W.add(t),t}var K=z("jas",void 0,!0,!0),Y=z(void 0,"0di"),$=z(void 0,"2ex"),q=z(void 0,"1oa",!0),J=z(void 0,Symbol(),!0);const Z=H?K:"Ga",Q={Ga:{value:0,configurable:!0,writable:!0,enumerable:!1}},tt=Object.defineProperties;function et(t,e){H||Z in t||tt(t,Q),t[Z]|=e;}function nt(t,e){H||Z in t||tt(t,Q),t[Z]=e;}function rt(t){return et(t,34),t}function it(t,e){nt(e,-30975&(0|t));}function st(t,e){nt(e,-30941&(34|t));}function ot(){return "function"==typeof BigInt}function at(t){return Array.prototype.slice.call(t)}var ct,ht={},ut={};function lt(t){return !(!t||"object"!=typeof t||t.Ia!==ut)}function dt(t){return null!==t&&"object"==typeof t&&!Array.isArray(t)&&t.constructor===Object}function ft(t,e){if(null!=t)if("string"==typeof t)t=t?new N(t,C):U();else if(t.constructor!==N)if(O(t))t=t.length?new N(new Uint8Array(t),C):U();else {if(!e)throw Error();t=void 0;}return t}function pt(t){return !(!Array.isArray(t)||t.length)&&!!(1&(0|t[Z]))}const gt=[];function mt(t){if(2&t)throw Error()}nt(gt,55),ct=Object.freeze(gt);class yt{constructor(t,e,n){this.l=0,this.g=t,this.h=e,this.m=n;}next(){if(this.l<this.g.length){const t=this.g[this.l++];return {done:!1,value:this.h?this.h.call(this.m,t):t}}return {done:!0,value:void 0}}[Symbol.iterator](){return new yt(this.g,this.h,this.m)}}function _t(t){return J?t[J]:void 0}var vt=Object.freeze({});function Et(t){return t.Qa=!0,t}var wt=Et((t=>"number"==typeof t)),Tt=Et((t=>"string"==typeof t)),At=Et((t=>"boolean"==typeof t)),bt="function"==typeof t.BigInt&&"bigint"==typeof t.BigInt(0),kt=Et((t=>bt?t>=xt&&t<=Rt:"-"===t[0]?Ft(t,St):Ft(t,Lt)));const St=Number.MIN_SAFE_INTEGER.toString(),xt=bt?BigInt(Number.MIN_SAFE_INTEGER):void 0,Lt=Number.MAX_SAFE_INTEGER.toString(),Rt=bt?BigInt(Number.MAX_SAFE_INTEGER):void 0;function Ft(t,e){if(t.length>e.length)return !1;if(t.length<e.length||t===e)return !0;for(let n=0;n<t.length;n++){const r=t[n],i=e[n];if(r>i)return !1;if(r<i)return !0}}const It="function"==typeof Uint8Array.prototype.slice;let Mt,Pt=0,Ot=0;function Ct(t){const e=t>>>0;Pt=e,Ot=(t-e)/4294967296>>>0;}function Ut(t){if(t<0){Ct(-t);const[e,n]=Xt(Pt,Ot);Pt=e>>>0,Ot=n>>>0;}else Ct(t);}function Dt(t){const e=Mt||=new DataView(new ArrayBuffer(8));e.setFloat32(0,+t,!0),Ot=0,Pt=e.getUint32(0,!0);}function Nt(t,e){const n=4294967296*e+(t>>>0);return Number.isSafeInteger(n)?n:Gt(t,e)}function Bt(t,e){const n=2147483648&e;return n&&(e=~e>>>0,0==(t=1+~t>>>0)&&(e=e+1>>>0)),"number"==typeof(t=Nt(t,e))?n?-t:t:n?"-"+t:t}function Gt(t,e){if(t>>>=0,(e>>>=0)<=2097151)var n=""+(4294967296*e+t);else ot()?n=""+(BigInt(e)<<BigInt(32)|BigInt(t)):(t=(16777215&t)+6777216*(n=16777215&(t>>>24|e<<8))+6710656*(e=e>>16&65535),n+=8147497*e,e*=2,t>=1e7&&(n+=t/1e7>>>0,t%=1e7),n>=1e7&&(e+=n/1e7>>>0,n%=1e7),n=e+jt(n)+jt(t));return n}function jt(t){return t=String(t),"0000000".slice(t.length)+t}function Vt(t){if(t.length<16)Ut(Number(t));else if(ot())t=BigInt(t),Pt=Number(t&BigInt(4294967295))>>>0,Ot=Number(t>>BigInt(32)&BigInt(4294967295));else {const e=+("-"===t[0]);Ot=Pt=0;const n=t.length;for(let r=e,i=(n-e)%6+e;i<=n;r=i,i+=6){const e=Number(t.slice(r,i));Ot*=1e6,Pt=1e6*Pt+e,Pt>=4294967296&&(Ot+=Math.trunc(Pt/4294967296),Ot>>>=0,Pt>>>=0);}if(e){const[t,e]=Xt(Pt,Ot);Pt=t,Ot=e;}}}function Xt(t,e){return e=~e,t?t=1+~t:e+=1,[t,e]}const Ht="function"==typeof BigInt?BigInt.asIntN:void 0,Wt="function"==typeof BigInt?BigInt.asUintN:void 0,zt=Number.isSafeInteger,Kt=Number.isFinite,Yt=Math.trunc;function $t(t){return null==t||"number"==typeof t?t:"NaN"===t||"Infinity"===t||"-Infinity"===t?Number(t):void 0}function qt(t){return null==t||"boolean"==typeof t?t:"number"==typeof t?!!t:void 0}const Jt=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function Zt(t){switch(typeof t){case "bigint":return !0;case "number":return Kt(t);case "string":return Jt.test(t);default:return !1}}function Qt(t){if(null==t)return t;if("string"==typeof t&&t)t=+t;else if("number"!=typeof t)return;return Kt(t)?0|t:void 0}function te(t){if(null==t)return t;if("string"==typeof t&&t)t=+t;else if("number"!=typeof t)return;return Kt(t)?t>>>0:void 0}function ee(t){if("-"===t[0])return !1;const e=t.length;return e<20||20===e&&Number(t.substring(0,6))<184467}function ne(t){return t=Yt(t),zt(t)||(Ut(t),t=Bt(Pt,Ot)),t}function re(t){var e=Yt(Number(t));if(zt(e))return String(e);if(-1!==(e=t.indexOf("."))&&(t=t.substring(0,e)),e=t.length,!("-"===t[0]?e<20||20===e&&Number(t.substring(0,7))>-922337:e<19||19===e&&Number(t.substring(0,6))<922337))if(Vt(t),t=Pt,2147483648&(e=Ot))if(ot())t=""+(BigInt(0|e)<<BigInt(32)|BigInt(t>>>0));else {const[n,r]=Xt(t,e);t="-"+Gt(n,r);}else t=Gt(t,e);return t}function ie(t){return null==t?t:"bigint"==typeof t?(kt(t)?t=Number(t):(t=Ht(64,t),t=kt(t)?Number(t):String(t)),t):Zt(t)?"number"==typeof t?ne(t):re(t):void 0}function se(t){if(null==t)return t;var e=typeof t;if("bigint"===e)return String(Wt(64,t));if(Zt(t)){if("string"===e)return e=Yt(Number(t)),zt(e)&&e>=0?t=String(e):(-1!==(e=t.indexOf("."))&&(t=t.substring(0,e)),ee(t)||(Vt(t),t=Gt(Pt,Ot))),t;if("number"===e)return (t=Yt(t))>=0&&zt(t)?t:function(t){if(t<0){Ut(t);var e=Gt(Pt,Ot);return t=Number(e),zt(t)?t:e}return ee(e=String(t))?e:(Ut(t),Nt(Pt,Ot))}(t)}}function oe(t){if("string"!=typeof t)throw Error();return t}function ae(t){if(null!=t&&"string"!=typeof t)throw Error();return t}function ce(t){return null==t||"string"==typeof t?t:void 0}function he(t,e,n,r){if(null!=t&&"object"==typeof t&&t.W===ht)return t;if(!Array.isArray(t))return n?2&r?((t=e[Y])||(rt((t=new e).u),t=e[Y]=t),e=t):e=new e:e=void 0,e;let i=n=0|t[Z];return 0===i&&(i|=32&r),i|=2&r,i!==n&&nt(t,i),new e(t)}function ue(t,e,n){if(e)t:{if(!Zt(e=t))throw X("int64");switch(typeof e){case "string":e=re(e);break t;case "bigint":if(t=e=Ht(64,e),Tt(t)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(t))throw Error(String(t))}else if(wt(t)&&!Number.isSafeInteger(t))throw Error(String(t));e=bt?BigInt(e):At(e)?e?"1":"0":Tt(e)?e.trim()||"0":String(e);break t;default:e=ne(e);}}else e=ie(t);return "string"==typeof(n=null==(t=e)?n?0:void 0:t)&&zt(e=+n)?e:n}const le={};let de=function(){try{return w(new class extends Map{constructor(){super();}}),!1}catch{return !0}}();class fe{constructor(){this.g=new Map;}get(t){return this.g.get(t)}set(t,e){return this.g.set(t,e),this.size=this.g.size,this}delete(t){return t=this.g.delete(t),this.size=this.g.size,t}clear(){this.g.clear(),this.size=this.g.size;}has(t){return this.g.has(t)}entries(){return this.g.entries()}keys(){return this.g.keys()}values(){return this.g.values()}forEach(t,e){return this.g.forEach(t,e)}[Symbol.iterator](){return this.entries()}}const pe=de?(Object.setPrototypeOf(fe.prototype,Map.prototype),Object.defineProperties(fe.prototype,{size:{value:0,configurable:!0,enumerable:!0,writable:!0}}),fe):class extends Map{constructor(){super();}};function ge(t){return t}function me(t){if(2&t.L)throw Error("Cannot mutate an immutable Map")}var ye=class extends pe{constructor(t,e,n=ge,r=ge){super();let i=0|t[Z];i|=64,nt(t,i),this.L=i,this.S=e,this.R=n,this.Y=this.S?_e:r;for(let s=0;s<t.length;s++){const o=t[s],a=n(o[0],!1,!0);let c=o[1];e?void 0===c&&(c=null):c=r(o[1],!1,!0,void 0,void 0,i),super.set(a,c);}}na(t=ve){if(0!==this.size)return this.X(t)}X(t=ve){const e=[],n=super.entries();for(var r;!(r=n.next()).done;)(r=r.value)[0]=t(r[0]),r[1]=t(r[1]),e.push(r);return e}clear(){me(this),super.clear();}delete(t){return me(this),super.delete(this.R(t,!0,!1))}entries(){var t=this.ma();return new yt(t,Ee,this)}keys(){return this.Ha()}values(){var t=this.ma();return new yt(t,ye.prototype.get,this)}forEach(t,e){super.forEach(((n,r)=>{t.call(e,this.get(r),r,this);}));}set(t,e){return me(this),null==(t=this.R(t,!0,!1))?this:null==e?(super.delete(t),this):super.set(t,this.Y(e,!0,!0,this.S,!1,this.L))}Na(t){const e=this.R(t[0],!1,!0);t=t[1],t=this.S?void 0===t?null:t:this.Y(t,!1,!0,void 0,!1,this.L),super.set(e,t);}has(t){return super.has(this.R(t,!1,!1))}get(t){t=this.R(t,!1,!1);const e=super.get(t);if(void 0!==e){var n=this.S;return n?((n=this.Y(e,!1,!0,n,this.ra,this.L))!==e&&super.set(t,n),n):e}}ma(){return Array.from(super.keys())}Ha(){return super.keys()}[Symbol.iterator](){return this.entries()}};function _e(t,e,n,r,i,s){return t=he(t,r,n,s),i&&(t=Oe(t)),t}function ve(t){return t}function Ee(t){return [t,this.get(t)]}let we,Te,Ae;function be(){return we||=new ye(rt([]),void 0,void 0,void 0,le)}function ke(t,e,n,r,i){if(null!=t){if(Array.isArray(t))t=pt(t)?void 0:i&&2&(0|t[Z])?t:Se(t,e,n,void 0!==r,i);else if(dt(t)){const s={};for(let o in t)s[o]=ke(t[o],e,n,r,i);t=s;}else t=e(t,r);return t}}function Se(t,e,n,r,i){const s=r||n?0|t[Z]:0,o=r?!!(32&s):void 0;r=at(t);for(let t=0;t<r.length;t++)r[t]=ke(r[t],e,n,o,i);return n&&((t=_t(t))&&(r[J]=at(t)),n(s,r)),r}function xe(t){return ke(t,Le,void 0,void 0,!1)}function Le(t){return t.W===ht?t.toJSON():t instanceof ye?t.na(xe):function(t){switch(typeof t){case "number":return isFinite(t)?t:String(t);case "bigint":return kt(t)?Number(t):String(t);case "boolean":return t?1:0;case "object":if(t)if(Array.isArray(t)){if(pt(t))return}else {if(O(t))return R(t);if(t instanceof N){const e=t.g;return null==e?"":"string"==typeof e?e:t.g=R(e)}if(t instanceof ye)return t.na()}}return t}(t)}function Re(t){return Se(t,Le,void 0,void 0,!1)}function Fe(t,e,n){return t=Ie(t,e[0],e[1],n?1:2),e!==Te&&n&&et(t,16384),t}function Ie(t,e,n,r){if(null==t){var i=96;n?(t=[n],i|=512):t=[],e&&(i=-33521665&i|(1023&e)<<15);}else {if(!Array.isArray(t))throw Error("narr");if(2048&(i=0|t[Z]))throw Error("farr");if(64&i)return t;if(1===r||2===r||(i|=64),n&&(i|=512,n!==t[0]))throw Error("mid");t:{if(r=(n=t).length){const t=r-1;if(dt(n[t])){if((e=t-(512&(i|=256)?0:-1))>=1024)throw Error("pvtlmt");i=-33521665&i|(1023&e)<<15;break t}}if(e){if((e=Math.max(e,r-(512&i?0:-1)))>1024)throw Error("spvt");i=-33521665&i|(1023&e)<<15;}}}return nt(t,i),t}function Me(t,e,n=st){if(null!=t){if(x&&t instanceof Uint8Array)return e?t:new Uint8Array(t);if(Array.isArray(t)){var r=0|t[Z];return 2&r?t:(e&&=0===r||!!(32&r)&&!(64&r||!(16&r)),e?(nt(t,-12293&(34|r)),t):Se(t,Me,4&r?st:n,!0,!0))}return t.W===ht?t=2&(r=0|(n=t.u)[Z])?t:new t.constructor(Pe(n,r,!0)):t instanceof ye&&!(2&t.L)&&(n=rt(t.X(Me)),t=new ye(n,t.S,t.R,t.Y)),t}}function Pe(t,e,n){const r=n||2&e?st:it,i=!!(32&e);return t=function(t,e,n){const r=at(t);var i=r.length;const s=256&e?r[i-1]:void 0;for(i+=s?-1:0,e=512&e?1:0;e<i;e++)r[e]=n(r[e]);if(s){e=r[e]={};for(const t in s)e[t]=n(s[t]);}return (t=_t(t))&&(r[J]=at(t)),r}(t,e,(t=>Me(t,i,r))),et(t,32|(n?2:0)),t}function Oe(t){const e=t.u,n=0|e[Z];return 2&n?new t.constructor(Pe(e,n,!1)):t}function Ce(t,e){return Ue(t=t.u,0|t[Z],e)}function Ue(e,n,r,i){if(-1===r)return null;var s=r+(512&n?0:-1);const o=e.length-1;return s>=o&&256&n?e[o][r]:i&&256&n&&null!=(n=e[o][r])?(null!=e[s]&&null!=$&&((s=(e=G??={})[$]||0)>=4||(e[$]=s+1,V(e=Error(),"incident"),function(e){t.setTimeout((()=>{throw e}),0);}(e))),n):s<=o?e[s]:void 0}function De(t,e,n){const r=t.u;let i=0|r[Z];return mt(i),Ne(r,i,e,n),t}function Ne(t,e,n,r){const i=512&e?0:-1,s=n+i;var o=t.length-1;return s>=o&&256&e?(t[o][n]=r,e):s<=o?(t[s]=r,256&e&&(n in(t=t[o])&&delete t[n]),e):(void 0!==r&&(n>=(o=e>>15&1023||536870912)?null!=r&&(t[o+i]={[n]:r},nt(t,e|=256)):t[s]=r),e)}function Be(t,e){let n=0|(t=t.u)[Z];const r=Ue(t,n,e),i=$t(r);return null!=i&&i!==r&&Ne(t,n,e,i),i}function Ge(t){let e=0|(t=t.u)[Z];const n=Ue(t,e,1),r=ft(n,!0);return null!=r&&r!==n&&Ne(t,e,1,r),r}function je(){return void 0===vt?2:4}function Ve(t,e,n,r,i){const s=t.u,o=2&(t=0|s[Z])?1:r;i=!!i;let a=0|(r=Xe(s,t,e))[Z];if(!(4&a)){4&a&&(r=at(r),a=an(a,t),t=Ne(s,t,e,r));let i=0,o=0;for(;i<r.length;i++){const t=n(r[i]);null!=t&&(r[o++]=t);}o<i&&(r.length=o),a=He(a,t),n=-4097&(20|a),a=n&=-8193,nt(r,a),2&a&&Object.freeze(r);}return 1===o||4===o&&32&a?We(a)||(i=a,a|=2,a!==i&&nt(r,a),Object.freeze(r)):(2===o&&We(a)&&(r=at(r),a=an(a,t),a=cn(a,t,i),nt(r,a),t=Ne(s,t,e,r)),We(a)||(e=a,a=cn(a,t,i),a!==e&&nt(r,a))),r}function Xe(t,e,n,r){return t=Ue(t,e,n,r),Array.isArray(t)?t:ct}function He(t,e){return 0===t&&(t=an(t,e)),1|t}function We(t){return !!(2&t)&&!!(4&t)||!!(2048&t)}function ze(t){t=at(t);for(let e=0;e<t.length;e++){const n=t[e]=at(t[e]);Array.isArray(n[1])&&(n[1]=rt(n[1]));}return t}function Ke(t,e,n,r){let i=0|(t=t.u)[Z];mt(i),Ne(t,i,e,("0"===r?0===Number(n):n===r)?void 0:n);}function Ye(t,e,n,r,i){mt(e);var s=!(!(64&e)&&16384&e);const o=(i=Xe(t,e,n,i))!==ct;if(s||!o){let a=s=o?0|i[Z]:0;(!o||2&a||We(a)||4&a&&!(32&a))&&(i=at(i),a=an(a,e),e=Ne(t,e,n,i)),a=-13&He(a,e),a=cn(r?-17&a:16|a,e,!0),a!==s&&nt(i,a);}return i}function $e(t,e){var n=vs;return Ze(qe(t=t.u),t,0|t[Z],n)===e?e:-1}function qe(t){if(H)return t[q]??(t[q]=new Map);if(q in t)return t[q];const e=new Map;return Object.defineProperty(t,q,{value:e}),e}function Je(t,e,n,r){const i=qe(t),s=Ze(i,t,e,n);return s!==r&&(s&&(e=Ne(t,e,s)),i.set(n,r)),e}function Ze(t,e,n,r){let i=t.get(r);if(null!=i)return i;i=0;for(let t=0;t<r.length;t++){const s=r[t];null!=Ue(e,n,s)&&(0!==i&&(n=Ne(e,n,i)),i=s);}return t.set(r,i),i}function Qe(t,e,n,r){let i,s=0|t[Z];if(null!=(r=Ue(t,s,n,r))&&r.W===ht)return (e=Oe(r))!==r&&Ne(t,s,n,e),e.u;if(Array.isArray(r)){const t=0|r[Z];i=2&t?Fe(Pe(r,t,!1),e,!0):64&t?r:Fe(i,e,!0);}else i=Fe(void 0,e,!0);return i!==r&&Ne(t,s,n,i),i}function tn(t,e,n,r){let i=0|(t=t.u)[Z];return (e=he(r=Ue(t,i,n,r),e,!1,i))!==r&&null!=e&&Ne(t,i,n,e),e}function en(t,e,n,r=!1){if(null==(e=tn(t,e,n,r)))return e;if(!(2&(r=0|(t=t.u)[Z]))){const i=Oe(e);i!==e&&Ne(t,r,n,e=i);}return e}function nn(t,e,n,r,i,s,o){t=t.u;var a=!!(2&e);const c=a?1:i;s=!!s,o&&=!a;var h=0|(i=Xe(t,e,r))[Z];if(!(a=!!(4&h))){var u=i,l=e;const t=!!(2&(h=He(h,e)));t&&(l|=2);let r=!t,s=!0,o=0,a=0;for(;o<u.length;o++){const e=he(u[o],n,!1,l);if(e instanceof n){if(!t){const t=!!(2&(0|e.u[Z]));r&&=!t,s&&=t;}u[a++]=e;}}a<o&&(u.length=a),h|=4,h=s?16|h:-17&h,nt(u,h=r?8|h:-9&h),t&&Object.freeze(u);}if(o&&!(8&h||!i.length&&(1===c||4===c&&32&h))){for(We(h)&&(i=at(i),h=an(h,e),e=Ne(t,e,r,i)),n=i,o=h,u=0;u<n.length;u++)(h=n[u])!==(l=Oe(h))&&(n[u]=l);o|=8,nt(n,o=n.length?-17&o:16|o),h=o;}return 1===c||4===c&&32&h?We(h)||(e=h,(h|=!i.length||16&h&&(!a||32&h)?2:2048)!==e&&nt(i,h),Object.freeze(i)):(2===c&&We(h)&&(nt(i=at(i),h=cn(h=an(h,e),e,s)),e=Ne(t,e,r,i)),We(h)||(r=h,(h=cn(h,e,s))!==r&&nt(i,h))),i}function rn(t,e,n){const r=0|t.u[Z];return nn(t,r,e,n,je(),!1,!(2&r))}function sn(t,e,n,r){return null==r&&(r=void 0),De(t,n,r)}function on(t,e,n,r){null==r&&(r=void 0);t:{let i=0|(t=t.u)[Z];if(mt(i),null==r){const r=qe(t);if(Ze(r,t,i,n)!==e)break t;r.set(n,0);}else i=Je(t,i,n,e);Ne(t,i,e,r);}}function an(t,e){return -2049&(t=32|(2&e?2|t:-3&t))}function cn(t,e,n){return 32&e&&n||(t&=-33),t}function hn(t,e,n,r){const i=0|t.u[Z];mt(i),t=nn(t,i,n,e,2,!0),r=null!=r?r:new n,t.push(r),t[Z]=2&(0|r.u[Z])?-9&t[Z]:-17&t[Z];}function un(t,e){return Qt(Ce(t,e))}function ln(t,e){return ce(Ce(t,e))}function dn(t,e){return Be(t,e)??0}function fn(t,e,n){if(null!=n&&"boolean"!=typeof n)throw t=typeof n,Error(`Expected boolean but got ${"object"!=t?t:n?Array.isArray(n)?"array":t:"null"}: ${n}`);De(t,e,n);}function pn(t,e,n){if(null!=n){if("number"!=typeof n)throw X("int32");if(!Kt(n))throw X("int32");n|=0;}De(t,e,n);}function gn(t,e,n){if(null!=n&&"number"!=typeof n)throw Error(`Value of float/double field must be a number, found ${typeof n}: ${n}`);De(t,e,n);}function mn(t,e,n){{const o=t.u;let a=0|o[Z];if(mt(a),null==n)Ne(o,a,e);else {var r=t=0|n[Z],i=We(t),s=i||Object.isFrozen(n);for(i||(t=0),s||(n=at(n),r=0,t=cn(t=an(t,a),a,!0),s=!1),t|=21,i=0;i<n.length;i++){const e=n[i],o=oe(e);Object.is(e,o)||(s&&(n=at(n),r=0,t=cn(t=an(t,a),a,!0),s=!1),n[i]=o);}t!==r&&(s&&(n=at(n),t=cn(t=an(t,a),a,!0)),nt(n,t)),Ne(o,a,e,n);}}}function yn(t,e,n){mt(0|t.u[Z]),Ve(t,e,ce,2,!0).push(oe(n));}function _n(t,e){return Error(`Invalid wire type: ${t} (at position ${e})`)}function vn(){return Error("Failed to read varint, encoding is invalid.")}function En(t,e){return Error(`Tried to read past the end of the data ${e} > ${t}`)}function wn(t){if("string"==typeof t)return {buffer:P(t),N:!1};if(Array.isArray(t))return {buffer:new Uint8Array(t),N:!1};if(t.constructor===Uint8Array)return {buffer:t,N:!1};if(t.constructor===ArrayBuffer)return {buffer:new Uint8Array(t),N:!1};if(t.constructor===N)return {buffer:D(t)||new Uint8Array(0),N:!0};if(t instanceof Uint8Array)return {buffer:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),N:!1};throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers")}function Tn(t,e){let n,r=0,i=0,s=0;const o=t.h;let a=t.g;do{n=o[a++],r|=(127&n)<<s,s+=7;}while(s<32&&128&n);for(s>32&&(i|=(127&n)>>4),s=3;s<32&&128&n;s+=7)n=o[a++],i|=(127&n)<<s;if(Fn(t,a),n<128)return e(r>>>0,i>>>0);throw vn()}function An(t){let e=0,n=t.g;const r=n+10,i=t.h;for(;n<r;){const r=i[n++];if(e|=r,0==(128&r))return Fn(t,n),!!(127&e)}throw vn()}function bn(t){const e=t.h;let n=t.g,r=e[n++],i=127&r;if(128&r&&(r=e[n++],i|=(127&r)<<7,128&r&&(r=e[n++],i|=(127&r)<<14,128&r&&(r=e[n++],i|=(127&r)<<21,128&r&&(r=e[n++],i|=r<<28,128&r&&128&e[n++]&&128&e[n++]&&128&e[n++]&&128&e[n++]&&128&e[n++])))))throw vn();return Fn(t,n),i}function kn(t){return bn(t)>>>0}function Sn(t){var e=t.h;const n=t.g,r=e[n],i=e[n+1],s=e[n+2];return e=e[n+3],Fn(t,t.g+4),(r<<0|i<<8|s<<16|e<<24)>>>0}function xn(t){var e=Sn(t);t=2*(e>>31)+1;const n=e>>>23&255;return e&=8388607,255==n?e?NaN:t*(1/0):0==n?1401298464324817e-60*t*e:t*Math.pow(2,n-150)*(e+8388608)}function Ln(t){return bn(t)}function Rn(t,e,{ba:n=!1}={}){t.ba=n,e&&(e=wn(e),t.h=e.buffer,t.m=e.N,t.j=0,t.l=t.h.length,t.g=t.j);}function Fn(t,e){if(t.g=e,e>t.l)throw En(t.l,e)}function In(t,e){if(e<0)throw Error(`Tried to read a negative byte length: ${e}`);const n=t.g,r=n+e;if(r>t.l)throw En(e,t.l-n);return t.g=r,n}function Mn(t,e){if(0==e)return U();var n=In(t,e);return t.ba&&t.m?n=t.h.subarray(n,n+e):(t=t.h,n=n===(e=n+e)?new Uint8Array(0):It?t.slice(n,e):new Uint8Array(t.subarray(n,e))),0==n.length?U():new N(n,C)}ye.prototype.toJSON=void 0,ye.prototype.Ia=ut;var Pn=[];function On(t){var e=t.g;if(e.g==e.l)return !1;t.l=t.g.g;var n=kn(t.g);if(e=n>>>3,!((n&=7)>=0&&n<=5))throw _n(n,t.l);if(e<1)throw Error(`Invalid field number: ${e} (at position ${t.l})`);return t.m=e,t.h=n,!0}function Cn(t){switch(t.h){case 0:0!=t.h?Cn(t):An(t.g);break;case 1:Fn(t=t.g,t.g+8);break;case 2:if(2!=t.h)Cn(t);else {var e=kn(t.g);Fn(t=t.g,t.g+e);}break;case 5:Fn(t=t.g,t.g+4);break;case 3:for(e=t.m;;){if(!On(t))throw Error("Unmatched start-group tag: stream EOF");if(4==t.h){if(t.m!=e)throw Error("Unmatched end-group tag");break}Cn(t);}break;default:throw _n(t.h,t.l)}}function Un(t,e,n){const r=t.g.l,i=kn(t.g),s=t.g.g+i;let o=s-r;if(o<=0&&(t.g.l=s,n(e,t,void 0,void 0,void 0),o=s-t.g.g),o)throw Error(`Message parsing ended unexpectedly. Expected to read ${i} bytes, instead read ${i-o} bytes, either the data ended unexpectedly or the message misreported its own length`);return t.g.g=s,t.g.l=r,e}function Dn(t){var o=kn(t.g),a=In(t=t.g,o);if(t=t.h,s){var c,h=t;(c=i)||(c=i=new TextDecoder("utf-8",{fatal:!0})),o=a+o,h=0===a&&o===h.length?h:h.subarray(a,o);try{var u=c.decode(h);}catch(t){if(void 0===r){try{c.decode(new Uint8Array([128]));}catch(t){}try{c.decode(new Uint8Array([97])),r=!0;}catch(t){r=!1;}}throw !r&&(i=void 0),t}}else {o=(u=a)+o,a=[];let r,i=null;for(;u<o;){var l=t[u++];l<128?a.push(l):l<224?u>=o?e():(r=t[u++],l<194||128!=(192&r)?(u--,e()):a.push((31&l)<<6|63&r)):l<240?u>=o-1?e():(r=t[u++],128!=(192&r)||224===l&&r<160||237===l&&r>=160||128!=(192&(c=t[u++]))?(u--,e()):a.push((15&l)<<12|(63&r)<<6|63&c)):l<=244?u>=o-2?e():(r=t[u++],128!=(192&r)||r-144+(l<<28)>>30!=0||128!=(192&(c=t[u++]))||128!=(192&(h=t[u++]))?(u--,e()):(l=(7&l)<<18|(63&r)<<12|(63&c)<<6|63&h,l-=65536,a.push(55296+(l>>10&1023),56320+(1023&l)))):e(),a.length>=8192&&(i=n(i,a),a.length=0);}u=n(i,a);}return u}function Nn(t){const e=kn(t.g);return Mn(t.g,e)}function Bn(t,e,n){var r=kn(t.g);for(r=t.g.g+r;t.g.g<r;)n.push(e(t.g));}var Gn=[];function jn(t){return t}let Vn;function Xn(t,e,n){e.g?e.m(t,e.g,e.h,n):e.m(t,e.h,n);}var Hn=class{constructor(t,e){this.u=Ie(t,e);}toJSON(){const t=!Vn;try{return t&&(Vn=Re),Wn(this)}finally{t&&(Vn=void 0);}}l(){var t=go;return t.g?t.l(this,t.g,t.h,!0):t.l(this,t.h,t.defaultValue,!0)}clone(){const t=this.u;return new this.constructor(Pe(t,0|t[Z],!1))}N(){return !!(2&(0|this.u[Z]))}};function Wn(t){var e=t.u;{e=(t=Vn(e))!==e;let h=t.length;if(h){var n=t[h-1],r=dt(n);r?h--:n=void 0;var i=t;if(r){t:{var s,o=n,a=!1;if(o)for(let t in o)isNaN(+t)?(s??={})[t]=o[t]:(r=o[t],Array.isArray(r)&&(pt(r)||lt(r)&&0===r.size)&&(r=null),null==r&&(a=!0),null!=r&&((s??={})[t]=r));if(a||(s=o),s)for(let t in s){a=s;break t}a=null;}o=null==a?null!=n:a!==n;}for(;h>0&&(null==(s=i[h-1])||pt(s)||lt(s)&&0===s.size);h--)var c=!0;(i!==t||o||c)&&(e?(c||o||a)&&(i.length=h):i=Array.prototype.slice.call(i,0,h),a&&i.push(a)),c=i;}else c=t;}return c}function zn(t){return t?/^\d+$/.test(t)?(Vt(t),new Kn(Pt,Ot)):null:Yn||=new Kn(0,0)}Hn.prototype.W=ht,Hn.prototype.toString=function(){try{return Vn=jn,Wn(this).toString()}finally{Vn=void 0;}};var Kn=class{constructor(t,e){this.h=t>>>0,this.g=e>>>0;}};let Yn;function $n(t){return t?/^-?\d+$/.test(t)?(Vt(t),new qn(Pt,Ot)):null:Jn||=new qn(0,0)}var qn=class{constructor(t,e){this.h=t>>>0,this.g=e>>>0;}};let Jn;function Zn(t,e,n){for(;n>0||e>127;)t.g.push(127&e|128),e=(e>>>7|n<<25)>>>0,n>>>=7;t.g.push(e);}function Qn(t,e){for(;e>127;)t.g.push(127&e|128),e>>>=7;t.g.push(e);}function tr(t,e){if(e>=0)Qn(t,e);else {for(let n=0;n<9;n++)t.g.push(127&e|128),e>>=7;t.g.push(1);}}function er(t,e){t.g.push(e>>>0&255),t.g.push(e>>>8&255),t.g.push(e>>>16&255),t.g.push(e>>>24&255);}function nr(t,e){0!==e.length&&(t.l.push(e),t.h+=e.length);}function rr(t,e,n){Qn(t.g,8*e+n);}function ir(t,e){return rr(t,e,2),e=t.g.end(),nr(t,e),e.push(t.h),e}function sr(t,e){var n=e.pop();for(n=t.h+t.g.length()-n;n>127;)e.push(127&n|128),n>>>=7,t.h++;e.push(n),t.h++;}function or(t,e,n){rr(t,e,2),Qn(t.g,n.length),nr(t,t.g.end()),nr(t,n);}function ar(t,e,n,r){null!=n&&(e=ir(t,e),r(n,t),sr(t,e));}function cr(){const t=class{constructor(){throw Error()}};return Object.setPrototypeOf(t,t.prototype),t}var hr=cr(),ur=cr(),lr=cr(),dr=cr(),fr=cr(),pr=cr(),gr=cr(),mr=cr(),yr=cr(),_r=class{constructor(t,e,n){this.g=t,this.h=e,t=hr,this.l=!!t&&n===t||!1;}};function vr(t,e){return new _r(t,e,hr)}function Er(t,e,n,r,i){ar(t,n,Ir(e,r),i);}const wr=vr((function(t,e,n,r,i){return 2===t.h&&(Un(t,Qe(e,r,n),i),!0)}),Er),Tr=vr((function(t,e,n,r,i){return 2===t.h&&(Un(t,Qe(e,r,n,!0),i),!0)}),Er);var Ar=Symbol(),br=Symbol(),kr=Symbol(),Sr=Symbol();let xr,Lr;function Rr(t,e,n,r){var i=r[t];if(i)return i;(i={}).Pa=r,i.V=function(t){switch(typeof t){case "boolean":return Te||=[0,void 0,!0];case "number":return t>0?void 0:0===t?Ae||=[0,void 0]:[-t,void 0];case "string":return [0,t];case "object":return t}}(r[0]);var s=r[1];let o=1;s&&s.constructor===Object&&(i.ga=s,"function"==typeof(s=r[++o])&&(i.la=!0,xr??=s,Lr??=r[o+1],s=r[o+=2]));const a={};for(;s&&Array.isArray(s)&&s.length&&"number"==typeof s[0]&&s[0]>0;){for(var c=0;c<s.length;c++)a[s[c]]=s;s=r[++o];}for(c=1;void 0!==s;){let t;"number"==typeof s&&(c+=s,s=r[++o]);var h=void 0;if(s instanceof _r?t=s:(t=wr,o--),t?.l){s=r[++o],h=r;var u=o;"function"==typeof s&&(s=s(),h[u]=s),h=s;}for(u=c+1,"number"==typeof(s=r[++o])&&s<0&&(u-=s,s=r[++o]);c<u;c++){const r=a[c];h?n(i,c,t,h,r):e(i,c,t,r);}}return r[t]=i}function Fr(t){return Array.isArray(t)?t[0]instanceof _r?t:[Tr,t]:[t,void 0]}function Ir(t,e){return t instanceof Hn?t.u:Array.isArray(t)?Fe(t,e,!1):void 0}function Mr(t,e,n,r){const i=n.g;t[e]=r?(t,e,n)=>i(t,e,n,r):i;}function Pr(t,e,n,r,i){const s=n.g;let o,a;t[e]=(t,e,n)=>s(t,e,n,a||=Rr(br,Mr,Pr,r).V,o||=Or(r),i);}function Or(t){let e=t[kr];if(null!=e)return e;const n=Rr(br,Mr,Pr,t);return e=n.la?(t,e)=>xr(t,e,n):(t,e)=>{const r=0|t[Z];for(;On(e)&&4!=e.h;){var i=e.m,s=n[i];if(null==s){var o=n.ga;o&&(o=o[i])&&(null!=(o=Cr(o))&&(s=n[i]=o));}null!=s&&s(e,t,i)||(i=(s=e).l,Cn(s),s.fa?s=void 0:(o=s.g.g-i,s.g.g=i,s=Mn(s.g,o)),i=t,s&&((o=i[J])?o.push(s):i[J]=[s]));}return 16384&r&&rt(t),!0},t[kr]=e}function Cr(t){const e=(t=Fr(t))[0].g;if(t=t[1]){const n=Or(t),r=Rr(br,Mr,Pr,t).V;return (t,i,s)=>e(t,i,s,r,n)}return e}function Ur(t,e,n){t[e]=n.h;}function Dr(t,e,n,r){let i,s;const o=n.h;t[e]=(t,e,n)=>o(t,e,n,s||=Rr(Ar,Ur,Dr,r).V,i||=Nr(r));}function Nr(t){let e=t[Sr];if(!e){const n=Rr(Ar,Ur,Dr,t);e=(t,e)=>Br(t,e,n),t[Sr]=e;}return e}function Br(t,e,n){for(var r=0|t[Z],i=512&r?0:-1,s=t.length,o=512&r?1:0,a=s+(256&r?-1:0);o<a;o++){const r=t[o];if(null==r)continue;const s=o-i,a=Gr(n,s);a&&a(e,r,s);}if(256&r){r=t[s-1];for(const t in r)i=+t,Number.isNaN(i)||null!=(s=r[i])&&(a=Gr(n,i))&&a(e,s,i);}if(t=_t(t))for(nr(e,e.g.end()),n=0;n<t.length;n++)nr(e,D(t[n])||new Uint8Array(0));}function Gr(t,e){var n=t[e];if(n)return n;if((n=t.ga)&&(n=n[e])){var r=(n=Fr(n))[0].h;if(n=n[1]){const e=Nr(n),i=Rr(Ar,Ur,Dr,n).V;n=t.la?Lr(i,e):(t,n,s)=>r(t,n,s,i,e);}else n=r;return t[e]=n}}function jr(t,e){if(Array.isArray(e)){var n=0|e[Z];if(4&n)return e;for(var r=0,i=0;r<e.length;r++){const n=t(e[r]);null!=n&&(e[i++]=n);}return i<r&&(e.length=i),nt(e,-12289&(5|n)),2&n&&Object.freeze(e),e}}function Vr(t,e,n){return new _r(t,e,n)}function Xr(t,e,n){return new _r(t,e,n)}function Hr(t,e,n){Ne(t,0|t[Z],e,n);}var Wr=vr((function(t,e,n,r,i){return 2===t.h&&(t=Un(t,Fe([void 0,void 0],r,!0),i),mt(r=0|e[Z]),(i=Ue(e,r,n))instanceof ye?0!=(2&i.L)?((i=i.X()).push(t),Ne(e,r,n,i)):i.Na(t):Array.isArray(i)?(2&(0|i[Z])&&Ne(e,r,n,i=ze(i)),i.push(t)):Ne(e,r,n,[t]),!0)}),(function(t,e,n,r,i){if(e instanceof ye)e.forEach(((e,s)=>{ar(t,n,Fe([s,e],r,!1),i);}));else if(Array.isArray(e))for(let s=0;s<e.length;s++){const o=e[s];Array.isArray(o)&&ar(t,n,Fe(o,r,!1),i);}}));function zr(t,e,n){if(e=function(t){if(null==t)return t;const e=typeof t;if("bigint"===e)return String(Ht(64,t));if(Zt(t)){if("string"===e)return re(t);if("number"===e)return ne(t)}}(e),null!=e){if("string"==typeof e)$n(e);if(null!=e)switch(rr(t,n,0),typeof e){case "number":t=t.g,Ut(e),Zn(t,Pt,Ot);break;case "bigint":n=BigInt.asUintN(64,e),n=new qn(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),Zn(t.g,n.h,n.g);break;default:n=$n(e),Zn(t.g,n.h,n.g);}}}function Kr(t,e,n){null!=(e=Qt(e))&&null!=e&&(rr(t,n,0),tr(t.g,e));}function Yr(t,e,n){null!=(e=qt(e))&&(rr(t,n,0),t.g.g.push(e?1:0));}function $r(t,e,n){null!=(e=ce(e))&&or(t,n,c(e));}function qr(t,e,n,r,i){ar(t,n,Ir(e,r),i);}function Jr(t,e,n){null!=(e=null==e||"string"==typeof e||O(e)||e instanceof N?e:void 0)&&or(t,n,wn(e).buffer);}function Zr(t,e,n){return (5===t.h||2===t.h)&&(e=Ye(e,0|e[Z],n,!1,!1),2==t.h?Bn(t,xn,e):e.push(xn(t.g)),!0)}var Qr=Vr((function(t,e,n){if(1!==t.h)return !1;var r=t.g;t=Sn(r);const i=Sn(r);r=2*(i>>31)+1;const s=i>>>20&2047;return t=4294967296*(1048575&i)+t,Hr(e,n,2047==s?t?NaN:r*(1/0):0==s?5e-324*r*t:r*Math.pow(2,s-1075)*(t+4503599627370496)),!0}),(function(t,e,n){null!=(e=$t(e))&&(rr(t,n,1),t=t.g,(n=Mt||=new DataView(new ArrayBuffer(8))).setFloat64(0,+e,!0),Pt=n.getUint32(0,!0),Ot=n.getUint32(4,!0),er(t,Pt),er(t,Ot));}),cr()),ti=Vr((function(t,e,n){return 5===t.h&&(Hr(e,n,xn(t.g)),!0)}),(function(t,e,n){null!=(e=$t(e))&&(rr(t,n,5),t=t.g,Dt(e),er(t,Pt));}),gr),ei=Xr(Zr,(function(t,e,n){if(null!=(e=jr($t,e)))for(let o=0;o<e.length;o++){var r=t,i=n,s=e[o];null!=s&&(rr(r,i,5),r=r.g,Dt(s),er(r,Pt));}}),gr),ni=Xr(Zr,(function(t,e,n){if(null!=(e=jr($t,e))&&e.length){rr(t,n,2),Qn(t.g,4*e.length);for(let r=0;r<e.length;r++)n=t.g,Dt(e[r]),er(n,Pt);}}),gr),ri=Vr((function(t,e,n){return 0===t.h&&(Hr(e,n,Tn(t.g,Bt)),!0)}),zr,pr),ii=Vr((function(t,e,n){return 0===t.h&&(Hr(e,n,0===(t=Tn(t.g,Bt))?void 0:t),!0)}),zr,pr),si=Vr((function(t,e,n){return 0===t.h&&(Hr(e,n,Tn(t.g,Nt)),!0)}),(function(t,e,n){if(null!=(e=se(e))){if("string"==typeof e)zn(e);if(null!=e)switch(rr(t,n,0),typeof e){case "number":t=t.g,Ut(e),Zn(t,Pt,Ot);break;case "bigint":n=BigInt.asUintN(64,e),n=new Kn(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),Zn(t.g,n.h,n.g);break;default:n=zn(e),Zn(t.g,n.h,n.g);}}}),cr()),oi=Vr((function(t,e,n){return 0===t.h&&(Hr(e,n,bn(t.g)),!0)}),Kr,dr),ai=Xr((function(t,e,n){return (0===t.h||2===t.h)&&(e=Ye(e,0|e[Z],n,!1,!1),2==t.h?Bn(t,bn,e):e.push(bn(t.g)),!0)}),(function(t,e,n){if(null!=(e=jr(Qt,e))&&e.length){n=ir(t,n);for(let n=0;n<e.length;n++)tr(t.g,e[n]);sr(t,n);}}),dr),ci=Vr((function(t,e,n){return 0===t.h&&(Hr(e,n,0===(t=bn(t.g))?void 0:t),!0)}),Kr,dr),hi=Vr((function(t,e,n){return 0===t.h&&(Hr(e,n,An(t.g)),!0)}),Yr,ur),ui=Vr((function(t,e,n){return 0===t.h&&(Hr(e,n,!1===(t=An(t.g))?void 0:t),!0)}),Yr,ur),li=Xr((function(t,e,n){return 2===t.h&&(t=Dn(t),Ye(e,0|e[Z],n,!1).push(t),!0)}),(function(t,e,n){if(null!=(e=jr(ce,e)))for(let o=0;o<e.length;o++){var r=t,i=n,s=e[o];null!=s&&or(r,i,c(s));}}),lr),di=Vr((function(t,e,n){return 2===t.h&&(Hr(e,n,""===(t=Dn(t))?void 0:t),!0)}),$r,lr),fi=Vr((function(t,e,n){return 2===t.h&&(Hr(e,n,Dn(t)),!0)}),$r,lr),pi=function(t,e,n=hr){return new _r(t,e,n)}((function(t,e,n,r,i){return 2===t.h&&(r=Fe(void 0,r,!0),Ye(e,0|e[Z],n,!0).push(r),Un(t,r,i),!0)}),(function(t,e,n,r,i){if(Array.isArray(e))for(let s=0;s<e.length;s++)qr(t,e[s],n,r,i);})),gi=vr((function(t,e,n,r,i,s){return 2===t.h&&(Je(e,0|e[Z],s,n),Un(t,e=Qe(e,r,n),i),!0)}),qr),mi=Vr((function(t,e,n){return 2===t.h&&(Hr(e,n,Nn(t)),!0)}),Jr,mr),yi=Xr((function(t,e,n){return (0===t.h||2===t.h)&&(e=Ye(e,0|e[Z],n,!1,!1),2==t.h?Bn(t,kn,e):e.push(kn(t.g)),!0)}),(function(t,e,n){if(null!=(e=jr(te,e)))for(let o=0;o<e.length;o++){var r=t,i=n,s=e[o];null!=s&&(rr(r,i,0),Qn(r.g,s));}}),fr),_i=Vr((function(t,e,n){return 0===t.h&&(Hr(e,n,0===(t=kn(t.g))?void 0:t),!0)}),(function(t,e,n){null!=(e=te(e))&&null!=e&&(rr(t,n,0),Qn(t.g,e));}),fr),vi=Vr((function(t,e,n){return 0===t.h&&(Hr(e,n,bn(t.g)),!0)}),(function(t,e,n){null!=(e=Qt(e))&&(e=parseInt(e,10),rr(t,n,0),tr(t.g,e));}),yr);class Ei{constructor(t,e){this.h=t,this.g=e,this.l=en,this.m=sn,this.defaultValue=void 0;}}function wi(t,e){return new Ei(t,e)}function Ti(t,e){return (n,r)=>{if(Gn.length){const t=Gn.pop();t.o(r),Rn(t.g,n,r),n=t;}else n=new class{constructor(t,e){if(Pn.length){const n=Pn.pop();Rn(n,t,e),t=n;}else t=new class{constructor(t,e){this.h=null,this.m=!1,this.g=this.l=this.j=0,Rn(this,t,e);}clear(){this.h=null,this.m=!1,this.g=this.l=this.j=0,this.ba=!1;}}(t,e);this.g=t,this.l=this.g.g,this.h=this.m=-1,this.o(e);}o({fa:t=!1}={}){this.fa=t;}}(n,r);try{const r=new t,s=r.u;Or(e)(s,n);var i=r;}finally{n.g.clear(),n.m=-1,n.h=-1,Gn.length<100&&Gn.push(n);}return i}}function Ai(t){return function(){const e=new class{constructor(){this.l=[],this.h=0,this.g=new class{constructor(){this.g=[];}length(){return this.g.length}end(){const t=this.g;return this.g=[],t}};}};Br(this.u,e,Rr(Ar,Ur,Dr,t)),nr(e,e.g.end());const n=new Uint8Array(e.h),r=e.l,i=r.length;let s=0;for(let t=0;t<i;t++){const e=r[t];n.set(e,s),s+=e.length;}return e.l=[n],n}}var bi=class extends Hn{constructor(t){super(t);}},ki=[0,di,Vr((function(t,e,n){return 2===t.h&&(Hr(e,n,(t=Nn(t))===U()?void 0:t),!0)}),(function(t,e,n){if(null!=e){if(e instanceof Hn){const r=e.Ra;return void(r&&(e=r(e),null!=e&&or(t,n,wn(e).buffer)))}if(Array.isArray(e))return}Jr(t,e,n);}),mr)];let Si,xi=globalThis.trustedTypes;function Li(t){void 0===Si&&(Si=function(){let t=null;if(!xi)return t;try{const e=t=>t;t=xi.createPolicy("goog#html",{createHTML:e,createScript:e,createScriptURL:e});}catch(t){}return t}());var e=Si;return new class{constructor(t){this.g=t;}toString(){return this.g+""}}(e?e.createScriptURL(t):t)}function Ri(t,...e){if(0===e.length)return Li(t[0]);let n=t[0];for(let r=0;r<e.length;r++)n+=encodeURIComponent(e[r])+t[r+1];return Li(n)}var Fi=[0,oi,vi,hi,-1,ai,vi,-1],Ii=class extends Hn{constructor(t){super(t);}},Mi=[0,hi,fi,hi,vi,-1,Xr((function(t,e,n){return (0===t.h||2===t.h)&&(e=Ye(e,0|e[Z],n,!1,!1),2==t.h?Bn(t,Ln,e):e.push(bn(t.g)),!0)}),(function(t,e,n){if(null!=(e=jr(Qt,e))&&e.length){n=ir(t,n);for(let n=0;n<e.length;n++)tr(t.g,e[n]);sr(t,n);}}),yr),fi,-1,[0,hi,-1],vi,hi,-1],Pi=[0,fi,-2],Oi=class extends Hn{constructor(t){super(t);}},Ci=[0],Ui=[0,oi,hi,1,hi,-3],Di=class extends Hn{constructor(t){super(t,2);}},Ni={};Ni[336783863]=[0,fi,hi,-1,oi,[0,[1,2,3,4,5,6,7,8],gi,Ci,gi,Mi,gi,Pi,gi,Ui,gi,Fi,gi,[0,fi,-2],gi,[0,fi,vi],gi,[0,vi,fi]],[0,fi],hi,[0,[1,3],[2,4],gi,[0,ai],-1,gi,[0,li],-1,pi,[0,fi,-1]],fi];var Bi=[0,ii,-1,ui,-3,ii,ai,di,ci,ii,-1,ui,ci,ui,-2,di];function Gi(t,e){Ke(t,2,ae(e),"");}function ji(t,e){yn(t,3,e);}function Vi(t,e){yn(t,4,e);}var Xi=class extends Hn{constructor(t){super(t,500);}o(t){return sn(this,0,7,t)}},Hi=[-1,{}],Wi=[0,fi,1,Hi],zi=[0,fi,li,Hi];function Ki(t,e){hn(t,1,Xi,e);}function Yi(t,e){yn(t,10,e);}function $i(t,e){yn(t,15,e);}var qi=class extends Hn{constructor(t){super(t,500);}o(t){return sn(this,0,1001,t)}},Ji=[-500,pi,[-500,di,-1,li,-3,[-2,Ni,hi],pi,ki,ci,-1,Wi,zi,pi,[0,di,ui],di,Bi,ci,li,987,li],4,pi,[-500,fi,-1,[-1,{}],998,fi],pi,[-500,fi,li,-1,[-2,{},hi],997,li,-1],ci,pi,[-500,fi,li,Hi,998,li],li,ci,Wi,zi,pi,[0,di,-1,Hi],li,-2,Bi,di,-1,ui,[0,ui,_i],978,Hi,pi,ki];qi.prototype.g=Ai(Ji);var Zi=Ti(qi,Ji),Qi=class extends Hn{constructor(t){super(t);}},ts=class extends Hn{constructor(t){super(t);}g(){return rn(this,Qi,1)}},es=[0,pi,[0,oi,ti,fi,-1]],ns=Ti(ts,es),rs=class extends Hn{constructor(t){super(t);}},is=class extends Hn{constructor(t){super(t);}},ss=class extends Hn{constructor(t){super(t);}h(){return en(this,rs,2)}g(){return rn(this,is,5)}},os=Ti(class extends Hn{constructor(t){super(t);}},[0,li,ai,ni,[0,vi,[0,oi,-3],[0,ti,-3],[0,oi,-1,[0,pi,[0,oi,-2]]],pi,[0,ti,-1,fi,ti]],fi,-1,ri,pi,[0,oi,ti],li,ri]),as=class extends Hn{constructor(t){super(t);}},cs=Ti(class extends Hn{constructor(t){super(t);}},[0,pi,[0,ti,-4]]),hs=class extends Hn{constructor(t){super(t);}},us=Ti(class extends Hn{constructor(t){super(t);}},[0,pi,[0,ti,-4]]),ls=class extends Hn{constructor(t){super(t);}},ds=[0,oi,-1,ni,vi],fs=class extends Hn{constructor(t){super(t);}};fs.prototype.g=Ai([0,ti,-4,ri]);var ps=class extends Hn{constructor(t){super(t);}},gs=Ti(class extends Hn{constructor(t){super(t);}},[0,pi,[0,1,oi,fi,es],ri]),ms=class extends Hn{constructor(t){super(t);}},ys=class extends Hn{constructor(t){super(t);}oa(){const t=Ge(this);return null==t?U():t}},_s=class extends Hn{constructor(t){super(t);}},vs=[1,2],Es=Ti(class extends Hn{constructor(t){super(t);}},[0,pi,[0,vs,gi,[0,ni],gi,[0,mi],oi,fi],ri]),ws=class extends Hn{constructor(t){super(t);}},Ts=[0,fi,oi,ti,li,-1],As=class extends Hn{constructor(t){super(t);}},bs=[0,hi,-1],ks=class extends Hn{constructor(t){super(t);}},Ss=[1,2,3,4,5],xs=class extends Hn{constructor(t){super(t);}g(){return null!=Ge(this)}h(){return null!=ln(this,2)}},Ls=class extends Hn{constructor(t){super(t);}g(){return qt(Ce(this,2))??!1}},Rs=[0,mi,fi,[0,oi,ri,-1],[0,si,ri]],Fs=[0,Rs,hi,[0,Ss,gi,Ui,gi,Mi,gi,Fi,gi,Ci,gi,Pi],vi],Is=class extends Hn{constructor(t){super(t);}},Ms=[0,Fs,ti,-1,oi],Ps=wi(502141897,Is);Ni[502141897]=Ms;var Os=Ti(class extends Hn{constructor(t){super(t);}},[0,[0,vi,-1,ei,yi],ds]),Cs=class extends Hn{constructor(t){super(t);}},Us=class extends Hn{constructor(t){super(t);}},Ds=[0,Fs,ti,[0,Fs],hi],Ns=[0,Fs,Ms,Ds,ti,[0,[0,Rs]]],Bs=wi(508968150,Us);Ni[508968150]=Ns,Ni[508968149]=Ds;var Gs=class extends Hn{constructor(t){super(t);}},js=wi(513916220,Gs);Ni[513916220]=[0,Fs,Ns,oi];var Vs=class extends Hn{constructor(t){super(t);}h(){return en(this,ws,2)}g(){De(this,2);}},Xs=[0,Fs,Ts];Ni[478825465]=Xs;var Hs=class extends Hn{constructor(t){super(t);}},Ws=class extends Hn{constructor(t){super(t);}},zs=class extends Hn{constructor(t){super(t);}},Ks=class extends Hn{constructor(t){super(t);}},Ys=class extends Hn{constructor(t){super(t);}},$s=[0,Fs,[0,Fs],Xs,-1],qs=[0,Fs,ti,oi],Js=[0,Fs,ti],Zs=[0,Fs,qs,Js,ti],Qs=wi(479097054,Ys);Ni[479097054]=[0,Fs,Zs,$s],Ni[463370452]=$s,Ni[464864288]=qs;var to=wi(462713202,Ks);Ni[462713202]=Zs,Ni[474472470]=Js;var eo=class extends Hn{constructor(t){super(t);}},no=class extends Hn{constructor(t){super(t);}},ro=class extends Hn{constructor(t){super(t);}},io=class extends Hn{constructor(t){super(t);}},so=[0,Fs,ti,-1,oi],oo=[0,Fs,ti,hi];io.prototype.g=Ai([0,Fs,Js,[0,Fs],Ms,Ds,so,oo]);var ao=class extends Hn{constructor(t){super(t);}},co=wi(456383383,ao);Ni[456383383]=[0,Fs,Ts];var ho=class extends Hn{constructor(t){super(t);}},uo=wi(476348187,ho);Ni[476348187]=[0,Fs,bs];var lo=class extends Hn{constructor(t){super(t);}},fo=class extends Hn{constructor(t){super(t);}},po=[0,vi,-1],go=wi(458105876,class extends Hn{constructor(t){super(t);}g(){var t=this.u;const e=0|t[Z];const n=2&e;return t=function(t,e,n){var r=fo;const i=2&e;let s=!1;if(null==n){if(i)return be();n=[];}else if(n.constructor===ye){if(0==(2&n.L)||i)return n;n=n.X();}else Array.isArray(n)?s=!!(2&(0|n[Z])):n=[];if(i){if(!n.length)return be();s||(s=!0,rt(n));}else s&&(s=!1,n=ze(n));return s||(64&(0|n[Z])?n[Z]&=-33:32&e&&et(n,32)),Ne(t,e,2,r=new ye(n,r,ue,void 0)),r}(t,e,Ue(t,e,2)),!n&&fo&&(t.ra=!0),t}});Ni[458105876]=[0,po,Wr,[!0,ri,[0,fi,-1,li]]];var mo=class extends Hn{constructor(t){super(t);}},yo=wi(458105758,mo);Ni[458105758]=[0,Fs,fi,po];var _o=class extends Hn{constructor(t){super(t);}},vo=wi(443442058,_o);Ni[443442058]=[0,Fs,fi,oi,ti,li,-1,hi,ti],Ni[514774813]=so;var Eo=class extends Hn{constructor(t){super(t);}},wo=wi(516587230,Eo);function To(t,e){return e=e?e.clone():new ws,void 0!==t.displayNamesLocale?De(e,1,ae(t.displayNamesLocale)):void 0===t.displayNamesLocale&&De(e,1),void 0!==t.maxResults?pn(e,2,t.maxResults):"maxResults"in t&&De(e,2),void 0!==t.scoreThreshold?gn(e,3,t.scoreThreshold):"scoreThreshold"in t&&De(e,3),void 0!==t.categoryAllowlist?mn(e,4,t.categoryAllowlist):"categoryAllowlist"in t&&De(e,4),void 0!==t.categoryDenylist?mn(e,5,t.categoryDenylist):"categoryDenylist"in t&&De(e,5),e}function Ao(t,e=-1,n=""){return {categories:t.map((t=>({index:un(t,1)??0??-1,score:dn(t,2)??0,categoryName:ln(t,3)??""??"",displayName:ln(t,4)??""??""}))),headIndex:e,headName:n}}function bo(t){var e=Ve(t,3,$t,je()),n=Ve(t,2,Qt,je()),r=Ve(t,1,ce,je()),i=Ve(t,9,ce,je());const s={categories:[],keypoints:[]};for(let t=0;t<e.length;t++)s.categories.push({score:e[t],index:n[t]??-1,categoryName:r[t]??"",displayName:i[t]??""});if((e=en(t,ss,4)?.h())&&(s.boundingBox={originX:un(e,1)??0,originY:un(e,2)??0,width:un(e,3)??0,height:un(e,4)??0,angle:0}),en(t,ss,4)?.g().length)for(const e of en(t,ss,4).g())s.keypoints.push({x:Be(e,1)??0,y:Be(e,2)??0,score:Be(e,4)??0,label:ln(e,3)??""});return s}function ko(t){const e=[];for(const n of rn(t,hs,1))e.push({x:dn(n,1)??0,y:dn(n,2)??0,z:dn(n,3)??0,visibility:dn(n,4)??0});return e}function So(t){const e=[];for(const n of rn(t,as,1))e.push({x:dn(n,1)??0,y:dn(n,2)??0,z:dn(n,3)??0,visibility:dn(n,4)??0});return e}function xo(t){return Array.from(t,(t=>t>127?t-256:t))}function Lo(t,e){if(t.length!==e.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t.length} vs. ${e.length}).`);let n=0,r=0,i=0;for(let s=0;s<t.length;s++)n+=t[s]*e[s],r+=t[s]*t[s],i+=e[s]*e[s];if(r<=0||i<=0)throw Error("Cannot compute cosine similarity on embedding with 0 norm.");return n/Math.sqrt(r*i)}let Ro;Ni[516587230]=[0,Fs,so,oo,ti],Ni[518928384]=oo;const Fo=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);async function Io(){if(void 0===Ro)try{await WebAssembly.instantiate(Fo),Ro=!0;}catch{Ro=!1;}return Ro}async function Mo(t,e=Ri``){const n=await Io()?"wasm_internal":"wasm_nosimd_internal";return {wasmLoaderPath:`${e}/${t}_${n}.js`,wasmBinaryPath:`${e}/${t}_${n}.wasm`}}var Po=class{};function Oo(){var t=navigator;return "undefined"!=typeof OffscreenCanvas&&(!function(t=navigator){return (t=t.userAgent).includes("Safari")&&!t.includes("Chrome")}(t)||!!((t=t.userAgent.match(/Version\/([\d]+).*Safari/))&&t.length>=1&&Number(t[1])>=17))}async function Co(t){if("function"!=typeof importScripts){const e=document.createElement("script");return e.src=t.toString(),e.crossOrigin="anonymous",new Promise(((t,n)=>{e.addEventListener("load",(()=>{t();}),!1),e.addEventListener("error",(t=>{n(t);}),!1),document.body.appendChild(e);}))}importScripts(t.toString());}function Uo(t){return void 0!==t.videoWidth?[t.videoWidth,t.videoHeight]:void 0!==t.naturalWidth?[t.naturalWidth,t.naturalHeight]:void 0!==t.displayWidth?[t.displayWidth,t.displayHeight]:[t.width,t.height]}function Do(t,e,n){t.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),n(e=t.i.stringToNewUTF8(e)),t.i._free(e);}function No(t,e,n){if(!t.i.canvas)throw Error("No OpenGL canvas configured.");if(n?t.i._bindTextureToStream(n):t.i._bindTextureToCanvas(),!(n=t.i.canvas.getContext("webgl2")||t.i.canvas.getContext("webgl")))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");t.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,e),t.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1);const[r,i]=Uo(e);return !t.l||r===t.i.canvas.width&&i===t.i.canvas.height||(t.i.canvas.width=r,t.i.canvas.height=i),[r,i]}function Bo(t,e,n){t.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");const r=new Uint32Array(e.length);for(let n=0;n<e.length;n++)r[n]=t.i.stringToNewUTF8(e[n]);e=t.i._malloc(4*r.length),t.i.HEAPU32.set(r,e>>2),n(e);for(const e of r)t.i._free(e);t.i._free(e);}function Go(t,e,n){t.i.simpleListeners=t.i.simpleListeners||{},t.i.simpleListeners[e]=n;}function jo(t,e,n){let r=[];t.i.simpleListeners=t.i.simpleListeners||{},t.i.simpleListeners[e]=(t,e,i)=>{e?(n(r,i),r=[]):r.push(t);};}Po.forVisionTasks=function(t){return Mo("vision",t)},Po.forTextTasks=function(t){return Mo("text",t)},Po.forGenAiExperimentalTasks=function(t){return Mo("genai_experimental",t)},Po.forGenAiTasks=function(t){return Mo("genai",t)},Po.forAudioTasks=function(t){return Mo("audio",t)},Po.isSimdSupported=function(){return Io()};async function Vo(t,e,n,r){return t=await(async(t,e,n,r,i)=>{if(e&&await Co(e),!self.ModuleFactory)throw Error("ModuleFactory not set.");if(n&&(await Co(n),!self.ModuleFactory))throw Error("ModuleFactory not set.");return self.Module&&i&&((e=self.Module).locateFile=i.locateFile,i.mainScriptUrlOrBlob&&(e.mainScriptUrlOrBlob=i.mainScriptUrlOrBlob)),i=await self.ModuleFactory(self.Module||i),self.ModuleFactory=self.Module=void 0,new t(i,r)})(t,n.wasmLoaderPath,n.assetLoaderPath,e,{locateFile:t=>t.endsWith(".wasm")?n.wasmBinaryPath.toString():n.assetBinaryPath&&t.endsWith(".data")?n.assetBinaryPath.toString():t}),await t.o(r),t}function Xo(t,e){const n=en(t.baseOptions,xs,1)||new xs;"string"==typeof e?(De(n,2,ae(e)),De(n,1)):e instanceof Uint8Array&&(De(n,1,ft(e,!1)),De(n,2)),sn(t.baseOptions,0,1,n);}function Ho(t){try{const e=t.G.length;if(1===e)throw Error(t.G[0].message);if(e>1)throw Error("Encountered multiple errors: "+t.G.map((t=>t.message)).join(", "))}finally{t.G=[];}}function Wo(t,e){t.B=Math.max(t.B,e);}function zo(t,e){t.A=new Xi,Gi(t.A,"PassThroughCalculator"),ji(t.A,"free_memory"),Vi(t.A,"free_memory_unused_out"),Yi(e,"free_memory"),Ki(e,t.A);}function Ko(t,e){ji(t.A,e),Vi(t.A,e+"_unused_out");}function Yo(t){t.g.addBoolToStream(!0,"free_memory",t.B);}var $o=class{constructor(t){this.g=t,this.G=[],this.B=0,this.g.setAutoRenderToScreen(!1);}l(t,e=!0){if(e){const e=t.baseOptions||{};if(t.baseOptions?.modelAssetBuffer&&t.baseOptions?.modelAssetPath)throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");if(!(en(this.baseOptions,xs,1)?.g()||en(this.baseOptions,xs,1)?.h()||t.baseOptions?.modelAssetBuffer||t.baseOptions?.modelAssetPath))throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");if(function(t,e){let n=en(t.baseOptions,ks,3);if(!n){var r=n=new ks,i=new Oi;on(r,4,Ss,i);}"delegate"in e&&("GPU"===e.delegate?(e=n,r=new Ii,on(e,2,Ss,r)):(e=n,r=new Oi,on(e,4,Ss,r))),sn(t.baseOptions,0,3,n);}(this,e),e.modelAssetPath)return fetch(e.modelAssetPath.toString()).then((t=>{if(t.ok)return t.arrayBuffer();throw Error(`Failed to fetch model: ${e.modelAssetPath} (${t.status})`)})).then((t=>{try{this.g.i.FS_unlink("/model.dat");}catch{}this.g.i.FS_createDataFile("/","model.dat",new Uint8Array(t),!0,!1,!1),Xo(this,"/model.dat"),this.m(),this.I();}));if(e.modelAssetBuffer instanceof Uint8Array)Xo(this,e.modelAssetBuffer);else if(e.modelAssetBuffer)return async function(t){const e=[];for(var n=0;;){const{done:r,value:i}=await t.read();if(r)break;e.push(i),n+=i.length;}if(0===e.length)return new Uint8Array(0);if(1===e.length)return e[0];t=new Uint8Array(n),n=0;for(const r of e)t.set(r,n),n+=r.length;return t}(e.modelAssetBuffer).then((t=>{Xo(this,t),this.m(),this.I();}))}return this.m(),this.I(),Promise.resolve()}I(){}da(){let t;if(this.g.da((e=>{t=Zi(e);})),!t)throw Error("Failed to retrieve CalculatorGraphConfig");return t}setGraph(t,e){this.g.attachErrorListener(((t,e)=>{this.G.push(Error(e));})),this.g.La(),this.g.setGraph(t,e),this.A=void 0,Ho(this);}finishProcessing(){this.g.finishProcessing(),Ho(this);}close(){this.A=void 0,this.g.closeGraph();}};function qo(t,e){if(!t)throw Error(`Unable to obtain required WebGL resource: ${e}`);return t}$o.prototype.close=$o.prototype.close,function(e,n){e=e.split(".");var r,i=t;e[0]in i||void 0===i.execScript||i.execScript("var "+e[0]);for(;e.length&&(r=e.shift());)e.length||void 0===n?i=i[r]&&i[r]!==Object.prototype[r]?i[r]:i[r]={}:i[r]=n;}("TaskRunner",$o);class Jo{constructor(t,e,n,r){this.g=t,this.h=e,this.m=n,this.l=r;}bind(){this.g.bindVertexArray(this.h);}close(){this.g.deleteVertexArray(this.h),this.g.deleteBuffer(this.m),this.g.deleteBuffer(this.l);}}function Zo(t,e,n){const r=t.g;if(n=qo(r.createShader(n),"Failed to create WebGL shader"),r.shaderSource(n,e),r.compileShader(n),!r.getShaderParameter(n,r.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${r.getShaderInfoLog(n)}`);return r.attachShader(t.h,n),n}function Qo(t,e){const n=t.g,r=qo(n.createVertexArray(),"Failed to create vertex array");n.bindVertexArray(r);const i=qo(n.createBuffer(),"Failed to create buffer");n.bindBuffer(n.ARRAY_BUFFER,i),n.enableVertexAttribArray(t.O),n.vertexAttribPointer(t.O,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);const s=qo(n.createBuffer(),"Failed to create buffer");return n.bindBuffer(n.ARRAY_BUFFER,s),n.enableVertexAttribArray(t.I),n.vertexAttribPointer(t.I,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(e?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new Jo(n,r,i,s)}function ta(t,e){if(t.g){if(e!==t.g)throw Error("Cannot change GL context once initialized")}else t.g=e;}function ea(t,e,n,r){return ta(t,e),t.h||(t.m(),t.C()),n?(t.s||(t.s=Qo(t,!0)),n=t.s):(t.v||(t.v=Qo(t,!1)),n=t.v),e.useProgram(t.h),n.bind(),t.l(),t=r(),n.g.bindVertexArray(null),t}function na(t,e,n){return ta(t,e),t=qo(e.createTexture(),"Failed to create texture"),e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n??e.LINEAR),e.bindTexture(e.TEXTURE_2D,null),t}function ra(t,e,n){ta(t,e),t.A||(t.A=qo(e.createFramebuffer(),"Failed to create framebuffe.")),e.bindFramebuffer(e.FRAMEBUFFER,t.A),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);}function ia(t){t.g?.bindFramebuffer(t.g.FRAMEBUFFER,null);}var sa=class{G(){return "\n  precision mediump float;\n  varying vec2 vTex;\n  uniform sampler2D inputTexture;\n  void main() {\n    gl_FragColor = texture2D(inputTexture, vTex);\n  }\n "}m(){const t=this.g;if(this.h=qo(t.createProgram(),"Failed to create WebGL program"),this.aa=Zo(this,"\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }",t.VERTEX_SHADER),this.Z=Zo(this,this.G(),t.FRAGMENT_SHADER),t.linkProgram(this.h),!t.getProgramParameter(this.h,t.LINK_STATUS))throw Error(`Error during program linking: ${t.getProgramInfoLog(this.h)}`);this.O=t.getAttribLocation(this.h,"aVertex"),this.I=t.getAttribLocation(this.h,"aTex");}C(){}l(){}close(){if(this.h){const t=this.g;t.deleteProgram(this.h),t.deleteShader(this.aa),t.deleteShader(this.Z);}this.A&&this.g.deleteFramebuffer(this.A),this.v&&this.v.close(),this.s&&this.s.close();}};var oa=class extends sa{G(){return "\n  precision mediump float;\n  uniform sampler2D backgroundTexture;\n  uniform sampler2D maskTexture;\n  uniform sampler2D colorMappingTexture;\n  varying vec2 vTex;\n  void main() {\n    vec4 backgroundColor = texture2D(backgroundTexture, vTex);\n    float category = texture2D(maskTexture, vTex).r;\n    vec4 categoryColor = texture2D(colorMappingTexture, vec2(category, 0.0));\n    gl_FragColor = mix(backgroundColor, categoryColor, categoryColor.a);\n  }\n "}C(){const t=this.g;t.activeTexture(t.TEXTURE1),this.B=na(this,t,t.LINEAR),t.activeTexture(t.TEXTURE2),this.j=na(this,t,t.NEAREST);}m(){super.m();const t=this.g;this.K=qo(t.getUniformLocation(this.h,"backgroundTexture"),"Uniform location"),this.T=qo(t.getUniformLocation(this.h,"colorMappingTexture"),"Uniform location"),this.J=qo(t.getUniformLocation(this.h,"maskTexture"),"Uniform location");}l(){super.l();const t=this.g;t.uniform1i(this.J,0),t.uniform1i(this.K,1),t.uniform1i(this.T,2);}close(){this.B&&this.g.deleteTexture(this.B),this.j&&this.g.deleteTexture(this.j),super.close();}},aa=class extends sa{G(){return "\n  precision mediump float;\n  uniform sampler2D maskTexture;\n  uniform sampler2D defaultTexture;\n  uniform sampler2D overlayTexture;\n  varying vec2 vTex;\n  void main() {\n    float confidence = texture2D(maskTexture, vTex).r;\n    vec4 defaultColor = texture2D(defaultTexture, vTex);\n    vec4 overlayColor = texture2D(overlayTexture, vTex);\n    // Apply the alpha from the overlay and merge in the default color\n    overlayColor = mix(defaultColor, overlayColor, overlayColor.a);\n    gl_FragColor = mix(defaultColor, overlayColor, confidence);\n  }\n "}C(){const t=this.g;t.activeTexture(t.TEXTURE1),this.j=na(this,t),t.activeTexture(t.TEXTURE2),this.B=na(this,t);}m(){super.m();const t=this.g;this.J=qo(t.getUniformLocation(this.h,"defaultTexture"),"Uniform location"),this.K=qo(t.getUniformLocation(this.h,"overlayTexture"),"Uniform location"),this.H=qo(t.getUniformLocation(this.h,"maskTexture"),"Uniform location");}l(){super.l();const t=this.g;t.uniform1i(this.H,0),t.uniform1i(this.J,1),t.uniform1i(this.K,2);}close(){this.j&&this.g.deleteTexture(this.j),this.B&&this.g.deleteTexture(this.B),super.close();}};function ca(t,e){switch(e){case 0:return t.g.find((t=>t instanceof Uint8Array));case 1:return t.g.find((t=>t instanceof Float32Array));case 2:return t.g.find((t=>"undefined"!=typeof WebGLTexture&&t instanceof WebGLTexture));default:throw Error(`Type is not supported: ${e}`)}}function ha(t){var e=ca(t,1);if(!e){if(e=ca(t,0))e=new Float32Array(e).map((t=>t/255));else {e=new Float32Array(t.width*t.height);const r=la(t);var n=fa(t);if(ra(n,r,ua(t)),"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"document"in self&&"ontouchend"in self.document){n=new Float32Array(t.width*t.height*4),r.readPixels(0,0,t.width,t.height,r.RGBA,r.FLOAT,n);for(let t=0,r=0;t<e.length;++t,r+=4)e[t]=n[r];}else r.readPixels(0,0,t.width,t.height,r.RED,r.FLOAT,e);}t.g.push(e);}return e}function ua(t){let e=ca(t,2);if(!e){const n=la(t);e=pa(t);const r=ha(t),i=da(t);n.texImage2D(n.TEXTURE_2D,0,i,t.width,t.height,0,n.RED,n.FLOAT,r),ga(t);}return e}function la(t){if(!t.canvas)throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");return t.h||(t.h=qo(t.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),t.h}function da(t){if(t=la(t),!ma)if(t.getExtension("EXT_color_buffer_float")&&t.getExtension("OES_texture_float_linear")&&t.getExtension("EXT_float_blend"))ma=t.R32F;else {if(!t.getExtension("EXT_color_buffer_half_float"))throw Error("GPU does not fully support 4-channel float32 or float16 formats");ma=t.R16F;}return ma}function fa(t){return t.l||(t.l=new sa),t.l}function pa(t){const e=la(t);e.viewport(0,0,t.width,t.height),e.activeTexture(e.TEXTURE0);let n=ca(t,2);return n||(n=na(fa(t),e,t.m?e.LINEAR:e.NEAREST),t.g.push(n),t.j=!0),e.bindTexture(e.TEXTURE_2D,n),n}function ga(t){t.h.bindTexture(t.h.TEXTURE_2D,null);}var ma,ya=class{constructor(t,e,n,r,i,s,o){this.g=t,this.m=e,this.j=n,this.canvas=r,this.l=i,this.width=s,this.height=o,this.j&&(0===--_a&&console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources."));}Fa(){return !!ca(this,0)}ja(){return !!ca(this,1)}P(){return !!ca(this,2)}ia(){return (e=ca(t=this,0))||(e=ha(t),e=new Uint8Array(e.map((t=>255*t))),t.g.push(e)),e;var t,e;}ha(){return ha(this)}M(){return ua(this)}clone(){const t=[];for(const e of this.g){let n;if(e instanceof Uint8Array)n=new Uint8Array(e);else if(e instanceof Float32Array)n=new Float32Array(e);else {if(!(e instanceof WebGLTexture))throw Error(`Type is not supported: ${e}`);{const t=la(this),e=fa(this);t.activeTexture(t.TEXTURE1),n=na(e,t,this.m?t.LINEAR:t.NEAREST),t.bindTexture(t.TEXTURE_2D,n);const r=da(this);t.texImage2D(t.TEXTURE_2D,0,r,this.width,this.height,0,t.RED,t.FLOAT,null),t.bindTexture(t.TEXTURE_2D,null),ra(e,t,n),ea(e,t,!1,(()=>{pa(this),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.TRIANGLE_FAN,0,4),ga(this);})),ia(e),ga(this);}}t.push(n);}return new ya(t,this.m,this.P(),this.canvas,this.l,this.width,this.height)}close(){this.j&&la(this).deleteTexture(ca(this,2)),_a=-1;}};ya.prototype.close=ya.prototype.close,ya.prototype.clone=ya.prototype.clone,ya.prototype.getAsWebGLTexture=ya.prototype.M,ya.prototype.getAsFloat32Array=ya.prototype.ha,ya.prototype.getAsUint8Array=ya.prototype.ia,ya.prototype.hasWebGLTexture=ya.prototype.P,ya.prototype.hasFloat32Array=ya.prototype.ja,ya.prototype.hasUint8Array=ya.prototype.Fa;var _a=250;const va={color:"white",lineWidth:4,radius:6};function Ea(t){return {...va,fillColor:(t=t||{}).color,...t}}function wa(t,e){return t instanceof Function?t(e):t}function Ta(t,e,n){return Math.max(Math.min(e,n),Math.min(Math.max(e,n),t))}function Aa(t){if(!t.l)throw Error("CPU rendering requested but CanvasRenderingContext2D not provided.");return t.l}function ba(t){if(!t.j)throw Error("GPU rendering requested but WebGL2RenderingContext not provided.");return t.j}function ka(t,e,n){if(e.P())n(e.M());else {const r=e.ja()?e.ha():e.ia();t.m=t.m??new sa;const i=ba(t);n((t=new ya([r],e.m,!1,i.canvas,t.m,e.width,e.height)).M()),t.close();}}function Sa(t,e,n,r){const i=function(t){return t.g||(t.g=new oa),t.g}(t),s=ba(t),o=Array.isArray(n)?new ImageData(new Uint8ClampedArray(n),1,1):n;ea(i,s,!0,(()=>{!function(t,e,n,r){const i=t.g;if(i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,e),i.activeTexture(i.TEXTURE1),i.bindTexture(i.TEXTURE_2D,t.B),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,n),t.H&&function(t,e){if(t!==e)return !1;t=t.entries(),e=e.entries();for(const[r,i]of t){t=r;const s=i;var n=e.next();if(n.done)return !1;const[o,a]=n.value;if(n=a,t!==o||s[0]!==n[0]||s[1]!==n[1]||s[2]!==n[2]||s[3]!==n[3])return !1}return !!e.next().done}(t.H,r))i.activeTexture(i.TEXTURE2),i.bindTexture(i.TEXTURE_2D,t.j);else {t.H=r;const e=Array(1024).fill(0);r.forEach(((t,n)=>{if(4!==t.length)throw Error(`Color at index ${n} is not a four-channel value.`);e[4*n]=t[0],e[4*n+1]=t[1],e[4*n+2]=t[2],e[4*n+3]=t[3];})),i.activeTexture(i.TEXTURE2),i.bindTexture(i.TEXTURE_2D,t.j),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,256,1,0,i.RGBA,i.UNSIGNED_BYTE,new Uint8Array(e));}}(i,e,o,r),s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT),s.drawArrays(s.TRIANGLE_FAN,0,4);const t=i.g;t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,null);}));}function xa(t,e,n,r){const i=ba(t),s=function(t){return t.h||(t.h=new aa),t.h}(t),o=Array.isArray(n)?new ImageData(new Uint8ClampedArray(n),1,1):n,a=Array.isArray(r)?new ImageData(new Uint8ClampedArray(r),1,1):r;ea(s,i,!0,(()=>{var t=s.g;t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,e),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,s.j),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,o),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,s.B),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,a),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),i.bindTexture(i.TEXTURE_2D,null),(t=s.g).activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,null);}));}var La=class{constructor(t,e){t instanceof CanvasRenderingContext2D||t instanceof OffscreenCanvasRenderingContext2D?(this.l=t,this.j=e):this.j=t;}ya(t,e){if(t){var n=Aa(this);e=Ea(e),n.save();var r=n.canvas,i=0;for(const s of t)n.fillStyle=wa(e.fillColor,{index:i,from:s}),n.strokeStyle=wa(e.color,{index:i,from:s}),n.lineWidth=wa(e.lineWidth,{index:i,from:s}),(t=new Path2D).arc(s.x*r.width,s.y*r.height,wa(e.radius,{index:i,from:s}),0,2*Math.PI),n.fill(t),n.stroke(t),++i;n.restore();}}xa(t,e,n){if(t&&e){var r=Aa(this);n=Ea(n),r.save();var i=r.canvas,s=0;for(const o of e){r.beginPath(),e=t[o.start];const a=t[o.end];e&&a&&(r.strokeStyle=wa(n.color,{index:s,from:e,to:a}),r.lineWidth=wa(n.lineWidth,{index:s,from:e,to:a}),r.moveTo(e.x*i.width,e.y*i.height),r.lineTo(a.x*i.width,a.y*i.height)),++s,r.stroke();}r.restore();}}ua(t,e){const n=Aa(this);e=Ea(e),n.save(),n.beginPath(),n.lineWidth=wa(e.lineWidth,{}),n.strokeStyle=wa(e.color,{}),n.fillStyle=wa(e.fillColor,{}),n.moveTo(t.originX,t.originY),n.lineTo(t.originX+t.width,t.originY),n.lineTo(t.originX+t.width,t.originY+t.height),n.lineTo(t.originX,t.originY+t.height),n.lineTo(t.originX,t.originY),n.stroke(),n.fill(),n.restore();}va(t,e,n=[0,0,0,255]){this.l?function(t,e,n,r){const i=ba(t);ka(t,e,(e=>{Sa(t,e,n,r),(e=Aa(t)).drawImage(i.canvas,0,0,e.canvas.width,e.canvas.height);}));}(this,t,n,e):Sa(this,t.M(),n,e);}wa(t,e,n){this.l?function(t,e,n,r){const i=ba(t);ka(t,e,(e=>{xa(t,e,n,r),(e=Aa(t)).drawImage(i.canvas,0,0,e.canvas.width,e.canvas.height);}));}(this,t,e,n):xa(this,t.M(),e,n);}close(){this.g?.close(),this.g=void 0,this.h?.close(),this.h=void 0,this.m?.close(),this.m=void 0;}};function Ra(t,e){switch(e){case 0:return t.g.find((t=>t instanceof ImageData));case 1:return t.g.find((t=>"undefined"!=typeof ImageBitmap&&t instanceof ImageBitmap));case 2:return t.g.find((t=>"undefined"!=typeof WebGLTexture&&t instanceof WebGLTexture));default:throw Error(`Type is not supported: ${e}`)}}function Fa(t){var e=Ra(t,0);if(!e){e=Ma(t);const n=Pa(t),r=new Uint8Array(t.width*t.height*4);ra(n,e,Ia(t)),e.readPixels(0,0,t.width,t.height,e.RGBA,e.UNSIGNED_BYTE,r),ia(n),e=new ImageData(new Uint8ClampedArray(r.buffer),t.width,t.height),t.g.push(e);}return e}function Ia(t){let e=Ra(t,2);if(!e){const n=Ma(t);e=Oa(t);const r=Ra(t,1)||Fa(t);n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,r),Ca(t);}return e}function Ma(t){if(!t.canvas)throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");return t.h||(t.h=qo(t.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),t.h}function Pa(t){return t.l||(t.l=new sa),t.l}function Oa(t){const e=Ma(t);e.viewport(0,0,t.width,t.height),e.activeTexture(e.TEXTURE0);let n=Ra(t,2);return n||(n=na(Pa(t),e),t.g.push(n),t.m=!0),e.bindTexture(e.TEXTURE_2D,n),n}function Ca(t){t.h.bindTexture(t.h.TEXTURE_2D,null);}function Ua(t){const e=Ma(t);return ea(Pa(t),e,!0,(()=>function(t,e){const n=t.canvas;if(n.width===t.width&&n.height===t.height)return e();const r=n.width,i=n.height;return n.width=t.width,n.height=t.height,t=e(),n.width=r,n.height=i,t}(t,(()=>{if(e.bindFramebuffer(e.FRAMEBUFFER,null),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLE_FAN,0,4),!(t.canvas instanceof OffscreenCanvas))throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");return t.canvas.transferToImageBitmap()}))))}La.prototype.close=La.prototype.close,La.prototype.drawConfidenceMask=La.prototype.wa,La.prototype.drawCategoryMask=La.prototype.va,La.prototype.drawBoundingBox=La.prototype.ua,La.prototype.drawConnectors=La.prototype.xa,La.prototype.drawLandmarks=La.prototype.ya,La.lerp=function(t,e,n,r,i){return Ta(r*(1-(t-e)/(n-e))+i*(1-(n-t)/(n-e)),r,i)},La.clamp=Ta;var Da=class{constructor(t,e,n,r,i,s,o){this.g=t,this.j=e,this.m=n,this.canvas=r,this.l=i,this.width=s,this.height=o,(this.j||this.m)&&(0===--Na&&console.error("You seem to be creating MPImage instances without invoking .close(). This leaks resources."));}Ea(){return !!Ra(this,0)}ka(){return !!Ra(this,1)}P(){return !!Ra(this,2)}Ca(){return Fa(this)}Ba(){var t=Ra(this,1);return t||(Ia(this),Oa(this),t=Ua(this),Ca(this),this.g.push(t),this.j=!0),t}M(){return Ia(this)}clone(){const t=[];for(const e of this.g){let n;if(e instanceof ImageData)n=new ImageData(e.data,this.width,this.height);else if(e instanceof WebGLTexture){const t=Ma(this),e=Pa(this);t.activeTexture(t.TEXTURE1),n=na(e,t),t.bindTexture(t.TEXTURE_2D,n),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,this.width,this.height,0,t.RGBA,t.UNSIGNED_BYTE,null),t.bindTexture(t.TEXTURE_2D,null),ra(e,t,n),ea(e,t,!1,(()=>{Oa(this),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.TRIANGLE_FAN,0,4),Ca(this);})),ia(e),Ca(this);}else {if(!(e instanceof ImageBitmap))throw Error(`Type is not supported: ${e}`);Ia(this),Oa(this),n=Ua(this),Ca(this);}t.push(n);}return new Da(t,this.ka(),this.P(),this.canvas,this.l,this.width,this.height)}close(){this.j&&Ra(this,1).close(),this.m&&Ma(this).deleteTexture(Ra(this,2)),Na=-1;}};Da.prototype.close=Da.prototype.close,Da.prototype.clone=Da.prototype.clone,Da.prototype.getAsWebGLTexture=Da.prototype.M,Da.prototype.getAsImageBitmap=Da.prototype.Ba,Da.prototype.getAsImageData=Da.prototype.Ca,Da.prototype.hasWebGLTexture=Da.prototype.P,Da.prototype.hasImageBitmap=Da.prototype.ka,Da.prototype.hasImageData=Da.prototype.Ea;var Na=250;function Ba(...t){return t.map((([t,e])=>({start:t,end:e})))}const Ga=function(t){return class extends t{La(){this.i._registerModelResourcesGraphService();}}}((ja=class{constructor(t,e){this.l=!0,this.i=t,this.g=null,this.h=0,this.m="function"==typeof this.i._addIntToInputStream,void 0!==e?this.i.canvas=e:Oo()?this.i.canvas=new OffscreenCanvas(1,1):(console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),this.i.canvas=document.createElement("canvas"));}async initializeGraph(t){const e=await(await fetch(t)).arrayBuffer();t=!(t.endsWith(".pbtxt")||t.endsWith(".textproto")),this.setGraph(new Uint8Array(e),t);}setGraphFromString(t){this.setGraph((new TextEncoder).encode(t),!1);}setGraph(t,e){const n=t.length,r=this.i._malloc(n);this.i.HEAPU8.set(t,r),e?this.i._changeBinaryGraph(n,r):this.i._changeTextGraph(n,r),this.i._free(r);}configureAudio(t,e,n,r,i){this.i._configureAudio||console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),Do(this,r||"input_audio",(r=>{Do(this,i=i||"audio_header",(i=>{this.i._configureAudio(r,i,t,e??0,n);}));}));}setAutoResizeCanvas(t){this.l=t;}setAutoRenderToScreen(t){this.i._setAutoRenderToScreen(t);}setGpuBufferVerticalFlip(t){this.i.gpuOriginForWebTexturesIsBottomLeft=t;}da(t){Go(this,"__graph_config__",(e=>{t(e);})),Do(this,"__graph_config__",(t=>{this.i._getGraphConfig(t,void 0);})),delete this.i.simpleListeners.__graph_config__;}attachErrorListener(t){this.i.errorListener=t;}attachEmptyPacketListener(t,e){this.i.emptyPacketListeners=this.i.emptyPacketListeners||{},this.i.emptyPacketListeners[t]=e;}addAudioToStream(t,e,n){this.addAudioToStreamWithShape(t,0,0,e,n);}addAudioToStreamWithShape(t,e,n,r,i){const s=4*t.length;this.h!==s&&(this.g&&this.i._free(this.g),this.g=this.i._malloc(s),this.h=s),this.i.HEAPF32.set(t,this.g/4),Do(this,r,(t=>{this.i._addAudioToInputStream(this.g,e,n,t,i);}));}addGpuBufferToStream(t,e,n){Do(this,e,(e=>{const[r,i]=No(this,t,e);this.i._addBoundTextureToStream(e,r,i,n);}));}addBoolToStream(t,e,n){Do(this,e,(e=>{this.i._addBoolToInputStream(t,e,n);}));}addDoubleToStream(t,e,n){Do(this,e,(e=>{this.i._addDoubleToInputStream(t,e,n);}));}addFloatToStream(t,e,n){Do(this,e,(e=>{this.i._addFloatToInputStream(t,e,n);}));}addIntToStream(t,e,n){Do(this,e,(e=>{this.i._addIntToInputStream(t,e,n);}));}addUintToStream(t,e,n){Do(this,e,(e=>{this.i._addUintToInputStream(t,e,n);}));}addStringToStream(t,e,n){Do(this,e,(e=>{Do(this,t,(t=>{this.i._addStringToInputStream(t,e,n);}));}));}addStringRecordToStream(t,e,n){Do(this,e,(e=>{Bo(this,Object.keys(t),(r=>{Bo(this,Object.values(t),(i=>{this.i._addFlatHashMapToInputStream(r,i,Object.keys(t).length,e,n);}));}));}));}addProtoToStream(t,e,n,r){Do(this,n,(n=>{Do(this,e,(e=>{const i=this.i._malloc(t.length);this.i.HEAPU8.set(t,i),this.i._addProtoToInputStream(i,t.length,e,n,r),this.i._free(i);}));}));}addEmptyPacketToStream(t,e){Do(this,t,(t=>{this.i._addEmptyPacketToInputStream(t,e);}));}addBoolVectorToStream(t,e,n){Do(this,e,(e=>{const r=this.i._allocateBoolVector(t.length);if(!r)throw Error("Unable to allocate new bool vector on heap.");for(const e of t)this.i._addBoolVectorEntry(r,e);this.i._addBoolVectorToInputStream(r,e,n);}));}addDoubleVectorToStream(t,e,n){Do(this,e,(e=>{const r=this.i._allocateDoubleVector(t.length);if(!r)throw Error("Unable to allocate new double vector on heap.");for(const e of t)this.i._addDoubleVectorEntry(r,e);this.i._addDoubleVectorToInputStream(r,e,n);}));}addFloatVectorToStream(t,e,n){Do(this,e,(e=>{const r=this.i._allocateFloatVector(t.length);if(!r)throw Error("Unable to allocate new float vector on heap.");for(const e of t)this.i._addFloatVectorEntry(r,e);this.i._addFloatVectorToInputStream(r,e,n);}));}addIntVectorToStream(t,e,n){Do(this,e,(e=>{const r=this.i._allocateIntVector(t.length);if(!r)throw Error("Unable to allocate new int vector on heap.");for(const e of t)this.i._addIntVectorEntry(r,e);this.i._addIntVectorToInputStream(r,e,n);}));}addUintVectorToStream(t,e,n){Do(this,e,(e=>{const r=this.i._allocateUintVector(t.length);if(!r)throw Error("Unable to allocate new unsigned int vector on heap.");for(const e of t)this.i._addUintVectorEntry(r,e);this.i._addUintVectorToInputStream(r,e,n);}));}addStringVectorToStream(t,e,n){Do(this,e,(e=>{const r=this.i._allocateStringVector(t.length);if(!r)throw Error("Unable to allocate new string vector on heap.");for(const e of t)Do(this,e,(t=>{this.i._addStringVectorEntry(r,t);}));this.i._addStringVectorToInputStream(r,e,n);}));}addBoolToInputSidePacket(t,e){Do(this,e,(e=>{this.i._addBoolToInputSidePacket(t,e);}));}addDoubleToInputSidePacket(t,e){Do(this,e,(e=>{this.i._addDoubleToInputSidePacket(t,e);}));}addFloatToInputSidePacket(t,e){Do(this,e,(e=>{this.i._addFloatToInputSidePacket(t,e);}));}addIntToInputSidePacket(t,e){Do(this,e,(e=>{this.i._addIntToInputSidePacket(t,e);}));}addUintToInputSidePacket(t,e){Do(this,e,(e=>{this.i._addUintToInputSidePacket(t,e);}));}addStringToInputSidePacket(t,e){Do(this,e,(e=>{Do(this,t,(t=>{this.i._addStringToInputSidePacket(t,e);}));}));}addProtoToInputSidePacket(t,e,n){Do(this,n,(n=>{Do(this,e,(e=>{const r=this.i._malloc(t.length);this.i.HEAPU8.set(t,r),this.i._addProtoToInputSidePacket(r,t.length,e,n),this.i._free(r);}));}));}addBoolVectorToInputSidePacket(t,e){Do(this,e,(e=>{const n=this.i._allocateBoolVector(t.length);if(!n)throw Error("Unable to allocate new bool vector on heap.");for(const e of t)this.i._addBoolVectorEntry(n,e);this.i._addBoolVectorToInputSidePacket(n,e);}));}addDoubleVectorToInputSidePacket(t,e){Do(this,e,(e=>{const n=this.i._allocateDoubleVector(t.length);if(!n)throw Error("Unable to allocate new double vector on heap.");for(const e of t)this.i._addDoubleVectorEntry(n,e);this.i._addDoubleVectorToInputSidePacket(n,e);}));}addFloatVectorToInputSidePacket(t,e){Do(this,e,(e=>{const n=this.i._allocateFloatVector(t.length);if(!n)throw Error("Unable to allocate new float vector on heap.");for(const e of t)this.i._addFloatVectorEntry(n,e);this.i._addFloatVectorToInputSidePacket(n,e);}));}addIntVectorToInputSidePacket(t,e){Do(this,e,(e=>{const n=this.i._allocateIntVector(t.length);if(!n)throw Error("Unable to allocate new int vector on heap.");for(const e of t)this.i._addIntVectorEntry(n,e);this.i._addIntVectorToInputSidePacket(n,e);}));}addUintVectorToInputSidePacket(t,e){Do(this,e,(e=>{const n=this.i._allocateUintVector(t.length);if(!n)throw Error("Unable to allocate new unsigned int vector on heap.");for(const e of t)this.i._addUintVectorEntry(n,e);this.i._addUintVectorToInputSidePacket(n,e);}));}addStringVectorToInputSidePacket(t,e){Do(this,e,(e=>{const n=this.i._allocateStringVector(t.length);if(!n)throw Error("Unable to allocate new string vector on heap.");for(const e of t)Do(this,e,(t=>{this.i._addStringVectorEntry(n,t);}));this.i._addStringVectorToInputSidePacket(n,e);}));}attachBoolListener(t,e){Go(this,t,e),Do(this,t,(t=>{this.i._attachBoolListener(t);}));}attachBoolVectorListener(t,e){jo(this,t,e),Do(this,t,(t=>{this.i._attachBoolVectorListener(t);}));}attachIntListener(t,e){Go(this,t,e),Do(this,t,(t=>{this.i._attachIntListener(t);}));}attachIntVectorListener(t,e){jo(this,t,e),Do(this,t,(t=>{this.i._attachIntVectorListener(t);}));}attachUintListener(t,e){Go(this,t,e),Do(this,t,(t=>{this.i._attachUintListener(t);}));}attachUintVectorListener(t,e){jo(this,t,e),Do(this,t,(t=>{this.i._attachUintVectorListener(t);}));}attachDoubleListener(t,e){Go(this,t,e),Do(this,t,(t=>{this.i._attachDoubleListener(t);}));}attachDoubleVectorListener(t,e){jo(this,t,e),Do(this,t,(t=>{this.i._attachDoubleVectorListener(t);}));}attachFloatListener(t,e){Go(this,t,e),Do(this,t,(t=>{this.i._attachFloatListener(t);}));}attachFloatVectorListener(t,e){jo(this,t,e),Do(this,t,(t=>{this.i._attachFloatVectorListener(t);}));}attachStringListener(t,e){Go(this,t,e),Do(this,t,(t=>{this.i._attachStringListener(t);}));}attachStringVectorListener(t,e){jo(this,t,e),Do(this,t,(t=>{this.i._attachStringVectorListener(t);}));}attachProtoListener(t,e,n){Go(this,t,e),Do(this,t,(t=>{this.i._attachProtoListener(t,n||!1);}));}attachProtoVectorListener(t,e,n){jo(this,t,e),Do(this,t,(t=>{this.i._attachProtoVectorListener(t,n||!1);}));}attachAudioListener(t,e,n){this.i._attachAudioListener||console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),Go(this,t,((t,n)=>{t=new Float32Array(t.buffer,t.byteOffset,t.length/4),e(t,n);})),Do(this,t,(t=>{this.i._attachAudioListener(t,n||!1);}));}finishProcessing(){this.i._waitUntilIdle();}closeGraph(){this.i._closeGraph(),this.i.simpleListeners=void 0,this.i.emptyPacketListeners=void 0;}},class extends ja{get ea(){return this.i}qa(t,e,n){Do(this,e,(e=>{const[r,i]=No(this,t,e);this.ea._addBoundTextureAsImageToStream(e,r,i,n);}));}U(t,e){Go(this,t,e),Do(this,t,(t=>{this.ea._attachImageListener(t);}));}ca(t,e){jo(this,t,e),Do(this,t,(t=>{this.ea._attachImageVectorListener(t);}));}}));var ja,Va=class extends Ga{};async function Xa(t,e,n){return async function(t,e,n,r){return Vo(t,e,n,r)}(t,n.canvas??(Oo()?void 0:document.createElement("canvas")),e,n)}function Ha(t,e,n,r){if(t.T){const s=new fs;if(n?.regionOfInterest){if(!t.pa)throw Error("This task doesn't support region-of-interest.");var i=n.regionOfInterest;if(i.left>=i.right||i.top>=i.bottom)throw Error("Expected RectF with left < right and top < bottom.");if(i.left<0||i.top<0||i.right>1||i.bottom>1)throw Error("Expected RectF values to be in [0,1].");gn(s,1,(i.left+i.right)/2),gn(s,2,(i.top+i.bottom)/2),gn(s,4,i.right-i.left),gn(s,3,i.bottom-i.top);}else gn(s,1,.5),gn(s,2,.5),gn(s,4,1),gn(s,3,1);if(n?.rotationDegrees){if(n?.rotationDegrees%90!=0)throw Error("Expected rotation to be a multiple of 90°.");if(gn(s,5,-Math.PI*n.rotationDegrees/180),n?.rotationDegrees%180!=0){const[t,r]=Uo(e);n=dn(s,3)*r/t,i=dn(s,4)*t/r,gn(s,4,n),gn(s,3,i);}}t.g.addProtoToStream(s.g(),"mediapipe.NormalizedRect",t.T,r);}t.g.qa(e,t.aa,r??performance.now()),t.finishProcessing();}function Wa(t,e,n){if(t.baseOptions?.g())throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");Ha(t,e,n,t.B+1);}function za(t,e,n,r){if(!t.baseOptions?.g())throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");Ha(t,e,n,r);}function Ka(t,e,n,r){var i=e.data;const s=e.width,o=s*(e=e.height);if((i instanceof Uint8Array||i instanceof Float32Array)&&i.length!==o)throw Error("Unsupported channel count: "+i.length/o);return t=new ya([i],n,!1,t.g.i.canvas,t.O,s,e),r?t.clone():t}var Ya=class extends $o{constructor(t,e,n,r){super(t),this.g=t,this.aa=e,this.T=n,this.pa=r,this.O=new sa;}l(t,e=!0){if("runningMode"in t&&fn(this.baseOptions,2,!!t.runningMode&&"IMAGE"!==t.runningMode),void 0!==t.canvas&&this.g.i.canvas!==t.canvas)throw Error("You must create a new task to reset the canvas.");return super.l(t,e)}close(){this.O.close(),super.close();}};Ya.prototype.close=Ya.prototype.close;var $a=class extends Ya{constructor(t,e){super(new Va(t,e),"image_in","norm_rect_in",!1),this.j={detections:[]},sn(t=this.h=new Is,0,1,e=new Ls),gn(this.h,2,.5),gn(this.h,3,.3);}get baseOptions(){return en(this.h,Ls,1)}set baseOptions(t){sn(this.h,0,1,t);}o(t){return "minDetectionConfidence"in t&&gn(this.h,2,t.minDetectionConfidence??.5),"minSuppressionThreshold"in t&&gn(this.h,3,t.minSuppressionThreshold??.3),this.l(t)}D(t,e){return this.j={detections:[]},Wa(this,t,e),this.j}F(t,e,n){return this.j={detections:[]},za(this,t,n,e),this.j}m(){var t=new qi;Yi(t,"image_in"),Yi(t,"norm_rect_in"),$i(t,"detections");const e=new Di;Xn(e,Ps,this.h);const n=new Xi;Gi(n,"mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),ji(n,"IMAGE:image_in"),ji(n,"NORM_RECT:norm_rect_in"),Vi(n,"DETECTIONS:detections"),n.o(e),Ki(t,n),this.g.attachProtoVectorListener("detections",((t,e)=>{for(const e of t)t=os(e),this.j.detections.push(bo(t));Wo(this,e);})),this.g.attachEmptyPacketListener("detections",(t=>{Wo(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),!0);}};$a.prototype.detectForVideo=$a.prototype.F,$a.prototype.detect=$a.prototype.D,$a.prototype.setOptions=$a.prototype.o,$a.createFromModelPath=async function(t,e){return Xa($a,t,{baseOptions:{modelAssetPath:e}})},$a.createFromModelBuffer=function(t,e){return Xa($a,t,{baseOptions:{modelAssetBuffer:e}})},$a.createFromOptions=function(t,e){return Xa($a,t,e)};var qa=Ba([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),Ja=Ba([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),Za=Ba([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),Qa=Ba([474,475],[475,476],[476,477],[477,474]),tc=Ba([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),ec=Ba([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),nc=Ba([469,470],[470,471],[471,472],[472,469]),rc=Ba([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),ic=[...qa,...Ja,...Za,...tc,...ec,...rc],sc=Ba([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function oc(t){t.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]};}var ac=class extends Ya{constructor(t,e){super(new Va(t,e),"image_in","norm_rect",!1),this.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=!1,sn(t=this.h=new Us,0,1,e=new Ls),this.v=new Cs,sn(this.h,0,3,this.v),this.s=new Is,sn(this.h,0,2,this.s),pn(this.s,4,1),gn(this.s,2,.5),gn(this.v,2,.5),gn(this.h,4,.5);}get baseOptions(){return en(this.h,Ls,1)}set baseOptions(t){sn(this.h,0,1,t);}o(t){return "numFaces"in t&&pn(this.s,4,t.numFaces??1),"minFaceDetectionConfidence"in t&&gn(this.s,2,t.minFaceDetectionConfidence??.5),"minTrackingConfidence"in t&&gn(this.h,4,t.minTrackingConfidence??.5),"minFacePresenceConfidence"in t&&gn(this.v,2,t.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in t&&(this.outputFaceBlendshapes=!!t.outputFaceBlendshapes),"outputFacialTransformationMatrixes"in t&&(this.outputFacialTransformationMatrixes=!!t.outputFacialTransformationMatrixes),this.l(t)}D(t,e){return oc(this),Wa(this,t,e),this.j}F(t,e,n){return oc(this),za(this,t,n,e),this.j}m(){var t=new qi;Yi(t,"image_in"),Yi(t,"norm_rect"),$i(t,"face_landmarks");const e=new Di;Xn(e,Bs,this.h);const n=new Xi;Gi(n,"mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),ji(n,"IMAGE:image_in"),ji(n,"NORM_RECT:norm_rect"),Vi(n,"NORM_LANDMARKS:face_landmarks"),n.o(e),Ki(t,n),this.g.attachProtoVectorListener("face_landmarks",((t,e)=>{for(const e of t)t=us(e),this.j.faceLandmarks.push(ko(t));Wo(this,e);})),this.g.attachEmptyPacketListener("face_landmarks",(t=>{Wo(this,t);})),this.outputFaceBlendshapes&&($i(t,"blendshapes"),Vi(n,"BLENDSHAPES:blendshapes"),this.g.attachProtoVectorListener("blendshapes",((t,e)=>{if(this.outputFaceBlendshapes)for(const e of t)t=ns(e),this.j.faceBlendshapes.push(Ao(t.g()??[]));Wo(this,e);})),this.g.attachEmptyPacketListener("blendshapes",(t=>{Wo(this,t);}))),this.outputFacialTransformationMatrixes&&($i(t,"face_geometry"),Vi(n,"FACE_GEOMETRY:face_geometry"),this.g.attachProtoVectorListener("face_geometry",((t,e)=>{if(this.outputFacialTransformationMatrixes)for(const e of t)(t=en(Os(e),ls,2))&&this.j.facialTransformationMatrixes.push({rows:un(t,1)??0??0,columns:un(t,2)??0??0,data:Ve(t,3,$t,je()).slice()??[]});Wo(this,e);})),this.g.attachEmptyPacketListener("face_geometry",(t=>{Wo(this,t);}))),t=t.g(),this.setGraph(new Uint8Array(t),!0);}};ac.prototype.detectForVideo=ac.prototype.F,ac.prototype.detect=ac.prototype.D,ac.prototype.setOptions=ac.prototype.o,ac.createFromModelPath=function(t,e){return Xa(ac,t,{baseOptions:{modelAssetPath:e}})},ac.createFromModelBuffer=function(t,e){return Xa(ac,t,{baseOptions:{modelAssetBuffer:e}})},ac.createFromOptions=function(t,e){return Xa(ac,t,e)},ac.FACE_LANDMARKS_LIPS=qa,ac.FACE_LANDMARKS_LEFT_EYE=Ja,ac.FACE_LANDMARKS_LEFT_EYEBROW=Za,ac.FACE_LANDMARKS_LEFT_IRIS=Qa,ac.FACE_LANDMARKS_RIGHT_EYE=tc,ac.FACE_LANDMARKS_RIGHT_EYEBROW=ec,ac.FACE_LANDMARKS_RIGHT_IRIS=nc,ac.FACE_LANDMARKS_FACE_OVAL=rc,ac.FACE_LANDMARKS_CONTOURS=ic,ac.FACE_LANDMARKS_TESSELATION=sc;var cc=class extends Ya{constructor(t,e){super(new Va(t,e),"image_in","norm_rect",!0),sn(t=this.j=new Gs,0,1,e=new Ls);}get baseOptions(){return en(this.j,Ls,1)}set baseOptions(t){sn(this.j,0,1,t);}o(t){return super.l(t)}Oa(t,e,n){const r="function"!=typeof e?e:{};if(this.h="function"==typeof e?e:n,Wa(this,t,r??{}),!this.h)return this.s}m(){var t=new qi;Yi(t,"image_in"),Yi(t,"norm_rect"),$i(t,"stylized_image");const e=new Di;Xn(e,js,this.j);const n=new Xi;Gi(n,"mediapipe.tasks.vision.face_stylizer.FaceStylizerGraph"),ji(n,"IMAGE:image_in"),ji(n,"NORM_RECT:norm_rect"),Vi(n,"STYLIZED_IMAGE:stylized_image"),n.o(e),Ki(t,n),this.g.U("stylized_image",((t,e)=>{var n=!this.h,r=t.data,i=t.width;const s=i*(t=t.height);if(r instanceof Uint8Array)if(r.length===3*s){const e=new Uint8ClampedArray(4*s);for(let t=0;t<s;++t)e[4*t]=r[3*t],e[4*t+1]=r[3*t+1],e[4*t+2]=r[3*t+2],e[4*t+3]=255;r=new ImageData(e,i,t);}else {if(r.length!==4*s)throw Error("Unsupported channel count: "+r.length/s);r=new ImageData(new Uint8ClampedArray(r.buffer,r.byteOffset,r.length),i,t);}else if(!(r instanceof WebGLTexture))throw Error(`Unsupported format: ${r.constructor.name}`);i=new Da([r],!1,!1,this.g.i.canvas,this.O,i,t),this.s=n=n?i.clone():i,this.h&&this.h(n),Wo(this,e);})),this.g.attachEmptyPacketListener("stylized_image",(t=>{this.s=null,this.h&&this.h(null),Wo(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),!0);}};cc.prototype.stylize=cc.prototype.Oa,cc.prototype.setOptions=cc.prototype.o,cc.createFromModelPath=function(t,e){return Xa(cc,t,{baseOptions:{modelAssetPath:e}})},cc.createFromModelBuffer=function(t,e){return Xa(cc,t,{baseOptions:{modelAssetBuffer:e}})},cc.createFromOptions=function(t,e){return Xa(cc,t,e)};var hc=Ba([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function uc(t){t.gestures=[],t.landmarks=[],t.worldLandmarks=[],t.handedness=[];}function lc(t){return 0===t.gestures.length?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:t.gestures,landmarks:t.landmarks,worldLandmarks:t.worldLandmarks,handedness:t.handedness,handednesses:t.handedness}}function dc(t,e=!0){const n=[];for(const i of t){var r=ns(i);t=[];for(const n of r.g())r=e&&null!=un(n,1)?un(n,1)??0:-1,t.push({score:dn(n,2)??0,index:r,categoryName:ln(n,3)??""??"",displayName:ln(n,4)??""??""});n.push(t);}return n}var fc=class extends Ya{constructor(t,e){super(new Va(t,e),"image_in","norm_rect",!1),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],sn(t=this.j=new Ys,0,1,e=new Ls),this.s=new Ks,sn(this.j,0,2,this.s),this.C=new zs,sn(this.s,0,3,this.C),this.v=new Ws,sn(this.s,0,2,this.v),this.h=new Hs,sn(this.j,0,3,this.h),gn(this.v,2,.5),gn(this.s,4,.5),gn(this.C,2,.5);}get baseOptions(){return en(this.j,Ls,1)}set baseOptions(t){sn(this.j,0,1,t);}o(t){if(pn(this.v,3,t.numHands??1),"minHandDetectionConfidence"in t&&gn(this.v,2,t.minHandDetectionConfidence??.5),"minTrackingConfidence"in t&&gn(this.s,4,t.minTrackingConfidence??.5),"minHandPresenceConfidence"in t&&gn(this.C,2,t.minHandPresenceConfidence??.5),t.cannedGesturesClassifierOptions){var e=new Vs,n=e,r=To(t.cannedGesturesClassifierOptions,en(this.h,Vs,3)?.h());sn(n,0,2,r),sn(this.h,0,3,e);}else void 0===t.cannedGesturesClassifierOptions&&en(this.h,Vs,3)?.g();return t.customGesturesClassifierOptions?(sn(n=e=new Vs,0,2,r=To(t.customGesturesClassifierOptions,en(this.h,Vs,4)?.h())),sn(this.h,0,4,e)):void 0===t.customGesturesClassifierOptions&&en(this.h,Vs,4)?.g(),this.l(t)}Ja(t,e){return uc(this),Wa(this,t,e),lc(this)}Ka(t,e,n){return uc(this),za(this,t,n,e),lc(this)}m(){var t=new qi;Yi(t,"image_in"),Yi(t,"norm_rect"),$i(t,"hand_gestures"),$i(t,"hand_landmarks"),$i(t,"world_hand_landmarks"),$i(t,"handedness");const e=new Di;Xn(e,Qs,this.j);const n=new Xi;Gi(n,"mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),ji(n,"IMAGE:image_in"),ji(n,"NORM_RECT:norm_rect"),Vi(n,"HAND_GESTURES:hand_gestures"),Vi(n,"LANDMARKS:hand_landmarks"),Vi(n,"WORLD_LANDMARKS:world_hand_landmarks"),Vi(n,"HANDEDNESS:handedness"),n.o(e),Ki(t,n),this.g.attachProtoVectorListener("hand_landmarks",((t,e)=>{for(const e of t){t=us(e);const n=[];for(const e of rn(t,hs,1))n.push({x:dn(e,1)??0,y:dn(e,2)??0,z:dn(e,3)??0,visibility:dn(e,4)??0});this.landmarks.push(n);}Wo(this,e);})),this.g.attachEmptyPacketListener("hand_landmarks",(t=>{Wo(this,t);})),this.g.attachProtoVectorListener("world_hand_landmarks",((t,e)=>{for(const e of t){t=cs(e);const n=[];for(const e of rn(t,as,1))n.push({x:dn(e,1)??0,y:dn(e,2)??0,z:dn(e,3)??0,visibility:dn(e,4)??0});this.worldLandmarks.push(n);}Wo(this,e);})),this.g.attachEmptyPacketListener("world_hand_landmarks",(t=>{Wo(this,t);})),this.g.attachProtoVectorListener("hand_gestures",((t,e)=>{this.gestures.push(...dc(t,!1)),Wo(this,e);})),this.g.attachEmptyPacketListener("hand_gestures",(t=>{Wo(this,t);})),this.g.attachProtoVectorListener("handedness",((t,e)=>{this.handedness.push(...dc(t)),Wo(this,e);})),this.g.attachEmptyPacketListener("handedness",(t=>{Wo(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),!0);}};function pc(t){return {landmarks:t.landmarks,worldLandmarks:t.worldLandmarks,handednesses:t.handedness,handedness:t.handedness}}fc.prototype.recognizeForVideo=fc.prototype.Ka,fc.prototype.recognize=fc.prototype.Ja,fc.prototype.setOptions=fc.prototype.o,fc.createFromModelPath=function(t,e){return Xa(fc,t,{baseOptions:{modelAssetPath:e}})},fc.createFromModelBuffer=function(t,e){return Xa(fc,t,{baseOptions:{modelAssetBuffer:e}})},fc.createFromOptions=function(t,e){return Xa(fc,t,e)},fc.HAND_CONNECTIONS=hc;var gc=class extends Ya{constructor(t,e){super(new Va(t,e),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],sn(t=this.h=new Ks,0,1,e=new Ls),this.s=new zs,sn(this.h,0,3,this.s),this.j=new Ws,sn(this.h,0,2,this.j),pn(this.j,3,1),gn(this.j,2,.5),gn(this.s,2,.5),gn(this.h,4,.5);}get baseOptions(){return en(this.h,Ls,1)}set baseOptions(t){sn(this.h,0,1,t);}o(t){return "numHands"in t&&pn(this.j,3,t.numHands??1),"minHandDetectionConfidence"in t&&gn(this.j,2,t.minHandDetectionConfidence??.5),"minTrackingConfidence"in t&&gn(this.h,4,t.minTrackingConfidence??.5),"minHandPresenceConfidence"in t&&gn(this.s,2,t.minHandPresenceConfidence??.5),this.l(t)}D(t,e){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Wa(this,t,e),pc(this)}F(t,e,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],za(this,t,n,e),pc(this)}m(){var t=new qi;Yi(t,"image_in"),Yi(t,"norm_rect"),$i(t,"hand_landmarks"),$i(t,"world_hand_landmarks"),$i(t,"handedness");const e=new Di;Xn(e,to,this.h);const n=new Xi;Gi(n,"mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),ji(n,"IMAGE:image_in"),ji(n,"NORM_RECT:norm_rect"),Vi(n,"LANDMARKS:hand_landmarks"),Vi(n,"WORLD_LANDMARKS:world_hand_landmarks"),Vi(n,"HANDEDNESS:handedness"),n.o(e),Ki(t,n),this.g.attachProtoVectorListener("hand_landmarks",((t,e)=>{for(const e of t)t=us(e),this.landmarks.push(ko(t));Wo(this,e);})),this.g.attachEmptyPacketListener("hand_landmarks",(t=>{Wo(this,t);})),this.g.attachProtoVectorListener("world_hand_landmarks",((t,e)=>{for(const e of t)t=cs(e),this.worldLandmarks.push(So(t));Wo(this,e);})),this.g.attachEmptyPacketListener("world_hand_landmarks",(t=>{Wo(this,t);})),this.g.attachProtoVectorListener("handedness",((t,e)=>{var n=this.handedness,r=n.push;const i=[];for(const e of t){t=ns(e);const n=[];for(const e of t.g())n.push({score:dn(e,2)??0,index:un(e,1)??0??-1,categoryName:ln(e,3)??""??"",displayName:ln(e,4)??""??""});i.push(n);}r.call(n,...i),Wo(this,e);})),this.g.attachEmptyPacketListener("handedness",(t=>{Wo(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),!0);}};gc.prototype.detectForVideo=gc.prototype.F,gc.prototype.detect=gc.prototype.D,gc.prototype.setOptions=gc.prototype.o,gc.createFromModelPath=function(t,e){return Xa(gc,t,{baseOptions:{modelAssetPath:e}})},gc.createFromModelBuffer=function(t,e){return Xa(gc,t,{baseOptions:{modelAssetBuffer:e}})},gc.createFromOptions=function(t,e){return Xa(gc,t,e)},gc.HAND_CONNECTIONS=hc;var mc=Ba([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function yc(t){t.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]};}function _c(t){try{if(!t.C)return t.h;t.C(t.h);}finally{Yo(t);}}function vc(t,e){t=us(t),e.push(ko(t));}var Ec=class extends Ya{constructor(t,e){super(new Va(t,e),"input_frames_image",null,!1),this.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=!1,sn(t=this.j=new io,0,1,e=new Ls),this.J=new zs,sn(this.j,0,2,this.J),this.Z=new eo,sn(this.j,0,3,this.Z),this.s=new Is,sn(this.j,0,4,this.s),this.H=new Cs,sn(this.j,0,5,this.H),this.v=new no,sn(this.j,0,6,this.v),this.K=new ro,sn(this.j,0,7,this.K),gn(this.s,2,.5),gn(this.s,3,.3),gn(this.H,2,.5),gn(this.v,2,.5),gn(this.v,3,.3),gn(this.K,2,.5),gn(this.J,2,.5);}get baseOptions(){return en(this.j,Ls,1)}set baseOptions(t){sn(this.j,0,1,t);}o(t){return "minFaceDetectionConfidence"in t&&gn(this.s,2,t.minFaceDetectionConfidence??.5),"minFaceSuppressionThreshold"in t&&gn(this.s,3,t.minFaceSuppressionThreshold??.3),"minFacePresenceConfidence"in t&&gn(this.H,2,t.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in t&&(this.outputFaceBlendshapes=!!t.outputFaceBlendshapes),"minPoseDetectionConfidence"in t&&gn(this.v,2,t.minPoseDetectionConfidence??.5),"minPoseSuppressionThreshold"in t&&gn(this.v,3,t.minPoseSuppressionThreshold??.3),"minPosePresenceConfidence"in t&&gn(this.K,2,t.minPosePresenceConfidence??.5),"outputPoseSegmentationMasks"in t&&(this.outputPoseSegmentationMasks=!!t.outputPoseSegmentationMasks),"minHandLandmarksConfidence"in t&&gn(this.J,2,t.minHandLandmarksConfidence??.5),this.l(t)}D(t,e,n){const r="function"!=typeof e?e:{};return this.C="function"==typeof e?e:n,yc(this),Wa(this,t,r),_c(this)}F(t,e,n,r){const i="function"!=typeof n?n:{};return this.C="function"==typeof n?n:r,yc(this),za(this,t,i,e),_c(this)}m(){var t=new qi;Yi(t,"input_frames_image"),$i(t,"pose_landmarks"),$i(t,"pose_world_landmarks"),$i(t,"face_landmarks"),$i(t,"left_hand_landmarks"),$i(t,"left_hand_world_landmarks"),$i(t,"right_hand_landmarks"),$i(t,"right_hand_world_landmarks");const e=new Di,n=new bi;Ke(n,1,ae("type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"),""),function(t,e){if(null!=e)if(Array.isArray(e))De(t,2,Re(e));else {if(!("string"==typeof e||e instanceof N||O(e)))throw Error("invalid value in Any.value field: "+e+" expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");Ke(t,2,ft(e,!1),U());}}(n,this.j.g());const r=new Xi;Gi(r,"mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),hn(r,8,bi,n),ji(r,"IMAGE:input_frames_image"),Vi(r,"POSE_LANDMARKS:pose_landmarks"),Vi(r,"POSE_WORLD_LANDMARKS:pose_world_landmarks"),Vi(r,"FACE_LANDMARKS:face_landmarks"),Vi(r,"LEFT_HAND_LANDMARKS:left_hand_landmarks"),Vi(r,"LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),Vi(r,"RIGHT_HAND_LANDMARKS:right_hand_landmarks"),Vi(r,"RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),r.o(e),Ki(t,r),zo(this,t),this.g.attachProtoListener("pose_landmarks",((t,e)=>{vc(t,this.h.poseLandmarks),Wo(this,e);})),this.g.attachEmptyPacketListener("pose_landmarks",(t=>{Wo(this,t);})),this.g.attachProtoListener("pose_world_landmarks",((t,e)=>{var n=this.h.poseWorldLandmarks;t=cs(t),n.push(So(t)),Wo(this,e);})),this.g.attachEmptyPacketListener("pose_world_landmarks",(t=>{Wo(this,t);})),this.outputPoseSegmentationMasks&&(Vi(r,"POSE_SEGMENTATION_MASK:pose_segmentation_mask"),Ko(this,"pose_segmentation_mask"),this.g.U("pose_segmentation_mask",((t,e)=>{this.h.poseSegmentationMasks=[Ka(this,t,!0,!this.C)],Wo(this,e);})),this.g.attachEmptyPacketListener("pose_segmentation_mask",(t=>{this.h.poseSegmentationMasks=[],Wo(this,t);}))),this.g.attachProtoListener("face_landmarks",((t,e)=>{vc(t,this.h.faceLandmarks),Wo(this,e);})),this.g.attachEmptyPacketListener("face_landmarks",(t=>{Wo(this,t);})),this.outputFaceBlendshapes&&($i(t,"extra_blendshapes"),Vi(r,"FACE_BLENDSHAPES:extra_blendshapes"),this.g.attachProtoListener("extra_blendshapes",((t,e)=>{var n=this.h.faceBlendshapes;this.outputFaceBlendshapes&&(t=ns(t),n.push(Ao(t.g()??[]))),Wo(this,e);})),this.g.attachEmptyPacketListener("extra_blendshapes",(t=>{Wo(this,t);}))),this.g.attachProtoListener("left_hand_landmarks",((t,e)=>{vc(t,this.h.leftHandLandmarks),Wo(this,e);})),this.g.attachEmptyPacketListener("left_hand_landmarks",(t=>{Wo(this,t);})),this.g.attachProtoListener("left_hand_world_landmarks",((t,e)=>{var n=this.h.leftHandWorldLandmarks;t=cs(t),n.push(So(t)),Wo(this,e);})),this.g.attachEmptyPacketListener("left_hand_world_landmarks",(t=>{Wo(this,t);})),this.g.attachProtoListener("right_hand_landmarks",((t,e)=>{vc(t,this.h.rightHandLandmarks),Wo(this,e);})),this.g.attachEmptyPacketListener("right_hand_landmarks",(t=>{Wo(this,t);})),this.g.attachProtoListener("right_hand_world_landmarks",((t,e)=>{var n=this.h.rightHandWorldLandmarks;t=cs(t),n.push(So(t)),Wo(this,e);})),this.g.attachEmptyPacketListener("right_hand_world_landmarks",(t=>{Wo(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),!0);}};Ec.prototype.detectForVideo=Ec.prototype.F,Ec.prototype.detect=Ec.prototype.D,Ec.prototype.setOptions=Ec.prototype.o,Ec.createFromModelPath=function(t,e){return Xa(Ec,t,{baseOptions:{modelAssetPath:e}})},Ec.createFromModelBuffer=function(t,e){return Xa(Ec,t,{baseOptions:{modelAssetBuffer:e}})},Ec.createFromOptions=function(t,e){return Xa(Ec,t,e)},Ec.HAND_CONNECTIONS=hc,Ec.POSE_CONNECTIONS=mc,Ec.FACE_LANDMARKS_LIPS=qa,Ec.FACE_LANDMARKS_LEFT_EYE=Ja,Ec.FACE_LANDMARKS_LEFT_EYEBROW=Za,Ec.FACE_LANDMARKS_LEFT_IRIS=Qa,Ec.FACE_LANDMARKS_RIGHT_EYE=tc,Ec.FACE_LANDMARKS_RIGHT_EYEBROW=ec,Ec.FACE_LANDMARKS_RIGHT_IRIS=nc,Ec.FACE_LANDMARKS_FACE_OVAL=rc,Ec.FACE_LANDMARKS_CONTOURS=ic,Ec.FACE_LANDMARKS_TESSELATION=sc;var wc=class extends Ya{constructor(t,e){super(new Va(t,e),"input_image","norm_rect",!0),this.j={classifications:[]},sn(t=this.h=new ao,0,1,e=new Ls);}get baseOptions(){return en(this.h,Ls,1)}set baseOptions(t){sn(this.h,0,1,t);}o(t){return sn(this.h,0,2,To(t,en(this.h,ws,2))),this.l(t)}sa(t,e){return this.j={classifications:[]},Wa(this,t,e),this.j}ta(t,e,n){return this.j={classifications:[]},za(this,t,n,e),this.j}m(){var t=new qi;Yi(t,"input_image"),Yi(t,"norm_rect"),$i(t,"classifications");const e=new Di;Xn(e,co,this.h);const n=new Xi;Gi(n,"mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),ji(n,"IMAGE:input_image"),ji(n,"NORM_RECT:norm_rect"),Vi(n,"CLASSIFICATIONS:classifications"),n.o(e),Ki(t,n),this.g.attachProtoListener("classifications",((t,e)=>{this.j=function(t){const e={classifications:rn(t,ps,1).map((t=>Ao(en(t,ts,4)?.g()??[],un(t,2)??0,ln(t,3)??"")))};return null!=ie(Ce(t,2))&&(e.timestampMs=ie(Ce(t,2))??0),e}(gs(t)),Wo(this,e);})),this.g.attachEmptyPacketListener("classifications",(t=>{Wo(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),!0);}};wc.prototype.classifyForVideo=wc.prototype.ta,wc.prototype.classify=wc.prototype.sa,wc.prototype.setOptions=wc.prototype.o,wc.createFromModelPath=function(t,e){return Xa(wc,t,{baseOptions:{modelAssetPath:e}})},wc.createFromModelBuffer=function(t,e){return Xa(wc,t,{baseOptions:{modelAssetBuffer:e}})},wc.createFromOptions=function(t,e){return Xa(wc,t,e)};var Tc=class extends Ya{constructor(t,e){super(new Va(t,e),"image_in","norm_rect",!0),this.h=new ho,this.embeddings={embeddings:[]},sn(t=this.h,0,1,e=new Ls);}get baseOptions(){return en(this.h,Ls,1)}set baseOptions(t){sn(this.h,0,1,t);}o(t){var e=this.h,n=en(this.h,As,2);return n=n?n.clone():new As,void 0!==t.l2Normalize?fn(n,1,t.l2Normalize):"l2Normalize"in t&&De(n,1),void 0!==t.quantize?fn(n,2,t.quantize):"quantize"in t&&De(n,2),sn(e,0,2,n),this.l(t)}za(t,e){return Wa(this,t,e),this.embeddings}Aa(t,e,n){return za(this,t,n,e),this.embeddings}m(){var t=new qi;Yi(t,"image_in"),Yi(t,"norm_rect"),$i(t,"embeddings_out");const e=new Di;Xn(e,uo,this.h);const n=new Xi;Gi(n,"mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),ji(n,"IMAGE:image_in"),ji(n,"NORM_RECT:norm_rect"),Vi(n,"EMBEDDINGS:embeddings_out"),n.o(e),Ki(t,n),this.g.attachProtoListener("embeddings_out",((t,e)=>{t=Es(t),this.embeddings=function(t){return {embeddings:rn(t,_s,1).map((t=>{const e={headIndex:un(t,3)??0??-1,headName:ln(t,4)??""??""};if(void 0!==tn(t,ms,$e(t,1)))t=Ve(t=en(t,ms,$e(t,1)),1,$t,je()),e.floatEmbedding=t.slice();else {const n=new Uint8Array(0);e.quantizedEmbedding=en(t,ys,$e(t,2))?.oa()?.h()??n;}return e})),timestampMs:ie(Ce(t,2))??0}}(t),Wo(this,e);})),this.g.attachEmptyPacketListener("embeddings_out",(t=>{Wo(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),!0);}};Tc.cosineSimilarity=function(t,e){if(t.floatEmbedding&&e.floatEmbedding)t=Lo(t.floatEmbedding,e.floatEmbedding);else {if(!t.quantizedEmbedding||!e.quantizedEmbedding)throw Error("Cannot compute cosine similarity between quantized and float embeddings.");t=Lo(xo(t.quantizedEmbedding),xo(e.quantizedEmbedding));}return t},Tc.prototype.embedForVideo=Tc.prototype.Aa,Tc.prototype.embed=Tc.prototype.za,Tc.prototype.setOptions=Tc.prototype.o,Tc.createFromModelPath=function(t,e){return Xa(Tc,t,{baseOptions:{modelAssetPath:e}})},Tc.createFromModelBuffer=function(t,e){return Xa(Tc,t,{baseOptions:{modelAssetBuffer:e}})},Tc.createFromOptions=function(t,e){return Xa(Tc,t,e)};var Ac=class{constructor(t,e,n){this.confidenceMasks=t,this.categoryMask=e,this.qualityScores=n;}close(){this.confidenceMasks?.forEach((t=>{t.close();})),this.categoryMask?.close();}};function bc(t){t.categoryMask=void 0,t.confidenceMasks=void 0,t.qualityScores=void 0;}function kc(t){try{const e=new Ac(t.confidenceMasks,t.categoryMask,t.qualityScores);if(!t.j)return e;t.j(e);}finally{Yo(t);}}Ac.prototype.close=Ac.prototype.close;var Sc=class extends Ya{constructor(t,e){super(new Va(t,e),"image_in","norm_rect",!1),this.s=[],this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new mo,this.v=new lo,sn(this.h,0,3,this.v),sn(t=this.h,0,1,e=new Ls);}get baseOptions(){return en(this.h,Ls,1)}set baseOptions(t){sn(this.h,0,1,t);}o(t){return void 0!==t.displayNamesLocale?De(this.h,2,ae(t.displayNamesLocale)):"displayNamesLocale"in t&&De(this.h,2),"outputCategoryMask"in t&&(this.outputCategoryMask=t.outputCategoryMask??!1),"outputConfidenceMasks"in t&&(this.outputConfidenceMasks=t.outputConfidenceMasks??!0),super.l(t)}I(){!function(t){const e=rn(t.da(),Xi,1).filter((t=>(ln(t,1)??"").includes("mediapipe.tasks.TensorsToSegmentationCalculator")));if(t.s=[],e.length>1)throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");1===e.length&&(en(e[0],Di,7)?.l()?.g()??new Map).forEach(((e,n)=>{t.s[Number(n)]=ln(e,1)??"";}));}(this);}segment(t,e,n){const r="function"!=typeof e?e:{};return this.j="function"==typeof e?e:n,bc(this),Wa(this,t,r),kc(this)}Ma(t,e,n,r){const i="function"!=typeof n?n:{};return this.j="function"==typeof n?n:r,bc(this),za(this,t,i,e),kc(this)}Da(){return this.s}m(){var t=new qi;Yi(t,"image_in"),Yi(t,"norm_rect");const e=new Di;Xn(e,yo,this.h);const n=new Xi;Gi(n,"mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),ji(n,"IMAGE:image_in"),ji(n,"NORM_RECT:norm_rect"),n.o(e),Ki(t,n),zo(this,t),this.outputConfidenceMasks&&($i(t,"confidence_masks"),Vi(n,"CONFIDENCE_MASKS:confidence_masks"),Ko(this,"confidence_masks"),this.g.ca("confidence_masks",((t,e)=>{this.confidenceMasks=t.map((t=>Ka(this,t,!0,!this.j))),Wo(this,e);})),this.g.attachEmptyPacketListener("confidence_masks",(t=>{this.confidenceMasks=[],Wo(this,t);}))),this.outputCategoryMask&&($i(t,"category_mask"),Vi(n,"CATEGORY_MASK:category_mask"),Ko(this,"category_mask"),this.g.U("category_mask",((t,e)=>{this.categoryMask=Ka(this,t,!1,!this.j),Wo(this,e);})),this.g.attachEmptyPacketListener("category_mask",(t=>{this.categoryMask=void 0,Wo(this,t);}))),$i(t,"quality_scores"),Vi(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",((t,e)=>{this.qualityScores=t,Wo(this,e);})),this.g.attachEmptyPacketListener("quality_scores",(t=>{this.categoryMask=void 0,Wo(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),!0);}};Sc.prototype.getLabels=Sc.prototype.Da,Sc.prototype.segmentForVideo=Sc.prototype.Ma,Sc.prototype.segment=Sc.prototype.segment,Sc.prototype.setOptions=Sc.prototype.o,Sc.createFromModelPath=function(t,e){return Xa(Sc,t,{baseOptions:{modelAssetPath:e}})},Sc.createFromModelBuffer=function(t,e){return Xa(Sc,t,{baseOptions:{modelAssetBuffer:e}})},Sc.createFromOptions=function(t,e){return Xa(Sc,t,e)};var xc=class{constructor(t,e,n){this.confidenceMasks=t,this.categoryMask=e,this.qualityScores=n;}close(){this.confidenceMasks?.forEach((t=>{t.close();})),this.categoryMask?.close();}};xc.prototype.close=xc.prototype.close;var Lc=class extends Hn{constructor(t){super(t);}},Rc=[0,oi,-2],Fc=[0,Qr,-3,hi,Qr,-1],Ic=[0,Fc],Mc=[0,Fc,oi,-1],Pc=class extends Hn{constructor(t){super(t);}},Oc=[0,Qr,-1,hi],Cc=class extends Hn{constructor(t){super(t);}},Uc=class extends Hn{constructor(t){super(t);}},Dc=[1,2,3,4,5,6,7,8,9,10,14,15],Nc=class extends Hn{constructor(t){super(t);}};Nc.prototype.g=Ai([0,pi,[0,Dc,gi,Fc,gi,[0,Fc,Rc],gi,Ic,gi,[0,Ic,Rc],gi,Oc,gi,[0,Qr,-3,hi,vi],gi,[0,Qr,-3,hi],gi,[0,fi,Qr,-2,hi,oi,hi,-1,2,Qr,Rc],gi,Mc,gi,[0,Mc,Rc],Qr,Rc,fi,gi,[0,Qr,-3,hi,Rc,-1],gi,[0,pi,Oc]],fi,[0,fi,oi,-1,hi]]);var Bc=class extends Ya{constructor(t,e){super(new Va(t,e),"image_in","norm_rect_in",!1),this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new mo,this.s=new lo,sn(this.h,0,3,this.s),sn(t=this.h,0,1,e=new Ls);}get baseOptions(){return en(this.h,Ls,1)}set baseOptions(t){sn(this.h,0,1,t);}o(t){return "outputCategoryMask"in t&&(this.outputCategoryMask=t.outputCategoryMask??!1),"outputConfidenceMasks"in t&&(this.outputConfidenceMasks=t.outputConfidenceMasks??!0),super.l(t)}segment(t,e,n,r){const i="function"!=typeof n?n:{};this.j="function"==typeof n?n:r,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.B+1,r=new Nc;const s=new Uc;var o=new Lc;if(pn(o,1,255),sn(s,0,12,o),e.keypoint&&e.scribble)throw Error("Cannot provide both keypoint and scribble.");if(e.keypoint){var a=new Pc;fn(a,3,!0),gn(a,1,e.keypoint.x),gn(a,2,e.keypoint.y),on(s,5,Dc,a);}else {if(!e.scribble)throw Error("Must provide either a keypoint or a scribble.");for(a of(o=new Cc,e.scribble))fn(e=new Pc,3,!0),gn(e,1,a.x),gn(e,2,a.y),hn(o,1,Pc,e);on(s,15,Dc,o);}hn(r,1,Uc,s),this.g.addProtoToStream(r.g(),"drishti.RenderData","roi_in",n),Wa(this,t,i);t:{try{const t=new xc(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.j){var c=t;break t}this.j(t);}finally{Yo(this);}c=void 0;}return c}m(){var t=new qi;Yi(t,"image_in"),Yi(t,"roi_in"),Yi(t,"norm_rect_in");const e=new Di;Xn(e,yo,this.h);const n=new Xi;Gi(n,"mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraph"),ji(n,"IMAGE:image_in"),ji(n,"ROI:roi_in"),ji(n,"NORM_RECT:norm_rect_in"),n.o(e),Ki(t,n),zo(this,t),this.outputConfidenceMasks&&($i(t,"confidence_masks"),Vi(n,"CONFIDENCE_MASKS:confidence_masks"),Ko(this,"confidence_masks"),this.g.ca("confidence_masks",((t,e)=>{this.confidenceMasks=t.map((t=>Ka(this,t,!0,!this.j))),Wo(this,e);})),this.g.attachEmptyPacketListener("confidence_masks",(t=>{this.confidenceMasks=[],Wo(this,t);}))),this.outputCategoryMask&&($i(t,"category_mask"),Vi(n,"CATEGORY_MASK:category_mask"),Ko(this,"category_mask"),this.g.U("category_mask",((t,e)=>{this.categoryMask=Ka(this,t,!1,!this.j),Wo(this,e);})),this.g.attachEmptyPacketListener("category_mask",(t=>{this.categoryMask=void 0,Wo(this,t);}))),$i(t,"quality_scores"),Vi(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",((t,e)=>{this.qualityScores=t,Wo(this,e);})),this.g.attachEmptyPacketListener("quality_scores",(t=>{this.categoryMask=void 0,Wo(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),!0);}};Bc.prototype.segment=Bc.prototype.segment,Bc.prototype.setOptions=Bc.prototype.o,Bc.createFromModelPath=function(t,e){return Xa(Bc,t,{baseOptions:{modelAssetPath:e}})},Bc.createFromModelBuffer=function(t,e){return Xa(Bc,t,{baseOptions:{modelAssetBuffer:e}})},Bc.createFromOptions=function(t,e){return Xa(Bc,t,e)};var Gc=class extends Ya{constructor(t,e){super(new Va(t,e),"input_frame_gpu","norm_rect",!1),this.j={detections:[]},sn(t=this.h=new _o,0,1,e=new Ls);}get baseOptions(){return en(this.h,Ls,1)}set baseOptions(t){sn(this.h,0,1,t);}o(t){return void 0!==t.displayNamesLocale?De(this.h,2,ae(t.displayNamesLocale)):"displayNamesLocale"in t&&De(this.h,2),void 0!==t.maxResults?pn(this.h,3,t.maxResults):"maxResults"in t&&De(this.h,3),void 0!==t.scoreThreshold?gn(this.h,4,t.scoreThreshold):"scoreThreshold"in t&&De(this.h,4),void 0!==t.categoryAllowlist?mn(this.h,5,t.categoryAllowlist):"categoryAllowlist"in t&&De(this.h,5),void 0!==t.categoryDenylist?mn(this.h,6,t.categoryDenylist):"categoryDenylist"in t&&De(this.h,6),this.l(t)}D(t,e){return this.j={detections:[]},Wa(this,t,e),this.j}F(t,e,n){return this.j={detections:[]},za(this,t,n,e),this.j}m(){var t=new qi;Yi(t,"input_frame_gpu"),Yi(t,"norm_rect"),$i(t,"detections");const e=new Di;Xn(e,vo,this.h);const n=new Xi;Gi(n,"mediapipe.tasks.vision.ObjectDetectorGraph"),ji(n,"IMAGE:input_frame_gpu"),ji(n,"NORM_RECT:norm_rect"),Vi(n,"DETECTIONS:detections"),n.o(e),Ki(t,n),this.g.attachProtoVectorListener("detections",((t,e)=>{for(const e of t)t=os(e),this.j.detections.push(bo(t));Wo(this,e);})),this.g.attachEmptyPacketListener("detections",(t=>{Wo(this,t);})),t=t.g(),this.setGraph(new Uint8Array(t),!0);}};Gc.prototype.detectForVideo=Gc.prototype.F,Gc.prototype.detect=Gc.prototype.D,Gc.prototype.setOptions=Gc.prototype.o,Gc.createFromModelPath=async function(t,e){return Xa(Gc,t,{baseOptions:{modelAssetPath:e}})},Gc.createFromModelBuffer=function(t,e){return Xa(Gc,t,{baseOptions:{modelAssetBuffer:e}})},Gc.createFromOptions=function(t,e){return Xa(Gc,t,e)};var jc=class{constructor(t,e,n){this.landmarks=t,this.worldLandmarks=e,this.segmentationMasks=n;}close(){this.segmentationMasks?.forEach((t=>{t.close();}));}};function Vc(t){t.landmarks=[],t.worldLandmarks=[],t.segmentationMasks=void 0;}function Xc(t){try{const e=new jc(t.landmarks,t.worldLandmarks,t.segmentationMasks);if(!t.s)return e;t.s(e);}finally{Yo(t);}}jc.prototype.close=jc.prototype.close;var Hc=class extends Ya{constructor(t,e){super(new Va(t,e),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=!1,sn(t=this.h=new Eo,0,1,e=new Ls),this.v=new ro,sn(this.h,0,3,this.v),this.j=new no,sn(this.h,0,2,this.j),pn(this.j,4,1),gn(this.j,2,.5),gn(this.v,2,.5),gn(this.h,4,.5);}get baseOptions(){return en(this.h,Ls,1)}set baseOptions(t){sn(this.h,0,1,t);}o(t){return "numPoses"in t&&pn(this.j,4,t.numPoses??1),"minPoseDetectionConfidence"in t&&gn(this.j,2,t.minPoseDetectionConfidence??.5),"minTrackingConfidence"in t&&gn(this.h,4,t.minTrackingConfidence??.5),"minPosePresenceConfidence"in t&&gn(this.v,2,t.minPosePresenceConfidence??.5),"outputSegmentationMasks"in t&&(this.outputSegmentationMasks=t.outputSegmentationMasks??!1),this.l(t)}D(t,e,n){const r="function"!=typeof e?e:{};return this.s="function"==typeof e?e:n,Vc(this),Wa(this,t,r),Xc(this)}F(t,e,n,r){const i="function"!=typeof n?n:{};return this.s="function"==typeof n?n:r,Vc(this),za(this,t,i,e),Xc(this)}m(){var t=new qi;Yi(t,"image_in"),Yi(t,"norm_rect"),$i(t,"normalized_landmarks"),$i(t,"world_landmarks"),$i(t,"segmentation_masks");const e=new Di;Xn(e,wo,this.h);const n=new Xi;Gi(n,"mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),ji(n,"IMAGE:image_in"),ji(n,"NORM_RECT:norm_rect"),Vi(n,"NORM_LANDMARKS:normalized_landmarks"),Vi(n,"WORLD_LANDMARKS:world_landmarks"),n.o(e),Ki(t,n),zo(this,t),this.g.attachProtoVectorListener("normalized_landmarks",((t,e)=>{this.landmarks=[];for(const e of t)t=us(e),this.landmarks.push(ko(t));Wo(this,e);})),this.g.attachEmptyPacketListener("normalized_landmarks",(t=>{this.landmarks=[],Wo(this,t);})),this.g.attachProtoVectorListener("world_landmarks",((t,e)=>{this.worldLandmarks=[];for(const e of t)t=cs(e),this.worldLandmarks.push(So(t));Wo(this,e);})),this.g.attachEmptyPacketListener("world_landmarks",(t=>{this.worldLandmarks=[],Wo(this,t);})),this.outputSegmentationMasks&&(Vi(n,"SEGMENTATION_MASK:segmentation_masks"),Ko(this,"segmentation_masks"),this.g.ca("segmentation_masks",((t,e)=>{this.segmentationMasks=t.map((t=>Ka(this,t,!0,!this.s))),Wo(this,e);})),this.g.attachEmptyPacketListener("segmentation_masks",(t=>{this.segmentationMasks=[],Wo(this,t);}))),t=t.g(),this.setGraph(new Uint8Array(t),!0);}};Hc.prototype.detectForVideo=Hc.prototype.F,Hc.prototype.detect=Hc.prototype.D,Hc.prototype.setOptions=Hc.prototype.o,Hc.createFromModelPath=function(t,e){return Xa(Hc,t,{baseOptions:{modelAssetPath:e}})},Hc.createFromModelBuffer=function(t,e){return Xa(Hc,t,{baseOptions:{modelAssetBuffer:e}})},Hc.createFromOptions=function(t,e){return Xa(Hc,t,e)},Hc.POSE_CONNECTIONS=mc;

class FaceapiService {
    constructor(config) {
        this.isInitialized = false;
        this.isInitializing = false;
        this.lastDetectionTime = 0;
        this.lastDetectionResult = null;
        this.detectionQueue = null;
        // Performance monitoring
        this.performanceStats = {
            detections: 0,
            avgDetectionTime: 0,
            lastFrameTime: 0,
            fps: 0
        };
        // Configuration with defaults
        this.config = {
            minDetectionConfidence: 0.3, // Reduced from 0.6 for better detection
            maxNumFaces: 1,
            modelComplexity: 1,
            throttleMs: 100, // Increased from 50 for stability
            enableLandmarks: true,
            useGPU: true
        };
        if (config) {
            this.config = Object.assign(Object.assign({}, this.config), config);
        }
    }
    async initialize() {
        if (this.isInitialized)
            return this;
        if (this.isInitializing) {
            // Wait for ongoing initialization
            while (this.isInitializing) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            return this;
        }
        this.isInitializing = true;
        try {
            console.log('🚀 Initializing FaceAPI Service...');
            const startTime = performance.now();
            // Initialize both detectors in parallel for better performance
            await Promise.all([
                this.initializefaceDetector(this.config.minDetectionConfidence),
                this.config.enableLandmarks ? this.initFaceLandmarkerDetector() : Promise.resolve()
            ]);
            this.isInitialized = true;
            this.isInitializing = false;
            const initTime = performance.now() - startTime;
            console.log(`✅ FaceAPI Service initialized in ${initTime.toFixed(2)}ms`);
        }
        catch (error) {
            this.isInitializing = false;
            console.error('❌ Failed to initialize face detection:', error);
            throw new Error(`Face detection initialization failed: ${error.message}`);
        }
        return this;
    }
    // Getter methods for accessing configuration
    get minDetectionConfidence() { return this.config.minDetectionConfidence; }
    get maxNumFaces() { return this.config.maxNumFaces; }
    get throttleMs() { return this.config.throttleMs; }
    // Update configuration dynamically
    updateConfig(newConfig) {
        const oldConfig = Object.assign({}, this.config);
        this.config = Object.assign(Object.assign({}, this.config), newConfig);
        // Reinitialize if critical settings changed
        if (oldConfig.minDetectionConfidence !== this.config.minDetectionConfidence ||
            oldConfig.maxNumFaces !== this.config.maxNumFaces ||
            oldConfig.useGPU !== this.config.useGPU) {
            console.log('🔄 Configuration changed, reinitializing...');
            this.dispose();
            this.initialize();
        }
    }
    async initFaceLandmarkerDetector() {
        try {
            const filesetResolver = await Po.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
            let runningMode = "IMAGE";
            this.landmarksDetector = await ac.createFromOptions(filesetResolver, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
                    delegate: this.config.useGPU ? "GPU" : "CPU"
                },
                outputFaceBlendshapes: true,
                runningMode,
                numFaces: this.config.maxNumFaces
            });
        }
        catch (error) {
            console.error('Error initializing face landmarker:', error);
            throw new Error(`Face landmarker initialization failed: ${error.message}`);
        }
    }
    async initializefaceDetector(minDetectionConfidence) {
        try {
            const vision = await Po.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
            this.faceDetector = await $a.createFromOptions(vision, {
                minSuppressionThreshold: 0.3,
                minDetectionConfidence,
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
                    delegate: this.config.useGPU ? "GPU" : "CPU"
                },
                runningMode: "VIDEO",
            });
        }
        catch (error) {
            console.error('Error initializing face detector:', error);
            throw new Error(`Face detector initialization failed: ${error.message}`);
        }
    }
    updateDetectionConfidence(newConfidence) {
        this.config.minDetectionConfidence = newConfidence;
        // Reinitialize detector with new confidence
        if (this.isInitialized) {
            this.initializefaceDetector(newConfidence);
        }
    }
    async detectFace(el, timeStamp) {
        if (!el || !this.faceDetector) {
            console.warn('⚠️ Detection skipped:', {
                hasElement: !!el,
                hasDetector: !!this.faceDetector,
                isInitialized: this.isInitialized
            });
            return null;
        }
        // Validate video element is ready for processing
        if (!this.isVideoReady(el)) {
            console.warn('⚠️ Video not ready for detection:', {
                readyState: el.readyState,
                videoWidth: el.videoWidth,
                videoHeight: el.videoHeight,
                currentTime: el.currentTime
            });
            return null;
        }
        // Use detection queue to prevent overlapping detection calls
        if (this.detectionQueue) {
            return this.detectionQueue;
        }
        this.detectionQueue = this.performDetection(el, timeStamp);
        const result = await this.detectionQueue;
        this.detectionQueue = null;
        return result;
    }
    isVideoReady(video) {
        return (video.readyState >= 2 && // HAVE_CURRENT_DATA or higher
            video.videoWidth > 0 &&
            video.videoHeight > 0 &&
            !video.paused &&
            !video.ended &&
            video.currentTime > 0);
    }
    async performDetection(el, timeStamp) {
        var _a, _b;
        const startTime = performance.now();
        try {
            console.log('🔍 Performing face detection...', {
                videoReady: el.readyState,
                videoWidth: el.videoWidth,
                videoHeight: el.videoHeight,
                currentTime: el.currentTime,
                timestamp: timeStamp
            });
            // Double-check video is still ready (defensive programming)
            if (!this.isVideoReady(el)) {
                console.warn('⚠️ Video became invalid during detection');
                return null;
            }
            const detectionResult = this.faceDetector.detectForVideo(el, timeStamp);
            const detections = detectionResult.detections;
            console.log('📊 Detection results:', {
                detectionCount: (detections === null || detections === void 0 ? void 0 : detections.length) || 0,
                detections: detections === null || detections === void 0 ? void 0 : detections.map(d => {
                    var _a, _b;
                    return ({
                        confidence: (_b = (_a = d.categories) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.score,
                        boundingBox: d.boundingBox
                    });
                })
            });
            if (!detections || detections.length === 0) {
                console.log('❌ No faces detected');
                return null;
            }
            let detectionObj;
            if (detections.length === 1) {
                detectionObj = detections[0];
            }
            else {
                // Sort by confidence and take the best
                const sorted = detections.sort((a, b) => {
                    var _a, _b, _c, _d;
                    return (((_b = (_a = b.categories) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.score) || 0) - (((_d = (_c = a.categories) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.score) || 0);
                });
                detectionObj = sorted[0];
            }
            console.log('✅ Best detection:', {
                confidence: (_b = (_a = detectionObj.categories) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.score,
                threshold: this.config.minDetectionConfidence
            });
            const result = await this.getDetectorImgFromDetection(el, detectionObj, timeStamp);
            // Update performance stats
            this.updatePerformanceStats(performance.now() - startTime);
            return result;
        }
        catch (error) {
            console.error('❌ Error during face detection:', error);
            return null;
        }
    }
    async detectFaceThrottled(el, timeStamp, throttleMs = 100) {
        const now = Date.now();
        if (this.lastDetectionTime && (now - this.lastDetectionTime) < throttleMs) {
            return this.lastDetectionResult;
        }
        this.lastDetectionTime = now;
        this.lastDetectionResult = await this.detectFace(el, timeStamp);
        return this.lastDetectionResult;
    }
    async detectFaceOptimized(el, timeStamp) {
        return this.detectFaceThrottled(el, timeStamp, this.config.throttleMs);
    }
    async getDetectorImgFromDetection(el, detection, timeStamp) {
        var _a, _b;
        if (!detection || !detection.boundingBox) {
            return null;
        }
        const blob = await videoToBlob(el, detection.boundingBox);
        const confidence = ((_b = (_a = detection.categories) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.score) || 0;
        return {
            detection: detection,
            currentTarget: el,
            blobImg: blob,
            confidence: confidence,
            timestamp: timeStamp
        };
    }
    async getFaceLandmarksFromBlob(blob) {
        this.checkInitialized();
        let imag = await createImageBitmap(blob);
        return this.landmarksDetector.detect(imag);
    }
    checkInitialized() {
        if (!this.landmarksDetector)
            throw new Error("Aun no se cargo el model de face detection");
    }
    dispose() {
        if (this.faceDetector) {
            this.faceDetector.close();
        }
        if (this.landmarksDetector) {
            this.landmarksDetector.close();
        }
        this.isInitialized = false;
    }
    // Performance monitoring methods
    updatePerformanceStats(detectionTime) {
        this.performanceStats.detections++;
        this.performanceStats.avgDetectionTime =
            (this.performanceStats.avgDetectionTime * (this.performanceStats.detections - 1) + detectionTime) /
                this.performanceStats.detections;
        const now = performance.now();
        if (this.performanceStats.lastFrameTime > 0) {
            const frameTime = now - this.performanceStats.lastFrameTime;
            this.performanceStats.fps = Math.round(1000 / frameTime);
        }
        this.performanceStats.lastFrameTime = now;
    }
    // Get performance statistics
    getPerformanceStats() {
        return Object.assign({}, this.performanceStats);
    }
    // Reset performance statistics
    resetPerformanceStats() {
        this.performanceStats = {
            detections: 0,
            avgDetectionTime: 0,
            lastFrameTime: 0,
            fps: 0
        };
    }
    // Check if service is ready
    isReady() {
        return this.isInitialized && !!this.faceDetector;
    }
    // Get current configuration
    getConfig() {
        return Object.assign({}, this.config);
    }
}
const faceapiService = new FaceapiService();

function format(first, middle, last) {
    return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
async function pxTimer(time) {
    let cosa;
    return new Promise((resolve) => {
        cosa = setTimeout(() => {
            resolve(cosa);
        }, time);
    });
}

const isInstanceOf = (value, className) => {
  const C = globalThis[className];
  return C != null && value instanceof C;
};
const getTransferables = (value) => {
  if (value != null) {
    if (
      isInstanceOf(value, "ArrayBuffer") ||
      isInstanceOf(value, "MessagePort") ||
      isInstanceOf(value, "ImageBitmap") ||
      isInstanceOf(value, "OffscreenCanvas")
    ) {
      return [value];
    }
    if (typeof value === "object") {
      if (value.constructor === Object) {
        value = Object.values(value);
      }
      if (Array.isArray(value)) {
        return value.flatMap(getTransferables);
      }
      return getTransferables(value.buffer);
    }
  }
  return [];
};

let pendingIds = 0;
let callbackIds = 0;
const pending = new Map();
const callbacks = new Map();

const createWorker = (workerPath, workerName, workerMsgId) => {
  const worker = new Worker(workerPath, {name:workerName});

  worker.addEventListener('message', ({data}) => {
    if (data) {
      const workerMsg = data[0];
      const id = data[1];
      const value = data[2];

      if (workerMsg === workerMsgId) {
        const err = data[3];
        const [resolve, reject, callbackIds] = pending.get(id);
        pending.delete(id);

        if (err) {
          const errObj = (err.isError)
            ? Object.assign(new Error(err.value.message), err.value)
            : err.value;

          consoleError(errObj);
          reject(errObj);
        } else {
          if (callbackIds) {
            callbackIds.forEach(id => callbacks.delete(id));
          }
          resolve(value);
        }
      } else if (workerMsg === workerMsgId + '.cb') {
        try {
          callbacks.get(id)(...value);
        } catch (e) {
          consoleError(e);
        }
      }
    }
  });

  return worker;
};

const createWorkerProxy = (worker, workerMsgId, exportedMethod) => (
  (...args) => new Promise((resolve, reject) => {
    let pendingId = pendingIds++;
    let i = 0;
    let argLen = args.length;
    let mainData = [resolve, reject];
    pending.set(pendingId, mainData);

    for (; i < argLen; i++) {
      if (typeof args[i] === 'function') {
        const callbackId = callbackIds++;
        callbacks.set(callbackId, args[i]);
        args[i] = [workerMsgId + '.cb', callbackId];
        (mainData[2] = mainData[2] || []).push(callbackId);
      }
    }
    const postMessage = (w) => (
      w.postMessage(
        [workerMsgId, pendingId, exportedMethod, args],
        getTransferables(args)
      )
    );
    if (worker.then) {
      worker.then(postMessage);
    } else {
      postMessage(worker);
    }
  })
);

const workerPromise = import('./distance.worker-Bu3wS6ij.js').then(m => m.worker);
const getBestMatch = /*@__PURE__*/createWorkerProxy(workerPromise, 'stencil.distance.worker', 'getBestMatch');
const getDistance = /*@__PURE__*/createWorkerProxy(workerPromise, 'stencil.distance.worker', 'getDistance');
const tsDistance = /*@__PURE__*/createWorkerProxy(workerPromise, 'stencil.distance.worker', 'tsDistance');

const inputFaceApiWebcamCss = ":host{display:block;position:relative;width:460px;height:460px;border-radius:16px;overflow:hidden;background:linear-gradient(145deg, #1a1a1a, #2d2d2d);border:2px solid rgba(255, 255, 255, 0.1);box-shadow:0 8px 32px rgba(0, 0, 0, 0.3),\n    inset 0 1px 0 rgba(255, 255, 255, 0.1);backdrop-filter:blur(10px);transition:all 0.3s ease}:host(:hover){box-shadow:0 12px 40px rgba(0, 0, 0, 0.4),\n    inset 0 1px 0 rgba(255, 255, 255, 0.2);transform:translateY(-2px)}video{display:none}canvas{width:100%;height:100%;border-radius:14px;object-fit:cover}.camera-state{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0, 0, 0, 0.8);color:white;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;backdrop-filter:blur(10px);border-radius:14px;z-index:1}.camera-state.hidden{display:none}.camera-state h3{margin:0 0 12px 0;font-size:18px;font-weight:600;text-align:center}.camera-state p{margin:0;font-size:14px;opacity:0.8;text-align:center;max-width:80%;line-height:1.4}.loading-spinner{width:40px;height:40px;border:3px solid rgba(255, 255, 255, 0.3);border-top:3px solid #007AFF;border-radius:50%;animation:spin 1s linear infinite;margin-bottom:16px}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.state-icon{font-size:48px;margin-bottom:16px;opacity:0.7}.error-icon{color:#FF3B30}.inactive-icon{color:#8E8E93}.detecting-icon{color:#30D158;animation:pulse 2s ease-in-out infinite}@keyframes pulse{0%,100%{opacity:0.7}50%{opacity:1}}.face-indicator{position:absolute;top:16px;right:16px;padding:8px 12px;background:rgba(0, 0, 0, 0.7);color:white;border-radius:20px;font-size:12px;font-weight:600;backdrop-filter:blur(10px);z-index:10;transition:all 0.3s ease}.face-indicator.detected{background:rgba(48, 209, 88, 0.9);animation:fadeIn 0.3s ease}.face-indicator.not-detected{background:rgba(255, 59, 48, 0.9)}@keyframes fadeIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}.camera-controls{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);display:flex;gap:12px;z-index:10}.control-button{width:56px;height:56px;border:none;border-radius:50%;background:rgba(0, 0, 0, 0.7);color:white;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;backdrop-filter:blur(10px)}.control-button:hover{background:rgba(0, 0, 0, 0.9);transform:scale(1.1)}.control-button:active{transform:scale(0.95)}.start-button{background:rgba(48, 209, 88, 0.9)}.start-button:hover{background:rgba(48, 209, 88, 1)}.stop-button{background:rgba(255, 59, 48, 0.9)}.stop-button:hover{background:rgba(255, 59, 48, 1)}.flip-button{background:rgba(0, 122, 255, 0.9)}.flip-button:hover{background:rgba(0, 122, 255, 1)}.control-button:disabled{opacity:0.6;cursor:not-allowed;transform:none}.control-button:disabled:hover{transform:none;background:rgba(0, 0, 0, 0.7)}.error-message{position:absolute;bottom:16px;left:16px;right:16px;padding:12px;background:rgba(255, 59, 48, 0.9);color:white;border-radius:8px;font-size:14px;text-align:center;backdrop-filter:blur(10px);z-index:10}.auto-capture-indicator{position:absolute;top:16px;left:16px;padding:6px 10px;background:rgba(255, 149, 0, 0.9);color:white;border-radius:16px;font-size:11px;font-weight:600;backdrop-filter:blur(10px);z-index:10;animation:autoCapturePulse 2s ease-in-out infinite}@keyframes autoCapturePulse{0%,100%{opacity:0.8}50%{opacity:1}}@media (max-width: 600px){:host{width:100%;height:auto;aspect-ratio:1;max-width:400px}.camera-controls{bottom:12px}.control-button{width:48px;height:48px;font-size:20px}.camera-state h3{font-size:16px}.camera-state p{font-size:12px}.state-icon{font-size:36px}}@media (prefers-contrast: high){:host{border-width:3px}.control-button{border:2px solid white}}@media (prefers-reduced-motion: reduce){*{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important}}";

const InputFaceApiWebcam = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.faceDetected = createEvent(this, "faceDetected", 6);
        this.faceStopDetection = createEvent(this, "faceStopDetection", 6);
        this.detectionStarted = createEvent(this, "detectionStarted", 6);
        this.detectionStopped = createEvent(this, "detectionStopped", 6);
        this.cameraStarted = createEvent(this, "cameraStarted", 6);
        this.cameraStopped = createEvent(this, "cameraStopped", 6);
        this.cameraError = createEvent(this, "cameraError", 6);
        this.facingModeChanged = createEvent(this, "facingModeChanged", 6);
        this.photoCapture = createEvent(this, "photoCapture", 6);
        this.loaded = false;
        this.cameraState = 'inactive';
        this.currentError = null;
        this.detectedFacesCount = 0;
        this.isRecognizing = false;
        // Enhanced Properties
        /**
         * Enable or disable face detection
         */
        this.enableDetection = true;
        /**
         * Show control buttons for starting/stopping detection
         */
        this.showControls = true;
        /**
         * Auto-start detection when component loads
         */
        this.autoStart = true;
        /**
         * Show bounding boxes around detected faces
         */
        this.showBoundingBoxes = true;
        /**
         * Show face landmarks on detected faces
         */
        this.showLandmarks = false;
        /**
         * Text for the start detection button
         */
        this.startButtonText = 'Start Detection';
        /**
         * Text for the stop detection button
         */
        this.stopButtonText = 'Stop Detection';
        /**
         * Text for the flip camera button
         */
        this.flipButtonText = 'Flip Camera';
        /**
         * Width of the video element
         */
        this.width = 460;
        /**
         * Height of the video element
         */
        this.height = 460;
        /**
         * Score threshold to detect a face
         */
        this.scoreThreshold = 0.65;
        /**
         * Detection timer interval in milliseconds
         */
        this.detectionTimer = 1500;
        /**
         * Facing mode options following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value
         */
        this.facingMode = CameraDirection.Front;
        /**
         * Enable automatic photo capture when face is detected
         */
        this.autoCapture = true;
        /**
         * Minimum confidence score for face detection to trigger photo capture
         */
        this.captureThreshold = 0.8;
        /**
         * Delay between automatic photo captures in milliseconds
         */
        this.captureDelay = 3000;
        // Private properties
        this.lastVideoTime = -1;
        this.photoTaken = false;
    }
    detectionResultChangedHandler(newValue, oldValue) {
        var _a, _b;
        if (newValue === null || newValue === void 0 ? void 0 : newValue.blobImg) {
            this.detectedFacesCount = newValue.detection ? 1 : 0;
            this.faceDetected.emit(newValue);
            // Auto capture photo if enabled and face confidence is above threshold
            if (this.autoCapture && newValue.detection &&
                ((_b = (_a = newValue.detection.categories) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.score) >= this.captureThreshold) {
                this.capturePhoto();
            }
        }
        else {
            if (oldValue) {
                this.detectedFacesCount = 0;
                this.faceStopDetection.emit();
            }
        }
    }
    // Enhanced Methods
    /**
     * Stop face detection
     */
    async stopDetection() {
        this.enableDetection = false;
        this.cameraState = 'ready';
        this.detectionStopped.emit();
    }
    /**
     * Start face detection
     */
    async startDetection() {
        if (this.cameraState === 'ready' || this.cameraState === 'inactive') {
            this.enableDetection = true;
            this.cameraState = 'detecting';
            this.detectionStarted.emit();
        }
    }
    /**
     * Toggle camera between front and back
     */
    async toggleCamera() {
        try {
            this.cameraState = 'loading';
            this.facingMode = this.facingMode === CameraDirection.Front ? CameraDirection.Rear : CameraDirection.Front;
            // Stop current video stream
            if (this.video.srcObject) {
                const stream = this.video.srcObject;
                stream.getTracks().forEach(track => track.stop());
            }
            // Reinitialize with new facing mode
            await initWebcamToVideo(this.video, this.facingMode);
            this.facingModeChanged.emit(this.facingMode);
            this.cameraState = this.enableDetection ? 'detecting' : 'ready';
        }
        catch (error) {
            this.handleError('CAMERA_ACCESS_DENIED', 'Failed to toggle camera', error);
        }
    }
    /**
     * Initialize camera and face detection
     */
    async initializeCamera() {
        try {
            this.cameraState = 'loading';
            this.currentError = null;
            await this.componentWillLoad();
            if (this.autoStart && this.enableDetection) {
                this.cameraState = 'detecting';
            }
            else {
                this.cameraState = 'ready';
            }
        }
        catch (error) {
            this.handleError('INITIALIZATION_ERROR', 'Failed to initialize camera', error);
        }
    }
    /**
     * Giving a blob image, get the face landmarks
     * @returns face landmarks
     */
    async getBlobImageDescriptors(blob) {
        return await faceapiService.getFaceLandmarksFromBlob(blob);
    }
    /**
     * Giving current face in video canvas, get the face landmarks
     * @returns face landmarks
     */
    async getFaceLandMarks() {
        if (this.detectionResult && this.detectionResult.blobImg) {
            return await faceapiService.getFaceLandmarksFromBlob(this.detectionResult.blobImg);
        }
        else {
            return null;
        }
    }
    /**
     * Predicts best face match, uses worker to calculate distance between the given blob and the trained model
     * passed in trainedModel prop
     * @param blob
     * @returns
     */
    async predictBestMatch(blob) {
        console.info("tyrained model es", this.trainedModel);
        if (!this.trainedModel) {
            return null;
        }
        let lm;
        if (!blob) {
            lm = await faceapiService.getFaceLandmarksFromBlob(blob);
        }
        else {
            lm = await this.getFaceLandMarks();
        }
        // for each trained model of this.trainedModels get minimum distance
        const best = await getBestMatch(this.trainedModel, lm.faceLandmarks[0]);
        return best;
    }
    /**
     * Diagnostic method to check detection status
     */
    async getDiagnosticInfo() {
        var _a, _b, _c, _d, _e;
        return {
            // Component state
            cameraState: this.cameraState,
            enableDetection: this.enableDetection,
            loaded: this.loaded,
            detectedFacesCount: this.detectedFacesCount,
            // Video element status
            videoElement: {
                readyState: (_a = this.video) === null || _a === void 0 ? void 0 : _a.readyState,
                videoWidth: (_b = this.video) === null || _b === void 0 ? void 0 : _b.videoWidth,
                videoHeight: (_c = this.video) === null || _c === void 0 ? void 0 : _c.videoHeight,
                currentTime: (_d = this.video) === null || _d === void 0 ? void 0 : _d.currentTime,
                paused: (_e = this.video) === null || _e === void 0 ? void 0 : _e.paused
            },
            // Service status
            faceApiService: {
                isReady: faceapiService.isReady(),
                config: faceapiService.getConfig(),
                performanceStats: faceapiService.getPerformanceStats()
            },
            // Last detection result
            lastDetection: this.detectionResult ? {
                hasDetection: !!this.detectionResult.detection,
                confidence: this.detectionResult.confidence,
                timestamp: this.detectionResult.timestamp
            } : null
        };
    }
    // Helper Methods
    handleError(type, message, originalError) {
        const error = {
            type,
            message,
            originalError
        };
        this.currentError = error;
        this.cameraState = 'error';
        this.cameraError.emit(error);
        console.error('Face API Webcam Error:', error);
    }
    async capturePhoto() {
        try {
            if (this.photoTaken)
                return; // Prevent multiple captures
            this.photoTaken = true;
            // Create a temporary canvas to capture the current frame
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = this.canvas.width;
            tempCanvas.height = this.canvas.height;
            const tempCtx = tempCanvas.getContext('2d');
            // Draw current frame to temporary canvas
            tempCtx.drawImage(this.canvas, 0, 0);
            // Convert to blob
            tempCanvas.toBlob((blob) => {
                if (blob) {
                    console.log('Photo captured automatically:', blob);
                    this.photoCapture.emit(blob);
                }
            }, 'image/jpeg', 0.9);
            // Reset photo flag after delay
            setTimeout(() => {
                this.photoTaken = false;
            }, this.captureDelay);
        }
        catch (error) {
            console.error('Error capturing photo:', error);
            this.photoTaken = false;
        }
    }
    async componentWillLoad() {
        try {
            this.cameraState = 'loading';
            this.currentError = null;
            this.video = createVideo();
            this.canvas = createCanvas(this.el);
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.el.appendChild(this.canvas);
            await faceapiService.initialize();
            console.info("el faceapi es", faceapiService);
            const stream = await initWebcamToVideo(this.video, this.facingMode);
            this.cameraStarted.emit(stream);
            // Wait for video to be ready before starting render loop
            await this.waitForVideoReady();
            renderToCanvas(this.canvas, this.video);
            this.loaded = true;
            if (this.autoStart && this.enableDetection) {
                this.cameraState = 'detecting';
                this.detectionStarted.emit();
            }
            else {
                this.cameraState = 'ready';
            }
            // Start render loop only after video is ready
            requestAnimationFrame(() => {
                this.webcamRender();
            });
        }
        catch (error) {
            this.handleError('INITIALIZATION_ERROR', 'Failed to initialize camera and face detection', error);
        }
    }
    async webcamRender() {
        var _a, _b, _c, _d;
        const startTimeMs = performance.now();
        // Verify video is ready for detection
        if (!this.isVideoElementReady()) {
            console.warn('⚠️ Video element not ready in webcamRender:', {
                readyState: (_a = this.video) === null || _a === void 0 ? void 0 : _a.readyState,
                videoWidth: (_b = this.video) === null || _b === void 0 ? void 0 : _b.videoWidth,
                videoHeight: (_c = this.video) === null || _c === void 0 ? void 0 : _c.videoHeight,
                currentTime: (_d = this.video) === null || _d === void 0 ? void 0 : _d.currentTime
            });
            await pxTimer(this.detectionTimer);
            requestAnimationFrame(() => {
                this.webcamRender();
            });
            return;
        }
        // Detect faces using detectForVideo
        if (this.video.currentTime !== this.lastVideoTime) {
            this.lastVideoTime = this.video.currentTime;
            if (this.enableDetection) {
                try {
                    // get context of canvas and create paning and zoooming to center
                    this.detectionResult = await faceapiService.detectFaceOptimized(this.video, startTimeMs);
                    // Add debugging
                    if (this.detectionResult) {
                        console.log('✅ Face detected in component:', {
                            confidence: this.detectionResult.confidence,
                            timestamp: this.detectionResult.timestamp
                        });
                    }
                    else {
                        console.log('❌ No face detected in component');
                    }
                }
                catch (error) {
                    console.error('❌ Error in webcamRender detection:', error);
                }
            }
        }
        await pxTimer(this.detectionTimer);
        requestAnimationFrame(() => {
            this.webcamRender();
        });
    }
    // Helper method to check if video element is ready
    isVideoElementReady() {
        return (this.video &&
            this.video.readyState >= 2 && // HAVE_CURRENT_DATA or higher
            this.video.videoWidth > 0 &&
            this.video.videoHeight > 0 &&
            !this.video.paused &&
            !this.video.ended &&
            this.video.currentTime > 0);
    }
    // Wait for video to be properly loaded and ready for processing
    async waitForVideoReady(maxWaitMs = 5000) {
        const startTime = Date.now();
        const checkInterval = 50; // Check every 50ms
        return new Promise((resolve, reject) => {
            const checkVideo = () => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                if (this.isVideoElementReady()) {
                    console.log('✅ Video element is ready for processing:', {
                        readyState: this.video.readyState,
                        videoWidth: this.video.videoWidth,
                        videoHeight: this.video.videoHeight,
                        currentTime: this.video.currentTime
                    });
                    resolve();
                    return;
                }
                const elapsed = Date.now() - startTime;
                if (elapsed >= maxWaitMs) {
                    const error = new Error(`Video not ready after ${maxWaitMs}ms`);
                    console.error('❌ Video readiness timeout:', {
                        elapsed,
                        readyState: (_a = this.video) === null || _a === void 0 ? void 0 : _a.readyState,
                        videoWidth: (_b = this.video) === null || _b === void 0 ? void 0 : _b.videoWidth,
                        videoHeight: (_c = this.video) === null || _c === void 0 ? void 0 : _c.videoHeight,
                        currentTime: (_d = this.video) === null || _d === void 0 ? void 0 : _d.currentTime
                    });
                    reject(error);
                    return;
                }
                console.log('⏳ Waiting for video to be ready...', {
                    elapsed: elapsed + 'ms',
                    readyState: (_e = this.video) === null || _e === void 0 ? void 0 : _e.readyState,
                    videoWidth: (_f = this.video) === null || _f === void 0 ? void 0 : _f.videoWidth,
                    videoHeight: (_g = this.video) === null || _g === void 0 ? void 0 : _g.videoHeight,
                    currentTime: (_h = this.video) === null || _h === void 0 ? void 0 : _h.currentTime
                });
                setTimeout(checkVideo, checkInterval);
            };
            checkVideo();
        });
    }
    drawWebcamnToCanvas(ctx) {
        let imgWidth = this.video.videoWidth;
        let imgHeight = this.video.videoHeight;
        var imgSize = Math.min(imgWidth, imgHeight);
        // The following two lines yield a central based cropping.
        // They can both be amended to be 0, if you wish it to be
        // a left based cropped image.
        var left = (imgWidth - imgSize) / 2;
        var top = (imgHeight - imgSize) / 2;
        // ctx clear all
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(this.video, left, top, imgSize, imgSize, 0, 0, this.canvas.width, this.canvas.height);
    }
    render() {
        const hostStyle = {
            height: this.height + "px",
            width: this.width + "px",
        };
        const renderCameraState = () => {
            var _a;
            if (this.cameraState === 'inactive') {
                return (h$1("div", { class: "camera-state" }, h$1("div", { class: "state-icon inactive-icon" }, "\uD83D\uDCF7"), h$1("h3", null, "Camera Inactive"), h$1("p", null, "Click start to begin face detection")));
            }
            if (this.cameraState === 'loading') {
                return (h$1("div", { class: "camera-state" }, h$1("div", { class: "loading-spinner" }), h$1("h3", null, "Starting Camera"), h$1("p", null, "Please allow camera access when prompted")));
            }
            if (this.cameraState === 'error') {
                return (h$1("div", { class: "camera-state" }, h$1("div", { class: "state-icon error-icon" }, "\u26A0\uFE0F"), h$1("h3", null, "Camera Error"), h$1("p", null, ((_a = this.currentError) === null || _a === void 0 ? void 0 : _a.message) || 'Unable to access camera')));
            }
            return null;
        };
        const renderIndicators = () => {
            if (this.cameraState !== 'detecting' && this.cameraState !== 'ready')
                return null;
            return [
                // Auto-capture indicator
                this.autoCapture && (h$1("div", { class: "auto-capture-indicator" }, "AUTO CAPTURE")),
                // Face detection indicator
                this.cameraState === 'detecting' && (h$1("div", { class: `face-indicator ${this.detectedFacesCount > 0 ? 'detected' : 'not-detected'}` }, this.detectedFacesCount > 0 ? `${this.detectedFacesCount} Face${this.detectedFacesCount !== 1 ? 's' : ''} Detected` : 'No Face Detected')),
                // Error message
                this.currentError && (h$1("div", { class: "error-message" }, this.currentError.message))
            ];
        };
        const renderControls = () => {
            if (!this.showControls)
                return null;
            const isLoading = this.cameraState === 'loading';
            return (h$1("div", { class: "camera-controls" }, this.cameraState === 'inactive' || this.cameraState === 'ready' ? (h$1("button", { class: "control-button start-button", onClick: () => this.startDetection(), disabled: isLoading, title: this.startButtonText }, "\u25B6\uFE0F")) : this.cameraState === 'detecting' ? (h$1("button", { class: "control-button stop-button", onClick: () => this.stopDetection(), title: this.stopButtonText }, "\u23F9\uFE0F")) : null, (this.cameraState === 'ready' || this.cameraState === 'detecting') && (h$1("button", { class: "control-button flip-button", onClick: () => this.toggleCamera(), disabled: isLoading, title: this.flipButtonText }, "\uD83D\uDD04"))));
        };
        return (h$1(Host, { style: hostStyle }, h$1("slot", { name: 'before' }), renderCameraState(), renderIndicators(), renderControls(), h$1("slot", null), h$1("slot", { name: 'after' })));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "detectionResult": ["detectionResultChangedHandler"]
    }; }
};
InputFaceApiWebcam.style = inputFaceApiWebcamCss;

export { InputFaceApiWebcam as I, createWorker as c };
//# sourceMappingURL=input-face-api-webcam-CbOdSQuQ.js.map

//# sourceMappingURL=input-face-api-webcam-CbOdSQuQ.js.map