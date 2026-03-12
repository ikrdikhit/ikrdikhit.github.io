export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-base flex items-center justify-center">
      <div className="flex gap-2" role="status" aria-label="Loading page">
        <span className="sr-only">Loading…</span>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-[#333333] animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
