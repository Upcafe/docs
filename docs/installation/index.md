# Installation
Installation guide for Upcafe's runtimes and tools.

## Node
Download the installer [https://nodejs.org/en/download/](https://nodejs.org/en/download/).

## Node Version Manager
Some of Upcafe's frameworks only run on specific versions of node. Therefore it is necessary to easily switch your Node Runtime Version, based on specific projects.

### MacOS (n)
For MacOS use the [n package](https://www.npmjs.com/package/n).

#### Prerequisites
For this installation having you must have an installation of the Node Runtime already, since we are going to be using `npm` to install `n`.

#### Getting Started
First of, install `n` globally.
```sh
sudo npm install -g n
```

Then install your desired version of node.
```sh
sudo n 14.17.6
```

### Windows (nvm)

## Yarn
We use Yarn for pulling node depedencies. The reasons for this are that:
- Installing packages from the local cache
- Strongly binding package versions
- Allows parallel packages installation
- Active user community

Use Powershell(5.1) for windows or the terminal(zsh) for MacOS.

```sh
npm install -g yarn
```