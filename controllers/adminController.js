const Admin = require("../model/Admin.js");

const seedAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: "prowesscheck@gmail.com" });
    if (adminExists) return;

    const hashedPassword = await bcrypt.hash("admin@123", 12);

    await Admin.create({
      username: "administrator",
      email: "prowesscheck@gmail.com",
      password: hashedPassword,
      role: 1,
    });


  } catch (error) {
    console.error("Error seeding admin:", error.message);
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({ role: 1 }).select("-password"); // password ko exclude kar diya

    if (!admins.length) {
      return res.status(404).json({ message: "No admins found" });
    }

    res.status(200).json({
      success: true,
      count: admins.length,
      admins,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error: error.message });
  }
};

module.exports = { seedAdmin,getAdmins };
