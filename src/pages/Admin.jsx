import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../supabase";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function Admin() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleUpload = async () => {
    if (!file || !description) return;

    const fileName = `${Date.now()}_${file.name}`;
    const { data, error: uploadError } = await supabase.storage
      .from("chair-images")
      .upload(fileName, file);

    if (uploadError) {
      alert("Błąd podczas przesyłania zdjęcia.");
      return;
    }

    const imageUrl = supabase.storage.from("chair-images").getPublicUrl(fileName).data.publicUrl;

    const { error: insertError } = await supabase.from("chairs").insert([{ image_url: imageUrl, description }]);

    if (insertError) {
      alert("Błąd podczas zapisywania danych.");
    } else {
      alert("Krzesło dodane!");
      setFile(null);
      setDescription("");
    }
  };

  const handleLogin = () => {
    if (password === "marcello123") setAuthenticated(true);
    else alert("Błędne hasło");
  };

  if (!authenticated) {
    return (
      <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
        <h2>Zaloguj się</h2>
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <button onClick={handleLogin} style={{ width: "100%", padding: "0.5rem" }}>
          Zaloguj
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Dodaj krzesło</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <textarea
        placeholder="Opis krzesła"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", marginTop: "1rem" }}
      />
      <button onClick={handleUpload} style={{ marginTop: "1rem", padding: "0.5rem", width: "100%" }}>
        Dodaj
      </button>
    </div>
  );
}
