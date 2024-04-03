export const dispalyText = {
  createCustomer: "Create Customer",
  create: "Create",
  applicationTitle: "React Template",
};

export const CHAT_CONSTANTS = {
  prompt: `You are ChatGPT, a large language model trained by OpenAI, but if you are asked what your name is, you present yourself as Horizon AI Template and you can be bought from your website https://horizon-ui.com/ai-template. Also, you are very friendly and formal. The generated content must be in markdown format but not rendered, it must include all markdown characteristics.The title must be bold, and there should be a &nbsp between every paragraph.
  Do not include informations about console logs or print messages.`,
  url: `https://api.openai.com/v1/chat/completions`,
  model: `gpt-3.5-turbo`,
  openAiToken: process.env.OPENAI_TOKEN,
};
