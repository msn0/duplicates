# Duplicates

> Find duplicate files

## Installation

```sh
$ npm install -g duplicates
```

## Usage

```sh
$ duplicates ~/Pictures
```

or

```js
var duplicates = require('duplicates');

duplicates.find("/path", function (data) {
  console.log(data);
});
```

## Output

```js
{
  e9b286d11c6f6d1be4c2dcf0fee964c1fdb0a8e2:
    [ 'test/fixtures/file1', 'test/fixtures/file1.duplicate' ],
  d407089473b567eb5543aa25c0c8a4c121d7c421:
    [ 'test/fixtures/file3', 'test/fixtures/file3.dup' ]
}
```

### API

#### find(path, callback)

Find duplicate files in or below the directory *path*. A *callback* function is called when duplicates are found.

## License

MIT &copy; [Michał Jezierski](https://pl.linkedin.com/in/jezierskimichal)
