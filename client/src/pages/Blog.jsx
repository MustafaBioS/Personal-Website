// import md from "../blogs/test.md?raw";
// import ReactMarkdown from "react-markdown";
import Navbar from "../components/Navbar.jsx";

export default function Blog() {

    const blogs = import.meta.glob("../blogs/*.md", {
        eager: true,
        query: "?raw",
        import: "default",
    });

    const posts = Object.entries(blogs).map(([path]) => ({
        slug: path.split("/").pop().replace(".md", ""),
    }));

    console.log(blogs);
    console.log(posts);

    return (
        <>
            <div className="fixed inset-0 -z-10 bg-[#070707] bg-[linear-gradient(#ffffff10_1px,transparent_1px),linear-gradient(90deg,#ffffff10_2px,transparent_2px)] bg-size-[50px_50px]"></div>
            <Navbar></Navbar>
            <div className="mx-auto max-w-[30vw] pt-48">
                <div className="flex flex-row items-center">
                    <div className="h-7 w-1.5 rounded-full bg-[#9AD0DA]"></div>
                    <strong className="mx-4 text-white text-4xl">Blogs</strong>
                </div>
                <div>
                    {posts.map(post => (
                        <div key={post.slug} className="text-white">
                            {post.slug}
                        </div>
                    ))}
                </div>

            </div>

            <footer className="items-center flex justify-center">
                <h1 className="text-white opacity-50">&copy; 2026 Mustafa Hany</h1>
            </footer>
        </>
    )
}