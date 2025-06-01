export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="red-container pattern">
        <div className="relative inline-block">
          <div className="header-bg"></div>
          <h1 className="header-title">Think Large. Write Larger.</h1>
        </div>
        <p className="font-semibold text-white text-center">
          Write your story, discover others', and build your own library of <span className="bg-black p-1 rounded-sm">inspiration</span>
        </p>
      </div>
    </div>
  );
}