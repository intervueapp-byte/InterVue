export async function executeCode(language, code) {
  try {
    const response = await fetch("http://localhost:3000/api/code/execute", {
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

    const data = await response.json();

    if (!data.success) {
      return { success: false, error: data.error };
    }

    return {
      success: true,
      output: data.output,
    };

  } catch (err) {
    return { success: false, error: err.message };
  }
}