"use client";
// src/components/Navbar.js
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // kendi pathine göre ayarla
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const { user, isLoggedIn, logout } = useAuth();
   const [showDropdown, setShowDropdown] = useState(false);
 
  const router = useRouter();


  const handleUserClick = () => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#123458",
        color: "#fff",
      }}
    >
      {/* Logo */}
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        <Link href="/" style={{ color: "white", textDecoration: "none" }}>
          SUPPLIER-X
        </Link>
      </div>
      {/* Sağdaki ikonlar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {/* Sepet */}
        <Link href="/cart" style={{ position: "relative", color: "white" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            width="28"
            height="28"
          >
            <path d="M7 4h-2l-3 7v2h2l2-2h11v-2h-11l-1.5-3.5h16l-1.5 3.5h-1v2h2l2-7h-20l1-2h18v-2h-20z" />
          </svg>
          {cart.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
              }}
            >
              {cart.length}
            </span>
          )}
        </Link>

        {/* Kullanıcı */}
        {isLoggedIn ? (
          <div style={{ position: "relative" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              width="28"
              height="28"
            >
              <path d="M12 2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
            </svg>
            {/* Profil Dropdown */}
            <div style={{ position: "relative" }}>
              {isLoggedIn ? (
                <div style={{ position: "relative", display: "inline-block" }}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "white",
                      fontSize: "1rem",
                    }}
                  >
                    {user.name}
                  </button>

                  {showDropdown && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "2.5rem",
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "1rem",
                        minWidth: "150px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        zIndex: 55
                      }}
                    >
                      <p style={{ marginBottom: "0.5rem" }}>
                      <a onClick={() => setShowDropdown(!showDropdown)} href="/profile" style={{ color: "black", fontSize: "1rem" }}>
                        Profil
                       </a>
                      </p>
                      <button
                        onClick={handleLogout}
                        style={{
                          backgroundColor: "#f44336",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          padding: "0.5rem",
                          cursor: "pointer",
                          width: "100%",
                        }}
                      >
                        Çıkış Yap
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <a href="/login" style={{ color: "white", fontSize: "1.5rem" }}>
                  Giriş Yap
                </a>
              )}
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            style={{ color: "white", textDecoration: "none" }}
          >
            Giriş Yap
          </Link>
        )}
      </div>
    </nav>
  );
}
