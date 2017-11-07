// Created by Shu, 11/6/17.

;(function(window, document, undefined) {
  var BASE_REPO = 'dragonly/damnsimplegame'
  var BASE_REPO_URL = 'https://github.com/' + BASE_REPO

  var $repos = document.getElementById('repos')
  var $iframe = document.getElementById('iframe')

  function getForks() {
    return fetch(
      'https://api.github.com/repos/' + BASE_REPO + '/forks'
    ).then(function(res) {
      return res.json()
    })
  }

  function $(el) {
    return document.createElement(el)
  }

  function renderIframe(url) {
    $iframe.setAttribute('src', url)
  }

  // render
  renderIframe(
    'data:text/html,' +
      '<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body>'
      '<ol><li>首先 fork ' +
      BASE_REPO_URL +
      '</li>' +
      '<li><b>做一些修改，push（不然会 404）</b></li>' +
      '<li>于是就会出现在左侧</li>' +
      '</ol>' +
      '</body></html>'
  )

  getForks().then(function(data) {
    data.forEach(function(fork) {
      var ghPages = 'https://' + fork.owner.login + '.github.io/' + fork.name

      var link = $('A')
      link.className = 'pa1 link black dim'
      link.innerText = fork.full_name
      link.setAttribute('href', '#' + fork.full_name)
      link.addEventListener('click', function() {
        renderIframe('data:text/html,<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body>loading...</body></html>')
        setTimeout(renderIframe, 10, ghPages + '?' + Date.now())
        ;[].forEach.call(
          document.querySelectorAll('a.bg-black.white.selected'),
          function(el) {
            el.className = 'pa1 link black dim'
          }
        )
        link.className += ' bg-black white selected'
      })

      var info = $('DIV')
      info.className = 'fr'
      info.innerHTML =
        '<a class="link dim silver mr2" href="' +
        fork.html_url +
        '" target="_blank">⭐ ' +
        fork.stargazers_count +
        '</a><a class="link dim silver" href="' +
        fork.html_url +
        '/issues" target="_blank">💬</a>'

      var li = $('LI')
      li.className = 'lh-copy truncate mb3'
      li.appendChild(link)
      li.appendChild(info)

      $repos.appendChild(li)
    })
  })
})(window, document)
