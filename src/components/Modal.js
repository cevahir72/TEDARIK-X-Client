"use client";
import { useState } from "react";
import axios from "axios";

const Modal = ({ type, closeModal, refreshData }) => {

  const modalStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999",
  };

  const modalContentStyles = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "400px",
    maxWidth: "90%",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const closeButtonStyles = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#123458",
  };

  const headerStyles = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#123458",
    marginBottom: "20px",
  };

  const inputStyles = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  };

  const buttonStyles = {
    padding: "10px 20px",
    backgroundColor: "#123458",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    marginTop: "10px",
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    price: "",
    description: "",
    stock: "",
    imageUrl: "",
    orderDate: "",
    orderAddress: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "Order") {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders`, {
          totalPrice: formData.price,
          orderStatus: "Pending",
          orderDate: formData.orderDate,
          address: formData.orderAddress,
          // Müşteri bağlantısı vs backendde handle edilmeli
        });
      } else if (type === "Product") {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
          name: formData.name,
          price: formData.price,
          description: formData.description,
          stock: formData.stock,
          imageUrl: formData.imageUrl,
        });
      } else if (type === "Customer") {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        });
      }
      refreshData();
      closeModal();
    } catch (error) {
      console.error("Error creating entity", error);
    }
  };

  return (
   <div style={modalStyles}>
    <div style={modalContentStyles}>
    <button style={closeButtonStyles} onClick={closeModal}>
          ×
        </button>
        <h2 style={headerStyles}>{`Yeni ${type}`}</h2>
      <form onSubmit={handleSubmit}>
        {type === "Order" && (
          <>
            <input
              type="date"
              placeholder="Sipariş Tarihi"
              style={inputStyles}
              onChange={(e) =>
                setFormData({ ...formData, orderDate: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Adres"
              style={inputStyles}
              onChange={(e) =>
                setFormData({ ...formData, orderAddress: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Toplam Fiyat"
              style={inputStyles}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </>
        )}

        {type === "Product" && (
          <>
            <input
              type="text"
              placeholder="Ürün Adı"
              style={inputStyles}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Fiyat"
              style={inputStyles}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <textarea
              placeholder="Açıklama"
              style={inputStyles}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Stok"
              style={inputStyles}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Resim URL"
              style={inputStyles}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
          </>
        )}

        {type === "Customer" && (
          <>
            <input
              type="text"
              placeholder="Müşteri Adı"
              style={inputStyles}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              style={inputStyles}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Telefon"
              style={inputStyles}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Adres"
              style={inputStyles}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </>
        )}

        <button style={buttonStyles} type="submit">Kaydet</button>
      </form>
    </div>
    </div>
  );
};

export default Modal;
