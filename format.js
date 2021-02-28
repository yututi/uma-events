
import fs from "fs"


(async () => {

    const str = fs.readFileSync("public/supports.json", {encoding: "utf-8"})

    const s = JSON.parse(str)

    fs.writeFileSync("public/supports_formatted.json", JSON.stringify(s, null, 2))
})();