export default function splitLevel(itemLevel: number | null | undefined) {
    if (itemLevel === undefined || itemLevel === null) {
      return { level: null, percent: null };
    }
  
    let [levelPart, percentPart = '0'] = String(itemLevel).split('.');
    if (percentPart.length === 1 && percentPart !== '0') {
      percentPart += '0';
    }
    
    const level = parseInt(levelPart);
    const percent = parseInt(percentPart);
  
    return { level, percent };
  }