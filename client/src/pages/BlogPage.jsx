import ReactMarkdown from "react-markdown"
import { useParams } from "react-router-dom";
import NotFound from "./404.jsx";
import fm from "front-matter";

export default function BlogPage() {

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
            <div className="">
                <h1 key={post.slug}>{post.title}</h1>
                <div className="text-white">
                    <ReactMarkdown>
                        {post.content}
                    </ReactMarkdown>
                </div>
            </div>
        </>
    )
}