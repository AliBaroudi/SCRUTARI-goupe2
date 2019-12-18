let isCheckingResults = false
let workspaces = JSON.parse(localStorage.getItem('workspaces'))
let currentFiche = {
  name: '',
  href: '',
  done: false
}

// $(document).ready(() => {
//   localStorage.removeItem('workspaces')
// })

$("body").on('DOMSubtreeModified', "div[data-scrutari-area=result]", function() {
  if (!isCheckingResults) {
    isCheckingResults = true
    setTimeout(() => {
      setWorkspaces()
      isCheckingResults = false;
    }, 300);
  }
})

const setWorkspaces = () => {
  const workspaceList = $(".workspaces-list")
  for (let i = 0; i < workspaceList.length; i++) {
    $(workspaceList[i]).html('')
    const fiche = $(workspaceList[i]).parent().siblings()[0]
    const newFiche = {
      name: $(fiche).text(),
      href: $(fiche).find('a').attr('href')
    }
    if (workspaces) {
      for (let workspace of workspaces) {
        let isInWorkspace = false
        if (workspace.fiches) {
          for (let currFiche of workspace.fiches) {
            if (currFiche.name === newFiche.name) {
              isInWorkspace = true
            }
          }
        }
        const addToWorkSpaceElem = $('<li></li>', {
          html: '<a style="cursor: pointer">' + workspace.name + '</a>',
          class: (isInWorkspace ? 'bg-success' : ''),
          click: () => {
            if (!isInWorkspace) {
              addToWorkspace(workspace, newFiche)
            }
          }
        })
        $(workspaceList[i]).append(addToWorkSpaceElem)
      }
    }
    $(workspaceList[i]).append('<li class="divider"></li>')
    const createWorkspaceElem = $('<li></li>', {
      html: '<a style="cursor: pointer">Créer un workspace</a>',
      click: () => {
        setCurrentFiche(newFiche)
      },
      'data-toggle': 'modal',
      'data-target': '#modalCreate'
    })
    $(workspaceList[i]).append(createWorkspaceElem)
  }
}

const addToWorkspace = (workspace, fiche) => {
  workspace.fiches = workspace.fiches ? [...workspace.fiches, fiche] : [fiche]
  localStorage.setItem('workspaces', JSON.stringify(workspaces))
  setWorkspaces()
}

const setCurrentFiche = (fiche) => {
  currentFiche = fiche
}

const createWorkspace = (inputId) => {
  const inputValue = $("#" + inputId).val().trim()
  if (inputValue) {
    if (workspaces) {
      for (let i = 0; i < workspaces.length; i++) {
        if (workspaces[i].name === inputValue) {
          return
        }
      }
    }
    const newWorkspace = {
      name: inputValue,
      fiches: [currentFiche]
    }
    workspaces = workspaces ? [...workspaces, newWorkspace] : [newWorkspace]
    localStorage.setItem('workspaces', JSON.stringify(workspaces))
    setWorkspaces()
  }
}