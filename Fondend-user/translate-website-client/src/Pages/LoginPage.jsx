import { useState, useEffect } from "react";
import {
  FaSignInAlt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationTriangle,
  FaCheckCircle,
  FaFilePdf, // Giữ lại nếu dùng ở đâu đó khác hoặc xóa nếu không cần
  FaFileContract,
  FaFileAlt, // Giữ lại nếu dùng ở đâu đó khác hoặc xóa nếu không cần
  FaFileWord, // Giữ lại nếu dùng ở đâu đó khác hoặc xóa nếu không cần
  FaListAlt, // Giữ lại nếu dùng ở đâu đó khác hoặc xóa nếu không cần
  FaGlobe, // Giữ lại nếu dùng ở đâu đó khác hoặc xóa nếu không cần
  FaListUl, // Giữ lại nếu dùng ở đâu đó khác hoặc xóa nếu không cần
  FaMagic,
  FaLanguage,
  FaRobot, // Giữ lại nếu dùng ở đâu đó khác hoặc xóa nếu không cần
  FaBookOpen,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { BrowserRouter } from 'react-router-dom'; // Thường không cần import BrowserRouter ở component con
import axios from "axios";
import { API_BASE_URL } from "../api/api";
// import { socket } from '../socket'; // Đã loại bỏ
import { motion, AnimatePresence } from "framer-motion";

const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        id="loginPassword"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg bg-white/80 backdrop-blur-sm text-gray-700" // Thêm style input giống email
        placeholder="Enter your password"
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="absolute right-3 top-[50%] translate-y-[-50%] text-gray-500"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

const LoginPage = ({ onClose, onOpenRegister }) => { // Giữ lại props nếu cần, nếu không thì xóa
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  // const [socketInstance, setSocketInstance] = useState(null); // Đã loại bỏ

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      setLoginErrorMessage("Email and password are required!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: loginEmail,
        password: loginPassword,
      }, { withCredentials: true });

      console.log("Login response:", response.data);

      const { token, user } = response.data;

      if (!token || !user || !user._id) {
        setLoginErrorMessage("Invalid response from server! Missing token or user ID.");
        return;
      }

      // Lưu token và _id vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("_id", user._id); // Thêm dòng này để lưu _id
      localStorage.setItem("loggedInUser", JSON.stringify(user)); // Giữ nguyên nếu cần toàn bộ thông tin user

      console.log("Logged in user ID:", user._id); // Log để kiểm tra
      // socket.emit("userOnline", user._id); // Đã loại bỏ
      setLoginSuccess(true);
      setLoginErrorMessage("");
      setTimeout(() => {
        navigate("/text", { replace: true }); // Điều hướng đến trang /text
      }, 2000);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setLoginErrorMessage(error.response?.data?.message || "Login failed!");
      setLoginSuccess(false);
    }
  };

  // Xử lý logout khi mount (chỉ chạy 1 lần)
  useEffect(() => {
    const handleInitialLogout = async () => {
      try {
        await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, {
          withCredentials: true
        });
        console.log("Cleared previous session");
        // Xóa thông tin người dùng khỏi localStorage khi vào trang login
        localStorage.removeItem("token");
        localStorage.removeItem("_id");
        localStorage.removeItem("loggedInUser");
      } catch (error) {
        // Không cần hiển thị lỗi này cho người dùng, chỉ log ra console
        console.error("Logout error on mount (ignore if no previous session):", error.message);
      }
    };

    handleInitialLogout();
  }, []); // Dependency array rỗng đảm bảo chỉ chạy 1 lần khi mount

  // Ẩn footer và chatbox
  useEffect(() => {
    const footer = document.querySelector("footer");
    const chatbox = document.querySelector(".chatbox"); // Đảm bảo selector này đúng
    if (footer) footer.style.display = "none";
    if (chatbox) chatbox.style.display = "none";

    return () => {
      // Khôi phục lại hiển thị khi component unmount
      if (footer) footer.style.display = ""; // Hoặc giá trị display mặc định của footer
      if (chatbox) chatbox.style.display = ""; // Hoặc giá trị display mặc định của chatbox
    };
  }, []);

  const FeatureItem = ({ icon, title, description }) => (
    <div className="bg-white/5 backdrop-blur-md rounded-lg p-5 shadow-md border border-white/10 flex items-center space-x-4">
      <div className="p-2 rounded-md bg-gradient-to-br from-gray-200/10 to-gray-700/10">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-purple-500 to-blue-600 overflow-hidden">
      {/* Left Side - App Visual */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Dynamic Curvy Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-700 opacity-30"
          style={{ clipPath: "polygon(0 0, 100% 0, 60% 100%, 20% 100%)" }}
          animate={{ skewY: [0, 5, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')] opacity-10"
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Abstract Floating Shapes with Color Hints */}
        {[...Array(18)].map((_, i) => {
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const size = Math.random() * 8 + 5;
          const colorClass =
            i % 3 === 0 ? "bg-cyan-300/20" : i % 3 === 1 ? "bg-lime-300/20" : "bg-yellow-300/20";
          const speed = Math.random() * 6 + 8;
          const directionX = Math.random() > 0.5 ? 1 : -1;
          const directionY = Math.random() > 0.5 ? 1 : -1;

          return (
            <motion.div
              key={`abstract-${i}`}
              className={`absolute rounded-full ${colorClass}`}
              style={{ top: `${startY}%`, left: `${startX}%`, width: `${size}px`, height: `${size}px` }}
              animate={{
                x: [`${startX}%`, `${startX + directionX * (20 + Math.random() * 30)}%`],
                y: [`${startY}%`, `${startY + directionY * (20 + Math.random() * 30)}%`],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ duration: speed, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }}
            />
          );
        })}

        <motion.div
          className="relative z-10 text-center space-y-12"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Striking Title with Subtle Animation */}
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-pulse"
            style={{ textShadow: "0 4px 6px rgba(0, 0, 0, 0.3)" }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-cyan-300 to-lime-200 bg-clip-text text-transparent">
              PDFSmart
            </span>
          </motion.h1>
          <motion.h2
            className="text-xl md:text-2xl font-semibold text-white/90 drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Intelligent Document Solutions, Simplified.
          </motion.h2>

          {/* Feature Showcase with Icon and Brief Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto">
            <FeatureItem
              icon={<FaMagic className="w-7 h-7 text-yellow-300" />}
              title="Summarize Smartly"
              description="Get key insights quickly. AI-powered summaries for rapid understanding."
            />
            <FeatureItem
              icon={<FaLanguage className="w-7 h-7 text-green-300" />}
              title="Translate Instantly"
              description="Break language barriers. Accurate translations at your fingertips."
            />
            <FeatureItem
              icon={<FaBookOpen className="w-7 h-7 text-purple-300" />}
              title="Manage Effortlessly"
              description="Organize, merge, split, and more. Streamline your PDF workflow."
            />
            <FeatureItem
              icon={<FaCheckCircle className="w-7 h-7 text-cyan-300" />}
              title="Secure & Reliable"
              description="Your documents are safe. Fast processing you can trust."
            />
          </div>
        </motion.div>

        {/* Subtle Wavy Bottom Animation */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-blue-500/20 to-transparent"
          style={{ clipPath: "polygon(0 30%, 20% 10%, 80% 0%, 100% 20%, 100% 100%, 0 100%)" }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-8">
        {/* Login Form Container */}
        <motion.div
          className="w-full max-w-md space-y-8 rounded-xl shadow-lg p-8 md:p-12 backdrop-filter backdrop-blur-md bg-white/20 relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {/* Form Header */}
          <div className="text-center">
            <motion.div
              className="inline-block mb-6 p-3 bg-blue-100 rounded-full"
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaFileContract className="h-10 w-10 text-blue-600" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to <span className="text-cyan-300">PDFSmart</span>
            </h2>
            <p className="text-white/80 mb-6">
              Log in to streamline your document workflows.
            </p>
          </div>

          {/* Enhanced Messages */}
          <AnimatePresence>
            {loginErrorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-100 border-l-4 border-red-500 p-3 rounded-md mb-4 flex items-center"
              >
                <FaExclamationTriangle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700">{loginErrorMessage}</p>
              </motion.div>
            )}

            {loginSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-100 border-l-4 border-green-500 p-3 rounded-md mb-4 flex items-center"
              >
                <FaCheckCircle className="h-5 w-5 text-green-500 mr-2 animate-bounce" />
                <p className="text-green-700">Login successful, redirecting...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Inputs with Subtle Animations */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <motion.label
                className="block text-sm font-medium text-white mb-2"
                htmlFor="email"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <FaEnvelope className="inline-block mr-1 text-gray-300" />
                Email Address
              </motion.label>
              <motion.input
                id="email"
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:ring-cyan-300 focus:border-cyan-300 text-gray-700 bg-white/80 backdrop-blur-sm"
                placeholder="you@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                whileFocus={{ boxShadow: "0 0 0 0.2rem rgba(139, 228, 255, 0.5)" }}
              />
            </div>
            <div>
              <motion.label
                className="block text-sm font-medium text-white mb-2"
                htmlFor="password" // Thay đổi htmlFor thành "loginPassword" cho khớp id input bên trong
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <FaLock className="inline-block mr-1 text-gray-300" />
                Password
              </motion.label>
              <PasswordInput
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Animated Login Button */}
          <motion.button
            className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-md hover:shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition-all mt-6 flex items-center justify-center"
            onClick={handleLogin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            disabled={loginSuccess} // Vô hiệu hóa nút khi đang đăng nhập thành công
          >
            <FaSignInAlt className={`mr-2 ${loginSuccess ? '' : 'animate-pulse'}`} />
            {loginSuccess ? "Redirecting..." : "Log In"}
          </motion.button>

          {/* Registration Link with Animation */}
          <motion.div
            className="mt-4 text-center text-sm text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Don&apos;t have an account?{" "}
            <motion.button
              className="text-cyan-300 hover:text-cyan-200 font-medium focus:outline-none focus:underline transition-colors"
              onClick={() => navigate("/register")} // Sử dụng navigate để chuyển trang
              whileHover={{ scale: 1.08, textShadow: "0 0 5px rgba(139, 228, 255, 0.8)" }}
              transition={{ duration: 0.3 }}
            >
              Sign up here
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;