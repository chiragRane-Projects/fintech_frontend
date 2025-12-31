export function cleanAIText(text = "") {
  return text
    .replace(/\*\*/g, "")        // remove bold **
    .replace(/\*/g, "")          // remove bullet *
    .replace(/^\s*-\s*/gm, "")   // remove dash lists
    .replace(/\n{3,}/g, "\n\n")  // normalize spacing
    .trim()
}
