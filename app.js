'use strict';

const TwitterPackage = require('twitter');
 
const secret = {
  consumer_key: process.env.THINKFUL_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.THINKFUL_TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.THINKFUL_TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.THINKFUL_TWITTER_ACCESS_TOKEN_SECRET
}

if (! secret.consumer_key || ! secret.consumer_secret || ! secret.access_token_key || ! secret.access_token_secret) {
  console.error('Set required environment variables: THINKFUL_TWITTER_CONSUMER_KEY, THINKFUL_TWITTER_CONSUMER_SECRET, THINKFUL_TWITTER_ACCESS_TOKEN_KEY, THINKFUL_TWITTER_ACCESS_TOKEN_SECRET');
  process.exit(1);
}
 
const Twitter = new TwitterPackage(secret),
      query = 'alot';

Twitter.get('search/tweets', { q: query, count: 1, lang:'en' }, (error, tweets, response) => {
  const tweet_list = tweets['statuses'];
    
  for (let thisTweet of tweet_list) {
    if ('retweeted_status' in thisTweet) {
      continue;
    } 
    
    let screen_name = thisTweet.user.screen_name,
        message = `@${screen_name} Alot confused, a lot not understand feelings`,
        tweet_id = thisTweet.id_str;

    try {
      Twitter.post('statuses/update', { 'status': message, 'in_reply_to_status_id':tweet_id }, (error, tweet, response) => {
        console.log('Tweet posted successfully!:');
        console.log(message);
      });
    }

    catch(err) {
      console.log(err);
    }
  }
});