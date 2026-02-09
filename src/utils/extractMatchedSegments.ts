export interface MatchedSegment {
  matched: boolean;
  text: string;
}

const extractMatchedSegments = (source: string, keyword: string): MatchedSegment[] => {
  const keywordChars = Array.from(keyword.toLowerCase());

  return Array.from(source).reduce<{ segments: MatchedSegment[]; keywordIndex: number }>(
    ({ segments, keywordIndex }, char) => {
      const isMatched = char.toLowerCase() === keywordChars[keywordIndex];
      const updatedIndex = isMatched ? keywordIndex + 1 : keywordIndex;
      const last = segments[segments.length - 1];

      if (!last || last.matched !== isMatched) {
        segments.push({ matched: isMatched, text: char });
      } else {
        last.text += char;
      }

      return { segments, keywordIndex: updatedIndex };
    },
    { segments: [], keywordIndex: 0 },
  ).segments;
};

export default extractMatchedSegments;
