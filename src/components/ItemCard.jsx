
import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { decodePrice } from '../utils.js'; // 계산기 가져오기

const ItemCard = ({ item }) => {
  const priceBlocks = (item.priceRaw.match(/\[(.*?)\]/g) || [item.priceRaw])
    .filter(block => block.replace(/[\[\]\s]/g, '').length > 0);

  const formattedDesc = item.desc
    ? item.desc.replace(/ 우클릭:/g, '\n우클릭:').replace(/ 좌클릭:/g, '\n좌클릭:')
    : '';

  const renderDescription = (text) => {
    if (!text) return "";
    
    let parts = text.split(/(\*시세 변동이 심한 아이템입니다\.)/g);
    let result = parts.map((part, i) => 
      part === "*시세 변동이 심한 아이템입니다." ? 
      <span key={`v-${i}`} className="effect-volatile">{part}</span> : part
    );

    return result.map((node, i) => {
      if (typeof node === 'string') {
        const subParts = node.split(/(\*거래량이 적은 아이템입니다\.)/g);
        return subParts.map((subPart, j) => 
          subPart === "*거래량이 적은 아이템입니다." ? 
          <span key={`l-${i}-${j}`} className="effect-low-volume">{subPart}</span> : subPart
        );
      }
      return node;
    }).flat();
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500/50 hover:bg-gray-750 transition-all duration-200 shadow-lg group relative overflow-hidden">
      
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <ArrowRight className="text-indigo-400 -rotate-45 transform translate-x-2 group-hover:translate-x-0 transition-transform" />
      </div>

      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
             <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                {item.category}
             </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-100 group-hover:text-indigo-300 transition-colors mb-2 truncate">
            {item.name}
          </h3>
          {formattedDesc && (
            <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap break-words">
              {renderDescription(formattedDesc)}
            </div>
          )}
        </div>

        <div className="w-full md:w-auto md:min-w-[300px] flex flex-col gap-2">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1">
                <Zap size={12} />
                Market Price
            </div>
            
            {priceBlocks.length > 0 ? (
                priceBlocks.map((block, index) => {
                    const cleanBlock = block.replace(/[\[\]]/g, '').trim();
                    const decoded = decodePrice(cleanBlock);

                    return (
                        <div key={index} className="bg-gray-900/80 rounded-lg p-3 border border-gray-700/50 backdrop-blur-sm hover:border-indigo-500/30 transition-colors">
                            <div className="text-green-400 font-sans text-base font-semibold">
                                {cleanBlock}
                            </div>
                            {decoded && (
                                <div className="mt-1 pt-1 border-t border-gray-700/50 text-xs text-blue-300 flex items-start gap-1.5">
                                    <ArrowRight size={12} className="mt-0.5 shrink-0 opacity-70" />
                                    <span className="opacity-90">{decoded}</span>
                                </div>
                            )}
                        </div>
                    );
                })
            ) : (
                <div className="text-gray-500 text-sm italic">가격 정보 없음</div>
            )}
        </div>
      </div>
    </div>
  );
};


export default ItemCard;

