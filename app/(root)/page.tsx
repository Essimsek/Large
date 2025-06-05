import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";

export default async function Home() {
  return (
      <section className="red-container pattern">
        <Header title="Think Large. Write Larger." />
        <p className="font-semibold text-white text-center mt-4">
          Write your story, discover others', and build your own library of <span className="bg-black p-1 rounded-sm">inspiration</span>
        </p>
        <SearchForm />
      </section>
  );
}
