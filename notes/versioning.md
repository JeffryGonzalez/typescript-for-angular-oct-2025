# Package Versioning, Legacy Peer Deps, Etc.

- An Angular that works "today" might not work "tomorrow" even if you don't change anything.
- but what if the browser it runs on changes?

- "Peer Dependencies"
- some packages assume you have other packages already installed.
  - @ngrx/signals - 20.0.1
- some are "free standing" - no peers.

- "If you are a library author, do you match your version numbers with the package you are a "peer" with?"

- "There was no Angular 3"
  - Angular 2 came out - good stuff, but the router was BAD, it wasn't done yet, it sucked. Whatever.
  - Let's have a do-over on the router, (Viktor Savkin (Nx)) he rewrote the router from scratch. Totally different and REALLY good.
  - @angular/router: 3.0.0

- Angular 20 came out, the NGRX team was "mid sprint" on some big new breaking changes.
- for a month - when you did `npm install @ngrx/signals` it would fail because of the peer dependency.
- one way to fix the install error is `npm install @ngrx/signals --legacy-peer-deps`

## Take Away

- Don't install tons of packages just because you are lazy.
- example: 'padleft' `const padded = padleft('tacos', 100)`
- consider any changes to package.json or package.lock json to be something that needs LOTS of scrutiny.

## Open Source is AWESOME and ESSENTIAL.

- You file issues, send PRs, etc.
- If you can't do that, consider supporting them financially. Sponsor them, etc.
