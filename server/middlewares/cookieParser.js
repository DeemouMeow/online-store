export default function (req, res, next) {
    req.cookies = getCookies();
    next();

    function getCookies() {
        const cookies = {};
        const header = req.headers.cookie;

        if (!header) return cookies;

        header.split(";").forEach(cookie => {
            const [name, rest] = cookie.split("=");

            if (!name) return;

            const key = name.trim();

            if (!rest) return;

            const value = rest.trim();

            cookies[key] = decodeURIComponent(value);
        });

        return cookies;
    }
}