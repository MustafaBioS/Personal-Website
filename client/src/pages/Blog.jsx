import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";

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
                            <Link to={`/blog/${post.slug}`} key={post.slug} className="text-white w-full py-5 transition-all ease-in-out duration-300 hover:text-yellow-400 cursor-pointer">
                                <strong>{post.slug}</strong>
                            </Link>
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