const { ipcMain } = require('electron');

module.exports = {
    templateInicial: null,
    gerarMenuPrincipalTemplate(app) {
        let templateMenu = [
            {
                label: 'View',
                submenu: [
                    {
                        role: 'reload'
                    }
                    // {
                    //     role: 'toggledevtools'
                    // }
                ]
            },
            // {
            //     label: 'Window',
            //     submenu: [
            //         {
            //             role: 'minimize',
            //             accelerator: 'Alt+M'
            //         },
            //         {
            //             role: 'close'
            //         }
            //     ]
            // },
            {
                label: 'Sobre',
                submenu: [
                    {
                        label: 'Sobre Gerador de Teste',
                        click: () => {
                            ipcMain.emit('abrir-janela-sobre');
                        },
                        accelerator: 'CommandOrControl+I'
                    }
                ]
            }
        ];
    
        if (process.platform == 'darwin') {
            templateMenu.unshift({
                label: app.getName()
            })
        }

        return templateMenu;
    }
}