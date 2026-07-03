import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
// import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";

export function scroll(index) {
    const section = document.querySelector(`.section${index}`)
    section?.scrollIntoView({behavior: "smooth", block: "center"});
}

export default function Navbar() {
    const location = useLocation();
    const [active, setActive] = useState("home");

    const navItems = location.pathname.startsWith("/blog")
        ? [
            { name: "home", to: "/#home" },
            { name: "about", to: "/#about" },
            { name: "projects", to: "/#projects" },
            { name: "blog", to: "/blog" },
        ]
        : [
            { name: "home" },
            { name: "about" },
            { name: "projects" },
            { name: "blog", to: "/blog" },
        ];



    useEffect(() => {
        const sections = document.querySelectorAll('section');

        if (location.pathname.startsWith("/blog")) {
            setActive("blog");
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                        window.history.replaceState(null, "", `#${entry.target.id}`);
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [location.pathname]);
    return (
        <>
            <nav className="fixed hidden sm:flex gap-10 backdrop-blur-lg text-white items-center justify-center w-full h-24 text-2xl z-50">
                {navItems.map((item, index) =>
                    item.to ? (
                        <Link
                            key={item.name}
                            to={item.to}
                            state={{ scrollTo: item.name }}
                            className={`
                            cursor-pointer
                            transition-all
                            hover:after:w-full
                            after:content-['']
                            after:block
                            after:h-0.75
                            after:bg-white
                            after:transition-all
                            ${active === item.name ? "after:w-full" : "after:w-0"}
                        `}>
                            <span className="flex flex-row h-full items-center">
                                {item.name}
                                {item.name === "blog" && (
                                    <ArrowUpRight size={20} className="mx-1" />
                                )}
                            </span>
                        </Link>
                    ) : (
                        <button
                            key={item.name}
                            onClick={() => scroll(index + 1)}
                            className={`
                            cursor-pointer
                            transition-all
                            hover:after:w-full
                            after:content-['']
                            after:block
                            after:h-0.75
                            after:bg-white
                            after:transition-all
                            ${active === item.name ? "after:w-full" : "after:w-0"}
                        `}
                        >
                            {item.name}
                        </button>
                    )
                )}
            </nav>
            <nav className="fixed flex sm:hidden gap-10 backdrop-blur-lg text-white items-center justify-center w-full h-24 text-2xl z-50">
                {active === "home" && (
                    <Link
                        to={"/blog"}
                        className={`
                            cursor-pointer
                            transition-all
                            hover:after:w-full
                            after:content-['']
                            after:block
                            after:h-0.75
                            after:bg-white
                            after:transition-all
                            after:w-0
                        `}>
                            <span className="flex flex-row h-full items-center">
                                blog
                                <ArrowUpRight size={20} className="mx-1" />
                            </span>
                    </Link>
                )}

                {active === "blog" && (
                    <Link
                        to={"/"}
                        className={`
                            cursor-pointer
                            transition-all
                            hover:after:w-full
                            after:content-['']
                            after:block
                            after:h-0.75
                            after:bg-white
                            after:transition-all
                            after:w-0
                        `}>
                            <span className="flex flex-row h-full items-center">
                                Home
                            </span>
                    </Link>
                )}
            </nav>
        </>
    );
}