type PlaceholderBoxProps = {
  label: string;
  aspect?: string;
  className?: string;
  dark?: boolean;
};

export default function PlaceholderBox({
  label,
  aspect = "aspect-[4/3]",
  className = "",
  dark = false,
}: PlaceholderBoxProps) {
  return (
    <div
      className={`${aspect} ${className} flex items-center justify-center rounded-lg border-2 border-dashed p-4 text-center text-sm font-medium ${
        dark
          ? "border-gold-400/40 bg-navy-900/60 text-gold-300"
          : "border-navy-700/30 bg-slate-100 text-navy-700"
      }`}
    >
      {label}
    </div>
  );
}
