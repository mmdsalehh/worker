function R(e){let t=e.headers.get("Host")||"",r=new URL(e.url),n=r.pathname;return{client:new URLSearchParams(r.search).get("app"),hostName:t,pathName:n}}var z="142.250.191.78",Y="trojanPassword",I="https://cloudflare-dns.com/dns-query",D="2fb55e67-f61d-45a1-9619-a9cac3529382",q=["443","8443","2053","2083","2087","2096"];var G={remoteDNS:"https://8.8.8.8/dns-query",resolvedRemoteDNS:{},localDNS:"8.8.8.8",vlessTrojanFakeDNS:!1,proxyIP:"",outProxy:"",outProxyParams:{},cleanIPs:"",enableIPv6:!0,customCdnAddrs:"",customCdnHost:"",customCdnSni:"",bestVLESSTrojanInterval:"30",vlessConfigs:!0,trojanConfigs:!1,ports:["443"],lengthMin:"100",lengthMax:"200",intervalMin:"1",intervalMax:"1",fragmentPackets:"tlshello",bypassLAN:!1,bypassIran:!1,bypassChina:!1,bypassRussia:!1,blockAds:!1,blockPorn:!1,blockUDP443:!1,customBypassRules:"",customBlockRules:"",warpEndpoints:"engage.cloudflareclient.com:2408",warpFakeDNS:!1,warpEnableIPv6:!0,warpPlusLicense:"",bestWarpInterval:"30",hiddifyNoiseMode:"m4",nikaNGNoiseMode:"quic",noiseCountMin:"10",noiseCountMax:"15",noiseSizeMin:"5",noiseSizeMax:"10",noiseDelayMin:"1",noiseDelayMax:"1",panelVersion:"1"};async function J(e){let t=`${I}?name=${encodeURIComponent(e)}&type=A`,r=`${I}?name=${encodeURIComponent(e)}&type=AAAA`;try{let[n,o]=await Promise.all([fetch(t,{headers:{accept:"application/dns-json"}}),fetch(r,{headers:{accept:"application/dns-json"}})]),s=await n.json(),a=await o.json(),i=s.Answer?s.Answer.map(c=>c.data):[],l=a.Answer?a.Answer.map(c=>c.data):[];return{ipv4:i,ipv6:l}}catch(n){throw console.error("Error resolving DNS:",n),new Error(`An error occurred while resolving DNS - ${n}`)}}function Z(e){return/^(?!\-)(?:[A-Za-z0-9\-]{1,63}\.)+[A-Za-z]{2,}$/.test(e)}function Q(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e)}async function K(e,t,r){let n=await J(e),o=r?n.ipv6.map(s=>`[${s}]`):[];return[e,"www.speedtest.net",...n.ipv4,...o,...t?t.split(","):[]]}function X(e){let t="";for(let r=0;r<e.length;r++)t+=Math.random()<.5?e[r].toUpperCase():e[r];return t}function L(e,t,r,n,o,s){let a,i=s?` ${s}`:"";return n.includes(r)?a="Clean IP":a=Z(r)?"Domain":ie(r)?"IPv4":ce(r)?"IPv6":"",`\u{1F4A6} ${e} - ${o}${i} - ${a} : ${t}`}function ie(e){return/^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/([0-9]|[1-2][0-9]|3[0-2]))?$/.test(e)}function ce(e){return/^\[(?:(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,7}:|::(?:[a-fA-F0-9]{1,4}:){0,7}|(?:[a-fA-F0-9]{1,4}:){1,6}:[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,5}(?::[a-fA-F0-9]{1,4}){1,2}|(?:[a-fA-F0-9]{1,4}:){1,4}(?::[a-fA-F0-9]{1,4}){1,3}|(?:[a-fA-F0-9]{1,4}:){1,3}(?::[a-fA-F0-9]{1,4}){1,4}|(?:[a-fA-F0-9]{1,4}:){1,2}(?::[a-fA-F0-9]{1,4}){1,5}|[a-fA-F0-9]{1,4}:(?::[a-fA-F0-9]{1,4}){1,6})\](?:\/(1[0-1][0-9]|12[0-8]|[0-9]?[0-9]))?$/.test(e)}function ee(e){let t="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=r.length;for(let o=0;o<e;o++)t+=r.charAt(Math.floor(Math.random()*n));return t}async function te(e,t){let{hostName:r,client:n}=R(e),{cleanIPs:o,proxyIP:s,ports:a,vlessConfigs:i,trojanConfigs:l,outProxy:c,customCdnAddrs:p,customCdnHost:y,customCdnSni:f,enableIPv6:d}=G,m="",g="",w="",h=1,u=await K(r,o,d),S=p?p.split(","):[],P=[...u,...S],v=n==="singbox"?"http/1.1":"h2,http/1.1",b=encodeURIComponent(Y),W=n==="singbox"?"&eh=Sec-WebSocket-Protocol&ed=2560":encodeURIComponent("?ed=2560");if(a.forEach(A=>{P.forEach((C,E)=>{let U=E>u.length-1,_=U?"C":"",oe=U?f:X(r),B=U?y:r,H=`${ee(16)}${s?`/${encodeURIComponent(btoa(s))}`:""}${W}`,se=encodeURIComponent(L(h,A,C,o,"VLESS",_)),ae=encodeURIComponent(L(h,A,C,o,"Trojan",_)),O=q.includes(A)?`&security=tls&sni=${oe}&fp=randomized&alpn=${v}`:"&security=none";i&&(m+=`${atob("dmxlc3M6Ly8=")}${D}@${C}:${A}?path=/${H}&encryption=none&host=${B}&type=ws${O}#${se}
`),l&&(g+=`${atob("dHJvamFuOi8v")}${b}@${C}:${A}?path=/tr${H}&host=${B}&type=ws${O}#${ae}
`),h++})}),c){let A=`#${encodeURIComponent("\u{1F4A6} Chain proxy \u{1F517}")}`;if(c.startsWith("socks")||c.startsWith("http")){let C=/^(?:socks|http):\/\/([^@]+)@/,E=c.match(C),U=E?E[1]:!1;w=U?c.replace(U,btoa(U))+A:c+A}else w=c.split("#")[0]+A}let $=btoa(m+g+w);return new Response($,{status:200,headers:{"Content-Type":"text/plain;charset=utf-8","Cache-Control":"no-store, no-cache, must-revalidate, proxy-revalidate","CDN-Cache-Control":"no-store"}})}import{connect as de}from"cloudflare:sockets";function x(e){try{(e.readyState===1||e.readyState===2)&&e.close()}catch(t){console.error("safeCloseWebSocket error",t)}}async function T(e,t,r,n,o){let s=r,a=!1;await e.readable.pipeTo(new WritableStream({start(){},async write(i,l){a=!0,t.readyState!==1&&l.error("webSocket.readyState is not open, maybe close"),s?(t.send(await new Blob([s,i]).arrayBuffer()),s=null):t.send(i)},close(){o(`remoteConnection!.readable is close with hasIncomingData is ${a}`)},abort(i){console.error("remoteConnection!.readable abort",i)}})).catch(i=>{console.error("vlessRemoteSocketToWS has exception ",i.stack||i),x(t)}),a===!1&&n&&(o("retry"),n())}async function N(e,t,r,n,o,s,a,i){let{pathName:l}=R(e);async function c(f,d){/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(f)&&(f=`${atob("d3d3Lg==")}${f}${atob("LnNzbGlwLmlv")}`);let m=de({hostname:f,port:d});t.value=m;let g=m.writable.getWriter();return await g.write(o),g.releaseLock(),m}async function p(){let f=l.split("/")[2],d=f?atob(f).split(","):void 0,m=d?d[Math.floor(Math.random()*d.length)]:z||r,g=await c(m,n);g.closed.finally(()=>{x(s)}),T(g,s,a,null,i)}let y=await c(r,n);T(y,s,a,p,i)}async function F(e,t,r){let n=!1,o=new TransformStream({transform(a,i){for(let l=0;l<a.byteLength;){let c=a.slice(l,l+2),p=new DataView(c).getUint16(0),y=new Uint8Array(a.slice(l+2,l+2+p));l=l+2+p,i.enqueue(y)}}});o.readable.pipeTo(new WritableStream({async write(a){let l=await(await fetch(I,{method:"POST",headers:{"content-type":"application/dns-message"},body:a})).arrayBuffer(),c=l.byteLength,p=new Uint8Array([c>>8&255,c&255]);e.readyState===1&&(r(`doh success and dns message length is ${c}`),n?e.send(await new Blob([p,l]).arrayBuffer()):(e.send(await new Blob([t,p,l]).arrayBuffer()),n=!0))}}));let s=o.writable.getWriter();return{write(a){s.write(a)}}}async function M(e,t){if(e.byteLength<24)return{hasError:!0,message:"invalid data"};let r=new Uint8Array(e.slice(0,1)),n=!1,o=!1,s=new Uint8Array(e.slice(1,17)),a=ue(s),i=t.includes(",")?t.split(","):[t],l=await re(a);if(n=i.some(P=>l||a===P.trim()),console.log(`checkUuidInApi: ${await re(a)}, userID: ${a}`),!n)return{hasError:!0,message:"invalid user"};let c=new Uint8Array(e.slice(17,18))[0],p=new Uint8Array(e.slice(18+c,18+c+1))[0];if(p!==1)if(p===2)o=!0;else return{hasError:!0,message:`command ${p} is not support, command 01-tcp,02-udp,03-mux`};let y=18+c+1,f=e.slice(y,y+2),d=new DataView(f).getUint16(0),m=y+2,w=new Uint8Array(e.slice(m,m+1))[0],h=0,u=m+1,S="";switch(w){case 1:h=4,S=new Uint8Array(e.slice(u,u+h)).join(".");break;case 2:h=new Uint8Array(e.slice(u,u+1))[0],u+=1,S=new TextDecoder().decode(e.slice(u,u+h));break;case 3:h=16;let P=new DataView(e.slice(u,u+h)),v=[];for(let b=0;b<8;b++)v.push(P.getUint16(b*2).toString(16));S=v.join(":");break;default:return{hasError:!0,message:`invild  addressType is ${w}`}}return S?{hasError:!1,addressRemote:S,addressType:w,portRemote:d,rawDataIndex:u+h,vlessVersion:r,isUDP:o}:{hasError:!0,message:`addressValue is empty, addressType is ${w}`}}async function re(e){return!1}function pe(e,t=0){let r=[];for(let n=0;n<256;++n)r.push((n+256).toString(16).slice(1));return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}function ue(e,t=0){let r=pe(e,t);if(!Q(r))throw TypeError("Stringified UUID is invalid");return r}function V(e){if(!e)return{earlyData:null,error:null};try{e=e.replace(/-/g,"+").replace(/_/g,"/");let t=atob(e);return{earlyData:Uint8Array.from(t,n=>n.charCodeAt(0)).buffer,error:null}}catch(t){return{earlyData:null,error:t}}}function j(e,t,r){let n=!1;return new ReadableStream({start(s){e.addEventListener("message",l=>{if(n)return;let c=l.data;s.enqueue(c)}),e.addEventListener("close",()=>{x(e),!n&&s.close()}),e.addEventListener("error",l=>{r("webSocketServer has error"),s.error(l)});let{earlyData:a,error:i}=V(t);i?s.error(i):a&&s.enqueue(a)},cancel(s){n||(r(`ReadableStream was canceled, due to ${s}`),n=!0,x(e))}})}async function ne(e,t){let r=new WebSocketPair,[n,o]=Object.values(r);o.accept();let s="",a="",i=(d,m)=>{console.log(`[${s}:${a}] ${d}`,m||"")},l=e.headers.get("sec-websocket-protocol")||"",c=j(o,l,i),p={value:null},y=null,f=!1;return c.pipeTo(new WritableStream({async write(d,m){if(f&&y)return y(d);if(p.value){let $=p.value.writable.getWriter();await $.write(d),$.releaseLock();return}let{hasError:g,message:w,portRemote:h=443,addressRemote:u="",rawDataIndex:S,vlessVersion:P=new Uint8Array([0,0]),isUDP:v}=await M(d,D);if(s=u,a=`${h}--${Math.random()} ${v?"udp ":"tcp "} `,g)throw new Error(w);if(v)if(h===53)f=!0;else throw new Error("UDP proxy only enable for DNS which is port 53");let b=new Uint8Array([P[0],0]),W=d.slice(S);if(f){let{write:$}=await F(o,b,i);y=$,y(W);return}N(e,p,u,h,W,o,b,i)},close(){i("readableWebSocketStream is close")},abort(d){i("readableWebSocketStream is abort",JSON.stringify(d))}})).catch(d=>{i("readableWebSocketStream pipeTo error",d)}),new Response(null,{status:101,webSocket:n})}var Ke={async fetch(e,t,r){let{pathName:n}=R(e);try{let o=e.headers.get("Upgrade");if(!o||o!=="websocket")switch(n){case`/sub/${D}`:return await te(e,t);default:return t.ASSETS.fetch(e)}else return n.startsWith("/tr")?new Response(null,{status:404}):await ne(e,t)}catch{return new Response("error",{status:500})}}};export{Ke as default};
