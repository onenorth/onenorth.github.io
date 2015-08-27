# onenorth.io

This repo is for the Organization Pages for all [One North Interactive](http://onenorth.com) [projects](https://github.com/onenorth) on Github. 

## Organization Pages
The `onenorth.github.io` repo contains a CNAME file with the value `onenorth.io`. Requests made to `http://onenorth.io' will resolve to the `master` branch content in the `onenorth.github.io` repository. Therefore, HTML code that exists in the `master` branch of the `onenorth.github.io` repository is served when valid requests are made to `http://onenorth.io`. There is no need to have a `gh-pages` branch for the `onenorth.github.io` repository.

## Project Pages
Github project pages require a branched named `gh-pages` if you want to have a project-based website. Therefore, each One North project has a `gh-pages` branch which contains the public site (e.g. documentation) for that project. Any subdirectory requests off of `onenorth.io` will point to the project that matches the base subdirectory name, which will point to the `gh-pages` branch of that project.

*Examples:*

`onenorth.io/kickstart` will point to the [Kickstart](https://github.com/onenorth/kickstart) project `gh-pages` branch.

`onenorth/kickstart/configuration` will point to the [configuration](https://github.com/onenorth/kickstart/configuration) folder (assuming it exists) in the [Kickstart](https://github.com/onenorth/kickstart) project `gh-pages` branch.

> TL;DR onenorth.io/[project-name] => github.com/onenorth/[project-name]/tree/gh-pages

##DNS
DNS for this setup is configured as follows:

* `onenorth.io` resolves to `192.30.252.153`, a Github IP address.
* The `www.onenorth.io` CNAME resolves to onenorth.io
* The CNAME file in the onenorth.github.io repository contains `onenorth.io`. As a result, Github will understand requests to `www.onenorth.io`, and respond with `onenorth.io`.
