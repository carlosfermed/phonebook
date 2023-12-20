
function redirect(res) {
    res.writeHead(302, {location: "/", "content-type": "text/plain"});
    res.end("Contact deleted, redirecting to main page...")
}

module.exports = redirect;