twitter-pwa-archive-cleaner
===========================
Tweet cleaner using newly-structured Twitter data archive.

How to use
----------
1. Clone this repository.  
   `$ git clone https://github.com/SDSkyKlouD/twitter-pwa-archive-cleaner`
2. Install npm dependencies.  
   `$ npm install`
3. [Get your Twitter archive](https://twitter.com/settings/your_twitter_data). Make sure you're running PWA version of Twitter web client (it looks like [this](https://www.theverge.com/2019/7/15/20695120/twitter-desktop-redesign-dark-mode-mobile-features).). You may have to wait for your archive incoming to your e-mail. 
   - You can also follow [this official guide](https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive).
4. Open your Twitter archive after download it, pick ONLY `tweet.js` file from your archive root and copy it to cloned repository root
5. Fill out `config.example.js` with your application's consumer key/secret, your account's access token key/secret
6. Run this script with `node .` or `node src/main.js` and the script will automatically process with your `tweet.js` archive data
