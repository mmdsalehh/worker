export default {
  async fetch(request, env, ctx) {
    const { userID } = getParams(request);

    try {
      const { pathname } = getParams(request);
      switch (pathname) {
        case `/sub/${userID}`:
          return await getNormalConfigs(request, env);
        default:
          return env.ASSETS.fetch(request);
      }
    } catch (err) {
      return new Response("error", { status: 500 });
    }
  },
};

async function getNormalConfigs(request, env) {
  const { hostName, client, trojanPassword, defaultHttpsPorts, userID } =
    getParams(request);

  const {
    cleanIPs,
    proxyIP,
    ports,
    vlessConfigs,
    trojanConfigs,
    outProxy,
    customCdnAddrs,
    customCdnHost,
    customCdnSni,
    enableIPv6,
  } = proxySettings;

  let vlessConfs = "",
    trojanConfs = "",
    chainProxy = "";
  let proxyIndex = 1;

  const Addresses = await getConfigAddresses(hostName, cleanIPs, enableIPv6);
  const customCdnAddresses = customCdnAddrs ? customCdnAddrs.split(",") : [];
  const totalAddresses = [...Addresses, ...customCdnAddresses];
  const alpn = client === "singbox" ? "http/1.1" : "h2,http/1.1";
  const trojanPass = encodeURIComponent(trojanPassword);
  const earlyData =
    client === "singbox"
      ? "&eh=Sec-WebSocket-Protocol&ed=2560"
      : encodeURIComponent("?ed=2560");

  ports.forEach((port) => {
    totalAddresses.forEach((addr, index) => {
      const isCustomAddr = index > Addresses.length - 1;
      const configType = isCustomAddr ? "C" : "";
      const sni = isCustomAddr ? customCdnSni : randomUpperCase(hostName);
      const host = isCustomAddr ? customCdnHost : hostName;
      const path = `${getRandomPath(16)}${
        proxyIP ? `/${encodeURIComponent(btoa(proxyIP))}` : ""
      }${earlyData}`;
      const vlessRemark = encodeURIComponent(
        generateRemark(proxyIndex, port, addr, cleanIPs, "VLESS", configType)
      );
      const trojanRemark = encodeURIComponent(
        generateRemark(proxyIndex, port, addr, cleanIPs, "Trojan", configType)
      );
      const tlsFields = defaultHttpsPorts.includes(port)
        ? `&security=tls&sni=${sni}&fp=randomized&alpn=${alpn}`
        : "&security=none";

      if (vlessConfigs) {
        vlessConfs += `${atob(
          "dmxlc3M6Ly8="
        )}${userID}@${addr}:${port}?path=/${path}&encryption=none&host=${host}&type=ws${tlsFields}#${vlessRemark}\n`;
      }

      if (trojanConfigs) {
        trojanConfs += `${atob(
          "dHJvamFuOi8v"
        )}${trojanPass}@${addr}:${port}?path=/tr${path}&host=${host}&type=ws${tlsFields}#${trojanRemark}\n`;
      }

      proxyIndex++;
    });
  });

  if (outProxy) {
    let chainRemark = `#${encodeURIComponent("💦 Chain proxy 🔗")}`;
    if (outProxy.startsWith("socks") || outProxy.startsWith("http")) {
      const regex = /^(?:socks|http):\/\/([^@]+)@/;
      const isUserPass = outProxy.match(regex);
      const userPass = isUserPass ? isUserPass[1] : false;
      chainProxy = userPass
        ? outProxy.replace(userPass, btoa(userPass)) + chainRemark
        : outProxy + chainRemark;
    } else {
      chainProxy = outProxy.split("#")[0] + chainRemark;
    }
  }

  const configs = btoa(vlessConfs + trojanConfs + chainProxy);
  return new Response(configs, {
    status: 200,
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "CDN-Cache-Control": "no-store",
    },
  });
}

async function getConfigAddresses(hostName, cleanIPs, enableIPv6) {
  const resolved = await resolveDNS(hostName);
  const defaultIPv6 = enableIPv6 ? resolved.ipv6.map((ip) => `[${ip}]`) : [];
  return [
    hostName,
    "www.speedtest.net",
    ...resolved.ipv4,
    ...defaultIPv6,
    ...(cleanIPs ? cleanIPs.split(",") : []),
  ];
}

function randomUpperCase(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += Math.random() < 0.5 ? str[i].toUpperCase() : str[i];
  }
  return result;
}

function generateRemark(index, port, address, cleanIPs, protocol, configType) {
  let addressType;
  const type = configType ? ` ${configType}` : "";

  cleanIPs.includes(address)
    ? (addressType = "Clean IP")
    : (addressType = isDomain(address)
        ? "Domain"
        : isIPv4(address)
        ? "IPv4"
        : isIPv6(address)
        ? "IPv6"
        : "");

  return `💦 ${index} - ${protocol}${type} - ${addressType} : ${port}`;
}

function isIPv4(address) {
  const ipv4Pattern =
    /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/([0-9]|[1-2][0-9]|3[0-2]))?$/;
  return ipv4Pattern.test(address);
}

function isIPv6(address) {
  const ipv6Pattern =
    /^\[(?:(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,7}:|::(?:[a-fA-F0-9]{1,4}:){0,7}|(?:[a-fA-F0-9]{1,4}:){1,6}:[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,5}(?::[a-fA-F0-9]{1,4}){1,2}|(?:[a-fA-F0-9]{1,4}:){1,4}(?::[a-fA-F0-9]{1,4}){1,3}|(?:[a-fA-F0-9]{1,4}:){1,3}(?::[a-fA-F0-9]{1,4}){1,4}|(?:[a-fA-F0-9]{1,4}:){1,2}(?::[a-fA-F0-9]{1,4}){1,5}|[a-fA-F0-9]{1,4}:(?::[a-fA-F0-9]{1,4}){1,6})\](?:\/(1[0-1][0-9]|12[0-8]|[0-9]?[0-9]))?$/;
  return ipv6Pattern.test(address);
}

function getRandomPath(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function resolveDNS(domain) {
  const dohURL = "https://cloudflare-dns.com/dns-query";
  const dohURLv4 = `${dohURL}?name=${encodeURIComponent(domain)}&type=A`;
  const dohURLv6 = `${dohURL}?name=${encodeURIComponent(domain)}&type=AAAA`;

  try {
    const [ipv4Response, ipv6Response] = await Promise.all([
      fetch(dohURLv4, { headers: { accept: "application/dns-json" } }),
      fetch(dohURLv6, { headers: { accept: "application/dns-json" } }),
    ]);

    const ipv4Addresses = await ipv4Response.json();
    const ipv6Addresses = await ipv6Response.json();

    const ipv4 = ipv4Addresses.Answer
      ? ipv4Addresses.Answer.map((record) => record.data)
      : [];
    const ipv6 = ipv6Addresses.Answer
      ? ipv6Addresses.Answer.map((record) => record.data)
      : [];

    return { ipv4, ipv6 };
  } catch (error) {
    console.error("Error resolving DNS:", error);
    throw new Error(`An error occurred while resolving DNS - ${error}`);
  }
}

function isDomain(address) {
  const domainPattern = /^(?!\-)(?:[A-Za-z0-9\-]{1,63}\.)+[A-Za-z]{2,}$/;
  return domainPattern.test(address);
}

const getParams = (request) => {
  const defaultHttpsPorts = ["443", "8443", "2053", "2083", "2087", "2096"];
  const hostName = request.headers.get("Host") || "";
  const trojanPassword = "trojanPassword";
  const userID = "2fb55e67-f61d-45a1-9619-a9cac3529382";
  const panelVersion = "1";

  const url = new URL(request.url);
  const pathname = url.pathname;

  const searchParams = new URLSearchParams(url.search);
  const client = searchParams.get("app");

  return {
    defaultHttpsPorts,
    hostName,
    trojanPassword,
    userID,
    panelVersion,
    pathname,
    client,
  };
};

const proxySettings = {
  remoteDNS: "https://8.8.8.8/dns-query",
  resolvedRemoteDNS: {},
  localDNS: "8.8.8.8",
  vlessTrojanFakeDNS: false,
  proxyIP: "",
  outProxy: "",
  outProxyParams: {},
  cleanIPs: "",
  enableIPv6: true,
  customCdnAddrs: "",
  customCdnHost: "",
  customCdnSni: "",
  bestVLESSTrojanInterval: "30",
  vlessConfigs: true,
  trojanConfigs: false,
  ports: ["443"],
  lengthMin: "100",
  lengthMax: "200",
  intervalMin: "1",
  intervalMax: "1",
  fragmentPackets: "tlshello",
  bypassLAN: false,
  bypassIran: false,
  bypassChina: false,
  bypassRussia: false,
  blockAds: false,
  blockPorn: false,
  blockUDP443: false,
  customBypassRules: "",
  customBlockRules: "",
  warpEndpoints: "engage.cloudflareclient.com:2408",
  warpFakeDNS: false,
  warpEnableIPv6: true,
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
