import { SumPipe } from './sum.pipe';

describe('SumPipe', () => {
  const pipe = new SumPipe();
  it('create an instance', () => {
    const pipe = new SumPipe();
    expect(pipe).toBeTruthy();
  });
  it('transforms "[1,2,3] to "6"', () => {
    return expect(pipe.transform([1, 2, 3], '1')).toBe('6');
  });
});
