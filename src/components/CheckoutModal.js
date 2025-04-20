"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";


const CheckoutModal = ({ closeModal }) => {
  const { cart, getCartDetails,flushCart } = useCart();
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
 

  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId);
  };

  const handleCompleteOrder = async () => {
    setIsSubmitting(true);
    try {
      const orderData = {
        items: cart,
        total: getCartDetails().grandTotal,
        paymentMethod: selectedCard,
        user: user
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`,orderData )

      if (response.status === 200) {
        alert("Sipariş başarıyla tamamlandı!");
        flushCart()
        closeModal();
      } else {
        alert("Sipariş oluşturulamadı.");
      }
    } catch (error) {
      console.error(error);
      alert("Bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "400px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <h2>Siparişi Tamamla</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              onClick={() => handleCardSelect(card)}
              style={{
                background:
                  selectedCard === card
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
                color: "white",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                transform: selectedCard === card ? "scale(1.05)" : "scale(1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <div
                style={{ fontSize: "14px", opacity: 0.8, marginBottom: "10px" }}
              >
                Kredi Kartı {card}
              </div>

              <div
                style={{
                  fontSize: "20px",
                  letterSpacing: "2px",
                  marginBottom: "20px",
                  fontWeight: "bold",
                }}
              >
                1234 5678 9012 345{card}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  opacity: 0.9,
                }}
              >
                <div>
                  <div style={{ fontSize: "10px" }}>Kart Sahibi</div>
                  <div>John Doe</div>
                </div>

                <div>
                  <div style={{ fontSize: "10px" }}>Son Kullanma</div>
                  <div>12/2{card}</div>
                </div>
              </div>

              {/* Chip ikonu */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  width: "40px",
                  height: "30px",
                  backgroundColor: "gold",
                  borderRadius: "6px",
                  boxShadow: "inset 0 0 5px rgba(0,0,0,0.5)",
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleCompleteOrder}
          disabled={!selectedCard || isSubmitting}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: selectedCard ? "#28a745" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: selectedCard ? "pointer" : "not-allowed",
            fontSize: "16px",
          }}
        >
          {isSubmitting ? "Gönderiliyor..." : "Siparişi Tamamla"}
        </button>

        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
