import Script from "next/script";
import { DBlocal } from "@/lib/db";
import Personal from "@/components/Personal";
import Navigation from "@/components/Navigation/Main";

interface TypeMainProps {
  children?: React.ReactNode;
}

const Layout: React.FC<TypeMainProps> = ({ children }) => {
  const config = DBlocal.get();
  return (
    <>
      <main className="w-[1300px] mx-auto flex justify-between">
        <Personal />
        <div className="w-[985px] min-h-[706px] mb-8 mt-14 p-[30px] pt-[90px] shadow-custom rounded-3xl relative bg-white">
          <Navigation />
          {children}
        </div>
      </main>
      {config.forTheRecord ? (
        <footer className="w-[1300px] mb-7 mx-auto text-center">
          <a
            target="_blank"
            href="https://beian.miit.gov.cn/"
            className="pl-[315px] text-zinc-400 text-[15px]"
          >
            {config.forTheRecord}
          </a>
        </footer>
      ) : null}
      <Script src="/lib/welcome" />
    </>
  );
};

export default Layout;
