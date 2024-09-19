export default function splitLevel(itemLevel: number | null | undefined) {
    if (itemLevel === undefined || itemLevel === null) {
      return { level: null, percent: null };
    }
  
    const [levelPart, percentPart = '0'] = String(itemLevel).split('.');
    
    const level = parseInt(levelPart);
    const percent = parseInt(percentPart);
  
    return { level, percent };
  }