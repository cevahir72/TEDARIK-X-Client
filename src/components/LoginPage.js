"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/hooks/Api";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
const { login } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        { email, password }
      );
      if (response.status === 200 && response.data.role === "admin") {

        router.push("/admin"); // Admin yönlendirmesi
        login(response.data)
      } else {
        router.push(`/profile`);
        login(response.data)
      }
    } catch (error) {
      console.error("Login error", error);
      alert("Login failed");
    }
  };

  return (
    <div
      style={{
        width: "500px",
        // height: "300px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Giriş Yap</h2>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          required
          style={{ padding: "10px", border:"1px solid #AAAA", borderRadius:"5px" }}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Şifre"
          value={password}
          required
          style={{ padding: "10px", border:"1px solid #AAAA", borderRadius:"5px", marginTop:"5px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#0070f3",
            color: "white",
            borderRadius: "4px",
            marginTop:"5px",
            cursor: "pointer",
          }}
        >
          Giriş Yap
        </button>
      </form>
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Hesabınız yok mu?{" "}
        <span
          onClick={() => router.push("/register")}
          style={{ color: "#4CAF50", cursor: "pointer" }}
        >
          Kayıt Olun
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
