// backend/src/controllers/codeController.js

import axios from "axios";

// Ensure you have this in server.js (top of file):
// import dotenv from "dotenv";
// dotenv.config();

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = "judge0-ce.p.rapidapi.com";

const JUDGE0_BASE = "https://judge0-ce.p.rapidapi.com";

export const executeCode = async (req, res) => {
  try {
    // Basic validation
    if (!RAPID_API_KEY) {
      console.error("❌ RAPID_API_KEY is missing");
      return res.status(500).json({
        success: false,
        error: "Server misconfigured: missing API key",
      });
    }

    const { source_code, language_id, stdin } = req.body;

    if (!source_code || !language_id) {
      return res.status(400).json({
        success: false,
        error: "source_code and language_id are required",
      });
    }

    // 🔹 1) Create submission (async, no wait)
    const createRes = await axios.post(
      `${JUDGE0_BASE}/submissions?base64_encoded=false&wait=false`,
      {
        source_code,
        language_id,
        stdin: stdin || "",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": RAPID_API_HOST,
        },
        timeout: 10000,
      }
    );

    const token = createRes.data?.token;
    if (!token) {
      console.error("❌ No token returned:", createRes.data);
      return res.status(500).json({
        success: false,
        error: "Failed to create submission",
      });
    }

    // 🔹 2) Poll for result (max ~10 seconds)
    let result = null;
    const maxAttempts = 10;
    const delayMs = 1000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const resPoll = await axios.get(
        `${JUDGE0_BASE}/submissions/${token}?base64_encoded=false`,
        {
          headers: {
            "X-RapidAPI-Key": RAPID_API_KEY,
            "X-RapidAPI-Host": RAPID_API_HOST,
          },
          timeout: 10000,
        }
      );

      result = resPoll.data;

      // status.id:
      // 1: In Queue, 2: Processing, >=3: Finished (Accepted/WA/CE/RE/TLE)
      if (result?.status?.id >= 3) break;

      await new Promise((r) => setTimeout(r, delayMs));
    }

    if (!result) {
      return res.status(500).json({
        success: false,
        error: "No result returned from Judge0",
      });
    }

    // 🔹 3) Normalize response
    return res.json({
      success: true,
      status: result.status?.description,
      stdout: result.stdout,
      stderr: result.stderr,
      compile_output: result.compile_output,
      time: result.time,
      memory: result.memory,
    });
  } catch (error) {
    // Show full error for debugging
    const details = error.response?.data || error.message;
    console.error("❌ Judge0 error:", details);

    return res.status(500).json({
      success: false,
      error: details,
    });
  }
};