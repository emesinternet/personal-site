param()

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location (Resolve-Path (Join-Path $root ".."))

if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
  throw "npx is required to run this script but was not found."
}

$tasks = @(
  @{
    Output = "styles.min.css"
    Command = @("npx", "--yes", "clean-css-cli", "-o", "styles.min.css", "styles.css")
  },
  @{
    Output = "terminal-shader.min.js"
    Command = @("npx", "--yes", "terser", "terminal-shader.js", "-c", "-m", "-o", "terminal-shader.min.js")
  },
  @{
    Output = "aurora-shader.min.js"
    Command = @("npx", "--yes", "terser", "aurora-shader.js", "-c", "-m", "-o", "aurora-shader.min.js")
  },
  @{
    Output = "site.min.js"
    Command = @("npx", "--yes", "terser", "site.js", "-c", "-m", "-o", "site.min.js")
  }
)

foreach ($task in $tasks) {
  Write-Host "Generating $($task.Output)"
  & $task.Command[0] $task.Command[1..($task.Command.Count - 1)]

  if ($LASTEXITCODE -ne 0) {
    throw "Minification failed for $($task.Output)"
  }
}
