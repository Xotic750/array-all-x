import all from '../src/array-all-x';

const itHasDoc = typeof document !== 'undefined' && document ? it : xit;

const isStrict = (function() {
  /* eslint-disable-next-line babel/no-invalid-this */
  return Boolean(this) === false;
})();

const itStrict = isStrict ? it : xit;

const createArrayLike = function(arr) {
  const o = {};
  const {length} = arr;
  for (let i = 0; i < length; i += 1) {
    o[i] = arr[i];
  }

  o.length = length;

  return o;
};

describe('all', () => {
  let actual;
  let expected;
  let testSubject;

  beforeEach(() => {
    expected = {
      0: 2,
      1: undefined,
      2: undefined,
      3: true,
      4: 'hej',
      5: null,
      6: false,
      7: 0,
    };

    actual = {};
    testSubject = [2, 3, undefined, true, 'hej', null, false, 0];

    delete testSubject[1];
  });

  it('is a function', () => {
    expect.assertions(1);
    expect(typeof all).toBe('function');
  });

  it('should throw when array is null or undefined', () => {
    expect.assertions(3);
    expect(() => {
      all();
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      all(undefined);
    }).toThrowErrorMatchingSnapshot();

    expect(() => {
      all(null);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should pass the correct parameters', () => {
    expect.assertions(1);
    const callback = jest.fn();
    const array = ['1'];
    all(array, callback);
    expect(callback).toHaveBeenCalledWith('1', 0, array);
  });

  it('should not affect elements added to the array after it has begun', () => {
    expect.assertions(2);
    const arr = [1, 2, 3];
    let i = 0;
    all(arr, (a) => {
      i += 1;
      arr.push(a + 3);
    });

    expect(arr).toStrictEqual([1, 2, 3, 4, 5, 6]);

    expect(i).toBe(3);
  });

  it('should set the correct context when given none', () => {
    expect.assertions(1);
    let context;
    all([1], function() {
      /* eslint-disable-next-line babel/no-invalid-this */
      context = this;
    });

    expect(context).toBe(
      function() {
        /* eslint-disable-next-line babel/no-invalid-this */
        return this;
      }.call(),
    );
  });

  it('should iterate all', () => {
    expect.assertions(1);
    all(testSubject, (obj, index) => {
      actual[index] = obj;

      return true;
    });

    expect(actual).toStrictEqual(expected);
  });

  it('should iterate all using a context', () => {
    expect.assertions(1);
    const o = {a: actual};

    all(
      testSubject,
      function(obj, index) {
        this.a[index] = obj;
      }.bind(o),
    );

    expect(actual).toStrictEqual(expected);
  });

  it('should iterate all in an array-like object', () => {
    expect.assertions(1);
    const ts = createArrayLike(testSubject);
    all(ts, (obj, index) => {
      actual[index] = obj;
    });

    expect(actual).toStrictEqual(expected);
  });

  it('should iterate all in an array-like object using a context', () => {
    expect.assertions(1);
    const ts = createArrayLike(testSubject);
    const o = {a: {}};

    all(
      ts,
      function(obj, index) {
        this.a[index] = obj;
      }.bind(o),
    );

    expect(o.a).toStrictEqual(expected);
  });

  describe('strings', () => {
    const str = 'Hello, World!';

    it('should iterate all in a string', () => {
      expect.assertions(1);
      actual = [];
      all(str, (item, index) => {
        actual[index] = item;
      });

      expect(actual).toStrictEqual(str.split(''));
    });

    it('should iterate all in a string using a context', () => {
      expect.assertions(1);
      actual = [];
      const o = {a: actual};
      all(
        str,
        function(item, index) {
          this.a[index] = item;
        }.bind(o),
      );

      expect(actual).toStrictEqual(str.split(''));
    });
  });

  it('should have a boxed object as list argument of callback', () => {
    expect.assertions(2);
    let listArg;
    all('foo', (item, index, list) => {
      listArg = list;
    });

    expect(typeof listArg).toBe('object');
    expect(Object.prototype.toString.call(listArg)).toBe('[object String]');
  });

  itStrict('does not autobox the content in strict mode', () => {
    expect.assertions(1);
    let context;
    all(
      [1],
      function() {
        context = this;
      }.bind('x'),
    );

    expect(typeof context).toBe('string');
  });

  it('should work with arguments', () => {
    expect.assertions(1);
    const argObj = (function() {
      return arguments;
    })('1');

    const callback = jest.fn();
    all(argObj, callback);
    expect(callback).toHaveBeenCalledWith('1', 0, argObj);
  });

  it('should work with strings', () => {
    expect.assertions(1);
    const callback = jest.fn();
    const string = '1';
    all(string, callback);
    expect(callback).toHaveBeenCalledWith('1', 0, Object(string));
  });

  itHasDoc('should work wih DOM elements', () => {
    expect.assertions(1);
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    fragment.appendChild(div);
    const callback = jest.fn();
    all(fragment.childNodes, callback);
    expect(callback).toHaveBeenCalledWith(div, 0, fragment.childNodes);
  });
});
