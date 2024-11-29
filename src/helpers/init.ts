export const panelVersion = "1";
export const proxyIP = "142.250.191.78";
export const trojanPassword = "trojanPassword";
export const dohURL = "https://cloudflare-dns.com/dns-query";
export const userID = "2fb55e67-f61d-45a1-9619-a9cac3529382";
export const defaultHttpsPorts = [
  "443",
  "8443",
  "2053",
  "2083",
  "2087",
  "2096",
];

export const getParams = (request: Request) => {
  const hostName = request.headers.get("Host") || "";

  const url = new URL(request.url);
  const pathName = url.pathname;

  const searchParams = new URLSearchParams(url.search);
  const client = searchParams.get("app");

  return {
    hostName,
    pathName,
    client,
  };
};
