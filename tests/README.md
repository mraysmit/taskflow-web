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

Each `*.test.html` file holds a `<script>` that drives the real app: it signs in, clicks buttons, fills in forms and records `PASS` / `FAIL` lines. The runner copies `index.html` and `default-workspace.js`, injects the suite (before the app for files marked `<!-- inject: early -->`, which seed old saved data), opens the copy in headless Edge and reads the results back from Edge's log.

Everything the runner creates goes to `%TEMP%\taskhub-tests`: the test pages, a separate browser profile per suite, and a screenshot of each suite's results (`<suite>.png`). Your project folder and your own browser data are not touched. With `-Keep`, you can open a test page in Edge to watch the suite run.

| Suite | Covers |
|---|---|
| `main` | Board, card buttons, handoffs, comments, the form, pages and the Configuration screen |
| `roles` | Sign-in, roles, what each role sees, View as, role queues, People and Roles settings |
| `inbox` | The Action Inbox: alerts, accept, decline, pick up, mark read, read-only viewing |
| `verification` | Approval groups in order or at once, reject, withdraw, maker-checker, routes |
| `notifications` | Position, animation, sound and colour settings |
| `startup` | A fresh browser starts empty; one click loads `default-workspace.js`; relative dates, hashed passwords; a missing file |
| `guide` | The User Guide: opening it, chapters written from the live configuration, search, links, what each role sees |
| `data-file` | Saving to a data file, picking up a colleague's changes, conflicts, reconnecting after a restart (the browser's file access is replaced by an in-memory file, because headless Edge can't click file dialogs) |
| `config-remap` | Removing people and teams in Configuration whose items were already moved to someone else who is then removed: you are asked again, and every item ends up with a real owner and team (or none, or a former member) |
| `integrity` | Opening a workspace (this browser's copy, a data file or a backup) with references to people, teams, columns, priorities, queues, groups, routes or items that don't exist repairs every one: unknown ones are cleared, a handoff to nobody and a verification by a missing group are withdrawn |
| `data-file-restart` | Work done while a conflict or a failed save was waiting isn't silently replaced after a restart; saving keeps what a newer version of the app wrote to the file; loading the default workspace never touches the file |
| `stale` | A button the item no longer shows (another person's handoff, another column) does nothing; a dialog left open while a colleague changes the shared file doesn't overwrite their change |
| `signout` | Signing out clears the previous person's pop-ups, messages and notifications list from the screen |
| `extensions` | Status flags, field types, custom conditions, script steps, email, webhooks, linked items |
| `pages` | The Overview, Posts, Files and Notes pages: Overview counts only what the person may see, notes listed on their own page, editing and deleting notes, nothing deletable while viewing as someone else (read-only) |
| `steps` | A Delete step still sends the button's alerts and webhooks; the history names a webhook's site but not its address (which can hold a key); buttons that run each other in a loop run once, warn, and can't be saved |
| `handoff` | Buttons and scripts that give a queued item an owner (assign, hand straight over, accept an offer) take it out of its role queue |
| `hardening` | Hostile saved or shared data (colours and ids that try to break out of HTML attributes) is shown safely; an unreadable saved workspace is kept and offered for download instead of being overwritten |
| `storage` | A full browser store: the demo won't start without a backup of your data, and a data file keeps attachments the browser's own copy has to leave out |
| `upgrade-v1`, `upgrade-v2`, `upgrade-v5` | Opening data saved by earlier versions |
| `demo` | Runs every scenario of the built-in automated demo and checks your data is restored |
| `demo-window` | Resizing the demo window by its edges, corner and keyboard; minimising, resetting, remembering the size |

## Adding a test

Copy a suite, keep its `ok(name, condition)` helper, and end with `window.__report(out)`, where `out` is the list of result lines. A `<!-- budget: 500000 -->` comment gives a long suite more (virtual) time; the default is 120000 ms.
