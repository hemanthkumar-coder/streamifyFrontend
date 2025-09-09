import { LoaderIcon } from "lucide-react";

const PageLoader = () => {
  return (
    <div
      className="min-h-screen flex  justify-center items-center"
      data-theme="forest"
    >
      <LoaderIcon className="animate-spin size-10 text-primary" />
    </div>
  );
};

export default PageLoader;
