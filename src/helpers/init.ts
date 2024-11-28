export const getParams = (request: Request) => {
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
