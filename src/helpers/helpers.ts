type Dns = { Answer: { data: string }[] };

export async function resolveDNS(domain: string) {
  const dohURL = "https://cloudflare-dns.com/dns-query";
  const dohURLv4 = `${dohURL}?name=${encodeURIComponent(domain)}&type=A`;
  const dohURLv6 = `${dohURL}?name=${encodeURIComponent(domain)}&type=AAAA`;

  try {
    const [ipv4Response, ipv6Response] = await Promise.all([
      fetch(dohURLv4, { headers: { accept: "application/dns-json" } }),
      fetch(dohURLv6, { headers: { accept: "application/dns-json" } }),
    ]);

    const ipv4Addresses: Dns = await ipv4Response.json();
    const ipv6Addresses: Dns = await ipv6Response.json();

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

export function isDomain(address: string) {
  const domainPattern = /^(?!\-)(?:[A-Za-z0-9\-]{1,63}\.)+[A-Za-z]{2,}$/;
  return domainPattern.test(address);
}
