export const calculateSubnetInfo = (ip, cidr) => {
  const ipArray = ip.split('.').map(Number);
  const mask = Array(4)
    .fill(0)
    .map((_, i) => 
      cidr > i * 8 + 8 
        ? 255 
        : cidr <= i * 8 
          ? 0 
          : (0xff00 >> (cidr % 8)) & 0xff
    );
  
  const network = ipArray.map((octet, i) => octet & mask[i]).join('.');
  const broadcast = mask.map((octet, i) => octet | (~ipArray[i] & 0xff)).join('.');
  const firstHost = network.split('.').map((octet, i) => i === 3 ? +octet + 1 : octet).join('.');
  const lastHost = broadcast.split('.').map((octet, i) => i === 3 ? +octet - 1 : octet).join('.');
  const usableHosts = 2 ** (32 - cidr) - 2;

  return {
    network,
    mask: mask.join('.'),
    cidr,
    firstHost,
    lastHost,
    broadcast,
    usableHosts: usableHosts > 0 ? usableHosts : 0
  };
};