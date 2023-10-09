async function fetchChatGPTResponse(inputText) {
    const endpoint = "https://api.openai.com/v1/engines/davinci-codex/completions"; // Modify as needed
    const apiKey = "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"; // Replace with your API key

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: inputText,
            max_tokens: 150,
        }),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
        return data.choices[0].text.trim();
    } else {
        throw new Error("Failed to get a response from ChatGPT.");
    }
}

async function sendMessage() {
    const inputField = document.getElementById("userInput");
    const responseDiv = document.getElementById("response");
    
    try {
        const response = await fetchChatGPTResponse(inputField.value);
        responseDiv.textContent = response;
   } catch (error) {
    console.error("Error:", error);
    console.log(JSON.stringify(error, null, 2));  // log the error in stringified format
    responseDiv.textContent = "Failed to get a response.";
}

}
console.log("hello")