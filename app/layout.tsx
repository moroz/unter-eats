import "../styles/globals.css";
import styles from "./Layout.module.sass";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body className={styles.layout}>{children}</body>
    </html>
  );
}
