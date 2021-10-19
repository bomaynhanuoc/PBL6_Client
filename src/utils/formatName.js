const formatName = (nameToFormat) => {
  if (nameToFormat && nameToFormat.includes("_")) {
    return nameToFormat.replace("_", " ");
  }

  return nameToFormat;
};

export default formatName;
