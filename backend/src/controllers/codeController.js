import axios from "axios";

const CLIENT_ID = process.env.JDOODLE_CLIENT_ID;
const CLIENT_SECRET = process.env.JDOODLE_CLIENT_SECRET;
const languageMap = {
  javascript: "nodejs",
  python: "python3",
  java: "java",
};
export const executeCode = async (req, res) => {
  try {
    const { code, language, input } = req.body;

    const response = await axios.post("https://api.jdoodle.com/v1/execute", {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      script: code,
      stdin: input || "",
      language: languageMap[language],
      versionIndex: "0",
    });

    return res.json({
      success: true,
      output: response.data.output,
    });

  } catch (error) {
    console.error("JDoodle error:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      error: "Execution failed",
    });
  }
};