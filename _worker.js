function R(e){let t=e.headers.get("Host")||"",r=new URL(e.url),n=r.pathname;return{client:new URLSearchParams(r.search).get("app"),hostName:t,pathName:n}}var O="142.250.191.78",z="trojanPassword",I="https://cloudflare-dns.com/dns-query",D="2fb55e67-f61d-45a1-9619-a9cac3529382",Y=["443","8443","2053","2083","2087","2096"];var q={remoteDNS:"https://8.8.8.8/dns-query",resolvedRemoteDNS:{},localDNS:"8.8.8.8",vlessTrojanFakeDNS:!1,proxyIP:"",outProxy:"",outProxyParams:{},cleanIPs:"",enableIPv6:!0,customCdnAddrs:"",customCdnHost:"",customCdnSni:"",bestVLESSTrojanInterval:"30",vlessConfigs:!0,trojanConfigs:!1,ports:["443"],lengthMin:"100",lengthMax:"200",intervalMin:"1",intervalMax:"1",fragmentPackets:"tlshello",bypassLAN:!1,bypassIran:!1,bypassChina:!1,bypassRussia:!1,blockAds:!1,blockPorn:!1,blockUDP443:!1,customBypassRules:"",customBlockRules:"",warpEndpoints:"engage.cloudflareclient.com:2408",warpFakeDNS:!1,warpEnableIPv6:!0,warpPlusLicense:"",bestWarpInterval:"30",hiddifyNoiseMode:"m4",nikaNGNoiseMode:"quic",noiseCountMin:"10",noiseCountMax:"15",noiseSizeMin:"5",noiseSizeMax:"10",noiseDelayMin:"1",noiseDelayMax:"1",panelVersion:"1"};async function G(e){let t=`${I}?name=${encodeURIComponent(e)}&type=A`,r=`${I}?name=${encodeURIComponent(e)}&type=AAAA`;try{let[n,o]=await Promise.all([fetch(t,{headers:{accept:"application/dns-json"}}),fetch(r,{headers:{accept:"application/dns-json"}})]),s=await n.json(),a=await o.json(),l=s.Answer?s.Answer.map(c=>c.data):[],i=a.Answer?a.Answer.map(c=>c.data):[];return{ipv4:l,ipv6:i}}catch(n){throw console.error("Error resolving DNS:",n),new Error(`An error occurred while resolving DNS - ${n}`)}}function Z(e){return/^(?!\-)(?:[A-Za-z0-9\-]{1,63}\.)+[A-Za-z]{2,}$/.test(e)}function J(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e)}async function Q(e,t,r){let n=await G(e),o=r?n.ipv6.map(s=>`[${s}]`):[];return[e,"www.speedtest.net",...n.ipv4,...o,...t?t.split(","):[]]}function K(e){let t="";for(let r=0;r<e.length;r++)t+=Math.random()<.5?e[r].toUpperCase():e[r];return t}function T(e,t,r,n,o,s){let a,l=s?` ${s}`:"";return n.includes(r)?a="Clean IP":a=Z(r)?"Domain":ae(r)?"IPv4":ie(r)?"IPv6":"",`\u{1F4A6} ${e} - ${o}${l} - ${a} : ${t}`}function ae(e){return/^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/([0-9]|[1-2][0-9]|3[0-2]))?$/.test(e)}function ie(e){return/^\[(?:(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,7}:|::(?:[a-fA-F0-9]{1,4}:){0,7}|(?:[a-fA-F0-9]{1,4}:){1,6}:[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,5}(?::[a-fA-F0-9]{1,4}){1,2}|(?:[a-fA-F0-9]{1,4}:){1,4}(?::[a-fA-F0-9]{1,4}){1,3}|(?:[a-fA-F0-9]{1,4}:){1,3}(?::[a-fA-F0-9]{1,4}){1,4}|(?:[a-fA-F0-9]{1,4}:){1,2}(?::[a-fA-F0-9]{1,4}){1,5}|[a-fA-F0-9]{1,4}:(?::[a-fA-F0-9]{1,4}){1,6})\](?:\/(1[0-1][0-9]|12[0-8]|[0-9]?[0-9]))?$/.test(e)}function X(e){let t="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=r.length;for(let o=0;o<e;o++)t+=r.charAt(Math.floor(Math.random()*n));return t}async function ee(e,t){let{hostName:r,client:n}=R(e),{cleanIPs:o,proxyIP:s,ports:a,vlessConfigs:l,trojanConfigs:i,outProxy:c,customCdnAddrs:d,customCdnHost:g,customCdnSni:m,enableIPv6:f}=q,p="",h="",w="",y=1,u=await Q(r,o,f),A=d?d.split(","):[],P=[...u,...A],v=n==="singbox"?"http/1.1":"h2,http/1.1",x=encodeURIComponent(z),C=n==="singbox"?"&eh=Sec-WebSocket-Protocol&ed=2560":encodeURIComponent("?ed=2560");if(a.forEach(S=>{P.forEach(($,k)=>{let U=k>u.length-1,j=U?"C":"",ne=U?m:K(r),_=U?g:r,B=`${X(16)}${s?`/${encodeURIComponent(btoa(s))}`:""}${C}`,se=encodeURIComponent(T(y,S,$,o,"VLESS",j)),oe=encodeURIComponent(T(y,S,$,o,"Trojan",j)),H=Y.includes(S)?`&security=tls&sni=${ne}&fp=randomized&alpn=${v}`:"&security=none";l&&(p+=`${atob("dmxlc3M6Ly8=")}${D}@${$}:${S}?path=/vls${B}&encryption=none&host=${_}&type=ws${H}#${se}
`),i&&(h+=`${atob("dHJvamFuOi8v")}${x}@${$}:${S}?path=/tr${B}&host=${_}&type=ws${H}#${oe}
`),y++})}),c){let S=`#${encodeURIComponent("\u{1F4A6} Chain proxy \u{1F517}")}`;if(c.startsWith("socks")||c.startsWith("http")){let $=/^(?:socks|http):\/\/([^@]+)@/,k=c.match($),U=k?k[1]:!1;w=U?c.replace(U,btoa(U))+S:c+S}else w=c.split("#")[0]+S}let re=btoa(p+h+w);return new Response(re,{status:200,headers:{"Content-Type":"text/plain;charset=utf-8","Cache-Control":"no-store, no-cache, must-revalidate, proxy-revalidate","CDN-Cache-Control":"no-store"}})}import{connect as le}from"cloudflare:sockets";function b(e){try{(e.readyState===1||e.readyState===2)&&e.close()}catch(t){console.error("safeCloseWebSocket error",t)}}async function W(e,t,r,n,o){let s=r,a=!1;await e.readable.pipeTo(new WritableStream({async write(l,i){a=!0,t.readyState!==1&&i.error("webSocket.readyState is not open, maybe close"),s?(t.send(await new Blob([s,l]).arrayBuffer()),s=null):t.send(l)}})).catch(()=>b(t)),!a&&n&&n()}async function L(e,t,r,n,o,s,a,l){let{pathName:i}=R(e);async function c(m,f){/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(m)&&(m=`${atob("d3d3Lg==")}${m}${atob("LnNzbGlwLmlv")}`);let p=le({hostname:m,port:f});t.value=p;let h=p.writable.getWriter();return await h.write(o),h.releaseLock(),p}async function d(){let m=i.split("/")[2],f=m?atob(m).split(","):void 0,p=f?f[Math.floor(Math.random()*f.length)]:O||r,h=await c(p,n);h.closed.finally(()=>{b(s)}),W(h,s,a,null,l)}let g=await c(r,n);W(g,s,a,d,l)}async function N(e,t,r){let n=!1,o=new TransformStream({transform(a,l){for(let i=0;i<a.byteLength;){let c=a.slice(i,i+2),d=new DataView(c).getUint16(0),g=new Uint8Array(a.slice(i+2,i+2+d));i=i+2+d,l.enqueue(g)}}});o.readable.pipeTo(new WritableStream({async write(a){let i=await(await fetch(I,{method:"POST",headers:{"content-type":"application/dns-message"},body:a})).arrayBuffer(),c=i.byteLength,d=new Uint8Array([c>>8&255,c&255]);e.readyState===1&&(r(`doh success and dns message length is ${c}`),n?e.send(await new Blob([d,i]).arrayBuffer()):(e.send(await new Blob([t,d,i]).arrayBuffer()),n=!0))}}));let s=o.writable.getWriter();return{write(a){s.write(a)}}}async function F(e,t){if(e.byteLength<24)return{hasError:!0,message:"invalid data"};let r=new Uint8Array(e.slice(0,1)),n=new Uint8Array(e.slice(1,17)),o=ue(n),s=!1,a=t.includes(",")?t.split(","):[t],l=await de(o);if(s=a.some(P=>l||o===P.trim()),!s)return{hasError:!0,message:"invalid user"};let i=new Uint8Array(e.slice(17,18))[0],c=new Uint8Array(e.slice(18+i,18+i+1))[0],d=!1;if(c>1){if(c!==2)return{hasError:!0,message:`command ${c} is not support, command 01-tcp,02-udp,03-mux`};d=!0}let g=18+i+1,m=e.slice(g,g+2),f=new DataView(m).getUint16(0),p=g+2,w=new Uint8Array(e.slice(p,p+1))[0],y=0,u=p+1,A="";switch(w){case 1:y=4,A=new Uint8Array(e.slice(u,u+y)).join(".");break;case 2:y=new Uint8Array(e.slice(u,u+1))[0],u+=1,A=new TextDecoder().decode(e.slice(u,u+y));break;case 3:y=16;let P=new DataView(e.slice(u,u+y)),v=[];for(let x=0;x<8;x++)v.push(P.getUint16(x*2).toString(16));A=v.join(":");break;default:return{hasError:!0,message:`invild  addressType is ${w}`}}return A?{hasError:!1,addressRemote:A,addressType:w,portRemote:f,rawDataIndex:u+y,vlessVersion:r,isUDP:d}:{hasError:!0,message:`addressValue is empty, addressType is ${w}`}}async function de(e){return!1}function pe(e,t=0){let r=[];for(let n=0;n<256;++n)r.push((n+256).toString(16).slice(1));return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}function ue(e,t=0){let r=pe(e,t);if(!J(r))throw TypeError("Stringified UUID is invalid");return r}function M(e){if(!e)return{earlyData:null,error:null};try{e=e.replace(/-/g,"+").replace(/_/g,"/");let t=atob(e);return{earlyData:Uint8Array.from(t,n=>n.charCodeAt(0)).buffer,error:null}}catch(t){return{earlyData:null,error:t}}}function V(e,t,r){let n=!1;return new ReadableStream({start(s){e.addEventListener("message",i=>{if(n)return;let c=i.data;s.enqueue(c)}),e.addEventListener("close",()=>{b(e),!n&&s.close()}),e.addEventListener("error",i=>{r("webSocketServer has error"),s.error(i)});let{earlyData:a,error:l}=M(t);l?s.error(l):a&&s.enqueue(a)},cancel(s){n||(r(`ReadableStream was canceled, due to ${s}`),n=!0,b(e))}})}async function te(e,t){let r=new WebSocketPair,[n,o]=Object.values(r);o.accept();let s="",a="",l=(f,p)=>{console.log(`[${s}:${a}] ${f}`,p||"")},i=e.headers.get("sec-websocket-protocol")||"",c=V(o,i,l),d={value:null},g=null,m=!1;return c.pipeTo(new WritableStream({async write(f){if(m&&g)return g(f);if(d.value){let C=d.value.writable.getWriter();await C.write(f),C.releaseLock();return}let{isUDP:p,message:h,hasError:w,rawDataIndex:y,portRemote:u=443,addressRemote:A="",vlessVersion:P=new Uint8Array([0,0])}=await F(f,D);if(s=A,a=`${u}--${Math.random()} ${p?"udp ":"tcp "} `,w)throw new Error(h);if(p){if(u!==53)throw new Error("UDP proxy only enable for DNS which is port 53");m=!0}let v=new Uint8Array([P[0],0]),x=f.slice(y);if(m){let{write:C}=await N(o,v,l);g=C,g(x);return}L(e,d,A,u,x,o,v,l)}})),new Response(null,{status:101,webSocket:n})}var Ke={async fetch(e,t,r){let{pathName:n}=R(e);try{let o=e.headers.get("Upgrade");if(!o||o!=="websocket")switch(n){case`/sub/${D}`:return await ee(e,t);default:return t.ASSETS.fetch(e)}else return n.startsWith("/vls")?await te(e,t):new Response(null,{status:404})}catch{return new Response("error",{status:500})}}};export{Ke as default};
