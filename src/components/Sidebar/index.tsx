"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const pathname = usePathname();

    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);

    let storedSidebarExpanded = "true";

    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
    );

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ key }: KeyboardEvent) => {
            if (!sidebarOpen || key !== "Escape") return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector("body")?.classList.add("sidebar-expanded");
        } else {
            document.querySelector("body")?.classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <Link href="/">
                    <Image
                        width={60}
                        height={15}
                        src={'https://fishandshrimp.in/static/media/logo.8d67e8d8184872981282.png'}
                        alt="Logo"
                        priority
                    />
                </Link>
                <span className="font-semibold text-bodydark2 text-white">Fish and Shrimp Admin</span>
                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden"
                >
                    <svg
                        className="fill-current"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">

                <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">

                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                            MENU
                        </h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <Link
                                    href="/admin/banners"
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("banners") &&
                                        "bg-graydark dark:bg-meta-4"
                                        }`}
                                >
                                    <svg className="fill-current"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M22 6v11.067l-2.714-2.714a.503.503 0 0 0-.657-.047L16.45 15.94a.503.503 0 0 1-.623-.016l-3.609-3.007a.503.503 0 0 0-.677.031l-3.627 3.628a.474.474 0 0 1-.678-.049.503.503 0 0 0-.704.008L4 19.067v-2.496l-1-1.007V22h20V5H11v1zm0 15H4v-.519l2.947-2.947a1.506 1.506 0 0 0 .677.163 1.403 1.403 0 0 0 .997-.415l3.307-3.307 3.26 2.716a1.502 1.502 0 0 0 1.863.049l1.833-1.375L22 18.481zm-5.5-10A1.5 1.5 0 1 0 15 9.5a1.5 1.5 0 0 0 1.5 1.5zm0-2a.5.5 0 1 1-.5.5.5.5 0 0 1 .5-.5zM5 14.74l4-4.026v-7.42C9 1.294 7.505.2 5 .2S1 1.394 1 3.394v7.32zM2 3.393C2 1.58 3.631 1.2 5 1.2s3 .28 3 2.094v7.008l-3 3.02-3-3.02zM5 7a2 2 0 1 0-2-2 2.002 2.002 0 0 0 2 2zm0-3a1 1 0 1 1-1 1 1.001 1.001 0 0 1 1-1z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                                    Banners
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/admin/product"
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("product") &&
                                        "bg-graydark dark:bg-meta-4"
                                        }`}
                                >
                                    <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f5f0f0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M48 0H0V48H48V0Z" fill="white" fill-opacity="0.01"></path> <path d="M44 14L24 4L4 14V34L24 44L44 34V14Z" stroke="#f5f5f5" stroke-width="4" stroke-linejoin="round"></path> <path d="M4 14L24 24" stroke="#f5f5f5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M24 44V24" stroke="#f5f5f5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M44 14L24 24" stroke="#f5f5f5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M34 9L14 19" stroke="#f5f5f5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/admin/coupon"
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("coupon") &&
                                        "bg-graydark dark:bg-meta-4"
                                        }`}
                                >
                                    <svg className="fill-current" fill="#ffff" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Discount"> <path d="M83.5,40a.5.5,0,0,0,.5-.5v-9A2.5,2.5,0,0,0,81.5,28h-16a.5.5,0,0,0-.5.5,2.5,2.5,0,0,1-5,0,.5.5,0,0,0-.5-.5h-45A2.5,2.5,0,0,0,12,30.5v9a.5.5,0,0,0,.5.5,8,8,0,0,1,0,16,.5.5,0,0,0-.5.5v9A2.5,2.5,0,0,0,14.5,68h45a.5.5,0,0,0,.5-.5,2.5,2.5,0,0,1,5,0,.5.5,0,0,0,.5.5h16A2.5,2.5,0,0,0,84,65.5v-9a.5.5,0,0,0-.5-.5,8,8,0,0,1,0-16Zm-9,8A9,9,0,0,0,83,57V65.5A1.5,1.5,0,0,1,81.5,67H66A3.5,3.5,0,0,0,59,67H14.5A1.5,1.5,0,0,1,13,65.5V57a9,9,0,0,0,0-18V30.5A1.5,1.5,0,0,1,14.5,29H59A3.5,3.5,0,0,0,66,29H81.5A1.5,1.5,0,0,1,83,30.5V39A9,9,0,0,0,74.5,48Z"></path> <path d="M62.5,33a.5.5,0,0,0-.5.5v2a.5.5,0,0,0,1,0v-2A.5.5,0,0,0,62.5,33Z"></path> <path d="M62.5,42.38a.5.5,0,0,0-.5.5v3.7a.5.5,0,0,0,1,0v-3.7A.5.5,0,0,0,62.5,42.38Z"></path> <path d="M62.5,47.92a.5.5,0,0,0-.5.5v3.7a.5.5,0,1,0,1,0v-3.7A.5.5,0,0,0,62.5,47.92Z"></path> <path d="M62.5,53.46a.5.5,0,0,0-.5.5v3.69a.5.5,0,1,0,1,0V54A.5.5,0,0,0,62.5,53.46Z"></path> <path d="M62.5,36.85a.5.5,0,0,0-.5.5V41a.5.5,0,0,0,1,0V37.35A.5.5,0,0,0,62.5,36.85Z"></path> <path d="M62.5,59a.5.5,0,0,0-.5.5v2a.5.5,0,0,0,1,0v-2A.5.5,0,0,0,62.5,59Z"></path> <path d="M54.5,41h-10a.5.5,0,0,0,0,1h10a.5.5,0,0,0,0-1Z"></path> <path d="M68.5,39a.5.5,0,0,0-.5.5v17a.5.5,0,0,0,1,0v-17A.5.5,0,0,0,68.5,39Z"></path> <path d="M71.5,39a.5.5,0,0,0-.5.5v12a.5.5,0,0,0,1,0v-12A.5.5,0,0,0,71.5,39Z"></path> <path d="M54.5,53h-10a.5.5,0,0,0,0,1h10a.5.5,0,0,0,0-1Z"></path> <path d="M44.5,48h8a.5.5,0,0,0,0-1h-8a.5.5,0,0,0,0,1Z"></path> <path d="M44.5,45h4a.5.5,0,0,0,0-1h-4a.5.5,0,0,0,0,1Z"></path> <path d="M44.5,51h2a.5.5,0,0,0,0-1h-2a.5.5,0,0,0,0,1Z"></path> <path d="M52.5,45a.5.5,0,0,0,0-1h-1a.5.5,0,0,0,0,1Z"></path> <path d="M71.5,54a.5.5,0,0,0-.5.5v2a.5.5,0,0,0,1,0v-2A.5.5,0,0,0,71.5,54Z"></path> <polygon points="39 38 26 58 27 58 40 38 39 38"></polygon> <path d="M29,47a4,4,0,1,0-4-4A4,4,0,0,0,29,47Zm0-7a3,3,0,1,1-3,3A3,3,0,0,1,29,40Z"></path> <path d="M37,49a4,4,0,1,0,4,4A4,4,0,0,0,37,49Zm0,7a3,3,0,1,1,3-3A3,3,0,0,1,37,56Z"></path> </g> </g></svg>
                                    Coupons
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
