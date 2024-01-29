const generateTextDecorated = (middleText, caracter = '*') => {
  const text = `${caracter} ${middleText} ${caracter}`;
  const astericsDecotrator = caracter.repeat(text.length);
  return `
    ${astericsDecotrator}
    ${text}
    ${astericsDecotrator}
    `;
};

module.exports = { generateTextDecorated };
