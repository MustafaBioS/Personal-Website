import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
// import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";

export function scroll(index) {
    const section = document.querySelector(`.section${index}`)
    section?.scrollIntoView({behavior: "smooth", block: "start"});
}

export default function Navbar() {
    const [active, setActive] = useState("home");
    const navItems = [
        { name: "home" },
        { name: "about" },
        { name: "projects" },
        { name: "blog", to: "/blog" },
    ];

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        // console.log(Icons);

        // console.log(typeof Icons.ArrowUpRight);
        // console.log(Icons.ArrowUpRight);

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
    }, []);
    return (
        <nav className="fixed flex gap-10 backdrop-blur-lg text-white items-center justify-center w-full h-24 text-2xl z-50">
            {navItems.map((item, index) =>
                item.to ? (
                    <Link
                        key={item.name}
                        to={item.to}
                        className={`
                        cursor-pointer
                        transition-all
                        hover:after:w-full
                        after:content-['']
                        after:block
                        after:h-[3px]
                        after:bg-white
                        after:transition-all
                        ${active === item.name ? "after:w-full" : "after:w-0"}
                    `}>
                        <span className="flex flex-row h-full items-center">
                            {item.name}
                            <ArrowUpRight size={20} className="mx-1" />
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
                        after:h-[3px]
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
    );
}