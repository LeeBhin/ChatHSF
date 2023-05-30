const axios = require('axios');
const https = require('https');

exports.handler = async function (event, context, callback) {
  try {
    const urls = [
      'https://www.schoolinfo.go.kr/openApi.do?apiKey=09f9b2bf2e3b4daea8e4f4b88f22b7df&apiType=0&pbanYr=2023&schulKndCode=04',
      'https://www.schoolinfo.go.kr/openApi.do?apiKey=09f9b2bf2e3b4daea8e4f4b88f22b7df&apiType=63&pbanYr=2022&schulKndCode=04'
    ];

    const responses = await Promise.all(
      urls.map(async (url) => {
        try {
          const response = await axios.get(url, {
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
          });
          return response.data;
        } catch (error) {
          console.error('Failed to fetch data:', error);
          throw error;
        }
      })
    );

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(responses)
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    });
  }
};
