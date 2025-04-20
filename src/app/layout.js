import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "@/context/AuthContext";


export const metadata = {
  title: "Tedarik-X",
  description: "Next Generation of Suppliers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
      <AuthProvider>
        <CartProvider>
        <Header />
        {children}
        <Footer />
        </CartProvider>
      </AuthProvider>
      </body>
    </html>
  );
}
