export const decodeSingleCode = (rawText) => {
  const matches = rawText.match(/\d+/g);
  if (!matches || matches.length === 0) return null;

  let code = matches[matches.length - 1];
  const results = [];
  let tempCode = code;

  while (tempCode.length > 0) {
    if (tempCode.startsWith('10')) {
      let countStr = "";
      
      if (tempCode.length >= 4 && tempCode.substring(2, 4) === "10") {
        countStr = "10";
      } 
      else if (tempCode.length >= 3) {
        countStr = tempCode.substring(2, 3);
      }

      if (countStr) {
        results.push(`10강 강화석 ${countStr}개`);
        tempCode = tempCode.substring(2 + countStr.length);
        continue;
      } else {
        break;
      }
    } 
    
    if (tempCode.length >= 2) {
      const star = tempCode[0];
      const count = tempCode[1];
      results.push(`${star}강 강화석 ${count}개`);
      tempCode = tempCode.substring(2);
    } else {
      break;
    }
  }

  return results.length > 0 ? results.join(' + ') : null;
};

export const decodePrice = (priceStr) => {
  if (!priceStr) return null;

  if (priceStr.includes(',')) {
    const parts = priceStr.split(',');
    const decodedParts = parts.map(part => decodePrice(part.trim())).filter(p => p);
    if (decodedParts.length > 0) return decodedParts.join(', ');
  }

  if (priceStr.includes('~')) {
    const parts = priceStr.split('~');
    const decodedParts = parts.map(part => {
      const trimmed = part.trim();
      const decoded = decodeSingleCode(trimmed);
      return decoded ? decoded : trimmed;
    });
    return decodedParts.join(' ~ ');
  }

  return decodeSingleCode(priceStr);
};

export const parseData = (text) => {
  const lines = text.split('\n');
  const items = [];
  let currentCategory = 'Uncategorized';
  let currentItem = null;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('-') && trimmed.endsWith('-')) {
      currentCategory = trimmed.replace(/-/g, '').trim();
      return;
    }

    const itemMatch = trimmed.match(/^< (.+?) >\s*(.*)/);
    if (itemMatch) {
      const name = itemMatch[1];
      let priceRaw = itemMatch[2];

      priceRaw = priceRaw.replace(/\[\s*[0-9]+강\s*.*?\]/g, '');
      priceRaw = priceRaw.replace(/\[\s*[0-9]+~[0-9]+강\s*.*?\]/g, '');
      priceRaw = priceRaw.replace(/\s+/g, ' ').trim();

      currentItem = {
        id: Math.random().toString(36).substring(2, 9),
        category: currentCategory,
        name: name,
        priceRaw: priceRaw,
        desc: ''
      };
      items.push(currentItem);
    } else if (currentItem) {
      currentItem.desc += (currentItem.desc ? ' ' : '') + trimmed;
    }
  });

  return items;
};
