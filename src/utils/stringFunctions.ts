export const splitSentence = (
  sentence?: string,
  splitFactor: 1 | 2 | 3 | 4 = 2
): { firstPart: string; secondPart: string } => {
  const words = sentence?.split(" ");
  if (!words?.length) return { firstPart: "", secondPart: "" };
  const totalWords = words?.length;

  let splitIndex = 0;

  switch (splitFactor) {
    case 1:
      splitIndex = Math.ceil(totalWords / 4); // first quarter
      break;
    case 2:
      splitIndex = Math.ceil(totalWords / 2); // half
      break;
    case 3:
      splitIndex = Math.ceil((3 * totalWords) / 4); // three quarters
      break;
    case 4:
      splitIndex = totalWords; // all words in first part
      break;
  }

  const firstPart = words.slice(0, splitIndex).join(" ");
  const secondPart = words.slice(splitIndex).join(" ");

  return { firstPart, secondPart };
};
