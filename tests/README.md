# Tests

Plain JavaScript test suites for `index.html`, run in headless Microsoft Edge. Nothing to install.

## Run them

From the project folder, in PowerShell:

```powershell
.\tests\run-tests.ps1                      # all suites
.\tests\run-tests.ps1 verification main    # only these
.\tests\run-tests.ps1 -All                 # list every check, not only failures
.\tests\run-tests.ps1 -Keep                # keep the generated test pages
```

If Windows blocks the script, run it once with
`powershell -ExecutionPolicy Bypass -File .\tests\run-tests.ps1`.

The script prints one line per suite and a total. It exits with code 0 when everything passes and 1 otherwise.

## How it works

Each `*.test.html` file holds a `<script>` that drives the real app: it signs in, clicks buttons, fills in forms and records `PASS` / `FAIL` lines. The runner copies `index.html`, injects the suite (before the app for files marked `<!-- inject: early -->`, which seed old saved data), opens the copy in headless Edge and reads the results back from Edge's log.

Everything the runner creates goes to `%TEMP%\taskhub-tests`: the test pages, a separate browser profile per suite, and a screenshot of each suite's results (`<suite>.png`). Your project folder and your own browser data are not touched. With `-Keep`, you can open a test page in Edge to watch the suite run.

| Suite | Covers |
|---|---|
| `main` | Board, card buttons, handoffs, comments, the form, pages and the Configuration screen |
| `roles` | Sign-in, roles, what each role sees, View as, role queues, People and Roles settings |
| `inbox` | The Action Inbox: alerts, accept, decline, pick up, mark read, read-only viewing |
| `verification` | Approval groups in order or at once, reject, withdraw, maker-checker, routes |
| `notifications` | Position, animation and sound settings |
| `data-file` | Saving to a data file, picking up a colleague's changes, conflicts, reconnecting after a restart (the browser's file access is replaced by an in-memory file, because headless Edge can't click file dialogs) |
| `extensions` | Status flags, field types, custom conditions, script steps, email, webhooks, linked items |
| `upgrade-v1`, `upgrade-v2`, `upgrade-v5` | Opening data saved by earlier versions |
| `demo` | Runs every scenario of the built-in automated demo and checks your data is restored |
| `demo-window` | Resizing the demo window by its edges, corner and keyboard; minimising, resetting, remembering the size |

## Adding a test

Copy a suite, keep its `ok(name, condition)` helper, and end with `window.__report(out)`, where `out` is the list of result lines. A `<!-- budget: 500000 -->` comment gives a long suite more (virtual) time; the default is 120000 ms.
