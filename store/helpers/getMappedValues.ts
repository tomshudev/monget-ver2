export function getMappedRequirements<TStore extends Object>(
  requirements?: (keyof TStore)[]
): { [Property in keyof TStore]?: string } {
  let reqKeysObj: { [Property in keyof TStore]?: string } = {};
  if (requirements) {
    reqKeysObj = requirements.reduce((acc, curr) => {
      acc[curr] = "";
      return acc;
    }, {} as { [Property in keyof TStore]?: string });
  }

  return reqKeysObj;
}
