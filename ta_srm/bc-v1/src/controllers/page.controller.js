// API HELP
export const welcome = async (req, res) => {
  res.json({
    message: 'Bienbenido a la api TA, Node.js + PSQL',
    status: res.statusCode,
    endpoints: {
      get: ['/cliente', '/bulto'],
      post: ['/cliente', '/bulto'],
      put: ['/cliente', '/bulto'],
    },
  });
};
