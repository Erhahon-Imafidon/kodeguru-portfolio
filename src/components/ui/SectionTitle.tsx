type Props = { children: string };

export function SectionTitle({ children }: Props) {
  return (
    <h2 className="font-display mb-10 flex items-center gap-3 text-sm font-semibold text-ink-soft">
      <span aria-hidden="true" className="grad-bg h-[2px] w-[22px] rounded-[2px]" />
      {children}
    </h2>
  );
}
