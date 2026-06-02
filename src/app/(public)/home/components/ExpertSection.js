"use client";

import React from 'react';
import { useThemeStyles } from '@/app/components/context/themeStyles';
import { RiCustomerService2Line } from 'react-icons/ri';
import { BsWhatsapp } from 'react-icons/bs';
import { FiPhoneCall } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';

const ExpertSection = () => {
    const { isDark, dark } = useThemeStyles();

    return (
        <div
            className={`mt-4 border rounded-2xl p-3 md:p-5 transition-colors duration-300 ${isDark ? "" : "border-[#e8e1d5]"}`}
            style={dark?.expertCard}
        >
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">

                <div className="flex items-center gap-3 w-full md:w-1/2 justify-center md:justify-start text-center md:text-left">
                    <div className="flex-shrink-0 border-2 border-[#b07d2d] rounded-full">
                        <div className="w-10 h-10 rounded-full bg-[#b07d2d] border-2 border-white flex items-center justify-center text-[#b07d2d]">
                            <RiCustomerService2Line className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div>
                        <h4
                            className={`text-[13px] xl:text-sm leading-tight ${isDark ? "" : "text-slate-900"}`}
                            style={isDark ? dark.text : undefined}
                        >
                            Speak to an Investment Expert
                        </h4>
                        <p
                            className={`text-[10px] mt-1 ${isDark ? "" : "text-slate-500"}`}
                            style={isDark ? dark.textMuted : undefined}
                        >
                            Get expert guidance. It's free & no obligation.
                        </p>
                    </div>
                </div>

                <div
                    className={`md:hidden w-full h-[1px] ${isDark ? "" : "bg-[#eee4d7]"}`}
                    style={isDark ? dark.divider : undefined}
                />
                <div
                    className={`hidden md:block w-[1px] h-14 self-center ${isDark ? "" : "bg-[#eee4d7]"}`}
                    style={isDark ? dark.divider : undefined}
                />

                <div className="grid grid-cols-3 gap-2 md:gap-4 w-full md:w-1/2">
                    <div className="flex flex-col items-center text-center cursor-pointer group">
                        <div
                            className={`w-11 h-11 rounded-full border flex items-center justify-center mb-1 group-hover:bg-[#b07d2d] group-hover:text-white transition-colors ${isDark ? "" : "border-[#b07d2d] text-[#b07d2d]"}`}
                            style={isDark ? dark.expertIcon : undefined}
                        >
                            <BsWhatsapp className="w-6 h-6" />
                        </div>
                        <p
                            className={`text-[13px] font-bold ${isDark ? "" : "text-slate-800"}`}
                            style={isDark ? dark.text : undefined}
                        >
                            WhatsApp
                        </p>
                        <p
                            className={`text-[10px] ${isDark ? "" : "text-slate-600"}`}
                            style={isDark ? dark.textMuted : undefined}
                        >
                            Chat instantly
                        </p>
                    </div>

                    <div
                        className={`flex flex-col items-center text-center border-x md:border-x-0 px-2 cursor-pointer group ${isDark ? "" : "border-[#eee4d7]"}`}
                        style={isDark ? { borderColor: dark.dividerColor } : undefined}
                    >
                        <div
                            className={`w-11 h-11 rounded-full border flex items-center justify-center mb-1 group-hover:bg-[#b07d2d] group-hover:text-white transition-colors ${isDark ? "" : "border-[#b07d2d] text-[#b07d2d]"}`}
                            style={isDark ? dark.expertIcon : undefined}
                        >
                            <FiPhoneCall className="w-6 h-6" />
                        </div>
                        <p
                            className={`text-[13px] font-bold ${isDark ? "" : "text-slate-800"}`}
                            style={isDark ? dark.text : undefined}
                        >
                            Call Us
                        </p>
                        <p
                            className={`text-[10px] ${isDark ? "" : "text-slate-600"}`}
                            style={isDark ? dark.textMuted : undefined}
                        >
                            Speak directly
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center cursor-pointer group">
                        <div
                            className={`w-11 h-11 rounded-full border flex items-center justify-center mb-1 group-hover:bg-[#b07d2d] group-hover:text-white transition-colors ${isDark ? "" : "border-[#b07d2d] text-[#b07d2d]"}`}
                            style={isDark ? dark.expertIcon : undefined}
                        >
                            <HiOutlineMail className="w-6 h-6" />
                        </div>
                        <p
                            className={`text-[13px] font-bold ${isDark ? "" : "text-slate-800"}`}
                            style={isDark ? dark.text : undefined}
                        >
                            Email Us
                        </p>
                        <p
                            className={`text-[10px] ${isDark ? "" : "text-slate-600"}`}
                            style={isDark ? dark.textMuted : undefined}
                        >
                            We'll get back
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpertSection;
