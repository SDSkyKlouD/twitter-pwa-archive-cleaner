/* eslint-disable @typescript-eslint/camelcase */

import { readFileSync } from "fs";
import loadConfig from "./config/loader";
import Twitter from "twit";

// #region Type definitions
interface NeededTweetDataParent {
    tweet: NeededTweetData
}

interface NeededTweetData {
    id: bigint;
    id_str: string;
    entities: {
        media: Array<{
            type: string;
        }>;
    };
    full_text: string;
}
// #endregion

// #region Constants & Modules
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const config  = loadConfig()!; 
const twitter = new Twitter({
    consumer_key: config.secret.twitterAuthToken.consumerKey,
    consumer_secret: config.secret.twitterAuthToken.consumerSecret,
    access_token: config.secret.twitterAuthToken.accessKey,
    access_token_secret: config.secret.twitterAuthToken.accessSecret
});
const tweetList: Array<NeededTweetDataParent> = JSON.parse(readFileSync("./tweet.js").toString().replace(config.config.jsonFix, ""));
// #endregion

// #region Functions
async function process(data: NeededTweetData): Promise<void> {
    if(data.full_text.match(/^RT @.+: /) === null) {
        if(config.config.skipTweetsContainingMedia) {
            if(typeof(data.entities) !== "undefined" && typeof(data.entities.media) !== "undefined") {
                return;
            }
        }
    }

    twitter.post("statuses/destroy/:id", { id: data.id_str }, (error) => {
        if(error) {
            console.error("Error while destroying a Tweet\n", error);
        } else {
            console.debug(`Deleted : ${data.id_str}`);
        }
    });

    return new Promise((resolve): number => setTimeout(resolve, config.config.delayMs));
}
// #endregion

async function main(): Promise<void> {
    for(const value of tweetList) {
        await process(value.tweet);
    }
}

main();