
function addTab(id, title, url, closable){
    var content = '<iframe src="' + url + '" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="auto" width="100%" height="100%"></iframe>';
    $('#' + id).tabs('add', {
        title : title,
        selected : false,
        closable : closable,
        content : content
    });
}