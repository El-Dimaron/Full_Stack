// import dns from "node:dns/promises";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

console.log("DNS servers:", dns.getServers());

try {
  const result = await dns.promises.resolveSrv("_mongodb._tcp.appcluster.xdc5dka.mongodb.net");

  console.log(result);
} catch (error) {
  console.error(error);
}
