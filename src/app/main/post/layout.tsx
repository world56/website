import StyledComponentsRegistry from "@/lib/AntdRegistry";

interface TypeMainProps {
  children?: React.ReactNode;
}

const Layout: React.FC<TypeMainProps> = ({ children }) => (
  <StyledComponentsRegistry
    theme={{
      components: {
        Pagination: {
          colorLink:'red',
          itemActiveBg: "#000",
          colorPrimary: "#FFF",
          colorPrimaryHover: "#FFF",
        },
      },
    }}
  >
    {children}
  </StyledComponentsRegistry>
);

export default Layout;
