// src/components/Register/Register.jsx
import { useState } from "react";
import { useAuth } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../../firebaseConfig";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [document, setDocument] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const storage = getStorage();


  const validatePassword = () => {
    if (password !== confirmPassword) {
      return "Las contraseñas no coinciden.";
    }
    return null;
  };
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const passwordError = validatePassword();
    if (passwordError) {
      setError(passwordError);
      return;
    }
    try {
      const userCredential = await register(email, password);
      const user = userCredential.user;
  
      let profilePicURL = "";
      if (profilePic) {
        const storageRef = ref(storage, `profilePics/${user.uid}`);
        await uploadBytes(storageRef, profilePic);
        profilePicURL = await getDownloadURL(storageRef);
      }
  
      await setDoc(doc(db, "users", user.uid), {
        name,
        lastName,
        document,
        documentType,
        email,
        birthDate,
        profilePicURL
      });
  
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    
    <div className="min-h-screen flex items-center p-8 justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg text-center items-center shadow-md w-full md:w-96">
        <div>
          <h1 className="text-2xl mb-5 ">Accede a los Cursos</h1>
        </div>
        {error && <p>{error}</p>}
        <div className="relative flex flex-col p-8 items-center">
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setPreview(null)}
                  className="absolute top-0 right-0 bg-violet-800 text-white rounded-full p-1"
                >
                  &times;
                </button>
              </div>
            ) : (
              <label className="cursor-pointer mt-2 flex flex-col items-center bg-violet-800 text-white rounded-lg px-4 py-2 hover:bg-violet-600 transition">
                Escoge Tu Foto de Perfil
                <input
                  type="file"
                  className="hidden"
                  onChange={handleProfilePicChange}
                  accept="image/*"
                  required
                />
              </label>
            )}
          </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            
            <input
              type="text"
              className="border border-gray-200 w-full outline-none py-1 px-4 rounded-lg"
              value={name}
              placeholder="Tu Nombre"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            
            <input
              className="border border-gray-200 w-full outline-none py-1 px-4 rounded-lg"
              placeholder="Tu Apellido"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <select
            className="border border-gray-200 w-full outline-none py-1 px-4 rounded-lg"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              required
            >
              <option value="">Tipo de Documento</option>
              <option value="CC">CC</option>
              <option value="CE">CE</option>
              <option value="NIT">NIT</option>
            </select>
          </div>
          <div className="relative">
            
            <input
            className="border border-gray-200 w-full outline-none py-1 px-4 rounded-lg"
              type="text"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              placeholder="Tu Número de documento"
              required
            />
          </div>
          <div className="relative">
            <input
            className="border border-gray-200 w-full outline-none py-1 px-4 rounded-lg"
            placeholder="Tu Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              className="border border-gray-200 w-full outline-none py-1 px-4 rounded-lg"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="Fecha de Nacimiento"
              required
            />
          </div>
          <div>
            <input
            className="border border-gray-200 w-full outline-none py-1 px-4 rounded-lg"
              type="password"
              placeholder="Escoge tu Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
            className="border border-gray-200 w-full outline-none py-1 px-4 rounded-lg"
              type="password"
              placeholder="Repite tu Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
          <button className=" mt-6 bg-violet-800 text-gray-400 uppercase w-full py-2 px-6 rounded-lg hover:scale-105 transition-all"
          type="submit">Registrate</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

