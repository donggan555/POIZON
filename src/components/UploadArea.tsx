import { UploadCloud } from "lucide-react";
import React, { useRef } from "react";

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export function UploadArea({ onFileSelect, isLoading }: UploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    if (!isLoading) {
      fileInputRef.current?.click();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isLoading) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isLoading) return;
    
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp")) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full aspect-square max-h-[300px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center transition-colors ${
        isLoading
          ? "border-slate-300 bg-slate-50 cursor-not-allowed opacity-70"
          : isDragging 
          ? "border-indigo-500 bg-indigo-100 cursor-pointer" 
          : "border-indigo-300 hover:border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 cursor-pointer group"
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg, image/png, image/webp"
        className="hidden"
      />
      <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform text-indigo-500">
        <UploadCloud className="w-8 h-8" />
      </div>
      <h3 className="font-semibold text-slate-800 mb-1 text-lg">
        上传商品图片
      </h3>
      <p className="text-sm text-slate-500 max-w-[200px]">
        支持 JPG, PNG, WEBP 格式，推荐高清无背景实拍图
      </p>
    </div>
  );
}