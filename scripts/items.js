'use strict'
function renderResult(result) {
    return `
      <div>
        <h2>
        <a class="js-result-name" href="${result.html_url}" target="_blank">${result.name}</a> by <a class="js-user-name" href="${result.owner.html_url}" target="_blank">${result.owner.login}</a></h2>
        <p>Number of watchers: <span class="js-watchers-count">${result.watchers_count}</span></p>
        <p>Number of open issues: <span class="js-issues-count">${result.open_issues}</span></p>
      </div>
    `;
}