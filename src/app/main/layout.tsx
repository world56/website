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
      <main className="md:w-[1300px] mx-auto md:flex md:justify-between">
        <Personal />
        <div
          className={`
          ${config.forTheRecord ? "" : "md:mb-14 mb-20"}
          md:w-[985px] md:mt-14 md:min-h-[706px] md:p-[30px] md:pt-[90px] 
          mx-3 md:mr-0 p-5 shadow-custom rounded-3xl relative bg-white dark:bg-card
        `}
        >
          <Navigation />
          {children}
        </div>
      </main>
      {config.forTheRecord ? (
        <footer className="md:w-[1300px] mt-3 mb-20 md:my-6 mx-auto text-center">
          <a
            target="_blank"
            href="https://beian.miit.gov.cn/"
            className="md:pl-[315px] text-zinc-400 text-[15px]"
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
