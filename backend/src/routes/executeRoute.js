import express from "express";
import axios from "axios";

const router = express.Router();

// 🔐 store in .env
const RAPID_API_KEY = process.env.RAPID_API_KEY;

const LANGUAGE_MAP = {
  javascript: 63,
  python: 71,     
  java: 62,     
};

router.post("/", async (req, res) => {
  try {
    const { language, code } = req.body;

    const language_id = LANGUAGE_MAP[language];
    if (!language_id) {
      return res.status(400).json({ error: "Unsupported language" });
    }

    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: code,
        language_id,
        stdin: "",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    const data = response.data;

    return res.json({
      stdout: data.stdout,
      stderr: data.stderr,
      compile_output: data.compile_output,
      status: data.status?.description,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Execution failed",
      details: err.response?.data || err.message,
    });
  }
});

export default router;