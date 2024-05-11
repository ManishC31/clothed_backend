exports.ApiResponse = (res, code, message, data) => {
  return res.status(code || 200).json({
    success: true,
    message: message,
    data: data,
  });
};

exports.ApiError = (res, code, message) => {
  return res.status(code || 400).json({
    success: false,
    message: message,
  });
};

exports.InternalError = (res) => {
  return res.status(500).json({
    success: false,
    message: "Something went wrong !",
  });
};
