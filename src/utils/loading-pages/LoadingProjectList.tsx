import SkeletonCard from "./SkeletonCard";

export default function LoadingProjectList() {
  return (
    <div className="project-object-holder">
      {
        //Created a string of ids for the blank cells to have as a pseudo-for loop
        "123456789".split("").map((i) => (
          <SkeletonCard key={i} />
        ))
      }
    </div>
  );
}
