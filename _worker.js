var h = (t) => {
  let s = ["443", "8443", "2053", "2083", "2087", "2096"],
    e = t.headers.get("Host") || "",
    o = "trojanPassword",
    n = "2fb55e67-f61d-45a1-9619-a9cac3529382",
    r = "1",
    a = new URL(t.url),
    c = a.pathname,
    m = new URLSearchParams(a.search).get("app");
  return {
    defaultHttpsPorts: s,
    hostName: e,
    trojanPassword: o,
    userID: n,
    panelVersion: r,
    pathname: c,
    client: m,
  };
};
var S = {
  remoteDNS: "https://8.8.8.8/dns-query",
  resolvedRemoteDNS: {},
  localDNS: "8.8.8.8",
  vlessTrojanFakeDNS: !1,
  proxyIP: "",
  outProxy: "",
  outProxyParams: {},
  cleanIPs: "",
  enableIPv6: !0,
  customCdnAddrs: "",
  customCdnHost: "",
  customCdnSni: "",
  bestVLESSTrojanInterval: "30",
  vlessConfigs: !0,
  trojanConfigs: !1,
  ports: ["443"],
  lengthMin: "100",
  lengthMax: "200",
  intervalMin: "1",
  intervalMax: "1",
  fragmentPackets: "tlshello",
  bypassLAN: !1,
  bypassIran: !1,
  bypassChina: !1,
  bypassRussia: !1,
  blockAds: !1,
  blockPorn: !1,
  blockUDP443: !1,
  customBypassRules: "",
  customBlockRules: "",
  warpEndpoints: "engage.cloudflareclient.com:2408",
  warpFakeDNS: !1,
  warpEnableIPv6: !0,
  warpPlusLicense: "",
  bestWarpInterval: "30",
  hiddifyNoiseMode: "m4",
  nikaNGNoiseMode: "quic",
  noiseCountMin: "10",
  noiseCountMax: "15",
  noiseSizeMin: "5",
  noiseSizeMax: "10",
  noiseDelayMin: "1",
  noiseDelayMax: "1",
  panelVersion: "1",
};
async function D(t) {
  let s = "https://cloudflare-dns.com/dns-query",
    e = `${s}?name=${encodeURIComponent(t)}&type=A`,
    o = `${s}?name=${encodeURIComponent(t)}&type=AAAA`;
  try {
    let [n, r] = await Promise.all([
        fetch(e, { headers: { accept: "application/dns-json" } }),
        fetch(o, { headers: { accept: "application/dns-json" } }),
      ]),
      a = await n.json(),
      c = await r.json(),
      f = a.Answer ? a.Answer.map((u) => u.data) : [],
      m = c.Answer ? c.Answer.map((u) => u.data) : [];
    return { ipv4: f, ipv6: m };
  } catch (n) {
    throw (
      (console.error("Error resolving DNS:", n),
      new Error(`An error occurred while resolving DNS - ${n}`))
    );
  }
}
function F(t) {
  return /^(?!\-)(?:[A-Za-z0-9\-]{1,63}\.)+[A-Za-z]{2,}$/.test(t);
}
async function U(t, s, e) {
  let o = await D(t),
    n = e ? o.ipv6.map((r) => `[${r}]`) : [];
  return [t, "www.speedtest.net", ...o.ipv4, ...n, ...(s ? s.split(",") : [])];
}
function N(t) {
  let s = "";
  for (let e = 0; e < t.length; e++)
    s += Math.random() < 0.5 ? t[e].toUpperCase() : t[e];
  return s;
}
function A(t, s, e, o, n, r) {
  let a,
    c = r ? ` ${r}` : "";
  return (
    o.includes(e)
      ? (a = "Clean IP")
      : (a = F(e) ? "Domain" : O(e) ? "IPv4" : K(e) ? "IPv6" : ""),
    `\u{1F4A6} ${t} - ${n}${c} - ${a} : ${s}`
  );
}
function O(t) {
  return /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/([0-9]|[1-2][0-9]|3[0-2]))?$/.test(
    t
  );
}
function K(t) {
  return /^\[(?:(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,7}:|::(?:[a-fA-F0-9]{1,4}:){0,7}|(?:[a-fA-F0-9]{1,4}:){1,6}:[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,5}(?::[a-fA-F0-9]{1,4}){1,2}|(?:[a-fA-F0-9]{1,4}:){1,4}(?::[a-fA-F0-9]{1,4}){1,3}|(?:[a-fA-F0-9]{1,4}:){1,3}(?::[a-fA-F0-9]{1,4}){1,4}|(?:[a-fA-F0-9]{1,4}:){1,2}(?::[a-fA-F0-9]{1,4}){1,5}|[a-fA-F0-9]{1,4}:(?::[a-fA-F0-9]{1,4}){1,6})\](?:\/(1[0-1][0-9]|12[0-8]|[0-9]?[0-9]))?$/.test(
    t
  );
}
function k(t) {
  let s = "",
    e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    o = e.length;
  for (let n = 0; n < t; n++) s += e.charAt(Math.floor(Math.random() * o));
  return s;
}
async function M(t, s) {
  let {
      hostName: e,
      client: o,
      trojanPassword: n,
      defaultHttpsPorts: r,
      userID: a,
    } = h(t),
    {
      cleanIPs: c,
      proxyIP: f,
      ports: m,
      vlessConfigs: u,
      trojanConfigs: j,
      outProxy: p,
      customCdnAddrs: C,
      customCdnHost: E,
      customCdnSni: L,
      enableIPv6: H,
    } = S,
    y = "",
    $ = "",
    P = "",
    v = 1,
    x = await U(e, c, H),
    T = C ? C.split(",") : [],
    z = [...x, ...T],
    V = o === "singbox" ? "http/1.1" : "h2,http/1.1",
    W = encodeURIComponent(n),
    B =
      o === "singbox"
        ? "&eh=Sec-WebSocket-Protocol&ed=2560"
        : encodeURIComponent("?ed=2560");
  if (
    (m.forEach((i) => {
      z.forEach((d, g) => {
        let l = g > x.length - 1,
          w = l ? "C" : "",
          q = l ? L : N(e),
          R = l ? E : e,
          I = `${k(16)}${f ? `/${encodeURIComponent(btoa(f))}` : ""}${B}`,
          G = encodeURIComponent(A(v, i, d, c, "VLESS", w)),
          J = encodeURIComponent(A(v, i, d, c, "Trojan", w)),
          b = r.includes(i)
            ? `&security=tls&sni=${q}&fp=randomized&alpn=${V}`
            : "&security=none";
        u &&
          (y += `${atob(
            "dmxlc3M6Ly8="
          )}${a}@${d}:${i}?path=/${I}&encryption=none&host=${R}&type=ws${b}#${G}
`),
          j &&
            ($ += `${atob(
              "dHJvamFuOi8v"
            )}${W}@${d}:${i}?path=/tr${I}&host=${R}&type=ws${b}#${J}
`),
          v++;
      });
    }),
    p)
  ) {
    let i = `#${encodeURIComponent("\u{1F4A6} Chain proxy \u{1F517}")}`;
    if (p.startsWith("socks") || p.startsWith("http")) {
      let d = /^(?:socks|http):\/\/([^@]+)@/,
        g = p.match(d),
        l = g ? g[1] : !1;
      P = l ? p.replace(l, btoa(l)) + i : p + i;
    } else P = p.split("#")[0] + i;
  }
  let Z = btoa(y + $ + P);
  return new Response(Z, {
    status: 200,
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "CDN-Cache-Control": "no-store",
    },
  });
}
var ct = {
  async fetch(t, s, e) {
    let { userID: o } = h(t);
    try {
      let { pathname: n } = h(t);
      switch (n) {
        case `/sub/${o}`:
          return await M(t, s);
        default:
          return s.ASSETS.fetch(t);
      }
    } catch {
      return new Response("error", { status: 500 });
    }
  },
};
export { ct as default };
