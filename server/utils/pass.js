const bcrypt = require('bcryptjs');

async function verifyPassword(password, passwordHash) {
  const isMatch = await bcrypt.compare(password, passwordHash);
  return isMatch;
}

module.exports= verifyPassword;