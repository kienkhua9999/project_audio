type CategoryChipsProps = {
  categories: string[];
};

export function CategoryChips({ categories }: CategoryChipsProps) {
  return (
    <div className="mx-auto mt-6 flex w-full max-w-[120rem] gap-3 overflow-x-auto px-5 pb-2 md:px-8 lg:px-10">
      {categories.map((category, index) => (
        <button
          key={category}
          className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
            index === 0
              ? "border-pink-500 bg-pink-500/20 text-pink-300"
              : "border-white/15 bg-white/5 text-zinc-300 hover:border-white/30 hover:text-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
