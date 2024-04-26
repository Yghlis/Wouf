class A{constructor(e){this.properties=e??[]}get(e){const n=this.properties.filter(r=>r.name===e).map(r=>r.value);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,n){const r=this.get(e);if(r!==void 0){if(n!=="json"&&typeof r!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return r}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,n){const r=this.get(e);if(r===void 0)throw new Error('Property "'+e+'" is missing');if(n!=="json"&&typeof r!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return r}getType(e){const n=this.properties.filter(r=>r.name===e).map(r=>r.type);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}}const J="https://unpkg.com/@workadventure/scripting-api-extra@1.8.1/dist";class se{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new A(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function _(t){const e=t?"#"+t.join():"";WA.nav.openCoWebSite(J+"/configuration.html"+e,!0)}async function ie(t,e){const n=await WA.room.getTiledMap(),r=new Map;return Q(n.layers,r,t,e),r}function Q(t,e,n,r){for(const o of t)if(o.type==="objectgroup"){for(const s of o.objects)if(s.type==="variable"||s.class==="variable"){if(n&&o.name!==n||r&&!r.includes(s.name))continue;e.set(s.name,new se(s))}}else o.type==="group"&&Q(o.layers,e,n,r)}let R;async function L(){return R===void 0&&(R=ae()),R}async function ae(){return le(await WA.room.getTiledMap())}function le(t){const e=new Map;return F(t.layers,"",e),e}function F(t,e,n){for(const r of t)r.type==="group"?F(r.layers,e+r.name+"/",n):(r.name=e+r.name,n.set(r.name,r))}async function Z(){const t=await L(),e=[];for(const n of t.values())if(n.type==="objectgroup")for(const r of n.objects)(r.type==="area"||r.class==="area")&&e.push(r);return e}function ce(t){let e=1/0,n=1/0,r=0,o=0;const s=t.data;if(typeof s=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let i=0;i<t.height;i++)for(let a=0;a<t.width;a++)s[a+i*t.width]!==0&&(e=Math.min(e,a),o=Math.max(o,a),n=Math.min(n,i),r=Math.max(r,i));return{top:n,left:e,right:o+1,bottom:r+1}}function ee(t){let e=1/0,n=1/0,r=0,o=0;for(const s of t){const i=ce(s);i.left<e&&(e=i.left),i.top<n&&(n=i.top),i.right>o&&(o=i.right),i.bottom>r&&(r=i.bottom)}return{top:n,left:e,right:o,bottom:r}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var ue=Object.prototype.toString,S=Array.isArray||function(e){return ue.call(e)==="[object Array]"};function I(t){return typeof t=="function"}function fe(t){return S(t)?"array":typeof t}function x(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function D(t,e){return t!=null&&typeof t=="object"&&e in t}function pe(t,e){return t!=null&&typeof t!="object"&&t.hasOwnProperty&&t.hasOwnProperty(e)}var he=RegExp.prototype.test;function ge(t,e){return he.call(t,e)}var de=/\S/;function ye(t){return!ge(de,t)}var me={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function ve(t){return String(t).replace(/[&<>"'`=\/]/g,function(n){return me[n]})}var we=/\s*/,be=/\s+/,N=/\s*=/,Ae=/\s*\}/,We=/#|\^|\/|>|\{|&|=|!/;function Se(t,e){if(!t)return[];var n=!1,r=[],o=[],s=[],i=!1,a=!1,l="",u=0;function p(){if(i&&!a)for(;s.length;)delete o[s.pop()];else s=[];i=!1,a=!1}var d,m,T;function C(w){if(typeof w=="string"&&(w=w.split(be,2)),!S(w)||w.length!==2)throw new Error("Invalid tags: "+w);d=new RegExp(x(w[0])+"\\s*"),m=new RegExp("\\s*"+x(w[1])),T=new RegExp("\\s*"+x("}"+w[1]))}C(e||g.tags);for(var f=new P(t),v,c,y,E,k,b;!f.eos();){if(v=f.pos,y=f.scanUntil(d),y)for(var B=0,oe=y.length;B<oe;++B)E=y.charAt(B),ye(E)?(s.push(o.length),l+=E):(a=!0,n=!0,l+=" "),o.push(["text",E,v,v+1]),v+=1,E===`
`&&(p(),l="",u=0,n=!1);if(!f.scan(d))break;if(i=!0,c=f.scan(We)||"name",f.scan(we),c==="="?(y=f.scanUntil(N),f.scan(N),f.scanUntil(m)):c==="{"?(y=f.scanUntil(T),f.scan(Ae),f.scanUntil(m),c="&"):y=f.scanUntil(m),!f.scan(m))throw new Error("Unclosed tag at "+f.pos);if(c==">"?k=[c,y,v,f.pos,l,u,n]:k=[c,y,v,f.pos],u++,o.push(k),c==="#"||c==="^")r.push(k);else if(c==="/"){if(b=r.pop(),!b)throw new Error('Unopened section "'+y+'" at '+v);if(b[1]!==y)throw new Error('Unclosed section "'+b[1]+'" at '+v)}else c==="name"||c==="{"||c==="&"?a=!0:c==="="&&C(y)}if(p(),b=r.pop(),b)throw new Error('Unclosed section "'+b[1]+'" at '+f.pos);return Ee(Ce(o))}function Ce(t){for(var e=[],n,r,o=0,s=t.length;o<s;++o)n=t[o],n&&(n[0]==="text"&&r&&r[0]==="text"?(r[1]+=n[1],r[3]=n[3]):(e.push(n),r=n));return e}function Ee(t){for(var e=[],n=e,r=[],o,s,i=0,a=t.length;i<a;++i)switch(o=t[i],o[0]){case"#":case"^":n.push(o),r.push(o),n=o[4]=[];break;case"/":s=r.pop(),s[5]=o[2],n=r.length>0?r[r.length-1][4]:e;break;default:n.push(o)}return e}function P(t){this.string=t,this.tail=t,this.pos=0}P.prototype.eos=function(){return this.tail===""};P.prototype.scan=function(e){var n=this.tail.match(e);if(!n||n.index!==0)return"";var r=n[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};P.prototype.scanUntil=function(e){var n=this.tail.search(e),r;switch(n){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=r.length,r};function W(t,e){this.view=t,this.cache={".":this.view},this.parent=e}W.prototype.push=function(e){return new W(e,this)};W.prototype.lookup=function(e){var n=this.cache,r;if(n.hasOwnProperty(e))r=n[e];else{for(var o=this,s,i,a,l=!1;o;){if(e.indexOf(".")>0)for(s=o.view,i=e.split("."),a=0;s!=null&&a<i.length;)a===i.length-1&&(l=D(s,i[a])||pe(s,i[a])),s=s[i[a++]];else s=o.view[e],l=D(o.view,e);if(l){r=s;break}o=o.parent}n[e]=r}return I(r)&&(r=r.call(this.view)),r};function h(){this.templateCache={_cache:{},set:function(e,n){this._cache[e]=n},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}h.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};h.prototype.parse=function(e,n){var r=this.templateCache,o=e+":"+(n||g.tags).join(":"),s=typeof r<"u",i=s?r.get(o):void 0;return i==null&&(i=Se(e,n),s&&r.set(o,i)),i};h.prototype.render=function(e,n,r,o){var s=this.getConfigTags(o),i=this.parse(e,s),a=n instanceof W?n:new W(n,void 0);return this.renderTokens(i,a,r,e,o)};h.prototype.renderTokens=function(e,n,r,o,s){for(var i="",a,l,u,p=0,d=e.length;p<d;++p)u=void 0,a=e[p],l=a[0],l==="#"?u=this.renderSection(a,n,r,o,s):l==="^"?u=this.renderInverted(a,n,r,o,s):l===">"?u=this.renderPartial(a,n,r,s):l==="&"?u=this.unescapedValue(a,n):l==="name"?u=this.escapedValue(a,n,s):l==="text"&&(u=this.rawValue(a)),u!==void 0&&(i+=u);return i};h.prototype.renderSection=function(e,n,r,o,s){var i=this,a="",l=n.lookup(e[1]);function u(m){return i.render(m,n,r,s)}if(l){if(S(l))for(var p=0,d=l.length;p<d;++p)a+=this.renderTokens(e[4],n.push(l[p]),r,o,s);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")a+=this.renderTokens(e[4],n.push(l),r,o,s);else if(I(l)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(n.view,o.slice(e[3],e[5]),u),l!=null&&(a+=l)}else a+=this.renderTokens(e[4],n,r,o,s);return a}};h.prototype.renderInverted=function(e,n,r,o,s){var i=n.lookup(e[1]);if(!i||S(i)&&i.length===0)return this.renderTokens(e[4],n,r,o,s)};h.prototype.indentPartial=function(e,n,r){for(var o=n.replace(/[^ \t]/g,""),s=e.split(`
`),i=0;i<s.length;i++)s[i].length&&(i>0||!r)&&(s[i]=o+s[i]);return s.join(`
`)};h.prototype.renderPartial=function(e,n,r,o){if(r){var s=this.getConfigTags(o),i=I(r)?r(e[1]):r[e[1]];if(i!=null){var a=e[6],l=e[5],u=e[4],p=i;l==0&&u&&(p=this.indentPartial(i,u,a));var d=this.parse(p,s);return this.renderTokens(d,n,r,p,o)}}};h.prototype.unescapedValue=function(e,n){var r=n.lookup(e[1]);if(r!=null)return r};h.prototype.escapedValue=function(e,n,r){var o=this.getConfigEscape(r)||g.escape,s=n.lookup(e[1]);if(s!=null)return typeof s=="number"&&o===g.escape?String(s):o(s)};h.prototype.rawValue=function(e){return e[1]};h.prototype.getConfigTags=function(e){return S(e)?e:e&&typeof e=="object"?e.tags:void 0};h.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!S(e))return e.escape};var g={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){M.templateCache=t},get templateCache(){return M.templateCache}},M=new h;g.clearCache=function(){return M.clearCache()};g.parse=function(e,n){return M.parse(e,n)};g.render=function(e,n,r,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+fe(e)+'" was given as the first argument for mustache#render(template, view, partials)');return M.render(e,n,r,o)};g.escape=ve;g.Scanner=P;g.Context=W;g.Writer=h;class te{constructor(e,n){this.template=e,this.state=n,this.ast=g.parse(e)}getValue(){return this.value===void 0&&(this.value=g.render(this.template,this.state)),this.value}onChange(e){const n=[];for(const r of this.getUsedVariables().values())n.push(this.state.onVariableChange(r).subscribe(()=>{const o=g.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const r of n)r.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,n){for(const r of e){const o=r[0],s=r[1],i=r[4];["name","&","#","^"].includes(o)&&n.add(s),i!==void 0&&typeof i!="string"&&this.recursiveGetUsedVariables(i,n)}}}async function Me(){var t;const e=await Z();for(const n of e){const r=(t=n.properties)!==null&&t!==void 0?t:[];for(const o of r){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const s=new te(o.value,WA.state);if(s.isPureString())continue;const i=s.getValue();await q(n.name,o.name,i),s.onChange(async a=>{await q(n.name,o.name,a)})}}}async function Le(){var t;const e=await L();for(const[n,r]of e.entries())if(r.type!=="objectgroup"){const o=(t=r.properties)!==null&&t!==void 0?t:[];for(const s of o){if(s.type==="int"||s.type==="bool"||s.type==="object"||typeof s.value!="string")continue;const i=new te(s.value,WA.state);if(i.isPureString())continue;const a=i.getValue();$(n,s.name,a),i.onChange(l=>{$(n,s.name,l)})}}}async function q(t,e,n){console.log(t),(await WA.room.area.get(t)).setProperty(e,n)}function $(t,e,n){WA.room.setProperty(t,e,n),e==="visible"&&(n?WA.room.showLayer(t):WA.room.hideLayer(t))}const Pe="https://admin.workadventu.re/html";let V,U=0,O=0;function z(t){if(WA.state[t.name]){let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.showLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.hideLayer(n)}else{let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.hideLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.showLayer(n)}}function Te(t){const e=t.properties.getString("openSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=re(t.properties.mustGetString("openLayer").split(`
`));if(o>n)return;r=1-o/n}e&&WA.sound.loadSound(e).play({volume:r})}function ke(t){const e=t.properties.getString("closeSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=re(t.properties.mustGetString("closeLayer").split(`
`));if(o>n)return;r=1-o/n}e&&WA.sound.loadSound(e).play({volume:r})}function ne(t){return t.map(e=>V.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function re(t){const e=ne(t),n=ee(e),r=((n.right-n.left)/2+n.left)*32,o=((n.bottom-n.top)/2+n.top)*32;return Math.sqrt(Math.pow(U-r,2)+Math.pow(O-o,2))}function Be(t){WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]?Te(t):ke(t),z(t)}),z(t)}function K(t,e,n,r){const o=t.name;let s,i,a=!1;const l=n.getString("tag");let u=!0;l&&!WA.player.tags.includes(l)&&(u=!1);const p=!!l;function d(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=n.getString("closeTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,m()}})}function m(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=n.getString("openTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,d()}})}function T(){let c;if(t.type==="tilelayer")c=ee(ne(e.properties.mustGetString("closeLayer").split(`
`)));else{if(t.x===void 0||t.y===void 0||t.width===void 0||t.height===void 0)throw new Error(`Doorstep zone "${t.name}" is missing x, y, width or height`);c={top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}i=WA.room.website.create({name:"doorKeypad"+o,url:r+"/keypad.html#"+encodeURIComponent(o),position:{x:c.right*32,y:c.top*32,width:32*3,height:32*4},allowApi:!0})}function C(){i&&(WA.room.website.delete(i.name),i=void 0)}function f(){if(a=!0,n.getBoolean("autoOpen")&&u){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(p&&!u||!p)&&(n.getString("code")||n.getString("codeVariable"))){T();return}u&&(WA.state[e.name]?d():m())}function v(){a=!1,n.getBoolean("autoClose")&&(WA.state[e.name]=!1),s&&s.remove(),C()}t.type==="tilelayer"?(WA.room.onEnterLayer(o).subscribe(f),WA.room.onLeaveLayer(o).subscribe(v)):(WA.room.area.onEnter(o).subscribe(f),WA.room.area.onLeave(o).subscribe(v)),WA.state.onVariableChange(e.name).subscribe(()=>{a&&(!n.getBoolean("autoClose")&&WA.state[e.name]===!0&&d(),i&&WA.state[e.name]===!0&&C(),!n.getBoolean("autoOpen")&&WA.state[e.name]===!1&&m())})}function Re(t){const e=t.properties.mustGetString("bellSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=Math.sqrt(Math.pow(t.x-U,2)+Math.pow(t.y-O,2));if(o>n)return;r=1-o/n}WA.sound.loadSound(e).play({volume:r})}function xe(t){WA.state[t.name]===void 0&&(WA.state[t.name]=0),WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]&&Re(t)})}function Y(t,e,n){let r;const o=e.getString("bellPopup");if(n.type==="tilelayer"){const s=n.name;WA.room.onEnterLayer(s).subscribe(()=>{var i;o?r=WA.ui.openPopup(o,"",[{label:(i=e.getString("bellButtonText"))!==null&&i!==void 0?i:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.onLeaveLayer(s).subscribe(()=>{r&&(r.close(),r=void 0)})}else{const s=n.name;WA.room.area.onEnter(s).subscribe(()=>{var i;o?r=WA.ui.openPopup(o,"",[{label:(i=e.getString("bellButtonText"))!==null&&i!==void 0?i:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.area.onLeave(s).subscribe(()=>{r&&(r.close(),r=void 0)})}}async function je(t){t=t??Pe;const e=await ie();V=await L();for(const n of e.values())n.properties.get("door")&&Be(n),n.properties.get("bell")&&xe(n);for(const n of V.values()){const r=new A(n.properties),o=r.getString("doorVariable");if(o&&n.type==="tilelayer"){const i=e.get(o);if(i===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+n.name+'"');K(n,i,r,t)}const s=r.getString("bellVariable");s&&n.type==="tilelayer"&&Y(s,r,n)}for(const n of await Z()){const r=new A(n.properties),o=r.getString("doorVariable");if(o){const i=e.get(o);if(i===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of object "'+n.name+'"');K(n,i,r,t)}const s=r.getString("bellVariable");s&&Y(s,r,n)}WA.player.onPlayerMove(n=>{U=n.x,O=n.y})}function Ge(t,e){const n=t.getString("bindVariable");if(n){const r=t.get("enterValue"),o=t.get("leaveValue"),s=t.getString("triggerMessage"),i=t.getString("tag");Ve(n,e,r,o,s,i)}}function Ve(t,e,n,r,o,s){s&&!WA.player.tags.includes(s)||(n!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[t]=n)}),r!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[t]=r}))}async function Ie(){const t=await L();for(const e of t.values()){const n=new A(e.properties);Ge(n,e.name)}}let H;async function Ue(t){const e=await WA.room.getTiledMap();t=t??J,H=await L();const n=e.layers.find(r=>r.name==="configuration");if(n){const o=new A(n.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(t+"/configuration.html",!0)});for(const s of H.values()){const i=new A(s.properties),a=i.getString("openConfig");a&&s.type==="tilelayer"&&Oe(a.split(","),s.name,i)}}}function Oe(t,e,n){let r;const o=n.getString("openConfigAdminTag");let s=!0;o&&!WA.player.tags.includes(o)&&(s=!1);function i(){var l;r&&r.remove(),r=WA.ui.displayActionMessage({message:(l=n.getString("openConfigTriggerMessage"))!==null&&l!==void 0?l:"Press SPACE or touch here to configure",callback:()=>_(t)})}function a(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const l=n.getString("openConfigTrigger");s&&(l&&l==="onaction"?i():_(t))}),WA.room.onLeaveLayer(e).subscribe(()=>{r&&r.remove(),a()})}function _e(){return WA.onInit().then(()=>{je().catch(t=>console.error(t)),Ie().catch(t=>console.error(t)),Ue().catch(t=>console.error(t)),Le().catch(t=>console.error(t)),Me().catch(t=>console.error(t))}).catch(t=>console.error(t))}console.log("Script started successfully");let j={x:0,y:0},X="down",G;WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("CA MARCHE"),G=WA.ui.website.open({url:"./src/cgu/index.html",position:{vertical:"top",horizontal:"middle"},size:{height:"30vh",width:"50vw"},margin:{top:"10vh"},allowApi:!0}),window.addEventListener("message",t=>{t.data.action==="closeCGU"&&G&&(G.close(),console.log("CGU window closed"))}),WA.player.onPlayerMove(t=>{j={x:t.x,y:t.y},X=t.direction}),WA.room.area.onEnter("jitsiMeetingRoom").subscribe(async()=>{console.log(`The player ${WA.player.name} has entered the zone.`);const t=WA.player.tags;if(console.log("Player tags:",t),t.includes("administrateur"))console.log("Welcome to the jitsiMeetingRoom!");else{console.log('Access denied to the jitsiMeetingRoom. You do not have the "admin" role.');let e=j.x,n=j.y;switch(X){case"down":n-=1;break;case"up":n+=1;break;case"left":e+=1;break;case"right":e-=1;break}await WA.player.teleport(e,n),WA.ui.displayActionMessage({message:"You cannot access this conference, please contact an administrator if the problem persists",callback:()=>console.log("The player has confirmed the message."),type:"warning"})}}),WA.ui.actionBar.addButton({id:"register-btn",type:"action",imageSrc:"http://localhost:5173/tilesets/iconsheesh.png",toolTip:"Register",callback:t=>{console.log("Button clicked",t),WA.ui.modal.openModal({title:"ash",src:"http://localhost:5173/src/ash.html",allow:"fullscreen",position:"center",allowApi:!0})}}),WA.player.setOutlineColor(255,0,0),_e().then(()=>{console.log("Scripting API Extra ready")}).catch(t=>console.error(t))}).catch(t=>console.error(t));