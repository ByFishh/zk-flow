const LAST_ACTIVITY_GREEN = 5;
const LAST_ACTIVITY_ORANGE = 20;

export const useProtocols = () => {
  const getLastActivityColor = (lastActivity: number): string => {
    if (lastActivity < LAST_ACTIVITY_GREEN) return '#20EC72';
    if (lastActivity < LAST_ACTIVITY_ORANGE) return '#CCB256';
    return '#FF7171';
  };

  return { getLastActivityColor };
};
