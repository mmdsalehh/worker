function P(e){let n=e.headers.get("Host")||"",t=new URL(e.url),s=t.pathname;return{client:new URLSearchParams(t.search).get("app"),hostName:n,pathName:s}}var H="bpb.yousef.isegaro.com",O="trojanPassword",D="https://cloudflare-dns.com/dns-query",R="2fb55e67-f61d-45a1-9619-a9cac3529382",z=["443","8443","2053","2083","2087","2096"];var Y={remoteDNS:"https://8.8.8.8/dns-query",resolvedRemoteDNS:{},localDNS:"8.8.8.8",vlessTrojanFakeDNS:!1,proxyIP:"",outProxy:"",outProxyParams:{},cleanIPs:"",enableIPv6:!0,customCdnAddrs:"",customCdnHost:"",customCdnSni:"",bestVLESSTrojanInterval:"30",vlessConfigs:!0,trojanConfigs:!1,ports:["443"],lengthMin:"100",lengthMax:"200",intervalMin:"1",intervalMax:"1",fragmentPackets:"tlshello",bypassLAN:!1,bypassIran:!1,bypassChina:!1,bypassRussia:!1,blockAds:!1,blockPorn:!1,blockUDP443:!1,customBypassRules:"",customBlockRules:"",warpEndpoints:"engage.cloudflareclient.com:2408",warpFakeDNS:!1,warpEnableIPv6:!0,warpPlusLicense:"",bestWarpInterval:"30",hiddifyNoiseMode:"m4",nikaNGNoiseMode:"quic",noiseCountMin:"10",noiseCountMax:"15",noiseSizeMin:"5",noiseSizeMax:"10",noiseDelayMin:"1",noiseDelayMax:"1",panelVersion:"1"};async function G(e){let n=`${D}?name=${encodeURIComponent(e)}&type=A`,t=`${D}?name=${encodeURIComponent(e)}&type=AAAA`;try{let[s,a]=await Promise.all([fetch(n,{headers:{accept:"application/dns-json"}}),fetch(t,{headers:{accept:"application/dns-json"}})]),r=await s.json(),c=await a.json(),o=r.Answer?r.Answer.map(i=>i.data):[],l=c.Answer?c.Answer.map(i=>i.data):[];return{ipv4:o,ipv6:l}}catch(s){throw new Error(`An error occurred while resolving DNS - ${s}`)}}function q(e){return/^(?!\-)(?:[A-Za-z0-9\-]{1,63}\.)+[A-Za-z]{2,}$/.test(e)}function Z(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e)}async function J(e,n,t){let s=await G(e),a=t?s.ipv6.map(r=>`[${r}]`):[];return[e,"www.speedtest.net",...s.ipv4,...a,...n?n.split(","):[]]}function Q(e){let n="";for(let t=0;t<e.length;t++)n+=Math.random()<.5?e[t].toUpperCase():e[t];return n}function W(e,n,t,s,a,r){let c,o=r?` ${r}`:"";return s.includes(t)?c="Clean IP":c=q(t)?"Domain":oe(t)?"IPv4":ie(t)?"IPv6":"",`\u{1F4A6} ${e} - ${a}${o} - ${c} : ${n}`}function oe(e){return/^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/([0-9]|[1-2][0-9]|3[0-2]))?$/.test(e)}function ie(e){return/^\[(?:(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,7}:|::(?:[a-fA-F0-9]{1,4}:){0,7}|(?:[a-fA-F0-9]{1,4}:){1,6}:[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,5}(?::[a-fA-F0-9]{1,4}){1,2}|(?:[a-fA-F0-9]{1,4}:){1,4}(?::[a-fA-F0-9]{1,4}){1,3}|(?:[a-fA-F0-9]{1,4}:){1,3}(?::[a-fA-F0-9]{1,4}){1,4}|(?:[a-fA-F0-9]{1,4}:){1,2}(?::[a-fA-F0-9]{1,4}){1,5}|[a-fA-F0-9]{1,4}:(?::[a-fA-F0-9]{1,4}){1,6})\](?:\/(1[0-1][0-9]|12[0-8]|[0-9]?[0-9]))?$/.test(e)}function K(e){let n="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",s=t.length;for(let a=0;a<e;a++)n+=t.charAt(Math.floor(Math.random()*s));return n}async function X(e,n){let{hostName:t,client:s}=P(e),{cleanIPs:a,proxyIP:r,ports:c,vlessConfigs:o,trojanConfigs:l,outProxy:i,customCdnAddrs:u,customCdnHost:d,customCdnSni:y,enableIPv6:h}=Y,f="",v="",g="",m=1,p=await J(t,a,h),w=u?u.split(","):[],A=[...p,...w],I=s==="singbox"?"http/1.1":"h2,http/1.1",C=encodeURIComponent(O),te=s==="singbox"?"&eh=Sec-WebSocket-Protocol&ed=2560":encodeURIComponent("?ed=2560");if(c.forEach(S=>{A.forEach((U,E)=>{let b=E>p.length-1,j=b?"C":"",re=b?y:Q(t),M=b?d:t,_=`${K(16)}${r?`/${encodeURIComponent(btoa(r))}`:""}${te}`,ae=encodeURIComponent(W(m,S,U,a,"VLESS",j)),se=encodeURIComponent(W(m,S,U,a,"Trojan",j)),B=z.includes(S)?`&security=tls&sni=${re}&fp=randomized&alpn=${I}`:"&security=none";o&&(f+=`${atob("dmxlc3M6Ly8=")}${R}@${U}:${S}?path=/vls${_}&encryption=none&host=${M}&type=ws${B}#${ae}
`),l&&(v+=`${atob("dHJvamFuOi8v")}${C}@${U}:${S}?path=/tr${_}&host=${M}&type=ws${B}#${se}
`),m++})}),i){let S=`#${encodeURIComponent("\u{1F4A6} Chain proxy \u{1F517}")}`;if(i.startsWith("socks")||i.startsWith("http")){let U=/^(?:socks|http):\/\/([^@]+)@/,E=i.match(U),b=E?E[1]:!1;g=b?i.replace(b,btoa(b))+S:i+S}else g=i.split("#")[0]+S}let ne=btoa(f+v+g);return new Response(ne,{status:200,headers:{"Content-Type":"text/plain;charset=utf-8","Cache-Control":"no-store, no-cache, must-revalidate, proxy-revalidate","CDN-Cache-Control":"no-store"}})}import{connect as le}from"cloudflare:sockets";function x(e){try{(e.readyState===1||e.readyState===2)&&e.close()}catch{}}async function k(e,n,t,s){let a=t,r=!1;await e.readable.pipeTo(new WritableStream({start(){},close(){},abort(){},async write(c,o){r=!0,n.readyState!==1&&o.error("webSocket.readyState is not open, maybe close"),a?(n.send(await new Blob([a,c]).arrayBuffer()),a=null):n.send(c)}})).catch(()=>x(n)),!r&&s&&s()}async function T(e,n,t,s,a,r,c){let{pathName:o}=P(e);async function l(d,y){/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(d)&&(d=`${atob("d3d3Lg==")}${d}${atob("LnNzbGlwLmlv")}`);let h=le({hostname:d,port:y});n.value=h;let f=h.writable.getWriter();return await f.write(a),f.releaseLock(),h}async function i(){let d=o.split("/")[2],y=d?atob(d).split(","):void 0,h=y?y[Math.floor(Math.random()*y.length)]:H||t,f=await l(h,s);f.closed.finally(()=>{x(r)}),k(f,r,c,null)}let u=await l(t,s);k(u,r,c,i)}async function L(e,n){let t=!1,s=new TransformStream({start(r){},flush(r){},transform(r,c){for(let o=0;o<r.byteLength;){let l=r.slice(o,o+2),i=new DataView(l).getUint16(0),u=new Uint8Array(r.slice(o+2,o+2+i));o=o+2+i,c.enqueue(u)}}});s.readable.pipeTo(new WritableStream({async write(r){let o=await(await fetch(D,{method:"POST",headers:{"content-type":"application/dns-message"},body:r})).arrayBuffer(),l=o.byteLength,i=new Uint8Array([l>>8&255,l&255]);e.readyState===1&&(t?e.send(await new Blob([i,o]).arrayBuffer()):(e.send(await new Blob([n,i,o]).arrayBuffer()),t=!0))}})).catch(()=>{});let a=s.writable.getWriter();return{write(r){a.write(r)}}}async function N(e,n){if(e.byteLength<24)return{hasError:!0,message:"invalid data"};let t=new Uint8Array(e.slice(0,1)),s=new Uint8Array(e.slice(1,17)),a=ue(s),r=!1,c=n.includes(",")?n.split(","):[n],o=await pe(a);if(r=c.some(A=>o||a===A.trim()),!r)return{hasError:!0,message:"invalid user"};let l=new Uint8Array(e.slice(17,18))[0],i=new Uint8Array(e.slice(18+l,18+l+1))[0],u=!1;if(i>1){if(i!==2)return{hasError:!0,message:`command ${i} is not support, command 01-tcp,02-udp,03-mux`};u=!0}let d=18+l+1,y=e.slice(d,d+2),h=new DataView(y).getUint16(0),f=d+2,g=new Uint8Array(e.slice(f,f+1))[0],m=0,p=f+1,w="";switch(g){case 1:m=4,w=new Uint8Array(e.slice(p,p+m)).join(".");break;case 2:m=new Uint8Array(e.slice(p,p+1))[0],p+=1,w=new TextDecoder().decode(e.slice(p,p+m));break;case 3:m=16;let A=new DataView(e.slice(p,p+m)),I=[];for(let C=0;C<8;C++)I.push(A.getUint16(C*2).toString(16));w=I.join(":");break;default:return{hasError:!0,message:`invild  addressType is ${g}`}}return w?{hasError:!1,addressRemote:w,addressType:g,portRemote:h,rawDataIndex:p+m,vlessVersion:t,isUDP:u}:{hasError:!0,message:`addressValue is empty, addressType is ${g}`}}async function pe(e){return!1}function de(e,n=0){let t=[];for(let s=0;s<256;++s)t.push((s+256).toString(16).slice(1));return(t[e[n+0]]+t[e[n+1]]+t[e[n+2]]+t[e[n+3]]+"-"+t[e[n+4]]+t[e[n+5]]+"-"+t[e[n+6]]+t[e[n+7]]+"-"+t[e[n+8]]+t[e[n+9]]+"-"+t[e[n+10]]+t[e[n+11]]+t[e[n+12]]+t[e[n+13]]+t[e[n+14]]+t[e[n+15]]).toLowerCase()}function ue(e,n=0){let t=de(e,n);if(!Z(t))throw TypeError("Stringified UUID is invalid");return t}function F(e){if(!e)return{earlyData:null,error:null};try{e=e.replace(/-/g,"+").replace(/_/g,"/");let n=atob(e);return{earlyData:Uint8Array.from(n,s=>s.charCodeAt(0)).buffer,error:null}}catch(n){return{earlyData:null,error:n}}}function V(e,n){let t=!1;return new ReadableStream({start(a){e.addEventListener("message",o=>{if(t)return;let l=o.data;a.enqueue(l)}),e.addEventListener("close",()=>{x(e),!t&&a.close()}),e.addEventListener("error",o=>{a.error(o)});let{earlyData:r,error:c}=F(n);c?a.error(c):r&&a.enqueue(r)},cancel(){t||(t=!0,x(e))}})}async function ee(e,n){let t=new WebSocketPair,[s,a]=Object.values(t);a.accept();let r=e.headers.get("sec-websocket-protocol")||"",c=V(a,r),o={value:null},l=null,i=!1;return c.pipeTo(new WritableStream({async write(u){if(i&&l)return l(u);if(o.value){let A=o.value.writable.getWriter();await A.write(u),A.releaseLock();return}let{isUDP:d,message:y,hasError:h,rawDataIndex:f,portRemote:v=443,addressRemote:g="",vlessVersion:m=new Uint8Array([0,0])}=await N(u,R);if(h)throw new Error(y);if(d){if(v!==53)throw new Error("UDP proxy only enable for DNS which is port 53");i=!0}let p=new Uint8Array([m[0],0]),w=u.slice(f);if(i){let{write:A}=await L(a,p);l=A,l(w);return}T(e,o,g,v,w,a,p)}})),new Response(null,{status:101,webSocket:s})}var Ke={async fetch(e,n,t){let{pathName:s}=P(e);try{let a=e.headers.get("Upgrade");if(!a||a!=="websocket")switch(s){case`/sub/${R}`:return await X(e,n);default:let r=new URL(e.url);return r.hostname="www.speedtest.net",r.protocol="https:",e=new Request(r,e),await fetch(e)}return s.startsWith("/vls")?await ee(e,n):new Response(null,{status:404})}catch{return new Response("error",{status:500})}}};export{Ke as default};
