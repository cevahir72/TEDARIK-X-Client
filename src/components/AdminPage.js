"use client";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { api } from "@/hooks/Api";
import axios from "axios";
import UpdateModal from "./UpdateModal";

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // Order, Product, Customer
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    try {
      const ordersRes = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders`
      );
      setOrders(ordersRes.data);
      const customersRes = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users`
      );
      setCustomers(customersRes.data);
      const productsRes = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProducts(productsRes.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
    }
  };

  // Verileri yükle
  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
      alert("Ürün başarıyla silindi!");
      fetchData();
    } catch (error) {
      console.error("Silme hatası:", error);
      alert("Ürün silinirken bir hata oluştu.");
    }
  };


  const handleSave = async (updatedItem) => {
    try {
      await api.put(`${process.env.NEXT_PUBLIC_API_URL}/orders`, updatedItem);
      setOpenUpdateModal(false);
      fetchData();
      alert("Güncelleme Başarılı!");
    } catch (error) {
      console.error("Güncelleme Hatası:", error);
      alert("Güncelleme Başarısız!");
    }
  };

  const handleAdd = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleUpdate = (item) => {
    setSelectedItem(item);
    setOpenUpdateModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${id}`
      );
      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, Helvetica, sans-serif",
        backgroundColor: "#F1EFEC",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#123458",
          marginBottom: "20px",
        }}
      >
        Admin Panel
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <button
          onClick={() => handleAdd("Order")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#123458",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Yeni Sipariş
        </button>
        <button
          onClick={() => handleAdd("Product")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#123458",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Yeni Ürün
        </button>
        <button
          onClick={() => handleAdd("Customer")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#123458",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Yeni Müşteri
        </button>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "24px", color: "#123458" }}>Siparişler</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Seçenekler
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Sipariş ID
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Müşteri Adı
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Sipariş Tarihi
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Adres
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Toplam Fiyat
              </th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.length > 0 &&
              orders.map((order) => (
                <tr key={order.id}>
                  <td
                    style={{ padding: "10px", borderBottom: "1px solid #eee" }}
                  >
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleDelete(order.id)}
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: "white",
                          border: "1px solid red",
                          color: "red",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        🗑️
                      </button>
                      <button
                        onClick={() => handleUpdate(order)}
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: "white",
                          border: "1px solid #0070f3",
                          color: "#0070f3",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        ✏️
                      </button>
                    </div>
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {order.id}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {order.User?.name}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {order.address}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {order.orderStatus}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {order.totalPrice}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <h2 style={{ fontSize: "24px", color: "#123458" }}>Müşteriler</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Ad
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Telefon
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Adres
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {customer.name}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {customer.email}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {customer.phone}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {customer.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ fontSize: "24px", color: "#123458" }}>Ürünler</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
            <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Seçenekler
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Ürün Adı
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Fiyat
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Açıklama
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Stok
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#D4C9BE",
                  color: "#123458",
                }}
              >
                Ürün Resmi
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td
                    style={{ padding: "10px", borderBottom: "1px solid #eee" }}
                  >
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: "white",
                          border: "1px solid red",
                          color: "red",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    border: "1px solid #ddd",
                  }}
                >
                  {product.name}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    border: "1px solid #ddd",
                  }}
                >
                  {product.price}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    border: "1px solid #ddd",
                  }}
                >
                  {product.description}
                </td>
                <td
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    border: "1px solid #ddd",
                  }}
                >
                  {product.stock}
                </td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",
                    border: "1px solid #ddd",
                  }}
                >
                  <img src={product.imageUrl} alt="ürün" width={50} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal
          type={modalType}
          closeModal={() => setIsModalOpen(false)}
          refreshData={fetchData}
        />
      )}
      {openUpdateModal && (
        <UpdateModal
          isOpen={openUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
          item={selectedItem}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminPage;
