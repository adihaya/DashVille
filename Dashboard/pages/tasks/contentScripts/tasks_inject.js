document.body.innerHTML = '<iframe frameborder="0" scrolling="no" src="https://mail.google.com/tasks/ig?extension=blackMenu&hl=' + ((location.href.split("hl=")[1]) ? (location.href.split("hl=")[1].split("&")[0]) : ("en")) + '"></iframe>'