sendToken = async (admin, statusCode, message, res) => {
  const token = admin.generateToken();
  res
    .status(statusCode)
    .cookie("admin_token", token, {
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: "None",
      secure: true,
      // secure: false,
    })
    .json({
      status: true,
      message,
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
};

module.exports = { sendToken };
