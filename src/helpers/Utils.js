 function randomString(len = 12, charStr = 'abcdefghijklmnopqrstuvwxyz0123456789') {
    const chars = [...`${charStr}`];
    return [...Array(len)].map((i) => chars[(Math.random() * chars.length) | 0]).join('');
  }


module.exports={randomString}
