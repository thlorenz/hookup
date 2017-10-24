# hookup

Get hooked up with async-hooks to gain insight into your Node.js applications.

## Getting Started

```sh
git clone https://github.com/thlorenz/hookup
cd hookup && npm install
```

## Running a Project

npm scripts to run projects have been provided in order to ensure you are running them with Node.js v8 or higher. This
is necessary to ensure the _async-hooks_ feature is available.

To run a project use the `test` script, i.e. for the first project do:

```sh
npm test projects/01-init.timer.js
```

Alternatively (if you're sure that your Node.js version is current enough -- check via `node -v`) you can just run the
projects directly with your `node` executable.

```sh
node projects/01-init.timer.js
```

## Inspecting a Project

If you're having trouble or just are interested in how things work under the hood, you can run each project in _inspect_
mode as follows.

```sh
npm run inspect projects/01-init.timer.js
```

or, using your executable

```sh
node --inspect-brk projects/01-init.timer.js
```

For more information please read [these docs](https://nodejs.org/en/docs/inspector).

I also encourage you to launch Chrome DevTools in any tab and look for the Node.js icon in the upper left corner ;).
That allows you to launch a dedicated DevTools for Node.js.
