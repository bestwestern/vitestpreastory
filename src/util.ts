function add(...args: number[]) {
  return args.reduce((a, b) => a + b, 0);
}
export { add };
