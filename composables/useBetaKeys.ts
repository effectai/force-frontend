export const useBetaKeys = () => {
  const betaKey = useLocalStorage("key", null);

  return { betaKey };
};
