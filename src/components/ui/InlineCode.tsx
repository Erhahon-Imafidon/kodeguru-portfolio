type Props = { text: string };

export function InlineCode({ text }: Props) {
  const parts = text.split(/(`[^`]+`)/);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code
            key={i}
            className="font-mono rounded bg-bg-3 px-1.5 py-px text-[13.5px] text-teal-soft"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
