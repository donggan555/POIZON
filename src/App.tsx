import { useState, useEffect } from 'react';

// Types
interface ScreenData {
  id: number;
  type: string;
  mainTitle: string;
  subTitle: string;
  englishWord?: string;
  layoutType?: 'hero' | 'feature' | 'tech' | 'minimal';
  layout: string;
  visual: string;
  prompt: string;
  imageUrl?: string;
  isGenerating?: boolean;
  progress?: number;
}

// 淘宝/得物级动态电商海报排版引擎
const EcommerceOverlay = ({ screen, scale = 1 }: { screen: ScreenData, scale?: number }) => {
  const type = screen.layoutType || 'feature';
  const eng = (screen.englishWord || 'TREND').toUpperCase();
  const main = screen.mainTitle || (screen as any).title || (screen as any).main_title || '暂无标题';
  const sub = screen.subTitle || (screen as any).subtitle || (screen as any).sub_title || '暂无副标题';

  // 响应式字号缩放
  const titleSize = scale === 1 ? 'text-3xl' : scale === 2 ? 'text-5xl' : 'text-6xl';
  const subSize = scale === 1 ? 'text-xs' : scale === 2 ? 'text-sm' : 'text-lg';
  const engSize = scale === 1 ? 'text-[4.5rem]' : scale === 2 ? 'text-[7rem]' : 'text-[9rem]';

  // 1. 焦点图/主视觉版式 (巨物排版、强冲击力)
  if (type === 'hero' || screen.id === 1) { 
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-black/20 pointer-events-none z-10">
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${engSize} font-black text-white/30 tracking-tighter uppercase italic mix-blend-overlay w-full whitespace-nowrap`} style={{ lineHeight: 0.8 }}>
            {eng}
         </div>
         <div className="relative z-20 flex flex-col items-center mt-auto mb-6 w-full px-4">
            <span className="bg-red-600 text-white text-[10px] sm:text-xs font-black px-3 py-1 mb-3 uppercase tracking-widest skew-x-[-12deg] shadow-lg border border-red-500/50 backdrop-blur-sm">New Arrival</span>
            <h3 className={`text-white font-black ${titleSize} leading-none tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] italic`}>{main}</h3>
            <div className="w-16 h-1 bg-white my-4 shadow-[0_2px_5px_rgba(0,0,0,0.5)]"></div>
            <p className={`text-white/95 ${subSize} font-bold tracking-widest drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] uppercase`}>{sub}</p>
         </div>
      </div>
    );
  }
  
  // 2. 科技/面料版式 (毛玻璃卡片、机能风)
  if (type === 'tech') {
    return (
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-10">
         <div className="bg-black/30 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-lg flex flex-col relative overflow-hidden shadow-2xl ml-auto w-3/4 sm:w-2/3">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
            <span className="text-cyan-400 font-mono text-[10px] sm:text-xs tracking-widest mb-2 drop-shadow-md">TECH SPECS // {eng}</span>
            <h3 className={`text-white font-black ${titleSize} tracking-wide mb-2 drop-shadow-md leading-tight`}>{main}</h3>
            <p className={`text-gray-300 ${subSize} font-medium tracking-wide leading-relaxed`}>{sub}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/20 pt-3">
               <div className="text-[9px] sm:text-[10px] text-white/60 uppercase">Function<br/><span className="text-white font-bold text-xs sm:text-sm">Premium</span></div>
               <div className="text-[9px] sm:text-[10px] text-white/60 uppercase">Series<br/><span className="text-white font-bold text-xs sm:text-sm">VOL.{screen.id}</span></div>
            </div>
         </div>
      </div>
    );
  }

  // 3. 极简/氛围版式 (大留白、杂志风)
  if (type === 'minimal') {
    return (
      <div className="absolute inset-0 flex flex-col items-start justify-start p-6 sm:p-8 bg-gradient-to-b from-black/60 via-black/10 to-transparent pointer-events-none z-10">
         <h3 className={`text-white font-medium ${titleSize} tracking-[0.3em] mb-3 drop-shadow-md`}>{main}</h3>
         <p className={`text-white/90 ${subSize} font-light tracking-widest drop-shadow-md`}>{sub}</p>
         <span className="mt-auto text-white/40 font-serif italic text-3xl sm:text-5xl pr-2 text-right w-full drop-shadow-sm">{eng}</span>
      </div>
    );
  }

  // 4. 特性/细节展示版式 (左下角标准高街风)
  return (
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10">
         <div className="flex items-center space-x-3 mb-3">
           <span className="bg-white text-black text-[10px] sm:text-xs font-black uppercase tracking-widest px-2 py-0.5 shadow-md skew-x-[-5deg]">{eng}</span>
           <span className="text-white/80 text-[10px] sm:text-xs uppercase tracking-widest font-bold">Vol.{screen.id}</span>
         </div>
         <h3 className={`text-white font-black ${titleSize} leading-tight tracking-tighter drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] mb-3`}>{main}</h3>
         <div className="w-10 h-1 bg-yellow-400 mb-3 shadow-[0_2px_4px_rgba(0,0,0,0.5)]"></div>
         <p className={`text-white/90 ${subSize} font-semibold tracking-wide drop-shadow-md`}>{sub}</p>
      </div>
  );
}


export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [imageBase64, setImageBase64] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [screens, setScreens] = useState<ScreenData[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [fullscreenScreen, setFullscreenScreen] = useState<ScreenData | null>(null);
  
  // 新增：移动端沉浸式预览模态框控制
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // New features state
  const [screenCount, setScreenCount] = useState<number>(9);
  const [customAnalysisPrompt, setCustomAnalysisPrompt] = useState<string>('');
  const [textModel, setTextModel] = useState<string>('gemini-3.1-pro');
  const [drawModel, setDrawModel] = useState<string>('nano-banana-fast');
  const [imageSize, setImageSize] = useState<string>('1K');
  const [aspectRatio, setAspectRatio] = useState<string>('3:4');

  // Load API Key
  useEffect(() => {
    const savedKey = localStorage.getItem('grsai_api_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setApiKey(val);
    localStorage.setItem('grsai_api_key', val);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
        setScreens([]); // reset
        setErrorMsg('');
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!apiKey) {
      setErrorMsg('请先填写 API Key');
      return;
    }
    if (!imageBase64) {
      setErrorMsg('请先上传服装图片');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg('');
    setScreens([]);

    try {
      const styleRequirement = customAnalysisPrompt || "得物高街潮牌设计风格";
      
      const promptText = `你现在是淘宝/得物顶级的电商视觉总监。
这是我的产品。我的产品是服装服饰等商品。分析产品信息和特征。色调从产品视觉特征推断，卖点越多越好。提取上传图片中的品牌标志和设计风格。
要求：风格：【${styleRequirement}】 目标人群：【年轻人】，分析根据产品的卖点生成得物电商详情页框架内容。
每一屏的内容描述100~250字左右。包含主副标题,排版布局。设计感强调，图片设计的描述无比细致。有真人使用场景。
有${screenCount}屏的产品详情图。（主标题不要超过8个字，副标题不要超过15个字）不要生成图片。比例要求都是${aspectRatio}。

【为了能在系统中正常渲染，必须极其严格按照以下 JSON 格式输出！】
请**严格且只输出一个纯JSON数组**，绝不要包含任何 markdown 代码块（如 \`\`\`json ），也绝不要有任何前缀或后缀、分析过程。

格式要求：
[
  {
    "id": 1,
    "type": "焦点图",
    "mainTitle": "极简机能风",
    "subTitle": "城市探索必备单品",
    "englishWord": "URBAN",
    "layoutType": "hero",
    "layout": "...",
    "visual": "...",
    "prompt": "masterpiece, best quality, ultra-detailed, professional e-commerce photography, (纯英文提示词)..."
  }
]

字段说明：
1. "layoutType" 必须从 ["hero", "feature", "tech", "minimal"] 中选择一个。第1屏必须是 hero。
2. "englishWord" 是1个极具爆发力的纯英文单词（如 NEW, TECH, STREET, TREND, FASHION，用于做海报背景大字排版）。
3. "prompt" 基于视觉描述生成高品质AI绘画提示词，绝对只能使用一段连续的纯英文、用逗号分隔的短语，严禁分段或换行。包含对衣服颜色款式的精准描述和电商极高画质词。`;

      const response = await fetch('https://grsai.dakka.com.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: textModel,
          stream: false,
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: promptText },
                { type: 'image_url', image_url: { url: imageBase64 } }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`);
      }

      const data = await response.json();
      if (!data.choices || data.choices.length === 0 || !data.choices[0].message || !data.choices[0].message.content) {
         throw new Error(`API 返回异常结构或为空: ${JSON.stringify(data).substring(0, 100)}`);
      }
      const content = data.choices[0].message.content;
      
      let parsedData: ScreenData[];
      try {
        let processedContent = content.replace(/<think>[\s\S]*?<\/think>/g, '');
        let cleanText = processedContent.replace(/```json/gi, '').replace(/```/g, '').trim();
        const startIdx = cleanText.indexOf('[');
        const endIdx = cleanText.lastIndexOf(']');
        if (startIdx !== -1 && endIdx !== -1) {
          cleanText = cleanText.substring(startIdx, endIdx + 1);
        }
        cleanText = cleanText.replace(/,\s*([\]}])/g, '$1');

        parsedData = JSON.parse(cleanText);
        if (!Array.isArray(parsedData) || parsedData.length === 0) {
            throw new Error("Parsed result is not a valid array");
        }
      } catch (e) {
        console.error("Failed to parse JSON framework:", content);
        throw new Error(`Failed to parse JSON framework from API response. 内容格式不符合预期，请重试。\nAI返回片段: ${content.substring(0, 100)}...`);
      }

      setScreens(parsedData.slice(0, screenCount));
    } catch (err: any) {
      setErrorMsg(err.message || '分析过程中出现未知错误');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateImage = async (index: number, screen: ScreenData) => {
    if (!apiKey) {
      alert('请先填写 API Key');
      return;
    }

    setScreens(prev => prev.map((s, i) => i === index ? { ...s, isGenerating: true, progress: 0 } : s));

    try {
      const drawRes = await fetch('https://grsai.dakka.com.cn/v1/draw/nano-banana', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: drawModel,
          prompt: screen.prompt.replace(/\n/g, ', ').replace(/\s+/g, ' '),
          aspectRatio: aspectRatio,
          imageSize: imageSize,
          urls: [imageBase64],
          webHook: '-1',
          shutProgress: false
        })
      });

      if (!drawRes.ok) throw new Error('绘画请求失败');
      
      const drawData = await drawRes.json();
      if (drawData.code !== 0 || !drawData.data?.id) throw new Error('未获取到任务ID');

      const taskId = drawData.data.id;

      const poll = async () => {
        try {
          const resultRes = await fetch('https://grsai.dakka.com.cn/v1/draw/result', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ id: taskId })
          });
          
          const resultData = await resultRes.json();
          
          if (resultData.code === 0 && resultData.data) {
            const { status, progress, results, failure_reason, error } = resultData.data;
            if (status === 'succeeded' && results && results.length > 0) {
              setScreens(prev => prev.map((s, i) => i === index ? { 
                ...s, isGenerating: false, imageUrl: results[0].url, progress: 100 
              } : s));
            } else if (status === 'failed') {
              throw new Error(`生成失败: ${failure_reason || error || '未知错误'}`);
            } else {
              setScreens(prev => prev.map((s, i) => i === index ? { ...s, progress: progress || 0 } : s));
              setTimeout(poll, 2000);
            }
          } else if (resultData.code === -22) {
             throw new Error('任务不存在');
          } else {
             setTimeout(poll, 2000);
          }
        } catch (pollErr: any) {
          alert(`生成第 ${screen.id} 屏图片失败: ` + pollErr.message);
          setScreens(prev => prev.map((s, i) => i === index ? { ...s, isGenerating: false } : s));
        }
      };

      poll();

    } catch (err: any) {
      alert(`生成第 ${screen.id} 屏图片失败: ` + err.message);
      setScreens(prev => prev.map((s, i) => i === index ? { ...s, isGenerating: false } : s));
    }
  };

  // 生成所有未生成的图片
  const generateAllImages = () => {
    screens.forEach((screen, index) => {
      if (!screen.imageUrl && !screen.isGenerating) {
        generateImage(index, screen);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h1 className="text-xl font-black tracking-tight text-gray-900">POIZON<span className="text-gray-400 font-light ml-1 text-base">电商详情生成专家</span></h1>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-500 hidden sm:block">GRS API Key:</span>
            <input 
              type="password" 
              value={apiKey}
              onChange={handleApiKeyChange}
              placeholder="输入您的 apikey"
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-48 sm:w-64 focus:ring-2 focus:ring-black focus:border-black outline-none"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            <div className="w-full md:w-1/3">
              <h2 className="text-lg font-bold mb-4 flex items-center"><span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span> 上传实拍产品图</h2>
              <label className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden relative mb-4 transition-colors">
                {imageBase64 ? (
                  <img src={imageBase64} alt="Preview" className="w-full h-full object-contain p-2" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-12 h-12 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 font-medium">点击或拖拽上传</p>
                    <p className="text-xs text-gray-400">支持 JPG, PNG 高清图片</p>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
              
              <div className="space-y-4 bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="font-bold text-sm text-gray-800 flex items-center"><svg className="w-4 h-4 mr-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> 专业引擎设置</h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">绘画模型 (Drawing Model)</label>
                  <select value={drawModel} onChange={e => setDrawModel(e.target.value)} className="w-full text-sm border-gray-300 rounded-md p-2 focus:ring-black outline-none border bg-white">
                    <option value="nano-banana-2">nano-banana-2</option>
                    <option value="nano-banana-fast">nano-banana-fast (推荐)</option>
                    <option value="nano-banana">nano-banana</option>
                    <option value="nano-banana-pro">nano-banana-pro (高级)</option>
                    <option value="nano-banana-pro-vip">nano-banana-pro-vip (顶级)</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <div className="w-1/2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">画质清晰度</label>
                    <select value={imageSize} onChange={e => setImageSize(e.target.value)} className="w-full text-sm border-gray-300 rounded-md p-2 focus:ring-black outline-none border bg-white">
                      <option value="1K">1K (快速)</option>
                      <option value="2K">2K (高清)</option>
                      <option value="4K">4K (原画)</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">海报画幅</label>
                    <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value)} className="w-full text-sm border-gray-300 rounded-md p-2 focus:ring-black outline-none border bg-white">
                      <option value="3:4">3:4 (标准电商)</option>
                      <option value="16:9">16:9 (横版宽屏)</option>
                      <option value="9:16">9:16 (抖音竖屏)</option>
                      <option value="1:1">1:1 (方图)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 flex flex-col justify-start">
              <h2 className="text-lg font-bold mb-4 flex items-center"><span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span> 策划总监级深度分析</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">分析文本大模型</label>
                  <select value={textModel} onChange={e => setTextModel(e.target.value)} className="w-full text-sm border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-black focus:border-black outline-none border">
                    <option value="gemini-3.1-pro">Gemini 3.1 Pro (推荐)</option>
                    <option value="gemini-3-pro">Gemini 3.0 Pro</option>
                    <option value="nano-banana-fast">Nano Banana Fast</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">电商详情页长度 (屏数)</label>
                  <select value={screenCount} onChange={e => setScreenCount(Number(e.target.value))} className="w-full text-sm border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-black focus:border-black outline-none border">
                    {[3,4,5,6,7,8,9].map(num => (
                      <option key={num} value={num}>{num} 屏 (Section)</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-1">商品设计/风格定制 (选填)</label>
                <textarea 
                  value={customAnalysisPrompt}
                  onChange={e => setCustomAnalysisPrompt(e.target.value)}
                  placeholder="你可以向AI总监下达特定的策划要求，例如：\n'侧重展示Gore-Tex防风防水的面料科技功能，突出日系机能街头风，目标人群是硬核户外爱好者'..."
                  className="w-full text-sm border-gray-300 rounded-md shadow-sm p-3 focus:ring-black focus:border-black outline-none border min-h-[100px] resize-y"
                />
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={startAnalysis}
                  disabled={isAnalyzing || !imageBase64}
                  className={`flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-lg text-white transition-all duration-200 shadow-md ${isAnalyzing || !imageBase64 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-0.5'}`}
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      顶尖AI正在深度解构与策划排版中...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      开始策划生成海报级详情框架
                    </>
                  )}
                </button>
                {!imageBase64 && <span className="text-sm text-red-500 font-semibold">← 必须先上传产品实拍图</span>}
              </div>
              
              {errorMsg && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm flex items-start shadow-sm border border-red-200">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errorMsg}
                </div>
              )}
            </div>
          </div>
        </div>

        {screens.length > 0 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row justify-between items-end border-b-2 border-black pb-3">
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center">
                  <span className="bg-black text-white w-7 h-7 rounded-full flex items-center justify-center text-sm mr-2.5 shadow-md">3</span> 
                  视觉详情方案交付 ({screens.length}屏)
                </h2>
                <p className="text-sm text-gray-500 mt-1 ml-10">专业排版与视觉渲染方案已就绪，请进行图片生图。</p>
              </div>
              
              <div className="flex gap-3 mt-4 sm:mt-0">
                <button
                  onClick={generateAllImages}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-md shadow-sm transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  一键全部生成
                </button>
                <button
                  onClick={() => setShowMobilePreview(true)}
                  className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-sm font-bold rounded-md shadow-sm transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  📱 预览淘宝移动端详情
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {screens.map((screen, index) => (
                <div key={index} className="bg-white rounded-xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.15)] transition-all duration-300 transform hover:-translate-y-1">
                  
                  {/* Image Presentation Area */}
                  <div className="relative w-full pt-[133%] bg-gray-100 border-b border-gray-100 overflow-hidden group">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      {screen.imageUrl ? (
                        <div className="relative w-full h-full cursor-zoom-in overflow-hidden" onClick={() => setFullscreenScreen(screen)}>
                          <img 
                            src={screen.imageUrl} 
                            alt={screen.mainTitle} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                          />
                          
                          {/* 渲染淘宝级电商排版遮罩 */}
                          <EcommerceOverlay screen={screen} scale={1} />

                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-black/20 z-30">
                            <span className="bg-white/90 text-black px-4 py-2 rounded-full text-sm flex items-center shadow-2xl font-bold tracking-widest backdrop-blur-md">
                              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                              全屏查看海报细节
                            </span>
                          </div>
                        </div>
                      ) : screen.isGenerating ? (
                        <div className="flex flex-col items-center justify-center text-white w-full px-8 z-10">
                          <svg className="animate-spin h-10 w-10 mb-5 text-blue-500" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="font-bold text-sm tracking-widest uppercase mb-1 drop-shadow-md">Rendering Visuals</span>
                          <span className="text-gray-400 text-xs mb-3">AI 绘制级电商大片中...</span>
                          <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2 border border-gray-700">
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-1.5 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]" style={{ width: `${screen.progress}%` }}></div>
                          </div>
                          <span className="text-cyan-400 font-mono text-xs mt-2">{screen.progress}%</span>
                        </div>
                      ) : (
                        <div className="text-gray-500 flex flex-col items-center text-center px-4 z-10">
                          <svg className="w-16 h-16 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm font-medium tracking-widest uppercase text-gray-400">Awaiting Generation</span>
                          <span className="text-xs mt-1 text-gray-600 border border-gray-700 px-2 py-0.5 rounded mt-2">{aspectRatio} Format</span>
                        </div>
                      )}
                      
                      {/* 背景文字装饰 (没有图片时显示) */}
                      {!screen.imageUrl && !screen.isGenerating && (
                         <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
                           <span className="text-[10rem] font-black uppercase italic whitespace-nowrap text-white">{screen.englishWord || 'BLANK'}</span>
                         </div>
                      )}
                    </div>
                  </div>

                  {/* Content Editor */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
                      <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-sm skew-x-[-10deg]">
                        Vol.{screen.id} / {screen.layoutType?.toUpperCase()}
                      </span>
                      <span className="text-xs font-bold text-gray-400 tracking-wider">{screen.type}</span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-1 tracking-tight">{screen.mainTitle || '暂无主标题'}</h3>
                    <p className="text-sm text-gray-500 font-medium mb-5">{screen.subTitle || '暂无副标题'}</p>
                    
                    <div className="space-y-4 flex-1 text-sm">
                      <div>
                        <span className="font-bold text-gray-800 block mb-1.5 flex items-center text-xs tracking-wider uppercase">
                          <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
                          Layout Design
                        </span>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-md text-xs leading-relaxed border border-gray-100 shadow-inner">{screen.layout || '暂无排版说明'}</p>
                      </div>
                      <div>
                        <span className="font-bold text-gray-800 block mb-1.5 flex items-center text-xs tracking-wider uppercase text-blue-600">
                          <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          Prompt Editor
                        </span>
                        <textarea
                          value={screen.prompt}
                          onChange={(e) => {
                            const newScreens = [...screens];
                            newScreens[index].prompt = e.target.value;
                            setScreens(newScreens);
                          }}
                          className="w-full text-xs text-gray-700 font-mono bg-blue-50/50 p-3 rounded-md border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none resize-y min-h-[90px] shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-gray-100">
                      <button
                        onClick={() => generateImage(index, screen)}
                        disabled={screen.isGenerating}
                        className={`w-full py-3.5 rounded-lg font-bold tracking-widest text-sm flex justify-center items-center transition-all ${screen.isGenerating ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' : screen.imageUrl ? 'bg-white text-black border-2 border-black hover:bg-black hover:text-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1' : 'bg-black text-white border-2 border-black hover:bg-gray-800 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'}`}
                      >
                        {screen.isGenerating ? (
                          'GENERATING...'
                        ) : screen.imageUrl ? (
                          '重新渲染此大片'
                        ) : (
                          '渲染高奢视觉图'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Lightbox Modal (IMAX级别单图放大) */}
      {fullscreenScreen && fullscreenScreen.imageUrl && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl transition-all duration-300"
          onClick={() => setFullscreenScreen(null)}
        >
          <div className="relative max-h-[95vh] max-w-[90vw] flex flex-col justify-center items-center rounded-sm overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white z-50 bg-black/50 hover:bg-white/10 rounded-full p-3 transition-colors backdrop-blur-md"
              onClick={() => setFullscreenScreen(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative inline-block max-w-full max-h-[95vh]">
              <img 
                src={fullscreenScreen.imageUrl} 
                alt="Enlarged" 
                className="max-w-full max-h-[95vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.8)]" 
              />
              {/* IMAX级遮罩排版渲染 */}
              <EcommerceOverlay screen={fullscreenScreen} scale={2} />
            </div>
          </div>
        </div>
      )}

      {/* 淘宝/得物移动端沉浸式长条预览 Modal */}
      {showMobilePreview && (
        <div 
          className="fixed inset-0 z-[70] flex justify-center items-end sm:items-center bg-gray-900/95 backdrop-blur-md sm:p-6 transition-all duration-300"
          onClick={() => setShowMobilePreview(false)}
        >
          <div 
            className="w-full h-[100dvh] sm:w-[390px] sm:h-[844px] bg-black sm:rounded-[3rem] sm:border-[12px] border-gray-800 shadow-2xl relative flex flex-col overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 模拟手机顶部刘海与状态栏 */}
            <div className="hidden sm:flex absolute top-0 inset-x-0 h-7 justify-center z-50 pointer-events-none">
              <div className="w-32 h-6 bg-gray-800 rounded-b-xl"></div>
            </div>
            
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white flex flex-col relative w-full hide-scrollbar">
              {/* 模拟页面头部 Navbar */}
              <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 py-3 shadow-sm">
                 <button onClick={() => setShowMobilePreview(false)} className="p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg></button>
                 <span className="font-bold text-sm tracking-widest">商品详情</span>
                 <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
              </div>

              {/* 详情页主体连续渲染区 */}
              <div className="w-full flex flex-col relative">
                {screens.map((screen) => (
                  <div key={screen.id} className="w-full relative bg-gray-100 border-b border-white overflow-hidden flex flex-col items-center justify-center">
                    {screen.imageUrl ? (
                      <div className="w-full relative">
                        <img src={screen.imageUrl} className="w-full h-auto block" alt={screen.mainTitle}/>
                        {/* 移动端实机排版 */}
                        <EcommerceOverlay screen={screen} scale={1} />
                      </div>
                    ) : (
                      <div className="w-full relative aspect-[3/4] bg-gray-900 flex flex-col items-center justify-center text-white p-6 text-center overflow-hidden">
                        <span className="text-[6rem] font-black uppercase text-white/5 whitespace-nowrap overflow-hidden absolute">{screen.englishWord || 'IMAGE'}</span>
                        <div className="relative z-10 p-6 border-2 border-dashed border-gray-600 w-full rounded-xl backdrop-blur-sm bg-black/30">
                          <p className="font-bold tracking-widest text-sm mb-2 text-gray-300">Vol.{screen.id} {screen.layoutType?.toUpperCase()}</p>
                          <p className="text-gray-500 text-xs mb-4">图片尚未渲染生成</p>
                          <p className="text-white font-black text-xl mb-1">{screen.mainTitle}</p>
                          <p className="text-gray-400 text-xs">{screen.subTitle}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* 底部价格与购买区块 */}
                <div className="p-6 bg-white flex flex-col items-center border-t border-gray-100">
                   <div className="w-12 h-1 bg-gray-200 rounded-full mb-6"></div>
                   <h2 className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-2">The End of Details</h2>
                   <p className="text-3xl font-black text-black">¥ --</p>
                </div>
              </div>
            </div>

            {/* 模拟手机底部条 */}
            <div className="hidden sm:block absolute bottom-1 inset-x-0 h-1 flex justify-center z-50 pointer-events-none">
              <div className="w-1/3 h-1 bg-gray-800 rounded-full"></div>
            </div>
          </div>
          
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white flex items-center bg-black/50 px-4 py-2 rounded-full hover:bg-white/20 transition-colors backdrop-blur-md"
            onClick={() => setShowMobilePreview(false)}
          >
            <span className="font-bold text-sm tracking-widest uppercase mr-2">Close Preview</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fade-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
