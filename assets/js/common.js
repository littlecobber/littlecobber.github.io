$(function () {
    if ($.fn.Lazy) {
        $('.lazy').Lazy({
            scrollDirection: 'vertical',
            effect: 'fadeIn',
            effectTime: 300,
            visibleOnly: true,
            placeholder: "",
            onError: function (element) {
                console.log('[lazyload] Error loading ' + element.data('src'));
            }
        });
    }

    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }
});
