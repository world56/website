import "./globals.sass";

interface TypeAppEntranceProps extends Record<"children", React.ReactNode> {}

const Layout: React.FC<TypeAppEntranceProps> = ({ children }) => (
  <html lang="cn">
    <head>
      <link rel="stylesheet" href="/lib/tinymce/skins/ui/oxide/skin.min.css" />
      <link
        rel="stylesheet"
        href="/lib/tinymce/skins/ui/oxide/content.min.css"
      />
      <link
        rel="stylesheet"
        href="/lib/tinymce/skins/content/default/content.min.css"
      />
    </head>
    <body>{children}</body>
  </html>
);

export default Layout;
