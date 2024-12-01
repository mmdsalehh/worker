import { isDomain, resolveDNS } from "../helpers/helpers";

export async function getConfigAddresses(
  hostName: string,
  cleanIPs: string,
  enableIPv6: boolean
) {
  const resolved = await resolveDNS(hostName);
  const defaultIPv6 = enableIPv6
    ? resolved.ipv6.map((ip: string) => `[${ip}]`)
    : [];
  return [
    hostName,
    "www.speedtest.net",
    ...resolved.ipv4,
    ...defaultIPv6,
    ...(cleanIPs ? cleanIPs.split(",") : []),
  ];
}

export function randomUpperCase(str: string) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += Math.random() < 0.5 ? str[i].toUpperCase() : str[i];
  }
  return result;
}

export function generateRemark(
  index: number,
  port: string,
  address: string,
  cleanIPs: string,
  protocol: string,
  configType: string
) {
  let addressType = isDomain(address)
    ? "Domain"
    : isIPv4(address)
    ? "IPv4"
    : isIPv6(address)
    ? "IPv6"
    : "";

  if (cleanIPs.includes(address)) addressType = "Clean IP";

  const type = configType ? ` ${configType}` : "";

  return `💦 ${index} - ${protocol}${type} - ${addressType} : ${port}`;
}

export function isIPv4(address: string) {
  const ipv4Pattern =
    /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/([0-9]|[1-2][0-9]|3[0-2]))?$/;
  return ipv4Pattern.test(address);
}

export function isIPv6(address: string) {
  const ipv6Pattern =
    /^\[(?:(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,7}:|::(?:[a-fA-F0-9]{1,4}:){0,7}|(?:[a-fA-F0-9]{1,4}:){1,6}:[a-fA-F0-9]{1,4}|(?:[a-fA-F0-9]{1,4}:){1,5}(?::[a-fA-F0-9]{1,4}){1,2}|(?:[a-fA-F0-9]{1,4}:){1,4}(?::[a-fA-F0-9]{1,4}){1,3}|(?:[a-fA-F0-9]{1,4}:){1,3}(?::[a-fA-F0-9]{1,4}){1,4}|(?:[a-fA-F0-9]{1,4}:){1,2}(?::[a-fA-F0-9]{1,4}){1,5}|[a-fA-F0-9]{1,4}:(?::[a-fA-F0-9]{1,4}){1,6})\](?:\/(1[0-1][0-9]|12[0-8]|[0-9]?[0-9]))?$/;
  return ipv6Pattern.test(address);
}

export function getRandomPath(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
