<div
  key={evt.id}
  className={`relative overflow-hidden cursor-pointer rounded-sm group shadow-sm hover:shadow-lg transition-all duration-500 ${dynamicClass}`}
>
  <div className="relative w-full h-full min-h-62.5 md:min-h-full">
    <Image
      src={evt.coverImage}
      alt={evt.title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 brightness-[0.78] saturate-[0.85] group-hover:brightness-[0.88]"
    />
