import "./globals.css";

export const metadata = {
  title: "Seyi | Portfolio",
  description: "Creative Design Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
