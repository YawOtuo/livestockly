import Navbar from "./components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full flex flex-col items-center justify-center max-w-[1728px]">
      <Navbar />
      {children}
    </div>
  );
}
