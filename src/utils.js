export const decodePrice = (priceStr) => {
  if (!priceStr) return null;

  if (priceStr.includes(',')) {
    const parts = priceStr.split(',');
    const decodedParts = parts.map(part => {
      const trimmed = part.trim();
      const decoded = decodePrice(trimmed); 
      return decoded ? decoded : null;
    });
    const validParts = decodedParts.filter(p => p);
    if (validParts.length > 0) return validParts.join(', ');
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

export const decodeSingleCode = (rawText) => {
  const matches = rawText.match(/\d+/g);
  if (!matches || matches.length === 0) return null;

  const code = matches[matches.length - 1]; 

  if (code.length === 2) {
    const star = code[0];
    const count = code[1];
    return `${star}강 강화석 ${count}개`;
  }

  if (code.length === 4) {
    const star1 = code[0];
    const count1 = code[1];
    const star2 = code[2];
    const count2 = code[3];
    return `${star1}강 강화석 ${count1}개 + ${star2}강 강화석 ${count2}개`;
  }

  if (code.length === 3 && code.startsWith('10')) {
      return `10강 강화석 ${code[2]}개`;
  }

  if (code.length === 5 && code.startsWith('10')) {
      return `10강 강화석 ${code[2]}개 + ${code[3]}강 강화석 ${code[4]}개`;
  }

  if (code.length === 6 && code.startsWith('10110')) {
      return `10강 강화석 ${code[2]}개 + 10강 강화석 ${code[5]}개`;
  }
  
  if (code.length === 7 && code.startsWith('10')) {
      return `10강 강화석 ${code[2]}개 + ${code[3]}강 강화석 ${code[4]}개 + ${code[5]}강 강화석 ${code[6]}개`;
  }

  return null;
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

      priceRaw = priceRaw.replace(/\[\s*[1-4]강\s*.*?\]/g, '');
      priceRaw = priceRaw.replace(/\[\s*[0-9]+~[0-9]+강\s*.*?\]/g, '');
      priceRaw = priceRaw.replace(/\s+/g, ' ').trim();

      currentItem = {
        id: Math.random().toString(36).substr(2, 9),
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