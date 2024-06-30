import { DBlocal } from "@/utils/db";
import styles from "./main.module.sass";
import Personal from "@/components/Personal";
import Navigation from "@/components/Navigation/Main";
import StyledComponentsRegistry from "@/components/AntdRegistry";

interface TypeMainProps {
  children?: React.ReactNode;
}

const theme = {
  token: {
    colorPrimary: "#000000",
    colorInfo: "#000000",
    colorPrimaryBg: "#000000",
    colorPrimaryTextActive: "#ffffff",
  },
  components: {
    Menu: {
      itemSelectedColor: "rgb(255, 255, 255)",
    },
    Select: {
      optionSelectedColor: "rgb(255, 255, 255)",
    },
  },
};

export async function generateMetadata() {
  const config = DBlocal.get();
  return {
    title: config.title,
    description: "description",
  };
}

const Layout: React.FC<TypeMainProps> = ({ children }) => {
  const config = DBlocal.get();
  return (
    <>
      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <Personal />
        </aside>
        <div className={styles.context}>
          <Navigation />
          <StyledComponentsRegistry theme={theme}>
            {children}
          </StyledComponentsRegistry>
        </div>
      </main>
      {config.forTheRecord ? (
        <footer className={styles.footer}>
          <a href="https://beian.miit.gov.cn/" target="_blank">
            {config.forTheRecord}
          </a>
        </footer>
      ) : null}
    </>
  );
};

export default Layout;
