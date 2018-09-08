import { remote } from 'electron';

const newMenuItemTemplate = {
  label: 'New',
  accelerator: 'CmdOrCtrl+Shift+N'
};
const openMenuItemTemplate = {
  label: 'Open',
  accelerator: 'CmdOrCtrl+O'
};
const saveMenuItemTemplate = {
  label: 'Save',
  accelerator: 'CmdOrCtrl+S'
};
const saveAsMenuItemTemplate = {
  label: 'Save as',
  accelerator: 'CmdOrCtrl+Shift+S'
};
const undoMenuItemTemplate = {
  label: 'Undo',
  accelerator: 'CmdOrCtrl+Z',
  enabled: false
};
const redoMenuItemTemplate = {
  label: 'Redo',
  accelerator: 'CmdOrCtrl+Y',
  enabled: false
};
const exportSummaryMenuItemTemplate = {
  label: 'Export summary as CSV'
};

let menu;
const menuTemplate = [
  {
    label: 'File',
    submenu: [
      newMenuItemTemplate,
      openMenuItemTemplate,
      saveMenuItemTemplate,
      saveAsMenuItemTemplate
    ]
  },
  {
    label: 'Edit',
    submenu: [undoMenuItemTemplate, redoMenuItemTemplate]
  },
  {
    label: 'Export',
    submenu: [exportSummaryMenuItemTemplate]
  }
];
if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Development',
    submenu: [
      {
        label: 'Toggle dev tools',
        role: 'toggledevtools'
      }
    ]
  });
}

function updateMenu() {
  if (menu) menu.destroy();
  menu = remote.Menu.buildFromTemplate(menuTemplate);
  remote.Menu.setApplicationMenu(menu);
}

export default {
  init({
    openClick,
    saveClick,
    undoClick,
    redoClick,
    saveAsClick,
    newClick,
    exportSummaryClick
  }) {
    newMenuItemTemplate.click = newClick;
    openMenuItemTemplate.click = openClick;
    saveMenuItemTemplate.click = saveClick;
    saveAsMenuItemTemplate.click = saveAsClick;
    undoMenuItemTemplate.click = undoClick;
    redoMenuItemTemplate.click = redoClick;
    exportSummaryMenuItemTemplate.click = exportSummaryClick;
    updateMenu();
  },

  updateUndoLabel(label) {
    undoMenuItemTemplate.label = label ? `Undo '${label}'` : 'Undo';
    undoMenuItemTemplate.enabled = Boolean(label);
    updateMenu();
  },

  updateRedoLabel(label) {
    redoMenuItemTemplate.label = label ? `Redo '${label}'` : 'Redo';
    redoMenuItemTemplate.enabled = Boolean(label);
    updateMenu();
  }
};
