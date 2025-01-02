import dataset from "@/assets/data/quotes.json";
import { Quote } from "@/types/qoute";

export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * dataset.length - 1).toString();

  const quote = dataset.quote[randomIndex as keyof typeof dataset.quote];
  const author = dataset.author[randomIndex as keyof typeof dataset.author];
  const tags = dataset.tags[randomIndex as keyof typeof dataset.tags];

  if (!quote || !author || !tags) {
    return getRandomQuote();
  }

  return {
    idx: randomIndex,
    quote,
    author,
    tags: dataset.tags[randomIndex as keyof typeof dataset.tags],
  };
}
