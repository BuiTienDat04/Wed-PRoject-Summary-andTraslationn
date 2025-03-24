import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, X } from "lucide-react";
import { useLocation } from "react-router-dom";

const ChatBox = ({ textSummarizerContent, linkPageContent, documentSummaryContent, loggedInUser }) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const chatContainerRef = useRef(null);

    // Kiểm tra điều kiện ẩn chatbox
    const shouldHideChatbox = 
        location.pathname === "/login" || 
        location.pathname === "/register" || 
        location.pathname === "/aboutus" ||
        (location.pathname === "/" && !loggedInUser);
   

    const API_BASE_URL = process.env.REACT_APP_API_URL || "https://api.pdfsmart.online";

    // Khởi tạo tin nhắn mặc định
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    role: "bot",
                    content:
                        "Chào bạn! Hãy tóm tắt văn bản, URL hoặc tải lên PDF để tôi có thể trả lời câu hỏi của bạn.",
                },
            ]);
        }
    }, []);

    // Cuộn xuống cuối khi có tin nhắn mới
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Ẩn hoàn toàn component chatbox nếu không đáp ứng điều kiện
    if (shouldHideChatbox) {
        return null;
    }

    // Gửi tin nhắn
    const handleSendMessage = async () => {
        if (!userInput.trim()) return;
        if (userInput.length > 500) {
            setError("Câu hỏi quá dài, vui lòng giữ dưới 500 ký tự.");
            return;
        }

        const newMessage = { role: "user", content: userInput };
        setMessages((prev) => [...prev, newMessage]);
        setUserInput("");
        setError("");
        setIsLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/chat`, {
                question: userInput,
                // Không cần gửi context nữa vì backend dùng latestContent
            });

            const { answer, source } = response.data;
            setMessages((prev) => [...prev, { role: "bot", content: answer, source }]);
        } catch (error) {
            setError(error.response?.data?.error || "Lỗi khi gửi tin nhắn. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const clearMessages = () => {
        setMessages([
            {
                role: "bot",
                content:
                    "Chào bạn! Hãy tóm tắt văn bản, URL hoặc tải lên PDF để tôi có thể trả lời câu hỏi của bạn.",
            },
        ]);
        setError("");
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 font-sans">
            {/* Nút mở chat */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                    </svg>
                </button>
            )}

            {/* Chat box */}
            {isOpen && (
                <div className="bg-white rounded-xl shadow-2xl w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-t-xl flex justify-between items-center">
                        <h3 className="text-lg font-semibold tracking-wide">AI Chat</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={clearMessages}
                                className="text-sm text-white hover:text-gray-200 transition-colors"
                            >
                                Xóa
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Nội dung chat */}
                    <div
                        ref={chatContainerRef}
                        className="flex-1 p-4 overflow-y-auto bg-gray-100 space-y-3"
                    >
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    message.role === "user" ? "justify-end" : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[75%] p-3 rounded-lg shadow-sm transition-all duration-200 ${
                                        message.role === "user"
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-gray-800 border border-gray-200"
                                    }`}
                                >
                                    {message.content}
                                    {message.source && (
                                        <span className="text-xs block mt-1 opacity-75">
                                            (Nguồn: {message.source})
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white text-gray-600 p-3 rounded-lg shadow-sm flex items-center">
                                    <svg
                                        className="animate-spin h-5 w-5 text-blue-500 mr-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                            className="opacity-25"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8h-8z"
                                            className="opacity-75"
                                        />
                                    </svg>
                                    Đang xử lý...
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-lg">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        <div className="flex items-center gap-2">
                            <textarea
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Nhập câu hỏi của bạn..."
                                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                                rows="2"
                                maxLength={500}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading}
                                className={`p-2 rounded-full shadow-md transition-all duration-200 ${
                                    isLoading
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBox;