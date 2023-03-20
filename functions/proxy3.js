const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const { name } = event.queryStringParameters;
    const apiUrl = `http://pharpc1.phantasma.io:7077/api/v1/LookUpName?name=${name}`;
    console.log("Requesting data from:", apiUrl);
    const response = await axios.get(apiUrl);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.log("Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data" }),
    };
  }
};
