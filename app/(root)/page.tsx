export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col mt-4 items-center gap-2 bg-red-400 -z-10 p-6 h-[50vh]">
        <div className="relative inline-block">
          <div className="header-bg"></div>
          <h1 className="header-title">WRITE FREELY. READ DEEPLY.</h1>
        </div>
        <p className="font-semibold text-gray-200 text-center">
          Write your story, discover others', and build your own library of inspiration.
        </p>
      </div>
    </div>
  );
}