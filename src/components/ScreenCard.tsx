import { useState } from "react";
import { ScreenData } from "../lib/api";
import { Image as ImageIcon, Loader2, Play } from "lucide-react";

interface ScreenCardProps {
  data: ScreenData;
  onGenerateImage: (prompt: string) => Promise<string>;
}

export function ScreenCard({ data, onGenerateImage }: ScreenCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = await onGenerateImage(data.image_generation_prompt);
      setImageUrl(url);
    } catch (err: any) {
      setError(err.message || "Failed to generate image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="p-5 flex-1 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="bg-indigo-100 text-indigo-700 font-bold rounded-lg w-8 h-8 flex items-center justify-center shrink-0">
            {data.id}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{data.screen_name}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm flex-1">
          <div>
            <p className="font-bold text-slate-800 text-base">{data.main_title}</p>
            {data.sub_title && (
              <p className="text-slate-500 mt-1">{data.sub_title}</p>
            )}
          </div>

          <div className="space-y-2">
            <div>
              <span className="font-medium text-slate-700 block mb-1">排版布局:</span>
              <p className="text-slate-600 bg-slate-50 p-2 rounded-md leading-relaxed">
                {data.layout_description}
              </p>
            </div>
            <div>
              <span className="font-medium text-slate-700 block mb-1">视觉设计:</span>
              <p className="text-slate-600 bg-slate-50 p-2 rounded-md leading-relaxed">
                {data.visual_design}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Area */}
      <div className="bg-slate-50 p-4 border-t border-slate-100">
        {imageUrl ? (
          <div className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-[3/4] bg-white">
            <img 
              src={imageUrl} 
              alt={data.screen_name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={handleGenerate}
                className="bg-white/90 text-slate-900 px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-white"
              >
                <Play className="w-4 h-4" /> 重新生成
              </button>
            </div>
          </div>
        ) : (
          <div className="aspect-[3/4] border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-3 bg-white p-4 text-center">
            {isLoading ? (
              <>
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                <p className="text-sm text-slate-500 font-medium animate-pulse">
                  正在绘制中...<br/>这可能需要大约20秒
                </p>
              </>
            ) : (
              <>
                <div className="bg-indigo-50 p-3 rounded-full text-indigo-500">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <p className="text-xs text-slate-500">
                  {error ? (
                     <span className="text-red-500 line-clamp-2">{error}</span>
                  ) : (
                    "点击生成此屏专属电商配图"
                  )}
                </p>
                <button
                  onClick={handleGenerate}
                  className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Play className="w-4 h-4" /> 生成配图
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}