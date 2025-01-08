const Swal = require('sweetalert2');
contextBridge.exposeInMainWorld('Swal', {
    fire: (options) => Swal.fire(options)
});
