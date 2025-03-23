import Script from "next/script";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log("@-Layout");
  return (
    <>
      {children}
      <Script src="/lib/tinymce/tinymce.min.js" />
      <Script src="/lib/tinymce/models/dom/model.min.js" />
      <Script src="/lib/tinymce/themes/silver/theme.min.js" />
      <Script src="/lib/tinymce/icons/default/icons.min.js" />
      <Script src="/lib/tinymce/plugins/link/plugin.min.js" />
      <Script src="/lib/tinymce/plugins/table/plugin.min.js" />
      <Script src="/lib/tinymce/plugins/lists/plugin.min.js" />
      <Script src="/lib/tinymce/plugins/media/plugin.min.js" />
      <Script src="/lib/tinymce/plugins/image/plugin.min.js" />
      <Script src="/lib/tinymce/plugins/anchor/plugin.min.js" />
      <Script src="/lib/tinymce/plugins/charmap/plugin.min.js" />
      <Script src="/lib/tinymce/plugins/advlist/plugin.min.js" />
      <Script src="/lib/tinymce/plugins/autolink/plugin.min.js" />
      <Script src="/lib/tinymce/plugins/wordcount/plugin.min.js" />
      <Script src="/lib/tinymce/plugins/codesample/plugin.min.js" />
      <Script src="/lib/tinymce/plugins/visualblocks/plugin.min.js" />
      <Script src="/lib/tinymce/plugins/searchreplace/plugin.min.js" />
      <Script src="/lib/tinymce/plugins/insertdatetime/plugin.min.js" />
      {/* <Script src="/lib/tinymce/langs/zh_CN.js" /> */}
    </>
  );
};

export default Layout;
