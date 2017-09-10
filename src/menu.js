const remote = window.require ? window.require('electron').remote : null;

export default {
  init({
    saveClick,
    dashboardClick,
    bulkTransactionsClick,
  }) {
    if (!remote) {
      return;
    }

    const menu = remote.Menu.buildFromTemplate([
      {
        label: 'File',
        submenu: [
          {
            label: 'Save',
            click: saveClick,
          },
        ],
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Dashboard',
            click: dashboardClick,
          },
          {
            label: 'Bulk transactions',
            click: bulkTransactionsClick,
          },
        ],
      },
      {
        label: 'Development',
        submenu: [
          {
            label: 'Toggle dev tools',
            role: 'toggledevtools'
          },
        ],
      },
    ]);
    remote.Menu.setApplicationMenu(menu);
  },
};
