import ReactMarkdown from "react-markdown"
import { useParams, Link } from "react-router-dom";
import NotFound from "./404.jsx";
import fm from "front-matter";
import remarkGfm  from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Navbar from "../components/Navbar.jsx";
import { useLenis, ReactLenis } from "lenis/react";
import 'lenis/dist/lenis.css';
import { ArrowLeft } from "lucide-react";


export default function BlogPage() {

    const lenis = useLenis((lenis) => {
    });

    const { slug } = useParams();

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

    const post = posts.find(post => post.slug === slug);

    // const markdown = blogs[`../blogs/${slug}.md`];

    if (!post) {
        return <NotFound />;
    }

    return (
        <>
            <ReactLenis root/>
            <Navbar />
            <div className="fixed inset-0 -z-10 bg-[#070707] bg-[linear-gradient(#ffffff10_1px,transparent_1px),linear-gradient(90deg,#ffffff10_2px,transparent_2px)] bg-size-[50px_50px]"></div>
            <div className="pt-40 mx-auto max-w-xl px-6">
                <Link to="/blog" className="text-white opacity-70 flex max-w-35 flex-row gap-2 hover:text-[#9AD0DA] transition-all duration-300 ease-in-out"><span><ArrowLeft className="w-5"/></span> Back To Blogs</Link>

                <h1 key={post.slug} className="mt-6 font-bold text-white text-2xl sm:text-4xl leading-tight">{post.title}</h1>

                <h1 key={post.slug} className="mt-1 text-white text-lg opacity-70 mb-10">
                    {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                    {" · "}
                    {post.readTime} min read
                </h1>
                <hr className="bg-white h-0.5 mb-10"/>
                <div className="text-white prose prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {post.content}
                    </ReactMarkdown>
                </div>
            </div>

            <footer className="flex justify-center pt-18 pb-4">
                <h1 className="text-white opacity-50">
                    &copy; 2026 Mustafa Hany
                </h1>
            </footer>
        </>
    )
}