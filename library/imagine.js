!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("mobx")):"function"==typeof define&&define.amd?define(["mobx"],n):"object"==typeof exports?exports.imagine=n(require("mobx")):e.imagine=n(e.mobx)}(window,(function(e){return function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/dist/",t(t.s=1)}([function(n,t){n.exports=e},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.bindingEngine=n.scopes=n.contexts=n.bind=void 0;var r=new(t(3).Imagine),i=t(0);Object.defineProperty(n,"observable",{enumerable:!0,get:function(){return i.observable}}),Object.defineProperty(n,"computed",{enumerable:!0,get:function(){return i.computed}}),n.bind=r.bind,n.contexts=r.bindingEngine.boundElements,n.scopes=r.bindingEngine.scopes,n.bindingEngine=r.bindingEngine},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.BindingContext=void 0;var r=function(){this.propertyName="",this.preventCircularUpdate=!1};n.BindingContext=r},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.Imagine=void 0;var r=t(4),i=t(2),a=function(){function e(){var e=this;this.bind=function(n,t){if("#document-fragment"===(n=n||document.getElementsByTagName("body")[0]).nodeName)for(var r=0;r<n.childNodes.length;r++){var a=new Map,o=new i.BindingContext;o.vm=t,a.set("template",o),e.bindingEngine.boundElements.set(n.childNodes[r],a)}e.recursiveBindNodes(n,t)},this.bindingEngine=new r.BindingEngine}return e.prototype.recursiveBindNodes=function(e,n){for(var t=[],r=0;r<e.childNodes.length;r++)t.push(e.childNodes[r]);if(1===e.nodeType&&this.bindAttributes(e,n),3===e.nodeType&&this.bindInlinedText(e,n),e.childNodes.length>0)for(r=0;r<e.childNodes.length;r++)t.indexOf(e.childNodes[r])>-1&&this.recursiveBindNodes(e.childNodes[r],n)},e.prototype.bindAttributes=function(e,n){for(var t=[],r=e.attributes.length-1;r>=0;r--){(o=this.bindingEngine.parseBinding(e.attributes[r].name,e.attributes[r].value,n))&&(t.push(o),e.removeAttribute(e.attributes[r].name))}for(var i=0,a=t;i<a.length;i++){var o=a[i];this.bindingEngine.bindInitPhase(e,o,n)}for(var d=0,u=t;d<u.length;d++){o=u[d];this.bindingEngine.bindUpdatePhase(e,o,n)}},e.prototype.bindInlinedText=function(e,n){if(/\${[a-zA-Z']*}/.test(e.textContent)){for(var t=e.textContent.split(/\${[a-zA-Z']*}/),r=e.textContent.match(/\${[a-zA-Z']*}/gm),i=[],a=0;a<t.length;a++){i.push(document.createTextNode(t[a]));var o=document.createElement("span");if(r[a]){var d=this.bindingEngine.parseBinding("@text",r[a].substring(2,r[a].length-1),n);d&&(this.bindingEngine.bindInitPhase(o,d,n),this.bindingEngine.bindUpdatePhase(o,d,n),i.push(o))}}e.replaceWith.apply(e,i)}},e}();n.Imagine=a},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.BindingEngine=void 0;var r=t(0),i=t(5),a=t(2),o=t(6),d=function(){function e(){var n=this;this.parseBinding=function(e,t,i){var a;switch(e[0]){case"@":a={handler:e.substr(1),parameter:"",propertyName:t,bindingValue:null};break;case":":a={handler:"__property",parameter:e.substr(1),propertyName:t,bindingValue:null};break;case"_":a={handler:"__attribute",parameter:e.substr(1),propertyName:t,bindingValue:null};break;case"#":a={handler:"__event",parameter:e.substr(1),propertyName:t,bindingValue:null};break;default:return null}var o=i;if(t.indexOf(".")>-1){var d=t.split(".")[0];if(t=t.split(".")[1],!n.scopes.has(d))throw"Undefined scope: "+d;o=n.scopes.get(d)}if(o instanceof Object)if(t in o)r.isObservableArray(o[t])?a.bindingValue=o[t]:r.isObservableProp(o,t)?a.bindingValue=r.getAtom(o,t):"function"==typeof o[t]&&(a.bindingValue=o[t]);else{var u=/(\w+)\s*\?\s*\'([\w\s:!+=]+)'\s*:\s*'([\w\s:!+=]+)'/gm;if(t.match(u)){var l=u.exec(t),s=l[1];if(!(s in o))return null;var c=r.computed((function(){return o[s]?l[2]:l[3]}));a.propertyName=s,a.bindingValue=c}else{if("!"!=t[0])return null;c=r.computed((function(){return!o[t.substr(1)]}));a.propertyName=t.substr(1),a.bindingValue=c}}else"this"===t&&(a.bindingValue=o);return a},this.bindInitPhase=function(t,i,o){var d,u,l,s=e.handlers[i.handler];n.boundElements.has(t)?u=n.boundElements.get(t):(u=new Map,n.boundElements.set(t,u));var c=i.handler+":"+i.parameter;u.has(c)||((l=new a.BindingContext).vm=o,l.propertyName=i.propertyName,l.parameter=i.parameter,u.set(c,l),null===(d=s.init)||void 0===d||d.call(n,t,n.unwrap(i.bindingValue),l,(function(e){"this"!==i.propertyName&&(l.preventCircularUpdate=!0,r.isObservable(i.bindingValue)?i.bindingValue.set(e):i.bindingValue=e)})))},this.bindUpdatePhase=function(t,i,a){var o=e.handlers[i.handler],d=n.boundElements.get(t),u=i.handler+":"+i.parameter,l=d.get(u);if(o.update){var s=function(e){var r=n.unwrap(i.bindingValue);l.preventCircularUpdate||o.update(t,r,l,e),l.preventCircularUpdate=!1};r.isObservable(i.bindingValue)&&(r.isObservableArray(i.bindingValue)&&r.observe(l.vm,i.propertyName,(function(e){s(e),r.observe(l.vm[i.propertyName],s)})),r.observe(i.bindingValue,s)),s()}},this.boundElements=new WeakMap,this.scopes=new Map}return e.prototype.unwrap=function(e){return r.isObservableArray(e)||!r.isObservable(e)?e:e.get()},e.handlers={},e}();n.BindingEngine=d,d.handlers.text=new i.TextHandler,d.handlers.value=new i.ValueHandler,d.handlers.foreach=new i.ForEachHandler,d.handlers.context=new i.ContextHandler,d.handlers.html=new i.HtmlHandler,d.handlers.visible=new i.VisibleHandler,d.handlers.__attribute=new i.AttributeHandler,d.handlers.__property=new o.PropertyHandler,d.handlers.__event=new i.EventHandler},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.ForEachHandler=n.HtmlHandler=n.ContextHandler=n.AttributeHandler=n.EventHandler=n.ValueHandler=n.VisibleHandler=n.TextHandler=n.BindingHandler=void 0;var r=t(1),i=t(0),a=function(){};n.BindingHandler=a;var o=function(){function e(){}return e.prototype.update=function(e,n){e.innerText=n},e}();n.TextHandler=o;var d=function(){var e=this;this.init=function(n){e.initialValue=getComputedStyle(n).display},this.update=function(n,t){n.style.display=t?e.initialValue:"none"}};n.VisibleHandler=d;var u=function(){function e(){}return e.prototype.init=function(e,n,t,r){e.addEventListener("input",(function(){r(e.value)}))},e.prototype.update=function(e,n){e.value=n},e}();n.ValueHandler=u;var l=function(){function e(){}return e.prototype.init=function(e,n,t){"function"==typeof n&&e.addEventListener(t.parameter,(function(e){n(t.vm,e)}))},e}();n.EventHandler=l;var s=function(){function e(){}return e.prototype.update=function(e,n,t){e.setAttribute(t.parameter,n)},e}();n.AttributeHandler=s;var c=function(){function e(){}return e.prototype.init=function(e,n,t,i){for(var a=document.createDocumentFragment();e.childNodes.length>0;)a.appendChild(e.childNodes[0]);r.scopes.set(t.propertyName,t.vm),t.template=a},e.prototype.update=function(e,n,t,i){if(e.innerText="",null!=n&&t.template){var a=t.template.cloneNode(!0);r.bind(a,n),e.appendChild(a)}},e}();n.ContextHandler=c;var p=function(){function e(){}return e.prototype.update=function(e,n,t,i){if(e.innerText="",null!=n){var a=document.createElement("template");a.innerHTML=n,e.appendChild(a.content),setTimeout((function(){for(var n=0;n<e.childNodes.length;n++)r.bind(e.childNodes[n],t.vm)}),0)}},e}();n.HtmlHandler=p;var f=function(){function e(){}return e.prototype.init=function(e,n,t,i){for(var a=document.createDocumentFragment();e.childNodes.length>0;)a.appendChild(e.childNodes[0]);r.scopes.set(t.propertyName,t.vm),t.template=a},e.prototype.update=function(e,n,t,a){if(a&&"splice"===a.type){for(var o=0,d=a.added;o<d.length;o++){m(s=d[o])}for(var u=0,l=a.removed;u<l.length;u++)for(var s=l[u],c=e.childNodes.length-1;c>=0;c--){if(r.contexts.has(e.childNodes[c])&&r.contexts.get(e.childNodes[c]).has("template"))s===r.contexts.get(e.childNodes[c]).get("template").vm&&e.childNodes[c].remove()}}else if(a&&"update"===a.type){e.innerHTML="";for(var p=0,f=a.newValue;p<f.length;p++){m(s=f[p])}}else for(var b=0,v=n;b<v.length;b++){m(s=v[b])}function m(n){if(t.template){var a=t.template.cloneNode(!0);r.bind(a,n);for(var o=function(t){var o=a.childNodes[t];1===o.nodeType&&setTimeout((function(){if("selecteditem"in e&&"selected"in o){var t={selected:i.observable.box(!1)},a=!1;i.observe(t.selected,(function(t){!0!==t.newValue||a||(a=!0,e.selecteditem=n),a=!1})),e.selecteditem===n&&setTimeout((function(){o.selected=!0}),10),i.observe(e,"selecteditem",(function(e){a||(a=!0,e.newValue===n?o.selected=!0:o.selected=!1),a=!1}));var d={handler:"__property",propertyName:"selected",bindingValue:t.selected,parameter:"selected"};r.bindingEngine.bindInitPhase(o,d,t),r.bindingEngine.bindUpdatePhase(o,d,t)}}),0)},d=0;d<a.childNodes.length;d++)o(d);e.appendChild(a)}}},e}();n.ForEachHandler=f},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.PropertyHandler=void 0;var r=t(0),i=function(){function e(){}return e.prototype.init=function(e,n,t,i){setTimeout((function(){var n=t.parameter,a=function e(n,t){if(n.hasOwnProperty(t))return Object.getOwnPropertyDescriptor(n,t);var r=Object.getPrototypeOf(n);return r?e(r,t):void 0}(e,n);if(a)Object.defineProperty(e,n,{enumerable:a.enumerable||!1,configurable:a.enumerable||!1,get:a.get,set:function(n){a.set&&a.set.call(e,n),t.preventCircularUpdate||i(n),t.preventCircularUpdate=!1}});else{var o=r.observable.box(),d={};Object.defineProperty(d,n,{enumerable:!0,configurable:!0,get:function(){return o.get()},set:function(e){o.set(e),t.preventCircularUpdate||(t.preventCircularUpdate=!0,i(e)),t.preventCircularUpdate=!1}}),r.extendObservable(e,d)}}),0)},e.prototype.update=function(e,n,t,r){setTimeout((function(){t.preventCircularUpdate=!0,e[t.parameter]=n}),0)},e}();n.PropertyHandler=i}])}));