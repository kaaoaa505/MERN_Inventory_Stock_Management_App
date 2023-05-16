const shortenText = (text, n) => {
  text = text.replace(/<.*?>/g, "");

  if (text.length > n) {
    return text.substring(0, n).concat("...");
  }

  return text;
};

const TextHelper = {
  shortenText,
}

export default TextHelper;