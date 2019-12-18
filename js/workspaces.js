let workspaces = JSON.parse(localStorage.getItem('workspaces'))
let currentWorkspace = workspaces ? workspaces[0] : null

$(document).ready(() => {
  if (workspaces) {
    setWorkspaces()
  } else {
    $("#selectWorkspace").hide()
    $("#workspaceTitle").text('Aucun workspace n\'a encore été créé')
  }
})

const setWorkspaces = () => {
  const fichesContainer = $("#fichesContainer")
  fichesContainer.html('')
  $("#workspacesList").html('')
  $("#selectWorkspace").html(currentWorkspace.name + ' <span class="caret"></span>')
  $("#workspaceTitle").text(currentWorkspace.name)
  for (let i = 0; i < workspaces.length; i++) {
    if (workspaces[i].name !== currentWorkspace.name) {
      const selectWorkspaceElem = $('<li></li>', {
        html: '<a style="cursor: pointer">' + workspaces[i].name + '</a>',
        click: () => {
          setCurrentWorkspace(workspaces[i])
        }
      })
      $("#workspacesList").append(selectWorkspaceElem)
    }
  }

  
  if (currentWorkspace.fiches) {
    for (let fiche of currentWorkspace.fiches) {
      fichesContainer.append(createFicheElem(fiche))
    }
  }
}

const createFicheElem = (fiche) => {
  const ficheDiv = $('<div></div>', {
    class: 'fiche-container'
  })
  const ficheElem = $('<a></a>', {
    text: fiche.name,
    href: fiche.href,
    class: 'fiche'
  })
  const doneBtn = $('<button></button>', {
    html: '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>',
    class: 'done-btn',
    click: () => {
      updateFicheDone(fiche)
    }
  })
  ficheElem.addClass((fiche.done ? 'bg-success' : ''))
  doneBtn.addClass((fiche.done ? 'bg-success' : ''))
  ficheDiv.append(ficheElem)
  ficheDiv.append(doneBtn)

  return ficheDiv
}

const updateFicheDone = (fiche) => {
  currentWorkspace.fiches = currentWorkspace.fiches.map(x => {
    if (x.name === fiche.name) {
      x.done = !x.done
    }
    return x
  })
  workspaces = workspaces.map(x => {
    if (x.name === currentWorkspace.name) {
      x = currentWorkspace
    }
    return x
  })
  localStorage.setItem('workspaces', JSON.stringify(workspaces))
  setWorkspaces()
}

const setCurrentWorkspace = (workspace) => {
  currentWorkspace = workspace
  setWorkspaces()
}