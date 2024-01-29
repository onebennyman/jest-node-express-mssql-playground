const extractFileCreateObject = (req) => {
  const { md5, name } = req.files.file;

  return {
    md5,
    fileName: name,
  };
};

module.exports = { extractFileCreateObject };
