
export const greeting = (msg: string):string => {
  const trimmedMsg = msg.trim();
  if (trimmedMsg === "") {
    throw new Error('msg cannot be empty');
  }
  return trimmedMsg.toLowerCase();
};


describe('greeting', () => {
  const validMessage = 'Hello';
  const validResult = 'hello';
  const whitespaceMessage = ' hello ';
  const whitespaceResult = 'hello';
  const emptyMessage = '';

  it('should return lowercase greeting', () => {
    const result = greeting(validMessage);
    expect(result).toEqual(validResult);
  });

  it('should trim spaces', () => {
    const result = greeting(whitespaceMessage);
    expect(result).toEqual(whitespaceResult);
  });

  it('should throw an error for an empty message', () => {
    expect(() => greeting(emptyMessage)).toThrowError('msg cannot be empty');
  });
});