import React from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/solid';

const ContactInfo = ({ icon, title, content }) => (
    <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm hover:scale-105 transition-transform">
        <div className="p-3 bg-white rounded-lg shadow-md">{icon}</div>
        <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600">{content}</p>
        </div>
    </div>
);

const naContact = () => (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 py-16 lg:py-24 justify-center ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 relative inline-block">
                    <span className="relative z-10">
                        Kết nối cùng chúng tôi
                        <div className="absolute bottom-0 left-0 w-full h-2 bg-blue-200 transform translate-y-2 z-0"></div>
                    </span>
                </h2>
                <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Bạn cần hỗ trợ tóm tắt văn bản hoặc dịch thuật tài liệu một cách nhanh chóng và chính xác?
                    <br className="hidden md:block" /> Hãy liên hệ ngay để được tư vấn và hỗ trợ tận tình!
                </p>
            </div>

            <div className="lg:flex lg:space-x-24 justify-center"> {/* Thêm justify-center vào đây */}
                {/* Thông tin liên hệ */}
                <div className="space-y-8 bg-white rounded-2xl p-8 shadow-lg">
                    <div className="text-center md:text-left">
                        <p className="text-lg text-gray-700 mb-6 leading-loose">
                            Chúng tôi luôn sẵn lòng lắng nghe và hỗ trợ bạn qua các kênh liên hệ sau:
                        </p>
                    </div>

                    <div className="flex space-x-6 justify-center">
                        <ContactInfo
                            icon={<PhoneIcon className="h-8 w-8 text-blue-600" />}
                            title="Hotline 24/7"
                            content={<a href="tel:+84123456789" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">+84 123 456 789</a>}
                        />
                        <ContactInfo
                            icon={<EnvelopeIcon className="h-8 w-8 text-green-600" />}
                            title="Email hỗ trợ"
                            content={<a href="mailto:support@pdfsmart.com" className="text-green-600 hover:text-green-700 font-medium transition-colors">support@pdfsmart.com</a>}
                        />
                        <ContactInfo
                            icon={<MapPinIcon className="h-8 w-8 text-purple-600" />}
                            title="Trụ sở chính"
                            content={<a href="https://goo.gl/maps/..." target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-purple-600 transition-colors">Tầng 12, Toà nhà Sunrise, Hà Nội</a>}
                        />
                        <ContactInfo
                            icon={<ClockIcon className="h-8 w-8 text-orange-600" />}
                            title="Giờ làm việc"
                            content={<><span className="text-gray-700">Thứ 2 - Thứ 6: 8:00 - 17:00</span><br /><span className="text-gray-500">Thứ 7: 8:00 - 12:00</span></>}
                        />
                    </div>


                    {/* Mạng xã hội */}
                    <div className="pt-6 border-t border-gray-100 text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Kết nối với chúng tôi</h3>
                        <div className="flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0 justify-center">
                            {[
                                { href: "#", icon: "facebook", color: "text-blue-600" },
                                { href: "#", icon: "twitter", color: "text-sky-500" },
                                { href: "#", icon: "linkedin", color: "text-blue-700" },
                                { href: "#", icon: "youtube", color: "text-red-600" }
                            ].map((social, idx) => (
                                <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer"
                                    className={`${social.color} hover:opacity-75 transition-opacity`}>
                                    <span className="sr-only">{social.icon}</span>
                                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        {social.icon === 'facebook' && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />}
                                        {social.icon === 'twitter' && <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />}
                                        {social.icon === 'linkedin' && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />}
                                        {social.icon === 'youtube' && <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />}
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                 {/* Phần bên phải có thể thêm nội dung khác nếu cần */}
                 <div></div>
            </div>
        </div>
    </div>
);

export default naContact;