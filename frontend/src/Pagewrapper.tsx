import type { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="w-full flex flex-col h-screen">{children}</div>;
};

export default PageWrapper;
