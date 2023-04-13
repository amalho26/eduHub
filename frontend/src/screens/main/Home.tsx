import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import cheerio from 'cheerio';
import { Color } from '../../theme';
import { useState } from 'react';
import { text } from 'cheerio/lib/api/manipulation';


// import Constants from 'expo-constants';
  async function scrapeTweet(url: string) {
    const response = await axios.get(url);
    const html = response.data;
    var tweet;
    // console.log(response.data);
    const $ = cheerio.load(html);
    $('.ctr2').each((index, element) => {
      tweet = $(element).text();
      console.log($(element).text() + "tweet text");    
  });
    // console.log("Response: " + html);
    // const tweet = $('#tweetText').text().trim();
    // const tweet = $('@data-testid="cellInnerDiv"').text(); 
    return tweet; 
}

const HomeScreen = () => {
  const[tweet, setTweet] = useState("");
  
  async function displayTweet(){
    const tweetText = await scrapeTweet("https://twitter.com/WesternU?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor");
    // console.log(tweetText + "  this is the tweet")
    setTweet(tweetText)
  }
  useEffect(()=> {
    displayTweet()
  }, [])

  return(
    // <View>
    //   <Text> {tweet} </Text>
    //   {/* <Text> {$(displayTweet()).text()}</Text> */}
    // </View>

      <WebView
        style={{
       flex: 1,
       marginTop:7,
       backgroundColor: Color.BACKGROUND_COLOR, 
 }}
        source={{ uri: 'https://twitter.com/WesternU?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'}}
      />
    );
  }
export default HomeScreen;