const config    = require("./config.js");
const fs        = require("fs");
const tweetList = JSON.parse(fs.readFileSync("./tweet.js").toString().replace(config.jsonFix, "")).map(v => v.id_str);
const twitter   = new require("twit")({
    consumer_key:        config.consumerKey,
    consumer_secret:     config.consumerSecret,
    access_token:        config.accessToken,
    access_token_secret: config.accessTokenSecret
});

tweetList.forEach(e => {
    console.log("deleting tweet id : " + e);

    twitter.post("statuses/destroy/:id", { id: e }, (err) => {
        if(err) {
            console.error("deleting error : ", err);
        } else {
            console.log("deleted : " + e);
        }
    });
});