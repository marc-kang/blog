const quotes = [
  "die as yourself rather than live as another",
  "embrace reality and deal with it",
  "don't conform, you were never meant to fit",
];

function QuoteSet() {
  return (
    <>
      {quotes.map((quote, i) => (
        <span key={i} className="mx-8 shrink-0">
          {quote}
        </span>
      ))}
    </>
  );
}

export function ScrollingBanner() {
  return (
    <div className="w-full overflow-hidden border-b border-border bg-background">
      <div className="animate-marquee flex whitespace-nowrap py-1.5 text-xs text-muted-foreground">
        <QuoteSet />
        <QuoteSet />
        <QuoteSet />
        <QuoteSet />
      </div>
    </div>
  );
}
