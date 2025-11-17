
import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Edits an image using a text prompt with the Gemini API.
 * @param base64ImageData The base64-encoded image data, without the data URL prefix.
 * @param mimeType The MIME type of the image (e.g., 'image/jpeg').
 * @param prompt The text prompt describing the desired edit.
 * @returns A promise that resolves to the base64-encoded string of the edited PNG image.
 */
export const editImage = async (
    base64ImageData: string,
    mimeType: string,
    prompt: string
): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        // Find the image part in the response
        const editedImagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

        if (editedImagePart?.inlineData?.data) {
            return editedImagePart.inlineData.data;
        } else {
            // Check for safety ratings or other reasons for no image
            const safetyRatings = response.candidates?.[0]?.safetyRatings;
            if(safetyRatings?.some(rating => rating.probability !== 'NEGLIGIBLE')) {
                throw new Error("Image generation was blocked due to safety policies. Please try a different prompt.");
            }
            throw new Error("No image data was returned from the API. The prompt may have been too complex or unclear.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to communicate with the AI model. Please check your connection and API key.");
    }
};
