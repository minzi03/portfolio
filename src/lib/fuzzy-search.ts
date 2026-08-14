/**
 * Lightweight fuzzy search with scoring.
 * No external dependencies — pure string matching.
 */

interface FuzzyResult<T> {
  item: T;
  score: number;
}

/**
 * Score how well `query` matches `text`.
 * Higher = better match. Returns 0 if no match.
 */
function scoreMatch(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();

  // Exact match
  if (t === q) return 100;

  // Starts with query
  if (t.startsWith(q)) return 90 - q.length * 0.5;

  // Contains query as substring
  const idx = t.indexOf(q);
  if (idx >= 0) return 70 - idx * 0.5;

  // Word-boundary match (e.g., "data eng" matches "Data Engineering")
  const words = t.split(/\s+/);
  const queryWords = q.split(/\s+/);
  const wordMatchScore = queryWords.reduce((acc, qw) => {
    const matchingWord = words.find((w) => w.startsWith(qw));
    return acc + (matchingWord ? 10 : 0);
  }, 0);
  if (wordMatchScore > 0 && wordMatchScore >= queryWords.length * 5) {
    return 50 + wordMatchScore;
  }

  // Character-by-character fuzzy match
  let qi = 0;
  let ti = 0;
  let consecutive = 0;
  let score = 0;
  let lastMatchIdx = -2;

  while (qi < q.length && ti < t.length) {
    if (q[qi] === t[ti]) {
      // Consecutive matches are worth more
      if (ti === lastMatchIdx + 1) {
        consecutive++;
        score += 5 + consecutive * 2;
      } else {
        consecutive = 0;
        score += 3;
      }
      // Bonus for matching at word boundaries
      if (ti === 0 || t[ti - 1] === " " || t[ti - 1] === "-") {
        score += 4;
      }
      lastMatchIdx = ti;
      qi++;
    }
    ti++;
  }

  // All query characters must be found
  return qi === q.length ? score : 0;
}

/**
 * Fuzzy search `query` against an array of items.
 * Returns items sorted by score (best first), filtering out score-0 items.
 */
export function fuzzySearch<T>(
  items: T[],
  query: string,
  getters: ((item: T) => string | undefined)[]
): FuzzyResult<T>[] {
  if (!query.trim()) return items.map((item) => ({ item, score: 0 }));

  const q = query.trim();

  return items
    .map((item) => {
      const bestScore = getters.reduce((max, getter) => {
        const value = getter(item);
        if (!value) return max;
        return Math.max(max, scoreMatch(q, value));
      }, 0);
      return { item, score: bestScore };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}
