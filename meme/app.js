(function(){if(window.__mc)return;window.__mc=1;var T='',S=null,ST=document.createElement('style');
ST.textContent="#mcb{position:fixed;right:12px;bottom:12px;z-index:99998;background:#c4f45c;color:#000;border:0;border-radius:20px;padding:10px 16px;font:700 14px system-ui;box-shadow:0 4px 14px #0008}#mcs{position:fixed;inset:0;z-index:99999;background:#000b;display:none}#mcs.o{display:block}#mcp{position:absolute;left:0;right:0;bottom:0;max-height:88vh;overflow:auto;background:#121214;border-top:1px solid #232327;border-radius:14px 14px 0 0;padding:14px 14px 28px;color:#f5f5f7;font:14px system-ui}#mcp h3{margin:0 0 4px;font-size:17px;display:flex;align-items:center}#mcp h3 .x{margin-left:auto;background:none;border:0;color:#8e8e93;font-size:22px}#mcp .n{color:#8e8e93;font-size:12px;line-height:1.5;margin:0 0 10px}#mcp .tb{display:flex;gap:8px;margin-bottom:12px}#mcp button{font:600 13px system-ui;border-radius:8px;border:1px solid #2b2b31;background:#1c1c1f;color:#f5f5f7;padding:8px 10px}#mcp button:disabled{opacity:.45}#mcp .rd{background:#3a1519;border-color:#f6465d55;color:#ff6b7d}#mcp .wl{flex:1;color:#8e8e93}#mcp .c{background:#1c1c1f;border:1px solid #232327;border-radius:10px;padding:10px;margin-bottom:10px}#mcp .h{display:flex;align-items:baseline;gap:8px;margin-bottom:8px}#mcp .h b{font-size:15px}#mcp .h .i{color:#8e8e93;font-size:12px}#mcp .h .p{margin-left:auto;font:700 14px ui-monospace,monospace}.up{color:#25c26e}.dn{color:#f6465d}#mcp .g{display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:6px;align-items:end;margin-bottom:8px}#mcp label{font-size:11px;color:#8e8e93}#mcp input{width:100%;margin-top:2px;background:#0b0b0d;border:1px solid #2b2b31;border-radius:6px;color:#f5f5f7;padding:7px;font:14px ui-monospace,monospace}#mcp .a{display:flex;gap:6px}#mcp .a button{flex:1}#mcp .pd{color:#f0b90b;font-size:12px;margin-top:6px}#mcp .e{color:#8e8e93;text-align:center;padding:20px 0}";
document.head.appendChild(ST);var b=document.createElement('button');b.id='mcb';b.textContent='持倉管理';document.body.appendChild(b);
var s=document.createElement('div');s.id='mcs';s.innerHTML="<div id=mcp><h3>持倉管理（紙上）<button class=x aria-label=關閉>×</button></h3><p class=n>僅限紙上模擬，不會下真單。「賺到 $」以剩餘持倉未實現獲利（美元）計算，「賺到 %／停損 %」以進場價漲跌計算，任一先達到即平倉，於下一輪出場檢查（約 10 秒）生效；系統原有的停損與出場規則仍然有效。「套保」＝紙上減倉：迷因幣現貨無法做空，因此以賣出部分持倉降低曝險。</p><div class=tb><button class=rd id=mca>全部平倉</button><button class=wl disabled title=未開放>連結錢包（未開放）</button></div><div id=mcl></div></div>";
document.body.appendChild(s);var L=s.querySelector('#mcl');
function E(t,c,x,p){var e=document.createElement(t);if(c)e.className=c;if(x!=null&&x!==0)e.textContent=x;if(p)p.appendChild(e);return e}
function api(u,d){return fetch('/meme/ctl/'+u,d?{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json','X-Req':'1','X-CSRF':T},body:JSON.stringify(d)}:{credentials:'same-origin',cache:'no-store'}).then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(r.status===403&&!d){location.href='/perp-dash/login?next=/meme';throw 0}if(!r.ok)throw Error(j.err||('HTTP '+r.status));return j})})}
function inp(lb,v,ph,p){var w=E('div',0,0,p);E('label',0,lb,w);var i=E('input',0,0,w);i.type='text';i.inputMode='decimal';i.placeholder=ph;i.value=v==null?'':v;return i}
function nm(v){v=String(v).trim();return v===''?null:Number(v)}
function draw(){L.textContent='';var o=S.open||[];s.querySelector('#mca').disabled=!o.length;if(!o.length){E('div','e','目前沒有持倉',L);return}
o.forEach(function(x){var c=E('div','c',0,L),h=E('div','h',0,c);E('b',0,x.symbol,h);E('span','i','#'+x.id+(x.left<0.999?' · 剩 '+Math.round(x.left*100)+'%':''),h);
if(x.pct!=null)E('span','p '+(x.pct>=0?'up':'dn'),(x.pct>0?'+':'')+x.pct.toFixed(1)+'%',h);
var g=E('div','g',0,c),us=inp('賺到 $ 離場',x.u,'例 100',g),tp=inp('賺到 % 離場',x.tp,'例 50',g),sl=inp('停損 %（−）',x.sl,'例 -20',g),sv=E('button',0,'儲存',g);
sv.onclick=function(){var w=nm(us.value),a=nm(tp.value),z=nm(sl.value);if(z!=null&&z>0)z=-z;act('set',{id:x.id,u:w,tp:a,sl:z},'已儲存')};
var a=E('div','a',0,c);[[0.25,'減倉 25%'],[0.5,'減倉 50%'],[1,'平倉 100%']].forEach(function(f){var k=E('button',f[0]==1?'rd':0,f[1],a);k.onclick=function(){if(confirm((f[0]==1?'確定紙上平倉 ':'確定紙上減倉 '+f[0]*100+'%（剩餘部位）')+x.symbol+'？'))act('reduce',{id:x.id,f:f[0]},'已送出，下一輪出場檢查執行')}});
if(x.pend)E('div','pd','處理中：'+(x.pend>=1?'平倉':'減倉 '+Math.round(x.pend*100)+'%'),c)})}
function act(u,d,ok){api(u,d).then(function(j){S=j;T=j.csrf||T;draw();alert(ok)}).catch(function(e){if(e)alert('失敗：'+e.message)})}
function load(){return api('state').then(function(j){S=j;T=j.csrf;draw()}).catch(function(e){if(e){L.textContent='';E('div','e','載入失敗：'+e.message,L)}})}
s.querySelector('#mca').onclick=function(){var n=(S&&S.open||[]).length;if(n&&confirm('確定紙上平倉全部 '+n+' 筆持倉？此動作無法復原。'))act('closeall',{confirm:true},'已送出全部平倉')};
b.onclick=function(){s.classList.add('o');load()};s.querySelector('.x').onclick=function(){s.classList.remove('o')};s.onclick=function(e){if(e.target===s)s.classList.remove('o')};
setInterval(function(){if(s.classList.contains('o')&&!document.hidden)load()},10000)})();

(function(){if(window.__mca)return;window.__mca=1;var T='',st=document.createElement('style');
st.textContent="#mcall{background:#1c1c1f;border:1px solid #c4f45c55;border-radius:10px;padding:10px;margin-bottom:12px}#mcall .t{display:flex;align-items:baseline;gap:8px;margin-bottom:6px}#mcall .t b{font-size:15px}#mcall .t .s{margin-left:auto;font-size:12px;color:#8e8e93}#mcall .t .s.on{color:#25c26e}#mcall .m{display:flex;gap:6px;margin-bottom:8px}#mcall .m button{flex:1}#mcall .m button.sel{background:#c4f45c;color:#000;border-color:#c4f45c}#mcall .r{display:grid;grid-template-columns:1fr auto auto;gap:6px;align-items:center}#mcall .w.ok{color:#8e8e93}#mcall .w{font-size:11.5px;color:#f0b90b;margin-top:6px;line-height:1.45}";
document.head.appendChild(st);
function E(t,c,x,p){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;if(p)p.appendChild(e);return e}
var C=E('div',0,null),M='p',A=null,AU=false;C.id='mcall';
function api(d){return fetch('/meme/ctl/'+(d?'all':'state'),d?{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json','X-Req':'1','X-CSRF':T},body:JSON.stringify(d)}:{credentials:'same-origin',cache:'no-store'}).then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok)throw Error(j.err||('HTTP '+r.status));return j})})}
function draw(){C.textContent='';var t=E('div','t',null,C);E('b',0,'全部幣種停利',t);
E('span','s'+(A?' on':''),A?('已設定：'+(A.m=='u'?'賺 $'+A.v:'漲 '+A.v+'%')+' 出場'):'未設定',t);
var m=E('div','m',null,C);[['p','按 % 數'],['u','按 賺多少 $']].forEach(function(x){var b=E('button',M==x[0]?'sel':0,x[1],m);b.onclick=function(){M=x[0];draw()}});
var r=E('div','r',null,C),i=E('input',0,null,r);i.type='text';i.inputMode='decimal';i.placeholder=M=='u'?'每個持倉賺到 $（例 5）':'每個持倉漲到 %（例 50）';if(A&&A.m==M)i.value=A.v;
var sv=E('button',0,'儲存',r),cl=E('button','rd','清除',r);cl.disabled=!A;
sv.onclick=function(){var v=Number(String(i.value).trim());if(!String(i.value).trim()||!isFinite(v)||v<=0){alert('請輸入大於 0 的數字');return}go({m:M,v:v},'已儲存全部幣種停利')};
cl.onclick=function(){if(confirm('清除全部幣種停利？'))go({m:null},'已清除')};
E('div','w ok','套用到所有持倉，「自動交易 關」時也會執行；單一持倉若有設「賺到 %/$」，以單一持倉設定為準。',C)}
function go(d,ok){api(d).then(function(j){take(j);alert(ok)}).catch(function(e){alert('失敗：'+e.message)})}
function take(j){T=j.csrf||T;A=j.all||null;AU=!!j.auto;if(A)M=A.m;draw()}
function mount(){var p=document.getElementById('mcp'),l=document.getElementById('mcl');if(!p||!l)return false;if(!C.parentNode)p.insertBefore(C,l);api().then(take).catch(function(){});return true}
function hook(){var b=document.getElementById('mcb');if(!b){setTimeout(hook,300);return}b.addEventListener('click',mount)}hook()})();
