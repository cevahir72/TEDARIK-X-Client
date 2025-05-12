"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";


const CheckoutModal = ({ closeModal }) => {
  const { cart, getCartDetails,flushCart } = useCart();
  const [cardOwner, setCardOwner] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
 
  const isFormValid = cardOwner && cardNumber && cvc;

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
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        width: "800px",
        display: "flex",
        gap: "30px",
        position: "relative"
      }}>
        {/* LEFT - FORM */}
        <div style={{ flex: 1 }}>
          <h2>Ödeme Bilgileri</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
            <input
              type="text"
              placeholder="Kart Sahibi"
              value={cardOwner}
              onChange={(e) => setCardOwner(e.target.value)}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
            />
            <input
              type="text"
              placeholder="Kart Numarası"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
            />
            <input
              type="text"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
            />
          </div>

          <button
            onClick={handleCompleteOrder}
            disabled={!isFormValid || isSubmitting}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: isFormValid ? "#28a745" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: isFormValid ? "pointer" : "not-allowed",
              fontSize: "16px",
            }}
          >
            {isSubmitting ? "Gönderiliyor..." : "Siparişi Tamamla"}
          </button>
        </div>

        {/* RIGHT - CARD PREVIEW */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{
            background: "linear-gradient(to right, #0070f3, #0051a3)",
            padding: "30px",
            borderRadius: "12px",
            width: "100%",
            color: "white",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}>
            <h3>Kredi Kartı</h3>
            <p style={{ fontSize: "18px", margin: "10px 0" }}>{cardNumber || "•••• •••• •••• ••••"}</p>
            <p>Kart Sahibi: {cardOwner || "Ad Soyad"}</p>
            <p>CVC: {cvc || "•••"}</p>
          </div>
        </div>

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
