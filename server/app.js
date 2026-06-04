const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

let access_token = null;
let expires_in = 0;

async function refreshToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization":
                "Basic " +
                Buffer.from(
                    process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
                ).toString("base64"),
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: process.env.REFRESH_TOKEN,
        }),
    });

    const data = await response.json();

    access_token = data.access_token;
    expires_in = Date.now() + data.expires_in * 1000;

    return access_token;
}

app.get('/callback', async (req, res) => {

    const code = req.query.code;

    if (!code) {
        return res.status(400).json({
            error: "Missing_code",
            message: "No authorization code in query"
        });
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.REDIRECT_URI,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
        })
    });

    const data = await response.json();

    access_token = data.access_token;
    expires_in = Date.now() + (data.expires_in - 60) * 1000;

    res.json(data);
})

app.get("/api/now-playing", async (req, res) => {
    try {
        if (!access_token || Date.now() > expires_in) {
            await refreshToken();
        }

        const response = await fetch("https://api.spotify.com/v1/me/player", {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        if (response.status === 204) {
            return res.json({
                isPlaying: false,
                song: null,
                artist: null,
            });
        }

        const data = await response.json();

        if (!data || !data.item) {
            return res.json({
                isPlaying: false,
                song: null,
                artist: null,
            });
        }

        if (req.query.debug === "true") {
            return res.json(data);
        } else {
            return res.json({
                isPlaying: data.is_playing,
                song: data.item?.name ?? null,
                artist: data.item?.artists?.map(a => a.name).join(", ") ?? null,
                song_uri: data.item?.external_urls?.spotify ?? null,
                artist_uri: data.item?.artists?.map(a => a.external_urls.spotify) ?? null,
                album_image: data.item?.album?.images[1]?.url ?? null,
            });
        }

    } catch (err) {
        console.error("Now-playing error:", err);
        res.status(500).json({ error: "Server crash" });
    }
});

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})