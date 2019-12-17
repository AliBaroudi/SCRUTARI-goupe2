let workspaces = JSON.parse(localStorage.getItem('workspaces'))

$(document).ready(() => {
  if (workspaces) {
    $("#selectWorkspace").html(workspaces[0].name + ' <span class="caret"></span>')
    $("#workspaceTitle").text(workspaces[0].name)
    for (let i = 1; i < workspaces.length; i++) {
      $("#workspacesList").append('<li><a style="cursor: pointer">' + workspaces[i].name + '</a></li>')
    }
  }
})