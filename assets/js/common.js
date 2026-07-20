$(function () {
    if ($.fn.Lazy) {
        $('.lazy').Lazy({
            scrollDirection: 'vertical',
            effect: 'fadeIn',
            effectTime: 300,
            visibleOnly: true,
            placeholder: '',
            onError: function (element) {
                console.log('[lazyload] Error loading ' + element.data('src'))
            }
        })
    }

    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip()
    }
})

function initVisibleVideos () {
    const videos = document.querySelectorAll('video[data-autoplay="visible"]')
    if (!videos.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
    }

    const playVideo = function (video) {
        const playPromise = video.play()
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(function () {})
        }
    }

    if (!('IntersectionObserver' in window)) {
        videos.forEach(playVideo)
        return
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
                playVideo(entry.target)
            } else {
                entry.target.pause()
            }
        })
    }, { threshold: [0, 0.35, 0.75] })

    videos.forEach(function (video) {
        observer.observe(video)
    })
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVisibleVideos)
} else {
    initVisibleVideos()
}
