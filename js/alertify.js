!function(a,b){"use strict";var d,c=a.document;d=function(){var i,j,k,l,m,n,o,p,q,r,s,t,u,d={},e={},f=!1,g={ENTER:13,ESC:27,SPACE:32},h=[];return e={buttons:{holder:'<nav class="alertify-buttons">{{buttons}}</nav>',submit:'<button type="submit" class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</button>',ok:'<button class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</button>',cancel:'<button class="alertify-button alertify-button-cancel" id="alertify-cancel">{{cancel}}</button>'},input:'<div class="alertify-text-wrapper"><input type="text" class="alertify-text" id="alertify-text"></div>',message:'<p class="alertify-message">{{message}}</p>',log:'<article class="alertify-log{{class}}">{{message}}</article>'},u=function(){var a,d,e=!1,f=c.createElement("fakeelement"),g={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"};for(a in g)if(f.style[a]!==b){d=g[a],e=!0;break}return{type:d,supported:e}},i=function(a){return c.getElementById(a)},d={labels:{ok:"OK",cancel:"Cancel"},delay:5e3,buttonReverse:!1,buttonFocus:"ok",transition:b,addListeners:function(a){var i,n,o,p,q,b="undefined"!=typeof k,d="undefined"!=typeof j,e="undefined"!=typeof t,f="",h=this;i=function(b){return"undefined"!=typeof b.preventDefault&&b.preventDefault(),o(b),"undefined"!=typeof t&&(f=t.value),"function"==typeof a&&("undefined"!=typeof t?a(!0,f):a(!0)),!1},n=function(b){return"undefined"!=typeof b.preventDefault&&b.preventDefault(),o(b),"function"==typeof a&&a(!1),!1},o=function(){h.hide(),h.unbind(c.body,"keyup",p),h.unbind(l,"focus",q),b&&h.unbind(k,"click",i),d&&h.unbind(j,"click",n)},p=function(a){var b=a.keyCode;(b===g.SPACE&&!e||e&&b===g.ENTER)&&i(a),b===g.ESC&&d&&n(a)},q=function(){e?t.focus():!d||h.buttonReverse?k.focus():j.focus()},this.bind(l,"focus",q),this.bind(m,"focus",q),b&&this.bind(k,"click",i),d&&this.bind(j,"click",n),this.bind(c.body,"keyup",p),this.transition.supported||this.setFocus()},bind:function(a,b,c){"function"==typeof a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c)},handleErrors:function(){if("undefined"!=typeof a.onerror){var b=this;return a.onerror=function(a,c,d){b.error("["+a+" on line "+d+" of "+c+"]",0)},!0}return!1},appendButtons:function(a,b){return this.buttonReverse?b+a:a+b},build:function(a){var b="",c=a.type,f=a.message,g=a.cssClass||"";switch(b+='<div class="alertify-dialog">',b+='<a id="alertify-resetFocusBack" class="alertify-resetFocus" href="#">Reset Focus</a>',"none"===d.buttonFocus&&(b+='<a href="#" id="alertify-noneFocus" class="alertify-hidden"></a>'),"prompt"===c&&(b+='<div id="alertify-form">'),b+='<article class="alertify-inner">',b+=e.message.replace("{{message}}",f),"prompt"===c&&(b+=e.input),b+=e.buttons.holder,b+="</article>","prompt"===c&&(b+="</div>"),b+='<a id="alertify-resetFocus" class="alertify-resetFocus" href="#">Reset Focus</a>',b+="</div>",c){case"confirm":b=b.replace("{{buttons}}",this.appendButtons(e.buttons.cancel,e.buttons.ok)),b=b.replace("{{ok}}",this.labels.ok).replace("{{cancel}}",this.labels.cancel);break;case"prompt":b=b.replace("{{buttons}}",this.appendButtons(e.buttons.cancel,e.buttons.submit)),b=b.replace("{{ok}}",this.labels.ok).replace("{{cancel}}",this.labels.cancel);break;case"alert":b=b.replace("{{buttons}}",e.buttons.ok),b=b.replace("{{ok}}",this.labels.ok)}return q.className="alertify alertify-"+c+" "+g,p.className="alertify-cover",b},close:function(a,b){var e,f,c=b&&!isNaN(b)?+b:this.delay,d=this;this.bind(a,"click",function(){e(a)}),f=function(a){a.stopPropagation(),d.unbind(this,d.transition.type,f),r.removeChild(this),r.hasChildNodes()||(r.className+=" alertify-logs-hidden")},e=function(a){"undefined"!=typeof a&&a.parentNode===r&&(d.transition.supported?(d.bind(a,d.transition.type,f),a.className+=" alertify-log-hide"):(r.removeChild(a),r.hasChildNodes()||(r.className+=" alertify-logs-hidden")))},0!==b&&setTimeout(function(){e(a)},c)},dialog:function(a,b,d,e,g){o=c.activeElement;var i=function(){r&&null!==r.scrollTop&&p&&null!==p.scrollTop||i()};if("string"!=typeof a)throw new Error("message must be a string");if("string"!=typeof b)throw new Error("type must be a string");if("undefined"!=typeof d&&"function"!=typeof d)throw new Error("fn must be a function");return this.init(),i(),h.push({type:b,message:a,callback:d,placeholder:e,cssClass:g}),f||this.setup(),this},extend:function(a){if("string"!=typeof a)throw new Error("extend method must have exactly one paramter");return function(b,c){return this.log(b,a,c),this}},hide:function(){var a,b=this;h.splice(0,1),h.length>0?this.setup(!0):(f=!1,a=function(c){c.stopPropagation(),b.unbind(q,b.transition.type,a)},this.transition.supported?(this.bind(q,this.transition.type,a),q.className="alertify alertify-hide alertify-hidden"):q.className="alertify alertify-hide alertify-hidden alertify-isHidden",p.className="alertify-cover alertify-cover-hidden",o.focus())},init:function(){c.createElement("nav"),c.createElement("article"),c.createElement("section"),null==i("alertify-cover")&&(p=c.createElement("div"),p.setAttribute("id","alertify-cover"),p.className="alertify-cover alertify-cover-hidden",c.body.appendChild(p)),null==i("alertify")&&(f=!1,h=[],q=c.createElement("section"),q.setAttribute("id","alertify"),q.className="alertify alertify-hidden",c.body.appendChild(q)),null==i("alertify-logs")&&(r=c.createElement("section"),r.setAttribute("id","alertify-logs"),r.className="alertify-logs alertify-logs-hidden",c.body.appendChild(r)),c.body.setAttribute("tabindex","0"),this.transition=u()},log:function(a,b,c){var d=function(){r&&null!==r.scrollTop||d()};return this.init(),d(),r.className="alertify-logs",this.notify(a,b,c),this},notify:function(a,b,d){var e=c.createElement("article");e.className="alertify-log"+("string"==typeof b&&""!==b?" alertify-log-"+b:""),e.innerHTML=a,r.appendChild(e),setTimeout(function(){e.className=e.className+" alertify-log-show"},50),this.close(e,d)},set:function(a){var b;if("object"!=typeof a&&a instanceof Array)throw new Error("args must be an object");for(b in a)a.hasOwnProperty(b)&&(this[b]=a[b])},setFocus:function(){t?(t.focus(),t.select()):n.focus()},setup:function(a){var g,c=h[0],e=this;f=!0,g=function(a){a.stopPropagation(),e.setFocus(),e.unbind(q,e.transition.type,g)},this.transition.supported&&!a&&this.bind(q,this.transition.type,g),q.innerHTML=this.build(c),l=i("alertify-resetFocus"),m=i("alertify-resetFocusBack"),k=i("alertify-ok")||b,j=i("alertify-cancel")||b,n="cancel"===d.buttonFocus?j:"none"===d.buttonFocus?i("alertify-noneFocus"):k,t=i("alertify-text")||b,s=i("alertify-form")||b,"string"==typeof c.placeholder&&""!==c.placeholder&&(t.value=c.placeholder),a&&this.setFocus(),this.addListeners(c.callback)},unbind:function(a,b,c){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c)}},{alert:function(a,b,c){return d.dialog(a,"alert",b,"",c),this},confirm:function(a,b,c){return d.dialog(a,"confirm",b,"",c),this},extend:d.extend,init:d.init,log:function(a,b,c){return d.log(a,b,c),this},prompt:function(a,b,c,e){return d.dialog(a,"prompt",b,c,e),this},success:function(a,b){return d.log(a,"success",b),this},error:function(a,b){return d.log(a,"error",b),this},set:function(a){d.set(a)},labels:d.labels,debug:d.handleErrors}},"function"==typeof define?define([],function(){return new d}):"undefined"==typeof a.alertify&&(a.alertify=new d)}(this);
