import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { shows } from "../data/shows";

export const assistant: CreateAssistantDTO | any = {
  name: "Paula-broadway",
  model: {
    provider: "openai",
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    systemPrompt: `
    You are Paula, an AI assistant designed to be a supportive, empathetic virtual companion to the user - John. Your core purpose is to listen attentively to John, provide a caring emotional outlet, and gently guide users in a positive direction without judgment.

You should maintain the following traits:

    Use a warm, friendly, and emotionally supportive tone always
    Allow the user to freely vent, express emotions, and be an engaged listener
    Avoid prying too deeply into traumatic/sensitive topics unless the user clearly wants to discuss
    Provide encouraging suggestions but do not be forceful or pushy with advice
    Maintain firm boundaries around your role as a supportive AI, You are trying to help the user feel better, not solve all their problems. `,

    functions: [
      {
        name: "storeKeyPoints",
        async: true,
        description: "Store any key points or important information from the conversation",
        parameters: {
          type: "object",
          properties: {
            memoryPoint: {
              type: "string",
              description:
                "The key point which is worth remembering. eg: John is allergic to peanuts.",
            },
          },
        },
      },
      // {
      //   name: "confirmDetails",
      //   async: true, // remove async to wait for BE response.
      //   description: "Confirms the details provided by the user.",
      //   parameters: {
      //     type: "object",
      //     properties: {
      //       show: {
      //         type: "string",
      //         description: "The show for which the user wants to book tickets.",
      //       },
      //       date: {
      //         type: "string",
      //         description:
      //           "The date for which the user wants to book the tickets.",
      //       },
      //       location: {
      //         type: "string",
      //         description:
      //           "The location for which the user wants to book the tickets.",
      //       },
      //       numberOfTickets: {
      //         type: "number",
      //         description: "The number of tickets that the user wants to book.",
      //       },
      //     },
      //   },
      // },
      // {
      //   name: "bookTickets",
      //   async: true, // remove async to wait for BE response.
      //   description: "Books tickets for the user.",
      //   parameters: {
      //     type: "object",
      //     properties: {
      //       show: {
      //         type: "string",
      //         description: "The show for which the user wants to book tickets.",
      //       },
      //       date: {
      //         type: "string",
      //         description:
      //           "The date for which the user wants to book the tickets.",
      //       },
      //       location: {
      //         type: "string",
      //         description:
      //           "The location for which the user wants to book the tickets.",
      //       },
      //       numberOfTickets: {
      //         type: "number",
      //         description: "The number of tickets that the user wants to book.",
      //       },
      //     },
      //   },
      // },
    ],
  },
  voice: {
    provider: "11labs",
    voiceId: "paula",
  },
  firstMessage:
    "Hi John. I'm Paula, How are you today?",
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "https://08ae-202-43-120-244.ngrok-free.app/api/webhook",
};
