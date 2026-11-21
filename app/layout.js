import "@fontsource-variable/cairo";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
import { site } from "@/data/site";

export const metadata = {
  title: { default: `${site.name}`, template: `%s | ${site.name}` },
  description: site.tagline,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollTop />
      </body>
    </html>
  );
}
