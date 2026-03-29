// Piston API is a service for code execution

const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const languageMap = {
      javascript: 63,
      python: 71,
      java: 62,
    };

    const response = await fetch("http://localhost:3000/api/code/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageMap[language],
      }),
    });

    const data = await response.json();

    if (!data.success) {
      return { success: false, error: data.error };
    }

    return {
      success: true,
      output: data.stdout || data.stderr || data.compile_output,
    };

  } catch (err) {
    return { success: false, error: err.message };
  }
}

function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
}
