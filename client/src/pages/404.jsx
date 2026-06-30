import { Link, useLocation } from "react-router-dom";

export default function NotFound() {

    const location = useLocation();

    const isBlog = location.pathname.startsWith("/blog");

    return (
        <>
            <div className="flex justify-center items-center w-full h-screen flex-col">
                <h1 className="text-[#9AD0DA] text-5xl">404</h1>
                <h1 className="text-white text-3xl mt-2">
                    {isBlog ? "Blog Not Found" : "Page Not Found"}
                </h1>
                <Link to={isBlog ? "/blog" : "/"}>
                    Back
                </Link>
            </div>
        </>
    )
}