import { useEffect, useState } from "react";

const UpdateModal = ({ isOpen, onClose, item, onSave }) => {
  const [address, setAddress] = useState(item?.name || "");

  // Modal her açıldığında eski verileri yüklemesi için
  useEffect(() => {
    if (item) {
      setAddress(item.address);
    }
  }, [item]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "400px", boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{ marginBottom: "20px" }}>Bilgileri Güncelle</h2>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="İsim"
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={onClose}
            style={{ padding: "10px 20px", backgroundColor: "#ccc", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            Vazgeç
          </button>
          <button
            onClick={() => onSave({ id: item.id, address })}
            style={{ padding: "10px 20px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
