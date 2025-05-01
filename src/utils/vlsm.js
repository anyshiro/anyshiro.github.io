export const vlsmSubnetting = (baseNetwork, requirements) => {
    const { ip, cidr } = baseNetwork;
    
    // Конвертация базовой сети в 32-битное число
    const network = ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);
    const mask = 0xFFFFFFFF << (32 - cidr);
    let current = network;
  
    return requirements.map(({ hosts }) => {
      const neededSize = hosts + 2; // + network + broadcast
      const cidr = 32 - Math.ceil(Math.log2(neededSize));
      const subnetMask = 0xFFFFFFFF << (32 - cidr);
      
      const subnet = {
        network: intToIp(current),
        mask: intToIp(subnetMask >>> 0),
        cidr,
        firstHost: intToIp(current + 1),
        lastHost: intToIp((current | ~subnetMask) - 1),
        broadcast: intToIp(current | ~subnetMask),
        hosts
      };
  
      current = (current | ~subnetMask) + 1;
      
      if (current > (network | ~mask)) {
        throw new Error('Недостаточно адресного пространства');
      }
  
      return subnet;
    });
  };
  
  const intToIp = (int) => {
    return [
      (int >>> 24) & 0xFF,
      (int >>> 16) & 0xFF,
      (int >>> 8) & 0xFF,
      int & 0xFF
    ].join('.');
  };