import "./globals.css";
export const metadata = {
  title: "NextChat | Мессенджер",
  description: "Мессенджер NextChat",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
