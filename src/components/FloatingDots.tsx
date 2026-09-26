function FloatingDots() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[10%] top-[20%] h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-duration:5s]" />

      <div className="absolute right-[15%] top-[35%] h-3 w-3 animate-pulse rounded-full bg-blue-400" />

      <div className="absolute bottom-[20%] left-[20%] h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:1s] [animation-duration:6s]" />

      <div className="absolute bottom-[30%] right-[10%] h-2 w-2 animate-pulse rounded-full bg-violet-400" />
    </div>
  );
}

export default FloatingDots;
