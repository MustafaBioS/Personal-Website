import { useEffect, useState } from 'react';

function scroll(index) {
    const section = document.querySelector(`.section${index}`)
    section?.scrollIntoView({behavior: "smooth", block: "start"});
}

export default function Navbar() {
    const [active, setActive] = useState("home");

    useEffect(() => {
        const sections = document.querySelectorAll('section');

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
            {["home", "about", "projects", "blog"].map((item, index) => (
                <button
                    key={item}
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
                        ${active === item ? "after:w-full" : "after:w-0"}
                    `}
                >
                    {item}
                </button>
            ))}
        </nav>
    );
}