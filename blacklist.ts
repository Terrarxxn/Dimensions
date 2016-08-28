///<reference path="./typings/index.d.ts"/>
import * as http from 'http';
class Blacklist {
    static checkIP(ip: string, key: string) {
        return new Promise<boolean>((resolve, reject) => {
            http.get(`http://tools.xioax.com/networking/ip/${ip}/${key}`, (res) => {
                let data = "";
                res.on("data", function (chunk) {
                    data += chunk;
                });
                res.on("end", function () {
                    let resDetails = JSON.parse(data);
                    if (resDetails.status !== 'success') {
                        reject(new Error("Invalid API call."));
                    } else {
                        resolve(resDetails["host-ip"]);
                    }
                })
            }).on('error', (e) => {
                reject(e);
            });
        });
    }
}

export default Blacklist;