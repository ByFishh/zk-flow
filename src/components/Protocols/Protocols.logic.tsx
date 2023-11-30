export const useProtocols = () => {
  const getLastActivityColor = (lastActivity: number): string => {
    if (lastActivity > Date.now() - 7 * 24 * 60 * 60 * 1000) return '#20EC72';
    if (lastActivity === 0) return '#FF7171';
    return '#CCB256';
  };

  return { getLastActivityColor };
};
