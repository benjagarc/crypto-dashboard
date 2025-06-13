import { FC } from "react";

export const Loader: FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-white text-lg font-semibold animate-pulse">
        Processing payment...
      </p>
    </div>
  );
};
