import "./globals.sass";

interface TypeAppEntranceProps extends Record<"children", React.ReactNode> {}

const Layout: React.FC<TypeAppEntranceProps> = ({ children }) => (
  <html lang="cn">
    <body>{children}</body>
  </html>
);

export default Layout;
