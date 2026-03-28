export const API_BASE = "https://grsai.dakka.com.cn";

export interface ScreenData {
  id: number;
  screen_name: string;
  main_title: string;
  sub_title: string;
  layout_description: string;
  visual_design: string;
  image_generation_prompt: string;
}

export async function generateFramework(
  apiKey: string,
  imageBase64: string
): Promise<ScreenData[]> {
  const prompt = `你是一个资深的电商视觉设计师和营销专家。请分析我上传的这张服装产品图，并为其策划一个包含9个屏（一屏为手机端完整视口）的电商详情页框架。
请严格以JSON数组格式输出，不要包含任何markdown标记如\`\`\`json，直接输出纯JSON格式，包含9个对象，每个对象具有以下属性：
- id: 1到9的数字
- screen_name: 屏的类型名称（如：焦点主图、核心卖点、细节展示、面料解析、模特穿搭、尺码说明、品牌故事、购物须知、关联推荐）
- main_title: 主标题文字（需具吸引力，突出卖点）
- sub_title: 副标题文字
- layout_description: 排版布局描述（指导设计师如何排版这部分内容）
- visual_design: 视觉设计与特效描述（颜色、氛围、光影等）
- image_generation_prompt: 用于AI绘画工具生成该屏配图的提示词（请用一段详细的英文描述，需包含服装款式特征、场景氛围、光线、视角等，以逗号分隔关键词。确保提示词能够生成高质量的电商配图。不要提及文字排版，只关注图像本身）。`;

  const response = await fetch(`${API_BASE}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gemini-3.1-pro",
      stream: false,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: imageBase64,
              },
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API Request Failed: ${response.status} - ${errorBody}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  try {
    // Attempt to extract JSON if the model still wrapped it in markdown
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : content;
    const parsedData = JSON.parse(jsonString.trim());
    if (!Array.isArray(parsedData) || parsedData.length !== 9) {
      throw new Error("Invalid JSON format or missing screens");
    }
    return parsedData;
  } catch (err) {
    console.error("Raw content:", content);
    throw new Error("Failed to parse JSON framework from API response");
  }
}

export async function generateScreenImage(
  apiKey: string,
  prompt: string,
  referenceImage: string
): Promise<string> {
  // 1. Submit the task
  const submitRes = await fetch(`${API_BASE}/v1/draw/nano-banana`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
      body: JSON.stringify({
      model: "nano-banana-fast",
      prompt: prompt,
      urls: [referenceImage],
      aspectRatio: "3:4", // Using 3:4 for typical mobile product displays
      webHook: "-1",
    }),
  });

  if (!submitRes.ok) {
    throw new Error("Failed to submit image generation task");
  }

  const submitData = await submitRes.json();
  if (submitData.code !== 0) {
    throw new Error(`Draw API Error: ${submitData.msg}`);
  }

  const taskId = submitData.data.id;

  // 2. Poll for results
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const maxAttempts = 30; // 30 * 3s = 90s max

    const poll = async () => {
      try {
        attempts++;
        if (attempts > maxAttempts) {
          throw new Error("Timeout waiting for image generation");
        }

        const res = await fetch(`${API_BASE}/v1/draw/result`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`, // usually required even for result polling
          },
          body: JSON.stringify({ id: taskId }),
        });

        const data = await res.json();
        
        if (data.code === -22) {
            // Task might be initializing, continue polling
            setTimeout(poll, 3000);
            return;
        }

        if (data.code !== 0) {
          throw new Error(data.msg || "Error fetching result");
        }

        const status = data.data.status;
        if (status === "succeeded") {
          resolve(data.data.results[0].url);
        } else if (status === "failed") {
          reject(new Error(data.data.failure_reason || data.data.error || "Generation failed"));
        } else {
          // 'running' or other statuses
          setTimeout(poll, 3000);
        }
      } catch (err) {
        reject(err);
      }
    };

    setTimeout(poll, 3000); // Initial delay
  });
}