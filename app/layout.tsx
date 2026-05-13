import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "江融信科技 | 信用卡与零售信贷领域金融科技服务商",
  description:
    "致力于打造商业银行信用卡、零售信贷领域最具价值合作伙伴。提供信用卡核心系统、零售信贷一体化解决方案及专业咨询服务。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
