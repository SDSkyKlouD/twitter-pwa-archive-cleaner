const config    = require("./config.js");
const fs        = require("fs");
const tweetList = JSON.parse(fs.readFileSync("./tweet.js").toString().replace(config.jsonFix, ""));
const twitter   = new require("twit")({
    consumer_key:        config.consumerKey,
    consumer_secret:     config.consumerSecret,
    access_token:        config.accessToken,
    access_token_secret: config.accessTokenSecret
});

const PROCESS_DELAY_MS = 50;
const SKIP_TWEETS_CONTAINING_MEDIA = true;

async function main() {
    for(index in tweetList) {
        await iterate(tweetList[index]);
    }
}

async function iterate(e) {
    console.log("deleting tweet id : " + e.id_str);

    if(e.full_text.match(/^RT \@.+: /) === null) {
        if(SKIP_TWEETS_CONTAINING_MEDIA) {
            if(typeof(e.entities) !== "undefined" && typeof(e.entities.media) !== "undefined") {
                console.log("ㄴ Skipping media-containing tweet");
                return;
            }
        }
    } else {
        console.log("ㄴ RT tweet; will be processed unconditionally");
    }

    twitter.post("statuses/destroy/:id", { id: e.id_str }, (err) => {
        if(err) {
            console.error("deleting error : ", err);
        } else {
            console.log("deleted : " + e.id_str);
        }
    });

    return new Promise(res => setTimeout(res, PROCESS_DELAY_MS));
}

main();