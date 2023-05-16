const shortenText = (text, n) => {
  text = text.replace(/<.*?>/g, "");

  if (text.length > n) {
    return text.substring(0, n).concat("...");
  }

  return text;
};

const numberWithCommas = (targetNumber) => {
  return targetNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TextHelper = {
  shortenText,
  numberWithCommas,
}

export default TextHelper;