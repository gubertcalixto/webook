export const base64Encode = (str) => {
  if (/ ([ ^ \u0000 - \u00ff]) /.test(str)) {
    throw Error('String must be ASCII');
  }
  const b64 =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let o1;
  let o2;
  let o3;
  let bits;
  let h1;
  let h2;
  let h3;
  let h4;
  const e = [];
  let pad = '';
  let c;

  c = str.length % 3; // pad string to length of multiple of 3
  if (c > 0) {
    while (c++ < 3) {
      pad += '=';
      str += '\0';
    }
  }
  // note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars

  for (c = 0; c < str.length; c += 3) {
    // pack three octets into four hexets
    o1 = str.charCodeAt(c);
    o2 = str.charCodeAt(c + 1);
    o3 = str.charCodeAt(c + 2);

    bits = (o1 << 16) | (o2 << 8) | o3;

    h1 = (bits >> 18) & 0x3f;
    h2 = (bits >> 12) & 0x3f;
    h3 = (bits >> 6) & 0x3f;
    h4 = bits & 0x3f;

    // use hextets to index into code string
    e[c / 3] =
      b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  }
  str = e.join(''); // use Array.join() for better performance than repeated string appends

  // replace 'A's from padded nulls with '='s
  str = str.slice(0, str.length - pad.length) + pad;

  return str;
}

export const base64Decode = (str: string) => {
  if (!/^[a-z0-9+/]+={0,2}$/i.test(str) || str.length % 4 != 0) {
    throw Error('Not base64 string');
  }

  const b64 =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let o1;
  let o2;
  let o3;
  let h1;
  let h2;
  let h3;
  let h4;
  let bits;
  const d = [];

  for (let c = 0; c < str.length; c += 4) {
    // unpack four hexets into three octets
    h1 = b64.indexOf(str.charAt(c));
    h2 = b64.indexOf(str.charAt(c + 1));
    h3 = b64.indexOf(str.charAt(c + 2));
    h4 = b64.indexOf(str.charAt(c + 3));

    bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4;

    o1 = (bits >>> 16) & 0xff;
    o2 = (bits >>> 8) & 0xff;
    o3 = bits & 0xff;

    d[c / 4] = String.fromCharCode(o1, o2, o3);
    // check for padding
    if (h4 == 0x40) {
      d[c / 4] = String.fromCharCode(o1, o2);
    }
    if (h3 == 0x40) {
      d[c / 4] = String.fromCharCode(o1);
    }
  }
  str = d.join(''); // use Array.join() for better performance than repeated string appends

  return str;
}

export const getDecodedImage = (image: string) => {
  if(!image || image.indexOf(',') === -1){
    return image;
  }
  return image.split(',')[0] + ',' + base64Decode(image.split(',')[1]);
}