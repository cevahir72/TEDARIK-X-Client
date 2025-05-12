"use client";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext"; // bunu da ekliyoruz
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const calculateSubtotal = () => {
    return cart?.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1; // %10 KDV
  const shipping = 0; // Ücretsiz
  const total = subtotal + tax + shipping;

  const handleCheckoutClick = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Quicksand, sans-serif",
        color:"gray",
        backgroundColor: "#F1EFEC",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "30px",
          color: "#123458",
        }}
      >
        Sepetim
      </h1>

      {cart && cart.length === 0 ? (
        <p style={{ fontSize: "20px", color: "#555" }}>Sepetiniz boş.</p>
      ) : (
        <>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {cart?.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px",
                  border: "1px solid #D4C9BE",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <div>
                    <h2
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#123458",
                      }}
                    >
                      {item.name}
                    </h2>
                    <p style={{ color: "#555" }}>{item.price.toFixed(2)} ₺</p>
                  </div>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: "#D4C9BE",
                      border: "none",
                      borderRadius: "5px",
                      fontSize: "20px",
                      cursor: "pointer",
                      color: "#030303",
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: "#123458",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      marginLeft: "20px",
                      backgroundColor: "transparent",
                      border: "1px solid #FF5A5F",
                      color: "#FF5A5F",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Özet Bölümü */}
          <div
            style={{
              marginTop: "40px",
              padding: "20px",
              border: "1px solid #D4C9BE",
              borderRadius: "10px",
              backgroundColor: "#ffffff",
              maxWidth: "400px",
              marginLeft: "auto",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#123458",
                marginBottom: "20px",
              }}
            >
              Özet
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>Ara Toplam:</span>
              <span>{subtotal.toFixed(2)} ₺</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>KDV (%10):</span>
              <span>{tax.toFixed(2)} ₺</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>Kargo:</span>
              <span>Ücretsiz</span>
            </div>
            <hr style={{ margin: "20px 0" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              <span>Toplam:</span>
              <span>{total.toFixed(2)} ₺</span>
            </div>
              {isLoggedIn === false && <p style={{color:"red"}}>Siparişi tamamlamak için girişi yapın!</p> }
            <button
              onClick={handleCheckoutClick}
              disabled={!isLoggedIn}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: isLoggedIn ? "#0070f3" : "#ccc",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: isLoggedIn ? "pointer" : "not-allowed",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!isLoggedIn) {
                  const tooltip = document.createElement("div");
                  tooltip.innerText = "Giriş yapmadan sipariş veremezsiniz.";
                  tooltip.style.position = "absolute";
                  tooltip.style.top = "-30px";
                  tooltip.style.left = "50%";
                  tooltip.style.transform = "translateX(-50%)";
                  tooltip.style.backgroundColor = "black";
                  tooltip.style.color = "white";
                  tooltip.style.padding = "5px 10px";
                  tooltip.style.borderRadius = "5px";
                  tooltip.style.fontSize = "12px";
                  tooltip.className = "tooltip";
                  e.currentTarget.appendChild(tooltip);
                }
              }}
              onMouseLeave={(e) => {
                const tooltip = e.currentTarget.querySelector(".tooltip");
                if (tooltip) {
                  tooltip.remove();
                }
              }}
            >
              Alışverişi Tamamla
            </button>
          </div>
        </>
      )}
      {isModalOpen && (
        <CheckoutModal closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default CartPage;
