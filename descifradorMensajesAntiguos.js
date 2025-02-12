function decodeMessage(message) {
  const regex = /^[a-zA-ZáéíóúüÁÉÍÓÚÜ0-9¿?!¡ >*]+$/;
  const numbersToLetters = new Map([
    ["0", "o"],
    ["1", "i"],
    ["3", "e"],
    ["4", "a"],
    ["5", "s"],
    ["7", "t"],
  ]);

  let decodedMessage = "";
  let changeChar = false,
    deleteChar = false;

  for (let i = 0; i < message.length; i++) {
    let actualChar = message[i];
    if (!regex.test(actualChar) || deleteChar) {
      deleteChar = false;
      continue;
    }
    if (numbersToLetters.has(actualChar)) {
      decodedMessage += numbersToLetters.get(actualChar);

      if (changeChar) {
        changeChar = false;

        if (decodedMessage.length > 1) {
          let leftChar = decodedMessage[decodedMessage.length - 1],
            lastChar = decodedMessage[decodedMessage.length - 2];
          decodedMessage =
            decodedMessage.slice(0, decodedMessage.length - 2) +
            leftChar +
            lastChar;
        }
      }
    } else if (actualChar === ">") changeChar = true;
    else if (actualChar === "*") deleteChar = true;
    else {
      if (changeChar) {
        changeChar = false;

        // Importante: verificar longitud para que no itente accer a la posición -1
        if (decodedMessage.length > 0) {
          let leftChar = decodedMessage[decodedMessage.length - 1];
          decodedMessage =
            decodedMessage.slice(0, decodedMessage.length - 1) + //cogemos la última parte sin el útlimo caracter
            actualChar +
            leftChar;
        } else {
          decodedMessage += actualChar; // Si no hay caracter previo, añade actualChar
        }
      } else decodedMessage += actualChar;
    }
  }
  return decodedMessage;
}

console.log(decodeMessage("a*bc>d"));
// "adc"
console.log(decodeMessage("†¡H$0*l4>l!║¤"));
// "¡Hola!"
