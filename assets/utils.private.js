//@ts-check

/**
 * @param {string} whatsappNumber
 * @returns {string}
 * @description Extracts the phone number from a whatsapp formated number
 */
function extractPhoneNumber(whatsappNumber) {
  return whatsappNumber.split(':')[1];
}

module.exports = { extractPhoneNumber };
