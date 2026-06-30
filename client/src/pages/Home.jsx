import { useState ,useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import '../App.css';
import githubLogo from '../../assets/logos/github.webp';
import spotifyLogo from '../../assets/logos/spotify.png';
import instaLogo from '../../assets/logos/insta-white.webp';
import Navbar, { scroll } from "../components/Navbar.jsx";
import { ArrowDown } from 'lucide-react';
import Card from "../components/Card.jsx";
import Paradox from "../../assets/projects/paradox.png";
import Spotify from "../../assets/projects/spotify.png";
import Slushies from "../../assets/projects/slushies.png";

export default function Home() {
    const [isVisible, setIsVisible] = useState(false)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [dots, setDots] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);

    const lenis = useLenis((lenis) => {
    });

    useEffect(() => {
        requestAnimationFrame(() => setIsVisible(true))

        const dotsInterval = setInterval(() => {
            setDots(prev => (prev + 1) % 4);
        }, 500);

        const getSong = () => {
            fetch("http://localhost:5000/api/now-playing")
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    console.log(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                })
        };
        getSong();

        const songInterval = setInterval(getSong, 5000);

        return() => {
            clearInterval(dotsInterval);
            clearInterval(songInterval);
        };
    }, [])

    const loadingText = "Loading" + ".".repeat(dots);

    function animate(index) {
        return {
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: `opacity 600ms ease-in-out ${index * 140}ms, transform 600ms`
        }
    }

    return (
        <>
            {/*<div className={`fixed transform ${}`}></div>*/}
            <ReactLenis root />
            <div className="fixed inset-0 -z-10 bg-[#070707] bg-[linear-gradient(#ffffff10_1px,transparent_1px),linear-gradient(90deg,#ffffff10_2px,transparent_2px)] bg-size-[50px_50px]"></div>
                <Navbar></Navbar>
                <section id="home" className="section1 flex min-h-screen items-center justify-center py-24 flex-col">
                    <div className="relative">
                        {!imageLoaded && (
                            <div className="w-50 h-50 rounded-3xl bg-gray-500 animate-pulse" />
                        )}
                        <img
                            src="https://github.com/MustafaBioS.png?size=200"
                            alt="Profile Picture"
                            className={`rounded-3xl`}
                            style={animate(0)}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                    <h1 className="text-white text-[clamp(1.5rem,2vw,2rem)] text-center pt-6" style={animate(1)}>Hey, I'm <span className="text-[#9AD0DA]">Mustafa</span>!</h1>
                    {/*<p className="text-white text-2xl md:w-[60%] w-[75%] xl:w-[35%] pt-6 text-center" style={animate(2)}>I'm a 16 year old from Giza, Egypt, who has taken an interest in programming from such a young age!</p>*/}
                    <div className="text-white flex flex-col items-center w-full pt-2 text-[clamp(1rem,2vw,1.35rem)]" style={animate(2)}>
                        {loading ? (
                            loadingText
                        ) : data?.isPlaying ? (
                            <div className="flex items-center flex-col">
                                {/*<h1 className="text-xl mb-2">Currently Playing On <span className="text-green-600">Spotify</span>:</h1>*/}
                                {/*<img src={data?.album_image} alt={data?.song} className="h-36 md:h-48 rounded-3xl pb-2 md:pb-4" />*/}
                                <div className="flex items-center flex-row w-full">
                                    <a href={data?.song_uri} target="_blank" className="transition-all duration-300 ease-in-out hover:opacity-70 truncate max-w-full">{data?.song}</a>
                                    <h1 className="mx-2"> - </h1>
                                    <p className="truncate max-w-full">
                                        {data.artists.map((artist, index) => (
                                            <span key={artist.id}>
                                            <a
                                                href={artist.uri}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="transition-all duration-300 ease-in-out hover:opacity-70"
                                            >
                                                {artist.name}
                                            </a>
                                                {index < data.artists.length - 1 && ", "}
                                        </span>
                                        ))}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            "No Songs Are Currently Playing"
                        )}
                    </div>
                    <div className="flex flex-row items-center gap-6 pt-4" style={animate(3)}>
                        <a href="https://github.com/MustafaBioS" target="_blank">
                            <img src={githubLogo} alt="Github Logo" className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:opacity-75 w-9" />
                        </a>
                        <a href="https://open.spotify.com/user/31iornw33kqeejopjajqutfhv6ea?si=933c9d678194426c" target="_blank">
                            <img src={spotifyLogo} alt="Spotify Logo" className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:opacity-75 w-9" />
                        </a>
                        <a href="https://www.instagram.com/mustafa_elarabyy/" target="_blank">
                            <img src={instaLogo} alt="Instagram Logo" className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:opacity-75 w-9" />
                        </a>
                    </div>
                    <ArrowDown
                        color={"White"}
                        size={46}
                        onClick={() => scroll(2)}
                        className={`transition-all duration-300 ease-in-out absolute animate-bounce bottom-6
                            ${window.scrollY >= 5 ? "opacity-0" : "opacity-100 hover:opacity-70 cursor-pointer"}
                        `
                    }/>
                </section>

                <section id="about" className="section2 flex min-h-screen items-center justify-center py-24 flex-col">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-row items-center">
                            <div className="h-7 w-1.5 rounded-full bg-[#9AD0DA]"></div>
                            <strong className="mx-4 text-white text-4xl">About</strong>
                        </div>
                        <p className="text-white text-lg mt-4 ml-5">lorem ipsum</p>
                    </div>
                </section>

                <section id="projects" className="section3 min-h-[93vh] py-24">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-row md:items-center ">
                            <div className="h-7 w-1.5 rounded-full bg-[#9AD0DA]"></div>
                            <strong className="mx-4 text-white text-4xl">Projects</strong>
                        </div>
                        <div className="mt-10 gap-10 grid grid-cols-1 md:grid-cols-3 items-stretch">
                            <Card title="Paradox" description="This is a platform i made for my Hack Club YSWS, Paradox, It's built in Ruby on Rails and was actually my first Ruby on Rails project yet it was super fun and taught me alot." image={Paradox} repo="https://github.com/MustafaBioS/paradox" demo="https://paradox.mustafa.hackclub.app/" />
                            <Card title="Spotify Display" description="Spotify Display hardware project, My first ever hardware project, You put it on your desk and connect it to your WI-FI and Spotify API and it displays your currently playing song on Spotify" image={Spotify} repo="https://github.com/MustafaBioS/Spotify-Display" demo="https://github.com/MustafaBioS/Spotify-Display" />
                            <Card title="Slushies" description="Slushies is the website for another YSWS i have run for Hack Club, it uses ThreeJS for the 3D effect and i also made the slideshow guide!" image={Slushies} repo="https://github.com/MustafaBioS/slushies" demo="https://slushies.hackclub.com" />
                        </div>
                    </div>

                </section>

                <footer className="items-center flex justify-center">
                    <h1 className="mb-5 text-white opacity-50">&copy; 2026 Mustafa Hany</h1>
                </footer>

                {/*<div className="sticky w-full items-center flex bottom-10 justify-center">*/}
                {/*    <div className="text-white flex flex-col items-center w-full">*/}
                {/*        {loading ? (*/}
                {/*            loadingText*/}
                {/*        ) : data?.isPlaying ? (*/}
                {/*            <div className="flex items-center flex-col">*/}
                {/*                /!*<h1 className="text-xl mb-2">Currently Playing On <span className="text-green-600">Spotify</span>:</h1>*!/*/}
                {/*                <img src={data?.album_image} alt={data?.song} className="h-36 md:h-48 rounded-3xl pb-2 md:pb-4" />*/}
                {/*                <div className="flex items-center flex-row text-[clamp(1rem,2vw,1.5rem)] m-2 w-full">*/}
                {/*                    <a href={data?.song_uri} target="_blank" className="truncate max-w-full">{data?.song}</a>*/}
                {/*                    <h1 className="m-2"> - </h1>*/}
                {/*                    <a href={data?.artist_uri} target="_blank" className="truncate max-w-full">{data?.artist}</a>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        ) : (*/}
                {/*            "Nothing Is Playing"*/}
                {/*        )}*/}
                {/*    </div>*/}
                {/*</div>*/}
        </>
    )
}