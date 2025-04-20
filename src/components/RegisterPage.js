"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", address:"", phone:"" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
    });
  if (response.status === 200) {
    router.push("/login");
    }
  };

  return (
    <div
      style={{
        width: "500px",
        // height: "360px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Kayıt Ol</h2>
      <form
        onSubmit={handleRegister}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="name"
          placeholder="İsim"
          value={form.name}
          onChange={handleChange}
          required
          style={{ padding: "10px", border:"1px solid #AAAA", borderRadius:"5px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ padding: "10px", border:"1px solid #AAAA", borderRadius:"5px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={form.password}
          onChange={handleChange}
          required
          style={{ padding: "10px", border:"1px solid #AAAA", borderRadius:"5px" }}
        />
 <input
          type="address"
          name="address"
          placeholder="Adres"
          value={form.address}
          onChange={handleChange}
          required
          style={{ padding: "10px", border:"1px solid #AAAA", borderRadius:"5px" }}
        />
 <input
          type="phone"
          name="phone"
          placeholder="phone"
          value={form.phone}
          onChange={handleChange}
          required
          style={{ padding: "10px", border:"1px solid #AAAA", borderRadius:"5px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Kayıt Ol
        </button>
      </form>
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Hesabınız var mı?{" "}
        <span
          onClick={() => router.push("/login")}
          style={{ color: "#0070f3", cursor: "pointer" }}
        >
          Giriş Yapın
        </span>
      </p>
    </div>
  );
};

export default RegisterPage;
