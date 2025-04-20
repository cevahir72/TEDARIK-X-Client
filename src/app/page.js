import Link from "next/link";
import "./globals.css";
export default function Home() {

  const featuredProducts = [
    {
      id: 1,
      name: "Fındık",
      price: "₺100,00",
      image: "https://ideacdn.net/idea/in/11/myassets/products/092/findik-ici-700x700.jpg?revision=1734252148",
    },
    {
      id: 2,
      name: "Ceviz",
      price: "₺150,00",
      image: "https://kayisichi.com/Resim/Minik/1500x1500_thumb_40.png",
    },
    {
      id: 3,
      name: "Badem",
      price: "₺200,00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiS4-uBVPeQgQzxs6qGYOGd3MmeSMpZIjeLA&s",
    },
    {
      id: 4,
      name: "Hurma",
      price: "₺250,00",
      image: "https://percdn.com/f/639966/cG96WmFtNG0vcUp3SzJGdEg4MXZKZWxESUE9PQ/p/kudus-hurma-500-gr-40441325-sw375sh375.webp",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative w-full h-[60vh] overflow-hidden">
        <img
          src="/banner.png"
          alt="Banner"
          className="w-full object-center animate-fade-in"
        />

        {/* Siyah şeffaf alan */}
        <div className=" absolute bottom-0 w-full bg-black/60 p-8 flex items-center justify-between animate-slide-up h-40">
          <div className=" justify-center align-center text-center text-white w-full">
            <h1 style={{ fontSize: "2rem" }}>
              Türkiyenin En Etkili Tedarik Merkezine Hoşgeldiniz!
            </h1>
            <p className="text-sm">
              Büyük alımlarda daha avantajlı fiyatlar ve dijital kolaylık
              burada!
            </p>
            <button
              style={{
                cursor: "pointer",
                width: "20rem",
                height: "3rem",
                border: "1px solid white",
                borderRadius: "2rem",
                marginTop: "10px",
              }}
            ><Link href="/products" style={{ color: "#fff", textDecoration: "none" }}>
              Alışverişe Başlayalım!
              </Link>
            </button>
          </div>
        </div>
      </div>

        {/* Alt açıklama kısmı */}
        <div style={{ backgroundColor: "#D4C9BE", width: "100%", padding: "40px 0", textAlign: "center", color: "#030303" }}>
          <p style={{ fontSize: "1rem", fontWeight: "500" }}>
            Tedarikçi sitesinden fazla alım yapmanın daha ucuza geleceğini ve dijital mecranın kolaylığını keşfedin!
          </p>
        </div>


      {/* Öne çıkan ürünler */}
      <div
        style={{ width: "100%", padding: "40px 0", backgroundColor: "#F1EFEC" }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Öne Çıkan Ürünler
        </h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {featuredProducts.map((product) => (
              <div key={product.id} style={{ width: "200px", textAlign: "center", marginBottom: "24px" }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }} 
                />
                <p style={{ fontWeight: "600" }}>{product.name}</p>
                <p style={{ color: "#D4C9BE", fontWeight: "500" }}>{product.price}</p>
                <button 
                  style={{
                    backgroundColor: "#123458", 
                    color: "#fff", 
                    fontWeight: "700", 
                    padding: "8px 16px", 
                    borderRadius: "8px", 
                    border: "none", 
                    cursor: "pointer", 
                    marginTop: "10px"
                  }}
                >
                  Sepete Ekle
                </button>
              </div>
            ))}
          
        </div>
      </div>

      {/* Email ve Bize Ulaşın */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#123458",
          color: "#FFFFFF",
          padding: "40px 0",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "700",
            marginBottom: "16px",
          }}
        >
          Bize Ulaşın
        </h3>
        <p style={{ fontSize: "1rem", marginBottom: "24px" }}>
          Herhangi bir sorunuz veya görüşünüz varsa, bizimle iletişime geçmekten
          çekinmeyin!
        </p>
        <input
          type="email"
          placeholder="Email Adresinizi Girin"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            marginBottom: "16px",
            width: "80%",
            maxWidth: "400px",
            background:"#ddd",
            color:"black"
          }}
        />
        <div>
          <a
            href="mailto:example@example.com"
            style={{
              display: "inline-block",
              backgroundColor: "#D4C9BE",
              color: "#030303",
              fontWeight: "700",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Bize Yazın
          </a>
        </div>
      </div>
    </div>
  );
}
