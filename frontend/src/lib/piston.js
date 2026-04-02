export async function executeCode(language, code) {
  try {
    const API_URL = import.meta.env.VITE_API_URL;

    const response = await fetch(`${API_URL}/code/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        language: language,
        input: "",
      }),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        error: data.error || "Execution failed",
      };
    }

    return {
      success: true,
      output: data.output || "No output",
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Unknown error",
    };
  }
}