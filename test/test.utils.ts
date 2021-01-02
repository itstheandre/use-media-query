export const isMax = (query: string) => query.split(/\(\-/)[1] === 'max';
export const isMin = (query: string) => query.split(/\(\-/)[1] === 'min';
