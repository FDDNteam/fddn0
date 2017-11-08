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
    }).then(function(data) {
      return data.sort(function (a, b) {
        return b.stargazers_count - a.stargazers_count
      })
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
      '<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body>' +
      '<ol><li>首先 fork ' +
      BASE_REPO_URL +
      '</li>' +
      '<li><b>做一些修改，push（否则不会生效）</b></li>' +
      '<li>于是就会出现在左侧</li>' +
      '</ol>' +
      '</body></html>'
  )

  getForks().then(function(data) {
    data.forEach(function(fork) {
      if (!fork.has_pages) {
        return
      }
      
      var ghPages = 'https://' + fork.owner.login + '.github.io/' + fork.name

      var link = $('A')
      link.className = 'link black dim dib fw7'
      link.innerHTML = fork.name
      link.setAttribute('href', '#' + fork.full_name)
      link.setAttribute('title', fork.description)

      var info = $('DIV')
      info.className = 'fr'
      info.innerHTML =
        '<a class="link dim mr2 silver" href="' +
        fork.html_url +
        '" target="_blank">⭐ ' +
        fork.stargazers_count +
        '</a><a class="link dim silver" href="' +
        fork.html_url +
        '/wiki" target="_blank">💬</a>'
      
      var user = $('P')
      user.className = 'ma0'
      user.innerText =  '@' + fork.owner.login

      var div = $('DIV')
      div.className = 'pa1 db'
      div.appendChild(link)
      div.appendChild(info)
      div.appendChild(user)
      
      link.addEventListener('click', function() {
        renderIframe(ghPages + '?' + Date.now())
        ;[].forEach.call(
          document.querySelectorAll('.bg-black.white.selected'),
          function(el) {
            el.className = el.className.replace(' bg-black white selected', '')
          }
        )
        link.className += ' bg-black white selected'
        div.className += ' bg-black white selected'
      })
      
      var li = $('LI')
      li.className = 'lh-copy truncate mb3'
      li.appendChild(div)

      $repos.appendChild(li)
    })
  })
})(window, document)
