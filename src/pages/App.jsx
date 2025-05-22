import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../supabase";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [chairs, setChairs] = useState([]);

  useEffect(() => {
    const fetchChairs = async () => {
      const { data } = await supabase.from("chairs").select("*").order("id", { ascending: false });
      setChairs(data);
    };
    fetchChairs();
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Marcello Collection</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
        {chairs.map((chair) => (
          <div key={chair.id} style={{ border: "1px solid #ccc", borderRadius: "8px" }}>
            <img src={chair.image_url} alt="Krzesło" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <div style={{ padding: "1rem" }}>
              <p>{chair.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
