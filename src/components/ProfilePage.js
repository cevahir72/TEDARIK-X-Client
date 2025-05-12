'use client'

import { useAuth } from "@/context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return <div style={{ textAlign: "center", marginTop: "100px", fontSize: "18px" }}>Yükleniyor...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          marginBottom: "40px",
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "10px", color: "#333" }}>
          {user.name}'ın Profili
        </h1>
        <p style={{ fontSize: "18px", color: "#666" }}>Email: {user.email}</p>
        <p style={{ fontSize: "18px", color: "#666" }}>Adres: {user.address}</p>
        <p style={{ fontSize: "18px", color: "#666" }}>Telefon: {user.phone}</p>
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>
          Sipariş Geçmişi
        </h2>

        {user.Orders && user.Orders.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {user.Orders.map((order) => (
              <li
                key={order.id}
                style={{
                  borderBottom: "1px solid #eee",
                  marginBottom: "20px",
                  paddingBottom: "20px",
                }}
              >
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Sipariş No: {order.id}
                </p>
                <p style={{ color: "#0070f3", fontSize: "16px" }}>
                  Durum: {order.orderStatus}
                </p>

                <ul style={{ listStyleType: "disc", paddingLeft: "20px", marginTop: "10px" }}>
                  {order.OrderItems.map((item) => (
                    <li key={item.id} style={{ fontSize: "16px", color: "#555" }}>
                      {item?.Product?.name} - {item?.quantity} adet
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: "16px", color: "#999" }}>Hiç sipariş bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
