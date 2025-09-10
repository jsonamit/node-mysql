exports.sendResponse = (res, success, msg = "", data = null) => {
    return res.json({
        resp: success ? 1 : 0,
        msg,
        data
    });
  };
  