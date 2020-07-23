exports.handler = async (event) => {
  console.log(event.queryStringParameters);
  const { text } = event.queryStringParameters;
  return {
    statusCode: 200,
    body: `You said ${text}`,
  };
};
