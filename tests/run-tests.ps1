<#
  Runs the Design Hub test suites in headless Microsoft Edge. Nothing else to install.

  Each *.test.html file is a script that is injected into a copy of ../index.html (before the app for
  files marked "inject: early", which seed old saved data; otherwise after it). Copies, browser
  profiles and a screenshot of each suite's results go to %TEMP%\designhub-tests, so the project
  folder and your own browser data are untouched.

  Usage (from the project folder):
    .\tests\run-tests.ps1                      all suites
    .\tests\run-tests.ps1 verification main    only these suites
    .\tests\run-tests.ps1 -All                 print every check, not just failures
    .\tests\run-tests.ps1 -Keep                keep the test pages, to open one in a browser and watch
#>
param([switch]$All, [switch]$Keep, [Parameter(ValueFromRemainingArguments = $true)][string[]]$Suites)
$Suites = @($Suites | ForEach-Object { $_ -split ',' } | Where-Object { $_ })

$here = $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding $false
$app = [IO.File]::ReadAllText((Join-Path $here '..\index.html'), $utf8)
$work = Join-Path $env:TEMP 'designhub-tests'
New-Item -ItemType Directory -Force $work | Out-Null

$edge = @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe") |
  Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1
if (-not $edge) { Write-Error 'Microsoft Edge was not found.'; exit 2 }

$files = Get-ChildItem $here -Filter '*.test.html' | Sort-Object Name
if ($Suites) {
  $files = $files | Where-Object { $Suites -contains ($_.Name -replace '\.test\.html$', '') }
  if (-not $files) { Write-Error "No suite called: $($Suites -join ', ')"; exit 2 }
}

# Each suite hands its result lines ("PASS …", "FAIL …", "ERROR …") to this; Edge writes console output to its log file.
$reporter = "<script>window.__report = lines => console.log('@@RESULT@@' + JSON.stringify(lines));</script>`n"

$passed = 0; $failed = 0; $broken = @()
foreach ($f in $files) {
  $name = $f.Name -replace '\.test\.html$', ''
  $test = [IO.File]::ReadAllText($f.FullName, $utf8)
  $early = $test -match '<!--\s*inject:\s*early\s*-->'
  $budget = if ($test -match '<!--\s*budget:\s*(\d+)\s*-->') { $Matches[1] } else { '120000' }
  $at = if ($early) { $app.IndexOf('<body>') + 6 } else { $app.LastIndexOf('</body>') }
  $page = Join-Path $work "$name.html"
  [IO.File]::WriteAllText($page, $app.Substring(0, $at) + $reporter + $test + $app.Substring($at), $utf8)

  $profile = Join-Path $work "profile-$name"
  if (Test-Path $profile) { Remove-Item -Recurse -Force $profile }
  Write-Host -NoNewline ("{0,-15}" -f $name)
  $t0 = Get-Date
  Start-Process -FilePath $edge -Wait -WindowStyle Hidden -ArgumentList @(
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', "--user-data-dir=$profile",
    '--enable-logging', '--v=0', "--virtual-time-budget=$budget", '--window-size=1400,1000',
    "--screenshot=$(Join-Path $work "$name.png")", ('file:///' + $page.Replace('\', '/')))
  $secs = [int]((Get-Date) - $t0).TotalSeconds

  $lines = $null
  $log = Join-Path $profile 'chrome_debug.log'
  if (Test-Path $log) {
    $hit = [IO.File]::ReadAllLines($log, $utf8) | Where-Object { $_ -match '@@RESULT@@' } | Select-Object -Last 1
    if ($hit) {
      $json = $hit.Substring($hit.IndexOf('@@RESULT@@') + 10)
      $json = $json.Substring(0, $json.LastIndexOf('", source:'))
      # ForEach-Object unrolls the array (Windows PowerShell 5.1 passes it on as a single object).
      $lines = @($json | ConvertFrom-Json | ForEach-Object { $_ })
    }
  }
  if (-not $lines) {
    Write-Host 'NO RESULT  (the suite crashed or ran out of time)' -ForegroundColor Red
    $broken += $name; continue
  }
  $ok = @($lines | Where-Object { $_ -like 'PASS *' })
  $bad = @($lines | Where-Object { $_ -notlike 'PASS *' })
  $passed += $ok.Count; $failed += $bad.Count
  if ($bad.Count) { Write-Host ("FAIL  {0} of {1} passed  ({2}s)" -f $ok.Count, $lines.Count, $secs) -ForegroundColor Red }
  else { Write-Host ("ok    {0} passed  ({1}s)" -f $ok.Count, $secs) -ForegroundColor Green }
  foreach ($l in $(if ($All) { $lines } else { $bad })) {
    Write-Host "      $l" -ForegroundColor $(if ($l -like 'PASS *') { 'DarkGray' } else { 'Yellow' })
  }
  if (-not $Keep) { Remove-Item -Recurse -Force $profile -ErrorAction SilentlyContinue }
}

Write-Host ''
$summary = "$passed passed, $failed failed" + $(if ($broken) { ", $($broken.Count) suite(s) gave no result: $($broken -join ', ')" } else { '' })
Write-Host $summary -ForegroundColor $(if ($failed -or $broken) { 'Red' } else { 'Green' })
if ($Keep) { Write-Host "Test pages kept in $work (open one in Edge to watch it run)." }
exit $(if ($failed -or $broken) { 1 } else { 0 })
