
fetch("https://decoder.link/api", {
    method: "POST",
    mode: "no-cors",
    headers: {
        "content-type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({ "method": "sslchecker", "params": { "hostname": "db.qs-befunddaten.de", "port": "443" } })
}).then(x => {
    console.log(x.ok)
    return x.json()
}).then(x => {
    console.log(x)
})