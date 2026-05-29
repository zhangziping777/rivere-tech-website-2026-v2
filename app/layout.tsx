import type { Metadata, Viewport } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ViewportScaler from "@/components/ui/ViewportScaler";
import "./globals.css";

export const viewport: Viewport = {
  width: 1280,
};

export const metadata: Metadata = {
  title: "江融信科技 | 信用卡与零售信贷领域金融科技服务商",
  description:
    "致力于打造商业银行信用卡、零售信贷领域最具价值合作伙伴。提供信用卡核心系统、零售信贷一体化解决方案及专业咨询服务。",
  icons: {
    icon: "/images/logo_image_only.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="flex flex-col min-h-[800px] relative w-full">
        <ViewportScaler />
        {/* Deep space ambient glow — fixed background orbs */}
        <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-900/20 blur-[150px] rounded-full" />
        </div>
        <Header />
        <div className="flex-1 relative">
          {/* Deep blue nebula glows — site-wide bottom layer */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div
              className="absolute top-[10%] left-[-15%] w-[65vw] h-[500px]"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(30,64,175,0.30) 0%, rgba(30,64,175,0.12) 40%, transparent 70%)",
              }}
            />
            <div
              className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[500px]"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(8,145,178,0.22) 0%, rgba(8,145,178,0.08) 35%, transparent 70%)",
              }}
            />
          </div>
          <div className="relative z-[1]">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
