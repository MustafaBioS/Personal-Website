import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
// import markdown from "react-markdown";
import fm from "front-matter";

export default function Blog() {

    const blogs = import.meta.glob("../blogs/*.md", {
        eager: true,
        query: "?raw",
        import: "default",
    });

    const posts = Object.entries(blogs).map(([path, raw]) => {
        const { attributes, body } = fm(raw);

        const words = body.trim().split(/\s+/).length;
        const readTime = Math.max(1, Math.ceil(words / 200));

        return {
            slug: path.split("/").pop().replace(".md", ""),
            ...attributes,
            content: body,
            readTime,
        };
    });

    console.log(blogs);
    console.log(posts);

    return (
        <>
            <div className="fixed inset-0 -z-10 bg-[#070707] bg-[linear-gradient(#ffffff10_1px,transparent_1px),linear-gradient(90deg,#ffffff10_2px,transparent_2px)] bg-size-[50px_50px]" />

            <div className="flex min-h-screen flex-col">
                <Navbar />

                <main className="mx-auto w-full max-w-[30vw] flex-1 pt-48">
                    <div className="flex flex-row items-center">
                        <div className="h-7 w-1.5 rounded-full bg-[#9AD0DA]" />
                        <strong className="mx-4 text-4xl text-white">Blogs</strong>
                    </div>

                    <div className="mt-8">
                        {posts.map(post => (
                            <div className="w-full border-b-2 border-white" key={post.slug}>
                                <Link to={`/blog/${post.slug}`} className="flex flex-row justify-between text-white py-3 px-3 transition-all ease-in-out duration-300 hover:text-yellow-400 cursor-pointer">
                                    <strong>{post.title}</strong>
                                    <p>{post.date} · {post.readTime} min read</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </main>

                <footer className="flex justify-center py-5">
                    <h1 className="text-white opacity-50">
                        &copy; 2026 Mustafa Hany
                    </h1>
                </footer>
            </div>
        </>
    )
}