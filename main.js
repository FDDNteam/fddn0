// Created by Shu, 11/6/17.

;(function(window, document, undefined) {
  var BASE_REPO = 'dragonly/damnsimplegame'

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
      'Check out https://github.com/' +
      BASE_REPO +
      ' for more information.'
  )

  getForks().then(function(data) {
    data.forEach(function(fork) {
      var ghPages = 'https://' + fork.owner.login + '.github.io/' + fork.name

      var link = $('A')
      link.className = 'pa1 link black dim white'
      link.innerText = fork.full_name
      link.setAttribute('href', '#' + fork.full_name)
      link.addEventListener('click', function() {
        renderIframe(ghPages + '?' + Date.now())
        ;[].forEach.call(
          document.querySelectorAll('a.bg-blue.selected'),
          function(el) {
            el.className = 'pa1 link black dim white'
          }
        )
        link.className += ' bg-blue selected'
      })

      var info = $('DIV')
      info.className = 'fr'
      info.innerHTML =
        '<a class="link dim white mr2" href="' +
        fork.html_url +
        '" target="_blank">⭐' +
        fork.stargazers_count +
        '</a><a class="link dim white" href="' +
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
