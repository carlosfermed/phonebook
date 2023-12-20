
function redirect(res) {
    res.writeHead(302, {location: "/", "content-type": "text/plain"});
    res.end("302 redirecting to main page...")
}

module.exports = redirect;