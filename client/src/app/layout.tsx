import type { Metadata } from "next";

// Style sheet
import "../../style/css/style.css";

// Font styles
import "../../style/css/font.css";

export const metadata: Metadata = {
  title: "Food System",
  description: "Food ordering and management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
