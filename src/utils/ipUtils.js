export const ipToBinary = (ip) => {
  return ip.split('.')
    .map(octet => parseInt(octet).toString(2).padStart(8, '0'))
    .join('.');
};

export const ipToHex = (ip) => {
  return ip.split('.')
    .map(octet => parseInt(octet).toString(16).toUpperCase().padStart(2, '0'))
    .join(':');
};

export const isValidIPv4 = (ip) => {
  const octets = ip.split('.');
  return octets.length === 4 && 
    octets.every(octet => {
      const num = parseInt(octet);
      return !isNaN(num) && num >= 0 && num <= 255;
    });
};

export const cidrToMask = (cidr) => {
  const mask = [];
  for (let i = 0; i < 4; i++) {
    const bits = Math.min(8, cidr - i * 8);
    mask.push(256 - Math.pow(2, 8 - Math.max(0, bits)));
  }
  return mask.join('.');
};

export const maskToCidr = (mask) => {
  const binary = mask.split('.').map(octet => 
    parseInt(octet).toString(2).padStart(8, '0')
  ).join('');
  return (binary.match(/1/g) || []).length;
};