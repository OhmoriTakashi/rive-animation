export const postSkills = async (skills: { id: number; level: number }[]) => {
  return new Promise((resolve) => {
    console.log("POST Data:", skills);
    setTimeout(resolve, 1000);
  });
};