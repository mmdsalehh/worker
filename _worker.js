function R(e){let t=e.headers.get("Host")||"",r=new URL(e.url),n=r.pathname;return{client:new URLSearchParams(r.search).get("app"),hostName:t,pathName:n}}var z="142.250.191.78",Y="trojanPassword",I="https://cloudflare-dns.com/dns-query",D="2fb55e67-f61d-45a1-9619-a9cac3529382",q=["443","8443","2053","2083","2087","2096"];var G={remoteDNS:"https://8.8.8.8/dns-query",resolvedRemoteDNS:{},localDNS:"8.8.8.8",vlessTrojanFakeDNS:!1,proxyIP:"",outProxy:"",outProxyParams:{},cleanIPs:"",enableIPv6:!0,customCdnAddrs:"",customCdnHost:"",customCdnSni:"",bestVLESSTrojanInterval:"30",vlessConfigs:!0,trojanConfigs:!1,ports:["443"],lengthMin:"100",lengthMax:"200",intervalMin:"1",intervalMax:"1",fragmentPackets:"tlshello",bypassLAN:!1,bypassIran:!1,bypassChina:!1,bypassRussia:!1,blockAds:!1,blockPorn:!1,blockUDP443:!1,customBypassRules:"",customBlockRules:"",warpEndpoints:"engage.cloudflareclient.com:2408",warpFakeDNS:!1,warpEnableIPv6:!0,warpPlusLicense:"",bestWarpInterval:"30",hiddifyNoiseMode:"m4",nikaNGNoiseMode:"quic",noiseCountMin:"10",noiseCountMax:"15",noiseSizeMin:"5",noiseSizeMax:"10",noiseDelayMin:"1",noiseDelayMax:"1",panelVersion:"1"};async function J(e){let t=`${I}?name=${encodeURIComponent(e)}&type=A`,r=`${I}?name=${encodeURIComponent(e)}&type=AAAA`;try{let[n,s]=await Promise.all([fetch(t,{headers:{accept:"application/dns-json"}}),fetch(r,{headers:{accept:"application/dns-json"}})]),o=await n.json(),a=await s.json(),i=o.Answer?o.Answer.map(l=>l.data):[],c=a.Answer?a.Answer.map(l=>l.data):[];return{ipv4:i,ipv6:c}}catch(n){throw console.error("Error resolving DNS:",n),new Error(`An error occurred while resolving DNS - ${n}`)}}function Z(e){return/^(?!\-)(?:[A-Za-z0-9\-]{1,63}\.)+[A-Za-z]{2,}$/.test(e)}function Q(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e)}async function K(e,t,r){let n=await J(e),s=r?n.ipv6.map(o=>`[${o}]`):[];return[e,"www.speedtest.net",...n.ipv4,...s,...t?t.split(","):[]]}function X(e){let t="";for(let r=0;r<e.length;r++)t+=Math.random()<.5?e[r].toUpperCase():e[r];return t}function L(e,t,r,n,s,o){let a,i=o?` ${o}`:"";return n.includes(r)?a="Clean IP":a=Z(r)?"Domain":ae(r)?"IPv4":ie(r)?"IPv6":"",`\u{1F4A6} ${e} - ${s}${i} - ${a} : ${t}`}function ae(e){return/^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/([0-9]|[1-2][0-9]|3[0-2]))?$/.test(e)}function ie(e){return/^\[(?:(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,7}:|::(?:[a-fA-F0-9]{1,4}:){0,7}|(?:[a-fA-F0-9]{1,4}:){1,6}:[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,5}(?::[a-fA-F0-9]{1,4}){1,2}|(?:[a-fA-F0-9]{1,4}:){1,4}(?::[a-fA-F0-9]{1,4}){1,3}|(?:[a-fA-F0-9]{1,4}:){1,3}(?::[a-fA-F0-9]{1,4}){1,4}|(?:[a-fA-F0-9]{1,4}:){1,2}(?::[a-fA-F0-9]{1,4}){1,5}|[a-fA-F0-9]{1,4}:(?::[a-fA-F0-9]{1,4}){1,6})\](?:\/(1[0-1][0-9]|12[0-8]|[0-9]?[0-9]))?$/.test(e)}function ee(e){let t="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=r.length;for(let s=0;s<e;s++)t+=r.charAt(Math.floor(Math.random()*n));return t}async function te(e,t){let{hostName:r,client:n}=R(e),{cleanIPs:s,proxyIP:o,ports:a,vlessConfigs:i,trojanConfigs:c,outProxy:l,customCdnAddrs:p,customCdnHost:h,customCdnSni:f,enableIPv6:d}=G,m="",g="",w="",y=1,u=await K(r,s,d),S=p?p.split(","):[],P=[...u,...S],v=n==="singbox"?"http/1.1":"h2,http/1.1",A=encodeURIComponent(Y),W=n==="singbox"?"&eh=Sec-WebSocket-Protocol&ed=2560":encodeURIComponent("?ed=2560");if(a.forEach(b=>{P.forEach(($,E)=>{let U=E>u.length-1,_=U?"C":"",ne=U?f:X(r),B=U?h:r,H=`${ee(16)}${o?`/${encodeURIComponent(btoa(o))}`:""}${W}`,oe=encodeURIComponent(L(y,b,$,s,"VLESS",_)),se=encodeURIComponent(L(y,b,$,s,"Trojan",_)),O=q.includes(b)?`&security=tls&sni=${ne}&fp=randomized&alpn=${v}`:"&security=none";i&&(m+=`${atob("dmxlc3M6Ly8=")}${D}@${$}:${b}?path=/${H}&encryption=none&host=${B}&type=ws${O}#${oe}
`),c&&(g+=`${atob("dHJvamFuOi8v")}${A}@${$}:${b}?path=/tr${H}&host=${B}&type=ws${O}#${se}
`),y++})}),l){let b=`#${encodeURIComponent("\u{1F4A6} Chain proxy \u{1F517}")}`;if(l.startsWith("socks")||l.startsWith("http")){let $=/^(?:socks|http):\/\/([^@]+)@/,E=l.match($),U=E?E[1]:!1;w=U?l.replace(U,btoa(U))+b:l+b}else w=l.split("#")[0]+b}let C=btoa(m+g+w);return new Response(C,{status:200,headers:{"Content-Type":"text/plain;charset=utf-8","Cache-Control":"no-store, no-cache, must-revalidate, proxy-revalidate","CDN-Cache-Control":"no-store"}})}import{connect as le}from"cloudflare:sockets";function x(e){try{(e.readyState===1||e.readyState===2)&&e.close()}catch(t){console.error("safeCloseWebSocket error",t)}}async function T(e,t,r,n,s){let o=r,a=!1;await e.readable.pipeTo(new WritableStream({start(){},async write(i,c){a=!0,t.readyState!==1&&c.error("webSocket.readyState is not open, maybe close"),o?(t.send(await new Blob([o,i]).arrayBuffer()),o=null):t.send(i)},close(){s(`remoteConnection!.readable is close with hasIncomingData is ${a}`)},abort(i){console.error("remoteConnection!.readable abort",i)}})).catch(i=>{console.error("vlessRemoteSocketToWS has exception ",i.stack||i),x(t)}),a===!1&&n&&(s("retry"),n())}async function N(e,t,r,n,s,o,a,i){let{pathName:c}=R(e);async function l(f,d){/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(f)&&(f=`${atob("d3d3Lg==")}${f}${atob("LnNzbGlwLmlv")}`);let m=le({hostname:f,port:d});t.value=m;let g=m.writable.getWriter();return await g.write(s),g.releaseLock(),m}async function p(){let f=c.split("/")[2],d=f?atob(f).split(","):void 0,m=d?d[Math.floor(Math.random()*d.length)]:z||r,g=await l(m,n);g.closed.finally(()=>{x(o)}),T(g,o,a,null,i)}let h=await l(r,n);T(h,o,a,p,i)}async function F(e,t,r){let n=!1,s=new TransformStream({transform(a,i){for(let c=0;c<a.byteLength;){let l=a.slice(c,c+2),p=new DataView(l).getUint16(0),h=new Uint8Array(a.slice(c+2,c+2+p));c=c+2+p,i.enqueue(h)}}});s.readable.pipeTo(new WritableStream({async write(a){let c=await(await fetch(I,{method:"POST",headers:{"content-type":"application/dns-message"},body:a})).arrayBuffer(),l=c.byteLength,p=new Uint8Array([l>>8&255,l&255]);e.readyState===1&&(r(`doh success and dns message length is ${l}`),n?e.send(await new Blob([p,c]).arrayBuffer()):(e.send(await new Blob([t,p,c]).arrayBuffer()),n=!0))}}));let o=s.writable.getWriter();return{write(a){o.write(a)}}}async function M(e,t){if(e.byteLength<24)return{hasError:!0,message:"invalid data"};let r=new Uint8Array(e.slice(0,1)),n=new Uint8Array(e.slice(1,17)),s=ue(n),o=!1,a=t.includes(",")?t.split(","):[t],i=await de(s);if(o=a.some(P=>i||s===P.trim()),!o)return{hasError:!0,message:"invalid user"};let c=new Uint8Array(e.slice(17,18))[0],l=new Uint8Array(e.slice(18+c,18+c+1))[0],p=!1;if(l>1){if(l!==2)return{hasError:!0,message:`command ${l} is not support, command 01-tcp,02-udp,03-mux`};p=!0}let h=18+c+1,f=e.slice(h,h+2),d=new DataView(f).getUint16(0),m=h+2,w=new Uint8Array(e.slice(m,m+1))[0],y=0,u=m+1,S="";switch(w){case 1:y=4,S=new Uint8Array(e.slice(u,u+y)).join(".");break;case 2:y=new Uint8Array(e.slice(u,u+1))[0],u+=1,S=new TextDecoder().decode(e.slice(u,u+y));break;case 3:y=16;let P=new DataView(e.slice(u,u+y)),v=[];for(let A=0;A<8;A++)v.push(P.getUint16(A*2).toString(16));S=v.join(":");break;default:return{hasError:!0,message:`invild  addressType is ${w}`}}return S?{hasError:!1,addressRemote:S,addressType:w,portRemote:d,rawDataIndex:u+y,vlessVersion:r,isUDP:p}:{hasError:!0,message:`addressValue is empty, addressType is ${w}`}}async function de(e){return!1}function pe(e,t=0){let r=[];for(let n=0;n<256;++n)r.push((n+256).toString(16).slice(1));return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}function ue(e,t=0){let r=pe(e,t);if(!Q(r))throw TypeError("Stringified UUID is invalid");return r}function V(e){if(!e)return{earlyData:null,error:null};try{e=e.replace(/-/g,"+").replace(/_/g,"/");let t=atob(e);return{earlyData:Uint8Array.from(t,n=>n.charCodeAt(0)).buffer,error:null}}catch(t){return{earlyData:null,error:t}}}function j(e,t,r){let n=!1;return new ReadableStream({start(o){e.addEventListener("message",c=>{if(n)return;let l=c.data;o.enqueue(l)}),e.addEventListener("close",()=>{x(e),!n&&o.close()}),e.addEventListener("error",c=>{r("webSocketServer has error"),o.error(c)});let{earlyData:a,error:i}=V(t);i?o.error(i):a&&o.enqueue(a)},cancel(o){n||(r(`ReadableStream was canceled, due to ${o}`),n=!0,x(e))}})}async function re(e,t){let r=new WebSocketPair,[n,s]=Object.values(r);s.accept();let o="",a="",i=(d,m)=>{console.log(`[${o}:${a}] ${d}`,m||"")},c=e.headers.get("sec-websocket-protocol")||"",l=j(s,c,i),p={value:null},h=null,f=!1;return l.pipeTo(new WritableStream({async write(d,m){if(f&&h)return h(d);if(p.value){let C=p.value.writable.getWriter();await C.write(d),C.releaseLock();return}let{hasError:g,message:w,portRemote:y=443,addressRemote:u="",rawDataIndex:S,vlessVersion:P=new Uint8Array([0,0]),isUDP:v}=await M(d,D);if(o=u,a=`${y}--${Math.random()} ${v?"udp ":"tcp "} `,g)throw new Error(w);if(v)if(y===53)f=!0;else throw new Error("UDP proxy only enable for DNS which is port 53");let A=new Uint8Array([P[0],0]),W=d.slice(S);if(f){let{write:C}=await F(s,A,i);h=C,h(W);return}N(e,p,u,y,W,s,A,i)},close(){i("readableWebSocketStream is close")},abort(d){i("readableWebSocketStream is abort",JSON.stringify(d))}})).catch(d=>{i("readableWebSocketStream pipeTo error",d)}),new Response(null,{status:101,webSocket:n})}var Ke={async fetch(e,t,r){let{pathName:n}=R(e);try{let s=e.headers.get("Upgrade");if(!s||s!=="websocket")switch(n){case`/sub/${D}`:return await te(e,t);default:return t.ASSETS.fetch(e)}else return n.startsWith("/tr")?new Response(null,{status:404}):await re(e,t)}catch{return new Response("error",{status:500})}}};export{Ke as default};
