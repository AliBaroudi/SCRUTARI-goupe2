let workspaces = JSON.parse(localStorage.getItem('workspaces'))
let currentWorkspace = workspaces ? workspaces[0] : null

$(document).ready(() => {
  setWorkspaces()
})

const setWorkspaces = () => {
  const fichesContainer = $("#fichesContainer")
  fichesContainer.html('')
  $("#workspacesList").html('')
  if (workspaces && workspaces.length > 0) {
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
  
    if (currentWorkspace.fiches && currentWorkspace.fiches.length > 0) {
      for (let fiche of currentWorkspace.fiches) {
        fichesContainer.append(createFicheElem(fiche))
      }
    }
  } else {
    $("#selectWorkspace").hide()
    $("#workspaceTitle").text('Aucun workspace n\'a encore été créé')
    $('#removeWorkspace').hide()
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
    class: 'fiche-btn bg-success',
    click: () => {
      updateFicheDone(fiche)
    }
  })
  const removeBtn = $('<button></button>', {
    html: '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>',
    class: 'fiche-btn bg-danger',
    click: () => {
      removeFiche(fiche)
    }
  })
  ficheElem.addClass((fiche.done ? 'bg-success' : ''))
  doneBtn.addClass((fiche.done ? 'bg-success' : ''))
  ficheDiv.append(ficheElem)
  ficheDiv.append(doneBtn)
  ficheDiv.append(removeBtn)

  return ficheDiv
}

const removeWorkspace = () => {
  workspaces = workspaces.filter(x => x.name !== currentWorkspace.name)
  localStorage.setItem('workspaces', JSON.stringify(workspaces))
  if (workspaces && workspaces.length > 0) {
    setCurrentWorkspace(workspaces[0])
  } else {
    setCurrentWorkspace(null)
  }
  setWorkspaces()
}

const removeFiche = (fiche) => {
  currentWorkspace.fiches = currentWorkspace.fiches.filter(x => x.name !== fiche.name)
  workspaces = workspaces.map(x => {
    if (x.name === currentWorkspace.name) {
      x = currentWorkspace
    }
    return x
  })
  localStorage.setItem('workspaces', JSON.stringify(workspaces))
  setWorkspaces()
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