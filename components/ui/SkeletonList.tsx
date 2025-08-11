import SkeletonCard from "@/components/ui/SkeletonCard";

const SkeletonList = ({ range }: { range: number }) => {
  return (
    <ul className="grid-card-area">
      {Array.from({ length: range }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </ul>
  );
};

export default SkeletonList;
